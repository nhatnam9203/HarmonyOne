
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
import { findServiceInAnotherAppointment } from "./helper";
import LottieView from 'lottie-react-native'
import moment from 'moment';
import { translate } from "@localize";

import {
    useAxiosQuery,
    getAppointmentByDate,
    getAppointmentById,
    getInvoiceDetail,
    getStaffByDate,
    reportGetStaffSalaryByStaff,
    getAppointmentWaitingList,
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
        appointmentDate,
        appointmentWaitings = [],
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
        },
        requestGetWaitingList: () => {
            requestGetWaitingList();
        }
    }));

    /************************************** reportGetStaffSalaryByStaff ***************************************/
    const [, fetchReportGetStaffSalaryByStaff] = useAxiosQuery({
        ...reportGetStaffSalaryByStaff(staff?.staffId, moment(appointmentDate).format("MM/DD/YYYY"), moment(appointmentDate).format("MM/DD/YYYY"), 1),
        queryId: "freportGetStaffSalaryByStaff_AppointmentScreen",
        isLoadingDefault: false,
        enabled: true,
        onSuccess: (data, response) => {
            dispatch(staffAction.setSalaryStaffLogin(data));
        },
    });

    /************************************** GET APPOINTMENT WAITING LIST ***************************************/
    const [, requestGetWaitingList] = useAxiosQuery({
        ...getAppointmentWaitingList(),
        enabled: false,
        onSuccess: (data, response) => {
            dispatch(appointment.setAppointmentWaitingList(data));
        },
    });


    /************************************** REFRESH BLOCK TIMES  ***************************************/
    React.useEffect(() => {
        if (isRefresh) {
            fetchAppointmentByDate();
            if (roleName == "staff") {
                fetchReportGetStaffSalaryByStaff();
            }
            if (staffSelected == -1) {
                requestGetWaitingList();
            }
        }
    }, [isRefresh]);

    /************************************** GET LIST BLOCK TIMES  ***************************************/
    React.useEffect(() => {
        if (!isNaN(staffSelected)) {
            let tempAppointments = blockTimes.filter(
                (blockTime) => blockTime?.staffId == staffSelected,
            );

            let appointmentAnotherStaff = blockTimes.filter(
                (blockTime) => blockTime?.staffId !== staffSelected,
            );

            appointmentAnotherStaff = findServiceInAnotherAppointment(appointmentAnotherStaff, staffSelected);

            if (appointmentAnotherStaff?.length > 0) {
                tempAppointments = [
                    ...tempAppointments,
                    ...appointmentAnotherStaff
                ].sort((a, b) => b.appointmentId - a.appointmentId);
            }

            setBlockTimesVisible(tempAppointments);
        } else {
            setBlockTimesVisible(blockTimes);
        }
    }, [staffSelected, appointmentDate, blockTimes]);




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
        isLoadingDefault : !isRefresh,
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
    };

    const blockTimeSort = React.useMemo(() => {
        return sortArray(blockTimesVisibile, {
            by: "fromTime",
            order: "desc",
        });
    }, [blockTimesVisibile]);

    const tempData = staffSelected == -1 ? appointmentWaitings.filter(app => app?.status == "waiting") : blockTimeSort;

    if (tempData.length == 0) {
        return (
            <ListEmptyComponent
                description={translate('noAppointments')}
                renderLottiewView={() => (
                    <View style={{ width: 180, height: 180 }}>
                        <LottieView
                            source={require('../../../assets/not_found.json')}
                            autoPlay
                            loop
                        />
                    </View>
                )}
            />
        );
    };

    return (
        <FlatList
            style={styles.flatList}
            data={tempData}
            renderItem={({ item }) => <AppointmentItem roleName={roleName} item={item} onChangeAppointmentId={onChangeAppointmentId} />}
            refreshing={isRefresh}
            onRefresh={onRefresh}
            keyExtractor={(item) => item?.appointmentId?.toString() + guid() + 'appointment'}
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

