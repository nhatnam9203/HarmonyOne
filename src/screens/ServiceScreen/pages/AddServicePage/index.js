import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const AddServicePage = createScreenComponent(
  'hpo.addService',
  (props) => <Layout {...useProps(props)} />,
);
