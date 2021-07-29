import React from 'react'
import { View, SectionList } from 'react-native'
import { Text } from '@components'
import { scaleHeight, scaleWidth } from '@utils'
import { Header, SearchBar, ItemService } from './widget'
import styles from './styles'

const DATA = [
    {
        title: "Manicure",
        data: [
            {
                serviceName: 'Delux Spa Menicure',
                duration: 25,
                price: 28.00,
                serviceId: 1,

            },
            {
                serviceName: 'Delux Spa Menicure',
                duration: 25,
                price: 28.00,
                serviceId: 2,
            }
        ],
    },
    {
        title: "Pedicure",
        data: [
            {
                serviceName: 'Delux Spa Menicure',
                duration: 25,
                price: 28.00,
                serviceId: 3,

            },
            {
                serviceName: 'Delux Spa Menicure',
                duration: 25,
                price: 28.00,
                serviceId: 4,
            }
        ],
    },
];

const index = () => {

    const [valueSearch, setValueSearch] = React.useState("");

    const onChangeSearch = (searchText) => {
        setValueSearch(searchText);
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ padding: scaleWidth(5) }}>
                <SearchBar
                    valueSearch={valueSearch}
                    onChangeSearch={onChangeSearch}
                />
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item.serviceId.toString()}
                    stickySectionHeadersEnabled={false}
                    renderItem={({ item }) => <ItemService item={item} />}
                    renderSectionHeader={({ section }) => (
                        <Text
                            color='#404040'
                            fontSize={scaleWidth(5.2)}
                            fontFamily='bold'
                            style={{ marginVertical : scaleHeight(2) }}
                        >
                            {section.title}
                        </Text>
                    )}
                />
            </View>
        </View>
    )
}

export default index;
