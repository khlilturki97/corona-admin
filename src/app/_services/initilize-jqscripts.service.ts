import {Injectable} from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class InitilizeJQScriptsService {


  // jQurls = ['assets/bundles/libscripts.bundle.js',
  //   'assets/bundles/vendorscripts.bundle.js',
  //   'assets/bundles/morrisscripts.bundle.js',
  //   'assets/bundles/jvectormap.bundle.js',
  //   'assets/bundles/knob.bundle.js',
  //   'assets/bundles/mainscripts.bundle.js',
  //   'assets/bundles/sparkline.bundle.js'];

  jQurls = [
    'assets/bundles/mainscripts.bundle.js',
];

  constructor() {
  }


  fixSelectJQBug() {
  $.AdminCompass.select = {
      activate: function () {
        $.fn.selectpicker && $('select:not(.ms)').selectpicker()
      }
    }, $('.boxs-close').on('click', function () {
      $(this).parents('.card').addClass('closed').fadeOut()
    });
    var edge = 'Microsoft Edge', ie10 = 'Internet Explorer 10', ie11 = 'Internet Explorer 11', opera = 'Opera',
      firefox = 'Mozilla Firefox', chrome = 'Google Chrome', safari = 'Safari';
  }

  initilizeJQScript() {
    this.jQurls.forEach((url) => {
      const node = document.createElement('script');
      node.src = url;
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    });

  }

}
