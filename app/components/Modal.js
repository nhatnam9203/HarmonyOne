import React from "react";
import { View, PanResponder, StyleSheet } from "react-native";

export default class index extends React.PureComponent {
  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (evt.nativeEvent.locationX === evt.nativeEvent.pageX) {
          this.props.onRequestClose();
        }
      },
    });
  }

  render() {
    const { isVisible } = this.props;
    if (isVisible)
      return (
        <View
          style={[styles.container, { ...this.props.style }]}
          {...this._panResponder.panHandlers}>
          {this.props.children}
        </View>
      );
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});
