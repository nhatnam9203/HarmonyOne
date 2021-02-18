import React from 'react'
import { Modalize } from 'react-native-modalize'

const Modal = ({ close, children, refModal }) => {
    return (
        <Modalize
            handleStyle={{
                opacity: 0
            }}
            overlayStyle={{
                backgroundColor: 'rgba(0,0,0,0.4)'
            }}
            modalStyle={{
                backgroundColor: 'transparent'
            }}
            adjustToContentHeight
            onBackButtonPress={close}
            ref={refModal}
        >
            {children}
        </Modalize>
    )
};

export default Modal;