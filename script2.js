//152.57.118.189

var jsonresp="";
var postarr = "";




//fetches geological info
async function geoInfo() {
    let ip = sessionStorage.getItem("ip_address");
    let url = `https://ipinfo.io/${ip}/geo`;
    let response = await fetch(url);
    jsonresp = await response.json();
    console.log(jsonresp);
    localStorage.clear();
    localStorage.setItem("jsonresp", jsonresp);
    await loadmap();
    document.getElementById("ipaddr").innerText = `${jsonresp['ip']}`;
    document.getElementById("lattitude").innerText = `${jsonresp['loc']}`.split(',')[0];
    document.getElementById("longitude").innerText = `${jsonresp['loc']}`.split(',')[1];
    document.getElementById("city").innerText = `${jsonresp['city']}`;
    document.getElementById("region").innerText = `${jsonresp['region']}`;
    document.getElementById("org").innerText = `${jsonresp['org']}`;
    document.getElementById("timezone").innerText = `${jsonresp['timezone']}`;
    document.getElementById("pincode").innerText = `${jsonresp['postal']}`;
    
   await getposts()
}


//loads map frame 
async function loadmap(){
    let coords = jsonresp['loc']
    
    document.getElementById("gmap").innerHTML = `<iframe 
    src='https://maps.google.com/maps?q= ${coords}&z=16&output=embed'
    height="450"
    width="919"
  ></iframe> `;
}

//loop through array of posts to display them all 
async function getposts() {
    let postalcode = jsonresp['postal']
    let postalUrl = `https://api.postalpincode.in/pincode/${postalcode}`;
    let postalresponse = await fetch(postalUrl);
    let postaldata = await postalresponse.json();
    console.log(postaldata);
    postarr = postaldata[0]['PostOffice'];
    document.getElementById('noOfPosts').innerText = postarr.length;
    console.log(postarr);

    for(let i=0; i<postarr.length; i++)
    {
        document.getElementById("postList").innerHTML += ` <div class="postgrid_item">
        <ul>
          <li>Name : <span id="name">${postarr[i]['Name']}</span></li>
          <li>Branch type : <span id="branch">${postarr[i]['BranchType']}</span></li>
          <li>Delivery status : <span id="dstatus">${postarr[i]['DeliveryStatus']}</span></li>
          <li>District : <span id="dist">${postarr[i]['District']}</span></li>
          <li>Division : <span id="division">${postarr[i]['Division']}</span></li>
        </ul>
      </div>`;
    }
   
}

//filter function
function filter() {
    document.getElementById("postList").innerHTML = "";
    let keyword = document.getElementById('searchBox').value;
    for (let index = 0; index < postarr.length; index++) {
        for (const [key, value] of Object.entries(postarr[index])) {
            if(`${value}`.includes(keyword)){
                document.getElementById("postList").innerHTML += ` <div class="postgrid_item">
                <ul>
                  <li>Name : <span id="name">${postarr[index]['Name']}</span></li>
                  <li>Branch type : <span id="branch">${postarr[index]['BranchType']}</span></li>
                  <li>Delivery status : <span id="dstatus">${postarr[index]['DeliveryStatus']}</span></li>
                  <li>District : <span id="dist">${postarr[index]['District']}</span></li>
                  <li>Division : <span id="division">${postarr[index]['Division']}</span></li>
                </ul>
              </div>`;
              break;
            }
          }
        
    }
}

geoInfo();