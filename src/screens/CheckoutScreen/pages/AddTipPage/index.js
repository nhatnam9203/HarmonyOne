import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from '@shared/themes';

export const AddTipPage = createScreenComponent(
  'hpo.addTip',
  (props) => <Layout {...useProps(props)} />,
);
