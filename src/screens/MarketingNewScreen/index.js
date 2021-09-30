import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const MarketingNewScreen = createScreenComponent(
  'hpo.marketing.new',
  (props) => <Layout {...useProps(props)} />,
);
