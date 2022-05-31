import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from '@shared/themes';
import { translate } from "@localize";

export const ReportsScreen = createScreenComponent(
  'hpo.reports',
  (props) => <Layout {...useProps(props)} />,
  { tabBarIcon: images.iconTabReports, tabBarLabel: translate('txtReports') },
);
