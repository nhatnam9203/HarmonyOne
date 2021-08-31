import React from 'react';
import Modal from 'react-native-modal';

export const CustomModal = ({ children, ...props }) => {
  return (
    <Modal
      {...props}
      transparent={true}
      backdropColor={'rgba(64,64,64,0.3)'}
      hasBackdrop={true}
      //   backdropOpacity={0.3}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}>
      {children}
    </Modal>
  );
};
