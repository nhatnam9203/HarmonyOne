
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, ActivityIndicator, FlatList, Platform, Animated } from 'react-native';
import { images, colors, fonts } from '@shared/themes';
import { IconButton, CustomImage } from "@shared/components";
import { isElement, isEmpty } from "lodash";
import { guid } from "@shared/utils";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const StaffList = React.forwardRef(({
    staffsByDate,
    staffSelected,
    selectStaff = () => { },
    isLoading,
    showPopupAddBlockTime,
    getWaitingList
}, ref) => {

    const scrollViewStaffs = React.useRef();

    let staffShowVisibile = [
        {
            staffId: -1,
            displayName: "Waiting",
        },
        {
            staffId: 0,
            displayName: "Any staff",
        },
        ...staffsByDate,
    ]

    React.useImperativeHandle(ref, () => ({
        scrollToIndex: (index) => {
            if (index) {
                setTimeout(() => {
                    scrollViewStaffs?.current?.scrollToIndex({ index, animated: true });
                }, 700);
            }
        }
    }));

    if (staffsByDate?.length === 0) {
        return <View style={[styles.container, { width: "100%", height: scaleWidth(61) }]} />
    }
    return (
        <View style={styles.container}>

            {
                isLoading ?
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            new Array(5).fill().map(() => (
                                <SkeletonPlaceholder key={guid()}>
                                    <SkeletonPlaceholder.Item marginLeft={20}>
                                        <SkeletonPlaceholder.Item
                                            width={scaleWidth(48)}
                                            height={scaleWidth(48)}
                                            borderRadius={300}
                                        />
                                        <SkeletonPlaceholder.Item
                                            width={scaleWidth(48)}
                                            height={scaleWidth(9)}
                                            marginTop={8}
                                        />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder>
                            ))
                        }
                    </ScrollView> :
                    (staffsByDate && staffsByDate?.length > 0) &&
                    <FlatList
                        data={staffShowVisibile}
                        keyExtractor={(item) => item?.staffId + "staffList"}
                        renderItem={({ item }) =>
                            <Item
                                staff={item}
                                selectStaff={selectStaff}
                                staffSelected={staffSelected}
                                showPopupAddBlockTime={() => showPopupAddBlockTime(item)}
                                getWaitingList={getWaitingList}
                            />
                        }
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ref={scrollViewStaffs}
                        initialScrollIndex={0}
                        onScrollToIndexFailed={info => {
                            const wait = new Promise(resolve => setTimeout(resolve, 500));
                            wait.then(() => {
                                scrollViewStaffs.current?.scrollToIndex({ index: 0, animated: true });
                            });
                        }}
                    />
            }

        </View>
    );
});


const Item = ({ staff, selectStaff, staffSelected, showPopupAddBlockTime, getWaitingList }) => {

    const isActive = staffSelected == staff?.staffId ? true : false;

    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const scaleActive = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {

        const animationValue = () => {
            Animated.loop(
                Animated.sequence(
                    [
                        Animated.timing(animatedValue, {
                            toValue: 1,
                            duration: 1500,
                            useNativeDriver: false
                        }),
                    ]
                )
            ).start();
            Animated.loop(
                Animated.sequence(
                    [
                        Animated.timing(scaleActive, {
                            toValue: 1.075,
                            duration: 1500,
                            useNativeDriver: false
                        }),
                        Animated.timing(scaleActive, {
                            toValue: 1,
                            duration: 1500,
                            useNativeDriver: false
                        }),
                    ]
                )
            ).start();
        };

        if (isActive) {
            animationValue();
        } else {
            Animated.timing(animatedValue).stop();
            Animated.timing(scaleActive).stop();
        }

    }, [isActive]);

    const renderHighlight = () => {

        const opacity = animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.5, 0]
        });

        const scale = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.175]
        });


        return (
            <>
                <Animated.View style={[
                    styles.highligh,
                    {
                        opacity,
                        transform: [{ scale }]
                    }
                ]} />
                <View style={styles.highligh} />
            </>
        );
    };


    return (
        <TouchableOpacity
            onPress={() => {
                selectStaff(staff?.staffId);
                if (staff?.staffId == -1) {
                    getWaitingList();
                }
            }}
            onLongPress={() => {
                selectStaff(staff?.staffId);
                if (staff?.staffId && staff?.staffId !== -1) {
                    showPopupAddBlockTime();
                }
            }}
            key={staff?.staffId + 'staffList'}
            style={styles.staff}
            activeOpacity={1}
        >
            {
                staff?.staffId == 0 ?
                    <AnimatedWrapper isActive={isActive} renderHighlight={renderHighlight} scaleActive={scaleActive}>
                        <CustomImage
                            style={[
                                styles.avatar,
                                {
                                    borderColor: "white",
                                    borderWidth: 1,
                                    borderRadius: 0,
                                    tintColor: "#0094D9"
                                }

                            ]}
                            source={images.group_people}
                            resizeMode='cover'
                            tintColor="#0094D9"
                        />
                    </AnimatedWrapper>
                    :
                    staff?.staffId == -1 ?
                        <AnimatedWrapper isActive={isActive} renderHighlight={renderHighlight} scaleActive={scaleActive}>
                            <CustomImage
                                style={[
                                    styles.avatar,
                                    {
                                        borderColor: "white",
                                        borderWidth: 1,
                                        borderRadius: 0,
                                        tintColor: "#0094D9"
                                    }

                                ]}
                                source={images.iconWaiting}
                                resizeMode='cover'
                                tintColor="#0094D9"
                            />
                        </AnimatedWrapper>
                        : isEmpty(staff?.imageUrl) ?
                            <AnimatedWrapper isActive={isActive} renderHighlight={renderHighlight} scaleActive={scaleActive}>
                                <CustomImage
                                    style={styles.avatar}
                                    source={images.staff_default}
                                    resizeMode='cover'
                                />
                            </AnimatedWrapper>
                            :
                            <AnimatedWrapper isActive={isActive} renderHighlight={renderHighlight} scaleActive={scaleActive}>
                                <CustomImage
                                    style={styles.avatar}
                                    source={{ uri: staff?.imageUrl }}
                                    resizeMode='cover'
                                />
                            </AnimatedWrapper>
            }
            <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[styles.staffName, {
                    fontFamily: isActive ? fonts.BOLD : fonts.MEDIUM,
                    color: isActive ? colors.ocean_blue : "#404040",
                }]}>
                {staff?.displayName}
            </Text>
        </TouchableOpacity>
    );
}

const AnimatedWrapper = ({ children, scaleActive, isActive, renderHighlight = () => { } }) => {
    return (
        <View style={{
            position: "relative",
            padding: 5,
            borderRadius: 300,
        }}>
            <Animated.View
                style={{
                    transform: [{ scale: scaleActive }]
                }}
            >
                {children}
            </Animated.View>
            {isActive && renderHighlight()}
        </View>
    );
}


export default StaffList;

const styles = StyleSheet.create({
    container: {
        padding: scaleWidth(16),
        backgroundColor: "white",
        shadowColor: Platform.OS == "ios" ? '#0000000D' : "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        elevation: 1,
    },
    content: {
        flex: 1,
    },
    icon: {
        width: scaleWidth(20),
        height: scaleWidth(20),
        tintColor: "#7B99BA"
    },
    button: {
        height: '100%',
        alignItems: 'center'
    },
    avatar: {
        width: scaleWidth(45),
        height: scaleWidth(45),
        borderRadius: 1000,
        tintColor: "red",
        zIndex: 99
    },
    staffName: {
        fontSize: scaleFont(13),
        fontFamily: fonts.MEDIUM,
        marginTop: 5,
    },
    staff: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: scaleWidth((375 - 32) / 5),
        position: "relative"
    },
    highligh: {
        position: "absolute",
        borderWidth: 1,
        borderColor: "#2B62AB",
        width: scaleWidth(53),
        height: scaleWidth(53),
        borderRadius: 3000,
    }
});
