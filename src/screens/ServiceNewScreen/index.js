import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ServiceNewScreen = createScreenComponent(
  'hpo.service.new',
  (props) => <Layout {...useProps(props)} />,
);
