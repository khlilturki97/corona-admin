import {Directive, ElementRef} from '@angular/core';
import {LoaderService} from '../_services/loader.service';

declare var $: any;

@Directive({
  selector: '[appBlockUi]'
})
export class BlockUiDirective {
  block: any;
  isLoading = this.loaderService.isLoading;

  constructor(private el: ElementRef,
              private loaderService: LoaderService) {

    this.isLoading.subscribe(
      (data) => {
        this.initBlock();
        console.log(data);
        if (data === false) {
          this.unBlock();
        }
      }
    );
  }


  initBlock(): void {
    this.block = $(this.el.nativeElement).block({
      message: '<span class="font-weight-semibold">Please wait...</span>',
      overlayCSS: {
        backgroundColor: '#fff',
        opacity: 0.8,
        cursor: 'wait'
      },
      css: {
        border: 0,
        padding: 0,
        backgroundColor: 'transparent'
      }
    });
  }

  unBlock(): void {
    this.block = $(this.el.nativeElement).unblock();
  }
}
