import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ProductScreen = createScreenComponent(
  'hpo.product',
  (props) => <Layout {...useProps(props)} />,
);
