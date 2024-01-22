import * as express from 'express';
import { Request, Response} from 'express';
import * as fs from 'fs';
import { textParser } from '../server';

function auth(key:string){
    let buff = fs.readFileSync(process.env.DATAPAT);
    let data = JSON.parse(buff.toString());
    return key == data.authkey ? true : false;
}

export const AuthRouter = express.Router();

AuthRouter.post('/auth/', async(req: Request, res: Response) => {
    textParser(req, res, () => {
        try{
            let authbool = auth(req.body);
            if(authbool){
                res.status(200).send(`Authentication Valid.`);
            }else{
                res.status(401).send(`401: Forbidden.`);
            }
        }catch(err:any){
            res.status(500).send(err.message);
        }
    });
});