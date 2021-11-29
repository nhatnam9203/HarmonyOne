
import React from "react";
import {
    useAxiosQuery,
    useAxiosMutation,
    getAppointmentById,
    getGroupAppointmentById,
    updateAppointment
} from "@src/apis";
import { appointment, app } from "@redux/slices";
import { useDispatch } from "react-redux";
import moment from "moment";
import NavigationService from "@navigation/NavigationService";

const useConfirmBooking = ({
    isQuickCheckout,
    timeBooking,
    dayBooking,
    appointmentIdUpdate,
}) => {
    const dispatch = useDispatch();

    const reduceServices = (services, extras = []) => {
        for (let i = 0; i < services.length; i++) {
            if (i === 0) {
                services[i].fromTime = (!isQuickCheckout && timeBooking) ? `${dayBooking} ${timeBooking}` : moment().format("MM-DD-YYYY hh:mm A");

            } else if (i > 0) {
                let tempService = services[i - 1];
                services[i].fromTime = moment(tempService.fromTime).add('minutes', tempService.duration);
                const ex = extras.find(ex => ex.bookingServiceId === tempService.bookingServiceId);
                if (ex) {
                    const duration = tempService.duration + ex.duration;
                    services[i].fromTime = moment(tempService.fromTime).add('minutes', duration);
                }
                services[i].fromTime = `${moment(services[i].fromTime).format("YYYY-MM-DD")}T${moment(services[i].fromTime).format("HH:mm")}:00`;
            }
        }
        return services;
    }


    const [, submitUpdateAppointment] = useAxiosMutation({
        ...updateAppointment(),
        queryId: "updateAppointment_reviewConfirm",
        isStopLoading: true,
        isLoadingDefault: false,
        onSuccess: async (data, response) => {
            if (response?.codeNumber == 200) {
                dispatch(app.startSignalR());
                if (isQuickCheckout) {
                    fetchGroupApointmentById();
                }
            }
        }
    });

    const [, fetchAppointmentById] = useAxiosQuery({
        ...getAppointmentById(appointmentIdUpdate),
        queryId: "fetchAppointmentById_reviewConfirm",
        enabled: false,
        isLoadingDefault: false,
        isStopLoading: true,
        onSuccess: async (data, response) => {
            if (response?.codeNumber == 200) {
                dispatch(appointment.setAppointmentDetail(response?.data));
                const data = {
                    staffId: response?.data.staffId,
                    fromTime: response?.data.fromTime,
                    status: response?.data.status,
                    categories: response?.data.categories,
                    services: reduceServices(
                        [...response?.data.services].map(obj => ({ ...obj, fromTime: obj?.fromTime })),
                        response?.data?.extras
                    ),
                    extras: response?.data.extras,
                    products: response?.data.products,
                    giftCards: response?.data.giftCards
                };

                if (response?.data?.services?.length > 1) {
                    const body = await updateAppointment(appointmentIdUpdate, data);
                    submitUpdateAppointment(body.params);
                } else {
                    dispatch(app.startSignalR());

                    if (isQuickCheckout) {
                        fetchGroupApointmentById();
                    }
                }
            }
        },
    });

    const [, fetchGroupApointmentById] = useAxiosQuery({
        ...getGroupAppointmentById(appointmentIdUpdate),
        queryId: "fetchGroupApointmentById_reviewConfirm",
        enabled: false,
        onSuccess: async (data, response) => {
            if (response?.codeNumber == 200) {
                dispatch(appointment.setGroupAppointment(data));
                NavigationService.navigate(screenNames.CheckoutScreen);
            }
        }
    });


    return [fetchAppointmentById];
};

export default useConfirmBooking;