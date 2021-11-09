import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFormDataMulipleImage, createFormData } from "@shared/utils";
import { useAxiosMutation, uploadAvatarStaff, addBannerMerchant } from "@src/apis";
import { guid } from "@shared/utils";

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const [fileId, setFileId] = React.useState("0");
  const [imageUrl, setImageUrl] = React.useState("");
  const [tempImagesUpload, setTempImageUpload] = React.useState([]);

  const [banners, setBanners] = React.useState([]);

  const {
    merchant: { merchantDetail = {} }
  } = useSelector(state => state);


  const [, submitUploadCamera] = useAxiosMutation({
    ...uploadAvatarStaff(),
    queryId: "uploadBanner_camera",
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        setFileId(data?.fileId ?? 0);
        setImageUrl(data?.url);
      }
    },
  });

  const [, submitUploadImagePicker] = useAxiosMutation({
    ...uploadAvatarStaff(),
    queryId: "uploadBanner_imagePicker",
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        let temptFileUpload = [...tempImagesUpload];
        setBanners([
          ...banners,
          {
            createdDate: "",
            description: "",
            fileId: data?.fileId,
            imageUrl: data?.url,
            isDisabled: 0,
            merchantBannerId: guid(),
            merchantId: 0,
            title: "",
          }
        ]);
        temptFileUpload.shift();
        setTempImageUpload(temptFileUpload);
      }
    },
  });

  React.useEffect(() => {
    if (merchantDetail?.banners && merchantDetail?.banners?.length > 0) {
      setBanners(merchantDetail?.banners)
    }
  }, []);

  React.useEffect(() => {
    if (tempImagesUpload.length > 0) {
      uploadImagePicker();
    }
  }, [tempImagesUpload]);

  const uploadImagePicker = async () => {
    let tempFiles = [];
    tempFiles.push(tempImagesUpload[0]);
    let files = createFormDataMulipleImage(tempFiles);
    const body = await uploadAvatarStaff(files);
    submitUploadImagePicker(body.params);
  }

  return {
    merchantDetail,
    banners,

    onResponseImagePicker: (responses) => {
      if (responses && responses?.length > 0) {
        setTempImageUpload(responses);
      }
    },

    onResponseCamera: async (response) => {
      let files = response?.assets ?? [];
      files = createFormData(files);
      const body = await uploadAvatarStaff(files);
      submitUploadAvatarStaff(body.params);
    },

    onSave: () => {

    }
  };
};
