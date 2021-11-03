import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ProductCategoryStatistic = createScreenComponent(
  'hpo.report.product.category.statistic',
  (props) => <Layout {...useProps(props)} />,
);
