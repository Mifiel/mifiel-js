import { h, Component, Prop, Element, Host, Method, Event, EventEmitter } from '@stencil/core';
import { loadScript } from '../../utils/load-script';
import dataWidget from '../../config.json';

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
   * The environment to use for the widget.
   * @default 'production'
   */
  @Prop() environment: keyof typeof environments = 'production';

  /**
   * The ID of the widget.
   */
  @Prop() id: string;

  /**
   * The text of the success button.
   * @default 'Proceed to next step'
   */
  @Prop() successBtnText = 'Proceed to next step';

  /**
   * Function to be called when the document is signed successfully.
   */
  @Prop() onSuccess?: Function;

  /**
   * Main button action in the success view. Can be a URL or a function.
   */
  @Prop() callToActionSuccess?: string | Function;

  /**
   * Listener for errors that occur during the signing flow.
   */
  @Prop() onError?: Function;

  /**
   * Main button action in the full screen error view. Can be a URL or a function.
   */
  @Prop() callToActionError?: string | Function;

  /**
   * Set classes to the iframe container
   */
  @Prop() containerClass?: string;

  /**
   * Set widget version
   */
  @Prop() widgetVersion?: string = `${dataWidget.appName}@${dataWidget.appVersion}`;

  @Element() element: HTMLElement;

  @Event() error: EventEmitter<any>;

  @Event() success: EventEmitter<any>;

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
        widgetId: this.id,
        appendTo: idComponent,
        successBtnText: this.successBtnText,
        onError: this.getOnError(),
        onSuccess: this.getOnSuccess(),
      });
    });
  }

  private handleOnError = error => {
    if (this.onError) this.onError(error);

    this.error.emit(error);
  };

  private getOnError() {
    return {
      ...(this.callToActionError ? { callToAction: this.callToActionError } : {}),
      listener: this.handleOnError,
    };
  }

  private handleOnSuccess = () => {
    if (this.success) this.onSuccess();

    this.success.emit();
  };

  private getOnSuccess() {
    if (!this.callToActionSuccess && !this.onSuccess) {
      return null;
    }

    return {
      ...(this.callToActionSuccess ? { callToAction: this.callToActionSuccess } : {}),
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
