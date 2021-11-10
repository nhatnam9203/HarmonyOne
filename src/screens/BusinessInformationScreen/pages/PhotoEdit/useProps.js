import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFormDataMulipleImage, createFormData } from "@shared/utils";
import {
  useAxiosMutation,
  uploadAvatarStaff,
  addBannerMerchant,
  getBannerMerchant,
  deleteBannersMerchant,
  useAxiosQuery,
} from "@src/apis";
import { guid } from "@shared/utils";
import { merchant } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const [fileId, setFileId] = React.useState("0");
  const [imageUrl, setImageUrl] = React.useState("");
  const [tempImagesUpload, setTempImageUpload] = React.useState([]);
  const [banners, setBanners] = React.useState([]);

  const [bannersAdded, setBannersAdded] = React.useState([]);
  const [isSubmit, setSubmit] = React.useState(false);
  const [bannersDelete, setBannersDelete] = React.useState([]);
  const [bannersDeleteSaved, setBannersDeleteSaved] = React.useState([]);
  const [isSelectMultipleDelete, setSelectMultipleDelete] = React.useState(false);

  const {
    merchant: { bannersMerchant = [] },
    auth: { staff }
  } = useSelector(state => state);

  const [, submitAddBannerMerchant] = useAxiosMutation({
    ...addBannerMerchant(),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        let tempBannersAdded = [...bannersAdded];
        if ((tempBannersAdded?.length == 0) || (tempBannersAdded?.length == 1)) {
          fetchBannerMerchant();
        }
        tempBannersAdded.shift();
        setBannersAdded(tempBannersAdded);
      }
    },
  });

  const [, fetchBannerMerchant] = useAxiosQuery({
    ...getBannerMerchant(staff?.merchantId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(merchant.setBannerMerchant(data));
        NavigationService.back();
      }
    }
  });


  const [, submitUploadCamera] = useAxiosMutation({
    ...uploadAvatarStaff(),
    queryId: "uploadBanner_camera",
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        let tempBannersAdded = [...bannersAdded];
        tempBannersAdded.push({
          filename: guid(),
          fileId: data?.fileId
        });
        setBannersAdded(tempBannersAdded);

        setBanners([
          ...banners,
          {
            createdDate: "",
            description: "",
            fileId: data?.fileId,
            imageUrl: data?.url,
            isDisabled: 0,
            merchantBannerId: `bannerAdded_${guid()}`,
            merchantId: 0,
            title: "",
          }
        ]);
      }
    },
  });

  const [, submitDeleteBannersMerchant] = useAxiosMutation({
    ...deleteBannersMerchant(),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        fetchBannerMerchant();
      }
    },
  });

  const [, submitUploadImagePicker] = useAxiosMutation({
    ...uploadAvatarStaff(),
    queryId: "uploadBanner_imagePicker",
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        let temptFileUpload = [...tempImagesUpload];
        let tempBannersAdded = [...bannersAdded];
        tempBannersAdded.push({
          ...temptFileUpload[temptFileUpload.length - 1],
          fileId: data?.fileId
        });
        setBannersAdded(tempBannersAdded);
        setBanners([
          ...banners,
          {
            createdDate: "",
            description: "",
            fileId: data?.fileId,
            imageUrl: data?.url,
            isDisabled: 0,
            merchantBannerId: `bannerAdded_${guid()}`,
            merchantId: 0,
            title: "",
          }
        ]);
        temptFileUpload.shift();
        setTempImageUpload(temptFileUpload);
      }
    },
  });

  const addPerBannner = async () => {
    const data = {
      "title": `${bannersAdded[0]?.filename}_${guid()}`,
      "description": "",
      "fileId": `${bannersAdded[0]?.fileId}`,
    };
    const body = await addBannerMerchant(data);
    submitAddBannerMerchant(body.params);
  }

  React.useEffect(() => {
    if (isSubmit) {
      if (bannersAdded.length > 0) {
        addPerBannner();
      }
      if (bannersDeleteSaved?.length > 0) {
        submitActionDeleteBanners();
      }
    }
  }, [bannersAdded, isSubmit]);


  React.useEffect(() => {
    if (bannersMerchant && bannersMerchant?.length > 0) {
      setBanners(bannersMerchant)
    }
  }, [bannersMerchant]);


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

  const submitActionDeleteBanners = async () => {
    const data = bannersDeleteSaved.filter(obj => !obj?.toString()?.includes("bannerAdded"));
    const body = await deleteBannersMerchant(data);
    submitDeleteBannersMerchant(body.params);
  }

  return {
    banners,
    isSubmit,
    isSelectMultipleDelete,
    bannersDelete,

    changeCheckedDelete: () => {

    },

    onSelectMultipleDelete: (item) => {
      let tempBannersDelete = [...bannersDelete];
      tempBannersDelete.push(item?.merchantBannerId);
      setBannersDelete(tempBannersDelete);
      setSelectMultipleDelete(true);
    },

    changeStatusBannerToDelete: (item) => {
      const merchantBannerId = item?.merchantBannerId;
      let tempBannersDelete = [...bannersDelete];
      const index = tempBannersDelete.findIndex(obj => obj == merchantBannerId);
      if (index !== -1) {
        tempBannersDelete = tempBannersDelete.filter((obj) => obj !== merchantBannerId);
      } else {
        tempBannersDelete.push(merchantBannerId);
      }
      if (tempBannersDelete?.length == 0) {
        setSelectMultipleDelete(false);
      }
      setBannersDelete(tempBannersDelete);
    },

    onResponseImagePicker: (responses) => {
      if (responses && responses?.length > 0) {
        setTempImageUpload(responses);
      }
    },

    onResponseCamera: async (response) => {
      console.log('response camera : ', { response });
      let files = response?.assets ?? [];
      files = createFormData(files);
      const body = await uploadAvatarStaff(files);
      submitUploadCamera(body.params);
    },



    actionDeleteBanners: async () => {
      const tempBannersDeleteSaved = await [...bannersDeleteSaved, ...bannersDelete];
      let tempBanners = [...banners];
      let tempBannerAdded = [...bannersAdded];
      for (let j = 0; j < tempBannersDeleteSaved.length; j++) {
        const obj = tempBannersDeleteSaved[j];
        tempBanners = tempBanners.filter(item => item?.merchantBannerId !== obj);
        tempBannerAdded = tempBannerAdded.filter(item => item?.merchantBannerId !== obj);
      }
      await setBannersDeleteSaved(tempBannersDeleteSaved);
      setSelectMultipleDelete(false);
      setBannersDelete([]);
      setBanners(tempBanners);
    },

    onSave: () => {
      setSubmit(true);
    }
  };
};

function deletePerBannesdd() {

}