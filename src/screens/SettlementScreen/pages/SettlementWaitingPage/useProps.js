
import React from "react";
import {
  useAxiosQuery,
  getListStaffsSales,
  getListGiftCardSales,
  getSettlementWating,
} from "@src/apis";
import { Platform, NativeModules } from "react-native";
import { settlement, app } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { useQueries } from 'react-query';
import useFetchSettlementWaiting from "./useFetchSettlementWaiting";
import NavigationService from '@navigation/NavigationService';
import { PaymentTerminalType } from "@shared/utils";
import _ from "lodash";
import { parseString } from 'react-native-xml2js';
const PosLinkReport = NativeModules.report;

export const useProps = (props) => {
  const dispatch = useDispatch();

  const [valueNote, setValueNote] = React.useState("");
  const [countFetchhing, setCountFetching] = React.useState(0);

  const [noteValue, fetchSettlement] = useFetchSettlementWaiting();

  const {
    settlement: {
      settlementWaiting = {},
      listStaffSales = [],
      listGiftCardSales = [],
    },
    hardware: {
      paymentMachineType,
      paxMachineInfo,
    },
  } = useSelector(state => state);

/****************** Integrate Pax **************************/
  const handlePaxReportIOS = async () => {
    const { ip, port, commType, bluetoothAddr, isSetup } =
      paxMachineInfo;

    if (isSetup) {
      dispatch(app.showLoading());

      let totalRecord = 0;
      let isError = false;

      try {
        const tempIpPax = commType == "TCP" ? ip : "";
        const tempPortPax = commType == "TCP" ? port : "";
        const idBluetooth = commType === "TCP" ? "" : bluetoothAddr;
        // ----------- Total Amount --------
        let data = await PosLinkReport.reportTransaction({
          transType: "LOCALDETAILREPORT",
          edcType: "ALL",
          cardType: "",
          paymentType: "",
          commType: commType,
          destIp: tempIpPax,
          portDevice: tempPortPax,
          timeoutConnect: "90000",
          bluetoothAddr: idBluetooth,
          refNum: "",
        });
        let result = JSON.parse(data);
        const ExtData = result?.ExtData || "";
        const xmlExtData =
          "<xml>" + ExtData.replace("\\n", "").replace("\\/", "/") + "</xml>";

        if (result?.ResultCode && result?.ResultCode == "000000") {
          
          totalRecord = parseInt(result?.TotalRecord || 0);

          parseString(xmlExtData, (err, result) => {
            if (err) {
              fetchSettlement(null)
            } else {
              const terminalID = `${result?.xml?.SN || null}`;
              fetchSettlement(terminalID)
            }
          });
          
        } else {
          throw `${result.ResultTxt}`;
        }
      } catch (error) {
        fetchSettlement(null)
      }

      dispatch(app.hideLoading());

    } else {
      fetchSettlement(null)
    }
  };

  React.useState(() => {
    if(paymentMachineType == PaymentTerminalType.Pax) {
      handlePaxReportIOS();
    }
  }, [])

  React.useEffect(() => {
    if (noteValue) {
      setValueNote(noteValue);
    }
  }, [noteValue])

  return {
    settlementWaiting,
    listStaffSales,
    listGiftCardSales,
    valueNote,
    onChangeNote: (note) => {
      setValueNote(note)
    },

    editActualAmount: () => {
      NavigationService.navigate(screenNames.EditActualAmountPage);
    },

    reviewSettlement: () => {
      dispatch(settlement.updateNote(valueNote));
      NavigationService.navigate(screenNames.ReviewSettlementPage);
    },

    viewGiftCardSold: () => {
      if (listGiftCardSales?.length > 0) {
        NavigationService.navigate(screenNames.GiftCardSoldPage, { listGiftCardSales });
      }
    }
  };
};
