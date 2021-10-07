
import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { images, layouts, fonts } from '@shared/themes';
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ListEmptyComponent } from "@shared/components";
import { AppointmentItem } from "./widgets";
import { useTranslation } from "react-i18next";
import { WithPopupActionSheet, WithPopupDatePicker } from '@shared/HOC';
import { StaffList, AppointmentList } from "./widgets";
import { dateToFormat } from "@shared/utils"

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
}) => {

  const [t] = useTranslation();

  let HeaderCenter = ({ onPress, ...props }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.row}
        {...props}
      >
        <Text style={styles.date}>
          {dateToFormat(date, "MM DD, YYYY")}
        </Text>
        <Image
          resizeMode='contain'
          source={images.dropdown}
          style={[styles.dropdown]}
        />
      </TouchableOpacity>
    )
  }

  HeaderCenter = WithPopupDatePicker(HeaderCenter);

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        isRight={true}
        isLeft={true}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerCenterComponent={() =>
          <HeaderCenter
            onConfirm={datePicker => {
              setDate(datePicker)
            }}
          />
        }
        headerRightComponent={() =>
          <IconButton
            icon={images.iconBell}
            iconStyle={styles.icon}
            style={styles.button}
          />
        }
      >
        <View style={styles.content}>
          <StaffList
            staffsByDate={staffsByDate}
            selectStaff={selectStaff}
            staffSelected={staffSelected}
          />
          <AppointmentList
            blockTimes={blockTimesVisibile}
          />
        </View>

        <IconButton
          icon={images.iconAdd}
          iconStyle={styles.addIcon}
          onPress={() => { }}
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

  icon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    tintColor: "#7B99BA"
  },

  button: {
    height: '100%',
    alignItems: 'center'
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
