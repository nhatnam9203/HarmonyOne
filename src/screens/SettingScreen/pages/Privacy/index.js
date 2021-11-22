import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const Privacy = createScreenComponent(
  'hpo.setting.privacy',
  (props) => <Layout {...useProps(props)} />,
);
