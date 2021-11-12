import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import NavigationService from '@navigation/NavigationService';

export const Layout = ({
  onPressBox,
  deleteHardware,
}) => {

const [t] = useTranslation();
  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Hardwares')}
        isLeft={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
          <ScrollView>
            <Button onPress={() => onPressBox('PaymentTerminal')} style={styles.box} >
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
                    isSetup ? <Button onPress={this.deleteHardware} style={{
                        width: scaleWidth(20), height: scaleHeight(20),
                        position: "absolute", top: 5, right: 5,
                        borderRadius: scaleHeight(10), justifyContent: "center", alignItems: "center"
                    }} >
                        <Image source={images.deleteIconBanner}
                            style={{ width: scaleWidth(10), height: scaleHeight(10) }}
                        />
                    </Button> : null
                }

            </Button>
            {/* ------------- Box 3 ----------- */}
            <Button onPress={() => onPressBox('Print')} style={[styles.box, { marginLeft: scaleWidth(20) }]} >
                <View style={styles.containerIconBox} >
                    <Image source={images.printHardware} style={{
                        width: scaleWidth(28),
                        height: scaleHeight(35)
                    }} />
                </View>
                <View style={styles.containerTextBox} >
                    <Text style={styles.textBox} >
                        {t('Receipt printer')}
                    </Text>
                    <Text style={[styles.textBox, { fontWeight: 'normal', fontSize: scaleFont(11), marginTop: scaleHeight(10) }]} >
                        {`${printerSelect === "" ? "No device" : printerSelect}`}
                    </Text>
                </View>
            </Button>
          </ScrollView>


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
    padding: scaleWidth(16),
    paddingTop: scaleHeight(16),
  },

  box: {
    flexDirection: 'row',
    width: '31%',
    height: scaleHeight(70),
    backgroundColor: '#fff',
    borderRadius: scaleHeight(4),
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
    fontSize: scaleFont(12),
    fontWeight: '600',
    color: '#0764B0'
}
});
