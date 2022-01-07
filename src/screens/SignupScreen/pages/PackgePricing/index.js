import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const PackagePricing = createScreenComponent(
  'hpo.signup.packagePricing',
  (props) => <Layout {...useProps(props)} />,
);
 