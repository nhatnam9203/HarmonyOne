import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const EditActualAmountPage = createScreenComponent(
  'hpo.settlement.editAmount',
  (props) => <Layout {...useProps(props)} />,
);