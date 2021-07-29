import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@components'
import { avatarUser } from '@assets'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { useSelector } from 'react-redux'

const UserInfo = ({ onEdit = () => { } }) => {
    const { staffInfo } = useSelector(state => state.authReducer);
    const avatar = staffInfo.imageUrl ? { uri : staffInfo.imageUrl } : avatarUser;
    
    return (
        <View style={styles.container}>
            <View style={styles.wrapAvatar}>
                <Image
                    source={avatar}
                    style={styles.avatar}
                />
            </View>
            <Text fontFamily='medium' style={styles.userName}>
                {`${staffInfo?.displayName || ''}`}
            </Text>
            <TouchableOpacity
                onPress={onEdit}
                hitSlop={slop}
            >
                <Text style={styles.txtEdit}>Edit profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserInfo;

const styles = StyleSheet.create({
    container: {
        width: scaleWidth(90),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scaleHeight(7),
        marginBottom: scaleHeight(1.5)
    },
    wrapAvatar: {
        backgroundColor: 'white',
        width: scaleWidth(31),
        height: scaleWidth(31),
        borderRadius: scaleWidth(80),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: scaleWidth(29),
        height: scaleWidth(29),
        borderRadius: scaleWidth(80),
    },
    userName: {
        fontSize: scaleWidth(5.5),
        color: '#000000',
        marginVertical: scaleHeight(1.2)
    },
    txtEdit: {
        fontSize: scaleWidth(4),
        color: '#1366AE'
    }
})
