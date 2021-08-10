import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getColorForStatus } from '@shared/utils';
import { colors, fonts, layouts } from '@shared/themes';

export const AppointmentItem = ({ item }) => {
  const [backgroundColor, setBackgroundColor] = React.useState(null);
  const [textColor, setTextColor] = React.useState('#fff');

  React.useEffect(() => {
    if (item) {
      const temp = getColorForStatus(item?.status);
      setBackgroundColor(temp);
      switch (`${item?.status}`.toLowerCase()) {
        case 'confirm':
        case 'unconfirm':
          setTextColor(colors.greyish_brown_40);
          break;
        default:
          setTextColor(colors.white);
          break;
      }
    }
  }, [item]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.content, backgroundColor && { backgroundColor }]}>
        <View style={styles.rowContent}>
          <Text
            style={[
              styles.textTime,
              { color: textColor },
            ]}>{`${item.fromTime} : ${item.toTime}`}</Text>
        </View>
        <View style={styles.marginVertical} />
        <View style={styles.rowContent}>
          <Text style={[styles.textName, { color: textColor }]}>
            {item?.name}
          </Text>
          <View style={styles.marginVertical} />
          <Text style={[styles.textPhone, { color: textColor }]}>
            {item?.phone}
          </Text>
        </View>
        <View style={layouts.marginVertical} />
        <View style={styles.rowContent}>
          {item?.services?.length > 0 &&
            item.services.map((x) => (
              <Text key={x.id} style={[styles.textPhone, { color: textColor }]}>
                {x.name}
              </Text>
            ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(5),
  },

  content: {
    flex: 0,
    padding: scaleWidth(16),
    borderRadius: scaleWidth(5),
    shadowColor: '#40404040',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
  },

  rowContent: {
    flex: 0,
  },

  marginVertical: { height: scaleHeight(5) },

  textTime: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
  },

  textName: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(20),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
  },

  textPhone: {
    fontFamily: fonts.LIGHT,
    fontSize: scaleFont(12),
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
  },
});
