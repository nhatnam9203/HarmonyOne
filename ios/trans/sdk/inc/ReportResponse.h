//
//  ReportResponse.h
//  POSLink
//
//  Created by sunny on 15-12-18.
//  Copyright (c) 2015年 pax. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ADDLRspData.h"
#import "TORResponseInfo.h"
#import "Restaurant.h"
#import "CardInfo.h"
#import "FleetCard.h"
#import "MultiMerchant.h"
#import "AVSInformation.h"
#import "MOTOECommerce.h"

@interface ReportResponse : NSObject

/**
 * Result code of transaction.
 * <p>Used to determine results of transaction.<br>
 */
@property (nonatomic) NSString*ResultCode;

/**
 * Result Txt of transaction.
 */
@property (nonatomic) NSString*ResultTxt;

/**
 * EDC type.
 * <p>could be "ALL","CREDIT", "DEBIT", "CHECK","EBT", "GIFT", "LOYALTY","CASH" <br>
 * EBT include EBT_FOODSTAMP and EBT_CASHBENEFIT<br>
 */
@property (nonatomic) NSString*EDCType;

/**
 *The total record number need reported.
 */
@property (nonatomic) NSString*TotalRecord;

/**
 *The current reporting record number.
 */
@property (nonatomic) NSString*RecordNumber;

/**
 *The payment type.
 * type could be "UNKNOWN",
 "AUTH",
 "SALE",
 "RETURN",
 "VOID",
 "POSTAUTH",
 "FORCEAUTH",
 "CAPTURE",
 "REPEATSALE",
 "CAPTUREALL",
 "ADJUST",
 "INQUIRY",
 "ACTIVATE",
 "DEACTIVATE",
 "RELOAD",
 "VOID SALE",
 "VOID RETURN",
 "VOID AUTH",
 "VOID POSTAUTH",
 "VOID FORCEAUTH",
 "VOID WIDTHDRAWAL",
 "REVERSAL",
 "WIDTHDRAWAL",
 "ISSUE",
 "CASEOUT",
 "REPLACE",
 "MERGE",
 "REPORTLOST",
 "REDEEM",
 "STATUS_CHECK",
 "SETUP",
 "INIT",
 "VERIFY"
 *<p>It returns strings such as "SALE".<br>
 */
@property (nonatomic) NSString*PaymentType;

/**
 *The original payment type.
 * type could be "UNKNOWN",
 "AUTH",
 "SALE",
 "RETURN",
 "VOID",
 "POSTAUTH",
 "FORCEAUTH",
 "CAPTURE",
 "REPEATSALE",
 "CAPTUREALL",
 "ADJUST",
 "INQUIRY",
 "ACTIVATE",
 "DEACTIVATE",
 "RELOAD",
 "VOID SALE",
 "VOID RETURN",
 "VOID AUTH",
 "VOID POSTAUTH",
 "VOID FORCEAUTH",
 "VOID WIDTHDRAWAL",
 "REVERSAL",
 "WIDTHDRAWAL",
 "ISSUE",
 "CASEOUT",
 "REPLACE",
 "MERGE",
 "REPORTLOST",
 "REDEEM",
 "STATUS_CHECK",
 "SETUP",
 "INIT",
 "VERIFY"
 *<p>It returns strings such as "SALE".<br>
 */
@property (nonatomic) NSString*OrigPaymentType;

/**
 * Host returns trace number.
 * <p> If host returns it, this field is mandatory and it needs to be printed on the receipt. <br>
 */
@property (nonatomic) NSString*HostTraceNum;

/**
 * Host returns batch number.
 * <p> If host returns it, this field is mandatory.<br>
 */
@property (nonatomic) NSString*BatchNum;

/**
 * A unique transaction identifier from bank/card brand.
 */
@property (nonatomic) NSString*TransactionIdentifier ;


/**
 * Returns the transaction auth code from the payment processor.
 */
@property (nonatomic) NSString*AuthCode;

/**
 * Payment processing host reference number.
 */
@property (nonatomic) NSString*HostCode;

/**
 * Payment processing host response.
 */
@property (nonatomic) NSString*HostResponse;

/**
 * Host returns error message.
 * <p>If host returns error message, this field is mandatory.<br>
 */
@property (nonatomic) NSString*Message;

/**
 * Approved Amount.
 * <p>Displays the actual amount approved by the host. <br>
 * This could be different from the requested amount<br>
 */
@property (nonatomic) NSString*ApprovedAmount;

/**
 *Balance remaining on card.
 *<p>Balance remaining on gift or prepaid card amount information.<br>
 *If the EDCType is EBT,it is the cash benefit account<br>
 */
@property (nonatomic) NSString*RemainingBalance;
/**
 *Balance remaining on card.
 *<p>Balance remaining on EBT card food stamp account.<br>
 *Only used while EDCType is EBT<br>
 */
@property (nonatomic) NSString*ExtraBalance;

/**
 *Bogus account number.
 *<p>Two conditions:
 *   1. Displays the last 4.<br>
 *   2. Display the full account number.<br>
 *   It depends on terminal configuration<br>
 */
@property (nonatomic) NSString*BogusAccountNum;

/**
 *Displays the card type used.
 *<p>Card type determined by bin range.<br>
 */
@property (nonatomic) NSString*CardType;

/**
 *CVV response code.
 */
@property (nonatomic) NSString*CvResponse;

/**
 *Gateway reference/token number.
 */
@property (nonatomic) NSString*RefNum;

/**
 *The ECR reference number, it is echo back from request.
 */
@property (nonatomic) NSString*ECRRefNum;

/**
 *Time/date stamp of transaction.
 */
@property (nonatomic) NSString*Timestamp;

/**
 *POS system invoice/tracking number
 */
@property (nonatomic) NSString*InvNum;

/**
 *Payment Service 2000
 *Data returned as part of the original authorization response from the issuer, used in follow up transactions (token/card-on-file, reversals, incremental). Format varies by card scheme.
 */
@property (nonatomic) NSString*PaymentService2000;

/**
 *Authorization data used in follow up transactions.
 */
@property (nonatomic) NSString*AuthorizationResponse;

/**
 *Employee/clerk id.
 */
@property (nonatomic) NSString*ClerkID;

/**
 *Shift id number.
 */
@property (nonatomic) NSString*ShiftID;

/**
 *If host supports various host report, this will be returned.
 */
@property (nonatomic) NSString*ReportType;

/**
 *Credit transaction total counts.
 *<p>Doesn't contain void and auth transaction count<br>
 */
@property (nonatomic) NSString*CreditCount;

/**
 *Credit transaction total amount.
 *<p>Doesn't contain void and auth transaction amount<br>
 */
@property (nonatomic) NSString*CreditAmount;

/**
 *Debit transaction total counts.
 */
@property (nonatomic) NSString*DebitCount;

/**
 *Debit transaction total amount.
 */
@property (nonatomic) NSString*DebitAmount;

/**
 *EBT transaction total counts.
 */
@property (nonatomic) NSString*EBTCount;

/**
 *EBT transaction total amount.
 */
@property (nonatomic) NSString*EBTAmount;

/**
 *Gift transaction total counts.
 */
@property (nonatomic) NSString*GiftCount;

/**
 *Gift transaction total amount.
 */
@property (nonatomic) NSString*GiftAmount;

/**
 *Loyalty transaction total counts.
 */
@property (nonatomic) NSString*LoyaltyCount;

/**
 *Loyalty transaction total amount.
 */
@property (nonatomic) NSString*LoyaltyAmount;

/**
 *Cash transaction total counts.
 */
@property (nonatomic) NSString*CashCount;

/**
 *Cash transaction total amount.
 */
@property (nonatomic) NSString*CashAmount;

/**
 *Check transaction total counts.
 */
@property (nonatomic) NSString*CHECKCount;

/**
 *Check transaction total amount.
 */
@property (nonatomic) NSString*CHECKAmount;

/**
 *Total visa card amount in SAF records.
 */
@property (nonatomic) NSString*VisaAmount;

/**
 *Total visa card count in SAF records.
 */
@property (nonatomic) NSString*VisaCount;

/**
 *Total MasterCard card amount in SAF records.
 */
@property (nonatomic) NSString*MasterCardAmount;

/**
 *Total MasterCard card count in SAF records.
 */
@property (nonatomic) NSString*MasterCardCount;

/**
 *Total AMEX card amount in SAF records.
 */
@property (nonatomic) NSString*AMEXAmount;

/**
 *Total AMEX card count in SAF records.
 */
@property (nonatomic) NSString*AMEXCount;

/**
 *Total Diners card amount in SAF records.
 */
@property (nonatomic) NSString*DinersAmount;

/**
 *Total Diners card count in SAF records.
 */
@property (nonatomic) NSString*DinersCount;

/**
 *Total Discover card amount in SAF records.
 */
@property (nonatomic) NSString*DiscoverAmount;

/**
 *Total Discover card count in SAF records.
 */
@property (nonatomic) NSString*DiscoverCount;

/**
 *Total JCB card amount in SAF records.
 */
@property (nonatomic) NSString*JCBAmount;

/**
 *Total JCB card count in SAF records.
 */
@property (nonatomic) NSString*JCBCount;

/**
 *Total enRoute card amount in SAF records.
 */
@property (nonatomic) NSString*enRouteAmount;

/**
 *Total enRoute card count in SAF records.
 */
@property (nonatomic) NSString*enRouteCount;

/**
 *Total Extended card amount in SAF records.
 */
@property (nonatomic) NSString*ExtendedAmount;

/**
 *Total Extended card count in SAF records.
 */
@property (nonatomic) NSString*ExtendedCount;

/**
 *Total VisaFleet card amount in SAF records.
 */
@property (nonatomic) NSString*VisaFleetAmount;

/**
 *Total VisaFleet card count in SAF records.
 */
@property (nonatomic) NSString*VisaFleetCount;

/**
 *Total MasterCardFleet card amount in SAF records.
 */
@property (nonatomic) NSString*MasterCardFleetAmount;

/**
 *Total MasterCardFleet card count in SAF records.
 */
@property (nonatomic) NSString*MasterCardFleetCount;

/**
 *Total FleetOne card amount in SAF records.
 */
@property (nonatomic) NSString*FleetOneAmount;

/**
 *Total FleetOne card count in SAF records.
 */
@property (nonatomic) NSString*FleetOneCount;

/**
 *Total Fleetwide card amount in SAF records.
 */
@property (nonatomic) NSString*FleetwideAmount;

/**
 *Total Fleetwide card count in SAF records.
 */
@property (nonatomic) NSString*FleetwideCount;

/**
 *Total Fuelman card amount in SAF records.
 */
@property (nonatomic) NSString*FuelmanAmount;

/**
 *Total Fuelman card count in SAF records.
 */
@property (nonatomic) NSString*FuelmanCount;

/**
 *Total Gascard card amount in SAF records.
 */
@property (nonatomic) NSString*GascardAmount;

/**
 *Total Gascard card count in SAF records.
 */
@property (nonatomic) NSString*GascardCount;

/**
 *Total Voyager card amount in SAF records.
 */
@property (nonatomic) NSString*VoyagerAmount;

/**
 *Total Voyager card count in SAF records.
 */
@property (nonatomic) NSString*VoyagerCount;

/**
 *Total WrightExpress card amount in SAF records.
 */
@property (nonatomic) NSString*WrightExpressAmount;

/**
 *Total WrightExpress card count in SAF records.
 */
@property (nonatomic) NSString*WrightExpressCount;

/**
 *Catch all for additional transactional information.
 *<p>Extended data in XML format<br>
 */
@property (nonatomic) NSString*ExtData;

/**
 * Restaurant Information.
 */
@property (nonatomic) Restaurant* Restaurant;

/**
 * Response CardInfo.
 */
@property (nonatomic) CardInfo* CardInfo;

/**
 * FleetCard Information.
 */
@property (nonatomic) FleetCard* FleetCard;

/**
 * MultiMerchant Information.
 */
@property (nonatomic) MultiMerchant* MultiMerchant;

/**
 * Response AVSInformation.
 */
@property (nonatomic) AVSInformation* AVSInformation;

/**
 * Response MOTOECommerce.
 */
@property (nonatomic) MOTOECommerce* MOTOECommerce;

/**
 *Catch all for additional transactional total amount and count information.
 *<p>Transaction total data in XML format<br>
 */
@property (nonatomic) NSString*TransTotal;
/**
 Define “ADDLRSPDATA” as additional host/terminal response data.
 */
@property (nonatomic,strong)  ADDLRspData *ADDLRspData;

/**
 TORResponseInfo
*/
@property (nonatomic,strong) TORResponseInfo *TORResponseInfo;
/**
 Transaction Integrity Class is assigned by MasterCard for a U.S. merchant in an authorization response message
 */
@property (nonatomic,copy) NSString *TransactionIntegrityClass;
/**
 Any amount of the original authorization remaining after this void/refund, $$$$$$$CC.
 */
@property NSString* TransactionRemainingAmount;

/**
 * It's returned by BANA for transaction tracking.
 */
@property (nonatomic, copy) NSString *RetrievalReferenceNumber;

/**
 * Additional detailed message or code returned from the host.
 */
@property (nonatomic,copy) NSString *HostDetailedMessage;

/**
 * This information is stored for the integrator for receipts, additional details on a transaction decline, reporting, etc.
 */
@property (nonatomic, copy) NSString *IssuerResponseCode;
-(int)unpack:(NSArray*)dataRespArry;

@end
