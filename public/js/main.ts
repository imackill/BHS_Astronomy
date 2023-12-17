interface AstronomySchedule{
    cell_count: number,
    render: boolean,
    data: Array<any>,
    id: string,
    html: string,
}
class AstronomySchedule{
    constructor(id: string){
        this.id = id;
        this.render = false;
        this.fetch_schedule().then(res => {
            this.render = true;
            this.data = res;
            this.toHTML();
        });
    }
    toHTML(){
        if(this.render && this.cell_count > 0){
            let columns: string = "";
            this.data.forEach(elem => {
                let event = this.genElem(elem);
                columns.concat(event);
            });
            let body: string = `<tbody id="${this.id}" class="table_body"><tr>${columns}</tr></tbody>`;
            let wrapper: string = `<table class="table">${body}</table>`;
            this.html = wrapper;
            return wrapper;
        }else{
            this.html = `<a style="font-size: 2rem">There are no events scheduled right now.</a>`;
        }
    }
    genElem(event: any){
        let html: string = `
            <td id="${event.id}">
                <h3 class="event_title">${event.name}</h3>
                <div class="event_content">
                    <a class="event_datetime">${event.date}, ${event.time}</a>
                    <a class="event_text">${event.description}</a>
                </div>
            </td>
        `;
        return html;
    }
    fetch_schedule = async (): Promise<Array<any>> => {
        let raw = await fetch(`${window.location.origin}/api/events/`);
        let data: Array<any> = await raw.json().catch(e => console.error(e.message));;
        return data;
    }
}

let schedule = new AstronomySchedule("schedule_elem");
let scheduleElement = document.getElementById(`schedule_wrap`);

function RenderSchedule() {
    if(!scheduleElement)return console.error("Schedule placeholder not found.");
    
    if((schedule.render === false)) {
       window.setTimeout(RenderSchedule, 100); 
    }else{
        scheduleElement.innerHTML = schedule.html;
    }
}
RenderSchedule();

interface AstronomyGallery{
    id: string,
    cellCount: number,
    render: boolean,
    html: string,
    data: Array<any>,
}

class AstronomyGallery{
    constructor(id: string){
        this.id = id;
        this.render = false;
        this.fetch_gallery().then(res => {
            this.render = true;
            this.data = res;
            this.toHTML();
        });
    }
    toHTML(){
        if(this.data.length > 0){
            this.html = ``;
            this.data.forEach(elem => {
                this.html.concat(this.genElem(elem));
            });
            return;
        }else{
            this.html = `<a style="font-size: 2rem">There aren't any pictures uploaded at this time.</a>`;
        }
    }
    genElem(image: any){
        let content = `<img src="${image.url} alt="${image.description}(${image.date})" />"`;
        let wrapper = `<div id="${image.id}">${content}</div>`;
        return wrapper;
    }
    fetch_gallery = async (): Promise<Array<any>> => {
        let raw = await fetch(`${window.location.origin}/api/gallery/`);
        let data: Array<any> = await raw.json().catch(e => console.error(e.message));;
        return data;
    }
}

let gallery = new AstronomyGallery("gallery_elem");
let galleryElement = document.getElementById(`gallery_wrap`);

function RenderGallery() {
    if(!galleryElement)return console.error("Gallery placeholder not found.");

    if(gallery.render === false){
        window.setTimeout(RenderGallery, 100);
    }else{
        galleryElement.innerHTML = gallery.html;
    }

}
RenderGallery();