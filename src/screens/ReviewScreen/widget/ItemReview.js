import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native'
import { avatarUser, treedot } from '@assets';
import { fonts, colors } from "@shared/themes";
import { dateToFormat, slop, guid } from "@shared/utils";
import { SliderImage } from "@shared/components";
import { images } from "@shared/themes/resources";
import { WithPopupActionSheet } from "@shared/HOC";
import { isEmpty, isInteger } from "lodash";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomImage } from '@shared/components';


let EditReview = ({ ...props }) => {
    return (
        <TouchableOpacity hitSlop={slop(20)} {...props}>
            <Image
                source={images.iconMore}
                style={styles.iconBigDot}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};
EditReview = WithPopupActionSheet(EditReview);

let EditReply = ({ ...props }) => {
    return (
        <TouchableOpacity {...props}>
            <Image
                source={images.iconMore}
                style={[styles.iconDot, { transform: [{ rotate: '90deg' }] }]}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};
EditReply = WithPopupActionSheet(EditReply);


const ItemReview = ({
    item,
    openButtonReview,
    openButtonReply,
    getActionSheetReview,
    getActionSheetReply,
}) => {

    return (
        <View style={styles.item}>
            <View style={styles.row}>

                {/******************************** CUSTOMER NAME, STAR, DATE, AVATAR *********************************/}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        item?.user?.imageUrl ?
                            <Image
                                source={{ uri: item?.user?.imageUrl }}
                                style={styles.avatar}
                            /> :
                            <FirstLetterName name={item?.user?.name?.charAt(0)?.toUpperCase()} />
                    }

                    <View style={styles.wrapContent}>
                        <Text style={styles.name}>
                            {item?.user?.name}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                new Array(parseInt(parseInt(item?.rating))).fill().map(() => (
                                    <Ionicons
                                        key={guid()}
                                        name='star-sharp'
                                        color='#F5C750'
                                        size={scaleWidth(13)}
                                    />
                                ))
                            }
                        </View>
                        <Text style={styles.date}>
                            {dateToFormat(item?.createdDate, "MMMM DD, YYYY")}
                        </Text>
                    </View>
                </View>

                {/******************************** HIDDEN *********************************/}
                <View style={{ flexDirection: 'row', }}>
                    {
                        item?.isDisabled == 1 &&
                        <View style={styles.status}>
                            <Text style={styles.txtHidden} >
                                Hidden
                            </Text>
                        </View>
                    }
                    <EditReview actions={getActionSheetReview()} />
                </View>
            </View>

            {/******************************** MESSAGE *********************************/}
            {
                item?.message !== "" && <Text style={styles.message}>
                    {item?.message}
                </Text>
            }

            {/******************************** RATING IMAGE *********************************/}
            {
                item?.ratingImages?.length > 0 &&
                <View style={{ flexDirection: 'row', marginTop: scaleHeight(8) }}>
                    <FlatList
                        data={item?.ratingImages || []}
                        keyExtractor={(ratingImage) => ratingImage?.staffRatingId?.toString() + "staffRatingImageId"}
                        renderItem={(props) => <ImageRating item={props.item} ratingImages={item.ratingImages} />}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                    />
                </View>
            }

            {/* <MaterialCommunityIcons
                name='message-text'
                size={scaleWidth(7)}
                color='#7B99BA'
                style={styles.iconReply}
            /> */}

            {/* <Reply
                openButtonReply={openButtonReply}
                getActionSheetReply={getActionSheetReply}
            /> */}
        </View>
    )
}

const FirstLetterName = ({ name }) => (
    <View style={styles.wrapfirstLetter}>
        <Text style={styles.letter}>
            {name}
        </Text>
    </View>
)

const Reply = ({ openButtonReply, getActionSheetReply }) => {
    return (
        <View style={styles.itemReply}>
            <View style={styles.row}>
                <Text style={styles.ownerReply}>
                    Owner's reply:
                </Text>
                <EditReply actions={getActionSheetReply()} />
            </View>

            <Text style={styles.txtReply}>
                test test test test
            </Text>
        </View>
    )
}

const ImageRating = ({ item, ratingImages = [] }) => {

    const sliderRef = React.useRef();

    const showSliderImage = () => {
        const index = ratingImages.findIndex(obj => obj?.fileId == item?.fileId);
        sliderRef?.current?.show();
        sliderRef?.current?.setImages(ratingImages);
        sliderRef?.current?.setIndexActive(index);
    }

    if (item.imageUrl !== "") {
        return (
            <>
                <TouchableOpacity onPress={showSliderImage}>
                    <CustomImage
                        source={{ uri: item.imageUrl }}
                        style={styles.ratingImage}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
                <SliderImage ref={sliderRef} />
            </>

        );
    }
    return null;
}

export default ItemReview;

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        marginBottom: scaleHeight(12),
        paddingBottom: scaleHeight(12)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: scaleFont(15),
        color: colors.greyish_brown_40,
        fontFamily: fonts.MEDIUM
    },
    date: {
        fontSize: scaleFont(11),
        color: '#585858',
        fontFamily: fonts.LIGHT
    },
    message: {
        fontSize: scaleFont(14),
        color: colors.greyish_brown_40,
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(16)
    },
    txtHidden: {
        fontSize: scaleFont(10),
        color: colors.greyish_brown_40,
        fontFamily: fonts.REGULAR,
    },
    ownerReply: {
        fontSize: scaleFont(14),
        color: colors.ocean_blue,
        fontFamily: fonts.MEDIUM,
    },
    avatar: {
        borderRadius: scaleWidth(1000),
        width: scaleWidth(50),
        height: scaleWidth(50),
    },
    wrapfirstLetter: {
        borderRadius: scaleWidth(1000),
        width: scaleWidth(50),
        height: scaleWidth(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#D4F8FC"
    },
    letter: {
        fontSize: scaleFont(20),
        fontFamily: fonts.MEDIUM,
        color: colors.greyish_brown_40,
    },
    wrapContent: {
        marginLeft: scaleWidth(8)
    },
    iconReply: {
        marginTop: scaleHeight(1.5),
    },
    iconDot: {
        tintColor: '#7B99BA',
        width: scaleWidth(14),
        height: scaleWidth(14),
        resizeMode: 'contain'
    },
    iconBigDot: {
        tintColor: colors.greyish_brown_40,
        width: scaleWidth(18),
        height: scaleWidth(18),
        resizeMode: 'contain',
        marginTop: -2
    },
    status: {
        height: scaleWidth(16),
        paddingHorizontal: scaleWidth(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaleWidth(16),
        borderRadius: 500,
        backgroundColor: '#EEEEEE'
    },
    itemReply: {
        borderRadius: 3,
        backgroundColor: '#FAFAFA',
        padding: scaleWidth(12),
        marginTop: scaleHeight(8)
    },
    txtReply: {
        fontSize: scaleFont(14),
        color: '#666666',
        fontFamily: fonts.LIGHT,
        marginTop: scaleHeight(8),
    },
    ratingImage: {
        width: scaleWidth(50),
        height: scaleWidth(50),
        resizeMode: 'contain',
        marginRight: scaleWidth(8)
    }
})
