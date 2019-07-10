import { TimeCategory } from "./TimeCategory";

export interface TimeOption {
    description: string;
    expiration_sec: number;
}

export const TimeOptions = {
    [TimeCategory.Hour]: {
        description: 'Past Hour',
        expiration_sec: 120
    } as TimeOption,
    [TimeCategory.Day]: {
        description: 'Past 24 Hours',
        expiration_sec: 600
    } as TimeOption,
    [TimeCategory.Week]: {
        description: 'Past Week',
        expiration_sec: 3600
    } as TimeOption,
    [TimeCategory.Month]: {
        description: 'Past Month',
        expiration_sec: 3600
    } as TimeOption,
    [TimeCategory.Year]: {
        description: 'Past Year',
        expiration_sec: 3600
    } as TimeOption,
    [TimeCategory.All]: {
        description: 'Of All Time',
        expiration_sec: 3600
    } as TimeOption
}
