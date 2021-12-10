//
//  FleetCard.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/2/24.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface FleetCard : NSObject
/**
 * Identifies the customer data
 */
@property (nonatomic, copy) NSString *CustomerData;
/**
 * Identifies the department number
 */
@property (nonatomic, copy) NSString *DepartmentNumber;
/**
 * Identifies the unencrypted driver number or identification number.
 */
@property (nonatomic, copy) NSString *DriverId;
/**
 * Identifies the fleet employee number
 */
@property (nonatomic, copy) NSString *EmployeeNumber;
/**
 * Prompt code for petroleum industry to determine the customer prompting at the device for manual entry.
 */
@property (nonatomic, copy) NSString *FleetPromptCode;
/**
 * Identifies the job id.
 */
@property (nonatomic, copy) NSString *JobId;
/**
 * Identifies the job number
 */
@property (nonatomic, copy) NSString *JobNumber;
/**
 * Identifies the license number of the fleet card user
 */
@property (nonatomic, copy) NSString *LicenseNumber;
/**
 * Identifies the vehicle’s odometer reading keyed in by the customer or clerk, numeric only
 */
@property (nonatomic, copy) NSString *Odometer;
/**
 * Identifies the user id
 */
@property (nonatomic, copy) NSString *UserId;
/**
 * Identifies the vehicle id number, numeric only
 */
@property (nonatomic, copy) NSString *VehicleId;
/**
 * Identifies the vehicle number
 */
@property (nonatomic, copy) NSString *VehicleNumber;

@end

NS_ASSUME_NONNULL_END
