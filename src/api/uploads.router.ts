import * as express from 'express';
import { Request, Response} from 'express';
import * as path from 'path';
import * as multiparty from 'multiparty';
import * as fileUpload from 'express-fileupload';
import * as fs from 'fs';

export const UploadRouter = express.Router();

UploadRouter.post("/uploads/", async(req: Request, res: Response) => {
    try{
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            let file = files.file[0];
            let file_name: string = files.file[0].originalFilename
            let w_file = fs.readFileSync(file.path);
            fs.writeFileSync(path.join(process.cwd(),`/dist/uploads/${file_name}`), w_file);
        });
        return res.status(201).send("Yippee!");
    }catch(err: any){
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

UploadRouter.get('/uploads/:img', (req: Request, res: Response) => {
    let imgName = req.params.img;
    if(!imgName) return res.status(404).send(`Image not provided.`);
    return res.sendFile(path.join(process.cwd(), `/dist/uploads/${imgName}`));
});