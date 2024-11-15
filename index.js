let accessKey = "70u3MCrpjChB5ZOViGf4FqAMmIeAUCmmtbDPXQsQKls";

const suchBox = document.querySelector("#such-box");
const suchButton = document.querySelector("#such-form button");
const suchErgebnisse = document.querySelector("#such-ergebnisse");
const zeigMehrBtn = document.querySelector("#zeig-mehr-btn");

let seite = 1;
let keyword = "";  // Der input in suchBox als String

async function suchBilder(){
    keyword = suchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${seite}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(seite === 1){
        suchErgebnisse.innerHTML = "";
    }

    results.map(function(result){  // Für jedes ergebnis aus der suche wird ein array erstellt
        const bild = document.createElement("img");  // das ergebnis ist ein erstelltes img
        bild.src = result.urls.small;  // das ist der weg um small bilder zu bekommen aus unsplash

        const bildLink = document.createElement("a");  // Hiermit kann man auf den link klicken
        bildLink.href = result.links.html;  // und hiermit auf die seite von unsplash gelangen
        bildLink.target = "_blank";  // neuer tab

        bildLink.appendChild(bild);  // Link wird im bild eingefügt
        suchErgebnisse.appendChild(bildLink);
    });
    zeigMehrBtn.style.display = "block";
}

suchButton.addEventListener("click", function(e){
    e.preventDefault();
    seite = 1;  // Immer wenn man neues keyword eingibt in input erscheint die erste seite
    suchBilder();
});

zeigMehrBtn.addEventListener("click", function(){
    seite++;
    suchBilder();
})
