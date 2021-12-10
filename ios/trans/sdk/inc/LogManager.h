//
//  LogManager.h
//  POSLink
//
//  Created by Li Zhengzhe on 2017/8/3.
//  Copyright © 2017年 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface LogManager : NSObject

/*!
  get LogManager shared instance
 @result
 LogManager shared instance
 */
+ (id)sharedInstance;

/**
 * start recording log
 */
-(void)startLog;

/**
 * stop recording log
 */
-(void)stopLog;

/**
 * write string to log file
 * @param string to be logged
 */
-(void)writeLog: (NSString *)trace;

/**
 * read log from log file according to the date
 * @param date
 * @return the log on date
 */
-(NSString *)readLog:(NSDate *)date;

///**
// * clear all log files
// */
//-(bool)clearAllLog;

///**
// *
// *   POSLOG_LEVEL_NONE    = 0,
// *   POSLOG_LEVEL_ERROR     = 1,
// *   POSLOG_LEVEL_WARNING     = 2,
// *   POSLOG_LEVEL_DEBUG     = 3,
// *   POSLOG_LEVEL_INFO    = 4
// */
//@property (nonatomic, assign) int logLevel;
/**
 *     set Log Level
 *     POSLOG_LEVEL_NONE    = 0,
 *     POSLOG_LEVEL_ERROR     = 1,
 *     POSLOG_LEVEL_WARNING     = 2,
 *     POSLOG_LEVEL_DEBUG     = 3, default
 *     POSLOG_LEVEL_INFO    = 4
 */
-(BOOL)setLogLevel:(int)level;
/**
 * Log file's name
 */
@property (nonatomic, retain) NSString* logFileName;
/**
 * Log file's path
 */
@property (nonatomic, retain) NSString* logFilePath;
/**
 * Indicated how long the log file can be retention. Default value is 30days
 */
@property (nonatomic, assign) int logDays;

///*!
// @abstract load saved configuration
// */
//- (void)load;
//
///*!
// @abstract save configuration
// */
//- (void)save;
@end
