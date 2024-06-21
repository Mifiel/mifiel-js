import { Plugin } from 'vue';
import { defineCustomElements } from '@mifiel/widget-stencil/dist/loader';

export const MifielWidgetPlugin: Plugin = {
  install() {
    defineCustomElements();
  },
};
