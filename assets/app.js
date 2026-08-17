'use strict';

(function(){
  var menu=document.getElementById('menuToggle');
  var nav=document.querySelector('header nav');
  if(!menu||!nav) return;
  menu.addEventListener('click',function(){
    var opening=!nav.classList.contains('open');
    nav.classList.toggle('open',opening);
    menu.setAttribute('aria-expanded',opening?'true':'false');
  });
  nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')})});
})();

// Original page module 1
(function(){
document.querySelectorAll('.tab').forEach(function(tab){
  tab.addEventListener('click',function(){
    var target=document.getElementById(tab.dataset.panel);
    var isOpen=tab.classList.contains('active');
    document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active')});
    document.querySelectorAll('.panel').forEach(function(p){p.classList.remove('active')});
    document.querySelectorAll('.tab').forEach(function(t){t.setAttribute('aria-expanded','false')});
    var tabGroup=tab.closest('.tabs');
    if(tabGroup) tabGroup.classList.remove('has-open-tab');
    if(!isOpen && target){
      tab.classList.add('active');
      tab.setAttribute('aria-expanded','true');
      target.classList.add('active');
      if(tabGroup) tabGroup.classList.add('has-open-tab');
    }
  });
});
document.querySelectorAll('nav a').forEach(function(a){
  a.addEventListener('click',function(){document.querySelector('nav').classList.remove('open')});
});
document.getElementById('year').textContent=new Date().getFullYear();
})();

// Original page module 2
(function(){
document.querySelectorAll('.req-tab').forEach(function(tab){
  tab.addEventListener('click',function(){
    document.querySelectorAll('.req-tab').forEach(function(t){t.classList.remove('active')});
    document.querySelectorAll('.req-panel').forEach(function(p){p.classList.remove('active')});
    tab.classList.add('active');
    var target=document.getElementById(tab.getAttribute('data-req'));
    if(target) target.classList.add('active');
  });
});

document.querySelectorAll('.req-form').forEach(function(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var data=new FormData(form);
    var lines=[];
    data.forEach(function(value,key){
      if(value) lines.push(key.charAt(0).toUpperCase()+key.slice(1)+': '+value);
    });
    var type=form.getAttribute('data-type') || 'Property Enquiry';
    var message='Hello LLDC Property Solutions,%0A%0A*'+encodeURIComponent(type)+'*%0A%0A'+encodeURIComponent(lines.join('\n'));
    var popup=window.open('https://wa.me/917879444555?text='+message,'_blank','noopener,noreferrer');
    if(popup) popup.opener=null;
  });
});
})();

// Original page module 3
(function(){
(function(){
  const glow=document.createElement('div');
  glow.className='glow-follow';
  document.body.appendChild(glow);
  let mx=window.innerWidth/2,my=window.innerHeight/2;
  window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;glow.style.left=mx+'px';glow.style.top=my+'px';},{passive:true});

  const revealItems=document.querySelectorAll('.reveal');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  revealItems.forEach(item=>observer.observe(item));

  document.querySelectorAll('.cards,.updates-grid,.commercial-grid').forEach(group=>{
    [...group.children].forEach((item,i)=>{
      item.style.transitionDelay=(i*70)+'ms';
      item.classList.add('reveal');
      observer.observe(item);
    });
  });
})();
})();

// LLDC multilingual smart help assistant
(function(){
  var root=document.getElementById('lldcAiAssistant');
  if(!root) return;

  var launcher=document.getElementById('lldcAiLauncher');
  var panel=document.getElementById('lldcAiPanel');
  var closeButton=document.getElementById('lldcAiClose');
  var messages=document.getElementById('lldcAiMessages');
  var form=document.getElementById('lldcAiForm');
  var input=document.getElementById('lldcAiInput');
  var quickList=document.getElementById('lldcAiQuickList');
  var quickLabel=document.getElementById('lldcAiQuickLabel');
  var status=document.getElementById('lldcAiStatus');
  var note=document.getElementById('lldcAiNote');
  var langButtons=Array.prototype.slice.call(root.querySelectorAll('.lldc-ai-lang'));
  var currentLang='en';
  var welcomed=false;
  var lastFocus=null;

  var copy={
    en:{
      status:'Verified website help',answerLabel:'Verified answer',quickLabel:'Quick help',placeholder:'Ask about rent, sale, legal help…',note:'Verified website information only. Property availability may change.',
      welcome:'Hello! I am the LLDC Smart Assistant. Ask me about available properties, rent, sale, commercial spaces, purchase requirements, legal support or our office location.',
      languageChanged:'English selected. How can I help you?',
      quick:[['properties','🏘️ Available properties'],['rent','🔑 Rent'],['sale','🏠 Sale'],['commercial','🏢 Commercial'],['legal','⚖️ Legal help'],['office','📍 Office']],
      responses:{
        greeting:'Hello! How can I help with your property requirement today?',
        properties:'Current website listings:\n• 3 properties for sale\n• 10 residential rentals\n• 4 commercial spaces\n\nChoose a category to see complete verified details.',
        rent:'There are 10 rental listings in Kingston Elysia, Hinjewadi, Right Bhusari Colony, Handewadi, Maan, S.B. Road, Model Colony, Baner and Kothrud. Rents currently shown range from ₹16,000 to ₹55,000 per month.',
        sale:'There are 3 sale listings: 1 BHK in Warje Malwadi at ₹47 lakh, 2 BHK at Nyati Ebony in Undri at ₹60 lakh, and a furnished 3 BHK near Eklavya College at ₹2.51 crore.',
        commercial:'There are 4 commercial options: F.C. Road 1 RK office at ₹25,000/month, Bhusale Nagar office at ₹1.50 lakh/month, S.B. Road office at ₹65,000/month and Konark Icon, Magarpatta at ₹1.45 lakh/month plus maintenance.',
        purchase:'No fixed purchase listing is published. Share your preferred location, budget, property type or BHK and area requirement; LLDC will shortlist suitable options.',
        legal:'Legal consultation is available through Adv. Prasad Rajendra Bade and the advocate associate network. Please use “Request Legal Consultation” in the Services section to reveal the one-click consultation contact options.',
        documents:'LLDC coordinates support for leave and licence agreements, sale documents, lease deeds, registration steps and related property paperwork. Final legal advice should be confirmed with the advocate.',
        office:'LLDC Property Solutions is at Office No. 4, Anant Manohar Apartment, Paud Road, Left Bhusari Colony, Kothrud, Pune 411038.',
        contact:'For property enquiries, call or WhatsApp LLDC at 7879-444-555, or email lldcpropertysolutions@gmail.com.',
        services:'LLDC assists with residential sale and rent, commercial spaces, property purchase requirements, documentation, registration coordination and client support.',
        kothrud:'Kothrud-area options currently shown are: Right Bhusari Colony 2 BHK at ₹30,000 for family or ₹35,000 for office; Wanaz 2 BHK at ₹45,000; and Warje Malwadi 1 BHK for sale at ₹47 lakh.',
        hinjewadi:'Hinjewadi-area rentals currently shown are: semi-furnished 2 BHK at ₹25,000/month and 2 BHK in Maan at ₹16,000/month.',
        undri:'Undri-area options currently shown are: Kingston Elysia 2 BHK rental at ₹16,000/month and Nyati Ebony 2 BHK for sale at ₹60 lakh.',
        baner:'Baner rentals currently shown are: semi-furnished 3 BHK near Mahabaleshwar Hotel at ₹40,000/month and fully furnished 3 BHK behind Ranka Jewellers at ₹55,000/month.',
        sbroad:'S.B. Road options currently shown are: furnished 2 BHK rental at ₹50,000/month and furnished converted office near ICC Towers at ₹65,000/month.',
        modelcolony:'Model Colony currently has a fully furnished 2 BHK rental behind Kedareshwar Temple at ₹50,000/month.',
        fcroad:'F.C. Road currently has a 350 sq.ft. 1 RK property for office, consultancy or startup use at ₹25,000/month.',
        bhusale:'Bhusale Nagar currently has a 1,500 sq.ft. fully furnished office at ₹1.50 lakh/month; rent is negotiable.',
        magarpatta:'Konark Icon, Magarpatta currently has a furnished office with 35 workstations at ₹1.45 lakh/month plus maintenance.',
        fallback:'I could not find that detail in the verified website information. To avoid giving you incorrect information, I can send your exact question to the LLDC team on WhatsApp.'
      },
      actions:{viewRent:'View rental properties',viewSale:'View sale properties',viewCommercial:'View commercial spaces',sharePurchase:'Share purchase requirement',legal:'Open legal consultation',services:'View services',maps:'Open Google Maps',call:'Call LLDC',whatsapp:'Ask LLDC on WhatsApp'}
    },
    mr:{
      status:'वेबसाइटवरील पडताळलेली मदत',answerLabel:'पडताळलेले उत्तर',quickLabel:'त्वरित मदत',placeholder:'भाडे, विक्री किंवा कायदेशीर मदत विचारा…',note:'फक्त पडताळलेली वेबसाइट माहिती. उपलब्धता बदलू शकते.',
      welcome:'नमस्कार! मी LLDC स्मार्ट सहाय्यक आहे. उपलब्ध मालमत्ता, भाडे, विक्री, व्यावसायिक जागा, खरेदीची गरज, कायदेशीर मदत किंवा कार्यालयाचा पत्ता याबद्दल विचारा.',
      languageChanged:'मराठी निवडली आहे. मी तुम्हाला कशी मदत करू?',
      quick:[['properties','🏘️ उपलब्ध मालमत्ता'],['rent','🔑 भाडे'],['sale','🏠 विक्री'],['commercial','🏢 व्यावसायिक'],['legal','⚖️ कायदेशीर मदत'],['office','📍 कार्यालय']],
      responses:{
        greeting:'नमस्कार! आज तुमच्या मालमत्तेच्या गरजेसाठी मी कशी मदत करू?',
        properties:'वेबसाइटवरील सध्याच्या नोंदी:\n• विक्रीसाठी 3 मालमत्ता\n• भाड्याने 10 निवासी मालमत्ता\n• 4 व्यावसायिक जागा\n\nसंपूर्ण पडताळलेली माहिती पाहण्यासाठी श्रेणी निवडा.',
        rent:'Kingston Elysia, Hinjewadi, Right Bhusari Colony, Handewadi, Maan, S.B. Road, Model Colony, Baner आणि Kothrud येथे 10 भाड्याच्या नोंदी आहेत. वेबसाइटवरील भाडे ₹16,000 ते ₹55,000 प्रतिमहिना आहे.',
        sale:'विक्रीसाठी 3 नोंदी आहेत: Warje Malwadi येथे 1 BHK ₹47 लाख, Undri मधील Nyati Ebony येथे 2 BHK ₹60 लाख आणि Eklavya College जवळ फर्निश्ड 3 BHK ₹2.51 कोटी.',
        commercial:'4 व्यावसायिक पर्याय आहेत: F.C. Road 1 RK ऑफिस ₹25,000/महिना, Bhusale Nagar ऑफिस ₹1.50 लाख/महिना, S.B. Road ऑफिस ₹65,000/महिना आणि Konark Icon, Magarpatta ₹1.45 लाख/महिना अधिक मेंटेनन्स.',
        purchase:'खरेदीसाठी ठराविक नोंद प्रकाशित केलेली नाही. पसंतीचे ठिकाण, बजेट, मालमत्तेचा प्रकार/BHK आणि क्षेत्रफळ सांगा; LLDC योग्य पर्याय निवडून देईल.',
        legal:'Adv. Prasad Rajendra Bade आणि सहयोगी वकिलांच्या नेटवर्कमार्फत कायदेशीर सल्ला उपलब्ध आहे. संपर्क पर्याय पाहण्यासाठी Services विभागातील “Request Legal Consultation” वापरा.',
        documents:'LLDC लिव्ह अँड लायसन्स करार, विक्री कागदपत्रे, लीज डीड, नोंदणीची प्रक्रिया आणि संबंधित मालमत्ता कागदपत्रांसाठी समन्वय करते. अंतिम कायदेशीर सल्ला वकिलांकडून निश्चित करा.',
        office:'LLDC Property Solutions: ऑफिस क्र. 4, अनंत मनोहर अपार्टमेंट, पौड रोड, लेफ्ट भुसारी कॉलनी, कोथरूड, पुणे 411038.',
        contact:'मालमत्ता चौकशीसाठी LLDC ला 7879-444-555 वर कॉल किंवा WhatsApp करा, किंवा lldcpropertysolutions@gmail.com वर ईमेल करा.',
        services:'LLDC निवासी विक्री व भाडे, व्यावसायिक जागा, मालमत्ता खरेदी आवश्यकता, कागदपत्रे, नोंदणी समन्वय आणि क्लायंट सपोर्ट देते.',
        kothrud:'Kothrud परिसरातील सध्याचे पर्याय: Right Bhusari Colony 2 BHK कुटुंबासाठी ₹30,000 किंवा ऑफिससाठी ₹35,000; Wanaz 2 BHK ₹45,000; आणि Warje Malwadi 1 BHK विक्री ₹47 लाख.',
        hinjewadi:'Hinjewadi परिसरातील भाड्याचे पर्याय: सेमी-फर्निश्ड 2 BHK ₹25,000/महिना आणि Maan येथे 2 BHK ₹16,000/महिना.',
        undri:'Undri परिसरातील पर्याय: Kingston Elysia 2 BHK भाडे ₹16,000/महिना आणि Nyati Ebony 2 BHK विक्री ₹60 लाख.',
        baner:'Baner मधील भाड्याचे पर्याय: Mahabaleshwar Hotel जवळ सेमी-फर्निश्ड 3 BHK ₹40,000/महिना आणि Ranka Jewellers मागे फुली फर्निश्ड 3 BHK ₹55,000/महिना.',
        sbroad:'S.B. Road पर्याय: फर्निश्ड 2 BHK भाडे ₹50,000/महिना आणि ICC Towers जवळ फर्निश्ड ऑफिस ₹65,000/महिना.',
        modelcolony:'Model Colony येथे Kedareshwar Temple मागे फुली फर्निश्ड 2 BHK ₹50,000/महिना उपलब्ध आहे.',
        fcroad:'F.C. Road येथे ऑफिस, कन्सल्टन्सी किंवा स्टार्टअपसाठी 350 चौ.फुट 1 RK ₹25,000/महिना आहे.',
        bhusale:'Bhusale Nagar येथे 1,500 चौ.फुट फुली फर्निश्ड ऑफिस ₹1.50 लाख/महिना आहे; भाडे निगोशिएबल आहे.',
        magarpatta:'Konark Icon, Magarpatta येथे 35 वर्कस्टेशन असलेले फर्निश्ड ऑफिस ₹1.45 लाख/महिना अधिक मेंटेनन्स आहे.',
        fallback:'ही माहिती पडताळलेल्या वेबसाइट डेटामध्ये मिळाली नाही. चुकीची माहिती देण्याऐवजी तुमचा अचूक प्रश्न LLDC टीमला WhatsApp वर पाठवता येईल.'
      },
      actions:{viewRent:'भाड्याच्या मालमत्ता पहा',viewSale:'विक्रीच्या मालमत्ता पहा',viewCommercial:'व्यावसायिक जागा पहा',sharePurchase:'खरेदीची गरज पाठवा',legal:'कायदेशीर सल्ला उघडा',services:'सेवा पहा',maps:'Google Maps उघडा',call:'LLDC ला कॉल करा',whatsapp:'LLDC ला WhatsApp करा'}
    },
    hi:{
      status:'वेबसाइट की सत्यापित सहायता',answerLabel:'सत्यापित उत्तर',quickLabel:'त्वरित सहायता',placeholder:'किराया, बिक्री या कानूनी सहायता पूछें…',note:'केवल सत्यापित वेबसाइट जानकारी। उपलब्धता बदल सकती है।',
      welcome:'नमस्ते! मैं LLDC स्मार्ट असिस्टेंट हूँ। उपलब्ध संपत्ति, किराया, बिक्री, कमर्शियल जगह, खरीद आवश्यकता, कानूनी सहायता या कार्यालय के पते के बारे में पूछें।',
      languageChanged:'हिंदी चुनी गई है। मैं आपकी कैसे सहायता करूँ?',
      quick:[['properties','🏘️ उपलब्ध संपत्तियाँ'],['rent','🔑 किराया'],['sale','🏠 बिक्री'],['commercial','🏢 कमर्शियल'],['legal','⚖️ कानूनी सहायता'],['office','📍 कार्यालय']],
      responses:{
        greeting:'नमस्ते! आज आपकी प्रॉपर्टी आवश्यकता में मैं कैसे सहायता करूँ?',
        properties:'वेबसाइट पर मौजूदा लिस्टिंग:\n• बिक्री के लिए 3 संपत्तियाँ\n• किराये के लिए 10 घर\n• 4 कमर्शियल जगहें\n\nपूरी सत्यापित जानकारी देखने के लिए श्रेणी चुनें।',
        rent:'Kingston Elysia, Hinjewadi, Right Bhusari Colony, Handewadi, Maan, S.B. Road, Model Colony, Baner और Kothrud में 10 किराये की लिस्टिंग हैं। वेबसाइट पर किराया ₹16,000 से ₹55,000 प्रति माह है।',
        sale:'बिक्री के लिए 3 लिस्टिंग हैं: Warje Malwadi में 1 BHK ₹47 लाख, Undri के Nyati Ebony में 2 BHK ₹60 लाख और Eklavya College के पास फर्निश्ड 3 BHK ₹2.51 करोड़।',
        commercial:'4 कमर्शियल विकल्प हैं: F.C. Road 1 RK ऑफिस ₹25,000/माह, Bhusale Nagar ऑफिस ₹1.50 लाख/माह, S.B. Road ऑफिस ₹65,000/माह और Konark Icon, Magarpatta ₹1.45 लाख/माह तथा मेंटेनेंस।',
        purchase:'खरीद के लिए कोई तय लिस्टिंग प्रकाशित नहीं है। पसंदीदा स्थान, बजट, प्रॉपर्टी प्रकार/BHK और क्षेत्र बताइए; LLDC उपयुक्त विकल्प शॉर्टलिस्ट करेगा।',
        legal:'Adv. Prasad Rajendra Bade और सहयोगी वकीलों के नेटवर्क के माध्यम से कानूनी परामर्श उपलब्ध है। संपर्क विकल्प देखने के लिए Services सेक्शन में “Request Legal Consultation” दबाएँ।',
        documents:'LLDC लीव एंड लाइसेंस एग्रीमेंट, बिक्री दस्तावेज, लीज डीड, रजिस्ट्रेशन प्रक्रिया और संबंधित प्रॉपर्टी कागज़ात में समन्वय करता है। अंतिम कानूनी सलाह वकील से पुष्टि करें।',
        office:'LLDC Property Solutions: ऑफिस नं. 4, अनंत मनोहर अपार्टमेंट, पौड रोड, लेफ्ट भुसारी कॉलोनी, कोथरूड, पुणे 411038।',
        contact:'प्रॉपर्टी पूछताछ के लिए 7879-444-555 पर LLDC को कॉल या WhatsApp करें, या lldcpropertysolutions@gmail.com पर ईमेल करें।',
        services:'LLDC आवासीय बिक्री और किराया, कमर्शियल जगह, संपत्ति खरीद आवश्यकताएँ, दस्तावेज़, रजिस्ट्रेशन समन्वय और क्लाइंट सहायता देता है।',
        kothrud:'Kothrud क्षेत्र के मौजूदा विकल्प: Right Bhusari Colony 2 BHK परिवार के लिए ₹30,000 या ऑफिस के लिए ₹35,000; Wanaz 2 BHK ₹45,000; और Warje Malwadi 1 BHK बिक्री ₹47 लाख।',
        hinjewadi:'Hinjewadi क्षेत्र में किराये के विकल्प: सेमी-फर्निश्ड 2 BHK ₹25,000/माह और Maan में 2 BHK ₹16,000/माह।',
        undri:'Undri क्षेत्र के विकल्प: Kingston Elysia 2 BHK किराया ₹16,000/माह और Nyati Ebony 2 BHK बिक्री ₹60 लाख।',
        baner:'Baner में किराये के विकल्प: Mahabaleshwar Hotel के पास सेमी-फर्निश्ड 3 BHK ₹40,000/माह और Ranka Jewellers के पीछे फुली फर्निश्ड 3 BHK ₹55,000/माह।',
        sbroad:'S.B. Road विकल्प: फर्निश्ड 2 BHK किराया ₹50,000/माह और ICC Towers के पास फर्निश्ड ऑफिस ₹65,000/माह।',
        modelcolony:'Model Colony में Kedareshwar Temple के पीछे फुली फर्निश्ड 2 BHK ₹50,000/माह है।',
        fcroad:'F.C. Road पर ऑफिस, कंसल्टेंसी या स्टार्टअप के लिए 350 वर्ग फुट 1 RK ₹25,000/माह है।',
        bhusale:'Bhusale Nagar में 1,500 वर्ग फुट फुली फर्निश्ड ऑफिस ₹1.50 लाख/माह है; किराया नेगोशिएबल है।',
        magarpatta:'Konark Icon, Magarpatta में 35 वर्कस्टेशन वाला फर्निश्ड ऑफिस ₹1.45 लाख/माह तथा मेंटेनेंस पर है।',
        fallback:'यह जानकारी सत्यापित वेबसाइट डेटा में नहीं मिली। गलत जानकारी देने के बजाय आपका सही सवाल LLDC टीम को WhatsApp पर भेजा जा सकता है।'
      },
      actions:{viewRent:'किराये की संपत्तियाँ देखें',viewSale:'बिक्री की संपत्तियाँ देखें',viewCommercial:'कमर्शियल जगह देखें',sharePurchase:'खरीद आवश्यकता भेजें',legal:'कानूनी परामर्श खोलें',services:'सेवाएँ देखें',maps:'Google Maps खोलें',call:'LLDC को कॉल करें',whatsapp:'LLDC को WhatsApp करें'}
    }
  };

  var topicActions={
    properties:[['panel','rent','viewRent'],['panel','sale','viewSale'],['panel','commercial','viewCommercial']],
    rent:[['panel','rent','viewRent'],['whatsapp','','whatsapp']],
    sale:[['panel','sale','viewSale'],['whatsapp','','whatsapp']],
    commercial:[['panel','commercial','viewCommercial'],['whatsapp','','whatsapp']],
    purchase:[['panel','purchase','sharePurchase'],['whatsapp','','whatsapp']],
    legal:[['legal','','legal']],documents:[['legal','','legal'],['whatsapp','','whatsapp']],
    office:[['maps','','maps']],contact:[['call','','call'],['whatsapp','','whatsapp']],services:[['scroll','services','services']],
    kothrud:[['panel','rent','viewRent'],['panel','sale','viewSale']],hinjewadi:[['panel','rent','viewRent']],undri:[['panel','rent','viewRent'],['panel','sale','viewSale']],
    baner:[['panel','rent','viewRent']],sbroad:[['panel','rent','viewRent'],['panel','commercial','viewCommercial']],modelcolony:[['panel','rent','viewRent']],
    fcroad:[['panel','commercial','viewCommercial']],bhusale:[['panel','commercial','viewCommercial']],magarpatta:[['panel','commercial','viewCommercial']]
  };

  function addMessage(text,who){
    var item=document.createElement('div');
    item.className='lldc-ai-message '+who;
    if(who==='bot') item.setAttribute('data-answer-label',copy[currentLang].answerLabel);
    item.textContent=text;
    messages.appendChild(item);
    messages.scrollTop=messages.scrollHeight;
  }

  function createAction(spec,query){
    var type=spec[0],target=spec[1],labelKey=spec[2];
    var label=copy[currentLang].actions[labelKey];
    var control;
    if(type==='maps' || type==='call' || type==='whatsapp'){
      control=document.createElement('a');
      if(type==='maps'){
        control.href='https://maps.app.goo.gl/X3Ku3aSke16KZWF88';
        control.target='_blank';
        control.rel='noopener noreferrer';
      }else if(type==='call'){
        control.href='tel:+917879444555';
      }else{
        var question=query || copy[currentLang].responses.fallback;
        control.href='https://wa.me/917879444555?text='+encodeURIComponent('Hello LLDC Property Solutions, I need help with: '+question);
        control.target='_blank';
        control.rel='noopener noreferrer';
      }
    }else{
      control=document.createElement('button');
      control.type='button';
      control.addEventListener('click',function(){
        closeAssistant(false);
        if(type==='panel') openPropertyPanel(target);
        if(type==='scroll') scrollToSection(target);
        if(type==='legal') openLegalConsultation();
      });
    }
    control.className='lldc-ai-action';
    control.textContent=label;
    return control;
  }

  function addActions(topic,query){
    var specs=topicActions[topic];
    if(!specs && topic==='fallback') specs=[['whatsapp','','whatsapp'],['call','','call']];
    if(!specs) return;
    var group=document.createElement('div');
    group.className='lldc-ai-actions';
    specs.forEach(function(spec){group.appendChild(createAction(spec,query))});
    messages.appendChild(group);
    messages.scrollTop=messages.scrollHeight;
  }

  function openPropertyPanel(id){
    var tab=document.querySelector('.tab[data-panel="'+id+'"]');
    if(tab && !tab.classList.contains('active')) tab.click();
    window.setTimeout(function(){
      var section=document.getElementById('properties');
      if(section) section.scrollIntoView({behavior:'smooth',block:'start'});
    },30);
  }

  function scrollToSection(id){
    var section=document.getElementById(id);
    if(section) window.setTimeout(function(){section.scrollIntoView({behavior:'smooth',block:'start'})},30);
  }

  function openLegalConsultation(){
    var toggle=document.getElementById('legalContactToggle');
    if(toggle && toggle.getAttribute('aria-expanded')!=='true') toggle.click();
    scrollToSection('services');
  }

  function inferLanguage(text){
    if(!/[\u0900-\u097F]/.test(text)) return currentLang;
    if(/भाड|मालमत्ता|कुठ|आहे|विक्री|खरेदी|कायदेशीर|पहा|सांगा|मदत/.test(text)) return 'mr';
    return 'hi';
  }

  function has(text,terms){return terms.some(function(term){return text.indexOf(term)!==-1})}

  function detectTopic(raw){
    var text=raw.toLowerCase().replace(/[^a-z0-9\u0900-\u097f. ]+/g,' ').replace(/\s+/g,' ').trim();
    if(has(text,['kothrud','कोथरूड','कोथरुड','वारजे','warje','wanaz','भुसारी','bhusari'])) return 'kothrud';
    if(has(text,['hinjewadi','हिंजवडी','हिंजेवाडी','maan','मान '])) return 'hinjewadi';
    if(has(text,['undri','उंड्री','pisoli','पिसोली','nyati','kingston'])) return 'undri';
    if(has(text,['baner','बाणेर'])) return 'baner';
    if(has(text,['s.b. road','sb road','सेनापती बापट','एस बी रोड'])) return 'sbroad';
    if(has(text,['model colony','मॉडेल कॉलनी'])) return 'modelcolony';
    if(has(text,['f.c. road','fc road','एफ सी रोड'])) return 'fcroad';
    if(has(text,['bhusale','भुसले नगर','भुसाले नगर'])) return 'bhusale';
    if(has(text,['magarpatta','मगरपट्टा','konark icon'])) return 'magarpatta';
    if(has(text,['commercial','कमर्शियल','व्यावसायिक','office','ऑफिस','कार्यालय','workspace','दुकान'])) return 'commercial';
    if(has(text,['legal','advocate','lawyer','वकील','कायदेशीर','कानूनी','प्रसाद बडे','prasad bade'])) return 'legal';
    if(has(text,['document','agreement','registration','leave and licence','leave & licence','करार','नोंदणी','कागदपत्र','दस्तावेज','एग्रीमेंट','रजिस्ट्रेशन'])) return 'documents';
    if(has(text,['purchase','buy','buyer','खरेदी','खरेदीसाठी','खरीद','खरीदना'])) return 'purchase';
    if(has(text,['sale','sell','विक्री','विकणे','बिक्री','बेचना'])) return 'sale';
    if(has(text,['rent','rental','भाडे','भाड्याने','किराया','रेंट'])) return 'rent';
    if(has(text,['address','location','map','office where','पत्ता','कुठे','नकाशा','पता','कहाँ'])) return 'office';
    if(has(text,['contact','phone','mobile','call','whatsapp','email','संपर्क','फोन','मोबाईल','कॉल','नंबर'])) return 'contact';
    if(has(text,['service','services','सेवा','सर्विस'])) return 'services';
    if(has(text,['property','properties','available','listing','flat','bhk','मालमत्ता','उपलब्ध','फ्लॅट','संपत्ति','प्रॉपर्टी'])) return 'properties';
    if(has(text,['hello','hi','hey','namaste','नमस्कार','नमस्ते'])) return 'greeting';
    return 'fallback';
  }

  function answer(topic,query){
    var response=copy[currentLang].responses[topic] || copy[currentLang].responses.fallback;
    addMessage(response,'bot');
    addActions(topic,query);
  }

  function submitQuestion(question,forcedTopic){
    var clean=(question || '').trim();
    if(!clean) return;
    var detectedLang=inferLanguage(clean);
    if(detectedLang!==currentLang) setLanguage(detectedLang,false);
    addMessage(clean,'user');
    answer(forcedTopic || detectTopic(clean),clean);
  }

  function renderQuickHelp(){
    quickList.textContent='';
    copy[currentLang].quick.forEach(function(item){
      var button=document.createElement('button');
      button.type='button';
      button.className='lldc-ai-quick';
      button.textContent=item[1];
      button.addEventListener('click',function(){submitQuestion(item[1],item[0])});
      quickList.appendChild(button);
    });
  }

  function setLanguage(lang,announce){
    if(!copy[lang]) return;
    currentLang=lang;
    langButtons.forEach(function(button){button.setAttribute('aria-pressed',button.dataset.lang===lang?'true':'false')});
    status.textContent=copy[lang].status;
    quickLabel.textContent=copy[lang].quickLabel;
    input.placeholder=copy[lang].placeholder;
    input.lang=lang==='en'?'en':lang;
    note.textContent=copy[lang].note;
    renderQuickHelp();
    if(announce) addMessage(copy[lang].languageChanged,'bot');
  }

  function openAssistant(){
    lastFocus=document.activeElement;
    panel.hidden=false;
    launcher.setAttribute('aria-expanded','true');
    document.body.classList.add('lldc-ai-open');
    if(!welcomed){addMessage(copy[currentLang].welcome,'bot');welcomed=true}
    window.setTimeout(function(){input.focus()},30);
  }

  function closeAssistant(returnFocus){
    panel.hidden=true;
    launcher.setAttribute('aria-expanded','false');
    document.body.classList.remove('lldc-ai-open');
    if(returnFocus!==false && lastFocus && typeof lastFocus.focus==='function') lastFocus.focus();
  }

  launcher.addEventListener('click',function(){panel.hidden?openAssistant():closeAssistant(true)});
  closeButton.addEventListener('click',function(){closeAssistant(true)});
  langButtons.forEach(function(button){button.addEventListener('click',function(){setLanguage(button.dataset.lang,true);input.focus()})});
  form.addEventListener('submit',function(event){event.preventDefault();var question=input.value;input.value='';submitQuestion(question);input.focus()});
  document.addEventListener('keydown',function(event){if(event.key==='Escape' && !panel.hidden) closeAssistant(true)});

  setLanguage('en',false);
})();

// Original page module 4
(function(){
(function(){
  var slider=document.getElementById('servicesSlider');
  if(!slider) return;

  var items=Array.prototype.slice.call(slider.querySelectorAll('.service-item'));
  var tabs=Array.prototype.slice.call(slider.querySelectorAll('.service-tab'));
  var current=0;
  var timer=null;
  var interval=4600;
  var reduceMotion=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobileStable=window.matchMedia && window.matchMedia('(max-width: 850px)');

  function activate(index,moveFocus){
    current=(index+items.length)%items.length;
    items.forEach(function(item,i){
      var active=i===current;
      item.classList.toggle('active',active);
      var tab=item.querySelector('.service-tab');
      var panel=item.querySelector('.service-desc');
      tab.setAttribute('aria-selected',active?'true':'false');
      tab.setAttribute('aria-expanded',active?'true':'false');
      tab.setAttribute('tabindex',active?'0':'-1');
      panel.setAttribute('aria-hidden',active?'false':'true');
    });

    var progress=items[current].querySelector('.service-progress');
    if(progress){
      progress.style.animation='none';
      void progress.offsetWidth;
      progress.style.animation='';
    }
    if(moveFocus) tabs[current].focus();
  }

  function stop(){
    if(timer){window.clearInterval(timer);timer=null}
    slider.classList.add('is-paused');
  }

  function start(){
    if(reduceMotion || (mobileStable && mobileStable.matches) || document.hidden) return;
    stop();
    slider.classList.remove('is-paused');
    timer=window.setInterval(function(){activate(current+1,false)},interval);
  }

  tabs.forEach(function(tab,index){
    tab.addEventListener('click',function(){
      activate(index,false);
      start();
    });
    tab.addEventListener('keydown',function(event){
      var next=null;
      if(event.key==='ArrowDown' || event.key==='ArrowRight') next=index+1;
      if(event.key==='ArrowUp' || event.key==='ArrowLeft') next=index-1;
      if(event.key==='Home') next=0;
      if(event.key==='End') next=items.length-1;
      if(next!==null){
        event.preventDefault();
        activate(next,true);
        stop();
      }
    });
  });

  slider.addEventListener('mouseenter',stop);
  slider.addEventListener('mouseleave',start);
  slider.addEventListener('focusin',stop);
  slider.addEventListener('focusout',function(){
    window.setTimeout(function(){
      if(!slider.contains(document.activeElement)) start();
    },0);
  });
  slider.addEventListener('touchstart',stop,{passive:true});
  slider.addEventListener('touchend',function(){window.setTimeout(start,900)},{passive:true});
  document.addEventListener('visibilitychange',function(){document.hidden?stop():start()});
  window.addEventListener('pagehide',stop);

  activate(0,false);
  start();
})();
})();

// Original page module 5
(function(){
(function(){
  var toggle=document.getElementById('legalContactToggle');
  var options=document.getElementById('legalContactOptions');
  if(toggle&&options){
    toggle.addEventListener('click',function(){
      var opening=toggle.getAttribute('aria-expanded')!=='true';
      toggle.setAttribute('aria-expanded',opening?'true':'false');
      options.hidden=!opening;
      if(opening){
        var firstLink=options.querySelector('a');
        if(firstLink) window.setTimeout(function(){firstLink.focus()},50);
      }
    });
  }
})();
})();

// Original page module 6
(function(){
(function(){
  var services=[
    {icon:'🏠',label:'Residential Sale',title:'Sell Your Property with Confidence',text:'From listing presentation and buyer coordination to negotiation support, we help position your property for a smooth and transparent sale.',link:'Explore Sale Properties',href:'#properties'},
    {icon:'🔑',label:'Rental Services',title:'Find the Right Tenant or Home',text:'Residential rental assistance for families, working professionals, owners, and tenants—with clear communication from enquiry to possession.',link:'Explore Rental Properties',href:'#properties'},
    {icon:'🏢',label:'Commercial Solutions',title:'Workspaces That Fit Your Business',text:'Office, retail, and commercial property support based on location, area, budget, amenities, and the operational needs of your business.',link:'Explore Commercial Properties',href:'#properties'},
    {icon:'🎯',label:'Property Purchase',title:'Focused Property Search',text:'Share your exact requirement and LLDC will shortlist suitable options, coordinate visits, and support your purchase decision.',link:'Submit Purchase Requirement',href:'#requirements'},
    {icon:'📄',label:'Documentation',title:'Agreements & Registration Support',text:'Coordinated assistance for leave and licence agreements, sale documents, lease deeds, registration steps, and related paperwork.',link:'Ask About Documentation',href:'#contact'},
    {icon:'🤝',label:'Client Support',title:'One Point of Contact',text:'Responsive updates, property-specific coordination, visit scheduling, and continued assistance throughout your real-estate journey.',link:'Contact LLDC',href:'#contact'}
  ];
  var tabs=Array.prototype.slice.call(document.querySelectorAll('.our-service-tab'));
  var content=document.getElementById('ourDisplayContent');
  var count=document.getElementById('ourCurrentCount');
  var progress=document.getElementById('ourProgressBar');
  var stage=document.querySelector('.our-service-stage');
  if(!stage || !content || !tabs.length) return;
  var active=0,timer=null,reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,mobileStable=window.matchMedia&&window.matchMedia('(max-width: 850px)');
  function render(index){
    active=index;var item=services[index];
    tabs.forEach(function(tab,i){tab.classList.toggle('active',i===index);tab.setAttribute('aria-selected',i===index?'true':'false');tab.setAttribute('tabindex',i===index?'0':'-1')});
    content.style.animation='none';void content.offsetWidth;
    content.innerHTML='<div class="our-display-icon" aria-hidden="true">'+item.icon+'</div><div class="our-display-label">'+item.label+'</div><h3>'+item.title+'</h3><p>'+item.text+'</p><a class="our-display-link" href="'+item.href+'">'+item.link+' <span aria-hidden="true">→</span></a>';
    content.style.animation='ourEnter .55s ease both';count.textContent=String(index+1).padStart(2,'0');progress.style.animation='none';void progress.offsetWidth;progress.style.animation='ourProgress 5s linear forwards';
  }
  function start(){window.clearInterval(timer);if(!reduceMotion&&!(mobileStable&&mobileStable.matches)) timer=window.setInterval(function(){render((active+1)%services.length)},5000)}
  tabs.forEach(function(tab,index){tab.addEventListener('click',function(){render(index);start()});tab.addEventListener('keydown',function(event){var next=null;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=index+1;if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=index-1;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==null){event.preventDefault();next=(next+tabs.length)%tabs.length;render(next);tabs[next].focus();window.clearInterval(timer)}})});
  stage.addEventListener('mouseenter',function(){window.clearInterval(timer)});stage.addEventListener('mouseleave',start);stage.addEventListener('focusin',function(){window.clearInterval(timer)});stage.addEventListener('focusout',start);
  render(0);start();
})();
})();
