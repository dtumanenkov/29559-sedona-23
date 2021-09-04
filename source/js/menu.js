const menu_link=document.querySelector(".main-nav__toggle");
const menu_popup=document.querySelector(".site-list");
const menu_close=document.querySelector(".main-nav__toggle--close");
const no_js=document.querySelector(".no-js");

menu_popup.classList.remove("site-list--nojs");

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
