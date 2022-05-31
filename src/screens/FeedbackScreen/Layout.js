import React from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, TextInput, Keyboard } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { Button } from "@shared/components";
import { images } from "@shared/themes/resources";
import { ListEmoji } from "./ListEmoji";
import { translate } from "@localize";

export const Layout = ({
  value,
  onChange,
  onSubmit,
  listEmojiRef
}) => {

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate("txtFeedback")}
        isLeft={true}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            {translate("txtShareFeedback")}
          </Text>
          <Text style={styles.subTitle}>
            {translate("txtShareFeedback2")}
          </Text>
          <ListEmoji ref={listEmojiRef} />

          <TextInput
            multiline={true}
            placeholder={translate("txtTypeYourComment")}
            placeholderTextColor='#7B99BA'
            textAlignVertical='top'
            value={value}
            onChangeText={onChange}
            style={styles.input}
            onSubmitEditing={()=>Keyboard.dismiss()}
          />
        </View>
        <View style={styles.bottom}>
          <Button
            label={translate("txtSendFeedback")}
            onPress={onSubmit}
            highlight={true}
            width={'100%'}
          />
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

  title: {
    fontSize: scaleFont(24),
    color: '#1366AE',
    fontFamily: fonts.MEDIUM
  },

  subTitle: {
    fontSize: scaleFont(15),
    marginTop: scaleHeight(12),
    color: '#404040',
    fontFamily: fonts.REGULAR
  },

  content: {
    flex: 1,
    padding: scaleWidth(16)
  },

  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dddddd',
    height: scaleHeight(120),
    width: scaleWidth(375 - 32),
    backgroundColor: '#F8F8F8',
    fontSize: scaleFont(16),
    padding: scaleWidth(8),
    marginTop: scaleHeight(24),
  },

  bottom: {
    padding: scaleWidth(24),
    width: scaleWidth(375),
  },
});
