//
//  ADDLRspData.h
//  POSLink
//
//  Created by jim.J on 2020/2/18.
//  Copyright © 2020 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface ADDLRspData : NSObject
@property (nonatomic,copy) NSString* ACI;
@property (nonatomic,copy) NSString* TransID;
@property (nonatomic,copy) NSString* CardLevelResult;
@property (nonatomic,copy) NSString* SourceReasonCode;
@property (nonatomic,copy) NSString* BankNetData;
@property (nonatomic,copy) NSString* POSEntryModeChg;
@property (nonatomic,copy) NSString* TranEditErrCode;
@property (nonatomic,copy) NSString* DiscProcCode;
@property (nonatomic,copy) NSString* DiscPOSEntry;
@property (nonatomic,copy) NSString* DiscRespCode;
@property (nonatomic,copy) NSString* POSData;
@property (nonatomic,copy) NSString* DiscTransQualifier;
@property (nonatomic,copy) NSString* DiscNRID;
@property (nonatomic,copy) NSString* TrnmsnDateTime;
@property (nonatomic,copy) NSString* OrigSTAN;
@property (nonatomic,copy) NSString* CVVErrorCode;
@property (nonatomic,copy) NSString* XCodeResp;
@property (nonatomic,copy) NSString* AthNtwkID;
@property (nonatomic,copy) NSString* TermEntryCapablt;
@property (nonatomic,copy) NSString* POSEntryMode;
@property (nonatomic,copy) NSString* ServCode;
@property (nonatomic,copy) NSString* SpendQInd;
@property (nonatomic,copy) NSString* WltID;
@property (nonatomic,copy) NSString* LocalDateTime;
@property (nonatomic,copy) NSString* EMVTags;
@end

NS_ASSUME_NONNULL_END
