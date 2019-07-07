import { SortCategory } from "./SortCategory";
import { TimeCategory } from "./TimeCategory";

export interface SortOption {
    type: SortCategory;
    timeSupported: boolean;
    time?: TimeCategory;
}

export const SortOptions = {
    [SortCategory.Hot]: {
        type: SortCategory.Hot,
        timeSupported: false
    },
    [SortCategory.New]: {
        type: SortCategory.New,
        timeSupported: false
    },
    [SortCategory.Controversial]: {
        type: SortCategory.Controversial,
        timeSupported: true,
        time: TimeCategory.All
    },
    [SortCategory.Top]: {
        type: SortCategory.Top,
        timeSupported: true,
        time: TimeCategory.All
    },
    [SortCategory.Rising]: {
        type: SortCategory.Rising,
        timeSupported: false
    }
}
