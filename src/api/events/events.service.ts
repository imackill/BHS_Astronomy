import {v4 as uuidv4} from 'uuid';

//interfaces
import { sBaseEvent, sEvent } from "./event.interface";
import { sEvents } from "./events.interface";

//memory store
let events: sEvents = {};

//methods

export const findAll = async (): Promise<sEvent[]> => Object.values(events);
export const find = async (id: string): Promise<sEvent> => events[id];

export const create = async (newEvent: sBaseEvent): Promise<sEvent> => {
    const id = uuidv4();
    events[id] = {
        id,
        ...newEvent,
    };

    return events[id];
}

export const update = async (
    id: string,
    eventUpdate: sBaseEvent
): Promise<sEvent | null> => {
    const event = await find(id);
    if(!event)return null;
    events[id] = {id, ...eventUpdate};

    return events[id];
}

export const remove = async (id: string): Promise<null | void> => {
    const event = await find(id);
    if(!event)return null;
    delete events[id];
}