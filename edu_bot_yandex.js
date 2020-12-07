// ==UserScript==
// @name         Bot for ya
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

let yaSearchTxt = document.getElementsByName("text")[0];
let yaSearchBtn = document.querySelectorAll(".button_theme_websearch")[0];
let words = ["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"];
let word = words[getRandom(0,words.length)];

// yaSearchTxt.value = "Гобой";
// yaSearchBtn.click();

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

if (yaSearchBtn!=undefined){
    let i = 0;
    let timerId = setInterval(function(){
        yaSearchTxt.value = yaSearchTxt.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
            yaSearchBtn.click();
        }
    },1000);
}else{
    let pageNum = document.querySelector(".pager__item_current_yes").innerText;
    let linkIsFound = false;
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i]
        if(link.href.includes("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")){
            setTimeout(()=>{link.click();},1000);
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
}
