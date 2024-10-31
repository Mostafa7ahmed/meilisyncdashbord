import { Meilesearch } from "./meilesearch";
import { Source } from "./source";

export interface Isync {

    id: string;
    label: string;
    createdOn: string;
    meiliSearch: Meilesearch;
    source: Source;
}

