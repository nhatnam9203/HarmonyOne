import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const EditPaidServicePage = createScreenComponent(
  'hpo.editPaidServicePage',
  (props) => <Layout {...useProps(props)} />,
);
