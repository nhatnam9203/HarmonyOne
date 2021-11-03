import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ServiceStatistic = createScreenComponent(
  'hpo.report.service.statistic',
  (props) => <Layout {...useProps(props)} />,
);
