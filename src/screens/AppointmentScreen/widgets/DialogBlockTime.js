import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, ActivityIndicator, ActivityIndicatorBase, Image, ScrollView } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { IconButton, Button, CustomImage, CustomInput, InputSelectTime, DialogConfirm } from "@shared/components";
import { axios } from '@shared/services/axiosClient';
import { isEmpty } from "lodash";
import { findServiceInAnotherAppointment } from "./helper";
import { useSelector } from "react-redux";
import { useAxiosMutation, addBlockTime, deleteBlockTime, editBlockTime } from "@src/apis";
import Modal from "react-native-modal";
import moment from "moment";


const DialogBlockTime = React.forwardRef(
    ({
        onConfirmYes = () => { },
        onConfirmNo = () => { },
        title = "",
        titleContent = "",
        onModalHide = () => { },
        isCloseButton = true,
    }, ref) => {
        const [t] = useTranslation();

        const [open, setOpen] = React.useState(false);
        const [isVisibleAddBlockTime, setVisibleAddBlockTime] = React.useState(false);
        const [isEdit, setIsEdit] = React.useState(false);
        const [txtReason, setTxtReason] = React.useState("");
        const [staffInfo, setStaffInfo] = React.useState(null);
        const [startTime, setStartTime] = React.useState(moment().format("hh:mm A"));
        const [endTime, setEndTime] = React.useState(moment().add("hours", 1).format("hh:mm A"));
        const [appoointmentCount, setAppointmentCount] = React.useState(0);
        const [isLoading, setLoading] = React.useState(false);
        const [loginTime, setLoginTime] = React.useState(null);
        const [blockedTimes, setBlockedTimes] = React.useState([]);
        const [blockTimeIdDelete, setBlockTimeIdDelete] = React.useState(null);
        const [blockTimeEdit, setBlockTimeEdit] = React.useState(null);

        const refDialogSignout = React.createRef();


        const {
            blockTimes = [],
            appointmentDate,
        } = useSelector(state => state.appointment);

        const nearestFutureMinutes = (interval, someMoment) => {
            const roundedMinutes = Math.ceil(someMoment.minute() / interval) * interval;
            return someMoment.clone().minute(roundedMinutes).second(0);
        }

        const [, submitAddBlockTime] = useAxiosMutation({
            ...addBlockTime(),
            isLoadingDefault: false,
            onSuccess: (data, response) => {
                setTxtReason("");
                getBlockedTime();
            }
        });

        const [, submitEditBlockTime] = useAxiosMutation({
            ...editBlockTime(),
            isLoadingDefault: false,
            onSuccess: (data, response) => {
                getBlockedTime();
            }
        });


        const [, submitDeleteBlockTime] = useAxiosMutation({
            ...deleteBlockTime(),
            isLoadingDefault: false,
            onSuccess: (data, response) => {
                setBlockTimeIdDelete(null);
                getBlockedTime();
            }
        });


        const getStaffLoginTime = async (staffId) => {
            const params = {
                url: `staff/loginTime/${staffId}`,
                method: "GET",
            }
            try {
                const response = await axios(params);
                if (response?.data?.codeNumber == 200) {
                    setLoginTime(response?.data?.data);
                } else {
                    alert(response?.data?.message)
                }
            } catch (err) {

            } finally {
            }
        }

        const getBlockedTime = async () => {
            setLoading(true);
            const params = {
                url: `blockTime?workingDate=${moment(appointmentDate).format("YYYY-MM-DD")}`,
                method: "GET",
            }
            try {
                const response = await axios(params);
                if (response?.data?.codeNumber == 200) {
                    setBlockedTimes(response?.data?.data);
                    setVisibleAddBlockTime(false);
                    getTimeSelect();

                    setBlockTimeEdit(null);
                    setVisibleAddBlockTime(false);
                    setIsEdit(false);
                } else {
                    alert(response?.data?.message)
                }
            } catch (err) {

            } finally {
                setLoading(false);
            }
        }


        const hideModal = () => {
            setOpen(false);
            onModalHide();
            setTimeout(() => {
                setStaffInfo(null);
                setVisibleAddBlockTime(false);
                setAppointmentCount(0);
                setLoginTime(null);
                setTxtReason("");
            }, 300);
        };

        const onHandleNOButtonPress = () => {
            hideModal();
            if (onConfirmNo && typeof onConfirmNo === "function") {
                onConfirmNo();
            }
        };

        const onHandleYESButtonPress = () => {
            hideModal();
            if (onConfirmYes && typeof onConfirmYes === "function") {
                onConfirmYes();
            }
        };

        const getAppointmentCount = (staffId) => {
            let tempAppointments = blockTimes.filter(
                (blockTime) => blockTime?.staffId == staffId,
            );

            let appointmentAnotherStaff = blockTimes.filter(
                (blockTime) => blockTime?.staffId !== staffId,
            );

            appointmentAnotherStaff = findServiceInAnotherAppointment(appointmentAnotherStaff, staffId);

            if (appointmentAnotherStaff?.length > 0) {
                tempAppointments = [
                    ...tempAppointments,
                    ...appointmentAnotherStaff
                ].sort((a, b) => b.appointmentId - a.appointmentId);
            }

            setAppointmentCount(tempAppointments?.length || "0");
        }

        const getTimeSelect = () => {
            const now = moment();
            let nearestFuturemin = nearestFutureMinutes(15, now);
            const start = moment(nearestFuturemin).format("hh:mm A");
            setStartTime(start);
            setEndTime(moment(nearestFuturemin).add('hours', 1).format("hh:mm A"));
        }

        React.useImperativeHandle(ref, () => ({
            hide: () => {
                hideModal();
            },
            show: (staff) => {
                staff && setStaffInfo(staff);
                getBlockedTime();
                getStaffLoginTime(staff?.staffId);
                getAppointmentCount(staff?.staffId);
                getTimeSelect();
                setOpen(true);
                setBlockTimeIdDelete(null);
                setIsEdit(false);
            },
        }));

        const onSubmit = async () => {
            const beginningTime = moment(startTime, 'hh:mm A');
            const endingTime = moment(endTime, 'hh:mm A');

            if (endingTime.isSameOrBefore(beginningTime)) {
                Alert.alert('End time must be after Start time');
            } else {
                if (isEdit) {
                    const data = {
                        blockTimeEnd: endTime,
                        blockTimeStart: startTime,
                        note: txtReason,
                        staffId: blockTimeEdit?.staffId,
                        workingDate: moment(blockTimeEdit?.workingDate).format("YYYY-MM-DD"),
                    }

                    const body = await editBlockTime(blockTimeEdit?.blockTimeId, data);
                    submitEditBlockTime(body.params);
                    setLoading(true);
                } else {
                    const data = {
                        blockTimeEnd: endTime,
                        blockTimeStart: startTime,
                        note: txtReason,
                        staffId: staffInfo?.staffId,
                        workingDate: moment(appointmentDate).format("YYYY-MM-DD"),
                    }
                    const body = await addBlockTime(data);

                    submitAddBlockTime(body.params);
                    setLoading(true);
                }
            }
        }

        const actionDeleteBlockTime = async () => {
            const body = await deleteBlockTime(blockTimeIdDelete);
            submitDeleteBlockTime(body.params);
            setLoading(true);
        }


        const onPressEditBlockTime = (block) => {
            setBlockTimeEdit(block);
            setStartTime(block?.blockTimeStart);
            setEndTime(block?.blockTimeEnd);
            setTxtReason(block?.note);
            setVisibleAddBlockTime(true);
            setIsEdit(true);
        }

        return (
            <Modal
                style={styles.modal}
                isVisible={open}
                onRequestClose={hideModal}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                backdropColor={!blockTimeIdDelete ? 'rgba(0,0,0,0.2)' : "transparent"}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
                {
                    !blockTimeIdDelete &&
                    <View style={styles.container}>
                        {
                            isLoading && <View style={styles.containerLoading}>
                                <ActivityIndicator size="large" color={colors.ocean_blue} />
                            </View>
                        }
                        {
                            isCloseButton && <IconButton
                                icon={images.iconClose}
                                style={styles.buttonClose}
                                iconStyle={styles.iconButtonClose}
                                onPress={hideModal}
                            />
                        }
                        <View style={{ flexDirection: "row" }}>
                            <CustomImage
                                source={{ uri: staffInfo?.imageUrl }}
                                style={styles.avatarStaff}
                                resizeMode='cover'
                            />
                            <View style={styles.infoStaff}>
                                <Text style={styles.staffName}>
                                    {staffInfo?.displayName}
                                </Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: scaleWidth(260) }}>
                                    <Text style={styles.txtLogin}>
                                        {isEmpty(loginTime) ? `Still not login` : loginTime}
                                    </Text>

                                    <Text style={styles.txtLogin}>
                                        {`Appointments : `}
                                        <Text style={{ color: "#000", fontFamily: fonts.BOLD }}>
                                            {appoointmentCount}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginVertical: scaleHeight(20) }}>
                            {
                                !isVisibleAddBlockTime ?
                                    <>
                                        <IconButton
                                            icon={images.clock}
                                            style={styles.buttonClock}
                                            iconStyle={styles.iconClock}
                                            onPress={() => setVisibleAddBlockTime(true)}
                                            renderText={() => <Text style={styles.txtAddBlockedTime}>Add Blocked Time</Text>}
                                        />
                                        <ScrollView
                                            showsVerticalScrollIndicator={false}
                                            style={{ overflow: "hidden", maxHeight: scaleHeight(350) }}
                                        >
                                            {
                                                blockedTimes
                                                    .filter(b => b?.staffId == staffInfo?.staffId && b?.appointmentId == 0)
                                                    .map(block => (
                                                        <ItemBlockTime
                                                            key={"blockTimeId" + block?.blockTimeId}
                                                            block={block}
                                                            onPressEditBlockTime={onPressEditBlockTime}
                                                            onPressDelete={() => {
                                                                setBlockTimeIdDelete(block?.blockTimeId);
                                                                refDialogSignout?.current?.show()
                                                            }}
                                                        />
                                                    ))
                                            }
                                        </ScrollView>
                                    </>
                                    :
                                    <>
                                        <Text style={[styles.txtAddBlockedTime, { color: colors.ocean_blue, fontFamily: fonts.BOLD, marginLeft: 0 }]}>
                                            Add Blocked Time
                                        </Text>

                                        <View style={styles.rowReason}>
                                            <Text style={styles.txt}>Time</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <InputSelectTime
                                                    apply={(time) => {
                                                        setStartTime(time);
                                                    }}
                                                    time={startTime}
                                                    renderInput={() => (
                                                        <TempInput title={startTime} />
                                                    )}
                                                    minutesPicker={['00', '15', '30', '45']}
                                                />
                                                <InputSelectTime
                                                    apply={(time) => {
                                                        setEndTime(time);
                                                    }}
                                                    time={endTime}
                                                    renderInput={() => (
                                                        <TempInput title={endTime} />
                                                    )}
                                                    title={'End time'}
                                                    minutesPicker={['00', '15', '30', '45']}
                                                />
                                            </View>
                                        </View>

                                        <View style={styles.rowReason}>
                                            <Text style={styles.txt}>Reason</Text>
                                            <View style={styles.containerNote}>
                                                <TextInput
                                                    multiline={true}
                                                    textAlignVertical='top'
                                                    value={txtReason}
                                                    onChangeText={text => {
                                                        setTxtReason(text);
                                                    }}
                                                    style={styles.inputReason}
                                                />
                                            </View>
                                        </View>

                                        <Button
                                            onPress={onSubmit}
                                            highlight={true}
                                            height={scaleHeight(43)}
                                            width={scaleWidth(120)}
                                            label={isEdit ? "Edit" : "Submit"}
                                            styleButton={{
                                                borderWidth: 0,
                                                marginTop: scaleHeight(24),
                                                alignSelf: "center"
                                            }}
                                        />
                                    </>
                            }
                        </View>
                    </View>
                }

                <DialogConfirm
                    ref={refDialogSignout}
                    title={"Warning !"}
                    titleContent={
                        "Do you want to Cancel this Blocked Time?"
                    }
                    onConfirmYes={actionDeleteBlockTime}
                    onModalHide={() => { setBlockTimeIdDelete(null); }}
                />
            </Modal>
        );
    }
);

export default DialogBlockTime;

const ItemBlockTime = ({ onPressEditBlockTime, block, onPressDelete }) => (
    <TouchableOpacity
        key={"blockTimeId" + block?.blockTimeId}
        onPress={() => onPressEditBlockTime(block)}
        activeOpacity={1}
        style={styles.itemBlockTime}
    >

        <Image
            source={images.clock_2}
            style={{ width: scaleWidth(17), height: scaleWidth(17) }}
        />

        <View style={{ flexDirection: "row", marginLeft: scaleWidth(8) }}>
            <View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.txtDateTime}>
                        {moment(block?.workingDate).format("MM/DD/YYYY")}
                    </Text>
                    <Text style={styles.txtBlockTime}>
                        {`${block?.blockTimeStart} - ${block?.blockTimeEnd}`}
                    </Text>
                </View>

                <Text style={styles.txtBlockNote}>{block?.note}</Text>
            </View>
        </View>

        <View style={styles.btnDeleteBlockTime}>
            <TouchableOpacity onPress={onPressDelete}>
                <Image
                    source={images.delete}
                    style={styles.iconDelete}
                />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
);

const TempInput = ({ title }) => {
    return (
        <View style={[styles.inputSelectTime, { marginLeft: scaleWidth(16) }]}>
            <Text style={styles.txtTime}>
                {title}
            </Text>
            <CustomImage
                source={images.dropdown}
                style={styles.iconTimeSelect}
                resizeMode='contain'
            />
        </View>
    )
}

const styles = StyleSheet.create({


    inputReason : {
        flex: 1, fontSize: scaleFont(14), fontFamily: fonts.REGULAR 
    },

    iconDelete: {
        width: scaleWidth(17),
        height: scaleWidth(17),
        zIndex: 99999999
    },

    btnDeleteBlockTime: {
        position: "absolute",
        right: scaleWidth(12),
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },

    itemBlockTime: {
        borderWidth: 1,
        borderColor: "#dddddd",
        padding: scaleWidth(12),
        marginTop: scaleHeight(12),
        flexDirection: "row",
        position: "relative",
    },

    txtBlockNote: {
        fontSize: scaleFont(13),
        color: "#000",
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(12)
    },

    txtDateTime: {
        fontSize: scaleFont(14),
        color: "#404040",
        fontFamily: fonts.REGULAR
    },

    txtBlockTime: {
        fontSize: scaleFont(14),
        color: "#000",
        fontFamily: fonts.BOLD,
        marginLeft: scaleWidth(16)
    },

    containerLoading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.5)",
        zIndex: 99999999
    },
    iconTimeSelect: {
        width: scaleWidth(12),
        height: scaleWidth(12),
        tintColor: "#404040"
    },
    txtTime: {
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR,
        color: "#000"
    },
    inputSelectTime: {
        width: scaleWidth(105),
        height: scaleHeight(40),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#cccccc",
        paddingHorizontal: scaleWidth(8)
    },
    rowReason: {
        flexDirection: "row",
        marginTop: scaleHeight(20),
        justifyContent: "space-between"
    },
    containerNote: {
        width: scaleWidth(227),
        minHeight: scaleHeight(120),
        borderWidth: 1,
        borderColor: "#dddddd",
        padding: scaleWidth(8),
        backgroundColor: "#FAFAFA",
        overflow: "hidden"
    },
    txt: {
        fontSize: scaleFont(15),
        fontFamily: fonts.MEDIUM,
        color: "#000",
        width: scaleWidth(80),
    },
    txtAddBlockedTime: {
        fontSize: scaleFont(15),
        fontFamily: fonts.MEDIUM,
        color: "#404040",
        marginLeft: scaleWidth(8)
    },
    buttonClock: {
        backgroundColor: "#F2F2F2",
        padding: scaleWidth(12),
        alignSelf: "flex-start",
        borderRadius: 3
    },
    iconClock: {
        width: scaleWidth(23),
        height: scaleHeight(23),
    },
    infoStaff: {
        marginLeft: scaleWidth(16),
        height: scaleWidth(50),
        justifyContent: "space-between"
    },
    txtLogin: {
        fontSize: scaleFont(15),
        fontFamily: fonts.MEDIUM,
        color: "#404040",
    },
    staffName: {
        fontSize: scaleFont(17),
        fontFamily: fonts.BOLD,
        color: colors.ocean_blue,
    },
    avatarStaff: {
        width: scaleWidth(50),
        height: scaleWidth(50),
        resizeMode: "contain",
        borderRadius: 3000
    },
    container: {
        backgroundColor: "#fff",
        alignSelf: "center",
        paddingHorizontal: scaleWidth(16),
        width: scaleWidth(360),
        paddingTop: scaleWidth(20),
        borderRadius: scaleHeight(5),
        shadowColor: "#004080bf",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        position: 'relative',
    },


    modal: {
        margin: 0,
        padding: 0
    },

    txtTitle: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(19),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        marginHorizontal: scaleWidth(16),
        color: colors.WHITE,
    },

    buttonClose: {
        width: scaleWidth(28),
        height: scaleHeight(28),
        borderRadius: scaleWidth(14),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#575757",
        marginRight: scaleWidth(10),
        position: 'absolute',
        right: scaleWidth(2),
        top: scaleWidth(12),
        zIndex: 9999
    },

    iconButtonClose: {
        width: scaleWidth(28),
        height: scaleHeight(28),
        tintColor: "white",
    },

    titleContent: {
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(20),
        fontSize: scaleFont(15),
        marginHorizontal: scaleWidth(16),
        letterSpacing: 0,
        textAlign: "center",
    },

    bottomStyle: {
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        marginTop: scaleHeight(20)
    },
    line: {
        height: scaleHeight(48),
        width: scaleWidth(2),
        backgroundColor: "#dddddd"
    }
});
