import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReviewScreen = createScreenComponent(
  'hpo.review',
  (props) => <Layout {...useProps(props)} />,
);
