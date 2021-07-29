import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, DayPicker } from '@components';
import { scaleHeight } from '@utils';
import {
  Header,
  UserInfo,
  Time,
  Service,
  HomeService,
  ButtonSave,
  TotalInfo,
} from './widget';
import { Modalize } from 'react-native-modalize';
import styles from './styles';

const index = () => {
  const modalizeRef = React.useRef(null);

  const openCalendarPicker = () => {
    modalizeRef.current?.open();
  };

  const closeCalendarPicker = () => {
    modalizeRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <View style={{ paddingHorizontal: scaleWidth(5) }}>
          <UserInfo />
          <HomeService />
          <Time openCalendarPicker={openCalendarPicker} />
        </View>
        <Service />
        <TotalInfo />
        <View style={{ height: scaleHeight(40) }} />
      </ScrollView>
      <ButtonSave />

      <Modalize
        handleStyle={{
          opacity: 0,
        }}
        overlayStyle={{
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
        modalStyle={{
          backgroundColor: 'transparent',
        }}
        adjustToContentHeight
        onBackButtonPress={closeCalendarPicker}
        ref={modalizeRef}>
        <DayPicker
          closeCalendarPicker={closeCalendarPicker}
          bottom={scaleHeight(5)}
        />
      </Modalize>
    </View>
  );
};

export default index;
