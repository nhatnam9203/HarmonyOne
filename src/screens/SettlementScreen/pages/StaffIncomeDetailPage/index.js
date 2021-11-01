import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const StaffIncomeDetailPage = createScreenComponent(
  'hpo.settlement.staff.income.detail',
  (props) => <Layout {...useProps(props)} />,
  { tabBarLabel: 'Transactions' },
);
