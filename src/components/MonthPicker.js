import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Text from './Text'
import { scaleWidth, scaleHeight } from '@utils'
import { rightButton, leftButton } from '@assets'
import moment from 'moment'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthPicker = ({ cancel = () => { }, applyDate , date }) => {

    const [year, setYear] = React.useState(moment().clone().year());
    const [monthSelected, setMonth] = React.useState(moment().clone().format('MMM'));

    React.useEffect(()=>{
        setYear(moment(date).format('YYYY'));
        setMonth(moment(date).format('MMM'));
    },[date]);

    const addYear = () => {
        let yearClone = moment(year, ['YYYY']).add('years', 1).format('YYYY');
        setYear(yearClone);
    }

    const subtractYear = () => {
        let yearClone = moment(year, ['YYYY']).subtract('years', 1).format('YYYY');
        setYear(yearClone);
    }

    const selectMonth = React.useCallback((month) => {
        setMonth(month)
    }, [monthSelected]);

    const apply = () => {
        let date = `${monthSelected} ${year}`
        applyDate(moment(date,['MMMM YYYY']));
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ButtonHeader icon={leftButton} onPress={subtractYear} />
                <Text style={styles.txtHeader}>{year}</Text>
                <ButtonHeader icon={rightButton} onPress={addYear} />
            </View>

            <View style={styles.body}>
                <ListMonth
                    monthSelected={monthSelected}
                    selectMonth={selectMonth}
                />
                <BottomButton cancel={cancel} apply={apply} />
            </View>
        </View>
    )
}

const BottomButton = ({ cancel, apply }) => (
    <View style={styles.row}>
        <TouchableOpacity
            onPress={cancel}
            style={[styles.buttonBottom, { borderRightWidth: 1, borderRightColor: '#dddddd' }]}
        >
            <Text
                fontFamily='medium'
                style={styles.txtButton}
            >Cancel
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={apply}
            style={styles.buttonBottom}
        >
            <Text
                fontFamily='bold'
                style={[styles.txtButton, { color: '#1366AE' }]}
            >
                Apply
            </Text>
        </TouchableOpacity>
    </View>
)

const ListMonth = React.memo(({ monthSelected, selectMonth }) => {
    return months.map((m) => {
        const isActive = m == monthSelected ? true : false;
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => selectMonth(m)}
                style={styles.button(isActive)}
                key={m.toString()}
            >
                <Text
                    fontFamily='regular'
                    style={styles.txtButton(isActive)}
                >
                    {m}
                </Text>
            </TouchableOpacity>
        )
    });
});

const ButtonHeader = ({ icon, onPress }) => {
    return (
        <TouchableOpacity
            hitSlop={slop}
            onPress={onPress}
            style={styles.buttonHeader}
        >
            <Image source={icon} resizeMode='contain' style={styles.iconHeader} />
        </TouchableOpacity>
    )
}

export default MonthPicker;

const slop = {
    top: 35,
    left: 35,
    bottom: 35,
    right: 35
}
const styles = StyleSheet.create({
    container: {
        width: scaleWidth(100),
        backgroundColor: 'white',
    },
    header: {
        width: scaleWidth(100),
        padding: scaleWidth(4),
        paddingHorizontal: scaleWidth(5),
        backgroundColor: '#1366AE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtHeader: {
        textAlign: 'center',
        color: 'white',
        fontSize: scaleWidth(5)
    },
    body: {
        padding: scaleWidth(3),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: isActive => {
        return {
            width: scaleWidth(94 / 4) - 1,
            height: scaleWidth(94 / 4) - scaleWidth(5),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isActive ? '#28AAE9' : '#FAFAFA',
            marginBottom: 1
        }
    },
    txtButton: isActive => {
        return {
            fontSize: scaleWidth(4.5),
            color: isActive ? 'white' : '#404040',
        }
    },
    row: {
        flexDirection: 'row',
        width: scaleWidth(94),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        marginTop: scaleWidth(3)
    },
    buttonBottom: {
        width: scaleWidth(47.5),
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleHeight(5.5)
    },
    iconHeader: {
        width: scaleWidth(4),
        height: scaleWidth(4),
        tintColor: 'white',
    }
})