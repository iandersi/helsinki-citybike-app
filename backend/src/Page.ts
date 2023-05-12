import {Journey} from "./Journey";

export type Page = {
    content: Journey[],
    prev: boolean,
    next: boolean
}