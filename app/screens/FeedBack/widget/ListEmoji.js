import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Text } from '@components'
import styles from '../styles'
import {
    emoji1,
    emoji2,
    emoji3,
    emoji4,
    emoji5,
    emoji_1,
    emoji_2,
    emoji_3,
    emoji_4,
    emoji_5
} from '@assets'

const listStatus = [
    {
        status: 'very bad',
        emoji_unselect: emoji_1,
        emoji_select: emoji1
    },
    {
        status: 'bad',
        emoji_unselect: emoji_2,
        emoji_select: emoji2,
    },
    {
        status: 'normal',
        emoji_unselect: emoji_3,
        emoji_select: emoji3
    },
    {
        status: 'happy',
        emoji_unselect: emoji_4,
        emoji_select: emoji4
    },
    {
        status: 'very happy',
        emoji_unselect: emoji_5,
        emoji_select: emoji5
    }
]

const ListEmoji = ({ status, onChangeStatus }) => {
    return (
        <View style={styles.row}>
            {
                listStatus.map((obj) => (
                    <TouchableOpacity
                        key={obj.status.toString()}
                        activeOpacity={1}
                        onPress={() => onChangeStatus(obj.status)}
                        style={styles.wrapEmoji}
                    >
                        <Image
                            source={status == obj.status ? obj.emoji_select : obj.emoji_unselect}
                            style={styles.emoji}
                        />
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default ListEmoji;
