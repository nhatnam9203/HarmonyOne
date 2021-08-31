import { colors, fonts, images } from '@shared/themes';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

export const AppointmentHeaderTab = ({
  state,
  descriptors,
  navigation,
  position,
}) => {
  const renderButtonTab = (route, index) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.navigate({ name: route.name, merge: true });
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <TouchableOpacity
        key={route.key + index}
        style={styles.btnStyle}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}>
        <Animated.Image
          source={options.tabBarIcon}
          style={[styles.icon, isFocused && { tintColor: colors.ocean_blue }]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const renderTextLabel = () => {
    if (!state.routes) return null;
    const route = state.routes[state.index];
    const { options } = descriptors[route.key];

    return (
      <TouchableOpacity style={styles.textContent} key={route.key + 'label'}>
        <Text style={styles.textStyle}>{options.tabBarLabel ?? ' '}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {state.routes?.length > 0 && renderButtonTab(state.routes[0], 0)}
      {renderTextLabel()}
      {state.routes?.length > 1 && renderButtonTab(state.routes[1], 1)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(52),
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.48,
    textAlign: 'center',
    color: colors.black,
  },

  btnStyle: {
    width: scaleWidth(42),
    height: scaleHeight(42),
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: scaleWidth(24),
    height: scaleHeight(24),
  },
});
