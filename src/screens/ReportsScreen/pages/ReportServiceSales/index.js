import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReportServiceSales = createScreenComponent(
  'hpo.report.service.sales',
  (props) => <Layout {...useProps(props)} />,
);
