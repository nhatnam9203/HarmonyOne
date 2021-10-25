import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SelectPeriod = createScreenComponent(
  'hpo.selectPeriod',
  (props) => <Layout {...useProps(props)} />,
);
