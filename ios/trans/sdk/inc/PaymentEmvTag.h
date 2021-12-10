//
//  PaymentEmvTag.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/2/26.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface PaymentEmvTag : NSObject
/**
 * Transaction Certificate, tag 9F26
 */
@property (nonatomic, copy) NSString *Tc;
/**
 * Terminal Verification Results, tag 95
 */
@property (nonatomic, copy) NSString *Tvr;
/**
 * Application Dedicated File (ADF) Name, tag 4F
 */
@property (nonatomic, copy) NSString *Aid;
/**
 * Transaction Status Information, tag 9B
 */
@property (nonatomic, copy) NSString *Tsi;
/**
 * Application Transaction Counter, tag 9F36
 */
@property (nonatomic, copy) NSString *Atc;
/**
 * Application Label, tag 50
 */
@property (nonatomic, copy) NSString *AppLabel;
/**
 * Application Preferred Name, tag 9F12
 */
@property (nonatomic, copy) NSString *AppPreferName;
/**
 * Issuer Application Data, tag 9F10
 */
@property (nonatomic, copy) NSString *Iad;
/**
 * Authorization Response Code, tag 8A
 * i.e. Contact tag 8A:
 * Y1: Offline approved
 * Y3: Unable to go online, offline approved
 * Z1: Offline declined
 * Z3: Unable to go online, offline declined
 * Other: Online approved or declined
 */
@property (nonatomic, copy) NSString *Arc;
/**
 * Cryptogram Information Data, tag 9F27
 */
@property (nonatomic, copy) NSString *Cid;
/**
 * Cardholder Verification Method (CVM) Codes,
 * 0 - Fail CVM processing
 * 1 - Plaintext Offline PIN Verification
 * 2 - Online PIN
 * 3 - Plaintext Offline PIN and Signature
 * 4 - Enciphered Offline PIN Verification
 * 5 - Enciphered Offline PIN Verification and Signature
 * 6 - Signature
 * 7 - No CVM Required
 * 8 - On Device CVM
 */
@property (nonatomic, copy) NSString *Cvm;
/**
 * Authorisation Request Cryptogram, tag 9F26.
 * Returned when Quick Chip is enabled
 */
@property (nonatomic, copy) NSString *Arqc;
/**
 * Authorization Code, tag 89
 */
@property (nonatomic, copy) NSString *Ac;
/**
 * Application Interchange Profile, tag 82
 */
@property (nonatomic, copy) NSString *Aip;
/**
 * Tag 9F07.
 * Indicates issuer’s specified restrictions on the geographic usage and services allowed for the application
 */
@property (nonatomic, copy) NSString *Auc;
/**
 * Application Version Number, tag 9F08
 */
@property (nonatomic, copy) NSString *Avn;
/**
 * Card Risk Management Data Object List 2 (CDOL2), tag 8D
 */
@property (nonatomic, copy) NSString *Cdol2;
/**
 * Host Responded EMV Data, may include tag 8A/89/91/71/72
 */
@property (nonatomic, copy) NSString *Hred;
/**
 * Tag 9F0D.
 * Specifies the issuer’s conditions that cause a transaction to be rejected if it might have been approved online, but the terminal is unable to process the transaction online
 */
@property (nonatomic, copy) NSString *IacDefault;
/**
 * Tag 9F0E.
 * Specifies the issuer’s conditions that cause the denial of a transaction without attempt to go online
 */
@property (nonatomic, copy) NSString *IacDenial;
/**
 * Tag 9F0F.
 * DSpecifies the issuer’s conditions that cause a transaction to be transmitted online.
 */
@property (nonatomic, copy) NSString *IacOnline;
/**
 * Issuer Authentication Data, tag 91
 */
@property (nonatomic, copy) NSString *IssuerAuthData;
/**
 * Specifies the acquirer’s conditions that cause a transaction to be rejected if it might have been approved online, but the terminal is unable to process the transaction online
 */
@property (nonatomic, copy) NSString *TacDefault;
/**
 * Specifies the acquirer’s conditions that cause the denial of a transaction without attempt to go online
 */
@property (nonatomic, copy) NSString *TacDenial;
/**
 * Specifies the acquirer’s conditions that cause a transaction to be transmitted
 */
@property (nonatomic, copy) NSString *TacOnline;
@end

NS_ASSUME_NONNULL_END
