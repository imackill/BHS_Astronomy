//modules
import * as express from 'express';
import { Request, Response} from 'express';
import * as sEventService from './events.service';
import { sEvent, sBaseEvent } from './event.interface';

//router
export const sEventRouter = express.Router();

//controllers


//GET event
sEventRouter.get('/events', async (req: Request, res:Response) => {
    try{
        const events: sEvent[] = await sEventService.findAll();

        res.status(200).send(events);
    }catch(err:any){
        res.status(500).send(err.message);
    }
});


//GET event by id
sEventRouter.get('/events/:id', async (req:Request, res: Response) => {
    const id: string = req.params.id;

    try{
        const event: sEvent = await sEventService.find(id);

        if(event)return res.send(event);

        res.status(404).send('event not found');
    }catch(err:any){
        res.status(500).send(err.message);
    }
});

//POST create event
sEventRouter.post('/events', async(req: Request, res: Response) => {
    try{
        const event: sBaseEvent = req.body;
        const newEvent: sEvent = await sEventService.create(event);

        res.status(201).json(newEvent);
    }catch(err:any){
        res.status(500).send(err.message);
    }
});

//PUT update event by id
sEventRouter.put('/events/:id', async(req: Request, res: Response) => {
    const id: string = req.params.id;
    try{
        const updateParams: sBaseEvent = req.body;
        const eventExisting: sEvent = await sEventService.find(id);

        if(eventExisting){
            await sEventService.update(id, updateParams);
            res.status(204).send(`Event ${id} updated successfully.`);
        }else{
            res.status(404).send(`Event ${id} not found.`);
        }
    }catch(err:any){
        res.status(500).send(err.message);
    }
});

//DELETE event by id
sEventRouter.delete('/events/:id', async(req: Request, res: Response) => {
    const id: string = req.params.id;
    try{
        const eventExisting: sEvent = await sEventService.find(id);

        if(eventExisting){
            await sEventService.remove(id);
            res.status(204).send(`Event ${eventExisting.id} deleted successfully.`);
        }
    }catch(err:any){
        res.status(500).send(err.message);
    }
});
