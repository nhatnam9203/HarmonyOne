import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReportOverallPaymentMethod = createScreenComponent(
  'hpo.report.overall.paymentMethod',
  (props) => <Layout {...useProps(props)} />,
);
