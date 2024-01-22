import * as express from 'express';
import * as favicon from 'serve-favicon';
import {v4 as uuidv4} from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { sEventRouter } from './api/events/events.router';
import { GalleryRouter } from './api/gallery/gallery.router';
import { logger } from './util/logger';
import { AuthRouter } from './api/auth.router';
import * as fileUpload from 'express-fileupload';
import { UploadRouter } from './api/uploads.router';

export const textParser = express.text();

let basepath = process.env.NODE_ENV == 'development' ? `src`: `dist`;

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
    logger.debug(`Logging initialized at debug level on date ${Date.now()}`);
}

function genauth(pat:string){
    let key = uuidv4();
    let buff = fs.readFileSync(pat);
    let data = JSON.parse(buff.toString());
    data["authkey"] = key;
    let resbuff = Buffer.from(JSON.stringify(data));
    fs.writeFileSync(process.env.DATAPAT, resbuff);
    return key;
}

app.use('/api/', sEventRouter);
app.use('/api/', GalleryRouter);
app.use('/api/', AuthRouter);
app.use('/api/', UploadRouter);

app.use(fileUpload(/*{ useTempFiles: true, tempFileDir: `/tmp/`}*/));

app.use(express.static(path.join(__dirname, `../public`)));
app.use(express.static(path.join(__dirname, `../uploads`)));

app.use(favicon(path.join(process.cwd(), 'public/favicon.ico')));

app.use('/main', (req: express.Request, res: express.Response) => {
    res.sendFile(process.env.MAINPAT, {root: path.join(process.cwd())});
});

app.use('/dev', (req: express.Request, res: express.Response) => {
    res.sendFile(process.env.DEVPAT, {root: path.join(process.cwd())});
});

app.listen(process.env.PORT, () => {
    console.log(`Authkey: ${genauth(process.env.DATAPAT)}`);
    console.log(`listening on port ${process.env.PORT}`);
});