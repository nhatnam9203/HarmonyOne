import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const MarketPlace = createScreenComponent(
  'hpo.marketplace',
  (props) => <Layout {...useProps(props)} />,
);
