import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const PaymentStatistic = createScreenComponent(
  'hpo.report.payment.statistic',
  (props) => <Layout {...useProps(props)} />,
);
