'use strict';

(function(){
  var status=document.getElementById('socialFeedStatus');
  var propertySection=document.getElementById('properties');
  if(!propertySection || !window.fetch) return;

  var panelIds={sale:'sale',rent:'rent',commercial:'commercial',purchase:'purchase'};
  var safeEmbed=/^https:\/\/(www\.)?(instagram\.com|facebook\.com)\//i;
  var safeLink=/^https:\/\//i;

  function element(tag,className,text){
    var node=document.createElement(tag);
    if(className) node.className=className;
    if(text!==undefined && text!==null) node.textContent=text;
    return node;
  }

  function getGrid(category){
    var panel=document.getElementById(panelIds[category]);
    if(!panel) return null;
    var grid=panel.querySelector('.listing-grid');
    if(!grid){
      grid=element('div','listing-grid social-generated-grid');
      panel.appendChild(grid);
    }
    return grid;
  }

  function makeMedia(post){
    var frame=element('div','listing-media social-media-frame');
    if(post.embed_url && safeEmbed.test(post.embed_url)){
      var iframe=document.createElement('iframe');
      iframe.src=post.embed_url;
      iframe.title=(post.media_type==='VIDEO'?'Property video: ':'Property post: ')+(post.title||'LLDC social media update');
      iframe.loading='lazy';
      iframe.referrerPolicy='strict-origin-when-cross-origin';
      iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.setAttribute('allowfullscreen','');
      frame.appendChild(iframe);
    }else{
      var fallback=element('a','social-media-fallback');
      if(post.permalink && safeLink.test(post.permalink)){
        fallback.href=post.permalink;fallback.target='_blank';fallback.rel='noopener noreferrer';
      }
      var inner=element('div');
      inner.appendChild(element('span','',post.media_type==='VIDEO'?'▶':'🏠'));
      inner.appendChild(element('strong','',post.media_type==='VIDEO'?'Open property video':'Open property post'));
      fallback.appendChild(inner);frame.appendChild(fallback);
    }
    return frame;
  }

  function makeAction(label,href,className){
    var link=element('a','btn '+className,label);
    link.href=href;
    if(safeLink.test(href)){link.target='_blank';link.rel='noopener noreferrer'}
    return link;
  }

  function makeCard(post){
    var card=element('article','listing-card social-property-card');
    card.dataset.socialPostId=post.id;
    var watermark=element('div','brand-watermark');watermark.appendChild(element('span','','LLDC PROPERTY SOLUTIONS'));
    card.appendChild(watermark);card.appendChild(makeMedia(post));

    var content=element('div','listing-content');
    content.appendChild(element('span','badge',(post.source||'social').toUpperCase()+' • AUTO POST'));
    content.appendChild(element('h3','',post.title||'Latest LLDC Property Update'));
    if(post.caption) content.appendChild(element('p','social-caption',post.caption));
    var published=post.published_at?new Date(post.published_at):null;
    var publishedText=published && !isNaN(published.getTime())?published.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):'Latest update';
    content.appendChild(element('p','social-source-note','Published '+publishedText+' • Synced automatically'));

    var actions=element('div','listing-actions');
    if(post.permalink && safeLink.test(post.permalink)) actions.appendChild(makeAction('View Original Post',post.permalink,'social-view-btn'));
    actions.appendChild(makeAction('Call Now','tel:+917879444555','btn-gold'));
    var enquiry='https://wa.me/917879444555?text='+encodeURIComponent('Hello LLDC, I am interested in this property: '+(post.title||'Social property post')+' '+(post.permalink||''));
    actions.appendChild(makeAction('WhatsApp',enquiry,'whatsapp-btn'));
    content.appendChild(actions);card.appendChild(content);
    return card;
  }

  function render(feed){
    var posts=feed && Array.isArray(feed.posts)?feed.posts:[];
    var existing={};
    propertySection.querySelectorAll('[data-social-post-id]').forEach(function(card){existing[card.dataset.socialPostId]=true});
    var grouped={sale:[],rent:[],commercial:[],purchase:[]};
    posts.forEach(function(post){if(post && panelIds[post.category] && !existing[post.id]) grouped[post.category].push(post)});
    var added=0;
    Object.keys(grouped).forEach(function(category){
      if(!grouped[category].length) return;
      var grid=getGrid(category);if(!grid) return;
      var fragment=document.createDocumentFragment();
      grouped[category].forEach(function(post){fragment.appendChild(makeCard(post));added++});
      grid.insertBefore(fragment,grid.firstChild);
    });
    if(status && (posts.length || added)){
      status.hidden=false;
      status.textContent=posts.length+' propert'+(posts.length===1?'y':'ies')+' synced from Instagram/Facebook';
    }
  }

  var cacheWindow=Math.floor(Date.now()/900000);
  fetch('data/social-feed.json?v='+cacheWindow,{cache:'no-store'})
    .then(function(response){if(!response.ok) throw new Error('Social feed unavailable');return response.json()})
    .then(render)
    .catch(function(error){if(window.console && console.warn) console.warn('LLDC social feed:',error.message)});
})();
