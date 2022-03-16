import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingRoot from './LoadingRoot';
import ModalError from './ModalError';
import {
  app,
} from '@redux/slices';
import { useDispatch, useSelector } from 'react-redux';

let RootComponent = (props, style) => {
  const dispatch = useDispatch();
  const {
    staff: { staffsByDate = [] },
    app: {
      notiIntervalId,
    },
  } = useSelector((state) => state);

  const clearIntervalById = () => {
    if (notiIntervalId) {
      clearInterval(notiIntervalId);
      dispatch(app?.resetNotiIntervalId());
    }
  };

  return (
    <View style={[styles.container, style && style]}
    onTouchStart={() => {clearIntervalById()}}>
      {props.children}
    </View>
  );
};

export default RootComponent;

const styles = StyleSheet.create({
  container: {flex: 1}
});
