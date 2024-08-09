import { h, Component, Prop, Element, Host, Method, Event, EventEmitter } from '@stencil/core';
import { loadScript } from '../../utils/load-script';
import dataWidget from '../config.json';

const idComponent = 'mifiel-widget';
const environments = {
  production: 'https://app.mifiel.com',
  sandbox: 'https://app-sandbox.mifiel.com',
};

@Component({
  tag: 'mifiel-widget',
})
export class MifielWidget {
  /**
   * The widget ID.
   */
  @Prop() id: string;

  /**
   * The environment to use for the widget.
   * @default 'production'
   */
  @Prop() environment: keyof typeof environments = 'production';

  /**
   * Function will be called when the document is signed successfully.
   */
  @Prop() onSignSuccess?: Function;

  /**
   * Function that will be called whenever an error occurs during the signing flow.
   */
  @Prop() onSignError?: Function;

  /**
   * The text of the success button.
   * @default 'Proceed to next step'
   */
  @Prop() successBtnText = 'Proceed to next step';

  /**
   * Function to be executed when the main button is clicked on the success page. It can also be a string containing a URL to redirect to.
   */
  @Prop() successBtnAction?: string | Function;

  /**
   * Function to be executed when the main button is clicked in the error page. It can also be a string containing a URL to redirect to.
   */
  @Prop() errorBtnAction?: string | Function;

  /**
   * Set classes to the iframe container
   */
  @Prop() containerClass?: string;

  /**
   * Set widget version
   */
  @Prop() widgetVersion?: string = `${dataWidget.appName}@${dataWidget.appVersion}`;

  @Element() element: HTMLElement;

  @Event() signError: EventEmitter<any>;

  @Event({ eventName: 'sign-error' }) signErrorVue: EventEmitter<any>;

  @Event() signSuccess: EventEmitter<any>;

  @Event({ eventName: 'sign-success' }) signSuccessVue: EventEmitter<any>;

  @Method()
  async getIframe() {
    return this.element.querySelector('iframe');
  }

  componentWillLoad() {
    // @ts-ignore
    window.mifiel = window.mifiel || [];
    for (
      let e = ['widget'],
        i = function (e) {
          return function () {
            // @ts-ignore
            window.mifiel.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        },
        t = 0;
      t < e.length;
      t++
    ) {
      const n = e[t];
      // @ts-ignore
      window.mifiel[n] || (window.mifiel[n] = i(n));
    }

    loadScript(`${environments[this.environment]}/sign-widget-v1.0.0.js`).then(() => {
      // @ts-ignore
      window.mifiel.widget({
        ...this.getAdditionalProps(),
        widgetVersion: this.widgetVersion,
        widgetId: this.id,
        appendTo: idComponent,
        successBtnText: this.successBtnText,
        onError: this.getOnError(),
        onSuccess: this.getOnSuccess(),
      });
    });
  }

  private handleOnError = error => {
    if (this.onSignError) this.onSignError(error);

    if (this.widgetVersion.includes('@mifiel/widget-vue')) {
      return this.signErrorVue.emit(error);
    }

    return this.signError.emit(error);
  };

  private getOnError() {
    return {
      ...(this.errorBtnAction ? { callToAction: this.errorBtnAction } : {}),
      listener: this.handleOnError,
    };
  }

  private handleOnSuccess = () => {
    if (this.onSignSuccess) this.onSignSuccess();

    if (this.widgetVersion.includes('@mifiel/widget-vue')) {
      return this.signSuccessVue.emit();
    }

    return this.signSuccess.emit();
  };

  private getOnSuccess() {
    if (!this.successBtnAction && !this.onSignSuccess) {
      return null;
    }

    return {
      ...(this.successBtnAction ? { callToAction: this.successBtnAction } : {}),
      listener: this.handleOnSuccess,
    };
  }

  private getAdditionalProps() {
    const additionalProps: { [key: string]: any } = {};

    const parseValue = (value: string): any => {
      // Convert 'true' and 'false' to booleans
      if (value === 'true') return true;
      if (value === 'false') return false;

      // Convert numbers
      const num = parseFloat(value);
      if (!Number.isNaN(num) && Number.isFinite(num)) return num;

      // Default to string
      return value;
    };

    Array.from(this.element.attributes).forEach(attr => {
      if (!(attr.name in this)) {
        additionalProps[attr.name] = parseValue(attr.value);
      }
    });

    return additionalProps;
  }

  render() {
    return (
      <Host>
        <div id={idComponent} class={this.containerClass} />
      </Host>
    );
  }
}
