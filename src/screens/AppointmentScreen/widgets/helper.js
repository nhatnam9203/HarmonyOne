

export const findServiceInAnotherAppointment = (appointments = [], staffSelected) => {
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