import React from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { ListEmptyComponent, IconButton, CustomInput, InputSelect, InputText, DayPicker } from "@shared/components";
import { images } from "@shared/themes/resources";
import CalendarView from "./CalendarView";
import moment from 'moment';
import { translate } from "@localize";


export const Layout = ({
  form,
  errors,
  dateRangeRef,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  calendarViewRef,
  onAccept,
  dateRangeData
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate("Select period")}
        isLeft={true}
        isRight={true}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <IconButton
            icon={images.iconChecked}
            iconStyle={styles.iconClear}
            style={styles.buttonClear}
            onPress={onAccept}
          />
        }
      >
        <View style={styles.content}>
          <CustomInput
            label={translate('Date range')}
            labelStyle={styles.labelDate}
            renderInput={() =>
              <InputSelect
                ref={dateRangeRef}
                form={form}
                name="dateRange"
                items={dateRangeData}
                title={translate("Date range")}
                defaultValue={'Today'}
              />
            }
          />

          <View style={styles.rangeRow}>
            <CustomInput
              label={translate('Start date')}
              labelStyle={styles.labelDate}
              renderInput={() =>
                <DayPicker
                  dayPicked={startDate}
                  onApply={(date) => setStartDate(date)}
                  maxDate={moment(endDate).format("YYYY-MM-DD")}
                  componentRender={() => (
                    <View style={styles.inputDate}>
                      <Text style={styles.txtInputDate}>{moment(startDate).format("MM/DD/YYYY")}</Text>
                      <Image
                        source={images.iconCalendar2}
                        style={styles.iconInputDate}
                        resizeMode='contain'
                      />
                    </View>
                  )}
                />
              }
            />
            <CustomInput
              label={translate('End date')}
              labelStyle={styles.labelDate}
              renderInput={() =>
                <DayPicker
                  dayPicked={endDate}
                  onApply={(date) => setEndDate(date)}
                  minDate={moment(startDate).format("YYYY-MM-DD")}
                  componentRender={() => (
                    <View style={styles.inputDate}>
                      <Text style={styles.txtInputDate}>{moment(endDate).format("MM/DD/YYYY")}</Text>
                      <Image
                        source={images.iconCalendar2}
                        style={styles.iconInputDate}
                        resizeMode='contain'
                      />
                    </View>
                  )}
                />
              }
            />
          </View>

          <CalendarView
            startTime={startDate}
            endTime={endDate}
            setStartTime={setStartDate}
            setEndTime={setEndDate}
            markedDates={[]}
            selectDayCalendar={()=>{}}
            ref={calendarViewRef}
          />
        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({

  iconInputDate: {
    width: scaleWidth(20),
    height: scaleWidth(20)
  },

  txtInputDate: {
    fontSize: scaleFont(15),
    fontFamily: fonts.REGULAR,
    color: "#404040"
  },

  inputDate: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: scaleWidth(8),
    width: scaleWidth(140)
  },

  labelDate: {
    fontFamily: fonts.MEDIUM,
  },

  rangeRow: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    padding: scaleWidth(16)
  },
  flatList: {
    flex: 1
  },
  iconClear: {
    width: scaleWidth(25),
    height: scaleWidth(25),
  },

  buttonClear: {
    height: '100%',
    alignItems: 'center'
  },

  itemLoadMore: {
    height: scaleWidth(30),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(10)
  }
});
