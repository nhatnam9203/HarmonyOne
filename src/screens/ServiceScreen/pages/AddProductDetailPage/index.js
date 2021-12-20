import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const AddProductDetailPage = createScreenComponent(
  'hpo.addProductDetailPage',
  (props) => <Layout {...useProps(props)} />,
);
