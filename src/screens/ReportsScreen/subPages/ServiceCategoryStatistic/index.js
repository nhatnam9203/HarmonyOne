import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ServiceCategoryStatistic = createScreenComponent(
  'hpo.report.service.category.statistic',
  (props) => <Layout {...useProps(props)} />,
);
