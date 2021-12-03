
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { images, fonts } from '@shared/themes';
import { IconButton, ListEmptyComponent } from "@shared/components";
import { AppointmentItem } from "./AppointmentItem";
import { useTranslation } from "react-i18next";
import { guid } from "@shared/utils";
import { axios } from '@shared/services/axiosClient';
import { dateToFormat } from '@shared/utils';
import { useDispatch, useSelector } from 'react-redux';

import {
    useAxiosQuery,
    getAppointmentByDate,
    getAppointmentById,
    getInvoiceDetail,
    getStaffByDate
} from '@src/apis';

import {
    appointment,
    invoice,
    app,
    staff as staffAction
} from '@redux/slices';

import sortArray from "sort-array";
import NavigationService from '@navigation/NavigationService';

const AppointmentList = React.forwardRef(({
    staffListRef
}, ref) => {
    const dispatch = useDispatch();

    const {
        appointmentsByDate = [],
        blockTimes = [],
        appointmentDetail,
        appointmentDate
    } = useSelector(state => state.appointment);
    const {
        staff
    } = useSelector(state => state.auth);

    const roleName = staff?.roleName?.toString()?.toLowerCase();


    const [t] = useTranslation();

    const [isRefresh, setRefresh] = React.useState(false);
    const [appointmentDetailId, setAppointmentDetailId] = React.useState(null);
    const [staffSelected, setStaffSelected] = React.useState('');
    const [blockTimesVisibile, setBlockTimesVisible] = React.useState([]);
    const [tempStatus, setTempStatus] = React.useState("");
    const [isMounted, setMounted] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
        setDate: (datePicked) => {
            setDate(datePicked);
        },
        setStaffSelected: (staffId) => {
            setStaffSelected(staffId)
        }
    }))


    /************************************** REFRESH BLOCK TIMES  ***************************************/
    React.useEffect(() => {
        if (isRefresh) {
            fetchAppointmentByDate();
        }
    }, [isRefresh]);

    /************************************** GET LIST BLOCK TIMES  ***************************************/
    React.useEffect(() => {
        if (staffSelected) {
            let tempAppointments = blockTimes.filter(
                (blockTime) => blockTime?.staffId == staffSelected,
            );

            let appointmentAnotherStaff = blockTimes.filter(
                (blockTime) => blockTime?.staffId !== staffSelected,
            );

            appointmentAnotherStaff = findServiceInAnotherAppointment(appointmentAnotherStaff);

            if(appointmentAnotherStaff?.length > 0){
                tempAppointments = [
                    ...tempAppointments,
                    ...appointmentAnotherStaff
                ];
                console.log({ tempAppointments })
            }

            setBlockTimesVisible(tempAppointments);
        } else {
            setBlockTimesVisible(blockTimes);
        }
    }, [staffSelected, appointmentDate, blockTimes]);


    const findServiceInAnotherAppointment = (appointments = []) => {
        let tempArr = [];
        for (let i = 0; i < appointments.length; i++) {
            const services = appointments[i]?.services || [];
            for (const sv of services) {
                if (sv?.staffId == staffSelected) {
                    tempArr.push(appointments[i]);
                    continue;
                }
            }
        }
        return tempArr;
    }

    /************************************** GET APPOINTMENT DETAIL  ***************************************/
    React.useEffect(() => {
        if (appointmentDetailId) {
            fetchAppointmentById();
        }
    }, [appointmentDetailId]);



    const setDate = (date) => {
        if (
            dateToFormat(date, 'YYYY-MM-DD') ==
            dateToFormat(appointmentDate, 'YYYY-MM-DD')
        ) {
            fetchAppointmentByDate();
            fetchStaffByDate();
        } else {
            dispatch(appointment.setAppointmentDate(date));
        }
    };


    /************************************** GET STAFFS BY DATE SELECTED ***************************************/
    const [, fetchStaffByDate] = useAxiosQuery({
        ...getStaffByDate(
            staff?.merchantId,
            dateToFormat(appointmentDate, 'YYYY-MM-DD'),
        ),
        enabled: true,
        onSuccess: (data, response) => {
            dispatch(staffAction.setStaffByDate(data));
            if (!isMounted) {
                const index = data?.findIndex(obj => obj?.staffId == staff?.staffId);
                if (index && index !== -1) {
                    const roleName = staff?.roleName?.toString()?.toLowerCase();
                    if (roleName == "admin" || roleName == "manager") {
                        staffListRef?.current?.scrollToIndex(index);
                    }
                }
            }
            setMounted(true);
        },
    });


    /************************************** GET APPOINTMENT BY DATE  ***************************************/
    const [{ isLoading }, fetchAppointmentByDate] = useAxiosQuery({
        ...getAppointmentByDate(dateToFormat(appointmentDate, 'YYYY-MM-DD')),
        enabled: true,
        onSuccess: (data, response) => {
            dispatch(appointment.setBlockTimeBydate(data));
            setRefresh(false);
        },
    });

    const [, fetchAppointmentById] = useAxiosQuery({
        ...getAppointmentById(appointmentDetailId),
        enabled: appointmentDetailId ? true : false,
        isStopLoading: tempStatus == "paid" ? true : false,
        onSuccess: (data, response) => {
            if (response?.codeNumber == 200) {
                dispatch(appointment.setAppointmentDetail(data));
                if (data?.status == "paid") {
                    getInvoiceDetail(data?.checkoutId);
                } else {
                    NavigationService.navigate(screenNames.AppointmentDetailScreen, {
                        refreshFromScreen,
                    });
                }
            }
        },
    });

    const getInvoiceDetail = async (checkoutId) => {
        if (checkoutId) {
            dispatch(app.showLoading());
            const params = {
                url: `checkout/${checkoutId}`,
                method: 'GET',
            }

            try {
                const response = await axios(params);
                if (response?.data?.codeNumber == 200) {
                    dispatch(invoice.setInvoiceViewAppointmentDetail(response?.data?.data));
                    NavigationService.navigate(screenNames.AppointmentDetailScreen, {
                        refreshFromScreen,
                    });
                }

            } catch (err) {

            } finally {
                dispatch(app.hideLoading());
            }
        }
    }

    const refreshFromScreen = () => {
        fetchAppointmentByDate();
    };


    const onChangeAppointmentId = (appointmentId, status) => {
        setTempStatus(status);
        if (appointmentId == appointmentDetailId) {
            fetchAppointmentById();
        } else {
            setAppointmentDetailId(appointmentId);
        }
    }

    const onRefresh = () => {
        setRefresh(true);
    }

    return (
        <FlatList
            style={styles.flatList}
            data={blockTimesVisibile}
            renderItem={({ item }) => <AppointmentItem roleName={roleName} item={item} onChangeAppointmentId={onChangeAppointmentId} />}
            refreshing={isRefresh}
            onRefresh={onRefresh}
            keyExtractor={(item) => item?.appointmentId?.toString() + guid() + 'appointment'}
            ListEmptyComponent={() => <ListEmptyComponent description={t('No Appointments')} image={images.iconNotFound} />}
            ListFooterComponent={() => <View style={{ height: scaleHeight(100) }} />}
        />
    );
});


const TempAppointmntList = React.memo(AppointmentList);
export default TempAppointmntList


const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        paddingTop: scaleHeight(12)
    },
});

