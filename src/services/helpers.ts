/**
 * Helper functions to utilize through the different service files
*/

import { Timestamp } from '../@types/commons';

/**
 * Helper functions that returns the snapshot of the current time
 * 
 * @returns current timestamp for this instance in time
 */
export function getCurrentTimestamp ():Timestamp {
    return Timestamp.now();
}