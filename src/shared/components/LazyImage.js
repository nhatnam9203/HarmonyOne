import React from "react";
import { images as ICONS } from "@shared/themes";
import { StyleSheet, View, Animated } from "react-native";
import Image from "react-native-fast-image";
export const LazyImage = (props) => {
  const {
    source,
    thumbnailSource = ICONS["service_default"],
    style,
    backgroundColor = "transparent",
  } = props;
  const [color, setColor] = React.useState("#e1e4e8");

  const AnimatedView = Animated.createAnimatedComponent(Image);

  let thumbnailAnimated = new Animated.Value(0);
  let imageAnimated = new Animated.Value(0);

  // const [thumbnailAnimated, setThumbnail] = React.useState(0);
  // const [imageAnimated, setImage] = React.useState(0);

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      // useNativeDriver: true,
    }).start();
  };
  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      // useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ backgroundColor: "red" }}>
      <AnimatedView
        source={thumbnailSource}
        style={[style, { opacity: thumbnailAnimated }]}
        onLoad={handleThumbnailLoad}
        blurRadius={1}
      />
      <AnimatedView
        source={source}
        style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
        onError={(e) => console.log({ e })}
        onLoad={onImageLoad}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    //backgroundColor: '#e1e4e8',
  },
});
