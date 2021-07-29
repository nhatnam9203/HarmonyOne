import React from 'react'
import { View, ScrollView } from 'react-native'
import { scaleHeight, scaleWidth } from '@utils'
import { Header, ListEmoji, Input, ButtonSubmit } from './widget'
import { Text } from '@components'
import styles from './styles'

const index = () => {

    const [value,setValue] = React.useState('');
    const [status,setStatus] = React.useState('very happy');

    const onChangeValue = text =>{
        setValue(text);
    }

    const onChangeStatus = (tempStatus) =>{
        setStatus(tempStatus);
    }

    const onSubmit = () =>{

    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.body}>
                <Text fontFamily='regular' style={styles.title}>
                    Share your feedback
                </Text>
                <Text fontFamily='regular' style={styles.content}>
                    How satisfied are you with this app?
                </Text>
                <ListEmoji status={status} onChangeStatus={onChangeStatus} />
                <Input value={value} onChange={onChangeValue} />
                <ButtonSubmit onPress={onSubmit} />
            </View>
        </View>
    )
}

export default index;
