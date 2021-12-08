//
//  common.h
//  POSLink
//
//  Created by sunny on 15-7-27.
//  Copyright (c) 2015年 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

#define SVERSION  @"1.45"

#define CH_STX  0x02
#define ST_STX  @"\x02"
#define CH_ETX  0x03
#define ST_ETX  @"\x03"
#define CH_EOT  0x04
#define CH_ENQ  0x05
#define CH_ACK  0x06
#define CH_NAK  0x15
#define CH_FS   0x1c
#define ST_FS   @"\x1c"
#define CH_GS   0x1d
#define ST_GS  @"\x1d"
#define CH_US   0x1f
#define ST_US   @"\x1f"
#define CH_RS   0x1e
#define ST_RS   @"\x1e"
#define ST_EQ   @"="

#define PAX_TENDER_ALL  0
#define PAX_TENDER_CREDIT  1
#define PAX_TENDER_DEBIT 2
#define PAX_TENDER_CHECK  3
#define PAX_TENDER_EBT_FOODSTAMP  4
#define PAX_TENDER_EBT_CASHBENEFIT 5
#define PAX_TENDER_GIFT  6
#define PAX_TENDER_LOYALTY  7
#define PAX_TENDER_CASH  8
#define PAX_TENDER_EBT  9

//#define PACKSIZE  3000
#define OFFSET  3000
#define PACKSIZE  141
#define BASESIZE  4000
//#define LIMIT  3000// modified for test purpose only
//#define LIMIT  255
#define LIMIT  5000
#define BASE  -1003
#define PACKERROR  (BASE + 0)
#define REQUESTNOTSET  (BASE + 1)
#define TENDERTYPEERROR  (BASE + 2)
#define TRANSTYPEERROR  (BASE + 3)
#define FORCEVALUEERROR (BASE + 4)
#define NULLPTR  (BASE + 5)

#define FORMAT_BASE  0;
#define FORMAT_COPY  (FORMAT_BASE + 0)
#define FORMAT_ACCTNUM  (FORMAT_BASE + 1)
#define FORMAT_CARDTYPE  (FORMAT_BASE + 2)
#define FORMAT_BALANCE  (FORMAT_BASE + 3)
#define FORMAT_REQUESTAMT  (FORMAT_BASE + 4)
#define FORMAT_EBTVOUCHER  (FORMAT_BASE + 5)
#define FORMAT_USS  (FORMAT_BASE + 6)
#define FORMAT_REPORTTOTAL  (FORMAT_BASE + 7)
#define FORMAT_TIMESTAMP  (FORMAT_BASE + 8)
#define FORMAT_EDCTYPE  (FORMAT_BASE + 9)
#define FORMAT_PAYMENTTYPE  (FORMAT_BASE + 10)

#define PROCESS_TRANS_RESULT_MSG "ProcessTransResult Msg: "
//EMSG = Error Message
#define SUCC "SUCC"
//Pack Error
#define PACK_ERROR_REQUEST_NOT_SET @"POSLINK PACK ERROR: REQUEST NOT SET"
#define PACK_ERROR_TENDER_TYPE_NOT_SET @"POSLINK PACK ERROR: TENDER TYPE NOT SET"
#define PACK_ERROR_TRANS_TYPE_NOT_SET @"POSLINK PACK ERROR: TRANS TYPE NOT SET"
#define PACK_ERROR_TENDER_TYPE_INVALID @"POSLINK PACK ERROR: TENDER TYPE INVALID"
#define PACK_ERROR_TRANS_TYPE_INVALID @"POSLINK PACK ERROR: TRANS TYPE INVALID"
#define PACK_ERROR_UNKOW_REQUEST @"POSLINK PACK ERROR: UNKNOW REQUEST"
//Commsetting Error
#define COMMSETTING_ERROR_COMM_TYPE_INVALID @"POSLINK COMMSETTING ERROR: COMM TYPE INVALID"
#define COMMSETTING_ERROR_TIMEOUT_INVALID @"POSLINK COMMSETTING ERROR: TIMEOUT INVALID"
#define COMMSETTING_ERROR_DEST_IP_INVALID @"POSLINK COMMSETTING ERROR: DEST IP INVALID"
#define COMMSETTING_ERROR_DEST_PORT_INVALID @"POSLINK COMMSETTING ERROR: DEST PORT INVALID"
//Communication Error
#define COMMUNICATION_ERROR_CONNECT_ERROR @"POSLINK COMMUNICATION ERROR: CONNECT ERROR"
#define COMMUNICATION_ERROR_SEND_DATA_ERROR @"POSLINK COMMUNICATION ERROR: SEND DATA ERROR"
#define COMMUNICATION_ERROR_RECV_DATA_ERROR @"POSLINK COMMUNICATION ERROR: RECV DATA ERROR"
//Transaction Error
#define TRANSACTION_ERROR_SEND_DATA_RECV_ACK_ERROR @"POSLINK TRANSACTION ERROR: SEND DATA RECV ACK ERROR"
#define TRANSACTION_ERROR_RECEIVED_EOT_RATHER_THAN_RESPONSE @"POSLINK TRANSACTION ERROR: RECEIVED EOT RATHER THAN RESPONSE"
#define TRANSACTION_ERROR_LRC_ERROR @"POSLINK TRANSACTION ERROR: LRC ERROR"
//Timeout
#define TIMEOUT_RECV_DATA_TIMEOUT @"POSLINK TIMEOUT: RECV DATA TIMEOUT"
#define TIMEOUT_SEND_DATA_RECV_ACK_TIMEOUT @"POSLINK TIMEOUT: SEND DATA RECV ACK TIMEOUT"
//Unpack Error
#define UNPACK_ERROR @"POSLINK UNPACK ERROR"
//Unknown Error
#define UNKNOWN_ERROR @"POSLINK UNKNOWN ERROR"
//session end
#define SESSION_END @"POSLINK SESSION END"

typedef NS_ENUM(NSUInteger, TRANSFER){
    COPY, ACCTNUM, // card/check
    CARDTYPE, //
    BALANCE, // ebt types
    REQUESTAMT, // due+approvel
    EBTVOUCHER, // NEED TO know card type
    USS, // used in force batch close to support multi line in extdata
    REPORTTOTAL, // used in report->local total report
    TIMESTAMP, // 2choice 1
    EDCTYPE, // EDC TYPE for report
    PAYMENTTYPE
    // payment type
};

@interface NSString (MyString)

-(NSString*)appendWithFS:(NSString*)str;
-(NSString*)appendWithUS:(NSString*)str;
-(NSString*)appendWithUSByName:(NSString *)name andValue:(NSString *)value;
-(NSString*)appendWithRS:(NSString*)str;
-(NSString*)appendWithCOMMA:(NSString*)str;
-(NSString*)appendWithGS;
-(NSString*)appendWithVerticalLine;
@end

@interface NSArray (MyArray)

-(id)toStringSeperatedByFS;
-(id)toStringSeperatedByUS;
-(id)toStringSeperatedByRS;
@end

@interface Common : NSObject <NSXMLParserDelegate>{
    
    NSDictionary*EDCMap;
    NSDictionary*ManageMap;
    NSDictionary*BatchMap;
    NSDictionary*ReportMap;
    NSDictionary*PayTransMap;
    NSDictionary*PayloadMap;
    
    NSArray*slTrend;
    NSArray*slTrend_x;
    NSArray*slPayment;
    NSArray*slEDCpax2tgate;
    NSArray*slEDCpax2tgate_X;
    NSArray*slCardType;
    NSArray*slCardpax2tgate;
    NSArray*slTrans;
    NSArray*slManageTrans;
    NSArray*slBatchTrans;
    NSArray*slReportTrans;
    NSArray*slPayloadTrans;
}

+(id)sharedInstance;
-(int)parseTenderType:(NSString*)tendType;
-(int)parseTransType:(NSString*)transType;
-(int)parseManageTransType:(NSString*)type;
-(int)parseReportTransType:(NSString*)type;
-(int)parseBatchTransType:(NSString*)type;

-(int)parseEDCType:(NSString*)type;
-(int)parseCardTypeType:(NSString*)type;
-(int)parsePayloadTransType:(NSString*)type;

-(NSString*)getPayType:(int)type;
-(NSString*)getPayTypeString:(int)type;
-(NSString*)getEDCType:(int)type;
-(NSString*)getEDCTypeString:(NSString*)type;
-(NSString*)getCardType:(int)type;
-(NSString*)getCardTypeString:(NSString*)type;

-(NSString*)getPayCommand:(int)type;
-(NSString*)getManageCommand:(int)type;
-(NSString*)getReportCommand:(int)type;
-(NSString*)getBatchCommand:(int)type;
-(NSString*)getPayloadCommand:(int)type;

-(NSString*)showPaymentCommand:(int)type;
-(NSString*)showPaymentEDCType:(int)type;

-(NSString*)showManageCommand:(int)type;
-(NSString*)showManageEDCType:(int)type;
-(NSString*)showManagePaymentType:(int)type;

-(NSString*)showReportCommand:(int)type;
-(NSString*)showReportEDCType:(int)type;
-(NSString*)showReportCardType:(int)type;
-(NSString*)showReportPaymentType:(int)type;

-(NSString*)showBatchCommand:(int)type;
-(NSString*)showBatchEDCType:(int)type;

-(NSString*)showPayloadCommand:(int)type;

-(NSMutableDictionary*)parseExtData:(NSString*)extData;
+ (NSString *)replaceXMLSpecialCharacter:(NSString *)string;

- (NSString *)reMapTransTypeWithValue:(NSString *)value;
@end
