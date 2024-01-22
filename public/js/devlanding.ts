//workaround for imports
interface sBaseEvent{
    name: string;
    date: Date;
    time: string;
    description: string;
    location: string;
}

interface BaseImage{
    name: string,
    url: string,
    date: string,
    description: string,
}

const imageEvent = new InputEvent('addImage', {bubbles: true, cancelable: true});
const seventEvent = new InputEvent('addEvent', {bubbles: true, cancelable: true});

const gallery_vignette = <HTMLDivElement>document.getElementById("devpanel_gal");
const event_vignette = <HTMLDivElement>document.getElementById("devpanel_sch");

const gallery_form = <HTMLFormElement>document.getElementById("gallery_form");
document.addEventListener('addImage', (e) => CreateNewImage(e));
const file_input = <HTMLInputElement>document.getElementById("image_file");

const schedule_form = <HTMLFormElement>document.getElementById("schedule_form");
document.addEventListener('addEvent', (e) => CreateNewEvent(e));

const overlaybtns = document.getElementsByClassName("overlaybtn");

let openevents = () => {
    gallery_vignette.setAttribute("class", "devpanel_gal-false");
    event_vignette.setAttribute("class", "devpanel_sch-true");
}

let opengallery = () => {
    event_vignette.setAttribute("class", "devpanel_sch-false");
    gallery_vignette.setAttribute("class", "devpanel_gal-true");
}

let CreateNewImage = async (ev_o: Event) => {
    let raw_data: any = {};
    Array.prototype.slice.call(gallery_form.children).forEach((elem) => {
        if(!(elem.id == "")){
            raw_data[elem.id] = elem.value;
        }
    });
    let file_name = file_input.files!.item(0)!.name;
    let basedata: BaseImage = {
        name:`${raw_data['image_name']}`,
        url:`/api/uploads/${file_name}`,
        date:`${raw_data['image_date']}`,
        description:`${raw_data['image_description']}`,
    }
    await fetch(`${window.location.origin}/api/gallery`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(basedata),
    }).then(res => {
        if(res.status == 500)return console.error(`Something went wrong with your request.`);
    }).catch(err => console.error(err.message));
    let image_to_upload = file_input.files![0];
    if(!image_to_upload == null)console.error(`No image provided`);
    let image = new FormData();
    image.append('file', image_to_upload);
    await fetch(`${window.location.origin}/api/uploads`,{
        method:"POST",
        body: image,
    }).then(res => {
        if(res.status == 500){
            console.error(`Something went wrong with your request.`);
        }
    }).catch(err => console.error(err));
}

let CreateNewEvent = async (ev_o: Event) => {
    let event_name = <HTMLInputElement>document.getElementById('event_name');
    let event_date = <HTMLInputElement>document.getElementById('event_date');
    let event_time = <HTMLInputElement>document.getElementById('event_time');
    let event_description = <HTMLInputElement>document.getElementById('event_description');
    let event_location = <HTMLInputElement>document.getElementById('event_location');
    let basedata: sBaseEvent = {
        name:`${event_name.value}`,
        date: new Date(event_date.value),
        time: event_time.value,
        description: event_description.value,
        location: event_location.value,
    }
    console.log(JSON.stringify(basedata));
    await fetch(`${window.location.origin}/api/events`, {
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(basedata),
    }).then(res => console.log(`Request recieved with status: ${res.status}.`)).catch(err => console.error(err.message));
}

//Updating/PUT requests can only be made through the API for now (I'm gonna do it better with svelte and webpack)

let DeleteDialogue = async (type:string) => {
    let id = await prompt(`Enter ${type} ID:`);
    if(!id)return console.error(`No id for ${type} specified.`);
    let url = new URL(`${window.location.origin}/api/${type}`);
    url.searchParams.append("id", id);
        await fetch(url, {
            method:"DELETE",
            headers:{
                'Content-Type':'text/plain'
            },
            body:`Delete Request for ${type}: ${id}`
        }).then(res => console.log(`Request recieved with status ${res.status}.`)).catch(err => console.error(err.message));
}

let GetByIDDialogue = async (type:string) => {
    let id = await prompt(`Enter ${type} ID:`);
    if(!id)return console.error(`No id for ${type} specified.`);
    let url = new URL(`${window.location.origin}/api/${type}`);
    url.searchParams.append("id", id);
    await fetch(url, {
        method: "DELETE",
        headers:{
            'Content-Type':'text/plain'
        },
        body:`Get Request for ${type}:${id}`
    }).then(res => console.log(`Request received with status ${res.status}.`, res)).catch(err => console.error(err.message));
}

let GetAllDialogue = async (type:string) => {
    let url = new URL(`${window.location.origin}/api/${type}`);
    await fetch(url, {
        method: "DELETE",
        headers:{
            'Content-Type':'text/plain'
        },
        body:`Get Request for ${type}`
    }).then(res => console.log(`Request received with status ${res.status}.`, res)).catch(err => console.error(err.message));
}


//authentication
async function authKey(key: any){
    let raw = await window.fetch(`${window.location.origin}/api/auth/`, {
        headers:{
            'Content-Type':'text/plain',
        },
        method:"POST",
        body:`${key}`,
    });
    authval = ( raw.status == 200 );
    return;
}

function asynckeychecker(){
    if(authval == undefined){
        window.setTimeout(asynckeychecker, 100);
    }else if(authval){
        let devcontent = <HTMLDivElement>document.getElementById(`devcontent`);
        if(!devcontent)return;
        devcontent?.setAttribute("class", "devcontent-true");
        authWindow?.setAttribute("class", "auth-true");
    }   
}

let authval: boolean;

let authWindow = document.getElementById(`authwindow`);
if(!authWindow){
    console.error(`No auth element found in devlanding.html`);
}else{
    authWindow.addEventListener(`submit`, (e: any) => {
        e.preventDefault();
        let key = (<HTMLInputElement>document.getElementById(`authkey`)).value;
        if(key == null || key == undefined)console.error(`No valid key found. Key ${key} unrecognized.`);
        authKey(key);
        asynckeychecker();
    });
}