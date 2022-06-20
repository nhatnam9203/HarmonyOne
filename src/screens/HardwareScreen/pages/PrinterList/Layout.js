import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors, images } from "@shared/themes";
import { Button } from "@shared/components";
import { translate } from "@localize";

export const Layout = ({
  printerList,
  printerSelect,
  printerPortType,
  backHomeHardware,
  selectPrinter,
  selectPortType,
}) => {

  const ItemConnect = ({ title, isSelect, onPress }) => {
    const tempIconSelect = isSelect ? images.radioExportSe : images.radioExport;

    return (
        <TouchableOpacity onPress={() => onPress(title)} style={{ flexDirection: "row", alignItems: "center", marginTop: scaleHeight(10) }} >
            <Image source={tempIconSelect} />
            <Text style={{ fontSize: scaleFont(14), color: "rgb(131,131,131)", marginLeft: scaleWidth(10) }} >
                {title}
            </Text>
        </TouchableOpacity>
    );
  }

  const ItemPrinter = ({ modelName, isConnected, onPress }) => {

      return (
          <TouchableOpacity onPress={() => onPress(modelName)} style={{
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
                  {`${isConnected ? translate("Connected") : ""}`}
              </Text>
          </TouchableOpacity>
      );
  }


  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('Hardwares')}      
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
        <Text style={{
                    fontSize: scaleFont(16),
                    fontWeight: '600',
                    color: '#0764B0'
                }} >
                    {translate('Connect Printer By')}
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
                    {translate('My Printer Devices')}
                </Text>
                {
                    printerList && printerList.map((printer) => <ItemPrinter
                        key={printer.portName}
                        modelName={printer.modelName}
                        isConnected={printer.modelName == printerSelect ? true : false}
                        onPress={selectPrinter}
                    />)
                }

        </View>

        {/* ------- Footer -------- */}
        <View style={{ position: 'absolute', bottom: 0, width: '100%', justifyContent: 'flex-end', paddingBottom: scaleHeight(30) }} >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                <Button
                    width={scaleWidth(130)}
                    height={scaleHeight(50)}
                    backgroundColor="#F1F1F1"
                    label={translate('BACK')}
                    textColor="#6A6A6A"
                    onPress={backHomeHardware}
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
    padding: scaleHeight(16),
    flex: 1,
  },
});
