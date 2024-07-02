/* eslint-disable */
/* tslint:disable */
import { defineComponent, h } from 'vue';
import { defineContainer } from './vue-component-lib/utils';
import type { JSX } from '@mifiel/widget-stencil';
import dataWidget from './config.json';

const widgetVersion = `${dataWidget.appName}@${dataWidget.appVersion}`

const Widget = /*@__PURE__*/ defineContainer<JSX.MifielWidget>(
  'mifiel-widget',
  undefined,
);

export const MifielWidget = defineComponent({
  name: 'MifielWidget',
  setup(props, { slots }) {
    return () =>
      h(Widget, { ...props, 'widget-version': widgetVersion }, slots);
  },
});
