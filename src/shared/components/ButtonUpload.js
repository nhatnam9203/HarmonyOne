import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { CustomImage } from "./CustomImage";
import { WithPopupUpload } from '@shared/HOC';
import { images } from '@shared/themes';
import { translate } from "@localize";

let ImageButton = ({ onResponseImagePicker, imageUrl, ...props }) => {
    if (!imageUrl)
        return (
            <TouchableOpacity
                style={styles.wrapIconUpload}
                onResponseImagePicker={onResponseImagePicker}
                {...props}
            >
                <Image
                    source={images.iconUpload}
                    style={styles.iconUpload}
                    resizeMode='contain'
                />

                <Text style={{ color: "#CCCCCC", fontSize: scaleFont(14) }}>
                    {translate("Add image")}
                </Text>
            </TouchableOpacity>
        )
    else {
        return (
            <TouchableOpacity
                style={[styles.wrapIconUpload, { padding: 0 }]}
                onResponseImagePicker={onResponseImagePicker}
                {...props}
            >
                <CustomImage
                    source={{ uri: imageUrl }}
                    style={styles.imageUpload}
                />
            </TouchableOpacity>
        )
    }
};

export let ButtonUpload = WithPopupUpload(ImageButton);

const styles = StyleSheet.create({
    iconUpload: {
        width: scaleWidth(50),
        height: scaleWidth(50),
        marginBottom: 5
    },

    wrapIconUpload: {
        padding: scaleWidth(15),
        backgroundColor: '#FAFAFA',
        width: scaleWidth(120),
        height: scaleWidth(120),
        marginBottom: scaleHeight(20),
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageUpload: {
        width: '100%',
        height: '100%'
    }
});