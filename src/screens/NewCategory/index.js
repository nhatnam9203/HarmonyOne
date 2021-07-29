import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { scaleHeight, scaleWidth } from '@utils'
import { Header, Input } from './widget'
import styles from './styles'

const index = () => {

    const [categoryName, setCategoryName] = React.useState("");

    const onChangeCategoryName = (text) => {
        setCategoryName(text);
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ padding: scaleWidth(5) }}>
                <Input
                    title='Category name'
                    value={categoryName}
                    onChange={onChangeCategoryName}
                    placeholder='Category name'
                />
            </View>
        </View>
    )
}

export default index;
