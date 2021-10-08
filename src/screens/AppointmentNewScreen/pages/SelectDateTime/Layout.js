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
            onPress={() => { }}
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



const theme = {
  arrowColor: "#0764B0",
  "stylesheet.calendar.header": {
    header: {
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: scaleHeight(0.5),
      borderRadius: scaleWidth(20),
      paddingHorizontal: scaleWidth(4),
      marginBottom: scaleHeight(16)
    },
    monthText: {
      color: colors.black,
      fontSize: scaleFont(18),
      fontFamily: fonts.REGULAR,
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: scaleWidth(5),
      width: scaleWidth(14),
      textAlign: "center",
      fontSize: scaleFont(16),
      color: "#585858",
      fontFamily: fonts.REGULAR,
      marginBottom: scaleHeight(8)
    },
  },
  backgroundColor: "#2B2E33",
  calendarBackground: "white",
  selectedDayBackgroundColor: "#0764B0",
  selectedDayTextColor: "#fff",
  todayTextColor: "#404040",
  dayTextColor: "#404040",
  textDisabledColor: "grey",
  textDayFontWeight: "500",
  textDayFontSize: scaleFont(15),
  textDayFontFamily: fonts.REGULAR,

};

