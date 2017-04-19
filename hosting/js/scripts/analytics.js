import $ from 'jquery';

if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
  // Google
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-97577546-1', 'auto');
  ga('send', 'pageview');

  // Hotjar
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:478197,hjsv:5};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');

  $(document).ready(() => {
    $('.buy-button').click(() => {
      ga('send', 'event', 'buy-button', 'click');
    });

    $('.download-button').click(() => {
      ga('send', 'event', 'download-button', 'click');
    });
  });
}

