import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const InvoiceDetailScreen = createScreenComponent(
  'hpo.invoice.detail',
  (props) => <Layout {...useProps(props)} />,
);
