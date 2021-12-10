//
//  GoogleNewService.h
//  POSLink
//
//  Created by jim.J on 2020/3/30.
//  Copyright © 2020 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface GoogleNewService : NSObject

/**
 New services type
 0:Unspecified
 1:Valuable
 2:Receipt
 3:Survey
 4:Goods
 5:Signup
 */
@property(nonatomic,copy)NSString *Type;

/**
 Title of the new service
 */
@property(nonatomic,copy)NSString *Title;

/**
 An endpoint where the user may access the new service
 */
@property(nonatomic,copy)NSString *URL;
@end

NS_ASSUME_NONNULL_END
