import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReportProductSales = createScreenComponent(
  'hpo.report.product.sales',
  (props) => <Layout {...useProps(props)} />,
);
