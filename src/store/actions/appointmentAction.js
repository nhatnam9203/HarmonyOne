
export function getAppointmentList(token,staffId,date) {
    return {
        type: "GET_APPOINTMENT_LIST",
        method: "GET",
        route : `/appointment/staffByDate/${staffId}?date=${date}`,
        token
    };
}
