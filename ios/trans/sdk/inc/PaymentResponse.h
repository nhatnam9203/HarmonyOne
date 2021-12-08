
//
//  PaymentResponse.h
//  POSLink
//
//  Created by sunny on 15-12-18.
//  Copyright (c) 2015年 pax. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ADDLRspData.h"
#import "VASResponseInfo.h"

#import "TORResponseInfo.h"
#import "Restaurant.h"
#import "CardInfo.h"
#import "PaymentTransInfo.h"
#import "PaymentEmvTag.h"
#import "FleetCard.h"
#import "MultiMerchant.h"

@interface PaymentResponse : NSObject

/**
 * EDC Type
 */
@property (nonatomic, strong) NSString *EDCType;
/**
 * Masked PAN
 */
@property (nonatomic, strong) NSString *MaskedPAN;
/**
 * Track1 Data
 */
@property (nonatomic, strong) NSString *Track1Data;
/**
 * Track2 Data
 */
@property (nonatomic, strong) NSString *Track2Data;
/**
 * Track3 Data
 */
@property (nonatomic, strong) NSString *Track3Data;

/**
 * Returns the transaction auth code from the payment processor .
 */
@property NSString* AuthCode;
/**
 * Approved Amount .
 * <p>Displays the actual amount approved by the host. This could be different from the requested amount<br>
 */
@property NSString* ApprovedAmount;
/**
 * AVS response.
 * <p>Displays the AVS response<br>
 */
@property NSString* AvsResponse;
/**
 * Bogus account number.
 * <p>Two conditions:<br>
 * 1.    Displays the last 4.<br>
 * 2.    Display the full account number<br>
 * It depends on terminal configuration<br>
 */
@property NSString* BogusAccountNum;
/**
 * Displays the card type used.
 * <p>Card type determined by bin range. <br>
 */
@property NSString* CardType;
/**
 * CVV response.
 * <p>CVV response code . <br>
 */
@property NSString* CvResponse;
/**
 * Payment processing host reference number.
 */
@property NSString* HostCode;
/**
 * Payment processing host response.
 */
@property NSString* HostResponse;
/**
 * Host or gateway message .
 */
@property NSString* Message;
/**
 * Gateway reference/token number.
 */
@property NSString* RefNum;
/**
 * Gateway raw response.
 */
@property NSString* RawResponse;
/**
 * Balance remaining on card .
 */
@property NSString* RemainingBalance;
/**
 *  Balance extra on card .
 */
@property NSString* ExtraBalance;

/**
 Service Fee for Credit and Debit transactions, $$$$$$$CC.
 */
@property NSString* ServiceFee;

/**
 Any amount of the original authorization remaining after this void/refund, $$$$$$$CC.
 */
@property NSString* TransactionRemainingAmount;
/**
 * Original requested amount of the transaction .
 */
@property NSString* RequestedAmount;
/**
 * Result code of transaction. Used to determine results of transaction.
 */
@property NSString* ResultCode;
/**
 * Result Txt of transaction
 * <p>Review result txt for details about the transaction. <br>
 */
@property NSString* ResultTxt;
/**
 * Time/date stamp of transaction
 */
@property NSString* Timestamp;
/**
 * Time/date stamp of transaction
 */
@property NSString* SigFileName;
/**
 * Catch all for additional transaction information
 * <p>Extended data in XML format. <br>
 */
@property NSString* ExtData;
/**
 * Restaurant Information.
 */
@property (nonatomic) Restaurant* Restaurant;
/**
 * Response CardInfo.
 */
@property (nonatomic) CardInfo* CardInfo;
/**
 * Response PaymentTransInfo.
 */
@property (nonatomic) PaymentTransInfo* PaymentTransInfo;
/**
 * Response PaymentEmvTag.
 */
@property (nonatomic) PaymentEmvTag* PaymentEmvTag;
/**
 * FleetCard Information.
 */
@property (nonatomic) FleetCard* FleetCard;
/**
 * MultiMerchant Information.
 */
@property (nonatomic) MultiMerchant* MultiMerchant;
/**
 *POS system invoice/tracking number
 */
@property NSString* InvNum;
/**
 * Payment Service 2000
 * Data returned as part of the original authorization response from the issuer, used in follow up transactions (token/card-on-file, reversals, incremental). Format varies by card scheme.
 */
@property NSString* PaymentService2000;
/**
 * Authorization data used in follow up transactions.
 */
@property NSString* AuthorizationResponse;
/**
 * signature data
 */
@property NSString *signData;
/**
 * * The gift card type.
 Values:
 C - Custom Value Gift Card
 P - Predetermine Value Gift Card
 */
@property NSString *GiftCardType;
/**
 C - Checking
 S - Saving
 D - Default

 */
@property NSString *DebitAccountType;

/**
 VAS Response
 */
@property (nonatomic,strong) VASResponseInfo *VASResponseInfo;

/**
 ADDLRspData
 */
@property (nonatomic,strong) ADDLRspData *ADDLRspData;

/**
 * TORResponseInfo
 */
@property (nonatomic,strong) TORResponseInfo *TORResponseInfo;

/**
 * Additional detailed message or code returned from the host.
 */
@property (nonatomic,copy) NSString *HostDetailedMessage;

/**
 * Transaction Integrity Class is assigned by MasterCard for a U.S. merchant in an authorization response message
 */
@property (nonatomic, copy) NSString *TransactionIntegrityClass;

/**
 * It's returned by BANA for transaction tracking.
 */
@property (nonatomic, copy) NSString *RetrievalReferenceNumber;

/**
 * This information is stored for the integrator for receipts, additional details on a transaction decline, reporting, etc.
 */
@property (nonatomic, copy) NSString *IssuerResponseCode;

-(int)unpack:(NSArray*)data;

@end
