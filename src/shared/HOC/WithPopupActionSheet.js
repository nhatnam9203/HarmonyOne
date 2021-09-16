import { PopupActionSheet } from '@shared/components/PopupActionSheet';
import React from 'react';
import { View } from 'react-native';

export const WithPopupActionSheet = (WrappedComponent) => {
  return function WithDialogConfirmComponent({ onPress, actions, ...props }) {
    const popupRef = React.useRef(null);

    const showConfirmDialog = () => {
      popupRef.current?.show();
    };

    return (
      <View>
        <WrappedComponent {...props} onPress={showConfirmDialog} />
        <PopupActionSheet ref={popupRef} actions={actions} />
      </View>
    );
  };
};
