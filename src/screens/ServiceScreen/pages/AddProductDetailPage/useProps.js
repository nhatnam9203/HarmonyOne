import React from "react";
import { getStaffOfService, useAxiosQuery } from "@src/apis";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { bookAppointment, editAppointment } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';


export const useProps = ({
  route,
  navigation
}) => {
  const dispatch = useDispatch();
  const item = route?.params?.item;
  const isEditItem = route?.params?.isEditItem;
  const extrasEdit = route?.params?.extrasEdit;

  const serviceRef = React.useRef(); // detect go back;
  const extrasRef = React.useRef();
  const inputPriceRef = React.useRef();


  const { bookAppointment: {
      productsBooking = [],
    },
} = useSelector(state => state);


  const [quantity, setQuantity] = React.useState(0);
  const [extrasService, setExtrasService] = React.useState([]);

  const [price, setPrice] = React.useState("");
  const [isEditPrice, setStatusEditPrice] = React.useState(false);


  React.useEffect(() => {

    if (!isEditItem) {
      setPrice(item?.price);
      setQuantity(1);
    }

    else {
      setQuantity(item?.quantity);
      setPrice(item?.price);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      if (serviceRef?.current) {
        console.log("----- on back ----")
        setQuantity(serviceRef?.current?.quantity);
        setPrice(serviceRef?.current?.price);
      }
    });

    return unsubscribe;
  }, []);


  const handleEditProduct = () => {
    let itemProductEdit = {
      product: serviceRef.current,
      quantity: quantity,
      price,
    }
    if (isEditItem) {
      itemProductEdit = {
        product: item,
        quantity: quantity,
        price,
      }
    }
    dispatch(editAppointment.editProduct(itemProductEdit));
    serviceRef.current = itemProductEdit.product;
  }


  const addService = () => {
    if (serviceRef?.current) {
      handleEditProduct();
      return;
    }

    /* add service */
    const tempItem = {
      ...item,
      quantity: quantity,
      price
    };
    serviceRef.current = tempItem;
    dispatch(editAppointment.addProduct(tempItem));
  }

  /* FETCH STAFF AVAILABLE OF SERVICE */
  const [, fetchStaffAvaiable] = useAxiosQuery({
    ...getStaffOfService(item?.serviceId),
    enabled: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        await addService();
        await dispatch(bookAppointment.setStafsfOfService(data));
        await NavigationService.navigate(screenNames.SelectStaff, { serviceSelected: item });
      }
    }
  })

  return {
    item,
    quantity,
    extrasService,
    isEditItem,
    price,
    isEditPrice,
    setStatusEditPrice,
    setPrice,
    inputPriceRef,

    addMoreProduct: () => {

      product = {
        ...item,
        price,
        quantity,
      }
      dispatch(editAppointment.addProduct({ product }));
      NavigationService.navigate(screenNames.EditAppointmentScreen);

      // if (index !== -1) {
      //   //edit
      //   dispatch(bookAppointment.editProduct(product));
      // } else {
      //   //add
      //   product = {
      //     ...item,
      //     price,
      //     quantity,
      //   }
      //   dispatch(bookAppointment.setProductsBooking({ product }));
      //   NavigationService.navigate(screenNames.EditAppointmentScreen);
      // }


      // const service = {
      //   ...item,
      //   duration: durationService,
      //   price
      // };
      // const tempExtras = extrasService.filter(ex => ex.checked == true);
      // dispatch(editAppointment?.addService({ service, extras: tempExtras }));
      // NavigationService.navigate(screenNames.EditAppointmentScreen);
    },

    editProduct: () => {
      handleEditProduct();
      NavigationService.back();
    },

    onChangeQuantity: (qty) => {
      setQuantity(qty);
    },

    back: () => {
      NavigationService.back();
    }

  };
};
