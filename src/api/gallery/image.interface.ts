export interface BaseImage{
    name: string,
    url: string,
    date: string,
    description: string,
}

export interface Image extends BaseImage{
    id: string; //assigned with uuid
}