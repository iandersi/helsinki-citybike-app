import {Journey} from "./Journey";

export type Page = {
    content: Journey[],
    prevPageId: number,
    nextPageId: number,
    prev: boolean,
    next: boolean
}