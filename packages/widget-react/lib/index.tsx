import React from 'react';
import { MifielWidget as Widget } from './components/stencil-generated';
import dataWidget from './config.json';

export { defineCustomElements } from '@mifiel/widget-stencil/dist/loader';

export const MifielWidget = (props) => {
  const widgetVersion = `${dataWidget.appName}@${dataWidget.appVersion}`;

  const newProps = {
    ...props,
    widgetVersion,
  };

  return <Widget {...newProps} />;
};
