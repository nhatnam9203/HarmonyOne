import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { Button } from "@shared/components";
import { HeaderBooking } from "../../widgets";
import { Calendar } from "react-native-calendars";
import { CalendarPicker } from "./CalendarPicker";
import { TimePicker } from "./TimePicker";
import { getTimeAvaible } from "@shared/utils";
import AntDesign from "react-native-vector-icons/AntDesign";

export const Layout = ({
  staffsOfService,
  timesAvailable,
  goToReview,
}) => {

  return (
    <View style={styles.container}>
      <HeaderBooking
        step={3}
        title={'Select Date/Time'}
      />
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <CalendarPicker />
          <View style={styles.line} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: scaleHeight(20) }}>
            <TimePicker title="Morning" data={getTimeAvaible(timesAvailable).morning} />
            <TimePicker title="Afternoon" data={getTimeAvaible(timesAvailable).afternoon} />
            <TimePicker title="Evening" data={getTimeAvaible(timesAvailable).evening} />
          </View>
        </View>

        <View style={styles.bottom}>
          <Button  
            label="Next"
            onPress={goToReview}
            highlight={true}
            width={'100%'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    padding: scaleWidth(8),
    paddingTop: scaleWidth(8)
  },
  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
    backgroundColor: "white"
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: scaleHeight(8)
  }
});
