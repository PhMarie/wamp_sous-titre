if($((function(){function e(){var e=$(window).height();$("#intro").css({height:e})}e(),$(window).on("resize",(function(){e()})),$(".owl-carousel").owlCarousel({loop:!0,margin:30,responsiveClass:!0,responsive:{0:{items:2,nav:!0},600:{items:3,nav:!1},1e3:{items:4,nav:!0,loop:!1}}}),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?($("#intro").css("background-attachment","scroll"),$("#charts").css("background-attachment","scroll"),$("#testimonials").css("background-attachment","scroll"),$("#clients").css("background-attachment","scroll"),$("#video").css("background-attachment","scroll"),$("#textSeparator").css("background-attachment","scroll")):$.stellar({responsive:!0,horizontalOffset:0,horizontalScrolling:!1}),$("#charts").waypoint((function(){"use strict";$(".timer1").countTo({from:0,to:125,speed:125,refreshInterval:1}),$(".timer2").countTo({from:0,to:71,speed:250,refreshInterval:1}),$(".timer3").countTo({from:0,to:80,speed:250,refreshInterval:1}),$(".timer4").countTo({from:0,to:200,speed:250,refreshInterval:1,onComplete:function(e){$(".timer").stop()}})}),{offset:500});var t=$(".gallery").imagesLoaded((function(){t.isotope({})}));$("#filters").on("click","button",(function(){var e=$(this).attr("data-filter");t.isotope({filter:e})})),t.isotope({filter:"*"}),$(".gallery-inner").magnificPopup({delegate:" .popup-link",gallery:{enabled:!0,navigateByImgClick:!0,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)"},type:"image",mainClass:"mfp-fade",tLoading:"Loading..."}),$(".featuredWork").magnificPopup({delegate:" .popup-link",gallery:{enabled:!0,navigateByImgClick:!0,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)"},type:"image",mainClass:"mfp-fade",tLoading:"Loading..."}),$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({disableOn:100,type:"iframe",mainClass:"mfp-fade",removalDelay:160,preloader:!1,fixedContentPos:!1}),smoothScroll.init({speed:1e3,easing:"easeInOutCubic",updateURL:!1,offset:0,callbackBefore:function(e,t){},callbackAfter:function(e,t){}}),$("#filters .btn").tooltip(),$("body").fitVids()})),$(window).load((function(){"use strict";$("#status").fadeOut(),$("#preloader").delay(100).fadeOut("slow"),$("body").delay(100).css({overflow:"visible"})})),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){$("head").append($('<link rel="stylesheet" type="text/css" />').attr("href","css/animate.css"));var wow=new WOW({boxClass:"wow",animateClass:"animated",offset:150,mobile:!1});wow.init()}Modernizr.touch&&$(".caption .valign").css("top","40px"),$(".gallery-inner").bind("touchstart",(function(){$(this).addClass(".caption")})),$(".gallery-inner").bind("touchend",(function(){$(this).removeClass(".caption")})),$(".featuredWork").bind("touchstart",(function(){$(this).addClass(".caption")})),$(".featuredWork").bind("touchend",(function(){$(this).removeClass(".caption")}));let modal=null;const focusableSelector="button, a, input, textarea, select";let focusables=[],previouslyFocusElement=null;const openModal=async e=>{e.preventDefault();const t=e.target.getAttribute("href");modal=t.startsWith("#")?document.querySelector(t):await loadModal(t),focusables=Array.from(modal.querySelectorAll(focusableSelector)),previouslyFocusElement=document.querySelector(":focus"),modal.style.display=null,focusables[0].focus(),modal.removeAttribute("aria-hidden"),modal.setAttribute("aria-modal","true"),modal.querySelector(".js-modal-close").addEventListener("click",closeModal)},closeModal=e=>{null!==modal&&(null!==previouslyFocusElement&&previouslyFocusElement.focus(),e.preventDefault(),window.setTimeout((()=>{modal.style.display="none",modal=null}),500),modal.setAttribute("aria-hidden","true"),modal.removeAttribute("aria-modal"),modal.querySelector(".js-modal-close").removeEventListener("click",closeModal))},focusInModal=e=>{e.preventDefault();let t=focusables.findIndex((e=>e===modal.querySelector(":focus")));!0===e.shiftKey?t--:t++,t>=focusables.length&&(t=0),t<0&&(t=focusables.length-1),focusables[t].focus()},loadModal=async e=>{const t="#"+e.split("#")[1],o=document.querySelector(t);if(null!==o)return o;const a=await fetch(e).then((e=>e.text())),l=document.createRange().createContextualFragment(a).querySelector(t);if(null===l)throw`L'élément ${t} n'a pas été trouvé dans la page ${e}`;return document.body.append(l),l};document.querySelectorAll(".js-modal").forEach((e=>{e.addEventListener("click",openModal)})),window.addEventListener("keydown",(e=>{"Escape"!==e.key&&"Esc"!==e.key||closeModal(e),"Tab"===e.key&&null!==modal&&focusInModal(e)}));var myWaypoint=new Waypoint({element:document.getElementById("derniers-travaux"),handler:function(e){document.querySelector(".navbar").classList.toggle("navbarVisible")}}),myWaypoint2=new Waypoint({element:document.getElementById("presentation"),handler:function(e){document.querySelectorAll(".reveal").forEach((e=>e.classList.toggle("reveal-visible")))}});