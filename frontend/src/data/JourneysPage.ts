import {Journey} from "./Journey";

export type JourneysPage = {
    content: Journey[],
    prevPageId: number,
    nextPageId: number,
    prev: boolean,
    next: boolean
}