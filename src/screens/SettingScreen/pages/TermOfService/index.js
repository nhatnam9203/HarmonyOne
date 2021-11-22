import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const TermOfService = createScreenComponent(
  'hpo.setting.term.service',
  (props) => <Layout {...useProps(props)} />,
);
