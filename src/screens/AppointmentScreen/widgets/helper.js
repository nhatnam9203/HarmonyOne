

export const findServiceInAnotherAppointment = (appointments = [], staffSelected) => {
    let tempArr = [];
    for (let i = 0; i < appointments.length; i++) {
        const services = appointments[i]?.services || [];
        const findItem = services.find(item => item?.staffId == staffSelected)
        if (findItem) {
            tempArr.push(appointments[i]);
        }
    }
    return tempArr;
}