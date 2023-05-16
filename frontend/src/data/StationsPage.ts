import {Station} from "./Station";

export type StationsPage = {
    content: Station[],
    prevPageId: number,
    nextPageId: number,
    prev: boolean,
    next: boolean
}