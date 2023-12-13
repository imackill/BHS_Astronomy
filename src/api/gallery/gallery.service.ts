import {v4 as uuidv4} from 'uuid';

import { BaseImage, Image } from './image.interface';
import { Gallery } from './gallery.interface';

let gallery: Gallery = {};

export const findAll = async (): Promise<Image[]> => Object.values(gallery);

export const find = async (id: string): Promise<Image> => gallery[id];

export const create = async (newImage: BaseImage): Promise<Image> => {
    const id = uuidv4();
    gallery[id] = {
        id,
        ...newImage,
    };
    return gallery[id]
}

export const update = async (
    id: string,
    ImageUpdate: BaseImage
): Promise<Image | null> => {
    const image = await find(id);
    if(!image) return null;
    gallery[id] = {id, ...ImageUpdate};
    return gallery[id];
}

export const remove = async (id: string): Promise<null | void> => {
    const image = await find(id);
    if(!image) return null;
    delete gallery[id];
}