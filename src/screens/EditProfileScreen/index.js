import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const EditProfileScreen = createScreenComponent(
  'hpo.profile.edit',
  (props) => <Layout {...useProps(props)} />,
);
