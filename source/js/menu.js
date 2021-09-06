const menu_link=document.querySelector(".main-nav__toggle");
const menu_popup=document.querySelector(".site-list");
const menu_close=document.querySelector(".main-nav__toggle--close");
const logo=document.querySelector(".page-header__logo");
const nav=document.querySelector(".page-header__nav");
const greeting=document.querySelector(".page-header__greeting");
const heading=document.querySelector(".page-header__heading");

menu_popup.classList.remove("site-list--nojs");
logo.classList.remove("page-header__logo--nojs");
nav.classList.remove("page-header__nav--nojs");
greeting.classList.remove("page-header__greeting--nojs");

menu_link.addEventListener("click",function(evt){
  evt.preventDefault();
  menu_popup.classList.remove("site-list--mobile");
  menu_close.classList.remove("visually-hidden");
});

menu_close.addEventListener("click",function(evt){
  evt.preventDefault();
  menu_popup.classList.add("site-list--mobile");
  menu_close.classList.add("visually-hidden");
});
