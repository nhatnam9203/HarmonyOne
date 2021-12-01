import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors, images } from "@shared/themes";
import { PeriodPicker, IconButton, Button } from "@shared/components";
import { DataList } from "./DataList";
import { WithPopupActionSheet } from "@shared/HOC";
import { 
  PaymentTerminalType,
 } from "@shared/utils";
import _ from "lodash";
export const Layout = ({
  name,
  isSetup,
  cloverMachineInfo,
  dejavooMachineInfo,
  paymentMachineType,
  addDevice,
  backHomeHardware,
}) => {
  const [t] = useTranslation();

  const renderNoConnected = () => {
    console.log('renderNoConnected')
    return (
        <View style={{ marginBottom: scaleHeight(10) }} >
            <Text style={{
                fontSize: scaleFont(12),
                color: 'rgb(131,131,131)',
                marginTop: scaleHeight(10),
                marginBottom: scaleHeight(7)
            }} >
                {t('No connected device')}
            </Text>

            <TouchableOpacity onPress={addDevice} style={{
                flexDirection: 'row', alignItems: 'center', width: scaleWidth(120)
            }} >
                <View style={{
                    width: scaleWidth(20), height: scaleHeight(20),
                    borderRadius: scaleHeight(4), borderColor: '#0764B0', borderWidth: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <Text style={{
                        fontSize: scaleFont(14),
                        color: '#0764B0',
                        fontWeight: 'bold',
                        height: scaleHeight(20),
                    }} >
                        +
                    </Text>
                </View>

                <Text style={{
                    fontSize: scaleFont(12),
                    color: '#0764B0',
                    marginLeft: scaleWidth(8)
                }} >
                    {t('Add device')}
                </Text>
          </TouchableOpacity>
        </View>
      );
  }

  const renderConnected = () => {
      return (
          <TouchableOpacity onPress={addDevice} style={{
              flexDirection: 'row', alignItems: 'center', width: scaleWidth(120),
              marginTop: scaleHeight(12)

          }} >
              <Text style={{
                  fontSize: scaleFont(14),
                  fontWeight: 'bold',
                  color: '#0764B0',
                  marginLeft: scaleWidth(8),
                  textDecorationLine: 'underline'
              }} >
                  {name}
              </Text>
          </TouchableOpacity>

      );
  }

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Hardwares')}      
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
          <View style={{padding: 20}}>
            <Text style={{
                        fontSize: scaleFont(16),
                        fontWeight: '600',
                        color: '#0764B0'
                    }} >

                {t('Payment Terminal')}
            </Text>

            <Text style={{
                fontSize: scaleFont(16),
                fontWeight: '600',
                color: 'rgb(81,81,81)',
                marginTop: scaleHeight(10)
            }} >

                {t('Connected Device')}
            </Text>
            {!isSetup ? renderNoConnected() : renderConnected()}
          </View>

          {/* ------- Footer -------- */}
          <View style={{ position: 'absolute', bottom: 0, width: '100%', justifyContent: 'flex-end', paddingBottom: scaleHeight(30) }} >
              <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                  <Button
                      width={scaleWidth(130)}
                      height={scaleHeight(50)}
                      backgroundColor="#F1F1F1"
                      label={t('BACK')}
                      textColor="#6A6A6A"
                      onPress={backHomeHardware}
                      styleText={{ fontSize: scaleFont(16), fontWeight: '500' }}
                  />
              </View>
          </View>

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
  },
});
