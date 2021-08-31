import React from 'react';
import Modal from 'react-native-modal';

export default class index extends React.PureComponent {
  render() {
    const { isVisible } = this.props;
    return (
      <Modal
        animationIn="zoomInUp"
        animationOut="zoomOutUp"
        isVisible={isVisible}
        backdropColor={'rgba(0,0,0,0.25)'}>
        {this.props.children}
      </Modal>
    );
  }
}
