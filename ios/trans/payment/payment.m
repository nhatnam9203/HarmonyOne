//
//  report.m
//  Hpmerchant
//
//  Created by Nguyễn Hoàng Nhật Phi on 19/01/2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import "payment.h"
#import "CommSetting.h"
#import "PosLink.h"
#import "PaymentRequest.h"
#import "PaymentResponse.h"
#import "ProcessTransResult.h"
#import "LogManager.h"

@implementation payment

- (NSString*) convertObjectToJson:(NSObject*) object
{
  NSError *writeError = nil;
  
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:object options:NSJSONWritingPrettyPrinted error:&writeError];
  NSString *result = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  
  return result;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendTransaction:(NSDictionary *)paymentInfo callback:(RCTResponseSenderBlock)callback)
{
  
  CommSetting *commSetting = [[CommSetting alloc]init];
  
  _tempIdAddrBluetooth = paymentInfo[@"bluetoothAddr"];
  
  commSetting.commType = paymentInfo[@"commType"];
  commSetting.destIP = paymentInfo[@"destIp"];
  commSetting.destPort = paymentInfo[@"portDevice"];
  commSetting.timeout = paymentInfo[@"timeoutConnect"];
  commSetting.bluetoothAddr = _tempIdAddrBluetooth;
  
  _poslink = [[PosLink alloc]initWithCommSetting:commSetting];

  PaymentRequest *paymentRequest = [[PaymentRequest alloc] init];
  
  paymentRequest.TenderType = [PaymentRequest ParseTenderType:paymentInfo[@"tenderType"]]; // CREDIT,DEBIT
  paymentRequest.TransType = [PaymentRequest ParseTransType:paymentInfo[@"transType"]]; // SALE,VOID,RETURN
   
   paymentRequest.Amount =paymentInfo[@"amount"];
   paymentRequest.CashBackAmt = @"";
   paymentRequest.ClerkID = @"";
    paymentRequest.SigSavePath = @"";
   paymentRequest.Zip = @"";
   paymentRequest.TipAmt = @"";
   paymentRequest.TaxAmt = @"";
   paymentRequest.FuelAmt = @"";
   paymentRequest.ECRTransID = @"";
   paymentRequest.Street1 = @"";
   paymentRequest.Street2 = @"";
   paymentRequest.SurchargeAmt = @"";
   paymentRequest.PONum = @"";
   paymentRequest.OrigRefNum = @"";
  paymentRequest.InvNum = paymentInfo[@"invNum"];
  paymentRequest.ECRRefNum = paymentInfo[@"transactionId"];
   paymentRequest.ECRTransID = @"";
   paymentRequest.AuthCode = @"";
   paymentRequest.ExtData = paymentInfo[@"extData"];
  paymentRequest.ContinuousScreen = @"";
  paymentRequest.ServiceFee = @"";
  
  _poslink.paymentRequest = paymentRequest;

  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{

    ProcessTransResult *ret = [self->_poslink processTrans:PAYMENT];
    dispatch_async(dispatch_get_main_queue(), ^{
      
      [[LogManager sharedInstance] writeLog:[NSString stringWithFormat:@"%@", @"ProcessTransResult"]];


      if (ret.code == OK ) {
        if([self->_poslink.paymentResponse.ResultCode isEqual: @"000000"]){
          NSDictionary *dataSuccess = @{@"status":@true,
                                        @"ResultCode" : self->_poslink.paymentResponse.ResultCode ? self->_poslink.paymentResponse.ResultCode : @"",
                                        @"ResultTxt" : self->_poslink.paymentResponse.ResultTxt ? self->_poslink.paymentResponse.ResultTxt : @"",
                                        @"AuthCode" : self->_poslink.paymentResponse.AuthCode ? self->_poslink.paymentResponse.AuthCode : @"",
                                        @"ApprovedAmount" : self->_poslink.paymentResponse.ApprovedAmount ?self->_poslink.paymentResponse.ApprovedAmount : @"",
                                        @"AvsResponse" : self->_poslink.paymentResponse.AvsResponse ? self->_poslink.paymentResponse.AvsResponse : @"",
                                        @"BogusAccountNum" : self->_poslink.paymentResponse.BogusAccountNum ? self->_poslink.paymentResponse.BogusAccountNum : @"",
                                        @"CardType" : self->_poslink.paymentResponse.CardType ? self->_poslink.paymentResponse.CardType : @"",
                                        @"CvResponse" : self->_poslink.paymentResponse.CvResponse ? self->_poslink.paymentResponse.CvResponse : @"",
                                        @"HostCode" : self->_poslink.paymentResponse.HostCode ? self->_poslink.paymentResponse.HostCode : @"",
                                        @"HostResponse" : self->_poslink.paymentResponse.HostResponse ? self->_poslink.paymentResponse.HostResponse : @"",
                                        @"RawResponse" : self->_poslink.paymentResponse.RawResponse ?  self->_poslink.paymentResponse.RawResponse : @"",
                                        @"Message" : self->_poslink.paymentResponse.Message ? self->_poslink.paymentResponse.Message : @"",
                                        @"RefNum" : self->_poslink.paymentResponse.RefNum ? self->_poslink.paymentResponse.RefNum : @"",
                                        @"RemainingBalance" : self->_poslink.paymentResponse.RemainingBalance ? self->_poslink.paymentResponse.RemainingBalance : @"",
                                        @"ExtraBalance" : self->_poslink.paymentResponse.ExtraBalance ? self->_poslink.paymentResponse.ExtraBalance : @"",
                                        @"Timestamp" :self->_poslink.paymentResponse.Timestamp ? self->_poslink.paymentResponse.Timestamp : @"",
                                        @"InvNum" : self->_poslink.paymentResponse.InvNum ? self->_poslink.paymentResponse.InvNum : @"",
                                        @"ExtData" : self->_poslink.paymentResponse.ExtData ? self->_poslink.paymentResponse.ExtData : @"",
                                        @"RequestedAmount" :self->_poslink.paymentResponse.RequestedAmount ? self->_poslink.paymentResponse.RequestedAmount : @"",
                                        @"SignData":self->_poslink.paymentResponse.signData ?self->_poslink.paymentResponse.signData  : @""
                                        };
          
          NSString  *result =  [self convertObjectToJson:dataSuccess ] ;
          callback(@[result]);
        }else{
          //--------- Handle Duplication ---------
          NSDictionary *dupError = @{
                                      @"status":@false,
                                      @"message":self->_poslink.paymentResponse.ResultTxt ? self->_poslink.paymentResponse.ResultTxt : @"ABORTED"
                                   
                                        };
          NSString  *hanldeDup =  [self convertObjectToJson:dupError ] ;
          callback(@[hanldeDup]);
        }
      }else {
        NSDictionary *dataError = @{@"status":@false,
                                    @"message":ret.msg
                                      };
         NSString  *resultError =  [self convertObjectToJson:dataError ] ;
        callback(@[resultError]);
      }
      
    });
    
  });
  
}


RCT_EXPORT_METHOD(cancelTransaction){
  if(_poslink){
    [_poslink cancelTrans];
  }
}

@end


