//
//  report.m
//  Hpmerchant
//
//  Created by Nguyễn Hoàng Nhật Phi on 19/01/2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import "report.h"
#import "ReportRequest.h"
#import "ReportResponse.h"
#import "ProcessTransResult.h"
#import "CommSetting.h"
#import "PosLink.h"

@implementation report

- (NSString*) convertObjectToJson:(NSObject*) object
{
  NSError *writeError = nil;
  
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:object options:NSJSONWritingPrettyPrinted error:&writeError];
  NSString *result = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  
  return result;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(reportTransaction:(NSDictionary *)reportInfo findEventsWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  CommSetting *commSetting = [[CommSetting alloc]init];
  
  _tempIdAddrBluetooth = reportInfo[@"bluetoothAddr"];
  
  commSetting.commType = reportInfo[@"commType"];
  commSetting.destIP = reportInfo[@"destIp"];
  commSetting.destPort = reportInfo[@"portDevice"];
  commSetting.timeout = reportInfo[@"timeoutConnect"];
  commSetting.bluetoothAddr = _tempIdAddrBluetooth;
  
  PosLink *poslink = [[PosLink alloc]initWithCommSetting:commSetting];
  
  ReportRequest *reportRequest = [[ReportRequest alloc] init];
  
  reportRequest.TransType = [ReportRequest ParseTransType:reportInfo[@"transType"]];
   reportRequest.EDCType = [ReportRequest ParseEDCType:reportInfo[@"edcType"]];
  reportRequest.CardType = [ReportRequest ParseCardType:reportInfo[@"cardType"]];
 reportRequest.PaymentType = [ReportRequest ParsePaymentType:reportInfo[@"paymentType"]];
  
  reportRequest.RecordNum = @"";
  reportRequest.RefNum = reportInfo[@"refNum"];
  reportRequest.AuthCode = @"";
  reportRequest.ECRRefNum = @"";
  reportRequest.SAFIndicator = @"";
  reportRequest.LASTTRANSACTION = @"";
  reportRequest.ExtData = @"";
  if([reportInfo objectForKey:@"isLastTransaction"] == nil
     || [reportInfo objectForKey:@"isLastTransaction"] == [NSNull null]){
    reportRequest.LASTTRANSACTION = @"0";
  }else{
    reportRequest.LASTTRANSACTION = reportInfo[@"isLastTransaction"];
  }
  
  poslink.reportRequest = reportRequest;
  
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    
    ProcessTransResult *ret = [poslink processTrans:REPORT];
    
    dispatch_async(dispatch_get_main_queue(), ^{
      if (ret.code == OK ) {
        
        NSDictionary *dataSuccess = @{
          @"status":@true,
          @"ResultCode" : poslink.reportResponse.ResultCode ? poslink.reportResponse.ResultCode : @"" ,
          @"ResultTxt" : poslink.reportResponse.ResultTxt ? poslink.reportResponse.ResultTxt : @"" ,
          @"TotalRecord" : poslink.reportResponse.TotalRecord ? poslink.reportResponse.TotalRecord : @"" ,
          @"Message" : poslink.reportResponse.Message ? poslink.reportResponse.Message : @"" ,
          @"ApprovedAmount" : poslink.reportResponse.ApprovedAmount ? poslink.reportResponse.ApprovedAmount : @"" ,
          @"CreditCount" : poslink.reportResponse.CreditCount ? poslink.reportResponse.CreditCount : @"" ,
          @"CreditAmount" : poslink.reportResponse.CreditAmount ? poslink.reportResponse.CreditAmount : @"" ,
          @"ExtData" : poslink.reportResponse.ExtData ? poslink.reportResponse.ExtData : @"" ,
          
          @"InvNum" : poslink.reportResponse.InvNum ? poslink.reportResponse.InvNum : @"" ,
          @"EDCType" : poslink.reportResponse.EDCType ? poslink.reportResponse.EDCType : @"" ,
          @"RecordNumber" : poslink.reportResponse.RecordNumber ? poslink.reportResponse.RecordNumber : @"" ,
          @"PaymentType" : poslink.reportResponse.PaymentType ? poslink.reportResponse.PaymentType : @"" ,
          @"OrigPaymentType" : poslink.reportResponse.OrigPaymentType ? poslink.reportResponse.OrigPaymentType : @"" ,
          @"HostTraceNum" : poslink.reportResponse.HostTraceNum ? poslink.reportResponse.HostTraceNum : @"" ,
          @"BatchNum" : poslink.reportResponse.BatchNum ? poslink.reportResponse.BatchNum : @"" ,
          @"AuthCode" : poslink.reportResponse.AuthCode ? poslink.reportResponse.AuthCode : @"" ,
          @"HostCode" : poslink.reportResponse.HostCode ? poslink.reportResponse.HostCode : @"" ,
          @"HostResponse" : poslink.reportResponse.HostResponse ? poslink.reportResponse.HostResponse : @"" ,
          @"RemainingBalance" : poslink.reportResponse.RemainingBalance ? poslink.reportResponse.RemainingBalance : @"" ,
          @"ExtraBalance" : poslink.reportResponse.ExtraBalance ? poslink.reportResponse.ExtraBalance : @"" ,
          @"BogusAccountNum" : poslink.reportResponse.BogusAccountNum ? poslink.reportResponse.BogusAccountNum : @"" ,
          @"CardType" : poslink.reportResponse.CardType ? poslink.reportResponse.CardType : @"" ,
          @"CvResponse" : poslink.reportResponse.CvResponse ? poslink.reportResponse.CvResponse : @"" ,
          @"RefNum" : poslink.reportResponse.RefNum ? poslink.reportResponse.RefNum : @"" ,
          @"ECRRefNum" : poslink.reportResponse.ECRRefNum ? poslink.reportResponse.ECRRefNum : @"" ,
          @"Timestamp" : poslink.reportResponse.Timestamp ? poslink.reportResponse.Timestamp : @"" ,
          @"ClerkID" : poslink.reportResponse.ClerkID ? poslink.reportResponse.ClerkID : @"" ,
          @"ShiftID" : poslink.reportResponse.ShiftID ? poslink.reportResponse.ShiftID : @"" ,
          @"ReportType" : poslink.reportResponse.ReportType ? poslink.reportResponse.ReportType : @"" ,
          @"DebitCount" : poslink.reportResponse.DebitCount ? poslink.reportResponse.DebitCount : @"" ,
          @"DebitAmount" : poslink.reportResponse.DebitAmount ? poslink.reportResponse.DebitAmount : @"" ,
          @"TransTotal" : poslink.reportResponse.TransTotal ? poslink.reportResponse.TransTotal : @"" ,
          @"TransactionIdentifier" : poslink.reportResponse.TransactionIdentifier ? poslink.reportResponse.TransactionIdentifier : @"" ,
          @"TransactionIntegrityClass" : poslink.reportResponse.TransactionIntegrityClass ? poslink.reportResponse.TransactionIntegrityClass : @"" ,
          @"TransactionRemainingAmount" : poslink.reportResponse.TransactionRemainingAmount ? poslink.reportResponse.TransactionRemainingAmount : @"" ,
          
          
        };
        
        NSString  *result =  [self convertObjectToJson:dataSuccess ] ;
        resolve(@[result]);
        
      }else{
        
        NSDictionary *dataError = @{@"status":@false, @"message":ret.msg };
        NSString *domain = @"com.harmony.pos.paxError";
        NSError *error = [NSError errorWithDomain:domain code:-101 userInfo:dataError];
        reject(@"no_events", ret.msg,error);
        
      }
      
    });
    
  });
  
}

@end


