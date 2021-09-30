import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const MarketingScreen = createScreenComponent(
  'hpo.marketing',
  (props) => <Layout {...useProps(props)} />,
);
