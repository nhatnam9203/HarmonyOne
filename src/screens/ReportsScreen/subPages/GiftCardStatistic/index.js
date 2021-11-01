import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const GiftCardStatistic = createScreenComponent(
  'hpo.report.giftcard.statistic',
  (props) => <Layout {...useProps(props)} />,
);
