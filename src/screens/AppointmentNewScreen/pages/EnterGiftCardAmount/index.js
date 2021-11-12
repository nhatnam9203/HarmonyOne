import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from '@shared/themes';

export const EnterGiftCardAmount = createScreenComponent(
  'hpo.appointment.booking.enterGiftCardAmount',
  (props) => <Layout {...useProps(props)} />,
);
