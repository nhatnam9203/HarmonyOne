import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import FastImage from "react-native-fast-image";
import { images } from "@shared/themes";

const styles = StyleSheet.create({
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: "#e1e4e8",
  },
});

const AnimatedProgress = Animated.createAnimatedComponent(FastImage);

export class LazyImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);

  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear
    }).start();
  };

  render() {
    const {
      thumbnailSource = images.placeHolder,
      source,
      style,
      containerStyle,
      ...props
    } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <AnimatedProgress
          {...props}
          source={thumbnailSource}
          style={[style, { opacity: this.thumbnailAnimated }]}
          onLoad={this.handleThumbnailLoad}
          blurRadius={1}
        />
        <AnimatedProgress
          {...props}
          source={source}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
        />
      </View>
    );
  }
}
