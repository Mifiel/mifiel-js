import { h, Component, Prop, Element, Host, Method } from '@stencil/core';
import { loadScript } from '../../utils/load-script';

const idComponent = 'mifiel-widget';
const environments = {
  production: 'https://app.mifiel.com',
  sandbox: 'https://app.mifiel.com',
  // remove this
  develop: 'http://app.mifiel.localhost:3000',
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

  @Element() element: HTMLElement;

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

  private getOnError() {
    if (!this.callToActionError && !this.onError) {
      return null;
    }

    return {
      ...(this.callToActionError ? { callToAction: this.callToActionError } : {}),
      ...(this.onError ? { listener: this.onError } : {}),
    };
  }

  private getOnSuccess() {
    if (!this.callToActionSuccess && !this.onSuccess) {
      return null;
    }

    return {
      ...(this.callToActionSuccess ? { callToAction: this.callToActionSuccess } : {}),
      ...(this.onSuccess ? { listener: this.onSuccess } : {}),
    };
  }

  private getAdditionalProps() {
    const additionalProps: { [key: string]: any } = {};
    Array.from(this.element.attributes).forEach(attr => {
      if (!(attr.name in this)) {
        additionalProps[attr.name] = attr.value;
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
