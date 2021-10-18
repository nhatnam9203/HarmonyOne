import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ExtraSelectScreen = createScreenComponent(
  'hpo.extra.select',
  (props) => <Layout {...useProps(props)} />,
);
