import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReportGiftCardSales = createScreenComponent(
  'hpo.report.giftcard.sales',
  (props) => <Layout {...useProps(props)} />,
);
