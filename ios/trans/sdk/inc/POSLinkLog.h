//
//  POSLinkLog.h
//  POSLink
//
//  Created by Nick.z on 2018/10/10.
//  Copyright © 2018年 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

//POSLOG_LEVEL_INFO deprecated!
/*!
 @abstract log level enumeration
 @constant POSLOG_LEVEL_NONE   log level none
 @constant POSLOG_LEVEL_ERROR    log level error
 @constant POSLOG_LEVEL_WARNING    log level warning
 @constant POSLOG_LEVEL_DEBUG    log level debug
 @constant POSLOG_LEVEL_INFO   log level verbose information
 */
typedef enum {
    POSLOG_LEVEL_NONE    = 0,
    POSLOG_LEVEL_ERROR     = 1,
    POSLOG_LEVEL_WARNING     = 2,
    POSLOG_LEVEL_DEBUG     = 3,
    POSLOG_LEVEL_INFO    = 4
} POSLinkLogLevel;

#ifdef __cplusplus
extern "C" {
#endif
    
    /*!
     @abstract set current log level to the specified one
     @discussion the default log level is LOG_LEVEL_WRN.
     set to LOG_LEVEL_NONE to disable all log outputs,set to LOG_LEVEL_INFO for most verbose log outputs
     @param level
     the specified log level to set
     */
void POSLinkSetLogLevel(POSLinkLogLevel level);
    
#pragma mark - internal interfaces
    /*!
     @abstract the internal log utilities
     */
void POSLinkDebug(POSLinkLogLevel logLevelIn, const char *fileName, int lineNumber, NSString *fmt, ...);
#define MLogInfo(format...) POSLinkDebug(POSLOG_LEVEL_INFO, __FILE__,__LINE__,format)
#define MLogDebug(format...) POSLinkDebug(POSLOG_LEVEL_DEBUG, __FILE__,__LINE__,format)
#define MLogWarning(format...) POSLinkDebug(POSLOG_LEVEL_WARNING, __FILE__,__LINE__,format)
#define MLogError(format...) POSLinkDebug(POSLOG_LEVEL_ERROR, __FILE__,__LINE__,format)
    
#ifdef __cplusplus
}
#endif

