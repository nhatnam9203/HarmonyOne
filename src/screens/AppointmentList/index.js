import React from 'react';
import { FlatList } from 'react-native';
import { scaleWidth, scaleHeight } from '@utils';
import AppointmentItem from './AppointmentItem';

const dataAppointments = [
  {
    id: '1255647657',
    status: 'checkin',
    name: 'Alison Dunlap',
    fromTime: '08.00 AM',
    toTime: '09:00 AM',
    phone: '(+84) 35514 0858',
    services: [
      {
        name: 'Spa pedi - At work & Gel clor',
      },
      {
        name: 'Spa pedi - At work & Gel clor',
      },
    ],
  },
  {
    id: '1255647658',
    status: 'confirm',
    fromTime: '08.00 AM',
    name: 'Alison Dunlap',
    toTime: '09:00 AM',
    phone: '(+84) 35514 0858',
    services: [
      {
        name: 'Spa pedi - At work & Gel clor',
      },
      {
        name: 'Spa pedi - At work & Gel clor',
      },
    ],
  },
  {
    id: '1255647657',
    status: 'unconfirm',
    fromTime: '08.00 AM',
    name: 'Alison Dunlap',
    toTime: '09:00 AM',
    phone: '(+84) 35514 0858',
    services: [
      {
        name: 'Spa pedi - At work & Gel clor',
      },
      {
        name: 'Spa pedi - At work & Gel clor',
      },
    ],
  },
  {
    id: '1255647657',
    status: 'paid',
    fromTime: '08.00 AM',
    name: 'Alison Dunlap',
    toTime: '09:00 AM',
    phone: '(+84) 35514 0858',
    services: [
      {
        name: 'Spa pedi - At work & Gel clor',
      },
      {
        name: 'Spa pedi - At work & Gel clor',
      },
    ],
  },
];

const AppointmentList = () => {
  const [data, setData] = React.useState(dataAppointments);

  return (
    <FlatList
      data={data}
      style={{ flex: 1, backgroundColor: 'white' }}
      renderItem={({ item }) => <AppointmentItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default AppointmentList;
