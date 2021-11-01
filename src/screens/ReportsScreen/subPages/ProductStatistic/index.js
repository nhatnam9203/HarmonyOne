import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ProductStatistic = createScreenComponent(
  'hpo.report.product.statistic',
  (props) => <Layout {...useProps(props)} />,
);
