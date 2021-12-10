//
//  LodgingInfo.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/3/25.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>
NS_ASSUME_NONNULL_BEGIN

@interface LodgingInfo : NSObject
/**
 * The room number.
 */
 @property (nonatomic, copy) NSString *RoomNumber;
/**
 * The folio number. This is the bill/invoice number.
 */
 @property (nonatomic, copy) NSString *FolioNumber;
/**
 * Please see the Room Rates definition.
 */
@property (nonatomic, copy) NSString *RoomRates;
/**
 * The primary charge type for the transaction.
 * 0: Other
 * 1: Lodging/Hotel
 * 2: Restaurant
 * 3: Gift Shop
 * 4: Spa
 * 5: Beauty Services
 * 6: Convention Fee
 * 7: Tennis
 * 8: Golf
 */
 @property (nonatomic, copy) NSString *ChargeType;
/**
 * No-show Indicator.
 * 0: Guest did not show up for the reservation.
 * 1: Guest did show for the reservation.
 */
 @property (nonatomic, copy) NSString *NoShowFlag;
/**
 * The time and date of check-in.
 */
 @property (nonatomic, copy) NSString *CheckInDate;
/**
 * The time and date of check-out.
 */
 @property (nonatomic, copy) NSString *CheckOutDate;
/**
 * Special Program Code.
 * 0: Other/No Code
 * 1: Assured Reservation/Normal Charge/Purchase
 * 2: Delayed Charge
 * 3: Advanced Deposit
 * 4: Express Check-out Service
 */
 @property (nonatomic, copy) NSString *SpecialProgramCode;
/**
 * Departure adjusted amount. Format $$$$$$CC
 */
 @property (nonatomic, copy) NSString *DepartureAdjustedAmount;
/**
 * Please see the Lodging Items Definition.
 */
 @property (nonatomic, copy) NSString *LodgingItems;
@end

NS_ASSUME_NONNULL_END
