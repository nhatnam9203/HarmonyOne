import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const MarketingEfficiencyStatistic = createScreenComponent(
  'hpo.report.marketing.efficiency.statistic',
  (props) => <Layout {...useProps(props)} />,
);
