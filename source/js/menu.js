const menu_link=document.querySelector(".main-nav__toggle");
const menu_popup=document.querySelector(".site-list");
const menu_close=document.querySelector(".main-nav__toggle--close");

menu_link.addEventListener("click",function(evt){
  evt.preventDefault();
  menu_popup.classList.remove("hidden");
});

menu_close.addEventListener("click",function(evt){
  evt.preventDefault();
  menu_popup.classList.add("hidden");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (!menu_link.classList.contains("hidden")) {
      evt.preventDefault();
      mapPopup.classList.add("hidden");
    }
  }
});
