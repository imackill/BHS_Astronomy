import * as express from 'express';
import { Response, Request } from 'express';
import * as GalleryService from './gallery.service';
import { BaseImage, Image } from './image.interface';

export const GalleryRouter = express.Router()

//GET
GalleryRouter.get('/gallery/', async (req: Request, res: Response) => {
    try{
        const gallery: Image[] = await GalleryService.findAll();
        res.status(200).send(gallery);
    }catch(err: any){
        res.status(500).send(err.message);
    }
});
//GET:id
GalleryRouter.get('/gallery/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try{
        const image: Image = await GalleryService.find(id);
        if(!image)return null;
        res.status(200).send(image);
    }catch(err: any){
        res.status(500).send(err.message);
    }
});
//POST
GalleryRouter.post('/gallery/', async (req: Request, res: Response) => {
    try{
        const image: BaseImage = req.body;
        const NewImage: Image = await GalleryService.create(image);
        res.status(201).send(NewImage);
    }catch(err: any){
        res.status(500).send(err.message);
    }
});
//PUT:id
GalleryRouter.put('/gallery/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try{
        const UpdateParams: BaseImage = req.body;
        const ImageExisting: Image = await GalleryService.find(id);
        if(ImageExisting){
            await GalleryService.update(id, UpdateParams);
            res.status(204).send(`Image ${id} updated successfully.`);
        }else{
            res.status(404).send(`Image ${id} not found.`);
        }
    }catch(err: any){
        res.status(500).send(err.message);
    }
});
//DELETE:id
GalleryRouter.delete('/gallery/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try{
        const ImageExisting: Image = await GalleryService.find(id);
        if(ImageExisting){
            await GalleryService.remove(id);
            res.status(204).send(`Image ${id} deleted successfully.`);
        }else{
            res.status(404).send(`Image ${id} not found.`)
        }
    }catch(err: any){
        res.status(500).send(err.message);
    }
});