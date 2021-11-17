import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const PrinterList = createScreenComponent(
  'hpo.hardware.printerlist',
  (props) => <Layout {...useProps(props)} />,
);
