import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import { Components } from '@mifiel/widget-stencil';
import {
  ProxyCmp,
  proxyOutputs,
} from './stencil-generated/angular-component-lib/utils';
import dataWidget from './config.json';

@ProxyCmp({
  inputs: [
    'callToActionError',
    'callToActionSuccess',
    'containerClass',
    'environment',
    'id',
    'onError',
    'onSuccess',
    'successBtnText',
    'widgetVersion',
  ],
  methods: ['getIframe'],
})
@Component({
  selector: 'mifiel-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content widget-version="1"></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'callToActionError',
    'callToActionSuccess',
    'containerClass',
    'environment',
    'id',
    'onError',
    'onSuccess',
    'successBtnText',
    'widgetVersion',
  ],
})
export class MifielWidget implements OnInit {
  protected el: HTMLElement;

  @Input() widgetVersion?: string;

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['error', 'success']);
  }

  ngOnInit() {
    this.widgetVersion = `${dataWidget.appName}@${dataWidget.appVersion}`;
  }
}

export declare interface MifielWidget extends Components.MifielWidget {
  error: EventEmitter<CustomEvent<any>>;

  success: EventEmitter<CustomEvent<any>>;
}
