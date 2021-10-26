import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const BatchHistoryPage = createScreenComponent(
  'hpo.settlement.batch.history',
  (props) => <Layout {...useProps(props)} />,
  { tabBarLabel: 'Batch history' },
);
