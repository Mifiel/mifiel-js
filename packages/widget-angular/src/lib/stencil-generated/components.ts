/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@mifiel/widget';


@ProxyCmp({
  inputs: ['containerClass', 'environment', 'errorBtnAction', 'id', 'onSignError', 'onSignSuccess', 'successBtnAction', 'successBtnText', 'widgetVersion'],
  methods: ['getIframe']
})
@Component({
  selector: 'mifiel-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['containerClass', 'environment', 'errorBtnAction', 'id', 'onSignError', 'onSignSuccess', 'successBtnAction', 'successBtnText', 'widgetVersion'],
})
export class MifielWidget {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['signError', 'signSuccess']);
  }
}


export declare interface MifielWidget extends Components.MifielWidget {

  signError: EventEmitter<CustomEvent<any>>;

  signSuccess: EventEmitter<CustomEvent<any>>;
}


