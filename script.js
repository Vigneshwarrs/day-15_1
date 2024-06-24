////////////////////////////////////////////////   DOM Logic   ////////////////////////////////////////////////////
let container = document.createElement("div")
container.classList.add("container","table-striped","table-responsive")
let table = document.createElement("table")
table.classList.add("table","table-bordered")

let thead = document.createElement("thead")
thead.classList.add("bg-dark","text-light")

let tbody = document.createElement("tbody")
tbody.setAttribute("id","table-body")

let tr = document.createElement("tr");
let td1 = document.createElement("td");
let td2 = document.createElement("td");
let td3 = document.createElement("td");
let h1 = document.createElement("h1");
h1.setAttribute("id","title");
let h2 = document.createElement("h1");
h2.setAttribute("id","title");
let h3 = document.createElement("h1");
h3.setAttribute("id","title");
h1.innerHTML = "Id";
td1.appendChild(h1);
h2.innerHTML="Name";
td2.appendChild(h2);
h3.innerHTML = "Email";
td3.appendChild(h3);
tr.append(td1);
tr.append(td2);
tr.append(td3);
thead.appendChild(tr)


let span = document.createElement("span")
span.innerHTML = ""

let pagination = document.createElement("div")
pagination.setAttribute("id","pagination-wrapper")
pagination.classList.add("container","buttons")

table.append(thead)
table.append(tbody)
container.append(span)
container.append(table)

document.body.append(container)
document.body.append(pagination)

function createTableRow(id,name,email){
    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    td1.innerHTML = id
    td2.innerHTML = name
    td3.innerHTML = email
    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tbody.append(tr)
}

////////////////////////////////////////////////   pagination Logic   ////////////////////////////////////////////////////

let request = new XMLHttpRequest();
request.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",true);
request.send();
request.onload = function(){
    let tabledata = JSON.parse(this.response);
    
    let state = {
        "queryset" : tabledata,
        "page" : 1 ,
        "rows" : 5,
        "window" : 5
    }

    buildTable() 

    function pagination(queryset,page,rows){
        let trimStart = (page-1) * rows;
        let trimEnd = trimStart + rows;
        let trimedData = queryset.slice(trimStart,trimEnd)
        let pages = Math.ceil(tabledata.length/rows);
        return {
            "queryset":trimedData,
            "pages" : pages
        }
    }

    

    function pageButtons(pages){
        let wrapper = document.getElementById("pagination-wrapper")
        wrapper.innerHTML = ""
        let maxLeft = (state.page - Math.floor(state.window /2));
        let maxRight = (state.page + Math.floor(state.window /2));
        if(maxLeft<1){
            maxLeft = 1
            maxRight = state.window
        }
        if(maxRight > pages){
            maxLeft = pages-(state.window-1)
            maxRight = pages
            if(maxLeft < 1){
                maxLeft = 1;
                
            }
        }
        for(let page = maxLeft; page <= maxRight ; page ++){
            wrapper.innerHTML = wrapper.innerHTML + `<button value="${page}" class="page">${page}</button>`
            
        }
        if(state.page!==1){
            wrapper.innerHTML = `<button value=${1} class="page">&#171; First</button>` + wrapper.innerHTML
        }
        if (state.page != pages) {
            wrapper.innerHTML += `<button value=${pages} class="page">Last &#187;</button>`
        }
        let dynamic = document.getElementById("pagination-wrapper")
        dynamic.addEventListener("click",function(e){
        document.getElementById("table-body").innerHTML = ""
        state.page = Number(e.target.value)
        buildTable() 
        })
        
    }

    function buildTable(){
        let data = pagination(state.queryset,state.page,state.rows)
        let array = data.queryset
        for(let i=0;i<array.length;i++){
            createTableRow(array[i].id,array[i].name,array[i].email);
        }
        pageButtons(data.pages)
    }
}
