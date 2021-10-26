import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const TransactionsPage = createScreenComponent(
  'hpo.settlement.transactions',
  (props) => <Layout {...useProps(props)} />,
  { tabBarLabel: 'Transactions' },
);
