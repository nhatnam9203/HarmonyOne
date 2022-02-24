import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SettingAdvancedScreen = createScreenComponent(
  'hpo.setting.advanced',
  (props) => <Layout {...useProps(props)} />,
);
