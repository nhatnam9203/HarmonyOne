//
//  AutoRentalInfo.h
//  POSLink
//
//  Created by Billie Ji on 2021/5/20.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface AutoRentalInfo : NSObject
/**
 * Car-Rental Agreement/Invoice Number issued by the rental agency.
 */
@property (nonatomic, copy) NSString *AgreementNumber;
/**
 * Total rental rate amount per day.
 * Format $$$$$$CC.
 */
@property (nonatomic, copy) NSString *DailyRate;
/**
 * Rental period in days.
 */
@property (nonatomic, copy) NSString *RentalDuration;
/**
 * Car-Rental Insurance Amount. Format $$$$$$CC
 */
@property (nonatomic, copy) NSString *InsuranceAmount;
/**
 * Maximum miles allocated for rental without charge.
 * Total mileage for rental period.
 */
@property (nonatomic, copy) NSString *AllocatedMiles;
/**
 * Amount per mile. Format $$$$$$CC
 */
@property (nonatomic, copy) NSString *MileRate;
/**
 * Name of the renter or name from the driver license.
 */
@property (nonatomic, copy) NSString *Name;
/**
 * The number on the driver license.
 */
@property (nonatomic, copy) NSString *DriverLicenseNumber;
/**
 * Program type for this transaction:
 * 1 - Advance Deposit
 * 2 - Assured Reservation
 * 3 - Delayed charge
 * 4 - Express Service
 * 5 - Normal Charge
 * 6 - No Show Charge
 * 7 - Frequent Renter
 */
@property (nonatomic, copy) NSString *RentalProgramType;
/**
 * The name or ID of the location where the vehicle was picked up.
 */
@property (nonatomic, copy) NSString *PickupLocationName;
/**
 * City where rental period started.
 */
@property (nonatomic, copy) NSString *PickupCity;
/**
 * State where rental period started.
 */
@property (nonatomic, copy) NSString *PickupState;
/**
 * Country where rental period started.
 */
@property (nonatomic, copy) NSString *PickupCountryCode;
/**
 * Start of rental period timestamp. Format YYYYMMDDhhmmss.
 */
@property (nonatomic, copy) NSString *PickupDatetime;
/**
 * The name or ID of the location to where the car is returned.
 */
@property (nonatomic, copy) NSString *ReturnLocation;
/**
 * City where the rental car is returned.
 */
@property (nonatomic, copy) NSString *ReturnCity;
/**
 * State where the rental car was returned.
 */
@property (nonatomic, copy) NSString *ReturnState;
/**
 * Country where the rental car is returned.
 */
@property (nonatomic, copy) NSString *ReturnCountryCode;
/**
 * Date and time when the rental car should be returned. Format YYYYMMDDhhmmss.
 */
@property (nonatomic, copy) NSString *ReturnDatetime;
/**
 * Rental car total odometer reading at the time of return.
 */
@property (nonatomic, copy) NSString *TotalMiles;
/**
 * The customer tax ID.
 */
@property (nonatomic, copy) NSString *CustomerTaxID;
/**
 * Please see Vehicle Class ID definition.
 */
@property (nonatomic, copy) NSString *VehicleClassID;
/**
 * Please see the Extra Charge Item Definition.
 */
@property (nonatomic, copy) NSString *ExtraChargeItems;
/**
 * Car-Rental special services amount. Format $$$$$$CC.
 */
@property (nonatomic, copy) NSString *ExtraChargesAmount;

@end

NS_ASSUME_NONNULL_END
