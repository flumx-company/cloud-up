import { Directive, ElementRef, Input, OnInit } from '@angular/core';
// tslint:disable-next-line:no-any
declare var $: any;

@Directive({
  selector: '[appFlagToIcon]'
})
export class FlagToIconDirective implements OnInit {
  @Input() appFlagToIcon: boolean;
  @Input() type: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    const elem = $(this.el.nativeElement);

    switch(this.type) {
      case "enabled": {
        this.appFlagToIcon ? elem.addClass('fa-toggle-on') : elem.addClass('fa-toggle-off');
        break;
      }
      case "locked": {
        this.appFlagToIcon ? elem.addClass('fa-lock') : elem.addClass('fa-lock-open');
        break;
      }
      default: {
        break;
      }
    }
  }
}
