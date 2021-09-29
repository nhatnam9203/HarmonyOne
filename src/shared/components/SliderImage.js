import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CustomModal } from "./CustomModal";
import { CustomImage } from "./CustomImage";
import { IconButton } from "./IconButton";
import { images, colors } from "@shared/themes";
import { SliderBox } from "react-native-image-slider-box";
import FastImage from "react-native-fast-image";

export const SliderImage = React.forwardRef(({

}, ref) => {

    const [open, setOpen] = React.useState(false);
    const [imagesRating, setImages] = React.useState([]);
    const [indexActive , setIndexActive] = React.useState(0);

    React.useImperativeHandle(ref, () => ({
        show: () => {
            setOpen(true);
        },
        hide: () => {
            setOpen(false);
        },
        setImages: (arrImages) => {
            let tempArrImage = [];
            for (const img of arrImages) {
                tempArrImage.push(img.imageUrl);
            }
            setImages(tempArrImage);
        },
        setIndexActive : (index) =>{
            if(index !== -1){
                setIndexActive(index);
            }else{
                setIndexActive(0);
            }
        }
    }));

    const close = () => {
        setOpen(false);
    }

    return (
        <CustomModal
            isVisible={open}
            style={styles.modal}
            backdropOpacity={1}
            backdropColor={'black'}
            animationIn="zoomInRight"
            animationOut="fadeOutRight"
            useNativeDriver={true}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <IconButton
                        icon={images.iconClose}
                        iconStyle={styles.iconClose}
                        style={styles.btnClose}
                        onPress={close}
                    />
                    <SliderBox 
                        images={imagesRating}
                        sliderBoxHeight={scaleHeight(270)}
                        ImageComponent={FastImage}
                        disableOnPress={true}
                        fontVariantPosition
                        firstItem={indexActive}
                    />
                </View>
            </View>
        </CustomModal>
    )
});


const styles = StyleSheet.create({
    modal: {
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: scaleWidth(375),
        height: scaleHeight(270),
        backgroundColor: "transparent",
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconClose: {
        width: scaleWidth(40),
        height: scaleWidth(40),
        resizeMode: 'contain',
        tintColor: "#585858"
    },
    btnClose: {
        alignSelf: "flex-end"
    },
    imageItem: {
        width: scaleWidth(375),
        height: scaleHeight(270),
        resizeMode: 'contain'
    }
});