export enum TimeCategory {
    Hour = 'hour',
    Day = 'day',
    Week = 'week',
    Month = 'month',
    Year = 'year',
    All = 'all'
}

export const TimeDescriptions = {
    [TimeCategory.Hour]: 'Past Hour',
    [TimeCategory.Day]: 'Past 24 Hours',
    [TimeCategory.Week]: 'Past Week',
    [TimeCategory.Month]: 'Past Month',
    [TimeCategory.Year]: 'Past Year',
    [TimeCategory.All]: 'Of All Time'
}
