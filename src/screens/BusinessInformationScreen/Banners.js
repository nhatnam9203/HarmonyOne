import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { images, colors, fonts } from "@shared/themes";
import { CustomImage } from "@shared/components";
import { slop } from "@shared/utils";
import { View } from 'react-native-animatable';
import { Title } from "./Title";

export const Banners = ({
    banners = [],
}) => {
    return (
        <View style={styles.container}>
            <Title text="Photos" />
            {
                banners.map((banner) => (
                    <Image
                        source={{ uri : banner?.imageUrl }}
                        key={banner?.merchantBannerId + "merchantBannerId"}
                        style={styles.banner}
                        resizeMode='cover'
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(32)
    },
    txtItem: {
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM
    },
    banner : {
        width : scaleWidth(375-32),
        height : scaleWidth(375-32-70)
    }
});
