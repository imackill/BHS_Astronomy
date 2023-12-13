import * as express from 'express';
import * as favicon from 'serve-favicon';
import {v4 as uuidv4} from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { sEventRouter } from './api/events/events.router';
import { GalleryRouter } from './api/gallery/gallery.router';
import { logger } from './util/logger';

let basepath = process.env.NODE_ENV == 'development' ? `src`: `dist`;

const app = express();

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

app.use(express.static(path.join(__dirname, `../public`)));

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