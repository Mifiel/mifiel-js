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
import { Components } from '@mifiel/widget';
import dataWidget from './config.json';

import { MifielWidget as Mifiel } from './stencil-generated/components';

@Component({
  selector: 'mifiel-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content widget-version="1"></ng-content>',
})
export class MifielWidget extends Mifiel implements OnInit {
  protected override el!: HTMLElement;

  @Input() override widgetVersion?: string;

  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected override z: NgZone
  ) {
    super(c, r, z);
  }

  ngOnInit() {
    this.widgetVersion = `${dataWidget.appName}@${dataWidget.appVersion}`;
  }
}

export declare interface MifielWidget extends Components.MifielWidget {
  error: EventEmitter<CustomEvent<any>>;

  success: EventEmitter<CustomEvent<any>>;
}
