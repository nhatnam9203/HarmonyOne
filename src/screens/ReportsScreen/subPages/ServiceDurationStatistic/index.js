import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ServiceDurationStatistic = createScreenComponent(
  'hpo.report.service.duration.statistic',
  (props) => <Layout {...useProps(props)} />,
);
