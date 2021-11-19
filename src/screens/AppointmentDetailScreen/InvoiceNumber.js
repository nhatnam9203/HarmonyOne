import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, fonts } from '@shared/themes';
import moment from "moment";

export const InvoiceNumber = ({
  appointmentItem,
  invoiceViewAppointmentDetail
}) => {

    if(appointmentItem?.status == "paid"){
        return(
            <View style={{ marginTop : scaleHeight(8)}}>
            <Text style={styles.invoiceNumber}>{`Paid at`}</Text>
            <Text style={styles.invoiceNumber}>
              {moment(invoiceViewAppointmentDetail?.createdDate).format("hh:mm A, ddddd, MM/DD/YYYY")}
            </Text>
            <Text style={styles.invoiceNumber}>{`Invoice : `}
              <Text style={{ color: colors.ocean_blue, fontFamily: fonts.BOLD }}>
                #{invoiceViewAppointmentDetail?.checkoutId}
              </Text>
            </Text>
          </View>
        )
    }else return null;
};

const styles = StyleSheet.create({
  invoiceNumber: {
    fontSize: scaleFont(15),
    color: "#404040",
    fontFamily: fonts.REGULAR,
    marginBottom : scaleHeight(8)
  },
});
