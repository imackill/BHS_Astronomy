import * as express from 'express';
import { Request, Response} from 'express';
import * as fs from 'fs';

function auth(key:string){
    let buff = fs.readFileSync(process.env.DATAPAT);
    let data = JSON.parse(buff.toString());
    return key == data.authkey ? true : false;
}

export const AuthRouter = express.Router();

AuthRouter.get('auth/:key', async(req: Request, res: Response) => {
    const authkey = req.params.authkey;
    try{
        let authbool = auth(authkey);
        if(authbool){
            res.status(200).send(`Authentication Valid.`);
            //Do some auth stuff (probably have devlanding use this route)
        }else{
            res.status(401).send(`401: Forbidden.`);
        }
    }catch(err:any){
        res.status(500).send(err.message);
    }
});