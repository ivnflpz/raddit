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
    [SortCategory.Hot]: <SortOption>{
        type: SortCategory.Hot,
        timeSupported: false,
        icon: "fire"
    },
    [SortCategory.New]: <SortOption>{
        type: SortCategory.New,
        timeSupported: false,
        icon: "certificate"
    },
    [SortCategory.Controversial]: <SortOption>{
        type: SortCategory.Controversial,
        timeSupported: true,
        time: TimeCategory.All,
        icon: "bolt"
    },
    [SortCategory.Top]: <SortOption>{
        type: SortCategory.Top,
        timeSupported: true,
        time: TimeCategory.All,
        icon: "poll"
    },
    [SortCategory.Rising]: <SortOption>{
        type: SortCategory.Rising,
        timeSupported: false,
        icon: "chart-line"
    }
}
