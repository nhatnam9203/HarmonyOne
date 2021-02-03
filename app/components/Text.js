import React, { Component } from "react";
import { Text } from "react-native";

const fonts = {
  regular: "SFProDisplay-Regular",
  bold: "SFProDisplay-Bold",
  semi: "SFProDisplay-Semibold",
  medium: "SFProDisplay-Medium",
};

export default class TextComponent extends Component {
  render() {
    const { fontSize, color, fontFamily = "regular", style, children, ...anyProps } = this.props;
    const _fontsFamily = fonts[fontFamily];

    return (
      <Text
        style={[
          {
            color,
            fontSize: fontSize,
            fontFamily: _fontsFamily,
          },
          style,
        ]}
        allowFontScaling={false}
        {...anyProps}>
        {children}
      </Text>
    );
  }
}
