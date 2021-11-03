import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const GiftCardSoldPage = createScreenComponent(
  'hpo.settlement.giftcard.sold',
  (props) => <Layout {...useProps(props)} />,
);
