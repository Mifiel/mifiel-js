/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@mifiel/widget-stencil';


@ProxyCmp({
  inputs: ['callToActionError', 'callToActionSuccess', 'containerClass', 'environment', 'id', 'onError', 'onSuccess', 'successBtnText'],
  methods: ['getIframe']
})
@Component({
  selector: 'mifiel-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['callToActionError', 'callToActionSuccess', 'containerClass', 'environment', 'id', 'onError', 'onSuccess', 'successBtnText'],
})
export class MifielWidget {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['error', 'success']);
  }
}


export declare interface MifielWidget extends Components.MifielWidget {

  error: EventEmitter<CustomEvent<any>>;

  success: EventEmitter<CustomEvent<any>>;
}


