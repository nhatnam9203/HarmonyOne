import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ExtraScreen = createScreenComponent(
  'hpo.extra',
  (props) => <Layout {...useProps(props)} />,
);
