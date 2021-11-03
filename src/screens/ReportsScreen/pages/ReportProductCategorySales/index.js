import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReportProductCategorySales = createScreenComponent(
  'hpo.report.product.category.sales',
  (props) => <Layout {...useProps(props)} />,
);
