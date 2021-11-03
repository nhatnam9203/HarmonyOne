import React from "react";
import { useDispatch } from "react-redux";
import { sendFeedback, useAxiosMutation } from "@src/apis";
import NavigationService from "@navigation/NavigationService";
import { Alert } from "react-native";

export const useProps = (_params) => {

  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');
  const listEmojiRef = React.useRef();

  const [,submitSendFeedback] = useAxiosMutation({
    ...sendFeedback(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        NavigationService.back();
      }else{
        Alert.alert(response?.message);
      }
    }
  })

  return {
    listEmojiRef,
    value,
    onChange: (text) => {
      setValue(text);
    },

    onSubmit: async() => {
      const body = {
        'comment': value,
        'vote': listEmojiRef?.current?.getStatus()
      };

      const data = await sendFeedback(body);
      submitSendFeedback(data.params);

    }

  };
};
