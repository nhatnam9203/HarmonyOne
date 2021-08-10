import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  AppointmentHeaderTab,
  HeaderStaffInfo,
  CalendarHorizontal,
} from '../../widgets';
import { AppointmentItem } from './AppointmentItem';
import { appointments } from '@shared/mocks';

export const Layout = ({ onChangeWeekText, items = [] }) => {
  const onRenderItemComponent = ({ item, index }) => {
    if (!item) {
      return null;
    }
    return <AppointmentItem key={item.id} item={item} />;
  };

  const onRenderHeaderComponent = () => {
    return <View />;
  };

  const onRenderSeparatorComponent = () => {
    return <View />;
  };

  const onRenderListEmptyComponent = () => {
    return (
      <View style={styles.emptyContent}>
        <Text>Appointments empty</Text>
      </View>
    );
  };

  const onRenderFooterComponent = () => {
    return <View />;
  };

  return (
    <View style={styles.container}>
      <CalendarHorizontal onChangeWeekText={onChangeWeekText} />
      <View style={styles.content}>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContainer}
          data={appointments}
          renderItem={onRenderItemComponent}
          keyExtractor={(item) => item?.attributeId}
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
});
