import { Plugin } from 'vue';
import { defineCustomElements } from '@mifiel/widget/dist/loader';

export const MifielWidgetPlugin: Plugin = {
  install() {
    defineCustomElements(window);
  },
};
