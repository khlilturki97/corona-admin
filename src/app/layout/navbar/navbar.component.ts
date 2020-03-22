import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  jQurl  = 'assets/bundles/libscripts.bundle.js';
  jQurl2 = 'assets/bundles/mainscripts.bundle.js';
  jQurl3 = 'assets/js/script1.js';

  constructor() { }

  ngOnInit() {
    this.initilizeJQScript();
  }

  initilizeJQScript() {
    const node = document.createElement('script');
    node.src = this.jQurl;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
    const node2 = document.createElement('script');
    node2.src = this.jQurl2;
    node2.type = 'text/javascript';
    node2.async = true;
    node2.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node2);
    const node3 = document.createElement('script');
    node3.src = this.jQurl3;
    node3.type = 'text/javascript';
    node3.async = true;
    node3.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node3);

  }

}
