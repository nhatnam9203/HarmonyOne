import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { fonts } from "@shared/themes";
import { useAxiosQuery, getCustomerInfoById, getServiceByStaff } from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { customer, service } from "@redux/slices";
import { guid } from "@shared/utils";
import { bookAppointment } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';

const ItemCustomer = ({ item, refreshFromScreen, isBookAppointment, isReviewConfirm, isQuickCheckout }) => {
    const dispatch = useDispatch();

    const {
        appointment: { staffSelected },
        bookAppointment: { isAddMore }
    } = useSelector(state => state);

    const [customerId, setCustomerId] = React.useState(null);
    const [uid, setUID] = React.useState(null);

    const [, getCustomerById] = useAxiosQuery({
        ...getCustomerInfoById(customerId),
        isLoadingDefault: true,
        enabled: false,
        onSuccess: (data, response) => {
            dispatch(customer.setCustomerDetail(data));
            NavigationService.navigate(screenNames.CustomerDetailScreen, { refreshFromScreen });
        },
    });

    React.useEffect(() => {
        if (customerId)
            getCustomerById();
    }, [customerId, setCustomerId, uid]);

    const [, submitGetServiceByStaff] = useAxiosQuery({
        ...getServiceByStaff(staffSelected),
        queryId: "getServiceByStaff_customerNewScreen",
        isLoadingDefault: true,
        enabled: false,
        onSuccess: (data, response) => {
            dispatch(service.setServiceByStaff(data));
            NavigationService.navigate(screenNames.AppointmentNewScreen);
        }
    });


    const selectItem = () => {
        if (isBookAppointment || isQuickCheckout) {
            dispatch(bookAppointment.setCustomerBooking(item));
            if (isReviewConfirm) {
                NavigationService.navigate(screenNames.AppointmentNewScreen, { screen: screenNames.ReviewConfirm });
            } else {
                if (isQuickCheckout) {
                    NavigationService.navigate(screenNames.CheckoutTabScreen);
                } else {
                    if (staffSelected && !isAddMore && staffSelected !== -1) {
                        submitGetServiceByStaff();
                    } else {
                        NavigationService.navigate(screenNames.AppointmentNewScreen);
                    }
                }
            }
        } else {
            setCustomerId(item.customerId);
            setUID(guid())
        }
    }

    return (
        <TouchableOpacity onPress={selectItem} style={styles.item}>
            <View style={styles.letter}>
                <Text style={styles.firstLetter}>
                    {item?.firstName?.toString().charAt(0).toUpperCase()}
                </Text>
            </View>

            <View style={styles.rightItem}>
                <Text style={styles.customerName}>
                    {`${item?.firstName} ${item?.lastName}`}
                </Text>
                <Text style={styles.phone}>
                    {`${item?.phone}`}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: scaleHeight(16),
        marginHorizontal: scaleWidth(15)
    },
    rightItem: {
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: scaleWidth(18),
        paddingVertical: scaleHeight(4)
    },
    letter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleWidth(60),
        height: scaleWidth(60),
        borderRadius: 500,
        backgroundColor: '#FAFAFA'
    },
    firstLetter: {
        fontSize: scaleFont(23),
        fontWeight: "bold",
        color: "#1366AE",
        fontFamily: fonts.BOLD
    },
    customerName: {
        fontSize: scaleFont(20),
        color: "#404040",
        fontFamily: fonts.MEDIUM
    },
    phone: {
        color: '#7A98BB',
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR
    },
})

export default ItemCustomer;