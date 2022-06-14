import React from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { Button } from "@shared/components";
import { HeaderBooking } from "../../widgets";
import { Calendar } from "react-native-calendars";
import { CalendarPicker } from "./CalendarPicker";
import { TimePicker } from "./TimePicker";
import { timeAvaiableRaw } from "@shared/utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import { translate } from "@localize";

export const Layout = ({
  staffsOfService,
  timesAvailable,
  goToReview,
  staffSelected,
  calendarRef,
  timePickerRef,
  isRefetchDate,
}) => {

  return (
    <View style={styles.container}>
      <HeaderBooking
        step={3}
        title={translate('txtSelectDateTime')}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <CalendarPicker
            ref={calendarRef}
            staffSelected={staffSelected}
            isRefetchDate={isRefetchDate}
          />
          <View style={styles.line} />
          <TimePicker
            ref={timePickerRef}
            timesAvailable={timesAvailable}
          />
        </ScrollView>

        <View style={styles.bottom}>
          <Button
            label={translate("txtNext")}
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
    paddingBottom: 0
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
    marginTop: scaleHeight(3)
  }
});
