import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors, images } from "@shared/themes";
import { Button } from "@shared/components";
export const Layout = ({
  paxMachineInfo,
  printerList,
  printerSelect,
  printerPortType,
  backHomeHardware,
  selectPrinter,
  selectPortType,
  addDevice,
}) => {
  const [t] = useTranslation();


  const renderNoConnected = () => {

    return (
        <View>
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
                        fontWeight: 'bold'
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
        <Button onPress={addDevice} style={{
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
              {paxMachineInfo.name}
          </Text>
      </Button>
    );
  }


  const ItemConnect = ({ title, isSelect, onPress }) => {
    const tempIconSelect = isSelect ? images.radioExportSe : images.radioExport;

    return (
        <Button onPress={() => onPress(title)} style={{ flexDirection: "row", alignItems: "center", marginTop: scaleHeight(10) }} >
            <Image source={tempIconSelect} />
            <Text style={{ fontSize: scaleFont(14), color: "rgb(131,131,131)", marginLeft: scaleWidth(10) }} >
                {title}
            </Text>
        </Button>
    );
  }

  const ItemPrinter = ({ modelName, isConnected, onPress }) => {

      return (
          <Button onPress={() => onPress(modelName)} style={{
              height: scaleHeight(40), backgroundColor: "rgb(250,250,250)", borderRadius: 6,
              flexDirection: "row", alignItems: "center", paddingLeft: scaleWidth(15),
              paddingRight: scaleWidth(40), justifyContent: "space-between",
              marginBottom: scaleHeight(13)
          }} >
              <Text style={{
                  fontSize: scaleFont(14),
                  fontWeight: '600',
              }} >
                  {modelName}
              </Text>

              <Text style={{
                  fontSize: scaleFont(12),
                  fontWeight: '600',
                  color: '#0764B0',
              }} >
                  {`${isConnected ? "Connected" : ""}`}
              </Text>
          </Button>
      );
  }


  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Sales by customer')}      
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
        <Text style={{
                    fontSize: scaleFont(16),
                    fontWeight: '600',
                    color: '#0764B0'
                }} >
                    {t('Connect Printer By')}
                </Text>
                <View style={{ paddingLeft: scaleWidth(15) }} >
                    <ItemConnect
                        title="Bluetooth"
                        isSelect={printerPortType === "Bluetooth" ? true : false}
                        onPress={selectPortType}
                    />
                    <ItemConnect
                        title="LAN"
                        isSelect={printerPortType === "LAN" ? true : false}
                        onPress={selectPortType}
                    />
                    <ItemConnect
                        title="USB"
                        isSelect={printerPortType === "USB" ? true : false}
                        onPress={selectPortType}
                    />
                </View>

                <Text style={{
                    fontSize: scaleFont(16),
                    fontWeight: '600',
                    color: '#0764B0', marginTop: scaleHeight(20), marginBottom: scaleHeight(10)
                }} >
                    {t('My Printer Devices')}
                </Text>
                {
                    printerList && printerList.map((printer) => <ItemPrinter
                        key={printer.portName}
                        modelName={printer.modelName}
                        isConnected={printer.modelName == printerSelect ? true : false}
                        onPress={selectPrinter}
                    />)
                }


                {/* ------- Footer -------- */}
                <View style={{ position: 'absolute', bottom: 0, width: '100%', justifyContent: 'flex-end', paddingBottom: scaleHeight(30) }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                        <Button
                            width={scaleWidth(130)}
                            height={50}
                            backgroundColor="#F1F1F1"
                            label={t('BACK')}
                            textColor="#6A6A6A"
                            onPress={backHomeHardware}
                            style={{ borderWidth: 2, borderColor: 'rgb(227,227,227)', borderRadius: 2, }}
                            styleText={{ fontSize: scaleFont(20), fontWeight: '500' }}
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
    paddingTop: scaleHeight(16),
    flex: 1,
  },
});
