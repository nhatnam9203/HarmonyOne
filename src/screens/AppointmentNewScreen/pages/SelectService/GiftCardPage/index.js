import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const GiftCardPage = createScreenComponent(
  'GiftCardPage',
  (props) => <Layout {...useProps(props)} />,
  { tabBarLabel: 'Gift Cards' },
);
