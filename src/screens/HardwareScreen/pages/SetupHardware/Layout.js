import React from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    Image, 
    TextInput, 
    Keyboard, 
    Platform,
    ActivityIndicator,
    ScrollView,
 } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors, images } from "@shared/themes";
import { 
    Button, 
    SettingTextInput, 
    DropdownMenu, 
    CustomInput 
} from "@shared/components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { 
    PaymentTerminalType,
   } from "@shared/utils";
import _ from "lodash";
import { translate } from "@localize";

export const Layout = ({
    terminalListRef,
    terminalIdList,
    peripherals,
    name,
    ip,
    port,
    serialNumber,
    registerId,
    authKey,
    terminalName,
    commType,
    bluetoothAddr,
    setupPaymentTerminal,
    cancelSetupPax,
    setTerminal,
    changeName,
    changeSerialNumber,
    changeRegisterId,
    changeAuthKey,
    changeIp,
    changePort,
    changeBluetoothAddr,
    setTerminalIdSelected,
    saveCommType,
    scanDevices,
    handleSelectPeripheral,
    scanLoading,
    terminalIdSelected,
}) => {
  const [t] = useTranslation();
  const tempCheckPax = terminalName === PaymentTerminalType.Pax 
                            ? images.radioExportSe 
                            : images.radioExport;
  const tempCheckClover = terminalName === PaymentTerminalType.Clover 
                            ? images.radioExportSe 
                            : images.radioExport;
  const tempCheckDejavoo = terminalName === PaymentTerminalType.Dejavoo 
                            ? images.radioExportSe 
                            : images.radioExport;
  

    const ItemBluetooth = ({ peripheral, bluetoothPaxInfo, onPress }) => {

        const isConnected = peripheral?.id && peripheral?.id === bluetoothPaxInfo?.id ? true : false;

        return (
            <TouchableOpacity onPress={() => onPress(peripheral)} style={styles.itemBlueTooth} >
                <View>
                    <Text style={{
                        fontSize: scaleFont(14),
                        fontWeight: '600',
                    }} >
                        {peripheral?.name || "No Name"}
                    </Text>
                    <Text style={{
                        fontSize: scaleFont(8),
                        fontWeight: '300',
                    }} >
                        {peripheral?.id || ""}
                    </Text>
                </View>

                <Text style={{
                    fontSize: scaleFont(12),
                    fontWeight: '600',
                    color: '#0764B0',
                }} >
                    {`${isConnected ? translate("Connected") : ""}`}
                </Text>
            </TouchableOpacity>
        );
    }

  const renderPaxView = () => {
    const tempCheckEthernetIcon = commType === "TCP" 
    ? images.radioExportSe 
    : images.radioExport;
    const tempCheckBluetoothIcon = commType === "BLUETOOTH" 
        ? images.radioExportSe 
        : images.radioExport;
      return (
          <View>
            <View style={{ flexDirection: 'row', marginTop: scaleHeight(20), }} >
                <View style={{ width: scaleWidth(100), justifyContent: 'center', }} >
                    <Text style={{ fontSize: scaleFont(13), color: 'rgb(42,42,42)' }} >
                        {translate("Communication Type")}
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: scaleWidth(20) }} >
                        <TouchableOpacity 
                        onPress={() => saveCommType("TCP")} 
                        style={[styles.radioButtonView, { marginRight: scaleWidth(10) }]} >
                            <Image
                                source={tempCheckEthernetIcon}
                                style={{ marginRight: scaleWidth(10) }}
                            />
                            <Text style={styles.textRadio} >
                                {translate("Ethernet")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => saveCommType("BLUETOOTH")} 
                        style={styles.radioButtonView} >
                            <Image
                                source={tempCheckBluetoothIcon}
                                style={{ marginRight: scaleWidth(10) }}
                            />
                            <Text style={styles.textRadio} >
                                {translate("Bluetooth")}
                            </Text>
                        </TouchableOpacity>

                </View>
            </View>
            {
                commType === "BLUETOOTH" ?
                    <>
                        <SettingTextInput
                            title={translate('Name')}
                            placeholder={translate('Device name')}
                            value={name}
                            onChangeText={changeName}
                        />
                         <SettingTextInput
                            title={translate('Bluetooth ID')}
                            placeholder={'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'}
                            value={bluetoothAddr}
                            onChangeText={changeBluetoothAddr}
                            keyboardType="numeric"
                            editable={false}
                            style={{ backgroundColor: "rgb(250,250,250)" }}
                        />
                        <View style={styles.terminalView}>
                            <Text style={{
                                fontSize: scaleFont(13), 
                                color: 'rgb(42,42,42)',
                                width: '40%',
                                }} >

                                {translate('Select Terminal ID')}
                            </Text>
                            <DropdownMenu
                                ref={terminalListRef}
                                items={terminalIdList}
                                onChangeValue={setTerminalIdSelected}
                                defaultIndex={terminalIndex || 0}
                                width={scaleWidth(200)}
                                height={scaleHeight(50)}
                                styleDropDown={styles.styleDropDown}
                                textStyle={styles.dropdownText}
                            />
                        </View>
                        <TouchableOpacity onPress={() => scanDevices()} style={{
                            flexDirection: 'row', alignItems: 'center', width: scaleWidth(120),
                            marginTop: scaleHeight(20), marginLeft: scaleWidth(15)
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
                                    fontWeight: 'bold'
                                }} >
                                    +
                            </Text>
                            </View>

                            <Text style={{
                                fontSize: scaleFont(14),
                                color: '#0764B0',
                                marginLeft: scaleWidth(8), fontWeight: "600"
                            }} >

                                {translate('Scan devices')}
                            </Text>
                            <View style={{width: scaleWidth(15)}} />
                            {
                                scanLoading && <ActivityIndicator size="small" color="#0000ff" />
                            }

                        </TouchableOpacity>

                        {/* ------------- Bluetooth devices list ----------- */}
                        <View style={{ marginTop: scaleHeight(15) }} >
                            <ScrollView>
                                {
                                    peripherals.map((peripheral, index) => <ItemBluetooth
                                        key={`${peripheral?.id}_${index}`}
                                        peripheral={peripheral}
                                        onPress={() => handleSelectPeripheral(peripheral)}
                                        bluetoothPaxInfo={bluetoothPaxInfo}
                                    />)
                                }
                            </ScrollView>
                        </View>

                    </>
                    : <>

                        <SettingTextInput
                            title={translate('Name')}
                            placeholder={translate('Device name')}
                            value={name}
                            onChangeText={changeName}
                        />
                         <SettingTextInput
                            title={translate('IP Address')}
                            placeholder={"192.168.1.1"}
                            value={ip}
                            onChangeText={ip => changeIp(ip)}
                            keyboardType="numeric"
                        />

                        <SettingTextInput
                            title={translate('Port')}
                            placeholder={'10009'}
                            value={port}
                            onChangeText={port => changePort(port)}
                            keyboardType="numeric"
                        />
                    </>
            }
        </View>
      )
  }

  const terminalIndex = _.findIndex(terminalIdList, item => {
      return _.get(item, "label") == terminalIdSelected
  })

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('Hardwares')}      
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0, justifyContent: 'space-between' }}
      >
        <KeyboardAwareScrollView 
            style={styles.content}>
            <Text style={{
                fontSize: scaleFont(16),
                fontWeight: '600',
                color: '#0764B0'
            }} >
                {translate('Payment Terminal')}
            </Text>

            <Text style={{
                fontSize: scaleFont(16),
                fontWeight: '600',
                color: 'rgb(81,81,81)',
                marginTop: scaleHeight(26),
                marginBottom: scaleHeight(10)
            }} >
                {translate('Device')}
            </Text>
            <View style={{flexDirection:'row'}}>
                { Platform.OS == "ios" && 
                    <TouchableOpacity 
                    onPress={setTerminal("Pax")} 
                    style={{ flexDirection: "row", marginRight: scaleWidth(40) }} >
                        <Image
                            source={tempCheckPax}
                            style={{ marginRight: scaleWidth(10) }}
                        />
                        <Text style={styles.textRadio} >
                            {translate('Pax')}
                        </Text>
                    </TouchableOpacity>
                }
                { Platform.OS == "ios" && 
                    <TouchableOpacity onPress={setTerminal("Clover")} style={{ flexDirection: "row", marginRight: scaleWidth(40) }} >
                        <Image
                            source={tempCheckClover}
                            style={{ marginRight: scaleWidth(10) }}
                        />
                        <Text style={styles.textRadio} >
                            {translate('Clover')}
                        </Text>
                    </TouchableOpacity>
                }
                

                <TouchableOpacity onPress={setTerminal(PaymentTerminalType.Dejavoo)} style={{ flexDirection: "row" }} >
                    <Image
                        source={tempCheckDejavoo}
                        style={{ marginRight: scaleWidth(10) }}
                    />
                    <Text style={styles.textRadio} >
                        {translate('Dejavoo')}
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

                {translate('Terminal Configuration')}
            </Text>

            {/* ----------- Line ------------ */}
            <View style={{ height: scaleHeight(1), backgroundColor: 'rgb(227,227,227)', }} />
            <View>
                {
                    terminalName === PaymentTerminalType.Pax && Platform.OS == "ios" &&
                    renderPaxView()
                }
                {
                    (terminalName === PaymentTerminalType.Dejavoo) &&
                    <>
                        <SettingTextInput
                            title={translate('Name')}
                            placeholder={translate('Device name')}
                            value={name}
                            onChangeText={changeName}
                        />
                        <SettingTextInput
                            title={translate('Register ID')}
                            placeholder={translate('Register ID')}
                            value={registerId}
                            onChangeText={registerId => changeRegisterId(registerId)}
                        />
                        <SettingTextInput
                            title={translate('Auth Key')}
                            placeholder={translate('Auth Key')}
                            value={authKey}
                            onChangeText={authKey => changeAuthKey(authKey)}
                        />
                    </>
                   
                }

                
                {
                    terminalName === PaymentTerminalType.Clover && Platform.OS == "ios" 
                    ? <>
                        <SettingTextInput
                            title={translate('Serial Number')}
                            placeholder={translate('Serial Number')}
                            value={serialNumber}
                            onChangeText={serialNumber => changeSerialNumber(serialNumber)}
                        />
                        <SettingTextInput
                            title={translate('IP Address')}
                            placeholder={"192.168.1.1"}
                            value={ip}
                            onChangeText={ip => changeIp(ip)}
                            keyboardType="numeric"
                        />

                        <SettingTextInput
                            title={translate('Port')}
                            placeholder={'12345'}
                            value={port}
                            onChangeText={port => changePort(port)}
                            keyboardType="numeric"
                        />
                    </> : null
                }

                { commType != "BLUETOOTH" && <View style={styles.terminalView}>
                        <Text style={{
                            fontSize: scaleFont(13), 
                            color: 'rgb(42,42,42)',
                            width: '40%',
                            }} >

                            {translate('Select Terminal ID')}
                        </Text>
                        <DropdownMenu
                            ref={terminalListRef}
                            items={terminalIdList}
                            onChangeValue={setTerminalIdSelected}
                            defaultIndex={terminalIndex || 0}
                            width={scaleWidth(200)}
                            height={scaleHeight(50)}
                            styleDropDown={styles.styleDropDown}
                            textStyle={styles.dropdownText}
                        />
                    </View>
                }

                <View style={{ height: scaleHeight(400) }} />

               
            </View>
        </KeyboardAwareScrollView>
         {/* ------- Footer -------- */}
         <View style={styles.bottomView} >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                <Button
                    width={scaleWidth(130)}
                    height={scaleHeight(50)}
                    backgroundColor="#F1F1F1"
                    label={translate('CANCEL')}
                    textColor="#6A6A6A"
                    onPress={() => cancelSetupPax()}
                    styleText={{ fontSize: scaleFont(16), fontWeight: '500' }}
                />
                <View style={{ width: scaleWidth(50) }} />
                <Button
                    width={scaleWidth(130)}
                    height={scaleHeight(50)}
                    backgroundColor="#0764B0"
                    label={translate('SAVE')}
                    textColor="#fff"
                    onPress={() => setupPaymentTerminal()}
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
  styleDropDown: {
    height: scaleHeight(50), 
    width: '100%',
    borderColor: 'rgb(227,227,227)',
    borderWidth: scaleWidth(1), 
    justifyContent: 'center',
  },
  terminalView: {
    flexDirection:'row', 
    alignItems: 'center',
    marginTop: scaleHeight(20),
  },
  dropdownText:{
    fontSize: scaleFont(13), 
  },
  itemBlueTooth: {
    height: scaleHeight(45), 
    backgroundColor: "rgb(250,250,250)", 
    borderRadius: 6,
    flexDirection: "row", 
    alignItems: "center", 
    paddingLeft: scaleWidth(15),
    paddingRight: scaleWidth(40), 
    justifyContent: "space-between",
    marginBottom: scaleHeight(13)
  },
  radioButtonView: {
    flexDirection: "row", 
    alignItems: "center"
  },
  textRadio: { 
      fontSize: scaleFont(15), 
      color: 'rgb(42,42,42)', 
      fontWeight: "600" 
    }
});
