import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const AddServiceDetailPage = createScreenComponent(
  'hpo.addServiceDetailPage',
  (props) => <Layout {...useProps(props)} />,
);
