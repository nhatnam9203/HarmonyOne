import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ExtraNewScreen = createScreenComponent(
  'hpo.extra.new',
  (props) => <Layout {...useProps(props)} />,
);
