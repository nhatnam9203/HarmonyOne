import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image,
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { Home, Statistic, Information, Setting } from '@screens';

import { Text } from '@components';
import { TouchableRipple } from 'react-native-paper';
import {
  calendar_bottom,
  statistic_bottom,
  setting_bottom,
  information_bottom,
} from '@assets';
import { translate } from "@localize";
import { images } from '@shared/themes';

// import Main from './Main';

const BottomStack = createBottomTabNavigator();

const IconTab = ({ focused, source }) => {
  if (!focused) {
    return <IconNormal source={source} />;
  }
  return <IconAnimated source={source} />;
};

const IconAnimated = React.memo(({ source, focused }) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const ImageAnimated = Animated.createAnimatedComponent(Image);

  React.useEffect(() => {
    Animated.timing(scale, {
      toValue: focused ? 1.37 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <ImageAnimated
      animation={'zoomIn'}
      duration={300}
      source={source}
      resizeMode="contain"
      style={styles.imgAnimated(scale, focused)}
    />
  );
});

const LabelTab = ({ focused, color, title }) => {
  return (
    <Text
      fontSize={scaleFont(14)}
      color={focused ? '#1366AE' : '#7B99BA'}
      fontFamily={focused ? 'medium' : 'regular'}>
      {title}
    </Text>
  );
};

const getTitleName = (title) => {
  let name = "";

  switch (title) {
    case "hpo.appointment":
      name = translate("txtAppointment");
      break;
    case "hpo.reports":
      name = translate("txtReports");
      break;
    case "hpo.checkoutTab":
      name = translate("txtCheckout");
      break;
    case "hpo.more":
      name = translate("txtMore");
      break;

    default:
      break;
  }

  return name;
}

const Icon = ({ source, title, focused }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <IconAnimated source={source} focused={focused} />
      <Text
        fontSize={scaleFont(11)}
        color={focused ? '#1366AE' : '#7B99BA'}
        fontFamily={focused ? 'medium' : 'regular'}
        style={{ marginTop: scaleWidth(5) }}>
        {getTitleName(title)}
      </Text>
    </View>
  );
};

const getIcon = (label) => {
  let icon = '';
  switch (label) {
    case 'hpo.appointment':
      icon = require('@src/assets/images/icon_tab_appointment.png');
      break;
    case 'hpo.reports':
      icon = images.iconTabReports;
      break;
    case 'hpo.checkoutTab':
      icon = images.iconPayment;
      break;
    case 'hpo.more':
      icon = images.iconTabMore;
      break;

    default:
      break;
  }
  return icon;
};

export function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const icon = getIcon(label);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
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
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={1}
            style={styles.btnTab}>
            <Icon source={icon} title={label} focused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Bottom = () => {
  return (
    <BottomStack.Navigator
      tabBarOptions={{
        allowFontScaling: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}>
      {/* <BottomStack.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconTab source={calendar_bottom} focused={focused} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <LabelTab title="Appointment" focused={focused} color={color} />
          ),
        }}
      /> */}
      <BottomStack.Screen
        name="Statistic"
        component={Statistic}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconTab source={statistic_bottom} focused={focused} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <LabelTab title="Statistics" focused={focused} color={color} />
          ),
        }}
      />
      <BottomStack.Screen
        name="Informations"
        component={Information}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconTab source={information_bottom} focused={focused} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <LabelTab title="Informations" focused={focused} color={color} />
          ),
        }}
      />
      <BottomStack.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconTab source={setting_bottom} focused={focused} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <LabelTab title="Settings" focused={focused} color={color} />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

export default Bottom;

const styles = StyleSheet.create({
  btnTab: {
    width: scaleWidth(375 / 4),
    height: scaleWidth(60),
    paddingBottom: scaleHeight(6),
    paddingTop: scaleWidth(8),
    backgroundColor: 'white',
  },
  imgAnimated: (scale, focused) => {
    return {
      width: scaleWidth(18),
      height: scaleWidth(18),
      tintColor: focused ? '#1366AE' : '#7B99BA',
      transform: [{ scale }],
    };
  },
});
