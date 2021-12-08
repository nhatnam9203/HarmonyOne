//
//  PayloadRequest.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/6/3.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface PayloadRequest : NSObject
/**
 * Indicate the command type.
 * PAYLOAD = 1 - This custom API command will allow special commands required by the hosts without the need to add more commands to the POSLink API. This command will typically be used for APIs that are not a standard across our semi-integrated solutions (i.e., POS Registration, passthru commands to BroadPOS).
 */
@property (nonatomic) int TransType;

/**
 * The data or message to pass through to the terminal. This payload must be in base64 format.
 */
@property (nonatomic) NSString* Payload;

+(int) ParseTransType:(NSString*)type;

- (int)pack:(NSArray**)packOutBuffer;
@end
