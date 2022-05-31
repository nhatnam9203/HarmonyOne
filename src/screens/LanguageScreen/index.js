import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const LanguageScreen = createScreenComponent(
  'hpo.language',
  (props) => <Layout {...useProps(props)} />,
);
