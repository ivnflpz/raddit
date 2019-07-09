import { SortCategory } from "./SortCategory";
import { TimeCategory } from "./TimeCategory";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface SortOption {
    type: SortCategory;
    timeSupported: boolean;
    time?: TimeCategory;    
    icon: IconProp;
}

export const SortOptions = {
    [SortCategory.Hot]: {
        type: SortCategory.Hot,
        timeSupported: false,
        icon: "fire"
    } as SortOption,
    [SortCategory.New]: {
        type: SortCategory.New,
        timeSupported: false,
        icon: "certificate"
    } as SortOption,
    [SortCategory.Controversial]: {
        type: SortCategory.Controversial,
        timeSupported: true,
        time: TimeCategory.All,
        icon: "bolt"
    } as SortOption,
    [SortCategory.Top]: {
        type: SortCategory.Top,
        timeSupported: true,
        time: TimeCategory.All,
        icon: "poll"
    } as SortOption,
    [SortCategory.Rising]: {
        type: SortCategory.Rising,
        timeSupported: false,
        icon: "chart-line"
    } as SortOption
}
