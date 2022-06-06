import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { images, colors, fonts } from "@shared/themes";
import { ProgressiveImage } from "@shared/components";
import { slop } from "@shared/utils";
import { View } from 'react-native-animatable';
import { Title } from "../../Title";
import NavigationService from '@navigation/NavigationService';

export const Banners = ({
    banners = [],
}) => {
    return (
        <View style={styles.container}>
            <Title text="Photos" onEdit={()=>{ NavigationService.navigate("PhotoEdit") }} />
            {
                banners.map((banner) => (
                    <ProgressiveImage
                        url={banner?.imageUrl}
                        key={banner?.merchantBannerId + "merchantBannerId"}
                        style={styles.banner}
                        resizeMode='cover'
                        width={scaleWidth(375 - 32)}
                        height={scaleWidth(375 - 32 - 70)}
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
        height : scaleWidth(375-32-70),
        marginBottom : scaleHeight(12)
    }
});
