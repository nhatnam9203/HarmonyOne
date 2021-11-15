import React from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { ListEmptyComponent, IconButton, CustomInput, InputSelect, InputText, DayPicker } from "@shared/components";
import { images } from "@shared/themes/resources";
import { CustomActionSheet } from "../CustomActionSheet";
import CalendarView from "./CalendarView";

import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useWatch } from "react-hook-form";
import { getContentDate, arrDateFilter } from "@shared/utils";
import moment from 'moment';

const dateRangeData = [
  { label: "Today", value: "Today" },
  { label: "Yesterday", value: "Yesterday" },
  { label: "This week", value: "This week" },
  { label: "Last week", value: "Last week" },
  { label: "This month", value: "This month" },
  { label: "Last month", value: "Last month" },
];


export const PeriodPicker = ({
  timeStart,
  timeEnd,
  onAccept = () => { },
  setTimeStart,
  setTimeEnd,
}) => {

  const periodRef = React.useRef();

  const dispatch = useDispatch();
  const {
  } = useSelector(state => state);

  const form = useForm();
  const { errors } = form.formState;

  const dateRangeRef = React.useRef();
  const [startDate, setStartDate] = React.useState(moment());
  const [endDate, setEndDate] = React.useState(moment());
  const calendarViewRef = React.useRef();

  const openActionSheet = () => {
    periodRef?.current?.show();
    if (timeStart && timeEnd) {
      const textSelected = getContentDate(timeStart, timeEnd);
      const findDate = dateRangeData.find(obj => obj.label == textSelected);

      setTimeout(() => {
        if (findDate) {
          dateRangeRef?.current?.changeItem(findDate?.value);
        } else {
          setStartDate(moment(timeStart, ["MM/DD/YYYY"]));
          setEndDate(timeEnd, ["MM/DD/YYYY"]);
        }
      }, 250);
    }
  }

  const closeActionSheet = () => {
    periodRef?.current?.hide();
  }


  const dateRange = useWatch({
    control: form.control,
    name: 'dateRange'
  });

  const accept = () => {
    setTimeStart(moment(startDate).format("MM/DD/YYYY")),
      setTimeEnd(moment(endDate).format("MM/DD/YYYY")),
      closeActionSheet();
  }


  React.useEffect(() => {
    if (dateRange) {
      const value = dateRange.value;
      let start = startDate;
      let end = endDate;
      switch (value) {
        case "Today":
          start = moment();
          end = moment();
          break;
        case "Yesterday":
          start = moment().subtract("days", 1);
          end = moment().subtract("days", 1);
          break;
        case "This week":
          start = moment().clone().startOf('isoWeeks');
          end = moment().clone().endOf('isoWeeks');
          break;
        case "Last week":
          start = moment().clone().subtract("weeks", 1).startOf('isoWeeks');
          end = moment().clone().subtract("weeks", 1).endOf('isoWeeks');
          break;
        case "This month":
          start = moment().clone().startOf('month');
          end = moment().clone().endOf('month');
          break;
        case "Last month":
          start = moment().clone().subtract("months", 1).startOf('month');
          end = moment().clone().subtract("months", 1).endOf('month');
          break;

        default:
          break;
      }
      setStartDate(start);
      setEndDate(end);
      calendarViewRef?.current?.setCurrentMonthCalendar(end);
    }
  }, [dateRange]);

  React.useEffect(() => {
    const contentDate = getContentDate(
      moment(startDate).format("MM/DD/YYYY"),
      moment(endDate).format("MM/DD/YYYY"), 
    );

    const isIncludes = arrDateFilter.includes(contentDate);

    if(!isIncludes){
      dateRangeRef?.current?.changeItemNoExist({ label : "Custom", value : "custom" })
    }
  }, [startDate, endDate])

  const [t] = useTranslation();

  return (
    <>

      <TouchableOpacity
        onPress={openActionSheet}
        style={styles.buttonDateRange}
      >
        <Text style={styles.txtDateRange}>{getContentDate(timeStart, timeEnd)}</Text>
        <Image
          source={images.date_range}
          style={{ width: scaleWidth(24), height: scaleWidth(24) }}
          resizeMode='contain'
        />
      </TouchableOpacity>

      <CustomActionSheet
        animationIn='fadeInRightBig'
        animationOut="fadeOutRightBig"
        ref={periodRef}>
        <View style={styles.container}>
          <SingleScreenLayout
            pageTitle={t("Select period")}
            isLeft={true}
            onPressLeft={closeActionSheet}
            isRight={true}
            isScrollLayout={false}
            containerStyle={{ paddingVertical: 0 }}
            headerRightComponent={() =>
              <IconButton
                icon={images.iconChecked}
                iconStyle={styles.iconClear}
                style={styles.buttonClear}
                onPress={accept}
              />
            }
          >
            <View style={styles.content}>
              <CustomInput
                label='Date range'
                labelStyle={styles.labelDate}
                renderInput={() =>
                  <InputSelect
                    ref={dateRangeRef}
                    form={form}
                    name="dateRange"
                    items={dateRangeData}
                    title="Date range"
                    defaultValue={'Today'}
                  />
                }
              />

              <View style={styles.rangeRow}>
                <CustomInput
                  label='Start date'
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
                  label='End date'
                  labelStyle={styles.labelDate}
                  renderInput={() =>
                    <DayPicker
                      dayPicked={endDate}
                      onApply={(date) => setEndDate(date)}
                      minDate={moment(endDate).format("YYYY-MM-DD")}
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
                selectDayCalendar={() => { }}
                ref={calendarViewRef}
              />
            </View>
          </SingleScreenLayout>
        </View>
      </CustomActionSheet>
    </>
  );
};

const styles = StyleSheet.create({

  txtDateRange: {
    fontSize: scaleFont(15),
    fontFamily: fonts.REGULAR,
    color: "#404040"
  },

  buttonDateRange: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: scaleWidth(8),
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(24),
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 5,
    zIndex : 9
  },

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
    height: scaleHeight(835),
    width: scaleWidth(375),
    backgroundColor: "white",
    paddingTop: scaleHeight(35)
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
