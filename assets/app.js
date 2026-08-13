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