import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const FeedbackScreen = createScreenComponent(
  'hpo.feedback',
  (props) => <Layout {...useProps(props)} />,
);
