import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SettlementScreen = createScreenComponent(
  'hpo.settlement',
  (props) => <Layout {...useProps(props)} />,
);
