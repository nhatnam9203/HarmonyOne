import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import NavigationService from '@navigation/NavigationService';
import { 
    PaymentTerminalType,
   } from "@shared/utils";

export const Layout = ({
  onPressBox,
  deleteHardware,
  dejavooMachineInfo,
  paymentMachineType, 
  printerSelect,
  isSetup,
}) => {

    const [t] = useTranslation();

    const temptTitle = () => {
        let temptTitle = 'No Device'
        if (paymentMachineType == PaymentTerminalType.Clover){
            temptTitle = !_.get(cloverMachineInfo, 'isSetup') 
                        ? 'No Device' 
                        : cloverMachineInfo.name;
        } else{
            temptTitle = !_.get(dejavooMachineInfo, 'isSetup') 
                        ? 'No Device' 
                        : dejavooMachineInfo.name;
        }
        return temptTitle
    }

    
  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Hardwares')}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
            <TouchableOpacity 
                onPress={() => onPressBox('PaymentTerminal')} 
                style={styles.box} >

                <View style={styles.containerIconBox} >
                    <Image source={images.paymentHardware} style={{
                        width: scaleWidth(25),
                        height: scaleHeight(35)
                    }} />
                </View>
                <View style={styles.containerTextBox} >
                    <Text style={styles.textBox} >
                        {t('Payment terminal')}
                    </Text>
                    <Text style={[styles.textBox, { fontWeight: 'normal', fontSize: scaleFont(11), marginTop: scaleHeight(10) }]} >
                        {temptTitle}
                    </Text>
                </View>

                {
                    isSetup ? <IconButton onPress={() => deleteHardware()} style={styles.buttonDelete} >
                        <Image source={images.deleteIconBanner}
                            style={{ width: scaleWidth(10), height: scaleHeight(10),  }}
                        />
                    </IconButton> : null
                }

            </TouchableOpacity>

            {/* ------------- Print ----------- */}
            <TouchableOpacity 
                onPress={() => onPressBox('Print')} 
                style={[styles.box]} >
                    
                <View style={styles.containerIconBox} >
                    <Image source={images.printHardware} style={{
                        width: scaleWidth(28),
                        height: scaleHeight(35),
                    }} />
                </View>
                <View style={styles.containerTextBox} >
                    <Text style={styles.textBox} >
                        {t('Receipt printer')}
                    </Text>
                    <Text style={[styles.textBox, { fontWeight: 'normal', fontSize: scaleFont(13), marginTop: scaleHeight(10) }]} >
                        {`${printerSelect === "" ? "No device" : printerSelect}`}
                    </Text>
                </View>
            </TouchableOpacity>


        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    paddingTop: scaleHeight(16),
    alignItems: 'center',
  },
  buttonDelete: {
    width: scaleWidth(20), 
    height: scaleHeight(20),
    position: "absolute", 
    top: 5, 
    right: 5,
    borderRadius: scaleHeight(10), 
    justifyContent: "center", 
    alignItems: "center",
  },

  box: {
    flexDirection: 'row',
    width: '90%',
    height: scaleHeight(80),
    backgroundColor: '#fff',
    borderRadius: scaleHeight(10),
    ...Platform.select({
        ios: {
            shadowRadius: 2,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOpacity: 0.54,
            shadowOffset: { width: 0, height: 0 },
        },

        android: {
            elevation: 2,
        },
    }),
    marginTop: scaleHeight(15),
    alignItems: 'center',

},
containerIconBox: {
    paddingLeft: scaleWidth(14),
    paddingRight: scaleWidth(16),
    justifyContent: 'center'
},
containerTextBox: {
    paddingTop: scaleHeight(16),
},
textBox: {
    fontSize: scaleFont(15),
    fontWeight: '600',
    color: '#0764B0'
}
});
