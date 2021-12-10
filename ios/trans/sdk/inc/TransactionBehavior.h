//
//  TransactionBehavior.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/2/25.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TransactionBehavior : NSObject
/**
 * The card type bitmap, refer to Card Type Bitmap definition.
 * It makes POS system available to control which card types accepted for current command.
 */
@property (nonatomic, copy) NSString *AcceptedCardType;
/**
 * Additional response data request flag;
 */
@property (nonatomic, copy) NSString *AddlRspDataFlag;
/**
 * Card Present mode for current command:
 */
@property (nonatomic, copy) NSString *CardPresentMode;
/**
 * Indicate which debit network to use.
 */
@property (nonatomic, copy) NSString *DebitNetwork;
/**
 * The entry mode bitmap, refer to Entry Mode Bitmap Definition.
 * It makes POS system available to control which entry mode accepted for current command.
 */
@property (nonatomic, copy) NSString *EntryMode;
/**
 * Force terminal to do commercial transaction flag:
 */
@property (nonatomic, copy) NSString *ForceCC;
/**
 * Force terminal to do FSA transaction flag:
 */
@property (nonatomic, copy) NSString *ForceFsa;
/**
 * 8 digits bitmap for disabling program prompts.
 */
@property (nonatomic, copy) NSString *ProgramPromptsFlag;
/**
 * Receipt printing for current command, default as “0 – No receipt”, it will override the ReceiptPrint settings in the terminal.
 * 0 – no receipt
 * 1 - merchant only
 * 2 - customer only
 * 3 - Both merchant /customer copy
 */
@property (nonatomic, copy) NSString *ReceiptPrintFlag;
/**
 * Whether to acquire the signature data in payment response.
 */
@property (nonatomic, copy) NSString *SignatureAcquireFlag;
/**
 * The ECR supports signature printing and terminal supports signature capture.
 * If this field exists, the values below are valid:
 * ‘0’- Do Not Capture,
 * ‘1’- Capture.
 * Default value = “0”.
 */
@property (nonatomic, copy) NSString *SignatureCaptureFlag;
/**
 * Whether to upload the signature.
 */
@property (nonatomic, copy) NSString *SignatureUploadFlag;
/**
 * Whether to report status back.
 */
@property (nonatomic, copy) NSString *StatusReportFlag;
/**
 * The value is as below:
 * 0: not need enter tip on terminal.
 * 1: need enter tip on terminal.
 */
@property (nonatomic, copy) NSString *TipRequestFlag;
/**
 * Set the user language:
 * 1 – English
 * 2 – French
 * 3 – Chinese
 */
@property (nonatomic, copy) NSString *UserLanguage;
@end

NS_ASSUME_NONNULL_END
