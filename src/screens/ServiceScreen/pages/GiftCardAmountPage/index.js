import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from '@shared/themes';

export const GiftCardAmountPage = createScreenComponent(
  'hpo.edit.service.giftcard.amount',
  (props) => <Layout {...useProps(props)} />,
);
