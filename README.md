<h1>The Website for the BHS Astronomy Club</h1>
Using Vanilla TypeScript
An accessible website that's used by members of the BHS Astronomy Club to organize events and distribute info. Does not use any boilerplate or bundling program. Also contains the vscode launch profiles that I prefer, along with the necessary ENV variables.

By [Iain MacKillop](https://github.com/imackill)

---
<h2>Dependencies</h2>
<ul>
    <li>@types/express</li>
    <li>@types/typescript</li>
    <li>@types/uuid</li>
    <li>express</li>
    <li>serve-favicon</li>
    <li>typescript</li>
    <li>uuid</li>
    <li>winston</li>
    <li>multiparty</li>
</ul>
<h6>Also in <a href="https://github.com/Erasmusss/BHS_Astronomy/blob/main/package.json">package.json</a> </h6>

In terms of ENV variables, there's PORT, MAINPAT (for the main html page), DEVPAT (for the dev html page), and DATAPAT (for the data json file).

---
<h2>Tasks*</h2>

- [x] Initial Setup
- [x] Remote Editing/File Upload-CRUD API
- [x] Custom (dynamic) Gallery Element
- [x] Custom (dynamic) Schedule Element
- [x] Set Up Main Page
- [x] Set Up Dev Page
- [ ] Host on WordPress (or Render)

<h6>*not in any particular order</h6>

---
<h2>Commits</h2>
<h3>12/13/2023:</h3>
* added basic events CRUD API <br>
* added authentication key system-doesn't have actual function yet <br>
* set up basic structure and main page <br>
* set up basic debugging <br>

<h3>12/14/2023</h3>
* added basic gallery CRUD API<br>
* started working on css and html for mainpage<br>

<h3>12/16/2023</h3>
* Finished overall main page with elements<br>
* elements use CRUD API for data (not thoroughly tested)<br>
