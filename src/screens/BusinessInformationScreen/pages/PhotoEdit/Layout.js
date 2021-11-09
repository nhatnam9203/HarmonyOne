import React from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { Button, CustomImage, ListEmptyComponent } from "@shared/components";
import { images } from "@shared/themes/resources";
import { WithPopupUploadMultipleImage } from "@shared/HOC";
import { ButtonUpload } from 'src/shared/components';


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
    merchantDetail,
    onSave,
    onResponseImagePicker,
    onResponseCamera,
    banners
}) => {

    const [t] = useTranslation();


    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t("Photos")}
                isLeft={true}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0, paddingTop: scaleHeight(8) }}
            >
                <View style={styles.content}>
                    <FlatList
                        data={banners}
                        keyExtractor={(item) => item?.merchantBannerId?.toString() + 'merchantBannerEdit'}
                        ListEmptyComponent={() => <ListEmptyComponent description={t('No Appointments')} image={images.iconNotFound} />}
                        renderItem={({ item }) =>
                            <CustomImage
                                source={{ uri: item?.imageUrl }}
                                key={item?.merchantBannerId + "merchantBannerEdit"}
                                style={styles.banner}
                                resizeMode='cover'
                            />
                        }
                        style={{ flex: 1 }}
                        // ListFooterComponent={() => (
                        //     <ButttonUploadMultippeImage
                        //         onResponseImagePicker={onResponseImagePicker}
                        //         onResponseCamera={onResponseCamera}
                        //     />
                        // )}
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

});
