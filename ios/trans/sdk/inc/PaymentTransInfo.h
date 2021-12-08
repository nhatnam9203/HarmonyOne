//
//  PaymentTransInfo.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/2/26.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface PaymentTransInfo : NSObject
/**
 * The discount amount.
 */
@property (nonatomic, copy) NSString *DiscountAmount;
/**
 * The charged amount.
 */
@property (nonatomic, copy) NSString *ChargedAmount;
/**
 * The signature status.
 * “1” means local captured.
 * “2” means aborted.
 * “3” means timeout
 * “4” means NA.
 * “5” means successfully uploaded.
 * “6” means failed during uploading.
 */
@property (nonatomic, copy) NSString *SignatureStatus;
/**
 * 1 means the transaction amount less that Authorization limit and trans is offline approved.
 */
@property (nonatomic, copy) NSString *Fps;
/**
 * 1 means the transaction amount less that Signature limit and no signature on receipt needed. And Signature on MT30 is also not needed.
 */
@property (nonatomic, copy) NSString *FpsSignature;
/**
 * FPS Receipt mode, default as “Both merchant /customer copy”:
 * 1 - merchant only
 * 2 - customer only
 * 3 - no receipt
 */
@property (nonatomic, copy) NSString *FpsReceipt;
/**
 * The original tip amount for CREDIT ADJUSTMENT.
 */
@property (nonatomic, copy) NSString *OrigTip;
/**
 * The EDC type returned for CREDIT/DEBIT prompt is on.
 */
@property (nonatomic, copy) NSString *EdcType;
/**
 * Token.
 */
@property (nonatomic, copy) NSString *Token;
/**
 * Host reference number or (Transaction UID). This field is host dependent; it can be used to run Void/Return transactions.
 */
@property (nonatomic, copy) NSString *HRef;
/**
 * The serial number of the device
 */
@property (nonatomic, copy) NSString *SN;
/**
 * Additional lines for printing from host.
 */
@property (nonatomic, copy) NSString *PrintLine1;
/**
 * Additional lines for printing from host.
 */
@property (nonatomic, copy) NSString *PrintLine2;
/**
 * Additional lines for printing from host.
 */
@property (nonatomic, copy) NSString *PrintLine3;
/**
 * Additional lines for printing from host.
 */
@property (nonatomic, copy) NSString *PrintLine4;
/**
 * Additional lines for printing from host.
 */
@property (nonatomic, copy) NSString *PrintLine5;
/**
 * Transaction settlement date, the format is YYYYMMDD.
 */
@property (nonatomic, copy) NSString *SettlementDate;
/**
 * Host raw response message.
 */
@property (nonatomic, copy) NSString *HostEchoData;
/**
 * PIN entry status.
 * 0 - PIN Bypassed.
 * 1 - PIN Verified.
 */
@property (nonatomic, copy) NSString *PinStatusNum;
/**
 * eWIC card expiry Date, format is YYYYMMDD.
 */
@property (nonatomic, copy) NSString *EwicBenefitExpd;
/**
 * eWIC Balance information group, refer to section eWIC Balance Definition.
 */
@property (nonatomic, copy) NSString *EwicBalance;
/**
 * eWIC Detail information group, refer to section eWIC Detail Definition.
 */
@property (nonatomic, copy) NSString *EwicDetail;
/**
 * Validation code.
 */
@property (nonatomic, copy) NSString *ValidationCode;
/**
 * Get the user language status:
 * 1 - English
 * 2 - French
 * 3 - Chinese
 */
@property (nonatomic, copy) NSString *UserLanguageStatus;
/**
 * Reverse amount, the format is $$$$CC
 */
@property (nonatomic, copy) NSString *ReverseAmount;
/**
 * This field will be returned only when the reversal transaction is partially approved.
 * Reversal status:
 * 0 - Aborted
 * 1 - Timeout
 * 2 - Reversal failed
 * 3 - Reversal success
 */
@property (nonatomic, copy) NSString *ReversalStatus;
/**
 * It is used to specify the serial number for the account where the card token is stored.
 */
@property (nonatomic, copy) NSString *TokenSerialNum;
/**
 * An unique ID for each transaction.
 */
@property (nonatomic, copy) NSString *GlobalUid;
@end

NS_ASSUME_NONNULL_END
