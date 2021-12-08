//
//  VASResponseInfo.h
//  POSLink
//
//  Created by jim.J on 2020/2/20.
//  Copyright © 2020 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface VASResponseInfo : NSObject
/**
 VAS response code. refer to section VAS Code Definition
 */
@property NSString *VASCode;

/**
 Tokens returned from card. Separated by <RS>. Please see note.
 */
@property NSString *VASData;

/**
 Google SmartTap response data in format of NEDF, the message will be encoded with Base64.
 */
@property NSString *NDEFData;
@end

NS_ASSUME_NONNULL_END
