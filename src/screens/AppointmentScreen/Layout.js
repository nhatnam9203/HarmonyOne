
import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { images, layouts, fonts } from '@shared/themes';
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ListEmptyComponent, NotificationIcon, DayPicker } from "@shared/components";
import { AppointmentItem } from "./widgets";
import { useTranslation } from "react-i18next";
import { WithPopupActionSheet, WithPopupDatePicker } from '@shared/HOC';
import { StaffList, AppointmentList, IconCalendar } from "./widgets";
import { dateToFormat } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';
import moment from "moment";


export const Layout = ({
  staffsByDate,
  appointmentsByDate,
  blockTimesVisibile,
  date,
  setDate,
  visibleDatePicker,
  setVisibleDatePicker,
  selectStaff,
  staffSelected,
  onChangeAppointmentId,
  isRefresh,
  onRefresh,
  addAppointment,
  isLoading
}) => {

  console.log({ blockTimesVisibile })

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        isRight={true}
        isLeft={true}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerLeftComponent={() =>
          <IconCalendar
            onPress={() => setDate(moment().format("YYYY-MM-DD"))}
          />
        }
        headerCenterComponent={() =>
          <DayPicker
            dayPicked={date}
            onApply={datePicked => setDate(datePicked)}
          />
        }
        headerRightComponent={() =>
          <NotificationIcon />
        }
      >
        <View style={styles.content}>
          <StaffList
            staffsByDate={staffsByDate}
            selectStaff={selectStaff}
            staffSelected={staffSelected}
            isLoading={isLoading}
          />
          <AppointmentList
            blockTimes={blockTimesVisibile}
            onChangeAppointmentId={onChangeAppointmentId}
            isRefresh={isRefresh}
            onRefresh={onRefresh}
          />
        </View>

        <IconButton
          icon={images.iconAdd}
          iconStyle={styles.addIcon}
          onPress={addAppointment}
          style={styles.btnAddAppointment}
        />
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    position: 'relative',
    backgroundColor: "#FCFCFC"
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  addIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },

  btnAddAppointment: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#1366AE',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  date: {
    fontSize: scaleFont(19),
    fontFamily: fonts.MEDIUM
  },

  dropdown: {
    width: scaleWidth(13),
    height: scaleWidth(13),
    marginLeft: scaleWidth(8),
    tintColor: "black",
  }
});
