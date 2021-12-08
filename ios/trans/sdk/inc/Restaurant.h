//
//  Restaurant.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/2/25.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Restaurant : NSObject
/**
 * The guest number.
 */
@property (nonatomic, copy) NSString *GuestNumber;
/**
 * The table number.
 */
@property (nonatomic, copy) NSString *TableNumber;
/**
 * The ticket number.
 */
@property (nonatomic, copy) NSString *TicketNumber;
@end

NS_ASSUME_NONNULL_END
