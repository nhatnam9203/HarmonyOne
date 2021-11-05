import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import { getTitleSendLinkGoogle } from "@shared/utils";
import { forEach } from 'ramda';
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button } from "./Button";
import Modal from "react-native-modal";
import {
    useAxiosMutation,
    sendGoogleReviewLink,
  } from '@src/apis';

export const PopupPayCompleted = React.forwardRef(
    ({
        onConfirmYes = () => { },
        onConfirmNo = () => { },
        onModalHide = () => { },
        profile, 
        groupAppointment,
    }, ref) => {
        const [t] = useTranslation();

        const [open, setOpen] = React.useState(false);
        const [isSendLink, setIsSendLink] = React.useState(false);

        const [, submitSendLinkReview] = useAxiosMutation({
            ...sendGoogleReviewLink(),
            isLoading: false,
            onSuccess: async (data, response) => {
              
            }
          });

        const hideModal = () => {
            setOpen(false);
            onModalHide();
        };

        const onHandleYESButtonPress = () => {
            handleSendGoogleLinkReview();
            hideModal();
            if (onConfirmYes && typeof onConfirmYes === "function") {
                onConfirmYes();
                hideModal();
            }
        };

        const onHandleNoButtonPress = () => {
            handleSendGoogleLinkReview();
            hideModal();
            if (onConfirmNo && typeof onConfirmNo === "function") {
                onConfirmNo();
                hideModal();
            }
        }

        const switchSendLink = () => {
            setIsSendLink(!isSendLink)
        }
    
        const handleSendGoogleLinkReview = async () => {
            if (isSendLink) {
                let customerIdList = new Set();
                const appointments = groupAppointment?.appointments || [];
                for (let i = 0; i < appointments.length; i++) {
                    customerIdList.add(appointments[i]?.customerId);
                }
                const customerIdListNeedToSendLink = [...customerIdList];
                const merchantId = profile?.merchantId || 0;
                customerIdListNeedToSendLink.forEach((customerId) => {
                    const body = sendGoogleReviewLink(groupAppointments?.checkoutGroupId, data);
                    submitSelectPaymentMethod(body.params);
                });
                
                setIsSendLink(false)
            }
        }

        React.useImperativeHandle(ref, () => ({
            show: () => {
                setOpen(true);
            },
            hide : () =>{
                setOpen(false);
            }
        }));

        return (
            <Modal
                style={styles.modal}
                isVisible={open}
                onRequestClose={hideModal}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                animationIn="fadeInRight"
                animationOut="fadeOutRight"
                backdropColor={'rgba(64,64,64,0.5)'}
            >
                <View style={{
                    width: scaleWidth(450), height: scaleHeight(230), backgroundColor: "#fff",
                    borderRadius: scaleWidth(16)
                }} >
                    <View style={{ flex: 1 }} >
                        {/* ---------- header ------ */}
                        <View style={{
                            alignItems: 'center', paddingTop: scaleHeight(16), paddingBottom: scaleHeight(12),
                        }} >
                            <Text style={{ color: '#0764B0', fontSize: scaleFont(28), fontWeight: 'bold' }}  >
                                {`Transaction completed!`}
                            </Text>
                        </View>
                        {/* ------------ content ----- */}
                        <View style={{
                            alignItems: 'center'
                        }} >
                            <Text style={{ color: '#404040', fontSize: scaleFont(20) }}  >
                                {`Do you want to print receipt?`}
                            </Text>
                        </View>

                        {/* ------------ Check box ----- */}
                        {
                            profile.sendReviewLinkOption === "manual" ?
                                <View style={{
                                    flex: 1, flexDirection: "row",
                                    justifyContent: "center", alignItems: "center"
                                }} >
                                    <Button onPress={switchSendLink} style={{ justifyContent: "center" }} >
                                        <Image source={checkIcon} />
                                    </Button>
                                    <Text style={styles.content}  >
                                        {`Send Google Review Link`}
                                    </Text>
                                </View> :
                                <View style={{
                                    flex: 1,
                                    justifyContent: "center", alignItems: "center"
                                }} >
                                    <Text style={styles.content}  >
                                        {`You Are Choosing ${getTitleSendLinkGoogle(profile.sendReviewLinkOption)} Send Google Review Link`}
                                    </Text>
                                </View>
                        }

                    </View>


                    <View style={styles.bottomView} >
                        <Button
                            width={scaleWidth(100)}
                            height={scaleHeight(40)}
                            backgroundColor="#0764B0"
                            title="Yes"
                            textColor="#fff"
                            onPress={onHandleYESButtonPress}
                            style={{ borderWidth: 1, borderColor: '#C5C5C5' }}
                            styleText={{ fontSize: scaleFont(18), fontWeight: 'normal' }}
                        />

                        <Button
                            width={scaleWidth(100)}
                            height={scaleHeight(40)}
                            backgroundColor="#F1F1F1"
                            title="No"
                            textColor="#6A6A6A"
                            onPress={onHandleNoButtonPress}
                            style={{ borderWidth: 1, borderColor: '#C5C5C5' }}
                            styleText={{ fontSize: scaleFont(18), fontWeight: 'normal' }}
                        />
                    </View>

                </View>

            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
        width: scaleWidth(340),
        paddingTop: scaleWidth(20),
        borderRadius: scaleHeight(5),
        position: 'relative',
    },

    modal: {
        margin: 0,
    },

    title: { 
        color: '#0764B0', 
        fontSize: scaleFont(18), 
        fontWeight: 'bold' 
    },
    content: { 
        color: 'rgb(130,130,130)', 
        fontSize: scaleFont(16), 
        marginLeft: scaleWidth(12) }
    ,
    bottomView: {
        height: scaleHeight(75), 
        flexDirection: 'row', 
        paddingHorizontal: scaleWidth(70),
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderTopWidth: 1, 
        borderTopColor: "rgb(212,211,211)"
    }

});


