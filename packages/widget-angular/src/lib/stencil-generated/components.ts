/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

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
  outputs: ['signError', 'signSuccess'],
  standalone: false
})
export class MifielWidget {
  protected el: HTMLMifielWidgetElement;
  @Output() signError = new EventEmitter<MifielWidgetCustomEvent<any>>();
  @Output() signSuccess = new EventEmitter<MifielWidgetCustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { MifielWidgetCustomEvent } from '@mifiel/widget';

export declare interface MifielWidget extends Components.MifielWidget {

  signError: EventEmitter<MifielWidgetCustomEvent<any>>;

  signSuccess: EventEmitter<MifielWidgetCustomEvent<any>>;
}


