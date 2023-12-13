export interface sBaseEvent{
    name: string;
    date: Date;
    time: number;
    description: string;
    location: string;
}

export interface sEvent extends sBaseEvent{
    id: string;
}