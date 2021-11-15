import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors, images } from "@shared/themes";
import { Button } from "@shared/components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { 
    PaymentTerminalType,
   } from "@shared/utils";

export const Layout = ({
    name,
    ip,
    port,
    serialNumber,
    registerId,
    authKey,
    terminalName,
    setupPamentTerminal,
    cancelSetupPax,
    setTerminal,
    changeName,
    changeSerialNumber,
    changeRegisterId,
    changeAuthKey,
    changeIp,
    changePort,
}) => {
  const [t] = useTranslation();
  const tempCheckClover = terminalName === PaymentTerminalType.Clover 
                            ? images.radioExportSe 
                            : images.radioExport;
  const tempCheckDejavoo = terminalName === PaymentTerminalType.Dejavoo 
                            ? images.radioExportSe 
                            : images.radioExport;

    const ItemSetup = ({ title, value, placeholder, onChangeText, keyboardType, editable, style }) => {
        return (
            <View style={[{ flexDirection: 'row', marginTop: scaleHeight(20), }]} >
                <View style={{ width: scaleWidth(140), justifyContent: 'center', }} >
                    <Text style={{ fontSize: scaleFont(13), color: 'rgb(42,42,42)' }} >
                        {title}
                    </Text>
                </View>
                <View style={[{ flex: 1, },]} >
                    <View style={[{
                        height: scaleHeight(35), width: '85%', borderColor: 'rgb(227,227,227)',
                        borderWidth: scaleWidth(1), paddingHorizontal: scaleHeight(10)
                    }, style]} >
                        <TextInput
                            style={{ flex: 1, fontSize: scaleFont(14) }}
                            placeholder={placeholder}
                            value={value}
                            onChangeText={(value) => onChangeText(value)}
                            keyboardType={keyboardType}
                            editable={editable}
                        />
                    </View>
                </View>
            </View>
        );

    }
                            
  
  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Hardwares')}      
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <KeyboardAwareScrollView style={styles.content}>
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
                marginTop: scaleHeight(26),
                marginBottom: scaleHeight(10)
            }} >
                {t('Device')}
            </Text>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={setTerminal("Clover")} style={{ flexDirection: "row", marginRight: scaleWidth(40) }} >
                    <Image
                        source={tempCheckClover}
                        style={{ marginRight: scaleWidth(10) }}
                    />
                    <Text style={{ fontSize: scaleFont(15), color: 'rgb(42,42,42)', fontWeight: "600" }} >
                        {t('Clover')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={setTerminal(PaymentTerminalType.Dejavoo)} style={{ flexDirection: "row" }} >
                    <Image
                        source={tempCheckDejavoo}
                        style={{ marginRight: scaleWidth(10) }}
                    />
                    <Text style={{ fontSize: scaleFont(15), color: 'rgb(42,42,42)', fontWeight: "600" }} >
                        {t('Dejavoo')}
                    </Text>
                </TouchableOpacity>

            </View>

            <Text style={{
                fontSize: scaleFont(16),
                fontWeight: '600',
                color: 'rgb(81,81,81)',
                marginTop: scaleHeight(26),
                marginBottom: scaleHeight(10)
            }} >

                {t('Terminal Configuration')}
            </Text>

            {/* ----------- Line ------------ */}
            <View style={{ height: scaleHeight(1), backgroundColor: 'rgb(227,227,227)', }} />
            <View>
                {
                    (terminalName === PaymentTerminalType.Dejavoo) &&
                    <ItemSetup
                        title={t('Name')}
                        placeholder={t('Device name')}
                        value={name}
                        onChangeText={name => changeName(name)}
                    />
                }

                {
                    terminalName === PaymentTerminalType.Clover &&
                    <ItemSetup
                        title={t('Serial Number')}
                        placeholder={t('Serial Number')}
                        value={serialNumber}
                        onChangeText={serialNumber => changeSerialNumber(serialNumber)}
                    />
                }

                {
                    terminalName === PaymentTerminalType.Dejavoo && <>
                        <ItemSetup
                            title={t('Register ID')}
                            placeholder={t('Register ID')}
                            value={registerId}
                            onChangeText={registerId => changeRegisterId(registerId)}
                        />
                        <ItemSetup
                            title={t('Auth Key')}
                            placeholder={t('Auth Key')}
                            value={authKey}
                            onChangeText={authKey => changeAuthKey(authKey)}
                        />
                    </>
                }

                {
                    terminalName === PaymentTerminalType.Clover ? <>
                        <ItemSetup
                            title={t('IP Address')}
                            placeholder={"192.168.1.1"}
                            value={ip}
                            onChangeText={ip => changeIp(ip)}
                            keyboardType="numeric"
                        />

                        <ItemSetup
                            title={t('Port')}
                            placeholder={'12345'}
                            value={port}
                            onChangeText={port => changePort(port)}
                            keyboardType="numeric"
                        />
                    </> : null
                }

                <View style={{ height: scaleHeight(400) }} />
            </View>
        </KeyboardAwareScrollView>
         {/* ------- Footer -------- */}
         <View style={styles.bottomView} >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                <Button
                    width={scaleWidth(130)}
                    height={50}
                    backgroundColor="#F1F1F1"
                    label={t('CANCEL')}
                    textColor="#6A6A6A"
                    onPress={cancelSetupPax}
                    styleText={{ fontSize: scaleFont(16), fontWeight: '500' }}
                />
                <View style={{ width: scaleWidth(100) }} />
                <Button
                    width={scaleWidth(130)}
                    height={50}
                    backgroundColor="#0764B0"
                    label={t('SAVE')}
                    textColor="#fff"
                    onPress={setupPaymentTerminal}
                    styleText={{ fontSize: scaleFont(16), fontWeight: '500' }}
                />
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
    padding: scaleHeight(20),
    flex: 1,
  },
  bottomView: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    justifyContent: 'center', 
    paddingBottom: scaleHeight(30),
    alignItems: 'center'
  },
});
