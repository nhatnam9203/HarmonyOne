//
//  GoogleServiceUpdate.h
//  POSLink
//
//  Created by jim.J on 2020/3/30.
//  Copyright © 2020 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface GoogleServiceUpdate : NSObject
/**
 Service update ID
 */
@property(nonatomic,copy)NSString *UpdateID;

/**
 Provide update operations for application services
 0:No operation
 1:Remove service object
 2:Set balance
 3:Add balance
 4:Subtract balance
 5:Free
 */
@property(nonatomic,copy)NSString *UpdateOperation;

/**
 Details of service updates
 */
@property(nonatomic,copy)NSString *Updatepayload;

@end

NS_ASSUME_NONNULL_END
