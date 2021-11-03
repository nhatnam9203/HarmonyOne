import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReportCustomerSales = createScreenComponent(
  'hpo.report.customer.sales',
  (props) => <Layout {...useProps(props)} />,
);
