import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SettingScreen = createScreenComponent(
  'hpo.setting',
  (props) => <Layout {...useProps(props)} />,
);
