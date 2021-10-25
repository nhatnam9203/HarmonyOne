import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const InvoiceScreen = createScreenComponent(
  'hpo.invoice',
  (props) => <Layout {...useProps(props)} />,
);
