import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from '@shared/themes';

export const BusinessInformationScreen = createScreenComponent(
  'hpo.businessInformation',
  (props) => <Layout {...useProps(props)} />,
);
