//
//  batch.m
//  Hpmerchant
//
//  Created by Nguyễn Hoàng Nhật Phi on 19/01/2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import "batch.h"
#import "BatchResponse.h"
#import "ProcessTransResult.h"
#import "CommSetting.h"
#import "PosLink.h"

@implementation batch

- (NSString*) convertObjectToJson:(NSObject*) object
{
  NSError *writeError = nil;
  
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:object options:NSJSONWritingPrettyPrinted error:&writeError];
  NSString *result = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  
  return result;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(batchTransaction:(NSDictionary *)batchInfo callback:(RCTResponseSenderBlock)callback){
  
  CommSetting *commSetting = [[CommSetting alloc]init];
  
  _tempIdAddrBluetooth = batchInfo[@"bluetoothAddr"];
  
  commSetting.commType = batchInfo[@"commType"];
  commSetting.destIP = batchInfo[@"destIp"];
  commSetting.destPort = batchInfo[@"portDevice"];
  commSetting.timeout = batchInfo[@"timeoutConnect"];
  commSetting.bluetoothAddr = _tempIdAddrBluetooth;
  
  PosLink *poslink = [[PosLink alloc]initWithCommSetting:commSetting];
  
  BatchRequest *batchRequest = [[BatchRequest alloc] init];
  
  batchRequest.TransType = [BatchRequest ParseTransType:batchInfo[@"transType"]];  // BATCHCLOSE
  batchRequest.EDCType = [BatchRequest ParseEDCType:batchInfo[@"edcType"]]; // ALL
  batchRequest.PaymentType = [BatchRequest ParseTransType:@""];
  batchRequest.CardType = [BatchRequest ParseEDCType:@""];
  batchRequest.Timestamp = @"";
  batchRequest.SAFIndicator = @"";
  batchRequest.RecordNum = @"";
  batchRequest.RefNum = @"";
  batchRequest.AuthCode = @"";
  batchRequest.ECRRefNum = @"";
  batchRequest.ExtData = @"";
  
  poslink.batchRequest = batchRequest;
  
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    
    ProcessTransResult *ret = [poslink processTrans:BATCH];
    dispatch_async(dispatch_get_main_queue(), ^{
      
      if (ret.code == OK){
        NSDictionary *dataSuccess = @{
          @"status":@true,
          @"ResultCode" : poslink.batchResponse.ResultCode ? poslink.batchResponse.ResultCode : @"" ,
          @"ResultTxt" : poslink.batchResponse.ResultTxt ? poslink.batchResponse.ResultTxt : @"",
          @"CreditCount" : poslink.batchResponse.CreditCount ? poslink.batchResponse.CreditCount : @"",
          @"CreditAmount" : poslink.batchResponse.CreditAmount ?  poslink.batchResponse.CreditAmount : @"",
          @"DebitCount" : poslink.batchResponse.DebitCount ?  poslink.batchResponse.DebitCount : @"",
          @"DebitAmount" : poslink.batchResponse.DebitAmount ? poslink.batchResponse.DebitAmount : @"",
          @"EBTCount" : poslink.batchResponse.EBTCount  ? poslink.batchResponse.EBTCount : @"",
          @"EBTAmount" : poslink.batchResponse.EBTAmount ? poslink.batchResponse.EBTAmount : @"" ,
          @"GiftCount" : poslink.batchResponse.GiftCount ? poslink.batchResponse.GiftCount : @"",
          @"GiftAmount" : poslink.batchResponse.GiftAmount ? poslink.batchResponse.GiftAmount : @"",
          @"LoyaltyCount" : poslink.batchResponse.LoyaltyCount ? poslink.batchResponse.LoyaltyCount : @"",
          @"LoyaltyAmount" : poslink.batchResponse.LoyaltyAmount ? poslink.batchResponse.LoyaltyAmount : @"",
          @"CashCount" : poslink.batchResponse.CashCount ? poslink.batchResponse.CashCount : @"",
          @"CashAmount" : poslink.batchResponse.CashAmount ?  poslink.batchResponse.CashAmount : @"",
          @"CHECKCount" : poslink.batchResponse.CHECKCount ? poslink.batchResponse.CHECKCount : @"",
          @"CHECKAmount" : poslink.batchResponse.CHECKAmount ? poslink.batchResponse.CHECKAmount : @"",
          @"Timestamp" : poslink.batchResponse.Timestamp ? poslink.batchResponse.Timestamp : @"",
          @"TID" : poslink.batchResponse.TID ? poslink.batchResponse.TID : @"",
          @"MID" : poslink.batchResponse.MID ? poslink.batchResponse.MID : @"",
          @"HostTraceNum" : poslink.batchResponse.HostTraceNum ?  poslink.batchResponse.HostTraceNum : @"",
          @"BatchNum" : poslink.batchResponse.BatchNum ? poslink.batchResponse.BatchNum : @"",
          @"AuthCode" : poslink.batchResponse.AuthCode ? poslink.batchResponse.AuthCode : @"",
          @"HostCode" : poslink.batchResponse.HostCode ? poslink.batchResponse.HostCode : @"",
          @"HostResponse" : poslink.batchResponse.HostResponse ? poslink.batchResponse.HostResponse : @"",
          @"Message" : poslink.batchResponse.Message ?  poslink.batchResponse.Message : @"",
          @"ExtData" : poslink.batchResponse.ExtData ?  poslink.batchResponse.ExtData : @"",
          @"BatchFailedRefNum" : poslink.batchResponse.BatchFailedRefNum ? poslink.batchResponse.BatchFailedRefNum : @"",
          @"BatchFailedCount" : poslink.batchResponse.BatchFailedCount ? poslink.batchResponse.BatchFailedCount : @"",
          @"SAFTotalCount" : poslink.batchResponse.SAFTotalCount ? poslink.batchResponse.SAFTotalCount : @"",
          @"SAFTotalAmount" : poslink.batchResponse.SAFTotalAmount ? poslink.batchResponse.SAFTotalAmount : @"",
          @"SAFUploadedCount" : poslink.batchResponse.SAFUploadedCount ? poslink.batchResponse.SAFUploadedCount : @"",
          @"SAFUploadedAmount" : poslink.batchResponse.SAFUploadedAmount ? poslink.batchResponse.SAFUploadedAmount : @"",
          @"SAFFailedCount" : poslink.batchResponse.SAFFailedCount ? poslink.batchResponse.SAFFailedCount : @"",
          @"SAFFailedTotal" : poslink.batchResponse.SAFFailedTotal ? poslink.batchResponse.SAFFailedTotal : @"",
          @"SAFDeletedCount" : poslink.batchResponse.SAFDeletedCount ? poslink.batchResponse.SAFDeletedCount : @"",
        };
        
        NSString  *result =  [self convertObjectToJson:dataSuccess ] ;
        callback(@[result]);
        
      }else{
        NSDictionary *dataError = @{@"status":@false,
                                    @"message":ret.msg
                                    };
        NSString  *resultError =  [self convertObjectToJson:dataError ] ;
        callback(@[resultError]);
      }
      
    });
    
  });
  
}

@end
