import React from 'react'
import { View , ScrollView} from 'react-native'
import { Text } from '@components'
import { scaleHeight, scaleWidth } from '@utils'
import { Header, Input, InputDescription, InputDuration , ImageUpload } from './widget'
import styles from './styles'

const index = () => {

    const [categoryName, setCategoryName] = React.useState("");
    const [serviceName, setServiceName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [minutes, setMinutes] = React.useState("");
    const [openTime, setOpenTime] = React.useState("");
    const [secondTime, setSecondTime] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [supplyFee, setSupplyFee] = React.useState("");

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={{ padding: scaleWidth(5), paddingTop: scaleHeight(1) }}>
                <Input
                    title='Service name'
                    value={serviceName}
                    onChange={setServiceName}
                    placeholder='Service name'
                />
                <Input
                    title='Category'
                    value={categoryName}
                    onChange={setCategoryName}
                    placeholder='Category name'
                />
                <InputDescription
                    title='Service description'
                    value={description}
                    onChange={setDescription}
                    placeholder='Add a scription'
                />
                <InputDuration
                    value={categoryName}
                    minutes={minutes}
                    setMinutes={setMinutes}
                    openTime={openTime}
                    setOpenTime={setOpenTime}
                    secondTime={setSecondTime}
                    setSecondTime={setSecondTime}
                />
                <Input
                    title='Price'
                    value={price}
                    onChange={setPrice}
                    placeholder='0.00'
                />
                <Input
                    title='Supply fee'
                    value={supplyFee}
                    onChange={setSupplyFee}
                    placeholder='0.00'
                />
            </ScrollView>
        </View>
    )
}

export default index;
