import React from "react";
import {

} from "@src/apis";

import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useWatch } from "react-hook-form";
import { getContentDate } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";
import moment from "moment";

const dateRangeData = [
  { label: "Today", value: "Today" },
  { label: "Yesterday", value: "Yesterday" },
  { label: "This week", value: "This week" },
  { label: "Last week", value: "Last week" },
  { label: "This month", value: "This month" },
  { label: "Last month", value: "Last month" },
];

export const useProps = (props) => {

  const dispatch = useDispatch();
  const {
  } = useSelector(state => state);

  const screenName = props?.route?.params?.screenName;
  const timeStart = props?.route?.params?.timeStart;
  const timeEnd = props?.route?.params?.timeEnd;

  const form = useForm();
  const { errors } = form.formState;

  const dateRangeRef = React.useRef();
  const [startDate, setStartDate] = React.useState(moment());
  const [endDate, setEndDate] = React.useState(moment());
  const calendarViewRef = React.useRef();


  const dateRange = useWatch({
    control: form.control,
    name: 'dateRange'
  });


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
          start = moment(startDate).subtract("days", 1);
          end = moment(startDate).subtract("days", 1);
          break;
        case "This week":
          start = moment().clone().startOf('week');
          end = moment().clone().endOf('week');
          break;
        case "Last week":
          start = moment().clone().subtract("weeks", 1).startOf('week');
          end = moment().clone().subtract("weeks", 1).endOf('week');
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
    if (timeStart && timeEnd) {
      const textSelected = getContentDate(timeStart,timeEnd);
      const findDate = dateRangeData.find(obj=>obj.label == textSelected);

      setTimeout(() => {
        if(findDate){
          dateRangeRef?.current?.changeItem(findDate?.value);
        }else{
          setStartDate(moment(timeStart, ["MM/DD/YYYY"]));
          setEndDate(timeEnd, ["MM/DD/YYYY"]);
        }
      }, 500);
    }
  }, []);



  return {

    form,
    errors,
    dateRangeRef,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    calendarViewRef,
    dateRangeData,

    onAccept: () => {
      NavigationService.navigate(screenName, { startDate: moment(startDate).format("MM/DD/YYYY"), endDate: moment(endDate).format("MM/DD/YYYY") });
    }
  }
};
