import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const outputPath=path.join(root,'data','social-feed.json');
const token=(process.env.META_ACCESS_TOKEN||'').trim();
const pageId=(process.env.FACEBOOK_PAGE_ID||'').trim();
let instagramId=(process.env.INSTAGRAM_BUSINESS_ID||'').trim();
const graphVersion=(process.env.META_GRAPH_VERSION||'v25.0').trim();
const graphBase='https://graph.facebook.com';

if(!token || (!pageId && !instagramId)){
  console.log('LLDC social sync is ready but not configured. Add META_ACCESS_TOKEN and at least one account ID.');
  process.exit(0);
}

async function graphGet(resource,params={}){
  const url=new URL(`${graphBase}/${graphVersion}/${resource}`);
  Object.entries(params).forEach(([key,value])=>{if(value!==undefined && value!==null && value!=='') url.searchParams.set(key,String(value))});
  url.searchParams.set('access_token',token);
  const response=await fetch(url,{headers:{accept:'application/json'}});
  const body=await response.json().catch(()=>({}));
  if(!response.ok || body.error){
    const message=body?.error?.message||`Meta API request failed with status ${response.status}`;
    throw new Error(message);
  }
  return body;
}

function hasPublishTag(caption){return /#LLDCWebsite\b/i.test(caption||'')}
function hasRemovalTag(caption){return /#(?:LLDCRemove|Sold|Rented|Closed)\b/i.test(caption||'')}

function categoryFromCaption(caption){
  const text=caption||'';
  if(/#(?:Commercial|ForCommercial|Office|Industrial|Warehouse)\b/i.test(text) || /\b(?:commercial|office|industrial shed|warehouse|shop)\b/i.test(text)) return 'commercial';
  if(/#(?:ForSale|Sale)\b/i.test(text) || /\b(?:for sale|flat for sale|property for sale)\b/i.test(text)) return 'sale';
  if(/#(?:ForRent|Rent|Rental|ForLease)\b/i.test(text) || /\b(?:for rent|on rent|rental|for lease)\b/i.test(text)) return 'rent';
  if(/#(?:ForPurchase|Purchase|BuyerRequirement)\b/i.test(text) || /\b(?:purchase requirement|looking to buy|want to purchase)\b/i.test(text)) return 'purchase';
  return null;
}

function titleFromCaption(caption,category){
  const cleaned=(caption||'')
    .replace(/https?:\/\/\S+/gi,' ')
    .replace(/#[\p{L}\p{N}_]+/gu,' ')
    .split(/\r?\n/)
    .map(line=>line.replace(/\s+/g,' ').trim())
    .find(Boolean);
  if(cleaned) return cleaned.slice(0,100);
  return {sale:'Property for Sale',rent:'Property for Rent',commercial:'Commercial Property',purchase:'Purchase Requirement'}[category]||'LLDC Property Update';
}

function instagramEmbed(permalink){
  try{
    const url=new URL(permalink);
    if(!/(^|\.)instagram\.com$/i.test(url.hostname)) return null;
    url.search='';url.hash='';
    url.pathname=url.pathname.replace(/\/+$/,'')+'/embed/';
    return url.toString();
  }catch{return null}
}

function facebookEmbed(permalink,isVideo){
  if(!permalink) return null;
  const endpoint=isVideo?'video.php':'post.php';
  return `https://www.facebook.com/plugins/${endpoint}?href=${encodeURIComponent(permalink)}&show_text=false&width=500`;
}

function fingerprint(post){
  const words=(post.caption||'').toLowerCase().replace(/#[\p{L}\p{N}_]+/gu,' ').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  return `${post.category}|${words||post.permalink}`;
}

async function instagramPosts(){
  if(!instagramId && pageId){
    const page=await graphGet(pageId,{fields:'instagram_business_account'});
    instagramId=page?.instagram_business_account?.id||'';
  }
  if(!instagramId) return [];
  const response=await graphGet(`${instagramId}/media`,{
    fields:'id,caption,media_type,permalink,timestamp',
    limit:100
  });
  return (response.data||[]).flatMap(item=>{
    const caption=item.caption||'';
    const category=categoryFromCaption(caption);
    if(!hasPublishTag(caption) || hasRemovalTag(caption) || !category || !item.permalink) return [];
    const mediaType=item.media_type==='VIDEO'?'VIDEO':item.media_type==='CAROUSEL_ALBUM'?'CAROUSEL':'IMAGE';
    return [{
      id:`instagram:${item.id}`,
      source:'instagram',
      category,
      title:titleFromCaption(caption,category),
      caption,
      media_type:mediaType,
      permalink:item.permalink,
      embed_url:instagramEmbed(item.permalink),
      published_at:item.timestamp||null
    }];
  });
}

async function facebookPosts(){
  if(!pageId) return [];
  const response=await graphGet(`${pageId}/feed`,{
    fields:'id,message,created_time,permalink_url,attachments.limit(1){media_type,target}',
    limit:100
  });
  return (response.data||[]).flatMap(item=>{
    const caption=item.message||'';
    const category=categoryFromCaption(caption);
    if(!hasPublishTag(caption) || hasRemovalTag(caption) || !category || !item.permalink_url) return [];
    const attachment=item?.attachments?.data?.[0]||{};
    const isVideo=/video/i.test(attachment.media_type||'');
    return [{
      id:`facebook:${item.id}`,
      source:'facebook',
      category,
      title:titleFromCaption(caption,category),
      caption,
      media_type:isVideo?'VIDEO':'IMAGE',
      permalink:item.permalink_url,
      embed_url:facebookEmbed(item.permalink_url,isVideo),
      published_at:item.created_time||null
    }];
  });
}

const [instagram,facebook]=await Promise.all([instagramPosts(),facebookPosts()]);
const seen=new Set();
const posts=[...instagram,...facebook]
  .sort((a,b)=>String(b.published_at||'').localeCompare(String(a.published_at||'')))
  .filter(post=>{const key=fingerprint(post);if(seen.has(key)) return false;seen.add(key);return true});

let existing={schema_version:1,updated_at:null,posts:[]};
try{existing=JSON.parse(await fs.readFile(outputPath,'utf8'))}catch{}
if(JSON.stringify(existing.posts||[])===JSON.stringify(posts)){
  console.log(`LLDC social feed already current (${posts.length} posts).`);
  process.exit(0);
}

const output={schema_version:1,updated_at:new Date().toISOString(),posts};
await fs.mkdir(path.dirname(outputPath),{recursive:true});
await fs.writeFile(outputPath,JSON.stringify(output,null,2)+'\n','utf8');
console.log(`Updated LLDC social feed with ${posts.length} posts.`);
