import React from 'react';
import Modal from 'react-native-modal';

export const CustomModal = ({ children, ...props }) => {
  return (
    <Modal
      {...props}
      transparent={true}
      backdropColor={'rgba(0,0,0,0.2)'}
      hasBackdrop={true}
      statusBarTranslucent
      //   backdropOpacity={0.3}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}>
      {children}
    </Modal>
  );
};
