import React from "react";
import { View, StyleSheet, Text, Pressable, Platform, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button } from "@shared/components";
import { fonts, images } from '@shared/themes';
import { translate } from "@localize";
import Ionicons from "react-native-vector-icons/Ionicons";
import ic_english from "../../localization/flags/ic-flag-english.png";
import ic_vietnam from "../../localization/flags/ic-flag-vietnam.png";
import { LanguageLoading } from "./LanguageLoading";

export const Layout = ({
  language,
  switchLanguage,
  lang,
  setLang,
  refLanguageLoading,
}) => {

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate("txtChangeLanguage")}
        isRight={true}
        isLeft={true}
        isScrollLayout={false}
        headerRightComponent={() =>
          <View style={{ width: scaleWidth(25) }} />
        }
      >
        <View style={styles.content}>

          <ItemLanguage
            title="English"
            icon={ic_english}
            lng="en"
            lang={lang}
            setLang={setLang}
          />

          <ItemLanguage
            title="Việt Nam"
            icon={ic_vietnam}
            lng="vi"
            lang={lang}
            setLang={setLang}
            style={{ marginTop: scaleWidth(16) }}
          />

        </View>
      </SingleScreenLayout>
      <View style={styles.bottom}>
        <Button
          label={translate("txtSave")}
          onPress={switchLanguage}
          highlight={true}
          width={'100%'}
        />
      </View>

      <LanguageLoading
        ref={refLanguageLoading}
        title={`${translate("txtChangeLanguage")} !`}
        titleContent={
          translate("txtContentChangeLanguage")
        }
      />
    </View>
  );
};

const ItemLanguage = ({ title = "Việt Nam", icon = ic_english, lng = "en", lang, setLang, style }) => {
  return (
    <Pressable
      onPress={() => setLang(lng)}
      style={[styles.item, style]}
    >
      <View style={styles.row}>
        <Image style={styles.flag} source={`${icon}`} />
        <Text style={styles.txtLanguage}>{`${title}`}</Text>
      </View>
      <Ionicons
        name={lang == lng ? "md-radio-button-on" : "md-radio-button-off"}
        size={27}
        color="#2B62AB"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingVertical: scaleWidth(8),
  },
  item: {
    width: scaleWidth(375 - 24),
    borderRadius: 15,
    height: scaleHeight(65),
    backgroundColor: "#fafafa",
    marginHorizontal: scaleWidth(12),
    flexDirection: "row",
    paddingHorizontal: scaleWidth(24),
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1345,
    shadowRadius: 1.84,
    ...(Platform.OS == "android" && { borderWidth: 1, borderColor: "#dddddd" })
  },
  txtLanguage: {
    color: "#333",
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(17),
  },
  bottom: {
    padding: scaleWidth(24),
  },
  flag: {
    width: scaleWidth(25),
    height: scaleWidth(25),
    marginRight: scaleWidth(25)
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  }
});
