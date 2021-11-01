import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReportOverallMarketingEfficiency = createScreenComponent(
  'hpo.report.overall.marketingEfficiency',
  (props) => <Layout {...useProps(props)} />,
);
