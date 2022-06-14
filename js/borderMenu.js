!(function () {
    function e() {
        if (classie.has(i, "open")) {
            classie.remove(i, "open"), classie.add(i, "close");
            var e = function (n) {
                if (support.transitions) {
                    if ("visibility" !== n.propertyName) return;
                    this.removeEventListener(transEndEventName, e);
                }
                classie.remove(i, "close");
            };
            support.transitions ? i.addEventListener(transEndEventName, e) : e();
        } else classie.has(i, "close") || classie.add(i, "open");
    }
    
    var n = document.getElementById("trigger-overlay"),
        i = document.querySelector("div.overlay"),
        t = document.querySelector("div.overlay nav ul li:first-child"),
        r = document.querySelector("div.overlay nav ul li:nth-child(2)"),
        s = document.querySelector("div.overlay nav ul li:nth-child(3)"),
        a = document.querySelector("div.overlay nav ul li:nth-child(4)"),
        o = document.querySelector("div.overlay nav ul li:nth-child(5)"),
        d = document.querySelector("div.overlay nav ul li:nth-child(6)"),
        l = i.querySelector("a.overlay-close");
    (transEndEventNames = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", msTransition: "MSTransitionEnd", transition: "transitionend" }),
        (transEndEventName = transEndEventNames[Modernizr.prefixed("transition")]),
        (support = { transitions: Modernizr.csstransitions }),
        n.addEventListener("click", e),
        l.addEventListener("click", e),
        t.addEventListener("click", e),
        r.addEventListener("click", e),
        s.addEventListener("click", e),
        a.addEventListener("click", e)
        // o.addEventListener("click", e),
        // d.addEventListener("click", e);
})();
