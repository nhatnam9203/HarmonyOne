import React from "react";
import { getStaffOfService, useAxiosQuery } from "@src/apis";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { bookAppointment } from "@redux/slices";
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
    servicesBooking = [],
    extrasBooking = [],
    productsBooking = [],
  } } = useSelector(state => state);

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


  const editService = () => {
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
    dispatch(bookAppointment.editProduct(itemProductEdit));
    serviceRef.current = itemProductEdit.product;
  }


  const addService = () => {
    if (serviceRef?.current) {
      editService();
      return;
    }

    /* add service */
    let temp = [...servicesBooking];
    const tempItem = {
      ...item,
      quantity: quantity,
      price
    };
    serviceRef.current = tempItem;
    temp.push(tempItem);
    dispatch(bookAppointment.setServicesBooking(temp));
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
    servicesBooking,
    price,
    isEditPrice,
    setStatusEditPrice,
    setPrice,
    inputPriceRef,

    goToSelectStaff: () => {
      let product = {
        product : item,
        price,
        quantity,
      }
      const index = productsBooking.findIndex(obj => obj.productId == product.product.productId);
      if (index !== -1) {
        //edit
        dispatch(bookAppointment.editProduct(product));
      } else {
        //add
        product = {
          ...item,
          price,
          quantity,
        }
        const tempProductsBooking = [...productsBooking, product];
        dispatch(bookAppointment.setProductsBooking(tempProductsBooking));
      }
      NavigationService.navigate(screenNames.ReviewConfirm);
    },

    goToReview: () => {
      editService();
      NavigationService.navigate(screenNames.ReviewConfirm)
    },

    onChangeQuantity: (qty) => {
      setQuantity(qty);
    },

    back: () => {
      if (isEditItem) {
        NavigationService.navigate(screenNames.ReviewConfirm);
      } else {
        const findProduct = productsBooking.find(obj => obj?.productId == item?.productId);
        if (findProduct) {
          dispatch(bookAppointment.deleteProduct(findProduct))
        }
        NavigationService.back();
      }
    }

  };
};
