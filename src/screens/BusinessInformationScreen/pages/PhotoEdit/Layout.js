import React from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { Button, CustomImage, ListEmptyComponent, IconButton, ProgressiveImage } from "@shared/components";
import { images } from "@shared/themes/resources";
import { WithPopupUploadMultipleImage } from "@shared/HOC";
import { ButtonUpload } from 'src/shared/components';

import CheckBox from "@react-native-community/checkbox"

let ButttonUploadMultippeImage = ({ onResponseImagePicker, ...props }) => {
    return (
        <>
            <TouchableOpacity
                onResponseImagePicker={onResponseImagePicker}
                style={styles.buttonUpload}
                {...props}
            >
                <Image
                    source={images.iconUpload2}
                    style={styles.iconUpload}
                    resizeMode='contain'
                />
                <Text style={styles.txtUpload}>Upload Image</Text>
            </TouchableOpacity>
        </>
    )
}

ButttonUploadMultippeImage = WithPopupUploadMultipleImage(ButttonUploadMultippeImage);


export const Layout = ({
    onSave,
    onResponseImagePicker,
    onResponseCamera,
    banners,
    onSelectMultipleDelete,
    isSelectMultipleDelete,
    changeCheckedDelete,
    changeStatusBannerToDelete,
    bannersDelete,
    actionDeleteBanners
}) => {

    const [t] = useTranslation();


    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t("Photos")}
                isLeft={true}
                isRight={true}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0, paddingTop: scaleHeight(8) }}
                headerRightComponent={() =>
                    isSelectMultipleDelete ?
                        <IconButton
                            icon={images.iconTrash}
                            iconStyle={styles.iconClear}
                            style={styles.buttonClear}
                            onPress={actionDeleteBanners}
                        /> : (
                            <View style={styles.buttonClear}>
                                <View style={styles.iconClear} /> 
                            </View>
                        )
                }
            >
                <View style={styles.content}>
                    <FlatList
                        data={banners}
                        keyExtractor={(item) => item?.merchantBannerId?.toString() + 'merchantBannerEdit'}
                        // ListEmptyComponent={() => <ListEmptyComponent description={t('No Appointments')} image={images.iconNotFound} />}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onLongPress={() => onSelectMultipleDelete(item)}
                                activeOpacity={1}
                                onPress={() => {
                                    if (isSelectMultipleDelete) {
                                        changeStatusBannerToDelete(item);
                                    }
                                }}
                                style={{ position: 'relative' }}
                                key={item?.merchantBannerId + "merchantBannerEdit"}
                            >
                                <ProgressiveImage
                                    url={item?.imageUrl}
                                    style={styles.banner}
                                    resizeMode='cover'
                                    width={scaleWidth(375 - 32)}
                                    height={scaleWidth(375 - 32 - 70)}
                                />
                                {
                                    bannersDelete?.includes(item?.merchantBannerId) &&
                                    <CustomImage
                                        source={images.checkbox_blue}
                                        style={styles.tick}
                                        tintColor={"#585858"}
                                        resizeMode='cover'
                                    />
                                }
                            </TouchableOpacity>
                        }
                        style={{ flex: 1 }}
                        ListFooterComponent={() => (
                            <ButttonUploadMultippeImage
                                onResponseImagePicker={onResponseImagePicker}
                                onResponseCamera={onResponseCamera}
                            />
                        )}
                    />
                </View>
                <View style={styles.bottom}>
                    <Button
                        onPress={onSave}
                        height={scaleHeight(48)}
                        width='100%'
                        label={t('Save')}
                        highlight={true}
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

    tick: {
        width: scaleWidth(25),
        height: scaleWidth(25),
        position: 'absolute',
        right: scaleWidth(8),
        top: scaleWidth(8),
        tintColor : "#585858"
    },

    content: {
        flex: 1,
        padding: scaleWidth(16)
    },

    bottom: {
        paddingHorizontal: scaleWidth(16),
        paddingBottom: scaleHeight(32)
    },

    row: {
        flexDirection: 'row'
    },

    banner: {
        width: scaleWidth(375 - 32),
        height: scaleWidth(375 - 32 - 70),
        marginBottom: scaleHeight(12)
    },

    buttonUpload: {
        width: scaleWidth(375 - 32),
        height: scaleWidth(375 - 32 - 70),
        marginBottom: scaleHeight(12),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1F1F1"
    },
    txtUpload: {
        fontSize: scaleFont(16),
        color: "#7A98BB",
        fontFamily: fonts.REGULAR
    },
    iconUpload: {
        width: scaleWidth(50),
        height: scaleWidth(50),
        marginBottom: 5,
        tintColor: "#7A98BB"
    },

    iconClear: {
        width: scaleWidth(30),
        height: scaleWidth(30),
        tintColor: "#333"
    },

    buttonClear: {
        height: '100%',
        alignItems: 'center'
    },


});
