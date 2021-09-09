import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  AppointmentHeaderTab,
  HeaderStaffInfo,
  CalendarHorizontal,
} from '../../widgets';
import { AppointmentItem } from './AppointmentItem';
import { ListEmptyComponent } from '@shared/components';
import { useNavigation } from '@react-navigation/core';
import { images } from "@shared/themes/resources";

export const Layout = ({ onChangeWeekText, items, onDateSelected }) => {

  const navigation = useNavigation();

  const addAppointment = () => {
    navigation.push(screenNames.AppointmentNewScreen);
  }

  const [t] = useTranslation();

  const onRenderItemComponent = ({ item, index }) => {
    return <AppointmentItem key={item?.appointmentId + ''} item={item} />;
  };

  const onRenderHeaderComponent = () => {
    return <View />;
  };

  const onRenderSeparatorComponent = () => {
    return <View />;
  };

  const onRenderListEmptyComponent = () => {
    return <ListEmptyComponent description={t('No Appointments')} />;
  };

  const onRenderFooterComponent = () => {
    return <View />;
  };

  return (
    <View style={styles.container}>
      <CalendarHorizontal
        onChangeWeekText={onChangeWeekText}
        onDateSelected={onDateSelected}
      />
      <View style={styles.content}>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContainer}
          data={items}
          renderItem={onRenderItemComponent}
          keyExtractor={(item) => item?.appointmentId + ''}
          ListHeaderComponent={onRenderHeaderComponent}
          ListFooterComponent={onRenderFooterComponent}
          ItemSeparatorComponent={onRenderSeparatorComponent}
          ListEmptyComponent={onRenderListEmptyComponent}
        // refreshControl={
        //   <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        // }
        // onEndReachedThreshold={0.1}
        // onEndReached={onHandleLoadMore}
        />
      </View>

      <TouchableOpacity
        onPress={addAppointment}
        style={styles.btnAddAppointment}
        hitSlop={{ top : 10, left : 10, right : 10, bottom : 10 }}
      >
        <Image
          style={styles.addIcon}
          source={images.iconAdd}
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    position: 'relative',
  },

  flatList: {
    flex: 1,
  },

  flatListContainer: {
    backgroundColor: '#fff',
  },

  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  addIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },

  btnAddAppointment: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#1366AE',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
