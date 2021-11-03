import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from '@shared/themes';

export const ReviewSettlementPage = createScreenComponent(
  "hpo.settlement.review",
  (props) => <Layout {...useProps(props)} />,
  { tabBarLabel: 'Settlement' },
);
