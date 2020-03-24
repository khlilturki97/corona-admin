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
