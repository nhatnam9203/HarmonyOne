import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const CloseSettlementPage = createScreenComponent(
  'hpo.settlement.close',
  (props) => <Layout {...useProps(props)} />,
  { tabBarLabel: 'Settlement' },
);
