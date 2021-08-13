import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  AppointmentHeaderTab,
  HeaderStaffInfo,
  CalendarHorizontal,
} from '../../widgets';
import { AppointmentItem } from './AppointmentItem';
import { ListEmptyComponent } from '@shared/components';

export const Layout = ({ onChangeWeekText, items, onDateSelected }) => {
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
