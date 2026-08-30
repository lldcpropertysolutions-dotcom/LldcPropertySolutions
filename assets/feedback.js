'use strict';

(function(){
  var form=document.getElementById('websiteFeedbackForm');
  if(!form) return;

  function value(data,key,fallback){
    var item=String(data.get(key)||'').trim();
    return item||fallback;
  }

  form.addEventListener('submit',function(event){
    event.preventDefault();
    if(!form.reportValidity()) return;

    var data=new FormData(form);
    var reportId='LLDC-WEB-'+Date.now().toString(36).toUpperCase();
    var lines=[
      '*LLDC WEBSITE TRIAL — ISSUE REPORT*',
      '',
      '*Report ID:* '+reportId,
      '*Tester:* '+value(data,'testerName','Not provided'),
      '*Device:* '+value(data,'device','Not provided'),
      '*Browser:* '+value(data,'browser','Not provided'),
      '*Section:* '+value(data,'section','Not provided'),
      '*Issue type:* '+value(data,'issueType','Not provided'),
      '*Priority:* '+value(data,'priority','Normal'),
      '',
      '*What happened:*',
      value(data,'details','Not provided'),
      '',
      '*Page link:* '+value(data,'pageUrl','Not provided'),
      '',
      'Please attach a screenshot or screen recording, if available.'
    ];

    var whatsappUrl='https://wa.me/917879444555?text='+encodeURIComponent(lines.join('\n'));
    window.location.href=whatsappUrl;
  });
})();
