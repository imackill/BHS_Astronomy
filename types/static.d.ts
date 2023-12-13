//CSS
declare module '*.module.css' {
    const classes: {[key: string]: string};
    export default classes;
}

declare module '*.css';

//Images
declare module '*.ico' {
    const ref: string;
    export default ref;
}
declare module '*.png' {
    const ref: string;
    export default ref;
}