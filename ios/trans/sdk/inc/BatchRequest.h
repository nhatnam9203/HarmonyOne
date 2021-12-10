//
//  BatchRequest.h
//  POSLink
//
//  Created by sunny on 15-12-18.
//  Copyright (c) 2015年 pax. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MultiMerchant.h"

@interface BatchRequest : NSObject

/**
 * Indicate the transaction type.
 * <p>BATCHCLOSE = 1 - used to close the current batch<br>
 * FORCEBATCHCLOSE = 2 - used to force close the current batch, if host supports it.<br>
 * BATCHCLEAR = 3 - used to clear local database<br>
 * PURGEBATCH = 4 - Launches purge batch, if supported by host<br>
 * SAFUPLOAD = 5 - used to launch store and forward transacion uploading if support by host<br>
 * DELETESAFFILE = 6 - used to delete store and forward records once upload success or failed<br>
 * An Error will be returned while invoking POSLink.ProcessTrans if user set other value.<br>
 * User can assign the TransType by com.PAX.POSLink.BatchRequest.ParseTransType or assign an integer directly.<br>
 * Example:<br>
 *    BatchRequest batch = new BatchRequest();<br>
 * 	  batch.TransType = batch.ParseTransType("BATCHCLOSE");  //recommend<br>
 *    or<br>
 *    batch.TransType = 1;<br>
 *
 */
@property (nonatomic) int TransType;

/**
 *Indicate the EDC type.
 *<p>ALL = 0<br>
 *CREDIT = 1<br>
 *DEBIT = 2<br>
 *CHECK = 3<br>
 *EBT = 4  <br>
 *GIFT = 5 <br>
 *LOYALTY = 6<br>
 *CASH = 7 <br>
 *Only above value accepted, other value will be omitted.<br>
 * User can assign the EDCType by com.PAX.POSLink.BatchRequest.ParseEDCType or assign an integer directly. <br>
 * Example:
 *     BatchRequest batch = new BatchRequest(); <br>
 * 	   batch.EDCType = batch.ParseEDCType("CREDIT");  //recommend <br>
 *     or <br>
 *     batch.EDCType = 1;<br>
 */
 @property (nonatomic) int EDCType;

/**
 *Indicate the Card type.
 *<p>VISA = 1<br>
 *MASTERCARD = 2<br>
 *AMEX = 3<br>
 *DISCOVER = 4<br>
 *DINERCLUB = 5<br>
 *ENROUTE = 6<br>
 *JCB = 7<br>
 *REVOLUTIONCARD = 8<br>
 *OTHER = 9<br>
 *Only above value accepted, other value will be omitted.<br>
 *Used only TransType is DELETETRANSACTION<br>
 * User can assign the CardType by com.PAX.POSLink.ReportRequest.ParseCardType or assign an integer directly. <br>
 * Example:
 *     BatchRequest report = new BatchRequest(); <br>
 * 	   batch.CardType = batch.ParseCardType("MASTERCARD");  //recommend <br>
 *     or <br>
 *     batch.CardType = 2;<br>
 */
@property (nonatomic) int CardType;

/**
 * Indicate the payment type.
 * <p>UNKNOWN = 0.<br>
 * AUTH = 1.<br>
 * SALE = 2.<br>
 * RETURN = 3.<br>
 * VOID = 4.<br>
 * POSTAUTH = 5.<br>
 * FORCEAUTH = 6.<br>
 * CAPTURE = 7.<br>
 * REPEATSALE = 8.<br>
 * CAPTUREALL = 9.<br>
 * ADJUST = 10.<br>
 * INQUIRY = 11.<br>
 * ACTIVATE = 12.<br>
 * DEACTIVATE = 13.<br>
 * RELOAD = 14.<br>
 * VOID SALE = 15.<br>
 * VOID RETURN = 16.<br>
 * VOID AUTH = 17.<br>
 * VOID POSTAUTH = 18.<br>
 * VOID FORCEAUTH = 19.<br>
 * VOID WITHDRAWAL = 20.<br>
 * REVERSAL = 21.<br>
 * WITHDRAWAL = 22.<br>
 * ISSUE = 23.<br>
 * CASHOUT = 24.<br>
 * REPLACE = 25.<br>
 * MERGE = 26.<br>
 * REPORTLOST = 27.<br>
 * REDEEM = 28.<br>
 * STATUS_CHECK = 29.<br>
 * SETUP = 30.<br>
 * INIT = 31.<br>
 * VERIFY = 32.<br>
 * REACTIVATE = 33.<br>
 * FORCED ISSUE = 34.<br>
 * FORCED ADD = 35.<br>
 * UNLOAD = 36.<br>
 * RENEW = 37.<br>
 * Only above value accepted, other value will be omitted.<br>
 * User can assign the PaymentType by com.PAX.POSLink.ReportRequest.ParseTransType or assign an integer directly.<br>
 * Example:<br>
 *    BatchRequest report = new BatchRequest();<br>
 * 	  batch.PaymentType = batch.ParseTransType("ADJUST");  //recommend<br>
 *    or<br>
 *    report.PaymentType = 10;<br>
 *
 */
@property (nonatomic) int PaymentType;

/**
 * Time/date stamp of transaction.
 * <p>The date time, YYYYMMDDhhmmss<br>
 */
@property (nonatomic) NSString* Timestamp;

/**
 * Store and forward upload type indicator
 * 0: New stored transaction
 * 1: Failed transaction
 * 2: All (upload/resend Failed + New records)
 * <p>Only valid when TransTYpe = SAFUPLOAD and DELETESAFFILE<br>
 */
@property (nonatomic) NSString* SAFIndicator;

/**
 * The log index in terminal.
 * <p>Used only TransType is DELETETRANSACTION<br>
 */

@property (nonatomic) NSString*  RecordNum;

/**
 * Terminal reference number used for follow-up transactions.
 * <p>Used only TransType is DELETETRANSACTION<br>
 */
@property (nonatomic) NSString* RefNum;

/**
 * Retrieve the transaction record with the matching authorization number.
 * <p>Used only TransType is DELETETRANSACTION<br>
 */
@property (nonatomic) NSString* AuthCode;

/**
 * Retrieve the transaction record with the merchant reference number.
 * <p>Used only TransType is DELETETRANSACTION<br>
 */
@property (nonatomic) NSString* ECRRefNum;

/**
 * Extended data in XML format
 */
@property (nonatomic) NSString* ExtData;

/**
 *MultiMerchant Information.
 */
@property (nonatomic) MultiMerchant* MultiMerchant;

/**
 * parse the String transaction type to integer type.
 * @param type could be "BATCHCLOSE","FORCEBATCHCLOSE","BATCHCLEAR"
 * @return an integer identify the TransType, or -1 if parse error.
 */
+(int) ParseTransType:(NSString*)type;

/**
 * parse the String EDC type to integer type.
 * @param type could be "ALL","CREDIT","DEBIT","CHECK","EBT","GIFT","LOYALTY","CASH"
 * @return an integer identify the EDC Type, or -1 if parse error.
 */
+(int) ParseEDCType:(NSString*) type;

+(int)ParseCardType:(NSString*)type;

+(int)ParsePaymentType:(NSString*)type;

-(int)pack:(NSArray**)packOutBuffer;



@end
