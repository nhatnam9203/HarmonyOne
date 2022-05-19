import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet, TextInput, Text, Animated } from 'react-native'
import { images } from "@shared/themes";

const listStatus = [
    {
        status: 'very bad',
        emoji_unselect: images.emoji_1,
        emoji_select: images.emoji1
    },
    {
        status: 'bad',
        emoji_unselect: images.emoji_2,
        emoji_select: images.emoji2,
    },
    {
        status: 'normal',
        emoji_unselect: images.emoji_3,
        emoji_select: images.emoji3
    },
    {
        status: 'happy',
        emoji_unselect: images.emoji_4,
        emoji_select: images.emoji4
    },
    {
        status: 'very happy',
        emoji_unselect: images.emoji_5,
        emoji_select: images.emoji5
    }
];


export const ListEmoji = React.forwardRef(({ }, ref) => {
    const [status, setStatus] = React.useState('very happy');

    const onChangeValue = text => {
        setValue(text);
    }

    const onChangeStatus = (tempStatus) => {
        setStatus(tempStatus);
    }

    React.useImperativeHandle(ref, () => ({
        getStatus: () => {
            return status;
        }
    }))


    return (
        <View style={styles.row}>
            {
                listStatus.map((obj) => (
                    <ItemEmoji
                        key={obj.status.toString()}
                        onChangeStatus={onChangeStatus}
                        obj={obj}
                        status={status}
                    />
                ))
            }
        </View>
    );
});

const ItemEmoji = ({
    onChangeStatus = () => { },
    obj,
    status
}) => {

    const isActive = status == obj.status ? true : false;
    const animatedValue = React.useRef(new Animated.Value(1)).current;

    const TouchAnimated = Animated.createAnimatedComponent(TouchableOpacity);

    React.useEffect(() => {
        if (isActive) {
            Animated.timing(animatedValue, {
                toValue: 1.3,
                duration: 150
            }).start(() => {
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 150
                }).start();
            });
        };
    }, [isActive]);

    return (
        <TouchAnimated
            key={obj.status.toString()}
            activeOpacity={1}
            onPress={() => onChangeStatus(obj.status)}
            style={[
                styles.wrapEmoji,
                {
                    transform : [{ scale : animatedValue }]
                }
            ]}
        >
            <Image
                source={isActive ? obj.emoji_select : obj.emoji_unselect}
                style={styles.emoji}
            />
        </TouchAnimated>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: scaleHeight(32),
        alignSelf: "center",
        width: scaleWidth(320),
    },
    emoji: {
        width: scaleWidth(45),
        height: scaleWidth(45),
    },
    wrapEmoji: {
        width: scaleWidth(45),
        height: scaleWidth(45),
        borderRadius: 600,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.84,
        elevation: 5,
    },
});
