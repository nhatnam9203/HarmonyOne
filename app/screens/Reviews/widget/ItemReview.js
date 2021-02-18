import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { Text } from '@components'
import { avatarUser, treedot } from '@assets'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ItemReview = ({ item, openButtonReview, openButtonReply }) => {
    return (
        <View style={styles.item}>
            <View style={styles.row}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={avatarUser}
                        style={styles.avatar}
                    />
                    <View style={styles.wrapContent}>
                        <Text
                            fontSize={scaleWidth(4)}
                            color='#404040'
                            fontFamily='medium'
                        >
                            {item.name}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                new Array(5).fill().map(() => (
                                    <Ionicons name='star' color='#F5C750' size={scaleWidth(4)} />
                                ))
                            }
                        </View>
                        <Text
                            fontSize={scaleWidth(3.5)}
                            color='#585858'
                        >
                            {item.date}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.status}>
                        <Text
                            fontSize={scaleWidth(3.2)}
                            color='#404040'
                        >
                            Hidden
                        </Text>
                    </View>
                    <TouchableOpacity hitSlop={slop} onPress={openButtonReview}>
                        <Image
                            source={treedot}
                            resizeMode='contain'
                            style={styles.iconDot}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Text
                fontSize={scaleWidth(4)}
                color='#404040'
                style={{ marginTop: scaleHeight(1.5) }}
            >
                {item.message}
            </Text>
            <MaterialCommunityIcons
                name='message-text'
                size={scaleWidth(7)}
                color='#7B99BA'
                style={styles.iconReply}
            />

            <Reply openButtonReply={openButtonReply} />
        </View>
    )
}

const Reply = ({ openButtonReply }) => {
    return (
        <View style={styles.itemReply}>
            <View style={styles.row}>
                <Text
                    fontSize={scaleWidth(4.3)}
                    color='#0764B0'
                    fontFamily='medium'
                >
                    Owner's reply:
                </Text>

                <TouchableOpacity
                    hitSlop={slop}
                    onPress={openButtonReply}
                >
                    <Image
                        source={treedot}
                        resizeMode='contain'
                        style={[styles.iconDot, { transform: [{ rotate: '90deg' }] }]}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.txtReply}>
                hhjghjkfhjfghjfghfhjgjhgjkhjkhjklhkljhjklhjkghghghjkghjkghjghjgjkhgjgh
            </Text>
        </View>
    )
}

export default ItemReview;

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        paddingBottom: scaleHeight(1.5),
        marginBottom: scaleHeight(1.5),
        marginHorizontal: scaleWidth(5)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatar: {
        borderRadius: scaleWidth(80),
        width: scaleWidth(13),
        height: scaleWidth(13),
    },
    wrapContent: {
        marginLeft: scaleWidth(2),
    },
    iconReply: {
        marginTop: scaleHeight(1.5),
    },
    iconDot: {
        tintColor: '#7B99BA',
        width: scaleWidth(3.5),
        height: scaleWidth(3.5),
    },
    status: {
        height: scaleWidth(5),
        paddingHorizontal: scaleWidth(3),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaleWidth(5),
        borderRadius: 500,
        backgroundColor: '#EEEEEE'
    },
    itemReply: {
        borderRadius: 3,
        backgroundColor: '#FAFAFA',
        padding: scaleWidth(3),
    },
    txtReply: {
        fontSize: scaleWidth(4),
        color: '#666666',
        marginTop: scaleHeight(0.8),
        fontWeight: '300'
    }
})
