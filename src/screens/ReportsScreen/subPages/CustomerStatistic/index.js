import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const CustomerStatistic = createScreenComponent(
  'hpo.report.customer.statistic',
  (props) => <Layout {...useProps(props)} />,
);
