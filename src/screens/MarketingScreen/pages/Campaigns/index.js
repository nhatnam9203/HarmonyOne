import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const Campaigns = createScreenComponent(
  'hpo.campaigns',
  (props) => <Layout {...useProps(props)} />,
);
