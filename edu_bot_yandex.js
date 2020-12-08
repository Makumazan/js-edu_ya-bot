// ==UserScript==
// @name         Bot for ya
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


let yaSearchTxt = document.getElementsByName("text")[0];
let yaSearchBtn = document.querySelectorAll(".button_theme_websearch")[0];
//let words = ["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"];
//let word = words[getRandom(0,words.length)];
//let word = "арбуз"
// yaSearchTxt.value = "Гобой";
// yaSearchBtn.click();

// get random value of [min, max)
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"],
    "crushdrummers.ru":["Барабанное шоу","Заказать барабанное шоу в москве","Барабанщики на свадьбу","Барабанщики на корпоратив"]
}
// get random keys of {sites}
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
// get values of selected key
let words = sites[site];
// get random value
let word = words[getRandom(0, words.length)];

// BOT ON YA MAIN PAGE
// check: YA search is exist
if (yaSearchBtn!=undefined){ 
    let i = 0;
    document.cookie = `site = ${site}`;
    let timerId = setInterval(function(){
        yaSearchTxt.value = yaSearchTxt.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
            yaSearchBtn.click();
        }
    },500);

  // BOT ON YA PAGES
}else if (location.hostname == "yandex.ru" ){
    site = getCookie("site");
    setTimeout(()=> {
        let pageNum = document.querySelector("span.pager__item_current_yes").innerText;
        let linkIsFound = false;
        let links = document.links;
        for(let i=0; i<links.length; i++){
            let link = links[i]
            //if(link.href.includes("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")){
             if(link.href.includes(site)){
                setTimeout(()=>{link.click()},1000);
                //link.click()
                linkIsFound = true;
                break;
            }
        }
        if(!linkIsFound && pageNum<10){
            let pageNext = document.querySelector(".pager__item_kind_next")
            setTimeout(()=>{pageNext.click();},1000)
        }else if (!linkIsFound){
            location.href = "https://yandex.ru/";
        }
    }, 1000);
} else {

    //BOT ON RANDOM SITE
    if ( getRandom(1, 11) > 9) location.href = "https://yandex.ru/"
    // get [links] of current site
    let links = document.links;
    setInterval( () => {
        // get random index of link on current site
        let index = getRandom(0, links.length);
        // get random link
        let link = links[index];
        if (link.href.includes(location.hostname)){
            // click on random link
            setTimeout( () => {link.click()}, 3000);
        }
    }, 5000);
}
