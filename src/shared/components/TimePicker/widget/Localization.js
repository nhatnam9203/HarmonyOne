import React from 'react'
import { View, StyleSheet, TouchableOpacity , Text} from 'react-native'
import { scaleWidth, scaleHeight } from '@utils'
import styles from '../styles'

const Localization = ({ localization, selectLocalization }) => {
    return (
        <View style={[styles.row, { marginLeft: scaleWidth(3) }]}>
            <TouchableOpacity
                onPress={() => selectLocalization('AM')}
                style={[styles.btnAM, {
                    backgroundColor: localization == 'AM' ? '#28AAE9' : 'transparent'
                }]}
            >
                <Text
                    fontFamily='medium'
                    style={[styles.txtLocalization, {
                        color: localization == 'AM' ? 'white' : '#000000'
                    }]}
                >
                    AM
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => selectLocalization('PM')}
                style={[styles.btnAM, {
                    marginLeft: scaleWidth(1),
                    backgroundColor: localization == 'PM' ? '#28AAE9' : 'transparent'
                }]}
            >
                <Text
                    fontFamily='medium'
                    style={[styles.txtLocalization, {
                        color: localization == 'PM' ? 'white' : '#000000'
                    }]}
                >
                    PM
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Localization;
