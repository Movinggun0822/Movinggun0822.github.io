const body = document.querySelector("#wrap"),
    LPImg = document.querySelector(".LPImg"),
    btn = document.querySelector(".testBtn"),
    title = document.querySelector(".title"),
    ttb = document.querySelector(".ttBmusic"),
    aud = ttb.querySelector("audio"),
    album = document.querySelector(".album"),
    albumTitle = document.querySelector(".albumTitle"),
    songTitle = document.querySelector(".songTitle"),
    artist = document.querySelector(".artist");


const IMG_NUMBER = 12;
let NUMBER=0;

const firstColor = ["#e6d5a6", "#2a443a", "#babbbd", "#e4d5a9", "#5c6783", "#ad3f35", "#d2c1a5", "#e5e1d5", "#a42629", "#047aae", "#010101", "#fafafa"];
const lastColor = ["#2e1405", "#802625", "#111111", "#26253e", "#ab7e37", "#30afc5", "#554756", "#383729", "#15341b", "#f98c78", "#9d968c", "#474747"];

const atitle = ["Fearless", "The Suburbs", "21", "Babel", "Random Access Memories", "Morning Phase", "1989", "25", "24K Magic", "Golden Hour", "When We All Fall Asleep, Where Do We Go?", "Folklore"];
const artist_array = ["Taylor Swift", "Arcade Fire", "Adele", "Mumford & Sons", "Daft Punk", "Beck", "Taylor Swift", "Adele", "Bruno Mars", "Kacey Musgraves", "Billie Eilish", "Taylor Swift"];
const stitle = ["Fearless", "The Suburbs", "Rolling in the Deep", "Babel", "Get Lucky", "Morning", "Blank Space", "Hello", "24K Magic", "Golden Hour", "bad guy", "cardigan"];

function paintImage(num) {
    console.log(num);
    LPImg.classList.add("rotate");
    LPImg.innerHTML=`<img src="img/LP_${num+10}.png" />`;
    body.style.background=`linear-gradient(135deg, ${firstColor[num]},${lastColor[num]})`;
    title.innerText=`grammy award for Album of the year 20${num+10}`;
    aud.innerHTML=`<source src="music/${num}.mp3" type="audio/mp3">`;
    album.innerHTML=`<img src="img/${num+10}.jpg" .>`;
    albumTitle.innerText=atitle[num];
    songTitle.innerText=`Track: ${stitle[num]}`;
    artist.innerText=`by ${artist_array[num]}`;
}

function getRandom(NUMBER){
    let number=0;
    do{
        number = Math.floor(Math.random()*IMG_NUMBER);
    } while(number == NUMBER)
    NUMBER = number;

    return number;
}

function init(){
    const number = getRandom(NUMBER);
    paintImage(number);
}

init();