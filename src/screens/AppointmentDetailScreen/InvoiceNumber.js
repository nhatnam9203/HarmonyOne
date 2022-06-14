import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fonts } from '@shared/themes';
import { translate } from "@localize";
import moment from "moment";

export const InvoiceNumber = ({
  appointmentItem,
  invoiceViewAppointmentDetail,
  getInvoiceDetail
}) => {

  if (appointmentItem?.status == "paid") {
    return (
      <View style={{ marginTop: scaleHeight(8) }}>
        <Text style={styles.invoiceNumber}>{translate(`Paid at`)}</Text>
        <Text style={styles.invoiceNumber}>
          {moment(invoiceViewAppointmentDetail?.createdDate).format("hh:mm A, dddd, MM/DD/YYYY")}
        </Text>
        <TouchableOpacity onPress={()=>getInvoiceDetail(invoiceViewAppointmentDetail?.checkoutId)}>
          <Text style={styles.invoiceNumber}>{`${translate('txtInvoices')} : `}
            <Text style={{ color: colors.ocean_blue, fontFamily: fonts.BOLD }}>
              #{invoiceViewAppointmentDetail?.checkoutId}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    )
  } else return null;
};

const styles = StyleSheet.create({
  invoiceNumber: {
    fontSize: scaleFont(15),
    color: "#404040",
    fontFamily: fonts.REGULAR,
    marginBottom: scaleHeight(8)
  },
});