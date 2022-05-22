if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (e) {
    "use strict";
    function t() {
        var e = document.createElement("bootstrap"),
            t = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
        for (var n in t) if (void 0 !== e.style[n]) return { end: t[n] };
        return !1;
    }
    (e.fn.emulateTransitionEnd = function (t) {
        var n = !1,
            r = this;
        e(this).one(e.support.transition.end, function () {
            n = !0;
        });
        var i = function () {
            n || e(r).trigger(e.support.transition.end);
        };
        return setTimeout(i, t), this;
    }),
        e(function () {
            e.support.transition = t();
        });
})(jQuery),
    +(function (e) {
        "use strict";
        var t = '[data-dismiss="alert"]',
            n = function (n) {
                e(n).on("click", t, this.close);
            };
        n.prototype.close = function (t) {
            function n() {
                s.trigger("closed.bs.alert").remove();
            }
            var r = e(this),
                i = r.attr("data-target");
            i || ((i = r.attr("href")), (i = i && i.replace(/.*(?=#[^\s]*$)/, "")));
            var s = e(i);
            t && t.preventDefault(),
                s.length || (s = r.hasClass("alert") ? r : r.parent()),
                s.trigger((t = e.Event("close.bs.alert"))),
                t.isDefaultPrevented() || (s.removeClass("in"), e.support.transition && s.hasClass("fade") ? s.one(e.support.transition.end, n).emulateTransitionEnd(150) : n());
        };
        var r = e.fn.alert;
        (e.fn.alert = function (t) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.alert");
                i || r.data("bs.alert", (i = new n(this))), "string" == typeof t && i[t].call(r);
            });
        }),
            (e.fn.alert.Constructor = n),
            (e.fn.alert.noConflict = function () {
                return (e.fn.alert = r), this;
            }),
            e(document).on("click.bs.alert.data-api", t, n.prototype.close);
    })(jQuery),
    +(function (e) {
        "use strict";
        var t = function (n, r) {
            (this.$element = e(n)), (this.options = e.extend({}, t.DEFAULTS, r)), (this.isLoading = !1);
        };
        (t.DEFAULTS = { loadingText: "loading..." }),
            (t.prototype.setState = function (t) {
                var n = "disabled",
                    r = this.$element,
                    i = r.is("input") ? "val" : "html",
                    s = r.data();
                (t += "Text"),
                    s.resetText || r.data("resetText", r[i]()),
                    r[i](s[t] || this.options[t]),
                    setTimeout(
                        e.proxy(function () {
                            "loadingText" == t ? ((this.isLoading = !0), r.addClass(n).attr(n, n)) : this.isLoading && ((this.isLoading = !1), r.removeClass(n).removeAttr(n));
                        }, this),
                        0
                    );
            }),
            (t.prototype.toggle = function () {
                var e = !0,
                    t = this.$element.closest('[data-toggle="buttons"]');
                if (t.length) {
                    var n = this.$element.find("input");
                    "radio" == n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? (e = !1) : t.find(".active").removeClass("active")), e && n.prop("checked", !this.$element.hasClass("active")).trigger("change");
                }
                e && this.$element.toggleClass("active");
            });
        var n = e.fn.button;
        (e.fn.button = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.button"),
                    s = "object" == typeof n && n;
                i || r.data("bs.button", (i = new t(this, s))), "toggle" == n ? i.toggle() : n && i.setState(n);
            });
        }),
            (e.fn.button.Constructor = t),
            (e.fn.button.noConflict = function () {
                return (e.fn.button = n), this;
            }),
            e(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (t) {
                var n = e(t.target);
                n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle"), t.preventDefault();
            });
    })(jQuery),
    +(function (e) {
        "use strict";
        var t = function (t, n) {
            (this.$element = e(t)),
                (this.$indicators = this.$element.find(".carousel-indicators")),
                (this.options = n),
                (this.paused = this.sliding = this.interval = this.$active = this.$items = null),
                "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this));
        };
        (t.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0 }),
            (t.prototype.cycle = function (t) {
                return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this;
            }),
            (t.prototype.getActiveIndex = function () {
                return (this.$active = this.$element.find(".item.active")), (this.$items = this.$active.parent().children()), this.$items.index(this.$active);
            }),
            (t.prototype.to = function (t) {
                var n = this,
                    r = this.getActiveIndex();
                return t > this.$items.length - 1 || 0 > t
                    ? void 0
                    : this.sliding
                    ? this.$element.one("slid.bs.carousel", function () {
                          n.to(t);
                      })
                    : r == t
                    ? this.pause().cycle()
                    : this.slide(t > r ? "next" : "prev", e(this.$items[t]));
            }),
            (t.prototype.pause = function (t) {
                return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), (this.interval = clearInterval(this.interval)), this;
            }),
            (t.prototype.next = function () {
                return this.sliding ? void 0 : this.slide("next");
            }),
            (t.prototype.prev = function () {
                return this.sliding ? void 0 : this.slide("prev");
            }),
            (t.prototype.slide = function (t, n) {
                var r = this.$element.find(".item.active"),
                    i = n || r[t](),
                    s = this.interval,
                    o = "next" == t ? "left" : "right",
                    u = "next" == t ? "first" : "last",
                    a = this;
                if (!i.length) {
                    if (!this.options.wrap) return;
                    i = this.$element.find(".item")[u]();
                }
                if (i.hasClass("active")) return (this.sliding = !1);
                var f = e.Event("slide.bs.carousel", { relatedTarget: i[0], direction: o });
                return (
                    this.$element.trigger(f),
                    f.isDefaultPrevented()
                        ? void 0
                        : ((this.sliding = !0),
                          s && this.pause(),
                          this.$indicators.length &&
                              (this.$indicators.find(".active").removeClass("active"),
                              this.$element.one("slid.bs.carousel", function () {
                                  var t = e(a.$indicators.children()[a.getActiveIndex()]);
                                  t && t.addClass("active");
                              })),
                          e.support.transition && this.$element.hasClass("slide")
                              ? (i.addClass(t),
                                i[0].offsetWidth,
                                r.addClass(o),
                                i.addClass(o),
                                r
                                    .one(e.support.transition.end, function () {
                                        i.removeClass([t, o].join(" ")).addClass("active"),
                                            r.removeClass(["active", o].join(" ")),
                                            (a.sliding = !1),
                                            setTimeout(function () {
                                                a.$element.trigger("slid.bs.carousel");
                                            }, 0);
                                    })
                                    .emulateTransitionEnd(1e3 * r.css("transition-duration").slice(0, -1)))
                              : (r.removeClass("active"), i.addClass("active"), (this.sliding = !1), this.$element.trigger("slid.bs.carousel")),
                          s && this.cycle(),
                          this)
                );
            });
        var n = e.fn.carousel;
        (e.fn.carousel = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.carousel"),
                    s = e.extend({}, t.DEFAULTS, r.data(), "object" == typeof n && n),
                    o = "string" == typeof n ? n : s.slide;
                i || r.data("bs.carousel", (i = new t(this, s))), "number" == typeof n ? i.to(n) : o ? i[o]() : s.interval && i.pause().cycle();
            });
        }),
            (e.fn.carousel.Constructor = t),
            (e.fn.carousel.noConflict = function () {
                return (e.fn.carousel = n), this;
            }),
            e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (t) {
                var n,
                    r = e(this),
                    i = e(r.attr("data-target") || ((n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""))),
                    s = e.extend({}, i.data(), r.data()),
                    o = r.attr("data-slide-to");
                o && (s.interval = !1), i.carousel(s), (o = r.attr("data-slide-to")) && i.data("bs.carousel").to(o), t.preventDefault();
            }),
            e(window).on("load", function () {
                e('[data-ride="carousel"]').each(function () {
                    var t = e(this);
                    t.carousel(t.data());
                });
            });
    })(jQuery),
    +(function (e) {
        "use strict";
        var t = function (n, r) {
            (this.$element = e(n)), (this.options = e.extend({}, t.DEFAULTS, r)), (this.transitioning = null), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle();
        };
        (t.DEFAULTS = { toggle: !0 }),
            (t.prototype.dimension = function () {
                var e = this.$element.hasClass("width");
                return e ? "width" : "height";
            }),
            (t.prototype.show = function () {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var t = e.Event("show.bs.collapse");
                    if ((this.$element.trigger(t), !t.isDefaultPrevented())) {
                        var n = this.$parent && this.$parent.find("> .panel > .in");
                        if (n && n.length) {
                            var r = n.data("bs.collapse");
                            if (r && r.transitioning) return;
                            n.collapse("hide"), r || n.data("bs.collapse", null);
                        }
                        var i = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[i](0), (this.transitioning = 1);
                        var s = function () {
                            this.$element.removeClass("collapsing").addClass("collapse in")[i]("auto"), (this.transitioning = 0), this.$element.trigger("shown.bs.collapse");
                        };
                        if (!e.support.transition) return s.call(this);
                        var o = e.camelCase(["scroll", i].join("-"));
                        this.$element.one(e.support.transition.end, e.proxy(s, this)).emulateTransitionEnd(350)[i](this.$element[0][o]);
                    }
                }
            }),
            (t.prototype.hide = function () {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var t = e.Event("hide.bs.collapse");
                    if ((this.$element.trigger(t), !t.isDefaultPrevented())) {
                        var n = this.dimension();
                        this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), (this.transitioning = 1);
                        var r = function () {
                            (this.transitioning = 0), this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
                        };
                        return e.support.transition ? void this.$element[n](0).one(e.support.transition.end, e.proxy(r, this)).emulateTransitionEnd(350) : r.call(this);
                    }
                }
            }),
            (t.prototype.toggle = function () {
                this[this.$element.hasClass("in") ? "hide" : "show"]();
            });
        var n = e.fn.collapse;
        (e.fn.collapse = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.collapse"),
                    s = e.extend({}, t.DEFAULTS, r.data(), "object" == typeof n && n);
                !i && s.toggle && "show" == n && (n = !n), i || r.data("bs.collapse", (i = new t(this, s))), "string" == typeof n && i[n]();
            });
        }),
            (e.fn.collapse.Constructor = t),
            (e.fn.collapse.noConflict = function () {
                return (e.fn.collapse = n), this;
            }),
            e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (t) {
                var n,
                    r = e(this),
                    i = r.attr("data-target") || t.preventDefault() || ((n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")),
                    s = e(i),
                    o = s.data("bs.collapse"),
                    u = o ? "toggle" : r.data(),
                    a = r.attr("data-parent"),
                    f = a && e(a);
                (o && o.transitioning) ||
                    (f &&
                        f
                            .find('[data-toggle=collapse][data-parent="' + a + '"]')
                            .not(r)
                            .addClass("collapsed"),
                    r[s.hasClass("in") ? "addClass" : "removeClass"]("collapsed")),
                    s.collapse(u);
            });
    })(jQuery),
    +(function (e) {
        "use strict";
        function t(t) {
            e(r).remove(),
                e(i).each(function () {
                    var r = n(e(this)),
                        i = { relatedTarget: this };
                    r.hasClass("open") && (r.trigger((t = e.Event("hide.bs.dropdown", i))), t.isDefaultPrevented() || r.removeClass("open").trigger("hidden.bs.dropdown", i));
                });
        }
        function n(t) {
            var n = t.attr("data-target");
            n || ((n = t.attr("href")), (n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")));
            var r = n && e(n);
            return r && r.length ? r : t.parent();
        }
        var r = ".dropdown-backdrop",
            i = "[data-toggle=dropdown]",
            s = function (t) {
                e(t).on("click.bs.dropdown", this.toggle);
            };
        (s.prototype.toggle = function (r) {
            var i = e(this);
            if (!i.is(".disabled, :disabled")) {
                var s = n(i),
                    o = s.hasClass("open");
                if ((t(), !o)) {
                    "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", t);
                    var u = { relatedTarget: this };
                    if ((s.trigger((r = e.Event("show.bs.dropdown", u))), r.isDefaultPrevented())) return;
                    s.toggleClass("open").trigger("shown.bs.dropdown", u), i.focus();
                }
                return !1;
            }
        }),
            (s.prototype.keydown = function (t) {
                if (/(38|40|27)/.test(t.keyCode)) {
                    var r = e(this);
                    if ((t.preventDefault(), t.stopPropagation(), !r.is(".disabled, :disabled"))) {
                        var s = n(r),
                            o = s.hasClass("open");
                        if (!o || (o && 27 == t.keyCode)) return 27 == t.which && s.find(i).focus(), r.click();
                        var u = " li:not(.divider):visible a",
                            a = s.find("[role=menu]" + u + ", [role=listbox]" + u);
                        if (a.length) {
                            var f = a.index(a.filter(":focus"));
                            38 == t.keyCode && f > 0 && f--, 40 == t.keyCode && f < a.length - 1 && f++, ~f || (f = 0), a.eq(f).focus();
                        }
                    }
                }
            });
        var o = e.fn.dropdown;
        (e.fn.dropdown = function (t) {
            return this.each(function () {
                var n = e(this),
                    r = n.data("bs.dropdown");
                r || n.data("bs.dropdown", (r = new s(this))), "string" == typeof t && r[t].call(n);
            });
        }),
            (e.fn.dropdown.Constructor = s),
            (e.fn.dropdown.noConflict = function () {
                return (e.fn.dropdown = o), this;
            }),
            e(document)
                .on("click.bs.dropdown.data-api", t)
                .on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
                    e.stopPropagation();
                })
                .on("click.bs.dropdown.data-api", i, s.prototype.toggle)
                .on("keydown.bs.dropdown.data-api", i + ", [role=menu], [role=listbox]", s.prototype.keydown);
    })(jQuery),
    +(function (e) {
        "use strict";
        var t = function (t, n) {
            (this.options = n),
                (this.$element = e(t)),
                (this.$backdrop = this.isShown = null),
                this.options.remote &&
                    this.$element.find(".modal-content").load(
                        this.options.remote,
                        e.proxy(function () {
                            this.$element.trigger("loaded.bs.modal");
                        }, this)
                    );
        };
        (t.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
            (t.prototype.toggle = function (e) {
                return this[this.isShown ? "hide" : "show"](e);
            }),
            (t.prototype.show = function (t) {
                var n = this,
                    r = e.Event("show.bs.modal", { relatedTarget: t });
                this.$element.trigger(r),
                    this.isShown ||
                        r.isDefaultPrevented() ||
                        ((this.isShown = !0),
                        this.escape(),
                        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)),
                        this.backdrop(function () {
                            var r = e.support.transition && n.$element.hasClass("fade");
                            n.$element.parent().length || n.$element.appendTo(document.body), n.$element.show().scrollTop(0), r && n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), n.enforceFocus();
                            var i = e.Event("shown.bs.modal", { relatedTarget: t });
                            r
                                ? n.$element
                                      .find(".modal-dialog")
                                      .one(e.support.transition.end, function () {
                                          n.$element.focus().trigger(i);
                                      })
                                      .emulateTransitionEnd(300)
                                : n.$element.focus().trigger(i);
                        }));
            }),
            (t.prototype.hide = function (t) {
                t && t.preventDefault(),
                    (t = e.Event("hide.bs.modal")),
                    this.$element.trigger(t),
                    this.isShown &&
                        !t.isDefaultPrevented() &&
                        ((this.isShown = !1),
                        this.escape(),
                        e(document).off("focusin.bs.modal"),
                        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"),
                        e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal());
            }),
            (t.prototype.enforceFocus = function () {
                e(document)
                    .off("focusin.bs.modal")
                    .on(
                        "focusin.bs.modal",
                        e.proxy(function (e) {
                            this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.focus();
                        }, this)
                    );
            }),
            (t.prototype.escape = function () {
                this.isShown && this.options.keyboard
                    ? this.$element.on(
                          "keyup.dismiss.bs.modal",
                          e.proxy(function (e) {
                              27 == e.which && this.hide();
                          }, this)
                      )
                    : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
            }),
            (t.prototype.hideModal = function () {
                var e = this;
                this.$element.hide(),
                    this.backdrop(function () {
                        e.removeBackdrop(), e.$element.trigger("hidden.bs.modal");
                    });
            }),
            (t.prototype.removeBackdrop = function () {
                this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
            }),
            (t.prototype.backdrop = function (t) {
                var n = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var r = e.support.transition && n;
                    if (
                        ((this.$backdrop = e('<div class="modal-backdrop ' + n + '" />').appendTo(document.body)),
                        this.$element.on(
                            "click.dismiss.bs.modal",
                            e.proxy(function (e) {
                                e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
                            }, this)
                        ),
                        r && this.$backdrop[0].offsetWidth,
                        this.$backdrop.addClass("in"),
                        !t)
                    )
                        return;
                    r ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t();
                } else
                    !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()) : t && t();
            });
        var n = e.fn.modal;
        (e.fn.modal = function (n, r) {
            return this.each(function () {
                var i = e(this),
                    s = i.data("bs.modal"),
                    o = e.extend({}, t.DEFAULTS, i.data(), "object" == typeof n && n);
                s || i.data("bs.modal", (s = new t(this, o))), "string" == typeof n ? s[n](r) : o.show && s.show(r);
            });
        }),
            (e.fn.modal.Constructor = t),
            (e.fn.modal.noConflict = function () {
                return (e.fn.modal = n), this;
            }),
            e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
                var n = e(this),
                    r = n.attr("href"),
                    i = e(n.attr("data-target") || (r && r.replace(/.*(?=#[^\s]+$)/, ""))),
                    s = i.data("bs.modal") ? "toggle" : e.extend({ remote: !/#/.test(r) && r }, i.data(), n.data());
                n.is("a") && t.preventDefault(),
                    i.modal(s, this).one("hide", function () {
                        n.is(":visible") && n.focus();
                    });
            }),
            e(document)
                .on("show.bs.modal", ".modal", function () {
                    e(document.body).addClass("modal-open");
                })
                .on("hidden.bs.modal", ".modal", function () {
                    e(document.body).removeClass("modal-open");
                });
    })(jQuery),
    +(function (e) {
        "use strict";
        var t = function (e, t) {
            (this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null), this.init("tooltip", e, t);
        };
        (t.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
        }),
            (t.prototype.init = function (t, n, r) {
                (this.enabled = !0), (this.type = t), (this.$element = e(n)), (this.options = this.getOptions(r));
                for (var i = this.options.trigger.split(" "), s = i.length; s--; ) {
                    var o = i[s];
                    if ("click" == o) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
                    else if ("manual" != o) {
                        var u = "hover" == o ? "mouseenter" : "focusin",
                            a = "hover" == o ? "mouseleave" : "focusout";
                        this.$element.on(u + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.leave, this));
                    }
                }
                this.options.selector ? (this._options = e.extend({}, this.options, { trigger: "manual", selector: "" })) : this.fixTitle();
            }),
            (t.prototype.getDefaults = function () {
                return t.DEFAULTS;
            }),
            (t.prototype.getOptions = function (t) {
                return (t = e.extend({}, this.getDefaults(), this.$element.data(), t)), t.delay && "number" == typeof t.delay && (t.delay = { show: t.delay, hide: t.delay }), t;
            }),
            (t.prototype.getDelegateOptions = function () {
                var t = {},
                    n = this.getDefaults();
                return (
                    this._options &&
                        e.each(this._options, function (e, r) {
                            n[e] != r && (t[e] = r);
                        }),
                    t
                );
            }),
            (t.prototype.enter = function (t) {
                var n =
                    t instanceof this.constructor
                        ? t
                        : e(t.currentTarget)
                              [this.type](this.getDelegateOptions())
                              .data("bs." + this.type);
                return (
                    clearTimeout(n.timeout),
                    (n.hoverState = "in"),
                    n.options.delay && n.options.delay.show
                        ? void (n.timeout = setTimeout(function () {
                              "in" == n.hoverState && n.show();
                          }, n.options.delay.show))
                        : n.show()
                );
            }),
            (t.prototype.leave = function (t) {
                var n =
                    t instanceof this.constructor
                        ? t
                        : e(t.currentTarget)
                              [this.type](this.getDelegateOptions())
                              .data("bs." + this.type);
                return (
                    clearTimeout(n.timeout),
                    (n.hoverState = "out"),
                    n.options.delay && n.options.delay.hide
                        ? void (n.timeout = setTimeout(function () {
                              "out" == n.hoverState && n.hide();
                          }, n.options.delay.hide))
                        : n.hide()
                );
            }),
            (t.prototype.show = function () {
                var t = e.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                    if ((this.$element.trigger(t), t.isDefaultPrevented())) return;
                    var n = this,
                        r = this.tip();
                    this.setContent(), this.options.animation && r.addClass("fade");
                    var i = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                        s = /\s?auto?\s?/i,
                        o = s.test(i);
                    o && (i = i.replace(s, "") || "top"), r.detach().css({ top: 0, left: 0, display: "block" }).addClass(i), this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element);
                    var u = this.getPosition(),
                        a = r[0].offsetWidth,
                        f = r[0].offsetHeight;
                    if (o) {
                        var l = this.$element.parent(),
                            c = i,
                            h = document.documentElement.scrollTop || document.body.scrollTop,
                            p = "body" == this.options.container ? window.innerWidth : l.outerWidth(),
                            d = "body" == this.options.container ? window.innerHeight : l.outerHeight(),
                            v = "body" == this.options.container ? 0 : l.offset().left;
                        (i = "bottom" == i && u.top + u.height + f - h > d ? "top" : "top" == i && u.top - h - f < 0 ? "bottom" : "right" == i && u.right + a > p ? "left" : "left" == i && u.left - a < v ? "right" : i),
                            r.removeClass(c).addClass(i);
                    }
                    var m = this.getCalculatedOffset(i, u, a, f);
                    this.applyPlacement(m, i), (this.hoverState = null);
                    var g = function () {
                        n.$element.trigger("shown.bs." + n.type);
                    };
                    e.support.transition && this.$tip.hasClass("fade") ? r.one(e.support.transition.end, g).emulateTransitionEnd(150) : g();
                }
            }),
            (t.prototype.applyPlacement = function (t, n) {
                var r,
                    i = this.tip(),
                    s = i[0].offsetWidth,
                    o = i[0].offsetHeight,
                    u = parseInt(i.css("margin-top"), 10),
                    a = parseInt(i.css("margin-left"), 10);
                isNaN(u) && (u = 0),
                    isNaN(a) && (a = 0),
                    (t.top = t.top + u),
                    (t.left = t.left + a),
                    e.offset.setOffset(
                        i[0],
                        e.extend(
                            {
                                using: function (e) {
                                    i.css({ top: Math.round(e.top), left: Math.round(e.left) });
                                },
                            },
                            t
                        ),
                        0
                    ),
                    i.addClass("in");
                var f = i[0].offsetWidth,
                    l = i[0].offsetHeight;
                if (("top" == n && l != o && ((r = !0), (t.top = t.top + o - l)), /bottom|top/.test(n))) {
                    var c = 0;
                    t.left < 0 && ((c = -2 * t.left), (t.left = 0), i.offset(t), (f = i[0].offsetWidth), (l = i[0].offsetHeight)), this.replaceArrow(c - s + f, f, "left");
                } else this.replaceArrow(l - o, l, "top");
                r && i.offset(t);
            }),
            (t.prototype.replaceArrow = function (e, t, n) {
                this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "");
            }),
            (t.prototype.setContent = function () {
                var e = this.tip(),
                    t = this.getTitle();
                e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right");
            }),
            (t.prototype.hide = function () {
                function t() {
                    "in" != n.hoverState && r.detach(), n.$element.trigger("hidden.bs." + n.type);
                }
                var n = this,
                    r = this.tip(),
                    i = e.Event("hide.bs." + this.type);
                return (
                    this.$element.trigger(i),
                    i.isDefaultPrevented() ? void 0 : (r.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r.one(e.support.transition.end, t).emulateTransitionEnd(150) : t(), (this.hoverState = null), this)
                );
            }),
            (t.prototype.fixTitle = function () {
                var e = this.$element;
                (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "");
            }),
            (t.prototype.hasContent = function () {
                return this.getTitle();
            }),
            (t.prototype.getPosition = function () {
                var t = this.$element[0];
                return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : { width: t.offsetWidth, height: t.offsetHeight }, this.$element.offset());
            }),
            (t.prototype.getCalculatedOffset = function (e, t, n, r) {
                return "bottom" == e
                    ? { top: t.top + t.height, left: t.left + t.width / 2 - n / 2 }
                    : "top" == e
                    ? { top: t.top - r, left: t.left + t.width / 2 - n / 2 }
                    : "left" == e
                    ? { top: t.top + t.height / 2 - r / 2, left: t.left - n }
                    : { top: t.top + t.height / 2 - r / 2, left: t.left + t.width };
            }),
            (t.prototype.getTitle = function () {
                var e,
                    t = this.$element,
                    n = this.options;
                return (e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title));
            }),
            (t.prototype.tip = function () {
                return (this.$tip = this.$tip || e(this.options.template));
            }),
            (t.prototype.arrow = function () {
                return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
            }),
            (t.prototype.validate = function () {
                this.$element[0].parentNode || (this.hide(), (this.$element = null), (this.options = null));
            }),
            (t.prototype.enable = function () {
                this.enabled = !0;
            }),
            (t.prototype.disable = function () {
                this.enabled = !1;
            }),
            (t.prototype.toggleEnabled = function () {
                this.enabled = !this.enabled;
            }),
            (t.prototype.toggle = function (t) {
                var n = t
                    ? e(t.currentTarget)
                          [this.type](this.getDelegateOptions())
                          .data("bs." + this.type)
                    : this;
                n.tip().hasClass("in") ? n.leave(n) : n.enter(n);
            }),
            (t.prototype.destroy = function () {
                clearTimeout(this.timeout),
                    this.hide()
                        .$element.off("." + this.type)
                        .removeData("bs." + this.type);
            });
        var n = e.fn.tooltip;
        (e.fn.tooltip = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.tooltip"),
                    s = "object" == typeof n && n;
                (i || "destroy" != n) && (i || r.data("bs.tooltip", (i = new t(this, s))), "string" == typeof n && i[n]());
            });
        }),
            (e.fn.tooltip.Constructor = t),
            (e.fn.tooltip.noConflict = function () {
                return (e.fn.tooltip = n), this;
            });
    })(jQuery),
    +(function (e) {
        "use strict";
        var t = function (e, t) {
            this.init("popover", e, t);
        };
        if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
        (t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
        })),
            (t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype)),
            (t.prototype.constructor = t),
            (t.prototype.getDefaults = function () {
                return t.DEFAULTS;
            }),
            (t.prototype.setContent = function () {
                var e = this.tip(),
                    t = this.getTitle(),
                    n = this.getContent();
                e.find(".popover-title")[this.options.html ? "html" : "text"](t),
                    e.find(".popover-content")[this.options.html ? ("string" == typeof n ? "html" : "append") : "text"](n),
                    e.removeClass("fade top bottom left right in"),
                    e.find(".popover-title").html() || e.find(".popover-title").hide();
            }),
            (t.prototype.hasContent = function () {
                return this.getTitle() || this.getContent();
            }),
            (t.prototype.getContent = function () {
                var e = this.$element,
                    t = this.options;
                return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content);
            }),
            (t.prototype.arrow = function () {
                return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
            }),
            (t.prototype.tip = function () {
                return this.$tip || (this.$tip = e(this.options.template)), this.$tip;
            });
        var n = e.fn.popover;
        (e.fn.popover = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.popover"),
                    s = "object" == typeof n && n;
                (i || "destroy" != n) && (i || r.data("bs.popover", (i = new t(this, s))), "string" == typeof n && i[n]());
            });
        }),
            (e.fn.popover.Constructor = t),
            (e.fn.popover.noConflict = function () {
                return (e.fn.popover = n), this;
            });
    })(jQuery),
    +(function (e) {
        "use strict";
        function t(n, r) {
            var i,
                s = e.proxy(this.process, this);
            (this.$element = e(e(n).is("body") ? window : n)),
                (this.$body = e("body")),
                (this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", s)),
                (this.options = e.extend({}, t.DEFAULTS, r)),
                (this.selector = (this.options.target || ((i = e(n).attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")) || "") + " .nav li > a"),
                (this.offsets = e([])),
                (this.targets = e([])),
                (this.activeTarget = null),
                this.refresh(),
                this.process();
        }
        (t.DEFAULTS = { offset: 10 }),
            (t.prototype.refresh = function () {
                var t = this.$element[0] == window ? "offset" : "position";
                (this.offsets = e([])), (this.targets = e([]));
                {
                    var n = this;
                    this.$body
                        .find(this.selector)
                        .map(function () {
                            var r = e(this),
                                i = r.data("target") || r.attr("href"),
                                s = /^#./.test(i) && e(i);
                            return (s && s.length && s.is(":visible") && [[s[t]().top + (!e.isWindow(n.$scrollElement.get(0)) && n.$scrollElement.scrollTop()), i]]) || null;
                        })
                        .sort(function (e, t) {
                            return e[0] - t[0];
                        })
                        .each(function () {
                            n.offsets.push(this[0]), n.targets.push(this[1]);
                        });
                }
            }),
            (t.prototype.process = function () {
                var e,
                    t = this.$scrollElement.scrollTop() + this.options.offset,
                    n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                    r = n - this.$scrollElement.height(),
                    i = this.offsets,
                    s = this.targets,
                    o = this.activeTarget;
                if (t >= r) return o != (e = s.last()[0]) && this.activate(e);
                if (o && t <= i[0]) return o != (e = s[0]) && this.activate(e);
                for (e = i.length; e--; ) o != s[e] && t >= i[e] && (!i[e + 1] || t <= i[e + 1]) && this.activate(s[e]);
            }),
            (t.prototype.activate = function (t) {
                (this.activeTarget = t), e(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
                var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
                    r = e(n).parents("li").addClass("active");
                r.parent(".dropdown-menu").length && (r = r.closest("li.dropdown").addClass("active")), r.trigger("activate.bs.scrollspy");
            });
        var n = e.fn.scrollspy;
        (e.fn.scrollspy = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.scrollspy"),
                    s = "object" == typeof n && n;
                i || r.data("bs.scrollspy", (i = new t(this, s))), "string" == typeof n && i[n]();
            });
        }),
            (e.fn.scrollspy.Constructor = t),
            (e.fn.scrollspy.noConflict = function () {
                return (e.fn.scrollspy = n), this;
            }),
            e(window).on("load", function () {
                e('[data-spy="scroll"]').each(function () {
                    var t = e(this);
                    t.scrollspy(t.data());
                });
            });
    })(jQuery),
    +(function (e) {
        "use strict";
        var t = function (t) {
            this.element = e(t);
        };
        (t.prototype.show = function () {
            var t = this.element,
                n = t.closest("ul:not(.dropdown-menu)"),
                r = t.data("target");
            if ((r || ((r = t.attr("href")), (r = r && r.replace(/.*(?=#[^\s]*$)/, ""))), !t.parent("li").hasClass("active"))) {
                var i = n.find(".active:last a")[0],
                    s = e.Event("show.bs.tab", { relatedTarget: i });
                if ((t.trigger(s), !s.isDefaultPrevented())) {
                    var o = e(r);
                    this.activate(t.parent("li"), n),
                        this.activate(o, o.parent(), function () {
                            t.trigger({ type: "shown.bs.tab", relatedTarget: i });
                        });
                }
            }
        }),
            (t.prototype.activate = function (t, n, r) {
                function i() {
                    s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),
                        t.addClass("active"),
                        o ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"),
                        t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"),
                        r && r();
                }
                var s = n.find("> .active"),
                    o = r && e.support.transition && s.hasClass("fade");
                o ? s.one(e.support.transition.end, i).emulateTransitionEnd(150) : i(), s.removeClass("in");
            });
        var n = e.fn.tab;
        (e.fn.tab = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.tab");
                i || r.data("bs.tab", (i = new t(this))), "string" == typeof n && i[n]();
            });
        }),
            (e.fn.tab.Constructor = t),
            (e.fn.tab.noConflict = function () {
                return (e.fn.tab = n), this;
            }),
            e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
                t.preventDefault(), e(this).tab("show");
            });
    })(jQuery),
    +(function (e) {
        "use strict";
        var t = function (n, r) {
            (this.options = e.extend({}, t.DEFAULTS, r)),
                (this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this))),
                (this.$element = e(n)),
                (this.affixed = this.unpin = this.pinnedOffset = null),
                this.checkPosition();
        };
        (t.RESET = "affix affix-top affix-bottom"),
            (t.DEFAULTS = { offset: 0 }),
            (t.prototype.getPinnedOffset = function () {
                if (this.pinnedOffset) return this.pinnedOffset;
                this.$element.removeClass(t.RESET).addClass("affix");
                var e = this.$window.scrollTop(),
                    n = this.$element.offset();
                return (this.pinnedOffset = n.top - e);
            }),
            (t.prototype.checkPositionWithEventLoop = function () {
                setTimeout(e.proxy(this.checkPosition, this), 1);
            }),
            (t.prototype.checkPosition = function () {
                if (this.$element.is(":visible")) {
                    var n = e(document).height(),
                        r = this.$window.scrollTop(),
                        i = this.$element.offset(),
                        s = this.options.offset,
                        o = s.top,
                        u = s.bottom;
                    "top" == this.affixed && (i.top += r), "object" != typeof s && (u = o = s), "function" == typeof o && (o = s.top(this.$element)), "function" == typeof u && (u = s.bottom(this.$element));
                    var a = null != this.unpin && r + this.unpin <= i.top ? !1 : null != u && i.top + this.$element.height() >= n - u ? "bottom" : null != o && o >= r ? "top" : !1;
                    if (this.affixed !== a) {
                        this.unpin && this.$element.css("top", "");
                        var f = "affix" + (a ? "-" + a : ""),
                            l = e.Event(f + ".bs.affix");
                        this.$element.trigger(l),
                            l.isDefaultPrevented() ||
                                ((this.affixed = a),
                                (this.unpin = "bottom" == a ? this.getPinnedOffset() : null),
                                this.$element
                                    .removeClass(t.RESET)
                                    .addClass(f)
                                    .trigger(e.Event(f.replace("affix", "affixed"))),
                                "bottom" == a && this.$element.offset({ top: n - u - this.$element.height() }));
                    }
                }
            });
        var n = e.fn.affix;
        (e.fn.affix = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.affix"),
                    s = "object" == typeof n && n;
                i || r.data("bs.affix", (i = new t(this, s))), "string" == typeof n && i[n]();
            });
        }),
            (e.fn.affix.Constructor = t),
            (e.fn.affix.noConflict = function () {
                return (e.fn.affix = n), this;
            }),
            e(window).on("load", function () {
                e('[data-spy="affix"]').each(function () {
                    var t = e(this),
                        n = t.data();
                    (n.offset = n.offset || {}), n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n);
                });
            });
    })(jQuery);
(function (e) {
    "use strict";
    function t(e) {
        return new RegExp("(^|\\s+)" + e + "(\\s+|$)");
    }
    function n(e, t) {
        var n = r(e, t) ? s : i;
        n(e, t);
    }
    var r, i, s;
    if ("classList" in document.documentElement) {
        r = function (e, t) {
            return e.classList.contains(t);
        };
        i = function (e, t) {
            e.classList.add(t);
        };
        s = function (e, t) {
            e.classList.remove(t);
        };
    } else {
        r = function (e, n) {
            return t(n).test(e.className);
        };
        i = function (e, t) {
            if (!r(e, t)) {
                e.className = e.className + " " + t;
            }
        };
        s = function (e, n) {
            e.className = e.className.replace(t(n), " ");
        };
    }
    var o = { hasClass: r, addClass: i, removeClass: s, toggleClass: n, has: r, add: i, remove: s, toggle: n };
    if (typeof define === "function" && define.amd) {
        define(o);
    } else {
        e.classie = o;
    }
})(window);
!(function (e) {
    "use strict";
})(jQuery);
(function (e) {
    e.fn.countTo = function (t) {
        t = e.extend({}, e.fn.countTo.defaults, t || {});
        var n = Math.ceil(t.speed / t.refreshInterval),
            r = (t.to - t.from) / n;
        return e(this).each(function () {
            function i() {
                u += r;
                o++;
                e(s).html(u.toFixed(t.decimals));
                if (typeof t.onUpdate == "function") {
                    t.onUpdate.call(s, u);
                }
                if (o >= n) {
                    clearInterval(a);
                    u = t.to;
                    if (typeof t.onComplete == "function") {
                        t.onComplete.call(s, u);
                    }
                }
            }
            var s = this,
                o = 0,
                u = t.from,
                a = setInterval(i, t.refreshInterval);
        });
    };
    e.fn.countTo.defaults = { from: 0, to: 100, speed: 1e3, refreshInterval: 100, decimals: 0, onUpdate: null, onComplete: null };
})(jQuery);
(function () {
    function e() {}
    function t(e, t) {
        var n = e.length;
        while (n--) {
            if (e[n].listener === t) {
                return n;
            }
        }
        return -1;
    }
    function n(e) {
        return function () {
            return this[e].apply(this, arguments);
        };
    }
    var r = e.prototype;
    var i = this;
    var s = i.EventEmitter;
    r.getListeners = function (e) {
        var t = this._getEvents();
        var n;
        var r;
        if (typeof e === "object") {
            n = {};
            for (r in t) {
                if (t.hasOwnProperty(r) && e.test(r)) {
                    n[r] = t[r];
                }
            }
        } else {
            n = t[e] || (t[e] = []);
        }
        return n;
    };
    r.flattenListeners = function (e) {
        var t = [];
        var n;
        for (n = 0; n < e.length; n += 1) {
            t.push(e[n].listener);
        }
        return t;
    };
    r.getListenersAsObject = function (e) {
        var t = this.getListeners(e);
        var n;
        if (t instanceof Array) {
            n = {};
            n[e] = t;
        }
        return n || t;
    };
    r.addListener = function (e, n) {
        var r = this.getListenersAsObject(e);
        var i = typeof n === "object";
        var s;
        for (s in r) {
            if (r.hasOwnProperty(s) && t(r[s], n) === -1) {
                r[s].push(i ? n : { listener: n, once: false });
            }
        }
        return this;
    };
    r.on = n("addListener");
    r.addOnceListener = function (e, t) {
        return this.addListener(e, { listener: t, once: true });
    };
    r.once = n("addOnceListener");
    r.defineEvent = function (e) {
        this.getListeners(e);
        return this;
    };
    r.defineEvents = function (e) {
        for (var t = 0; t < e.length; t += 1) {
            this.defineEvent(e[t]);
        }
        return this;
    };
    r.removeListener = function (e, n) {
        var r = this.getListenersAsObject(e);
        var i;
        var s;
        for (s in r) {
            if (r.hasOwnProperty(s)) {
                i = t(r[s], n);
                if (i !== -1) {
                    r[s].splice(i, 1);
                }
            }
        }
        return this;
    };
    r.off = n("removeListener");
    r.addListeners = function (e, t) {
        return this.manipulateListeners(false, e, t);
    };
    r.removeListeners = function (e, t) {
        return this.manipulateListeners(true, e, t);
    };
    r.manipulateListeners = function (e, t, n) {
        var r;
        var i;
        var s = e ? this.removeListener : this.addListener;
        var o = e ? this.removeListeners : this.addListeners;
        if (typeof t === "object" && !(t instanceof RegExp)) {
            for (r in t) {
                if (t.hasOwnProperty(r) && (i = t[r])) {
                    if (typeof i === "function") {
                        s.call(this, r, i);
                    } else {
                        o.call(this, r, i);
                    }
                }
            }
        } else {
            r = n.length;
            while (r--) {
                s.call(this, t, n[r]);
            }
        }
        return this;
    };
    r.removeEvent = function (e) {
        var t = typeof e;
        var n = this._getEvents();
        var r;
        if (t === "string") {
            delete n[e];
        } else if (t === "object") {
            for (r in n) {
                if (n.hasOwnProperty(r) && e.test(r)) {
                    delete n[r];
                }
            }
        } else {
            delete this._events;
        }
        return this;
    };
    r.removeAllListeners = n("removeEvent");
    r.emitEvent = function (e, t) {
        var n = this.getListenersAsObject(e);
        var r;
        var i;
        var s;
        var o;
        for (s in n) {
            if (n.hasOwnProperty(s)) {
                i = n[s].length;
                while (i--) {
                    r = n[s][i];
                    if (r.once === true) {
                        this.removeListener(e, r.listener);
                    }
                    o = r.listener.apply(this, t || []);
                    if (o === this._getOnceReturnValue()) {
                        this.removeListener(e, r.listener);
                    }
                }
            }
        }
        return this;
    };
    r.trigger = n("emitEvent");
    r.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t);
    };
    r.setOnceReturnValue = function (e) {
        this._onceReturnValue = e;
        return this;
    };
    r._getOnceReturnValue = function () {
        if (this.hasOwnProperty("_onceReturnValue")) {
            return this._onceReturnValue;
        } else {
            return true;
        }
    };
    r._getEvents = function () {
        return this._events || (this._events = {});
    };
    e.noConflict = function () {
        i.EventEmitter = s;
        return e;
    };
    if (typeof define === "function" && define.amd) {
        define("eventEmitter/EventEmitter", [], function () {
            return e;
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = e;
    } else {
        this.EventEmitter = e;
    }
}.call(this));
(function (e) {
    function t(t) {
        var n = e.event;
        n.target = n.target || n.srcElement || t;
        return n;
    }
    var n = document.documentElement;
    var r = function () {};
    if (n.addEventListener) {
        r = function (e, t, n) {
            e.addEventListener(t, n, false);
        };
    } else if (n.attachEvent) {
        r = function (e, n, r) {
            e[n + r] = r.handleEvent
                ? function () {
                      var n = t(e);
                      r.handleEvent.call(r, n);
                  }
                : function () {
                      var n = t(e);
                      r.call(e, n);
                  };
            e.attachEvent("on" + n, e[n + r]);
        };
    }
    var i = function () {};
    if (n.removeEventListener) {
        i = function (e, t, n) {
            e.removeEventListener(t, n, false);
        };
    } else if (n.detachEvent) {
        i = function (e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n];
            } catch (r) {
                e[t + n] = undefined;
            }
        };
    }
    var s = { bind: r, unbind: i };
    if (typeof define === "function" && define.amd) {
        define("eventie/eventie", s);
    } else {
        e.eventie = s;
    }
})(this);
(function (e, t) {
    if (typeof define === "function" && define.amd) {
        define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, r) {
            return t(e, n, r);
        });
    } else if (typeof exports === "object") {
        module.exports = t(e, require("eventEmitter"), require("eventie"));
    } else {
        e.imagesLoaded = t(e, e.EventEmitter, e.eventie);
    }
})(this, function (e, t, n) {
    function r(e, t) {
        for (var n in t) {
            e[n] = t[n];
        }
        return e;
    }
    function i(e) {
        return h.call(e) === "[object Array]";
    }
    function s(e) {
        var t = [];
        if (i(e)) {
            t = e;
        } else if (typeof e.length === "number") {
            for (var n = 0, r = e.length; n < r; n++) {
                t.push(e[n]);
            }
        } else {
            t.push(e);
        }
        return t;
    }
    function o(e, t, n) {
        if (!(this instanceof o)) {
            return new o(e, t);
        }
        if (typeof e === "string") {
            e = document.querySelectorAll(e);
        }
        this.elements = s(e);
        this.options = r({}, this.options);
        if (typeof t === "function") {
            n = t;
        } else {
            r(this.options, t);
        }
        if (n) {
            this.on("always", n);
        }
        this.getImages();
        if (f) {
            this.jqDeferred = new f.Deferred();
        }
        var i = this;
        setTimeout(function () {
            i.check();
        });
    }
    function u(e) {
        this.img = e;
    }
    function a(e) {
        this.src = e;
        p[e] = this;
    }
    var f = e.jQuery;
    var l = e.console;
    var c = typeof l !== "undefined";
    var h = Object.prototype.toString;
    o.prototype = new t();
    o.prototype.options = {};
    o.prototype.getImages = function () {
        this.images = [];
        for (var e = 0, t = this.elements.length; e < t; e++) {
            var n = this.elements[e];
            if (n.nodeName === "IMG") {
                this.addImage(n);
            }
            var r = n.nodeType;
            if (!r || !(r === 1 || r === 9 || r === 11)) {
                continue;
            }
            var i = n.querySelectorAll("img");
            for (var s = 0, o = i.length; s < o; s++) {
                var u = i[s];
                this.addImage(u);
            }
        }
    };
    o.prototype.addImage = function (e) {
        var t = new u(e);
        this.images.push(t);
    };
    o.prototype.check = function () {
        function e(e, i) {
            if (t.options.debug && c) {
                l.log("confirm", e, i);
            }
            t.progress(e);
            n++;
            if (n === r) {
                t.complete();
            }
            return true;
        }
        var t = this;
        var n = 0;
        var r = this.images.length;
        this.hasAnyBroken = false;
        if (!r) {
            this.complete();
            return;
        }
        for (var i = 0; i < r; i++) {
            var s = this.images[i];
            s.on("confirm", e);
            s.check();
        }
    };
    o.prototype.progress = function (e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function () {
            t.emit("progress", t, e);
            if (t.jqDeferred && t.jqDeferred.notify) {
                t.jqDeferred.notify(t, e);
            }
        });
    };
    o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = true;
        var t = this;
        setTimeout(function () {
            t.emit(e, t);
            t.emit("always", t);
            if (t.jqDeferred) {
                var n = t.hasAnyBroken ? "reject" : "resolve";
                t.jqDeferred[n](t);
            }
        });
    };
    if (f) {
        f.fn.imagesLoaded = function (e, t) {
            var n = new o(this, e, t);
            return n.jqDeferred.promise(f(this));
        };
    }
    u.prototype = new t();
    u.prototype.check = function () {
        var e = p[this.img.src] || new a(this.img.src);
        if (e.isConfirmed) {
            this.confirm(e.isLoaded, "cached was confirmed");
            return;
        }
        if (this.img.complete && this.img.naturalWidth !== undefined) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            return;
        }
        var t = this;
        e.on("confirm", function (e, n) {
            t.confirm(e.isLoaded, n);
            return true;
        });
        e.check();
    };
    u.prototype.confirm = function (e, t) {
        this.isLoaded = e;
        this.emit("confirm", this, t);
    };
    var p = {};
    a.prototype = new t();
    a.prototype.check = function () {
        if (this.isChecked) {
            return;
        }
        var e = new Image();
        n.bind(e, "load", this);
        n.bind(e, "error", this);
        e.src = this.src;
        this.isChecked = true;
    };
    a.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        if (this[t]) {
            this[t](e);
        }
    };
    a.prototype.onload = function (e) {
        this.confirm(true, "onload");
        this.unbindProxyEvents(e);
    };
    a.prototype.onerror = function (e) {
        this.confirm(false, "onerror");
        this.unbindProxyEvents(e);
    };
    a.prototype.confirm = function (e, t) {
        this.isConfirmed = true;
        this.isLoaded = e;
        this.emit("confirm", this, t);
    };
    a.prototype.unbindProxyEvents = function (e) {
        n.unbind(e.target, "load", this);
        n.unbind(e.target, "error", this);
    };
    return o;
});
(function (e) {
    function t() {}
    function n(e) {
        function n(t) {
            t.prototype.option ||
                (t.prototype.option = function (t) {
                    e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t));
                });
        }
        function i(t, n) {
            e.fn[t] = function (i) {
                if ("string" == typeof i) {
                    for (var o = r.call(arguments, 1), u = 0, a = this.length; a > u; u++) {
                        var f = this[u],
                            l = e.data(f, t);
                        if (l)
                            if (e.isFunction(l[i]) && "_" !== i.charAt(0)) {
                                var c = l[i].apply(l, o);
                                if (void 0 !== c) return c;
                            } else s("no such method '" + i + "' for " + t + " instance");
                        else s("cannot call methods on " + t + " prior to initialization; " + "attempted to call '" + i + "'");
                    }
                    return this;
                }
                return this.each(function () {
                    var r = e.data(this, t);
                    r ? (r.option(i), r._init()) : ((r = new n(this, i)), e.data(this, t, r));
                });
            };
        }
        if (e) {
            var s =
                "undefined" == typeof console
                    ? t
                    : function (e) {
                          console.error(e);
                      };
            return (
                (e.bridget = function (e, t) {
                    n(t), i(e, t);
                }),
                e.bridget
            );
        }
    }
    var r = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], n) : n(e.jQuery);
})(window),
    (function (e) {
        function t(t) {
            var n = e.event;
            return (n.target = n.target || n.srcElement || t), n;
        }
        var n = document.documentElement,
            r = function () {};
        n.addEventListener
            ? (r = function (e, t, n) {
                  e.addEventListener(t, n, !1);
              })
            : n.attachEvent &&
              (r = function (e, n, r) {
                  (e[n + r] = r.handleEvent
                      ? function () {
                            var n = t(e);
                            r.handleEvent.call(r, n);
                        }
                      : function () {
                            var n = t(e);
                            r.call(e, n);
                        }),
                      e.attachEvent("on" + n, e[n + r]);
              });
        var i = function () {};
        n.removeEventListener
            ? (i = function (e, t, n) {
                  e.removeEventListener(t, n, !1);
              })
            : n.detachEvent &&
              (i = function (e, t, n) {
                  e.detachEvent("on" + t, e[t + n]);
                  try {
                      delete e[t + n];
                  } catch (r) {
                      e[t + n] = void 0;
                  }
              });
        var s = { bind: r, unbind: i };
        "function" == typeof define && define.amd ? define("eventie/eventie", s) : "object" == typeof exports ? (module.exports = s) : (e.eventie = s);
    })(this),
    (function (e) {
        function t(e) {
            "function" == typeof e && (t.isReady ? e() : s.push(e));
        }
        function n(e) {
            var n = "readystatechange" === e.type && "complete" !== i.readyState;
            if (!t.isReady && !n) {
                t.isReady = !0;
                for (var r = 0, o = s.length; o > r; r++) {
                    var u = s[r];
                    u();
                }
            }
        }
        function r(r) {
            return r.bind(i, "DOMContentLoaded", n), r.bind(i, "readystatechange", n), r.bind(e, "load", n), t;
        }
        var i = e.document,
            s = [];
        (t.isReady = !1), "function" == typeof define && define.amd ? ((t.isReady = "function" == typeof requirejs), define("doc-ready/doc-ready", ["eventie/eventie"], r)) : (e.docReady = r(e.eventie));
    })(this),
    function () {
        function e() {}
        function t(e, t) {
            for (var n = e.length; n--; ) if (e[n].listener === t) return n;
            return -1;
        }
        function n(e) {
            return function () {
                return this[e].apply(this, arguments);
            };
        }
        var r = e.prototype,
            i = this,
            s = i.EventEmitter;
        (r.getListeners = function (e) {
            var t,
                n,
                r = this._getEvents();
            if (e instanceof RegExp) {
                t = {};
                for (n in r) r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n]);
            } else t = r[e] || (r[e] = []);
            return t;
        }),
            (r.flattenListeners = function (e) {
                var t,
                    n = [];
                for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
                return n;
            }),
            (r.getListenersAsObject = function (e) {
                var t,
                    n = this.getListeners(e);
                return n instanceof Array && ((t = {}), (t[e] = n)), t || n;
            }),
            (r.addListener = function (e, n) {
                var r,
                    i = this.getListenersAsObject(e),
                    s = "object" == typeof n;
                for (r in i) i.hasOwnProperty(r) && -1 === t(i[r], n) && i[r].push(s ? n : { listener: n, once: !1 });
                return this;
            }),
            (r.on = n("addListener")),
            (r.addOnceListener = function (e, t) {
                return this.addListener(e, { listener: t, once: !0 });
            }),
            (r.once = n("addOnceListener")),
            (r.defineEvent = function (e) {
                return this.getListeners(e), this;
            }),
            (r.defineEvents = function (e) {
                for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
                return this;
            }),
            (r.removeListener = function (e, n) {
                var r,
                    i,
                    s = this.getListenersAsObject(e);
                for (i in s) s.hasOwnProperty(i) && ((r = t(s[i], n)), -1 !== r && s[i].splice(r, 1));
                return this;
            }),
            (r.off = n("removeListener")),
            (r.addListeners = function (e, t) {
                return this.manipulateListeners(!1, e, t);
            }),
            (r.removeListeners = function (e, t) {
                return this.manipulateListeners(!0, e, t);
            }),
            (r.manipulateListeners = function (e, t, n) {
                var r,
                    i,
                    s = e ? this.removeListener : this.addListener,
                    o = e ? this.removeListeners : this.addListeners;
                if ("object" != typeof t || t instanceof RegExp) for (r = n.length; r--; ) s.call(this, t, n[r]);
                else for (r in t) t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));
                return this;
            }),
            (r.removeEvent = function (e) {
                var t,
                    n = typeof e,
                    r = this._getEvents();
                if ("string" === n) delete r[e];
                else if (e instanceof RegExp) for (t in r) r.hasOwnProperty(t) && e.test(t) && delete r[t];
                else delete this._events;
                return this;
            }),
            (r.removeAllListeners = n("removeEvent")),
            (r.emitEvent = function (e, t) {
                var n,
                    r,
                    i,
                    s,
                    o = this.getListenersAsObject(e);
                for (i in o)
                    if (o.hasOwnProperty(i))
                        for (r = o[i].length; r--; ) (n = o[i][r]), n.once === !0 && this.removeListener(e, n.listener), (s = n.listener.apply(this, t || [])), s === this._getOnceReturnValue() && this.removeListener(e, n.listener);
                return this;
            }),
            (r.trigger = n("emitEvent")),
            (r.emit = function (e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(e, t);
            }),
            (r.setOnceReturnValue = function (e) {
                return (this._onceReturnValue = e), this;
            }),
            (r._getOnceReturnValue = function () {
                return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
            }),
            (r._getEvents = function () {
                return this._events || (this._events = {});
            }),
            (e.noConflict = function () {
                return (i.EventEmitter = s), e;
            }),
            "function" == typeof define && define.amd
                ? define("eventEmitter/EventEmitter", [], function () {
                      return e;
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = e)
                : (this.EventEmitter = e);
    }.call(this),
    (function (e) {
        function t(e) {
            if (e) {
                if ("string" == typeof r[e]) return e;
                e = e.charAt(0).toUpperCase() + e.slice(1);
                for (var t, i = 0, s = n.length; s > i; i++) if (((t = n[i] + e), "string" == typeof r[t])) return t;
            }
        }
        var n = "Webkit Moz ms Ms O".split(" "),
            r = document.documentElement.style;
        "function" == typeof define && define.amd
            ? define("get-style-property/get-style-property", [], function () {
                  return t;
              })
            : "object" == typeof exports
            ? (module.exports = t)
            : (e.getStyleProperty = t);
    })(window),
    (function (e) {
        function t(e) {
            var t = parseFloat(e),
                n = -1 === e.indexOf("%") && !isNaN(t);
            return n && t;
        }
        function n() {
            for (var e = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, t = 0, n = o.length; n > t; t++) {
                var r = o[t];
                e[r] = 0;
            }
            return e;
        }
        function r(e) {
            function r(e) {
                if (("string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType)) {
                    var r = s(e);
                    if ("none" === r.display) return n();
                    var i = {};
                    (i.width = e.offsetWidth), (i.height = e.offsetHeight);
                    for (var l = (i.isBorderBox = !(!f || !r[f] || "border-box" !== r[f])), c = 0, h = o.length; h > c; c++) {
                        var p = o[c],
                            d = r[p];
                        d = u(e, d);
                        var v = parseFloat(d);
                        i[p] = isNaN(v) ? 0 : v;
                    }
                    var m = i.paddingLeft + i.paddingRight,
                        g = i.paddingTop + i.paddingBottom,
                        y = i.marginLeft + i.marginRight,
                        b = i.marginTop + i.marginBottom,
                        w = i.borderLeftWidth + i.borderRightWidth,
                        E = i.borderTopWidth + i.borderBottomWidth,
                        S = l && a,
                        x = t(r.width);
                    x !== !1 && (i.width = x + (S ? 0 : m + w));
                    var T = t(r.height);
                    return T !== !1 && (i.height = T + (S ? 0 : g + E)), (i.innerWidth = i.width - (m + w)), (i.innerHeight = i.height - (g + E)), (i.outerWidth = i.width + y), (i.outerHeight = i.height + b), i;
                }
            }
            function u(e, t) {
                if (i || -1 === t.indexOf("%")) return t;
                var n = e.style,
                    r = n.left,
                    s = e.runtimeStyle,
                    o = s && s.left;
                return o && (s.left = e.currentStyle.left), (n.left = t), (t = n.pixelLeft), (n.left = r), o && (s.left = o), t;
            }
            var a,
                f = e("boxSizing");
            return (
                (function () {
                    if (f) {
                        var e = document.createElement("div");
                        (e.style.width = "200px"), (e.style.padding = "1px 2px 3px 4px"), (e.style.borderStyle = "solid"), (e.style.borderWidth = "1px 2px 3px 4px"), (e.style[f] = "border-box");
                        var n = document.body || document.documentElement;
                        n.appendChild(e);
                        var r = s(e);
                        (a = 200 === t(r.width)), n.removeChild(e);
                    }
                })(),
                r
            );
        }
        var i = e.getComputedStyle,
            s = i
                ? function (e) {
                      return i(e, null);
                  }
                : function (e) {
                      return e.currentStyle;
                  },
            o = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd
            ? define("get-size/get-size", ["get-style-property/get-style-property"], r)
            : "object" == typeof exports
            ? (module.exports = r(require("get-style-property")))
            : (e.getSize = r(e.getStyleProperty));
    })(window),
    (function (e, t) {
        function n(e, t) {
            return e[u](t);
        }
        function r(e) {
            if (!e.parentNode) {
                var t = document.createDocumentFragment();
                t.appendChild(e);
            }
        }
        function i(e, t) {
            r(e);
            for (var n = e.parentNode.querySelectorAll(t), i = 0, s = n.length; s > i; i++) if (n[i] === e) return !0;
            return !1;
        }
        function s(e, t) {
            return r(e), n(e, t);
        }
        var o,
            u = (function () {
                if (t.matchesSelector) return "matchesSelector";
                for (var e = ["webkit", "moz", "ms", "o"], n = 0, r = e.length; r > n; n++) {
                    var i = e[n],
                        s = i + "MatchesSelector";
                    if (t[s]) return s;
                }
            })();
        if (u) {
            var a = document.createElement("div"),
                f = n(a, "div");
            o = f ? n : s;
        } else o = i;
        "function" == typeof define && define.amd
            ? define("matches-selector/matches-selector", [], function () {
                  return o;
              })
            : (window.matchesSelector = o);
    })(this, Element.prototype),
    (function (e) {
        function t(e, t) {
            for (var n in t) e[n] = t[n];
            return e;
        }
        function n(e) {
            for (var t in e) return !1;
            return (t = null), !0;
        }
        function r(e) {
            return e.replace(/([A-Z])/g, function (e) {
                return "-" + e.toLowerCase();
            });
        }
        function i(e, i, s) {
            function u(e, t) {
                e && ((this.element = e), (this.layout = t), (this.position = { x: 0, y: 0 }), this._create());
            }
            var a = s("transition"),
                f = s("transform"),
                l = a && f,
                c = !!s("perspective"),
                h = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "otransitionend", transition: "transitionend" }[a],
                p = ["transform", "transition", "transitionDuration", "transitionProperty"],
                d = (function () {
                    for (var e = {}, t = 0, n = p.length; n > t; t++) {
                        var r = p[t],
                            i = s(r);
                        i && i !== r && (e[r] = i);
                    }
                    return e;
                })();
            t(u.prototype, e.prototype),
                (u.prototype._create = function () {
                    (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }), this.css({ position: "absolute" });
                }),
                (u.prototype.handleEvent = function (e) {
                    var t = "on" + e.type;
                    this[t] && this[t](e);
                }),
                (u.prototype.getSize = function () {
                    this.size = i(this.element);
                }),
                (u.prototype.css = function (e) {
                    var t = this.element.style;
                    for (var n in e) {
                        var r = d[n] || n;
                        t[r] = e[n];
                    }
                }),
                (u.prototype.getPosition = function () {
                    var e = o(this.element),
                        t = this.layout.options,
                        n = t.isOriginLeft,
                        r = t.isOriginTop,
                        i = parseInt(e[n ? "left" : "right"], 10),
                        s = parseInt(e[r ? "top" : "bottom"], 10);
                    (i = isNaN(i) ? 0 : i), (s = isNaN(s) ? 0 : s);
                    var u = this.layout.size;
                    (i -= n ? u.paddingLeft : u.paddingRight), (s -= r ? u.paddingTop : u.paddingBottom), (this.position.x = i), (this.position.y = s);
                }),
                (u.prototype.layoutPosition = function () {
                    var e = this.layout.size,
                        t = this.layout.options,
                        n = {};
                    t.isOriginLeft ? ((n.left = this.position.x + e.paddingLeft + "px"), (n.right = "")) : ((n.right = this.position.x + e.paddingRight + "px"), (n.left = "")),
                        t.isOriginTop ? ((n.top = this.position.y + e.paddingTop + "px"), (n.bottom = "")) : ((n.bottom = this.position.y + e.paddingBottom + "px"), (n.top = "")),
                        this.css(n),
                        this.emitEvent("layout", [this]);
                });
            var v = c
                ? function (e, t) {
                      return "translate3d(" + e + "px, " + t + "px, 0)";
                  }
                : function (e, t) {
                      return "translate(" + e + "px, " + t + "px)";
                  };
            (u.prototype._transitionTo = function (e, t) {
                this.getPosition();
                var n = this.position.x,
                    r = this.position.y,
                    i = parseInt(e, 10),
                    s = parseInt(t, 10),
                    o = i === this.position.x && s === this.position.y;
                if ((this.setPosition(e, t), o && !this.isTransitioning)) return this.layoutPosition(), void 0;
                var u = e - n,
                    a = t - r,
                    f = {},
                    l = this.layout.options;
                (u = l.isOriginLeft ? u : -u), (a = l.isOriginTop ? a : -a), (f.transform = v(u, a)), this.transition({ to: f, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 });
            }),
                (u.prototype.goTo = function (e, t) {
                    this.setPosition(e, t), this.layoutPosition();
                }),
                (u.prototype.moveTo = l ? u.prototype._transitionTo : u.prototype.goTo),
                (u.prototype.setPosition = function (e, t) {
                    (this.position.x = parseInt(e, 10)), (this.position.y = parseInt(t, 10));
                }),
                (u.prototype._nonTransition = function (e) {
                    this.css(e.to), e.isCleaning && this._removeStyles(e.to);
                    for (var t in e.onTransitionEnd) e.onTransitionEnd[t].call(this);
                }),
                (u.prototype._transition = function (e) {
                    if (!parseFloat(this.layout.options.transitionDuration)) return this._nonTransition(e), void 0;
                    var t = this._transn;
                    for (var n in e.onTransitionEnd) t.onEnd[n] = e.onTransitionEnd[n];
                    for (n in e.to) (t.ingProperties[n] = !0), e.isCleaning && (t.clean[n] = !0);
                    if (e.from) {
                        this.css(e.from);
                        var r = this.element.offsetHeight;
                        r = null;
                    }
                    this.enableTransition(e.to), this.css(e.to), (this.isTransitioning = !0);
                });
            var m = f && r(f) + ",opacity";
            (u.prototype.enableTransition = function () {
                this.isTransitioning || (this.css({ transitionProperty: m, transitionDuration: this.layout.options.transitionDuration }), this.element.addEventListener(h, this, !1));
            }),
                (u.prototype.transition = u.prototype[a ? "_transition" : "_nonTransition"]),
                (u.prototype.onwebkitTransitionEnd = function (e) {
                    this.ontransitionend(e);
                }),
                (u.prototype.onotransitionend = function (e) {
                    this.ontransitionend(e);
                });
            var g = { "-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform" };
            (u.prototype.ontransitionend = function (e) {
                if (e.target === this.element) {
                    var t = this._transn,
                        r = g[e.propertyName] || e.propertyName;
                    if ((delete t.ingProperties[r], n(t.ingProperties) && this.disableTransition(), r in t.clean && ((this.element.style[e.propertyName] = ""), delete t.clean[r]), r in t.onEnd)) {
                        var i = t.onEnd[r];
                        i.call(this), delete t.onEnd[r];
                    }
                    this.emitEvent("transitionEnd", [this]);
                }
            }),
                (u.prototype.disableTransition = function () {
                    this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), (this.isTransitioning = !1);
                }),
                (u.prototype._removeStyles = function (e) {
                    var t = {};
                    for (var n in e) t[n] = "";
                    this.css(t);
                });
            var y = { transitionProperty: "", transitionDuration: "" };
            return (
                (u.prototype.removeTransitionStyles = function () {
                    this.css(y);
                }),
                (u.prototype.removeElem = function () {
                    this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this]);
                }),
                (u.prototype.remove = function () {
                    if (!a || !parseFloat(this.layout.options.transitionDuration)) return this.removeElem(), void 0;
                    var e = this;
                    this.on("transitionEnd", function () {
                        return e.removeElem(), !0;
                    }),
                        this.hide();
                }),
                (u.prototype.reveal = function () {
                    delete this.isHidden, this.css({ display: "" });
                    var e = this.layout.options;
                    this.transition({ from: e.hiddenStyle, to: e.visibleStyle, isCleaning: !0 });
                }),
                (u.prototype.hide = function () {
                    (this.isHidden = !0), this.css({ display: "" });
                    var e = this.layout.options;
                    this.transition({
                        from: e.visibleStyle,
                        to: e.hiddenStyle,
                        isCleaning: !0,
                        onTransitionEnd: {
                            opacity: function () {
                                this.isHidden && this.css({ display: "none" });
                            },
                        },
                    });
                }),
                (u.prototype.destroy = function () {
                    this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" });
                }),
                u
            );
        }
        var s = e.getComputedStyle,
            o = s
                ? function (e) {
                      return s(e, null);
                  }
                : function (e) {
                      return e.currentStyle;
                  };
        "function" == typeof define && define.amd
            ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], i)
            : ((e.Outlayer = {}), (e.Outlayer.Item = i(e.EventEmitter, e.getSize, e.getStyleProperty)));
    })(window),
    (function (e) {
        function t(e, t) {
            for (var n in t) e[n] = t[n];
            return e;
        }
        function n(e) {
            return "[object Array]" === c.call(e);
        }
        function r(e) {
            var t = [];
            if (n(e)) t = e;
            else if (e && "number" == typeof e.length) for (var r = 0, i = e.length; i > r; r++) t.push(e[r]);
            else t.push(e);
            return t;
        }
        function i(e, t) {
            var n = p(t, e);
            -1 !== n && t.splice(n, 1);
        }
        function s(e) {
            return e
                .replace(/(.)([A-Z])/g, function (e, t, n) {
                    return t + "-" + n;
                })
                .toLowerCase();
        }
        function o(n, o, c, p, d, v) {
            function m(e, n) {
                if (("string" == typeof e && (e = u.querySelector(e)), !e || !h(e))) return a && a.error("Bad " + this.constructor.namespace + " element: " + e), void 0;
                (this.element = e), (this.options = t({}, this.constructor.defaults)), this.option(n);
                var r = ++g;
                (this.element.outlayerGUID = r), (y[r] = this), this._create(), this.options.isInitLayout && this.layout();
            }
            var g = 0,
                y = {};
            return (
                (m.namespace = "outlayer"),
                (m.Item = v),
                (m.defaults = {
                    containerStyle: { position: "relative" },
                    isInitLayout: !0,
                    isOriginLeft: !0,
                    isOriginTop: !0,
                    isResizeBound: !0,
                    isResizingContainer: !0,
                    transitionDuration: "0.4s",
                    hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
                    visibleStyle: { opacity: 1, transform: "scale(1)" },
                }),
                t(m.prototype, c.prototype),
                (m.prototype.option = function (e) {
                    t(this.options, e);
                }),
                (m.prototype._create = function () {
                    this.reloadItems(), (this.stamps = []), this.stamp(this.options.stamp), t(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize();
                }),
                (m.prototype.reloadItems = function () {
                    this.items = this._itemize(this.element.children);
                }),
                (m.prototype._itemize = function (e) {
                    for (var t = this._filterFindItemElements(e), n = this.constructor.Item, r = [], i = 0, s = t.length; s > i; i++) {
                        var o = t[i],
                            u = new n(o, this);
                        r.push(u);
                    }
                    return r;
                }),
                (m.prototype._filterFindItemElements = function (e) {
                    e = r(e);
                    for (var t = this.options.itemSelector, n = [], i = 0, s = e.length; s > i; i++) {
                        var o = e[i];
                        if (h(o))
                            if (t) {
                                d(o, t) && n.push(o);
                                for (var u = o.querySelectorAll(t), a = 0, f = u.length; f > a; a++) n.push(u[a]);
                            } else n.push(o);
                    }
                    return n;
                }),
                (m.prototype.getItemElements = function () {
                    for (var e = [], t = 0, n = this.items.length; n > t; t++) e.push(this.items[t].element);
                    return e;
                }),
                (m.prototype.layout = function () {
                    this._resetLayout(), this._manageStamps();
                    var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                    this.layoutItems(this.items, e), (this._isLayoutInited = !0);
                }),
                (m.prototype._init = m.prototype.layout),
                (m.prototype._resetLayout = function () {
                    this.getSize();
                }),
                (m.prototype.getSize = function () {
                    this.size = p(this.element);
                }),
                (m.prototype._getMeasurement = function (e, t) {
                    var n,
                        r = this.options[e];
                    r ? ("string" == typeof r ? (n = this.element.querySelector(r)) : h(r) && (n = r), (this[e] = n ? p(n)[t] : r)) : (this[e] = 0);
                }),
                (m.prototype.layoutItems = function (e, t) {
                    (e = this._getItemsForLayout(e)), this._layoutItems(e, t), this._postLayout();
                }),
                (m.prototype._getItemsForLayout = function (e) {
                    for (var t = [], n = 0, r = e.length; r > n; n++) {
                        var i = e[n];
                        i.isIgnored || t.push(i);
                    }
                    return t;
                }),
                (m.prototype._layoutItems = function (e, t) {
                    function n() {
                        r.emitEvent("layoutComplete", [r, e]);
                    }
                    var r = this;
                    if (!e || !e.length) return n(), void 0;
                    this._itemsOn(e, "layout", n);
                    for (var i = [], s = 0, o = e.length; o > s; s++) {
                        var u = e[s],
                            a = this._getItemLayoutPosition(u);
                        (a.item = u), (a.isInstant = t || u.isLayoutInstant), i.push(a);
                    }
                    this._processLayoutQueue(i);
                }),
                (m.prototype._getItemLayoutPosition = function () {
                    return { x: 0, y: 0 };
                }),
                (m.prototype._processLayoutQueue = function (e) {
                    for (var t = 0, n = e.length; n > t; t++) {
                        var r = e[t];
                        this._positionItem(r.item, r.x, r.y, r.isInstant);
                    }
                }),
                (m.prototype._positionItem = function (e, t, n, r) {
                    r ? e.goTo(t, n) : e.moveTo(t, n);
                }),
                (m.prototype._postLayout = function () {
                    this.resizeContainer();
                }),
                (m.prototype.resizeContainer = function () {
                    if (this.options.isResizingContainer) {
                        var e = this._getContainerSize();
                        e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
                    }
                }),
                (m.prototype._getContainerSize = l),
                (m.prototype._setContainerMeasure = function (e, t) {
                    if (void 0 !== e) {
                        var n = this.size;
                        n.isBorderBox && (e += t ? n.paddingLeft + n.paddingRight + n.borderLeftWidth + n.borderRightWidth : n.paddingBottom + n.paddingTop + n.borderTopWidth + n.borderBottomWidth),
                            (e = Math.max(e, 0)),
                            (this.element.style[t ? "width" : "height"] = e + "px");
                    }
                }),
                (m.prototype._itemsOn = function (e, t, n) {
                    function r() {
                        return i++, i === s && n.call(o), !0;
                    }
                    for (var i = 0, s = e.length, o = this, u = 0, a = e.length; a > u; u++) {
                        var f = e[u];
                        f.on(t, r);
                    }
                }),
                (m.prototype.ignore = function (e) {
                    var t = this.getItem(e);
                    t && (t.isIgnored = !0);
                }),
                (m.prototype.unignore = function (e) {
                    var t = this.getItem(e);
                    t && delete t.isIgnored;
                }),
                (m.prototype.stamp = function (e) {
                    if ((e = this._find(e))) {
                        this.stamps = this.stamps.concat(e);
                        for (var t = 0, n = e.length; n > t; t++) {
                            var r = e[t];
                            this.ignore(r);
                        }
                    }
                }),
                (m.prototype.unstamp = function (e) {
                    if ((e = this._find(e)))
                        for (var t = 0, n = e.length; n > t; t++) {
                            var r = e[t];
                            i(r, this.stamps), this.unignore(r);
                        }
                }),
                (m.prototype._find = function (e) {
                    return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), (e = r(e))) : void 0;
                }),
                (m.prototype._manageStamps = function () {
                    if (this.stamps && this.stamps.length) {
                        this._getBoundingRect();
                        for (var e = 0, t = this.stamps.length; t > e; e++) {
                            var n = this.stamps[e];
                            this._manageStamp(n);
                        }
                    }
                }),
                (m.prototype._getBoundingRect = function () {
                    var e = this.element.getBoundingClientRect(),
                        t = this.size;
                    this._boundingRect = {
                        left: e.left + t.paddingLeft + t.borderLeftWidth,
                        top: e.top + t.paddingTop + t.borderTopWidth,
                        right: e.right - (t.paddingRight + t.borderRightWidth),
                        bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth),
                    };
                }),
                (m.prototype._manageStamp = l),
                (m.prototype._getElementOffset = function (e) {
                    var t = e.getBoundingClientRect(),
                        n = this._boundingRect,
                        r = p(e),
                        i = { left: t.left - n.left - r.marginLeft, top: t.top - n.top - r.marginTop, right: n.right - t.right - r.marginRight, bottom: n.bottom - t.bottom - r.marginBottom };
                    return i;
                }),
                (m.prototype.handleEvent = function (e) {
                    var t = "on" + e.type;
                    this[t] && this[t](e);
                }),
                (m.prototype.bindResize = function () {
                    this.isResizeBound || (n.bind(e, "resize", this), (this.isResizeBound = !0));
                }),
                (m.prototype.unbindResize = function () {
                    this.isResizeBound && n.unbind(e, "resize", this), (this.isResizeBound = !1);
                }),
                (m.prototype.onresize = function () {
                    function e() {
                        t.resize(), delete t.resizeTimeout;
                    }
                    this.resizeTimeout && clearTimeout(this.resizeTimeout);
                    var t = this;
                    this.resizeTimeout = setTimeout(e, 100);
                }),
                (m.prototype.resize = function () {
                    this.isResizeBound && this.needsResizeLayout() && this.layout();
                }),
                (m.prototype.needsResizeLayout = function () {
                    var e = p(this.element),
                        t = this.size && e;
                    return t && e.innerWidth !== this.size.innerWidth;
                }),
                (m.prototype.addItems = function (e) {
                    var t = this._itemize(e);
                    return t.length && (this.items = this.items.concat(t)), t;
                }),
                (m.prototype.appended = function (e) {
                    var t = this.addItems(e);
                    t.length && (this.layoutItems(t, !0), this.reveal(t));
                }),
                (m.prototype.prepended = function (e) {
                    var t = this._itemize(e);
                    if (t.length) {
                        var n = this.items.slice(0);
                        (this.items = t.concat(n)), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(n);
                    }
                }),
                (m.prototype.reveal = function (e) {
                    var t = e && e.length;
                    if (t)
                        for (var n = 0; t > n; n++) {
                            var r = e[n];
                            r.reveal();
                        }
                }),
                (m.prototype.hide = function (e) {
                    var t = e && e.length;
                    if (t)
                        for (var n = 0; t > n; n++) {
                            var r = e[n];
                            r.hide();
                        }
                }),
                (m.prototype.getItem = function (e) {
                    for (var t = 0, n = this.items.length; n > t; t++) {
                        var r = this.items[t];
                        if (r.element === e) return r;
                    }
                }),
                (m.prototype.getItems = function (e) {
                    if (e && e.length) {
                        for (var t = [], n = 0, r = e.length; r > n; n++) {
                            var i = e[n],
                                s = this.getItem(i);
                            s && t.push(s);
                        }
                        return t;
                    }
                }),
                (m.prototype.remove = function (e) {
                    e = r(e);
                    var t = this.getItems(e);
                    if (t && t.length) {
                        this._itemsOn(t, "remove", function () {
                            this.emitEvent("removeComplete", [this, t]);
                        });
                        for (var n = 0, s = t.length; s > n; n++) {
                            var o = t[n];
                            o.remove(), i(o, this.items);
                        }
                    }
                }),
                (m.prototype.destroy = function () {
                    var e = this.element.style;
                    (e.height = ""), (e.position = ""), (e.width = "");
                    for (var t = 0, n = this.items.length; n > t; t++) {
                        var r = this.items[t];
                        r.destroy();
                    }
                    this.unbindResize(), delete this.element.outlayerGUID, f && f.removeData(this.element, this.constructor.namespace);
                }),
                (m.data = function (e) {
                    var t = e && e.outlayerGUID;
                    return t && y[t];
                }),
                (m.create = function (e, n) {
                    function r() {
                        m.apply(this, arguments);
                    }
                    return (
                        Object.create ? (r.prototype = Object.create(m.prototype)) : t(r.prototype, m.prototype),
                        (r.prototype.constructor = r),
                        (r.defaults = t({}, m.defaults)),
                        t(r.defaults, n),
                        (r.prototype.settings = {}),
                        (r.namespace = e),
                        (r.data = m.data),
                        (r.Item = function () {
                            v.apply(this, arguments);
                        }),
                        (r.Item.prototype = new v()),
                        o(function () {
                            for (var t = s(e), n = u.querySelectorAll(".js-" + t), i = "data-" + t + "-options", o = 0, l = n.length; l > o; o++) {
                                var c,
                                    h = n[o],
                                    p = h.getAttribute(i);
                                try {
                                    c = p && JSON.parse(p);
                                } catch (d) {
                                    a && a.error("Error parsing " + i + " on " + h.nodeName.toLowerCase() + (h.id ? "#" + h.id : "") + ": " + d);
                                    continue;
                                }
                                var v = new r(h, c);
                                f && f.data(h, e, v);
                            }
                        }),
                        f && f.bridget && f.bridget(e, r),
                        r
                    );
                }),
                (m.Item = v),
                m
            );
        }
        var u = e.document,
            a = e.console,
            f = e.jQuery,
            l = function () {},
            c = Object.prototype.toString,
            h =
                "object" == typeof HTMLElement
                    ? function (e) {
                          return e instanceof HTMLElement;
                      }
                    : function (e) {
                          return e && "object" == typeof e && 1 === e.nodeType && "string" == typeof e.nodeName;
                      },
            p = Array.prototype.indexOf
                ? function (e, t) {
                      return e.indexOf(t);
                  }
                : function (e, t) {
                      for (var n = 0, r = e.length; r > n; n++) if (e[n] === t) return n;
                      return -1;
                  };
        "function" == typeof define && define.amd
            ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], o)
            : (e.Outlayer = o(e.eventie, e.docReady, e.EventEmitter, e.getSize, e.matchesSelector, e.Outlayer.Item));
    })(window),
    (function (e) {
        function t(e) {
            function t() {
                e.Item.apply(this, arguments);
            }
            return (
                (t.prototype = new e.Item()),
                (t.prototype._create = function () {
                    (this.id = this.layout.itemGUID++), e.Item.prototype._create.call(this), (this.sortData = {});
                }),
                (t.prototype.updateSortData = function () {
                    if (!this.isIgnored) {
                        (this.sortData.id = this.id), (this.sortData["original-order"] = this.id), (this.sortData.random = Math.random());
                        var e = this.layout.options.getSortData,
                            t = this.layout._sorters;
                        for (var n in e) {
                            var r = t[n];
                            this.sortData[n] = r(this.element, this);
                        }
                    }
                }),
                t
            );
        }
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], t) : ((e.Isotope = e.Isotope || {}), (e.Isotope.Item = t(e.Outlayer)));
    })(window),
    (function (e) {
        function t(e, t) {
            function n(e) {
                (this.isotope = e), e && ((this.options = e.options[this.namespace]), (this.element = e.element), (this.items = e.filteredItems), (this.size = e.size));
            }
            return (
                (function () {
                    function e(e) {
                        return function () {
                            return t.prototype[e].apply(this.isotope, arguments);
                        };
                    }
                    for (var r = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], i = 0, s = r.length; s > i; i++) {
                        var o = r[i];
                        n.prototype[o] = e(o);
                    }
                })(),
                (n.prototype.needsVerticalResizeLayout = function () {
                    var t = e(this.isotope.element),
                        n = this.isotope.size && t;
                    return n && t.innerHeight !== this.isotope.size.innerHeight;
                }),
                (n.prototype._getMeasurement = function () {
                    this.isotope._getMeasurement.apply(this, arguments);
                }),
                (n.prototype.getColumnWidth = function () {
                    this.getSegmentSize("column", "Width");
                }),
                (n.prototype.getRowHeight = function () {
                    this.getSegmentSize("row", "Height");
                }),
                (n.prototype.getSegmentSize = function (e, t) {
                    var n = e + t,
                        r = "outer" + t;
                    if ((this._getMeasurement(n, r), !this[n])) {
                        var i = this.getFirstItemSize();
                        this[n] = (i && i[r]) || this.isotope.size["inner" + t];
                    }
                }),
                (n.prototype.getFirstItemSize = function () {
                    var t = this.isotope.filteredItems[0];
                    return t && t.element && e(t.element);
                }),
                (n.prototype.layout = function () {
                    this.isotope.layout.apply(this.isotope, arguments);
                }),
                (n.prototype.getSize = function () {
                    this.isotope.getSize(), (this.size = this.isotope.size);
                }),
                (n.modes = {}),
                (n.create = function (e, t) {
                    function r() {
                        n.apply(this, arguments);
                    }
                    return (r.prototype = new n()), t && (r.options = t), (r.prototype.namespace = e), (n.modes[e] = r), r;
                }),
                n
            );
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], t) : ((e.Isotope = e.Isotope || {}), (e.Isotope.LayoutMode = t(e.getSize, e.Outlayer)));
    })(window),
    (function (e) {
        function t(e, t) {
            var r = e.create("masonry");
            return (
                (r.prototype._resetLayout = function () {
                    this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
                    var e = this.cols;
                    for (this.colYs = []; e--; ) this.colYs.push(0);
                    this.maxY = 0;
                }),
                (r.prototype.measureColumns = function () {
                    if ((this.getContainerWidth(), !this.columnWidth)) {
                        var e = this.items[0],
                            n = e && e.element;
                        this.columnWidth = (n && t(n).outerWidth) || this.containerWidth;
                    }
                    (this.columnWidth += this.gutter), (this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth)), (this.cols = Math.max(this.cols, 1));
                }),
                (r.prototype.getContainerWidth = function () {
                    var e = this.options.isFitWidth ? this.element.parentNode : this.element,
                        n = t(e);
                    this.containerWidth = n && n.innerWidth;
                }),
                (r.prototype._getItemLayoutPosition = function (e) {
                    e.getSize();
                    var t = e.size.outerWidth % this.columnWidth,
                        r = t && 1 > t ? "round" : "ceil",
                        i = Math[r](e.size.outerWidth / this.columnWidth);
                    i = Math.min(i, this.cols);
                    for (var s = this._getColGroup(i), o = Math.min.apply(Math, s), u = n(s, o), a = { x: this.columnWidth * u, y: o }, f = o + e.size.outerHeight, l = this.cols + 1 - s.length, c = 0; l > c; c++) this.colYs[u + c] = f;
                    return a;
                }),
                (r.prototype._getColGroup = function (e) {
                    if (2 > e) return this.colYs;
                    for (var t = [], n = this.cols + 1 - e, r = 0; n > r; r++) {
                        var i = this.colYs.slice(r, r + e);
                        t[r] = Math.max.apply(Math, i);
                    }
                    return t;
                }),
                (r.prototype._manageStamp = function (e) {
                    var n = t(e),
                        r = this._getElementOffset(e),
                        i = this.options.isOriginLeft ? r.left : r.right,
                        s = i + n.outerWidth,
                        o = Math.floor(i / this.columnWidth);
                    o = Math.max(0, o);
                    var u = Math.floor(s / this.columnWidth);
                    (u -= s % this.columnWidth ? 0 : 1), (u = Math.min(this.cols - 1, u));
                    for (var a = (this.options.isOriginTop ? r.top : r.bottom) + n.outerHeight, f = o; u >= f; f++) this.colYs[f] = Math.max(a, this.colYs[f]);
                }),
                (r.prototype._getContainerSize = function () {
                    this.maxY = Math.max.apply(Math, this.colYs);
                    var e = { height: this.maxY };
                    return this.options.isFitWidth && (e.width = this._getContainerFitWidth()), e;
                }),
                (r.prototype._getContainerFitWidth = function () {
                    for (var e = 0, t = this.cols; --t && 0 === this.colYs[t]; ) e++;
                    return (this.cols - e) * this.columnWidth - this.gutter;
                }),
                (r.prototype.needsResizeLayout = function () {
                    var e = this.containerWidth;
                    return this.getContainerWidth(), e !== this.containerWidth;
                }),
                r
            );
        }
        var n = Array.prototype.indexOf
            ? function (e, t) {
                  return e.indexOf(t);
              }
            : function (e, t) {
                  for (var n = 0, r = e.length; r > n; n++) {
                      var i = e[n];
                      if (i === t) return n;
                  }
                  return -1;
              };
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], t) : (e.Masonry = t(e.Outlayer, e.getSize));
    })(window),
    (function (e) {
        function t(e, t) {
            for (var n in t) e[n] = t[n];
            return e;
        }
        function n(e, n) {
            var r = e.create("masonry"),
                i = r.prototype._getElementOffset,
                s = r.prototype.layout,
                o = r.prototype._getMeasurement;
            t(r.prototype, n.prototype), (r.prototype._getElementOffset = i), (r.prototype.layout = s), (r.prototype._getMeasurement = o);
            var u = r.prototype.measureColumns;
            r.prototype.measureColumns = function () {
                (this.items = this.isotope.filteredItems), u.call(this);
            };
            var a = r.prototype._manageStamp;
            return (
                (r.prototype._manageStamp = function () {
                    (this.options.isOriginLeft = this.isotope.options.isOriginLeft), (this.options.isOriginTop = this.isotope.options.isOriginTop), a.apply(this, arguments);
                }),
                r
            );
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], n) : n(e.Isotope.LayoutMode, e.Masonry);
    })(window),
    (function (e) {
        function t(e) {
            var t = e.create("fitRows");
            return (
                (t.prototype._resetLayout = function () {
                    (this.x = 0), (this.y = 0), (this.maxY = 0);
                }),
                (t.prototype._getItemLayoutPosition = function (e) {
                    e.getSize(), 0 !== this.x && e.size.outerWidth + this.x > this.isotope.size.innerWidth && ((this.x = 0), (this.y = this.maxY));
                    var t = { x: this.x, y: this.y };
                    return (this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight)), (this.x += e.size.outerWidth), t;
                }),
                (t.prototype._getContainerSize = function () {
                    return { height: this.maxY };
                }),
                t
            );
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], t) : t(e.Isotope.LayoutMode);
    })(window),
    (function (e) {
        function t(e) {
            var t = e.create("vertical", { horizontalAlignment: 0 });
            return (
                (t.prototype._resetLayout = function () {
                    this.y = 0;
                }),
                (t.prototype._getItemLayoutPosition = function (e) {
                    e.getSize();
                    var t = (this.isotope.size.innerWidth - e.size.outerWidth) * this.options.horizontalAlignment,
                        n = this.y;
                    return (this.y += e.size.outerHeight), { x: t, y: n };
                }),
                (t.prototype._getContainerSize = function () {
                    return { height: this.y };
                }),
                t
            );
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], t) : t(e.Isotope.LayoutMode);
    })(window),
    (function (e) {
        function t(e, t) {
            for (var n in t) e[n] = t[n];
            return e;
        }
        function n(e) {
            return "[object Array]" === l.call(e);
        }
        function r(e) {
            var t = [];
            if (n(e)) t = e;
            else if (e && "number" == typeof e.length) for (var r = 0, i = e.length; i > r; r++) t.push(e[r]);
            else t.push(e);
            return t;
        }
        function i(e, t) {
            var n = c(t, e);
            -1 !== n && t.splice(n, 1);
        }
        function s(e, n, s, a, l) {
            function c(e, t) {
                return function (n, r) {
                    for (var i = 0, s = e.length; s > i; i++) {
                        var o = e[i],
                            u = n.sortData[o],
                            a = r.sortData[o];
                        if (u > a || a > u) {
                            var f = void 0 !== t[o] ? t[o] : t,
                                l = f ? 1 : -1;
                            return (u > a ? 1 : -1) * l;
                        }
                    }
                    return 0;
                };
            }
            var h = e.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 });
            (h.Item = a),
                (h.LayoutMode = l),
                (h.prototype._create = function () {
                    (this.itemGUID = 0), (this._sorters = {}), this._getSorters(), e.prototype._create.call(this), (this.modes = {}), (this.filteredItems = this.items), (this.sortHistory = ["original-order"]);
                    for (var t in l.modes) this._initLayoutMode(t);
                }),
                (h.prototype.reloadItems = function () {
                    (this.itemGUID = 0), e.prototype.reloadItems.call(this);
                }),
                (h.prototype._itemize = function () {
                    for (var t = e.prototype._itemize.apply(this, arguments), n = 0, r = t.length; r > n; n++) {
                        var i = t[n];
                        i.id = this.itemGUID++;
                    }
                    return this._updateItemsSortData(t), t;
                }),
                (h.prototype._initLayoutMode = function (e) {
                    var n = l.modes[e],
                        r = this.options[e] || {};
                    (this.options[e] = n.options ? t(n.options, r) : r), (this.modes[e] = new n(this));
                }),
                (h.prototype.layout = function () {
                    return !this._isLayoutInited && this.options.isInitLayout ? (this.arrange(), void 0) : (this._layout(), void 0);
                }),
                (h.prototype._layout = function () {
                    var e = this._getIsInstant();
                    this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, e), (this._isLayoutInited = !0);
                }),
                (h.prototype.arrange = function (e) {
                    this.option(e), this._getIsInstant(), (this.filteredItems = this._filter(this.items)), this._sort(), this._layout();
                }),
                (h.prototype._init = h.prototype.arrange),
                (h.prototype._getIsInstant = function () {
                    var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                    return (this._isInstant = e), e;
                }),
                (h.prototype._filter = function (e) {
                    function t() {
                        c.reveal(i), c.hide(s);
                    }
                    var n = this.options.filter;
                    n = n || "*";
                    for (var r = [], i = [], s = [], o = this._getFilterTest(n), u = 0, a = e.length; a > u; u++) {
                        var f = e[u];
                        if (!f.isIgnored) {
                            var l = o(f);
                            l && r.push(f), l && f.isHidden ? i.push(f) : l || f.isHidden || s.push(f);
                        }
                    }
                    var c = this;
                    return this._isInstant ? this._noTransition(t) : t(), r;
                }),
                (h.prototype._getFilterTest = function (e) {
                    return o && this.options.isJQueryFiltering
                        ? function (t) {
                              return o(t.element).is(e);
                          }
                        : "function" == typeof e
                        ? function (t) {
                              return e(t.element);
                          }
                        : function (t) {
                              return s(t.element, e);
                          };
                }),
                (h.prototype.updateSortData = function (e) {
                    this._getSorters(), (e = r(e));
                    var t = this.getItems(e);
                    (t = t.length ? t : this.items), this._updateItemsSortData(t);
                }),
                (h.prototype._getSorters = function () {
                    var e = this.options.getSortData;
                    for (var t in e) {
                        var n = e[t];
                        this._sorters[t] = p(n);
                    }
                }),
                (h.prototype._updateItemsSortData = function (e) {
                    for (var t = 0, n = e.length; n > t; t++) {
                        var r = e[t];
                        r.updateSortData();
                    }
                });
            var p = (function () {
                function e(e) {
                    if ("string" != typeof e) return e;
                    var n = u(e).split(" "),
                        r = n[0],
                        i = r.match(/^\[(.+)\]$/),
                        s = i && i[1],
                        o = t(s, r),
                        a = h.sortDataParsers[n[1]];
                    return (e = a
                        ? function (e) {
                              return e && a(o(e));
                          }
                        : function (e) {
                              return e && o(e);
                          });
                }
                function t(e, t) {
                    var n;
                    return (n = e
                        ? function (t) {
                              return t.getAttribute(e);
                          }
                        : function (e) {
                              var n = e.querySelector(t);
                              return n && f(n);
                          });
                }
                return e;
            })();
            (h.sortDataParsers = {
                parseInt: function (e) {
                    return parseInt(e, 10);
                },
                parseFloat: function (e) {
                    return parseFloat(e);
                },
            }),
                (h.prototype._sort = function () {
                    var e = this.options.sortBy;
                    if (e) {
                        var t = [].concat.apply(e, this.sortHistory),
                            n = c(t, this.options.sortAscending);
                        this.filteredItems.sort(n), e !== this.sortHistory[0] && this.sortHistory.unshift(e);
                    }
                }),
                (h.prototype._mode = function () {
                    var e = this.options.layoutMode,
                        t = this.modes[e];
                    if (!t) throw Error("No layout mode: " + e);
                    return (t.options = this.options[e]), t;
                }),
                (h.prototype._resetLayout = function () {
                    e.prototype._resetLayout.call(this), this._mode()._resetLayout();
                }),
                (h.prototype._getItemLayoutPosition = function (e) {
                    return this._mode()._getItemLayoutPosition(e);
                }),
                (h.prototype._manageStamp = function (e) {
                    this._mode()._manageStamp(e);
                }),
                (h.prototype._getContainerSize = function () {
                    return this._mode()._getContainerSize();
                }),
                (h.prototype.needsResizeLayout = function () {
                    return this._mode().needsResizeLayout();
                }),
                (h.prototype.appended = function (e) {
                    var t = this.addItems(e);
                    if (t.length) {
                        var n = this._filterRevealAdded(t);
                        this.filteredItems = this.filteredItems.concat(n);
                    }
                }),
                (h.prototype.prepended = function (e) {
                    var t = this._itemize(e);
                    if (t.length) {
                        var n = this.items.slice(0);
                        (this.items = t.concat(n)), this._resetLayout(), this._manageStamps();
                        var r = this._filterRevealAdded(t);
                        this.layoutItems(n), (this.filteredItems = r.concat(this.filteredItems));
                    }
                }),
                (h.prototype._filterRevealAdded = function (e) {
                    var t = this._noTransition(function () {
                        return this._filter(e);
                    });
                    return this.layoutItems(t, !0), this.reveal(t), e;
                }),
                (h.prototype.insert = function (e) {
                    var t = this.addItems(e);
                    if (t.length) {
                        var n,
                            r,
                            i = t.length;
                        for (n = 0; i > n; n++) (r = t[n]), this.element.appendChild(r.element);
                        var s = this._filter(t);
                        for (
                            this._noTransition(function () {
                                this.hide(s);
                            }),
                                n = 0;
                            i > n;
                            n++
                        )
                            t[n].isLayoutInstant = !0;
                        for (this.arrange(), n = 0; i > n; n++) delete t[n].isLayoutInstant;
                        this.reveal(s);
                    }
                });
            var d = h.prototype.remove;
            return (
                (h.prototype.remove = function (e) {
                    e = r(e);
                    var t = this.getItems(e);
                    if ((d.call(this, e), t && t.length))
                        for (var n = 0, s = t.length; s > n; n++) {
                            var o = t[n];
                            i(o, this.filteredItems);
                        }
                }),
                (h.prototype._noTransition = function (e) {
                    var t = this.options.transitionDuration;
                    this.options.transitionDuration = 0;
                    var n = e.call(this);
                    return (this.options.transitionDuration = t), n;
                }),
                h
            );
        }
        var o = e.jQuery,
            u = String.prototype.trim
                ? function (e) {
                      return e.trim();
                  }
                : function (e) {
                      return e.replace(/^\s+|\s+$/g, "");
                  },
            a = document.documentElement,
            f = a.textContent
                ? function (e) {
                      return e.textContent;
                  }
                : function (e) {
                      return e.innerText;
                  },
            l = Object.prototype.toString,
            c = Array.prototype.indexOf
                ? function (e, t) {
                      return e.indexOf(t);
                  }
                : function (e, t) {
                      for (var n = 0, r = e.length; r > n; n++) if (e[n] === t) return n;
                      return -1;
                  };
        "function" == typeof define && define.amd
            ? define([
                  "outlayer/outlayer",
                  "get-size/get-size",
                  "matches-selector/matches-selector",
                  "isotope/js/item",
                  "isotope/js/layout-mode",
                  "isotope/js/layout-modes/masonry",
                  "isotope/js/layout-modes/fit-rows",
                  "isotope/js/layout-modes/vertical",
              ], s)
            : (e.Isotope = s(e.Outlayer, e.getSize, e.matchesSelector, e.Isotope.Item, e.Isotope.LayoutMode));
    })(window);
(function (e, t, n) {
    e.fn.backstretch = function (r, i) {
        (r === n || 0 === r.length) && e.error("No images were supplied for Backstretch");
        0 === e(t).scrollTop() && t.scrollTo(0, 0);
        return this.each(function () {
            var t = e(this),
                n = t.data("backstretch");
            if (n) {
                if ("string" == typeof r && "function" == typeof n[r]) {
                    n[r](i);
                    return;
                }
                i = e.extend(n.options, i);
                n.destroy(!0);
            }
            n = new s(this, r, i);
            t.data("backstretch", n);
        });
    };
    e.backstretch = function (t, n) {
        return e("body").backstretch(t, n).data("backstretch");
    };
    e.expr[":"].backstretch = function (t) {
        return e(t).data("backstretch") !== n;
    };
    e.fn.backstretch.defaults = { centeredX: !0, centeredY: !0, duration: 5e3, fade: 0 };
    var r = { left: 0, top: 0, overflow: "hidden", margin: 0, padding: 0, height: "100%", width: "100%", zIndex: -999999 },
        i = { position: "absolute", display: "none", margin: 0, padding: 0, border: "none", width: "auto", height: "auto", maxHeight: "none", maxWidth: "none", zIndex: -999999 },
        s = function (n, i, s) {
            this.options = e.extend({}, e.fn.backstretch.defaults, s || {});
            this.images = e.isArray(i) ? i : [i];
            e.each(this.images, function () {
                e("<img />")[0].src = this;
            });
            this.isBody = n === document.body;
            this.$container = e(n);
            this.$root = this.isBody ? (o ? e(t) : e(document)) : this.$container;
            n = this.$container.children(".backstretch").first();
            this.$wrap = n.length ? n : e('<div class="backstretch"></div>').css(r).appendTo(this.$container);
            this.isBody ||
                ((n = this.$container.css("position")),
                (i = this.$container.css("zIndex")),
                this.$container.css({ position: "static" === n ? "relative" : n, zIndex: "auto" === i ? 0 : i, background: "none" }),
                this.$wrap.css({ zIndex: -999998 }));
            this.$wrap.css({ position: this.isBody && o ? "fixed" : "absolute" });
            this.index = 0;
            this.show(this.index);
            e(t)
                .on("resize.backstretch", e.proxy(this.resize, this))
                .on(
                    "orientationchange.backstretch",
                    e.proxy(function () {
                        this.isBody && 0 === t.pageYOffset && (t.scrollTo(0, 1), this.resize());
                    }, this)
                );
        };
    s.prototype = {
        resize: function () {
            try {
                var e = { left: 0, top: 0 },
                    n = this.isBody ? this.$root.width() : this.$root.innerWidth(),
                    r = n,
                    i = this.isBody ? (t.innerHeight ? t.innerHeight : this.$root.height()) : this.$root.innerHeight(),
                    s = r / this.$img.data("ratio"),
                    o;
                s >= i ? ((o = (s - i) / 2), this.options.centeredY && (e.top = "-" + o + "px")) : ((s = i), (r = s * this.$img.data("ratio")), (o = (r - n) / 2), this.options.centeredX && (e.left = "-" + o + "px"));
                this.$wrap.css({ width: n, height: i }).find("img:not(.deleteable)").css({ width: r, height: s }).css(e);
            } catch (u) {}
            return this;
        },
        show: function (t) {
            if (!(Math.abs(t) > this.images.length - 1)) {
                var n = this,
                    r = n.$wrap.find("img").addClass("deleteable"),
                    s = { relatedTarget: n.$container[0] };
                n.$container.trigger(e.Event("backstretch.before", s), [n, t]);
                this.index = t;
                clearInterval(n.interval);
                n.$img = e("<img />")
                    .css(i)
                    .bind("load", function (i) {
                        var o = this.width || e(i.target).width();
                        i = this.height || e(i.target).height();
                        e(this).data("ratio", o / i);
                        e(this).fadeIn(n.options.speed || n.options.fade, function () {
                            r.remove();
                            n.paused || n.cycle();
                            e(["after", "show"]).each(function () {
                                n.$container.trigger(e.Event("backstretch." + this, s), [n, t]);
                            });
                        });
                        n.resize();
                    })
                    .appendTo(n.$wrap);
                n.$img.attr("src", n.images[t]);
                return n;
            }
        },
        next: function () {
            return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0);
        },
        prev: function () {
            return this.show(0 === this.index ? this.images.length - 1 : this.index - 1);
        },
        pause: function () {
            this.paused = !0;
            return this;
        },
        resume: function () {
            this.paused = !1;
            this.next();
            return this;
        },
        cycle: function () {
            1 < this.images.length &&
                (clearInterval(this.interval),
                (this.interval = setInterval(
                    e.proxy(function () {
                        this.paused || this.next();
                    }, this),
                    this.options.duration
                )));
            return this;
        },
        destroy: function (n) {
            e(t).off("resize.backstretch orientationchange.backstretch");
            clearInterval(this.interval);
            n || this.$wrap.remove();
            this.$container.removeData("backstretch");
        },
    };
    var o,
        u = navigator.userAgent,
        a = navigator.platform,
        f = u.match(/AppleWebKit\/([0-9]+)/),
        f = !!f && f[1],
        l = u.match(/Fennec\/([0-9]+)/),
        l = !!l && l[1],
        c = u.match(/Opera Mobi\/([0-9]+)/),
        h = !!c && c[1],
        p = u.match(/MSIE ([0-9]+)/),
        p = !!p && p[1];
    o = !(
        ((-1 < a.indexOf("iPhone") || -1 < a.indexOf("iPad") || -1 < a.indexOf("iPod")) && f && 534 > f) ||
        (t.operamini && "[object OperaMini]" === {}.toString.call(t.operamini)) ||
        (c && 7458 > h) ||
        (-1 < u.indexOf("Android") && f && 533 > f) ||
        (l && 6 > l) ||
        ("palmGetResource" in t && f && 534 > f) ||
        (-1 < u.indexOf("MeeGo") && -1 < u.indexOf("NokiaBrowser/8.5.0")) ||
        (p && 6 >= p)
    );
})(jQuery, window);
(function (e) {
    "use strict";
    e.fn.fitVids = function (t) {
        var n = { customSelector: null, ignore: null };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.head || document.getElementsByTagName("head")[0];
            var i =
                ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}";
            var s = document.createElement("div");
            s.innerHTML = '<p>x</p><style id="fit-vids-style">' + i + "</style>";
            r.appendChild(s.childNodes[1]);
        }
        if (t) {
            e.extend(n, t);
        }
        return this.each(function () {
            var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            if (n.customSelector) {
                t.push(n.customSelector);
            }
            var r = ".fitvidsignore";
            if (n.ignore) {
                r = r + ", " + n.ignore;
            }
            var i = e(this).find(t.join(","));
            i = i.not("object object");
            i = i.not(r);
            i.each(function () {
                var t = e(this);
                if (t.parents(r).length > 0) {
                    return;
                }
                if ((this.tagName.toLowerCase() === "embed" && t.parent("object").length) || t.parent(".fluid-width-video-wrapper").length) {
                    return;
                }
                if (!t.css("height") && !t.css("width") && (isNaN(t.attr("height")) || isNaN(t.attr("width")))) {
                    t.attr("height", 9);
                    t.attr("width", 16);
                }
                var n = this.tagName.toLowerCase() === "object" || (t.attr("height") && !isNaN(parseInt(t.attr("height"), 10))) ? parseInt(t.attr("height"), 10) : t.height(),
                    i = !isNaN(parseInt(t.attr("width"), 10)) ? parseInt(t.attr("width"), 10) : t.width(),
                    s = n / i;
                if (!t.attr("id")) {
                    var o = "fitvid" + Math.floor(Math.random() * 999999);
                    t.attr("id", o);
                }
                t.wrap('<div class="fluid-width-video-wrapper"></div>')
                    .parent(".fluid-width-video-wrapper")
                    .css("padding-top", s * 100 + "%");
                t.removeAttr("height").removeAttr("width");
            });
        });
    };
})(window.jQuery || window.Zepto);
(function (e) {
    var t,
        n,
        r,
        i,
        s,
        o,
        u,
        a = "Close",
        f = "BeforeClose",
        l = "AfterClose",
        c = "BeforeAppend",
        h = "MarkupParse",
        p = "Open",
        d = "Change",
        v = "mfp",
        m = "." + v,
        g = "mfp-ready",
        y = "mfp-removing",
        b = "mfp-prevent-close",
        w = function () {},
        E = !!window.jQuery,
        S = e(window),
        x = function (e, n) {
            t.ev.on(v + e + m, n);
        },
        T = function (t, n, r, i) {
            var s = document.createElement("div");
            return (s.className = "mfp-" + t), r && (s.innerHTML = r), i ? n && n.appendChild(s) : ((s = e(s)), n && s.appendTo(n)), s;
        },
        N = function (n, r) {
            t.ev.triggerHandler(v + n, r), t.st.callbacks && ((n = n.charAt(0).toLowerCase() + n.slice(1)), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(r) ? r : [r]));
        },
        C = function (n) {
            return (n === u && t.currTemplate.closeBtn) || ((t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose))), (u = n)), t.currTemplate.closeBtn;
        },
        k = function () {
            e.magnificPopup.instance || ((t = new w()), t.init(), (e.magnificPopup.instance = t));
        },
        L = function () {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length; ) if (t.pop() + "Transition" in e) return !0;
            return !1;
        };
    (w.prototype = {
        constructor: w,
        init: function () {
            var n = navigator.appVersion;
            (t.isIE7 = -1 !== n.indexOf("MSIE 7.")),
                (t.isIE8 = -1 !== n.indexOf("MSIE 8.")),
                (t.isLowIE = t.isIE7 || t.isIE8),
                (t.isAndroid = /android/gi.test(n)),
                (t.isIOS = /iphone|ipad|ipod/gi.test(n)),
                (t.supportsTransition = L()),
                (t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent)),
                (i = e(document)),
                (t.popupsCache = {});
        },
        open: function (n) {
            r || (r = e(document.body));
            var s;
            if (n.isObj === !1) {
                (t.items = n.items.toArray()), (t.index = 0);
                var u,
                    a = n.items;
                for (s = 0; a.length > s; s++)
                    if (((u = a[s]), u.parsed && (u = u.el[0]), u === n.el[0])) {
                        t.index = s;
                        break;
                    }
            } else (t.items = e.isArray(n.items) ? n.items : [n.items]), (t.index = n.index || 0);
            if (t.isOpen) return t.updateItemHTML(), void 0;
            (t.types = []),
                (o = ""),
                (t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : i),
                n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), (t.currTemplate = t.popupsCache[n.key])) : (t.currTemplate = {}),
                (t.st = e.extend(!0, {}, e.magnificPopup.defaults, n)),
                (t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos),
                t.st.modal && ((t.st.closeOnContentClick = !1), (t.st.closeOnBgClick = !1), (t.st.showCloseBtn = !1), (t.st.enableEscapeKey = !1)),
                t.bgOverlay ||
                    ((t.bgOverlay = T("bg").on("click" + m, function () {
                        t.close();
                    })),
                    (t.wrap = T("wrap")
                        .attr("tabindex", -1)
                        .on("click" + m, function (e) {
                            t._checkIfClose(e.target) && t.close();
                        })),
                    (t.container = T("container", t.wrap))),
                (t.contentContainer = T("content")),
                t.st.preloader && (t.preloader = T("preloader", t.container, t.st.tLoading));
            var f = e.magnificPopup.modules;
            for (s = 0; f.length > s; s++) {
                var l = f[s];
                (l = l.charAt(0).toUpperCase() + l.slice(1)), t["init" + l].call(t);
            }
            N("BeforeOpen"),
                t.st.showCloseBtn &&
                    (t.st.closeBtnInside
                        ? (x(h, function (e, t, n, r) {
                              n.close_replaceWith = C(r.type);
                          }),
                          (o += " mfp-close-btn-in"))
                        : t.wrap.append(C())),
                t.st.alignTop && (o += " mfp-align-top"),
                t.fixedContentPos ? t.wrap.css({ overflow: t.st.overflowY, overflowX: "hidden", overflowY: t.st.overflowY }) : t.wrap.css({ top: S.scrollTop(), position: "absolute" }),
                (t.st.fixedBgPos === !1 || ("auto" === t.st.fixedBgPos && !t.fixedContentPos)) && t.bgOverlay.css({ height: i.height(), position: "absolute" }),
                t.st.enableEscapeKey &&
                    i.on("keyup" + m, function (e) {
                        27 === e.keyCode && t.close();
                    }),
                S.on("resize" + m, function () {
                    t.updateSize();
                }),
                t.st.closeOnContentClick || (o += " mfp-auto-cursor"),
                o && t.wrap.addClass(o);
            var c = (t.wH = S.height()),
                d = {};
            if (t.fixedContentPos && t._hasScrollBar(c)) {
                var v = t._getScrollbarSize();
                v && (d.marginRight = v);
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : (d.overflow = "hidden"));
            var y = t.st.mainClass;
            return (
                t.isIE7 && (y += " mfp-ie7"),
                y && t._addClassToMFP(y),
                t.updateItemHTML(),
                N("BuildControls"),
                e("html").css(d),
                t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || r),
                (t._lastFocusedEl = document.activeElement),
                setTimeout(function () {
                    t.content ? (t._addClassToMFP(g), t._setFocus()) : t.bgOverlay.addClass(g), i.on("focusin" + m, t._onFocusIn);
                }, 16),
                (t.isOpen = !0),
                t.updateSize(c),
                N(p),
                n
            );
        },
        close: function () {
            t.isOpen &&
                (N(f),
                (t.isOpen = !1),
                t.st.removalDelay && !t.isLowIE && t.supportsTransition
                    ? (t._addClassToMFP(y),
                      setTimeout(function () {
                          t._close();
                      }, t.st.removalDelay))
                    : t._close());
        },
        _close: function () {
            N(a);
            var n = y + " " + g + " ";
            if ((t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos)) {
                var r = { marginRight: "" };
                t.isIE7 ? e("body, html").css("overflow", "") : (r.overflow = ""), e("html").css(r);
            }
            i.off("keyup" + m + " focusin" + m),
                t.ev.off(m),
                t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                t.bgOverlay.attr("class", "mfp-bg"),
                t.container.attr("class", "mfp-container"),
                !t.st.showCloseBtn || (t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0) || (t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach()),
                t._lastFocusedEl && e(t._lastFocusedEl).focus(),
                (t.currItem = null),
                (t.content = null),
                (t.currTemplate = null),
                (t.prevHeight = 0),
                N(l);
        },
        updateSize: function (e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    r = window.innerHeight * n;
                t.wrap.css("height", r), (t.wH = r);
            } else t.wH = e || S.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), N("Resize");
        },
        updateItemHTML: function () {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
            var r = n.type;
            if ((N("BeforeChange", [t.currItem ? t.currItem.type : "", r]), (t.currItem = n), !t.currTemplate[r])) {
                var i = t.st[r] ? t.st[r].markup : !1;
                N("FirstMarkupParse", i), (t.currTemplate[r] = i ? e(i) : !0);
            }
            s && s !== n.type && t.container.removeClass("mfp-" + s + "-holder");
            var o = t["get" + r.charAt(0).toUpperCase() + r.slice(1)](n, t.currTemplate[r]);
            t.appendContent(o, r), (n.preloaded = !0), N(d, n), (s = n.type), t.container.prepend(t.contentContainer), N("AfterChange");
        },
        appendContent: function (e, n) {
            (t.content = e),
                e ? (t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(C()) : (t.content = e)) : (t.content = ""),
                N(c),
                t.container.addClass("mfp-" + n + "-holder"),
                t.contentContainer.append(t.content);
        },
        parseEl: function (n) {
            var r,
                i = t.items[n];
            if ((i.tagName ? (i = { el: e(i) }) : ((r = i.type), (i = { data: i, src: i.src })), i.el)) {
                for (var s = t.types, o = 0; s.length > o; o++)
                    if (i.el.hasClass("mfp-" + s[o])) {
                        r = s[o];
                        break;
                    }
                (i.src = i.el.attr("data-mfp-src")), i.src || (i.src = i.el.attr("href"));
            }
            return (i.type = r || t.st.type || "inline"), (i.index = n), (i.parsed = !0), (t.items[n] = i), N("ElementParse", i), t.items[n];
        },
        addGroup: function (e, n) {
            var r = function (r) {
                (r.mfpEl = this), t._openClick(r, e, n);
            };
            n || (n = {});
            var i = "click.magnificPopup";
            (n.mainEl = e), n.items ? ((n.isObj = !0), e.off(i).on(i, r)) : ((n.isObj = !1), n.delegate ? e.off(i).on(i, n.delegate, r) : ((n.items = e), e.off(i).on(i, r)));
        },
        _openClick: function (n, r, i) {
            var s = void 0 !== i.midClick ? i.midClick : e.magnificPopup.defaults.midClick;
            if (s || (2 !== n.which && !n.ctrlKey && !n.metaKey)) {
                var o = void 0 !== i.disableOn ? i.disableOn : e.magnificPopup.defaults.disableOn;
                if (o)
                    if (e.isFunction(o)) {
                        if (!o.call(t)) return !0;
                    } else if (o > S.width()) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), (i.el = e(n.mfpEl)), i.delegate && (i.items = r.find(i.delegate)), t.open(i);
            }
        },
        updateStatus: function (e, r) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n), r || "loading" !== e || (r = t.st.tLoading);
                var i = { status: e, text: r };
                N("UpdateStatus", i),
                    (e = i.status),
                    (r = i.text),
                    t.preloader.html(r),
                    t.preloader.find("a").on("click", function (e) {
                        e.stopImmediatePropagation();
                    }),
                    t.container.addClass("mfp-s-" + e),
                    (n = e);
            }
        },
        _checkIfClose: function (n) {
            if (!e(n).hasClass(b)) {
                var r = t.st.closeOnContentClick,
                    i = t.st.closeOnBgClick;
                if (r && i) return !0;
                if (!t.content || e(n).hasClass("mfp-close") || (t.preloader && n === t.preloader[0])) return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) {
                    if (r) return !0;
                } else if (i && e.contains(document, n)) return !0;
                return !1;
            }
        },
        _addClassToMFP: function (e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e);
        },
        _removeClassFromMFP: function (e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
        },
        _hasScrollBar: function (e) {
            return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || S.height());
        },
        _setFocus: function () {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus();
        },
        _onFocusIn: function (n) {
            return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1);
        },
        _parseMarkup: function (t, n, r) {
            var i;
            r.data && (n = e.extend(r.data, n)),
                N(h, [t, n, r]),
                e.each(n, function (e, n) {
                    if (void 0 === n || n === !1) return !0;
                    if (((i = e.split("_")), i.length > 1)) {
                        var r = t.find(m + "-" + i[0]);
                        if (r.length > 0) {
                            var s = i[1];
                            "replaceWith" === s ? r[0] !== n[0] && r.replaceWith(n) : "img" === s ? (r.is("img") ? r.attr("src", n) : r.replaceWith('<img src="' + n + '" class="' + r.attr("class") + '" />')) : r.attr(i[1], n);
                        }
                    } else t.find(m + "-" + e).html(n);
                });
        },
        _getScrollbarSize: function () {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                (e.id = "mfp-sbm"),
                    (e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
                    document.body.appendChild(e),
                    (t.scrollbarSize = e.offsetWidth - e.clientWidth),
                    document.body.removeChild(e);
            }
            return t.scrollbarSize;
        },
    }),
        (e.magnificPopup = {
            instance: null,
            proto: w.prototype,
            modules: [],
            open: function (t, n) {
                return k(), (t = t ? e.extend(!0, {}, t) : {}), (t.isObj = !0), (t.index = n || 0), this.instance.open(t);
            },
            close: function () {
                return e.magnificPopup.instance && e.magnificPopup.instance.close();
            },
            registerModule: function (t, n) {
                n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t);
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
            },
        }),
        (e.fn.magnificPopup = function (n) {
            k();
            var r = e(this);
            if ("string" == typeof n)
                if ("open" === n) {
                    var i,
                        s = E ? r.data("magnificPopup") : r[0].magnificPopup,
                        o = parseInt(arguments[1], 10) || 0;
                    s.items ? (i = s.items[o]) : ((i = r), s.delegate && (i = i.find(s.delegate)), (i = i.eq(o))), t._openClick({ mfpEl: i }, r, s);
                } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
            else (n = e.extend(!0, {}, n)), E ? r.data("magnificPopup", n) : (r[0].magnificPopup = n), t.addGroup(r, n);
            return r;
        });
    var A,
        O,
        M,
        _ = "inline",
        D = function () {
            M && (O.after(M.addClass(A)).detach(), (M = null));
        };
    e.magnificPopup.registerModule(_, {
        options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
        proto: {
            initInline: function () {
                t.types.push(_),
                    x(a + "." + _, function () {
                        D();
                    });
            },
            getInline: function (n, r) {
                if ((D(), n.src)) {
                    var i = t.st.inline,
                        s = e(n.src);
                    if (s.length) {
                        var o = s[0].parentNode;
                        o && o.tagName && (O || ((A = i.hiddenClass), (O = T(A)), (A = "mfp-" + A)), (M = s.after(O).detach().removeClass(A))), t.updateStatus("ready");
                    } else t.updateStatus("error", i.tNotFound), (s = e("<div>"));
                    return (n.inlineElement = s), s;
                }
                return t.updateStatus("ready"), t._parseMarkup(r, {}, n), r;
            },
        },
    });
    var P,
        H = "ajax",
        B = function () {
            P && r.removeClass(P);
        },
        j = function () {
            B(), t.req && t.req.abort();
        };
    e.magnificPopup.registerModule(H, {
        options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
        proto: {
            initAjax: function () {
                t.types.push(H), (P = t.st.ajax.cursor), x(a + "." + H, j), x("BeforeChange." + H, j);
            },
            getAjax: function (n) {
                P && r.addClass(P), t.updateStatus("loading");
                var i = e.extend(
                    {
                        url: n.src,
                        success: function (r, i, s) {
                            var o = { data: r, xhr: s };
                            N("ParseAjax", o),
                                t.appendContent(e(o.data), H),
                                (n.finished = !0),
                                B(),
                                t._setFocus(),
                                setTimeout(function () {
                                    t.wrap.addClass(g);
                                }, 16),
                                t.updateStatus("ready"),
                                N("AjaxContentAdded");
                        },
                        error: function () {
                            B(), (n.finished = n.loadError = !0), t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src));
                        },
                    },
                    t.st.ajax.settings
                );
                return (t.req = e.ajax(i)), "";
            },
        },
    });
    var F,
        I = function (n) {
            if (n.data && void 0 !== n.data.title) return n.data.title;
            var r = t.st.image.titleSrc;
            if (r) {
                if (e.isFunction(r)) return r.call(t, n);
                if (n.el) return n.el.attr(r) || "";
            }
            return "";
        };
    e.magnificPopup.registerModule("image", {
        options: {
            markup:
                '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.',
        },
        proto: {
            initImage: function () {
                var e = t.st.image,
                    n = ".image";
                t.types.push("image"),
                    x(p + n, function () {
                        "image" === t.currItem.type && e.cursor && r.addClass(e.cursor);
                    }),
                    x(a + n, function () {
                        e.cursor && r.removeClass(e.cursor), S.off("resize" + m);
                    }),
                    x("Resize" + n, t.resizeImage),
                    t.isLowIE && x("AfterChange", t.resizeImage);
            },
            resizeImage: function () {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n);
                }
            },
            _onImageHasSize: function (e) {
                e.img && ((e.hasSize = !0), F && clearInterval(F), (e.isCheckingImgSize = !1), N("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), (e.imgHidden = !1)));
            },
            findImageSize: function (e) {
                var n = 0,
                    r = e.img[0],
                    i = function (s) {
                        F && clearInterval(F),
                            (F = setInterval(function () {
                                return r.naturalWidth > 0 ? (t._onImageHasSize(e), void 0) : (n > 200 && clearInterval(F), n++, 3 === n ? i(10) : 40 === n ? i(50) : 100 === n && i(500), void 0);
                            }, s));
                    };
                i(1);
            },
            getImage: function (n, r) {
                var i = 0,
                    s = function () {
                        n &&
                            (n.img[0].complete
                                ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), (n.hasSize = !0), (n.loaded = !0), N("ImageLoadComplete"))
                                : (i++, 200 > i ? setTimeout(s, 100) : o()));
                    },
                    o = function () {
                        n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", u.tError.replace("%url%", n.src))), (n.hasSize = !0), (n.loaded = !0), (n.loadError = !0));
                    },
                    u = t.st.image,
                    a = r.find(".mfp-img");
                if (a.length) {
                    var f = document.createElement("img");
                    (f.className = "mfp-img"),
                        (n.img = e(f).on("load.mfploader", s).on("error.mfploader", o)),
                        (f.src = n.src),
                        a.is("img") && (n.img = n.img.clone()),
                        (f = n.img[0]),
                        f.naturalWidth > 0 ? (n.hasSize = !0) : f.width || (n.hasSize = !1);
                }
                return (
                    t._parseMarkup(r, { title: I(n), img_replaceWith: n.img }, n),
                    t.resizeImage(),
                    n.hasSize
                        ? (F && clearInterval(F), n.loadError ? (r.addClass("mfp-loading"), t.updateStatus("error", u.tError.replace("%url%", n.src))) : (r.removeClass("mfp-loading"), t.updateStatus("ready")), r)
                        : (t.updateStatus("loading"), (n.loading = !0), n.hasSize || ((n.imgHidden = !0), r.addClass("mfp-loading"), t.findImageSize(n)), r)
                );
            },
        },
    });
    var q,
        R = function () {
            return void 0 === q && (q = void 0 !== document.createElement("p").style.MozTransform), q;
        };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (e) {
                return e.is("img") ? e : e.find("img");
            },
        },
        proto: {
            initZoom: function () {
                var e,
                    n = t.st.zoom,
                    r = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var i,
                        s,
                        o = n.duration,
                        u = function (e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                r = "all " + n.duration / 1e3 + "s " + n.easing,
                                i = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                s = "transition";
                            return (i["-webkit-" + s] = i["-moz-" + s] = i["-o-" + s] = i[s] = r), t.css(i), t;
                        },
                        l = function () {
                            t.content.css("visibility", "visible");
                        };
                    x("BuildControls" + r, function () {
                        if (t._allowZoom()) {
                            if ((clearTimeout(i), t.content.css("visibility", "hidden"), (e = t._getItemToZoom()), !e)) return l(), void 0;
                            (s = u(e)),
                                s.css(t._getOffset()),
                                t.wrap.append(s),
                                (i = setTimeout(function () {
                                    s.css(t._getOffset(!0)),
                                        (i = setTimeout(function () {
                                            l(),
                                                setTimeout(function () {
                                                    s.remove(), (e = s = null), N("ZoomAnimationEnded");
                                                }, 16);
                                        }, o));
                                }, 16));
                        }
                    }),
                        x(f + r, function () {
                            if (t._allowZoom()) {
                                if ((clearTimeout(i), (t.st.removalDelay = o), !e)) {
                                    if (((e = t._getItemToZoom()), !e)) return;
                                    s = u(e);
                                }
                                s.css(t._getOffset(!0)),
                                    t.wrap.append(s),
                                    t.content.css("visibility", "hidden"),
                                    setTimeout(function () {
                                        s.css(t._getOffset());
                                    }, 16);
                            }
                        }),
                        x(a + r, function () {
                            t._allowZoom() && (l(), s && s.remove(), (e = null));
                        });
                }
            },
            _allowZoom: function () {
                return "image" === t.currItem.type;
            },
            _getItemToZoom: function () {
                return t.currItem.hasSize ? t.currItem.img : !1;
            },
            _getOffset: function (n) {
                var r;
                r = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var i = r.offset(),
                    s = parseInt(r.css("padding-top"), 10),
                    o = parseInt(r.css("padding-bottom"), 10);
                i.top -= e(window).scrollTop() - s;
                var u = { width: r.width(), height: (E ? r.innerHeight() : r[0].offsetHeight) - o - s };
                return R() ? (u["-moz-transform"] = u.transform = "translate(" + i.left + "px," + i.top + "px)") : ((u.left = i.left), (u.top = i.top)), u;
            },
        },
    });
    var U = "iframe",
        z = "//about:blank",
        W = function (e) {
            if (t.currTemplate[U]) {
                var n = t.currTemplate[U].find("iframe");
                n.length && (e || (n[0].src = z), t.isIE8 && n.css("display", e ? "block" : "none"));
            }
        };
    e.magnificPopup.registerModule(U, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
                vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
            },
        },
        proto: {
            initIframe: function () {
                t.types.push(U),
                    x("BeforeChange", function (e, t, n) {
                        t !== n && (t === U ? W() : n === U && W(!0));
                    }),
                    x(a + "." + U, function () {
                        W();
                    });
            },
            getIframe: function (n, r) {
                var i = n.src,
                    s = t.st.iframe;
                e.each(s.patterns, function () {
                    return i.indexOf(this.index) > -1 ? (this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), (i = this.src.replace("%id%", i)), !1) : void 0;
                });
                var o = {};
                return s.srcAction && (o[s.srcAction] = i), t._parseMarkup(r, o, n), t.updateStatus("ready"), r;
            },
        },
    });
    var X = function (e) {
            var n = t.items.length;
            return e > n - 1 ? e - n : 0 > e ? n + e : e;
        },
        V = function (e, t, n) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n);
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%",
        },
        proto: {
            initGallery: function () {
                var n = t.st.gallery,
                    r = ".mfp-gallery",
                    s = Boolean(e.fn.mfpFastClick);
                return (
                    (t.direction = !0),
                    n && n.enabled
                        ? ((o += " mfp-gallery"),
                          x(p + r, function () {
                              n.navigateByImgClick &&
                                  t.wrap.on("click" + r, ".mfp-img", function () {
                                      return t.items.length > 1 ? (t.next(), !1) : void 0;
                                  }),
                                  i.on("keydown" + r, function (e) {
                                      37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next();
                                  });
                          }),
                          x("UpdateStatus" + r, function (e, n) {
                              n.text && (n.text = V(n.text, t.currItem.index, t.items.length));
                          }),
                          x(h + r, function (e, r, i, s) {
                              var o = t.items.length;
                              i.counter = o > 1 ? V(n.tCounter, s.index, o) : "";
                          }),
                          x("BuildControls" + r, function () {
                              if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                                  var r = n.arrowMarkup,
                                      i = (t.arrowLeft = e(r.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(b)),
                                      o = (t.arrowRight = e(r.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(b)),
                                      u = s ? "mfpFastClick" : "click";
                                  i[u](function () {
                                      t.prev();
                                  }),
                                      o[u](function () {
                                          t.next();
                                      }),
                                      t.isIE7 && (T("b", i[0], !1, !0), T("a", i[0], !1, !0), T("b", o[0], !1, !0), T("a", o[0], !1, !0)),
                                      t.container.append(i.add(o));
                              }
                          }),
                          x(d + r, function () {
                              t._preloadTimeout && clearTimeout(t._preloadTimeout),
                                  (t._preloadTimeout = setTimeout(function () {
                                      t.preloadNearbyImages(), (t._preloadTimeout = null);
                                  }, 16));
                          }),
                          x(a + r, function () {
                              i.off(r), t.wrap.off("click" + r), t.arrowLeft && s && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), (t.arrowRight = t.arrowLeft = null);
                          }),
                          void 0)
                        : !1
                );
            },
            next: function () {
                (t.direction = !0), (t.index = X(t.index + 1)), t.updateItemHTML();
            },
            prev: function () {
                (t.direction = !1), (t.index = X(t.index - 1)), t.updateItemHTML();
            },
            goTo: function (e) {
                (t.direction = e >= t.index), (t.index = e), t.updateItemHTML();
            },
            preloadNearbyImages: function () {
                var e,
                    n = t.st.gallery.preload,
                    r = Math.min(n[0], t.items.length),
                    i = Math.min(n[1], t.items.length);
                for (e = 1; (t.direction ? i : r) >= e; e++) t._preloadItem(t.index + e);
                for (e = 1; (t.direction ? r : i) >= e; e++) t._preloadItem(t.index - e);
            },
            _preloadItem: function (n) {
                if (((n = X(n)), !t.items[n].preloaded)) {
                    var r = t.items[n];
                    r.parsed || (r = t.parseEl(n)),
                        N("LazyLoad", r),
                        "image" === r.type &&
                            (r.img = e('<img class="mfp-img" />')
                                .on("load.mfploader", function () {
                                    r.hasSize = !0;
                                })
                                .on("error.mfploader", function () {
                                    (r.hasSize = !0), (r.loadError = !0), N("LazyLoadError", r);
                                })
                                .attr("src", r.src)),
                        (r.preloaded = !0);
                }
            },
        },
    });
    var $ = "retina";
    e.magnificPopup.registerModule($, {
        options: {
            replaceSrc: function (e) {
                return e.src.replace(/\.\w+$/, function (e) {
                    return "@2x" + e;
                });
            },
            ratio: 1,
        },
        proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina,
                        n = e.ratio;
                    (n = isNaN(n) ? n() : n),
                        n > 1 &&
                            (x("ImageHasSize." + $, function (e, t) {
                                t.img.css({ "max-width": t.img[0].naturalWidth / n, width: "100%" });
                            }),
                            x("ElementParse." + $, function (t, r) {
                                r.src = e.replaceSrc(r, n);
                            }));
                }
            },
        },
    }),
        (function () {
            var t = 1e3,
                n = "ontouchstart" in window,
                r = function () {
                    S.off("touchmove" + s + " touchend" + s);
                },
                i = "mfpFastClick",
                s = "." + i;
            (e.fn.mfpFastClick = function (i) {
                return e(this).each(function () {
                    var o,
                        u = e(this);
                    if (n) {
                        var a, f, l, c, h, p;
                        u.on("touchstart" + s, function (e) {
                            (c = !1),
                                (p = 1),
                                (h = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0]),
                                (f = h.clientX),
                                (l = h.clientY),
                                S.on("touchmove" + s, function (e) {
                                    (h = e.originalEvent ? e.originalEvent.touches : e.touches), (p = h.length), (h = h[0]), (Math.abs(h.clientX - f) > 10 || Math.abs(h.clientY - l) > 10) && ((c = !0), r());
                                }).on("touchend" + s, function (e) {
                                    r(),
                                        c ||
                                            p > 1 ||
                                            ((o = !0),
                                            e.preventDefault(),
                                            clearTimeout(a),
                                            (a = setTimeout(function () {
                                                o = !1;
                                            }, t)),
                                            i());
                                });
                        });
                    }
                    u.on("click" + s, function () {
                        o || i();
                    });
                });
            }),
                (e.fn.destroyMfpFastClick = function () {
                    e(this).off("touchstart" + s + " click" + s), n && S.off("touchmove" + s + " touchend" + s);
                });
        })(),
        k();
})(window.jQuery || window.Zepto);
(function (e, t, n, r) {
    function i(t, n) {
        this.element = t;
        this.options = e.extend({}, o, n);
        this._defaults = o;
        this._name = s;
        this.init();
    }
    var s = "stellar",
        o = {
            scrollProperty: "scroll",
            positionProperty: "position",
            horizontalScrolling: true,
            verticalScrolling: true,
            horizontalOffset: 0,
            verticalOffset: 0,
            responsive: false,
            parallaxBackgrounds: true,
            parallaxElements: true,
            hideDistantElements: true,
            hideElement: function (e) {
                e.hide();
            },
            showElement: function (e) {
                e.show();
            },
        },
        u = {
            scroll: {
                getLeft: function (e) {
                    return e.scrollLeft();
                },
                setLeft: function (e, t) {
                    e.scrollLeft(t);
                },
                getTop: function (e) {
                    return e.scrollTop();
                },
                setTop: function (e, t) {
                    e.scrollTop(t);
                },
            },
            position: {
                getLeft: function (e) {
                    return parseInt(e.css("left"), 10) * -1;
                },
                getTop: function (e) {
                    return parseInt(e.css("top"), 10) * -1;
                },
            },
            margin: {
                getLeft: function (e) {
                    return parseInt(e.css("margin-left"), 10) * -1;
                },
                getTop: function (e) {
                    return parseInt(e.css("margin-top"), 10) * -1;
                },
            },
            transform: {
                getLeft: function (e) {
                    var t = getComputedStyle(e[0])[l];
                    return t !== "none" ? parseInt(t.match(/(-?[0-9]+)/g)[4], 10) * -1 : 0;
                },
                getTop: function (e) {
                    var t = getComputedStyle(e[0])[l];
                    return t !== "none" ? parseInt(t.match(/(-?[0-9]+)/g)[5], 10) * -1 : 0;
                },
            },
        },
        a = {
            position: {
                setLeft: function (e, t) {
                    e.css("left", t);
                },
                setTop: function (e, t) {
                    e.css("top", t);
                },
            },
            transform: {
                setPosition: function (e, t, n, r, i) {
                    e[0].style[l] = "translate3d(" + (t - n) + "px, " + (r - i) + "px, 0)";
                },
            },
        },
        f = (function () {
            var t = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                n = e("script")[0].style,
                r = "",
                i;
            for (i in n) {
                if (t.test(i)) {
                    r = i.match(t)[0];
                    break;
                }
            }
            if ("WebkitOpacity" in n) {
                r = "Webkit";
            }
            if ("KhtmlOpacity" in n) {
                r = "Khtml";
            }
            return function (e) {
                return r + (r.length > 0 ? e.charAt(0).toUpperCase() + e.slice(1) : e);
            };
        })(),
        l = f("transform"),
        c = e("<div />", { style: "background:#fff" }).css("background-position-x") !== r,
        h = c
            ? function (e, t, n) {
                  e.css({ "background-position-x": t, "background-position-y": n });
              }
            : function (e, t, n) {
                  e.css("background-position", t + " " + n);
              },
        p = c
            ? function (e) {
                  return [e.css("background-position-x"), e.css("background-position-y")];
              }
            : function (e) {
                  return e.css("background-position").split(" ");
              },
        d =
            t.requestAnimationFrame ||
            t.webkitRequestAnimationFrame ||
            t.mozRequestAnimationFrame ||
            t.oRequestAnimationFrame ||
            t.msRequestAnimationFrame ||
            function (e) {
                setTimeout(e, 1e3 / 60);
            };
    i.prototype = {
        init: function () {
            this.options.name = s + "_" + Math.floor(Math.random() * 1e9);
            this._defineElements();
            this._defineGetters();
            this._defineSetters();
            this._handleWindowLoadAndResize();
            this._detectViewport();
            this.refresh({ firstLoad: true });
            if (this.options.scrollProperty === "scroll") {
                this._handleScrollEvent();
            } else {
                this._startAnimationLoop();
            }
        },
        _defineElements: function () {
            if (this.element === n.body) this.element = t;
            this.$scrollElement = e(this.element);
            this.$element = this.element === t ? e("body") : this.$scrollElement;
            this.$viewportElement = this.options.viewportElement !== r ? e(this.options.viewportElement) : this.$scrollElement[0] === t || this.options.scrollProperty === "scroll" ? this.$scrollElement : this.$scrollElement.parent();
        },
        _defineGetters: function () {
            var e = this,
                t = u[e.options.scrollProperty];
            this._getScrollLeft = function () {
                return t.getLeft(e.$scrollElement);
            };
            this._getScrollTop = function () {
                return t.getTop(e.$scrollElement);
            };
        },
        _defineSetters: function () {
            var t = this,
                n = u[t.options.scrollProperty],
                r = a[t.options.positionProperty],
                i = n.setLeft,
                s = n.setTop;
            this._setScrollLeft =
                typeof i === "function"
                    ? function (e) {
                          i(t.$scrollElement, e);
                      }
                    : e.noop;
            this._setScrollTop =
                typeof s === "function"
                    ? function (e) {
                          s(t.$scrollElement, e);
                      }
                    : e.noop;
            this._setPosition =
                r.setPosition ||
                function (e, n, i, s, o) {
                    if (t.options.horizontalScrolling) {
                        r.setLeft(e, n, i);
                    }
                    if (t.options.verticalScrolling) {
                        r.setTop(e, s, o);
                    }
                };
        },
        _handleWindowLoadAndResize: function () {
            var n = this,
                r = e(t);
            if (n.options.responsive) {
                r.bind("load." + this.name, function () {
                    n.refresh();
                });
            }
            r.bind("resize." + this.name, function () {
                n._detectViewport();
                if (n.options.responsive) {
                    n.refresh();
                }
            });
        },
        refresh: function (n) {
            var r = this,
                i = r._getScrollLeft(),
                s = r._getScrollTop();
            if (!n || !n.firstLoad) {
                this._reset();
            }
            this._setScrollLeft(0);
            this._setScrollTop(0);
            this._setOffsets();
            this._findParticles();
            this._findBackgrounds();
            if (n && n.firstLoad && /WebKit/.test(navigator.userAgent)) {
                e(t).load(function () {
                    var e = r._getScrollLeft(),
                        t = r._getScrollTop();
                    r._setScrollLeft(e + 1);
                    r._setScrollTop(t + 1);
                    r._setScrollLeft(e);
                    r._setScrollTop(t);
                });
            }
            this._setScrollLeft(i);
            this._setScrollTop(s);
        },
        _detectViewport: function () {
            var e = this.$viewportElement.offset(),
                t = e !== null && e !== r;
            this.viewportWidth = this.$viewportElement.width();
            this.viewportHeight = this.$viewportElement.height();
            this.viewportOffsetTop = t ? e.top : 0;
            this.viewportOffsetLeft = t ? e.left : 0;
        },
        _findParticles: function () {
            var t = this,
                n = this._getScrollLeft(),
                i = this._getScrollTop();
            if (this.particles !== r) {
                for (var s = this.particles.length - 1; s >= 0; s--) {
                    this.particles[s].$element.data("stellar-elementIsActive", r);
                }
            }
            this.particles = [];
            if (!this.options.parallaxElements) return;
            this.$element.find("[data-stellar-ratio]").each(function (n) {
                var i = e(this),
                    s,
                    o,
                    u,
                    a,
                    f,
                    l,
                    c,
                    h,
                    p,
                    d = 0,
                    v = 0,
                    m = 0,
                    g = 0;
                if (!i.data("stellar-elementIsActive")) {
                    i.data("stellar-elementIsActive", this);
                } else if (i.data("stellar-elementIsActive") !== this) {
                    return;
                }
                t.options.showElement(i);
                if (!i.data("stellar-startingLeft")) {
                    i.data("stellar-startingLeft", i.css("left"));
                    i.data("stellar-startingTop", i.css("top"));
                } else {
                    i.css("left", i.data("stellar-startingLeft"));
                    i.css("top", i.data("stellar-startingTop"));
                }
                u = i.position().left;
                a = i.position().top;
                f = i.css("margin-left") === "auto" ? 0 : parseInt(i.css("margin-left"), 10);
                l = i.css("margin-top") === "auto" ? 0 : parseInt(i.css("margin-top"), 10);
                h = i.offset().left - f;
                p = i.offset().top - l;
                i.parents().each(function () {
                    var t = e(this);
                    if (t.data("stellar-offset-parent") === true) {
                        d = m;
                        v = g;
                        c = t;
                        return false;
                    } else {
                        m += t.position().left;
                        g += t.position().top;
                    }
                });
                s = i.data("stellar-horizontal-offset") !== r ? i.data("stellar-horizontal-offset") : c !== r && c.data("stellar-horizontal-offset") !== r ? c.data("stellar-horizontal-offset") : t.horizontalOffset;
                o = i.data("stellar-vertical-offset") !== r ? i.data("stellar-vertical-offset") : c !== r && c.data("stellar-vertical-offset") !== r ? c.data("stellar-vertical-offset") : t.verticalOffset;
                t.particles.push({
                    $element: i,
                    $offsetParent: c,
                    isFixed: i.css("position") === "fixed",
                    horizontalOffset: s,
                    verticalOffset: o,
                    startingPositionLeft: u,
                    startingPositionTop: a,
                    startingOffsetLeft: h,
                    startingOffsetTop: p,
                    parentOffsetLeft: d,
                    parentOffsetTop: v,
                    stellarRatio: i.data("stellar-ratio") !== r ? i.data("stellar-ratio") : 1,
                    width: i.outerWidth(true),
                    height: i.outerHeight(true),
                    isHidden: false,
                });
            });
        },
        _findBackgrounds: function () {
            var t = this,
                n = this._getScrollLeft(),
                i = this._getScrollTop(),
                s;
            this.backgrounds = [];
            if (!this.options.parallaxBackgrounds) return;
            s = this.$element.find("[data-stellar-background-ratio]");
            if (this.$element.data("stellar-background-ratio")) {
                s = s.add(this.$element);
            }
            s.each(function () {
                var s = e(this),
                    o = p(s),
                    u,
                    a,
                    f,
                    l,
                    c,
                    d,
                    v,
                    m,
                    g,
                    y = 0,
                    b = 0,
                    w = 0,
                    E = 0;
                if (!s.data("stellar-backgroundIsActive")) {
                    s.data("stellar-backgroundIsActive", this);
                } else if (s.data("stellar-backgroundIsActive") !== this) {
                    return;
                }
                if (!s.data("stellar-backgroundStartingLeft")) {
                    s.data("stellar-backgroundStartingLeft", o[0]);
                    s.data("stellar-backgroundStartingTop", o[1]);
                } else {
                    h(s, s.data("stellar-backgroundStartingLeft"), s.data("stellar-backgroundStartingTop"));
                }
                c = s.css("margin-left") === "auto" ? 0 : parseInt(s.css("margin-left"), 10);
                d = s.css("margin-top") === "auto" ? 0 : parseInt(s.css("margin-top"), 10);
                v = s.offset().left - c - n;
                m = s.offset().top - d - i;
                s.parents().each(function () {
                    var t = e(this);
                    if (t.data("stellar-offset-parent") === true) {
                        y = w;
                        b = E;
                        g = t;
                        return false;
                    } else {
                        w += t.position().left;
                        E += t.position().top;
                    }
                });
                u = s.data("stellar-horizontal-offset") !== r ? s.data("stellar-horizontal-offset") : g !== r && g.data("stellar-horizontal-offset") !== r ? g.data("stellar-horizontal-offset") : t.horizontalOffset;
                a = s.data("stellar-vertical-offset") !== r ? s.data("stellar-vertical-offset") : g !== r && g.data("stellar-vertical-offset") !== r ? g.data("stellar-vertical-offset") : t.verticalOffset;
                t.backgrounds.push({
                    $element: s,
                    $offsetParent: g,
                    isFixed: s.css("background-attachment") === "fixed",
                    horizontalOffset: u,
                    verticalOffset: a,
                    startingValueLeft: o[0],
                    startingValueTop: o[1],
                    startingBackgroundPositionLeft: isNaN(parseInt(o[0], 10)) ? 0 : parseInt(o[0], 10),
                    startingBackgroundPositionTop: isNaN(parseInt(o[1], 10)) ? 0 : parseInt(o[1], 10),
                    startingPositionLeft: s.position().left,
                    startingPositionTop: s.position().top,
                    startingOffsetLeft: v,
                    startingOffsetTop: m,
                    parentOffsetLeft: y,
                    parentOffsetTop: b,
                    stellarRatio: s.data("stellar-background-ratio") === r ? 1 : s.data("stellar-background-ratio"),
                });
            });
        },
        _reset: function () {
            var e, t, n, r, i;
            for (i = this.particles.length - 1; i >= 0; i--) {
                e = this.particles[i];
                t = e.$element.data("stellar-startingLeft");
                n = e.$element.data("stellar-startingTop");
                this._setPosition(e.$element, t, t, n, n);
                this.options.showElement(e.$element);
                e.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
            }
            for (i = this.backgrounds.length - 1; i >= 0; i--) {
                r = this.backgrounds[i];
                r.$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null);
                h(r.$element, r.startingValueLeft, r.startingValueTop);
            }
        },
        destroy: function () {
            this._reset();
            this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name);
            this._animationLoop = e.noop;
            e(t)
                .unbind("load." + this.name)
                .unbind("resize." + this.name);
        },
        _setOffsets: function () {
            var n = this,
                r = e(t);
            r.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name);
            if (typeof this.options.horizontalOffset === "function") {
                this.horizontalOffset = this.options.horizontalOffset();
                r.bind("resize.horizontal-" + this.name, function () {
                    n.horizontalOffset = n.options.horizontalOffset();
                });
            } else {
                this.horizontalOffset = this.options.horizontalOffset;
            }
            if (typeof this.options.verticalOffset === "function") {
                this.verticalOffset = this.options.verticalOffset();
                r.bind("resize.vertical-" + this.name, function () {
                    n.verticalOffset = n.options.verticalOffset();
                });
            } else {
                this.verticalOffset = this.options.verticalOffset;
            }
        },
        _repositionElements: function () {
            var e = this._getScrollLeft(),
                t = this._getScrollTop(),
                n,
                r,
                i,
                s,
                o,
                u,
                a,
                f = true,
                l = true,
                c,
                p,
                d,
                v,
                m;
            if (this.currentScrollLeft === e && this.currentScrollTop === t && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) {
                return;
            } else {
                this.currentScrollLeft = e;
                this.currentScrollTop = t;
                this.currentWidth = this.viewportWidth;
                this.currentHeight = this.viewportHeight;
            }
            for (m = this.particles.length - 1; m >= 0; m--) {
                i = this.particles[m];
                s = i.isFixed ? 1 : 0;
                if (this.options.horizontalScrolling) {
                    c = (e + i.horizontalOffset + this.viewportOffsetLeft + i.startingPositionLeft - i.startingOffsetLeft + i.parentOffsetLeft) * -(i.stellarRatio + s - 1) + i.startingPositionLeft;
                    d = c - i.startingPositionLeft + i.startingOffsetLeft;
                } else {
                    c = i.startingPositionLeft;
                    d = i.startingOffsetLeft;
                }
                if (this.options.verticalScrolling) {
                    p = (t + i.verticalOffset + this.viewportOffsetTop + i.startingPositionTop - i.startingOffsetTop + i.parentOffsetTop) * -(i.stellarRatio + s - 1) + i.startingPositionTop;
                    v = p - i.startingPositionTop + i.startingOffsetTop;
                } else {
                    p = i.startingPositionTop;
                    v = i.startingOffsetTop;
                }
                if (this.options.hideDistantElements) {
                    l = !this.options.horizontalScrolling || (d + i.width > (i.isFixed ? 0 : e) && d < (i.isFixed ? 0 : e) + this.viewportWidth + this.viewportOffsetLeft);
                    f = !this.options.verticalScrolling || (v + i.height > (i.isFixed ? 0 : t) && v < (i.isFixed ? 0 : t) + this.viewportHeight + this.viewportOffsetTop);
                }
                if (l && f) {
                    if (i.isHidden) {
                        this.options.showElement(i.$element);
                        i.isHidden = false;
                    }
                    this._setPosition(i.$element, c, i.startingPositionLeft, p, i.startingPositionTop);
                } else {
                    if (!i.isHidden) {
                        this.options.hideElement(i.$element);
                        i.isHidden = true;
                    }
                }
            }
            for (m = this.backgrounds.length - 1; m >= 0; m--) {
                o = this.backgrounds[m];
                s = o.isFixed ? 0 : 1;
                u = this.options.horizontalScrolling ? (e + o.horizontalOffset - this.viewportOffsetLeft - o.startingOffsetLeft + o.parentOffsetLeft - o.startingBackgroundPositionLeft) * (s - o.stellarRatio) + "px" : o.startingValueLeft;
                a = this.options.verticalScrolling ? (t + o.verticalOffset - this.viewportOffsetTop - o.startingOffsetTop + o.parentOffsetTop - o.startingBackgroundPositionTop) * (s - o.stellarRatio) + "px" : o.startingValueTop;
                h(o.$element, u, a);
            }
        },
        _handleScrollEvent: function () {
            var e = this,
                t = false;
            var n = function () {
                e._repositionElements();
                t = false;
            };
            var r = function () {
                if (!t) {
                    d(n);
                    t = true;
                }
            };
            this.$scrollElement.bind("scroll." + this.name, r);
            r();
        },
        _startAnimationLoop: function () {
            var e = this;
            this._animationLoop = function () {
                d(e._animationLoop);
                e._repositionElements();
            };
            this._animationLoop();
        },
    };
    e.fn[s] = function (t) {
        var n = arguments;
        if (t === r || typeof t === "object") {
            return this.each(function () {
                if (!e.data(this, "plugin_" + s)) {
                    e.data(this, "plugin_" + s, new i(this, t));
                }
            });
        } else if (typeof t === "string" && t[0] !== "_" && t !== "init") {
            return this.each(function () {
                var r = e.data(this, "plugin_" + s);
                if (r instanceof i && typeof r[t] === "function") {
                    r[t].apply(r, Array.prototype.slice.call(n, 1));
                }
                if (t === "destroy") {
                    e.data(this, "plugin_" + s, null);
                }
            });
        }
    };
    e[s] = function (n) {
        var r = e(t);
        return r.stellar.apply(r, Array.prototype.slice.call(arguments, 0));
    };
    e[s].scrollProperty = u;
    e[s].positionProperty = a;
    t.Stellar = i;
})(jQuery, this, document);
(window.Modernizr = (function (e, t, n) {
    function r(e) {
        d.cssText = e;
    }
    function i(e, t) {
        return r(g.join(e + ";") + (t || ""));
    }
    function s(e, t) {
        return typeof e === t;
    }
    function o(e, t) {
        return !!~("" + e).indexOf(t);
    }
    function u(e, t, r) {
        for (var i in e) {
            var o = t[e[i]];
            if (o !== n) return r === !1 ? e[i] : s(o, "function") ? o.bind(r || t) : o;
        }
        return !1;
    }
    var a = "2.6.2",
        f = {},
        l = !0,
        c = t.documentElement,
        h = "modernizr",
        p = t.createElement(h),
        d = p.style,
        v,
        m = {}.toString,
        g = " -webkit- -moz- -o- -ms- ".split(" "),
        y = {},
        b = {},
        w = {},
        E = [],
        S = E.slice,
        x,
        T = function (e, n, r, i) {
            var s,
                o,
                u,
                a,
                f = t.createElement("div"),
                l = t.body,
                p = l || t.createElement("body");
            if (parseInt(r, 10)) while (r--) (u = t.createElement("div")), (u.id = i ? i[r] : h + (r + 1)), f.appendChild(u);
            return (
                (s = ["&#173;", '<style id="s', h, '">', e, "</style>"].join("")),
                (f.id = h),
                ((l ? f : p).innerHTML += s),
                p.appendChild(f),
                l || ((p.style.background = ""), (p.style.overflow = "hidden"), (a = c.style.overflow), (c.style.overflow = "hidden"), c.appendChild(p)),
                (o = n(f, e)),
                l ? f.parentNode.removeChild(f) : (p.parentNode.removeChild(p), (c.style.overflow = a)),
                !!o
            );
        },
        N = {}.hasOwnProperty,
        C;
    !s(N, "undefined") && !s(N.call, "undefined")
        ? (C = function (e, t) {
              return N.call(e, t);
          })
        : (C = function (e, t) {
              return t in e && s(e.constructor.prototype[t], "undefined");
          }),
        Function.prototype.bind ||
            (Function.prototype.bind = function (e) {
                var t = this;
                if (typeof t != "function") throw new TypeError();
                var n = S.call(arguments, 1),
                    r = function () {
                        if (this instanceof r) {
                            var i = function () {};
                            i.prototype = t.prototype;
                            var s = new i(),
                                o = t.apply(s, n.concat(S.call(arguments)));
                            return Object(o) === o ? o : s;
                        }
                        return t.apply(e, n.concat(S.call(arguments)));
                    };
                return r;
            }),
        (y.touch = function () {
            var n;
            return (
                "ontouchstart" in e || (e.DocumentTouch && t instanceof DocumentTouch)
                    ? (n = !0)
                    : T(["@media (", g.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (e) {
                          n = e.offsetTop === 9;
                      }),
                n
            );
        });
    for (var k in y) C(y, k) && ((x = k.toLowerCase()), (f[x] = y[k]()), E.push((f[x] ? "" : "no-") + x));
    return (
        (f.addTest = function (e, t) {
            if (typeof e == "object") for (var r in e) C(e, r) && f.addTest(r, e[r]);
            else {
                e = e.toLowerCase();
                if (f[e] !== n) return f;
                (t = typeof t == "function" ? t() : t), typeof l != "undefined" && l && (c.className += " " + (t ? "" : "no-") + e), (f[e] = t);
            }
            return f;
        }),
        r(""),
        (p = v = null),
        (function (e, t) {
            function n(e, t) {
                var n = e.createElement("p"),
                    r = e.getElementsByTagName("head")[0] || e.documentElement;
                return (n.innerHTML = "x<style>" + t + "</style>"), r.insertBefore(n.lastChild, r.firstChild);
            }
            function r() {
                var e = g.elements;
                return typeof e == "string" ? e.split(" ") : e;
            }
            function i(e) {
                var t = v[e[p]];
                return t || ((t = {}), d++, (e[p] = d), (v[d] = t)), t;
            }
            function s(e, n, r) {
                n || (n = t);
                if (m) return n.createElement(e);
                r || (r = i(n));
                var s;
                return r.cache[e] ? (s = r.cache[e].cloneNode()) : c.test(e) ? (s = (r.cache[e] = r.createElem(e)).cloneNode()) : (s = r.createElem(e)), s.canHaveChildren && !l.test(e) ? r.frag.appendChild(s) : s;
            }
            function o(e, n) {
                e || (e = t);
                if (m) return e.createDocumentFragment();
                n = n || i(e);
                var s = n.frag.cloneNode(),
                    o = 0,
                    u = r(),
                    a = u.length;
                for (; o < a; o++) s.createElement(u[o]);
                return s;
            }
            function u(e, t) {
                t.cache || ((t.cache = {}), (t.createElem = e.createElement), (t.createFrag = e.createDocumentFragment), (t.frag = t.createFrag())),
                    (e.createElement = function (n) {
                        return g.shivMethods ? s(n, e, t) : t.createElem(n);
                    }),
                    (e.createDocumentFragment = Function(
                        "h,f",
                        "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
                            r()
                                .join()
                                .replace(/\w+/g, function (e) {
                                    return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")';
                                }) +
                            ");return n}"
                    )(g, t.frag));
            }
            function a(e) {
                e || (e = t);
                var r = i(e);
                return g.shivCSS && !h && !r.hasCSS && (r.hasCSS = !!n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), m || u(e, r), e;
            }
            var f = e.html5 || {},
                l = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                c = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                h,
                p = "_html5shiv",
                d = 0,
                v = {},
                m;
            (function () {
                try {
                    var e = t.createElement("a");
                    (e.innerHTML = "<xyz></xyz>"),
                        (h = "hidden" in e),
                        (m =
                            e.childNodes.length == 1 ||
                            (function () {
                                t.createElement("a");
                                var e = t.createDocumentFragment();
                                return typeof e.cloneNode == "undefined" || typeof e.createDocumentFragment == "undefined" || typeof e.createElement == "undefined";
                            })());
                } catch (n) {
                    (h = !0), (m = !0);
                }
            })();
            var g = {
                elements: f.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                shivCSS: f.shivCSS !== !1,
                supportsUnknownElements: m,
                shivMethods: f.shivMethods !== !1,
                type: "default",
                shivDocument: a,
                createElement: s,
                createDocumentFragment: o,
            };
            (e.html5 = g), a(t);
        })(this, t),
        (f._version = a),
        (f._prefixes = g),
        (f.testStyles = T),
        (c.className = c.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (l ? " js " + E.join(" ") : "")),
        f
    );
})(this, this.document)),
    (function (e, t, n) {
        function r(e) {
            return "[object Function]" == d.call(e);
        }
        function i(e) {
            return "string" == typeof e;
        }
        function s() {}
        function o(e) {
            return !e || "loaded" == e || "complete" == e || "uninitialized" == e;
        }
        function u() {
            var e = v.shift();
            (m = 1),
                e
                    ? e.t
                        ? h(function () {
                              ("c" == e.t ? k.injectCss : k.injectJs)(e.s, 0, e.a, e.x, e.e, 1);
                          }, 0)
                        : (e(), u())
                    : (m = 0);
        }
        function a(e, n, r, i, s, a, f) {
            function l(t) {
                if (!d && o(c.readyState) && ((w.r = d = 1), !m && u(), (c.onload = c.onreadystatechange = null), t)) {
                    "img" != e &&
                        h(function () {
                            b.removeChild(c);
                        }, 50);
                    for (var r in T[n]) T[n].hasOwnProperty(r) && T[n][r].onload();
                }
            }
            var f = f || k.errorTimeout,
                c = t.createElement(e),
                d = 0,
                g = 0,
                w = { t: r, s: n, e: s, a: a, x: f };
            1 === T[n] && ((g = 1), (T[n] = [])),
                "object" == e ? (c.data = n) : ((c.src = n), (c.type = e)),
                (c.width = c.height = "0"),
                (c.onerror = c.onload = c.onreadystatechange = function () {
                    l.call(this, g);
                }),
                v.splice(i, 0, w),
                "img" != e && (g || 2 === T[n] ? (b.insertBefore(c, y ? null : p), h(l, f)) : T[n].push(c));
        }
        function f(e, t, n, r, s) {
            return (m = 0), (t = t || "j"), i(e) ? a("c" == t ? E : w, e, t, this.i++, n, r, s) : (v.splice(this.i++, 0, e), 1 == v.length && u()), this;
        }
        function l() {
            var e = k;
            return (e.loader = { load: f, i: 0 }), e;
        }
        var c = t.documentElement,
            h = e.setTimeout,
            p = t.getElementsByTagName("script")[0],
            d = {}.toString,
            v = [],
            m = 0,
            g = "MozAppearance" in c.style,
            y = g && !!t.createRange().compareNode,
            b = y ? c : p.parentNode,
            c = e.opera && "[object Opera]" == d.call(e.opera),
            c = !!t.attachEvent && !c,
            w = g ? "object" : c ? "script" : "img",
            E = c ? "script" : w,
            S =
                Array.isArray ||
                function (e) {
                    return "[object Array]" == d.call(e);
                },
            x = [],
            T = {},
            N = {
                timeout: function (e, t) {
                    return t.length && (e.timeout = t[0]), e;
                },
            },
            C,
            k;
        (k = function (e) {
            function t(e) {
                var e = e.split("!"),
                    t = x.length,
                    n = e.pop(),
                    r = e.length,
                    n = { url: n, origUrl: n, prefixes: e },
                    i,
                    s,
                    o;
                for (s = 0; s < r; s++) (o = e[s].split("=")), (i = N[o.shift()]) && (n = i(n, o));
                for (s = 0; s < t; s++) n = x[s](n);
                return n;
            }
            function o(e, i, s, o, u) {
                var a = t(e),
                    f = a.autoCallback;
                a.url.split(".").pop().split("?").shift(),
                    a.bypass ||
                        (i && (i = r(i) ? i : i[e] || i[o] || i[e.split("/").pop().split("?")[0]]),
                        a.instead
                            ? a.instead(e, i, s, o, u)
                            : (T[a.url] ? (a.noexec = !0) : (T[a.url] = 1),
                              s.load(a.url, a.forceCSS || (!a.forceJS && "css" == a.url.split(".").pop().split("?").shift()) ? "c" : n, a.noexec, a.attrs, a.timeout),
                              (r(i) || r(f)) &&
                                  s.load(function () {
                                      l(), i && i(a.origUrl, u, o), f && f(a.origUrl, u, o), (T[a.url] = 2);
                                  })));
            }
            function u(e, t) {
                function n(e, n) {
                    if (e) {
                        if (i(e))
                            n ||
                                (f = function () {
                                    var e = [].slice.call(arguments);
                                    l.apply(this, e), c();
                                }),
                                o(e, f, t, 0, u);
                        else if (Object(e) === e)
                            for (p in ((h = (function () {
                                var t = 0,
                                    n;
                                for (n in e) e.hasOwnProperty(n) && t++;
                                return t;
                            })()),
                            e))
                                e.hasOwnProperty(p) &&
                                    (!n &&
                                        !--h &&
                                        (r(f)
                                            ? (f = function () {
                                                  var e = [].slice.call(arguments);
                                                  l.apply(this, e), c();
                                              })
                                            : (f[p] = (function (e) {
                                                  return function () {
                                                      var t = [].slice.call(arguments);
                                                      e && e.apply(this, t), c();
                                                  };
                                              })(l[p]))),
                                    o(e[p], f, t, p, u));
                    } else !n && c();
                }
                var u = !!e.test,
                    a = e.load || e.both,
                    f = e.callback || s,
                    l = f,
                    c = e.complete || s,
                    h,
                    p;
                n(u ? e.yep : e.nope, !!a), a && n(a);
            }
            var a,
                f,
                c = this.yepnope.loader;
            if (i(e)) o(e, 0, c, 0);
            else if (S(e)) for (a = 0; a < e.length; a++) (f = e[a]), i(f) ? o(f, 0, c, 0) : S(f) ? k(f) : Object(f) === f && u(f, c);
            else Object(e) === e && u(e, c);
        }),
            (k.addPrefix = function (e, t) {
                N[e] = t;
            }),
            (k.addFilter = function (e) {
                x.push(e);
            }),
            (k.errorTimeout = 1e4),
            null == t.readyState &&
                t.addEventListener &&
                ((t.readyState = "loading"),
                t.addEventListener(
                    "DOMContentLoaded",
                    (C = function () {
                        t.removeEventListener("DOMContentLoaded", C, 0), (t.readyState = "complete");
                    }),
                    0
                )),
            (e.yepnope = l()),
            (e.yepnope.executeStack = u),
            (e.yepnope.injectJs = function (e, n, r, i, a, f) {
                var l = t.createElement("script"),
                    c,
                    d,
                    i = i || k.errorTimeout;
                l.src = e;
                for (d in r) l.setAttribute(d, r[d]);
                (n = f ? u : n || s),
                    (l.onreadystatechange = l.onload = function () {
                        !c && o(l.readyState) && ((c = 1), n(), (l.onload = l.onreadystatechange = null));
                    }),
                    h(function () {
                        c || ((c = 1), n(1));
                    }, i),
                    a ? l.onload() : p.parentNode.insertBefore(l, p);
            }),
            (e.yepnope.injectCss = function (e, n, r, i, o, a) {
                var i = t.createElement("link"),
                    f,
                    n = a ? u : n || s;
                (i.href = e), (i.rel = "stylesheet"), (i.type = "text/css");
                for (f in r) i.setAttribute(f, r[f]);
                o || (p.parentNode.insertBefore(i, p), h(n, 0));
            });
    })(this, document),
    (Modernizr.load = function () {
        yepnope.apply(window, [].slice.call(arguments, 0));
    });
var player, OKEvents, options;
!(function (e) {
    "use strict";
    var t = "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw%3D%3D";
    (e.okvideo = function (n) {
        "object" != typeof n && (n = { video: n });
        var r = this;
        (r.init = function () {
            (r.options = e.extend({}, e.okvideo.options, n)), null === r.options.video && (r.options.video = r.options.source), r.setOptions();
            var i = r.options.target || e("body"),
                s = i[0] == e("body")[0] ? "fixed" : "absolute";
            i.css({ position: "relative" });
            var o = 3 === r.options.controls ? -999 : "auto",
                u = '<div id="okplayer-mask" style="position:' + s + ';left:0;top:0;overflow:hidden;z-index:-998;height:100%;width:100%;"></div>';
            OKEvents.utils.isMobile()
                ? i.append('<div id="okplayer" style="position:' + s + ";left:0;top:0;overflow:hidden;z-index:" + o + ';height:100%;width:100%;"></div>')
                : (3 === r.options.controls && i.append(u),
                  1 === r.options.adproof
                      ? i.append('<div id="okplayer" style="position:' + s + ";left:-10%;top:-10%;overflow:hidden;z-index:" + o + ';height:120%;width:120%;"></div>')
                      : i.append('<div id="okplayer" style="position:' + s + ";left:0;top:0;overflow:hidden;z-index:" + o + ';height:100%;width:100%;"></div>')),
                e("#okplayer-mask").css("background-image", "url(" + t + ")"),
                null === r.options.playlist.list ? ("youtube" === r.options.video.provider ? r.loadYouTubeAPI() : "vimeo" === r.options.video.provider && ((r.options.volume /= 100), r.loadVimeoAPI())) : r.loadYouTubeAPI();
        }),
            (r.setOptions = function () {
                for (var t in this.options) this.options[t] === !0 && (this.options[t] = 1), this.options[t] === !1 && (this.options[t] = 3);
                null === r.options.playlist.list && (r.options.video = r.determineProvider()), e(window).data("okoptions", r.options);
            }),
            (r.loadYouTubeAPI = function () {
                r.insertJS("http://www.youtube.com/player_api");
            }),
            (r.loadYouTubePlaylist = function () {
                player.loadPlaylist(r.options.playlist.list, r.options.playlist.index, r.options.playlist.startSeconds, r.options.playlist.suggestedQuality);
            }),
            (r.loadVimeoAPI = function () {
                e("#okplayer").replaceWith(function () {
                    return (
                        '<iframe src="http://player.vimeo.com/video/' +
                        r.options.video.id +
                        "?api=1&title=0&byline=0&portrait=0&playbar=0&loop=" +
                        r.options.loop +
                        "&autoplay=" +
                        (1 === r.options.autoplay ? 1 : 0) +
                        '&player_id=okplayer" frameborder="0" style="' +
                        e(this).attr("style") +
                        'visibility:hidden;background-color:black;" id="' +
                        e(this).attr("id") +
                        '"></iframe>'
                    );
                }),
                    r.insertJS("http://a.vimeocdn.com/js/froogaloop2.min.js", function () {
                        vimeoPlayerReady();
                    });
            }),
            (r.insertJS = function (e, t) {
                var n = document.createElement("script");
                t &&
                    (n.readyState
                        ? (n.onreadystatechange = function () {
                              ("loaded" === n.readyState || "complete" === n.readyState) && ((n.onreadystatechange = null), t());
                          })
                        : (n.onload = function () {
                              t();
                          })),
                    (n.src = e);
                var r = document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(n, r);
            }),
            (r.determineProvider = function () {
                var e = document.createElement("a");
                if (((e.href = r.options.video), /youtube.com/.test(r.options.video))) return { provider: "youtube", id: e.href.slice(e.href.indexOf("v=") + 2).toString() };
                if (/vimeo.com/.test(r.options.video)) return { provider: "vimeo", id: e.href.split("/")[3].toString() };
                if (/[-A-Za-z0-9_]+/.test(r.options.video)) {
                    var t = new String(r.options.video.match(/[-A-Za-z0-9_]+/));
                    if (11 == t.length) return { provider: "youtube", id: t.toString() };
                    for (var n = 0; n < r.options.video.length; n++) if ("number" != typeof parseInt(r.options.video[n])) throw "not vimeo but thought it was for a sec";
                    return { provider: "vimeo", id: r.options.video };
                }
                throw "OKVideo: Invalid video source";
            }),
            r.init();
    }),
        (e.okvideo.options = {
            source: null,
            video: null,
            playlist: { list: null, index: 0, startSeconds: 0, suggestedQuality: "default" },
            disableKeyControl: 1,
            captions: 0,
            loop: 1,
            hd: 1,
            volume: 0,
            adproof: !1,
            unstarted: null,
            onFinished: null,
            onReady: null,
            onPlay: null,
            onPause: null,
            buffering: null,
            controls: !1,
            autoplay: !0,
            annotations: !0,
            cued: null,
        }),
        (e.fn.okvideo = function (t) {
            return (
                (t.target = this),
                this.each(function () {
                    new e.okvideo(t);
                })
            );
        });
})(jQuery),
    (OKEvents = {
        yt: {
            ready: function (e) {
                e.target.setVolume(options.volume),
                    1 === options.autoplay && (options.playlist.list ? player.loadPlaylist(options.playlist.list, options.playlist.index, options.playlist.startSeconds, options.playlist.suggestedQuality) : e.target.playVideo()),
                    OKEvents.utils.isFunction(options.onReady) && options.onReady();
            },
            onStateChange: function (e) {
                switch (e.data) {
                    case -1:
                        OKEvents.utils.isFunction(options.unstarted) && options.unstarted();
                        break;
                    case 0:
                        OKEvents.utils.isFunction(options.onFinished) && options.onFinished(), options.loop && e.target.playVideo();
                        break;
                    case 1:
                        OKEvents.utils.isFunction(options.onPlay) && options.onPlay();
                        break;
                    case 2:
                        OKEvents.utils.isFunction(options.onPause) && options.onPause();
                        break;
                    case 3:
                        OKEvents.utils.isFunction(options.buffering) && options.buffering();
                        break;
                    case 5:
                        OKEvents.utils.isFunction(options.cued) && options.cued();
                        break;
                    default:
                        throw "OKVideo: received invalid data from YT player.";
                }
            },
            error: function (e) {
                throw e;
            },
        },
        v: {
            onReady: function () {
                OKEvents.utils.isFunction(options.onReady) && options.onReady();
            },
            onPlay: function () {
                OKEvents.utils.isMobile() || player.api("setVolume", options.volume), OKEvents.utils.isFunction(options.onPlay) && options.onPlay();
            },
            onPause: function () {
                OKEvents.utils.isFunction(options.onPause) && options.onPause();
            },
            onFinish: function () {
                OKEvents.utils.isFunction(options.onFinish) && options.onFinish();
            },
        },
        utils: {
            isFunction: function (e) {
                return "function" == typeof e ? !0 : !1;
            },
            isMobile: function () {
                return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) ? !0 : !1;
            },
        },
    });
"function" !== typeof Object.create &&
    (Object.create = function (e) {
        function t() {}
        t.prototype = e;
        return new t();
    });
(function (e, t, n) {
    var r = {
        init: function (t, n) {
            this.$elem = e(n);
            this.options = e.extend({}, e.fn.owlCarousel.options, this.$elem.data(), t);
            this.userOptions = t;
            this.loadContent();
        },
        loadContent: function () {
            function t(e) {
                var t,
                    r = "";
                if ("function" === typeof n.options.jsonSuccess) n.options.jsonSuccess.apply(this, [e]);
                else {
                    for (t in e.owl) e.owl.hasOwnProperty(t) && (r += e.owl[t].item);
                    n.$elem.html(r);
                }
                n.logIn();
            }
            var n = this,
                r;
            "function" === typeof n.options.beforeInit && n.options.beforeInit.apply(this, [n.$elem]);
            "string" === typeof n.options.jsonPath ? ((r = n.options.jsonPath), e.getJSON(r, t)) : n.logIn();
        },
        logIn: function () {
            this.$elem.data("owl-originalStyles", this.$elem.attr("style"));
            this.$elem.data("owl-originalClasses", this.$elem.attr("class"));
            this.$elem.css({ opacity: 0 });
            this.orignalItems = this.options.items;
            this.checkBrowser();
            this.wrapperWidth = 0;
            this.checkVisible = null;
            this.setVars();
        },
        setVars: function () {
            if (0 === this.$elem.children().length) return !1;
            this.baseClass();
            this.eventTypes();
            this.$userItems = this.$elem.children();
            this.itemsAmount = this.$userItems.length;
            this.wrapItems();
            this.$owlItems = this.$elem.find(".owl-item");
            this.$owlWrapper = this.$elem.find(".owl-wrapper");
            this.playDirection = "next";
            this.prevItem = 0;
            this.prevArr = [0];
            this.currentItem = 0;
            this.customEvents();
            this.onStartup();
        },
        onStartup: function () {
            this.updateItems();
            this.calculateAll();
            this.buildControls();
            this.updateControls();
            this.response();
            this.moveEvents();
            this.stopOnHover();
            this.owlStatus();
            !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle);
            !0 === this.options.autoPlay && (this.options.autoPlay = 5e3);
            this.play();
            this.$elem.find(".owl-wrapper").css("display", "block");
            this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility();
            this.onstartup = !1;
            this.eachMoveUpdate();
            "function" === typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem]);
        },
        eachMoveUpdate: function () {
            !0 === this.options.lazyLoad && this.lazyLoad();
            !0 === this.options.autoHeight && this.autoHeight();
            this.onVisibleItems();
            "function" === typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem]);
        },
        updateVars: function () {
            "function" === typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]);
            this.watchVisibility();
            this.updateItems();
            this.calculateAll();
            this.updatePosition();
            this.updateControls();
            this.eachMoveUpdate();
            "function" === typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem]);
        },
        reload: function () {
            var e = this;
            t.setTimeout(function () {
                e.updateVars();
            }, 0);
        },
        watchVisibility: function () {
            var e = this;
            if (!1 === e.$elem.is(":visible")) e.$elem.css({ opacity: 0 }), t.clearInterval(e.autoPlayInterval), t.clearInterval(e.checkVisible);
            else return !1;
            e.checkVisible = t.setInterval(function () {
                e.$elem.is(":visible") && (e.reload(), e.$elem.animate({ opacity: 1 }, 200), t.clearInterval(e.checkVisible));
            }, 500);
        },
        wrapItems: function () {
            this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
            this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
            this.wrapperOuter = this.$elem.find(".owl-wrapper-outer");
            this.$elem.css("display", "block");
        },
        baseClass: function () {
            var e = this.$elem.hasClass(this.options.baseClass),
                t = this.$elem.hasClass(this.options.theme);
            e || this.$elem.addClass(this.options.baseClass);
            t || this.$elem.addClass(this.options.theme);
        },
        updateItems: function () {
            var t, n;
            if (!1 === this.options.responsive) return !1;
            if (!0 === this.options.singleItem)
                return (
                    (this.options.items = this.orignalItems = 1),
                    (this.options.itemsCustom = !1),
                    (this.options.itemsDesktop = !1),
                    (this.options.itemsDesktopSmall = !1),
                    (this.options.itemsTablet = !1),
                    (this.options.itemsTabletSmall = !1),
                    (this.options.itemsMobile = !1)
                );
            t = e(this.options.responsiveBaseWidth).width();
            t > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems);
            if (!1 !== this.options.itemsCustom)
                for (
                    this.options.itemsCustom.sort(function (e, t) {
                        return e[0] - t[0];
                    }),
                        n = 0;
                    n < this.options.itemsCustom.length;
                    n += 1
                )
                    this.options.itemsCustom[n][0] <= t && (this.options.items = this.options.itemsCustom[n][1]);
            else
                t <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]),
                    t <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]),
                    t <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]),
                    t <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]),
                    t <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
            this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount);
        },
        response: function () {
            var n = this,
                r,
                i;
            if (!0 !== n.options.responsive) return !1;
            i = e(t).width();
            n.resizer = function () {
                e(t).width() !== i &&
                    (!1 !== n.options.autoPlay && t.clearInterval(n.autoPlayInterval),
                    t.clearTimeout(r),
                    (r = t.setTimeout(function () {
                        i = e(t).width();
                        n.updateVars();
                    }, n.options.responsiveRefreshRate)));
            };
            e(t).resize(n.resizer);
        },
        updatePosition: function () {
            this.jumpTo(this.currentItem);
            !1 !== this.options.autoPlay && this.checkAp();
        },
        appendItemsSizes: function () {
            var t = this,
                n = 0,
                r = t.itemsAmount - t.options.items;
            t.$owlItems.each(function (i) {
                var s = e(this);
                s.css({ width: t.itemWidth }).data("owl-item", Number(i));
                if (0 === i % t.options.items || i === r) i > r || (n += 1);
                s.data("owl-roundPages", n);
            });
        },
        appendWrapperSizes: function () {
            this.$owlWrapper.css({ width: this.$owlItems.length * this.itemWidth * 2, left: 0 });
            this.appendItemsSizes();
        },
        calculateAll: function () {
            this.calculateWidth();
            this.appendWrapperSizes();
            this.loops();
            this.max();
        },
        calculateWidth: function () {
            this.itemWidth = Math.round(this.$elem.width() / this.options.items);
        },
        max: function () {
            var e = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
            this.options.items > this.itemsAmount ? (this.maximumPixels = e = this.maximumItem = 0) : ((this.maximumItem = this.itemsAmount - this.options.items), (this.maximumPixels = e));
            return e;
        },
        min: function () {
            return 0;
        },
        loops: function () {
            var t = 0,
                n = 0,
                r,
                i;
            this.positionsInArray = [0];
            this.pagesInArray = [];
            for (r = 0; r < this.itemsAmount; r += 1)
                (n += this.itemWidth),
                    this.positionsInArray.push(-n),
                    !0 === this.options.scrollPerPage && ((i = e(this.$owlItems[r])), (i = i.data("owl-roundPages")), i !== t && ((this.pagesInArray[t] = this.positionsInArray[r]), (t = i)));
        },
        buildControls: function () {
            if (!0 === this.options.navigation || !0 === this.options.pagination) this.owlControls = e('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem);
            !0 === this.options.pagination && this.buildPagination();
            !0 === this.options.navigation && this.buildButtons();
        },
        buildButtons: function () {
            var t = this,
                n = e('<div class="owl-buttons"/>');
            t.owlControls.append(n);
            t.buttonPrev = e("<div/>", { class: "owl-prev", html: t.options.navigationText[0] || "" });
            t.buttonNext = e("<div/>", { class: "owl-next", html: t.options.navigationText[1] || "" });
            n.append(t.buttonPrev).append(t.buttonNext);
            n.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function (e) {
                e.preventDefault();
            });
            n.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function (n) {
                n.preventDefault();
                e(this).hasClass("owl-next") ? t.next() : t.prev();
            });
        },
        buildPagination: function () {
            var t = this;
            t.paginationWrapper = e('<div class="owl-pagination"/>');
            t.owlControls.append(t.paginationWrapper);
            t.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (n) {
                n.preventDefault();
                Number(e(this).data("owl-page")) !== t.currentItem && t.goTo(Number(e(this).data("owl-page")), !0);
            });
        },
        updatePagination: function () {
            var t, n, r, i, s, o;
            if (!1 === this.options.pagination) return !1;
            this.paginationWrapper.html("");
            t = 0;
            n = this.itemsAmount - (this.itemsAmount % this.options.items);
            for (i = 0; i < this.itemsAmount; i += 1)
                0 === i % this.options.items &&
                    ((t += 1),
                    n === i && (r = this.itemsAmount - this.options.items),
                    (s = e("<div/>", { class: "owl-page" })),
                    (o = e("<span></span>", { text: !0 === this.options.paginationNumbers ? t : "", class: !0 === this.options.paginationNumbers ? "owl-numbers" : "" })),
                    s.append(o),
                    s.data("owl-page", n === i ? r : i),
                    s.data("owl-roundPages", t),
                    this.paginationWrapper.append(s));
            this.checkPagination();
        },
        checkPagination: function () {
            var t = this;
            if (!1 === t.options.pagination) return !1;
            t.paginationWrapper.find(".owl-page").each(function () {
                e(this).data("owl-roundPages") === e(t.$owlItems[t.currentItem]).data("owl-roundPages") && (t.paginationWrapper.find(".owl-page").removeClass("active"), e(this).addClass("active"));
            });
        },
        checkNavigation: function () {
            if (!1 === this.options.navigation) return !1;
            !1 === this.options.rewindNav &&
                (0 === this.currentItem && 0 === this.maximumItem
                    ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled"))
                    : 0 === this.currentItem && 0 !== this.maximumItem
                    ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled"))
                    : this.currentItem === this.maximumItem
                    ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled"))
                    : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled")));
        },
        updateControls: function () {
            this.updatePagination();
            this.checkNavigation();
            this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show());
        },
        destroyControls: function () {
            this.owlControls && this.owlControls.remove();
        },
        next: function (e) {
            if (this.isTransition) return !1;
            this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1;
            if (this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0))
                if (!0 === this.options.rewindNav) (this.currentItem = 0), (e = "rewind");
                else return (this.currentItem = this.maximumItem), !1;
            this.goTo(this.currentItem, e);
        },
        prev: function (e) {
            if (this.isTransition) return !1;
            this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1);
            if (0 > this.currentItem)
                if (!0 === this.options.rewindNav) (this.currentItem = this.maximumItem), (e = "rewind");
                else return (this.currentItem = 0), !1;
            this.goTo(this.currentItem, e);
        },
        goTo: function (e, n, r) {
            var i = this;
            if (i.isTransition) return !1;
            "function" === typeof i.options.beforeMove && i.options.beforeMove.apply(this, [i.$elem]);
            e >= i.maximumItem ? (e = i.maximumItem) : 0 >= e && (e = 0);
            i.currentItem = i.owl.currentItem = e;
            if (!1 !== i.options.transitionStyle && "drag" !== r && 1 === i.options.items && !0 === i.browser.support3d)
                return i.swapSpeed(0), !0 === i.browser.support3d ? i.transition3d(i.positionsInArray[e]) : i.css2slide(i.positionsInArray[e], 1), i.afterGo(), i.singleItemTransition(), !1;
            e = i.positionsInArray[e];
            !0 === i.browser.support3d
                ? ((i.isCss3Finish = !1),
                  !0 === n
                      ? (i.swapSpeed("paginationSpeed"),
                        t.setTimeout(function () {
                            i.isCss3Finish = !0;
                        }, i.options.paginationSpeed))
                      : "rewind" === n
                      ? (i.swapSpeed(i.options.rewindSpeed),
                        t.setTimeout(function () {
                            i.isCss3Finish = !0;
                        }, i.options.rewindSpeed))
                      : (i.swapSpeed("slideSpeed"),
                        t.setTimeout(function () {
                            i.isCss3Finish = !0;
                        }, i.options.slideSpeed)),
                  i.transition3d(e))
                : !0 === n
                ? i.css2slide(e, i.options.paginationSpeed)
                : "rewind" === n
                ? i.css2slide(e, i.options.rewindSpeed)
                : i.css2slide(e, i.options.slideSpeed);
            i.afterGo();
        },
        jumpTo: function (e) {
            "function" === typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]);
            e >= this.maximumItem || -1 === e ? (e = this.maximumItem) : 0 >= e && (e = 0);
            this.swapSpeed(0);
            !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[e]) : this.css2slide(this.positionsInArray[e], 1);
            this.currentItem = this.owl.currentItem = e;
            this.afterGo();
        },
        afterGo: function () {
            this.prevArr.push(this.currentItem);
            this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2];
            this.prevArr.shift(0);
            this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp());
            "function" === typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem]);
        },
        stop: function () {
            this.apStatus = "stop";
            t.clearInterval(this.autoPlayInterval);
        },
        checkAp: function () {
            "stop" !== this.apStatus && this.play();
        },
        play: function () {
            var e = this;
            e.apStatus = "play";
            if (!1 === e.options.autoPlay) return !1;
            t.clearInterval(e.autoPlayInterval);
            e.autoPlayInterval = t.setInterval(function () {
                e.next(!0);
            }, e.options.autoPlay);
        },
        swapSpeed: function (e) {
            "slideSpeed" === e
                ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed))
                : "paginationSpeed" === e
                ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed))
                : "string" !== typeof e && this.$owlWrapper.css(this.addCssSpeed(e));
        },
        addCssSpeed: function (e) {
            return { "-webkit-transition": "all " + e + "ms ease", "-moz-transition": "all " + e + "ms ease", "-o-transition": "all " + e + "ms ease", transition: "all " + e + "ms ease" };
        },
        removeTransition: function () {
            return { "-webkit-transition": "", "-moz-transition": "", "-o-transition": "", transition: "" };
        },
        doTranslate: function (e) {
            return {
                "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + e + "px, 0px, 0px)",
                transform: "translate3d(" + e + "px, 0px,0px)",
            };
        },
        transition3d: function (e) {
            this.$owlWrapper.css(this.doTranslate(e));
        },
        css2move: function (e) {
            this.$owlWrapper.css({ left: e });
        },
        css2slide: function (e, t) {
            var n = this;
            n.isCssFinish = !1;
            n.$owlWrapper.stop(!0, !0).animate(
                { left: e },
                {
                    duration: t || n.options.slideSpeed,
                    complete: function () {
                        n.isCssFinish = !0;
                    },
                }
            );
        },
        checkBrowser: function () {
            var e = n.createElement("div");
            e.style.cssText =
                "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
            e = e.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);
            this.browser = { support3d: null !== e && 1 === e.length, isTouch: "ontouchstart" in t || t.navigator.msMaxTouchPoints };
        },
        moveEvents: function () {
            if (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) this.gestures(), this.disabledEvents();
        },
        eventTypes: function () {
            var e = ["s", "e", "x"];
            this.ev_types = {};
            !0 === this.options.mouseDrag && !0 === this.options.touchDrag
                ? (e = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"])
                : !1 === this.options.mouseDrag && !0 === this.options.touchDrag
                ? (e = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"])
                : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (e = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]);
            this.ev_types.start = e[0];
            this.ev_types.move = e[1];
            this.ev_types.end = e[2];
        },
        disabledEvents: function () {
            this.$elem.on("dragstart.owl", function (e) {
                e.preventDefault();
            });
            this.$elem.on("mousedown.disableTextSelect", function (t) {
                return e(t.target).is("input, textarea, select, option");
            });
        },
        gestures: function () {
            function r(e) {
                if (void 0 !== e.touches) return { x: e.touches[0].pageX, y: e.touches[0].pageY };
                if (void 0 === e.touches) {
                    if (void 0 !== e.pageX) return { x: e.pageX, y: e.pageY };
                    if (void 0 === e.pageX) return { x: e.clientX, y: e.clientY };
                }
            }
            function i(t) {
                "on" === t ? (e(n).on(u.ev_types.move, s), e(n).on(u.ev_types.end, o)) : "off" === t && (e(n).off(u.ev_types.move), e(n).off(u.ev_types.end));
            }
            function s(i) {
                i = i.originalEvent || i || t.event;
                u.newPosX = r(i).x - a.offsetX;
                u.newPosY = r(i).y - a.offsetY;
                u.newRelativeX = u.newPosX - a.relativePos;
                "function" === typeof u.options.startDragging && !0 !== a.dragging && 0 !== u.newRelativeX && ((a.dragging = !0), u.options.startDragging.apply(u, [u.$elem]));
                (8 < u.newRelativeX || -8 > u.newRelativeX) && !0 === u.browser.isTouch && (void 0 !== i.preventDefault ? i.preventDefault() : (i.returnValue = !1), (a.sliding = !0));
                (10 < u.newPosY || -10 > u.newPosY) && !1 === a.sliding && e(n).off("touchmove.owl");
                u.newPosX = Math.max(Math.min(u.newPosX, u.newRelativeX / 5), u.maximumPixels + u.newRelativeX / 5);
                !0 === u.browser.support3d ? u.transition3d(u.newPosX) : u.css2move(u.newPosX);
            }
            function o(n) {
                n = n.originalEvent || n || t.event;
                var r;
                n.target = n.target || n.srcElement;
                a.dragging = !1;
                !0 !== u.browser.isTouch && u.$owlWrapper.removeClass("grabbing");
                u.dragDirection = 0 > u.newRelativeX ? (u.owl.dragDirection = "left") : (u.owl.dragDirection = "right");
                0 !== u.newRelativeX &&
                    ((r = u.getNewPosition()),
                    u.goTo(r, !1, "drag"),
                    a.targetElement === n.target &&
                        !0 !== u.browser.isTouch &&
                        (e(n.target).on("click.disable", function (t) {
                            t.stopImmediatePropagation();
                            t.stopPropagation();
                            t.preventDefault();
                            e(t.target).off("click.disable");
                        }),
                        (n = e._data(n.target, "events").click),
                        (r = n.pop()),
                        n.splice(0, 0, r)));
                i("off");
            }
            var u = this,
                a = { offsetX: 0, offsetY: 0, baseElWidth: 0, relativePos: 0, position: null, minSwipe: null, maxSwipe: null, sliding: null, dargging: null, targetElement: null };
            u.isCssFinish = !0;
            u.$elem.on(u.ev_types.start, ".owl-wrapper", function (n) {
                n = n.originalEvent || n || t.event;
                var s;
                if (3 === n.which) return !1;
                if (!(u.itemsAmount <= u.options.items)) {
                    if ((!1 === u.isCssFinish && !u.options.dragBeforeAnimFinish) || (!1 === u.isCss3Finish && !u.options.dragBeforeAnimFinish)) return !1;
                    !1 !== u.options.autoPlay && t.clearInterval(u.autoPlayInterval);
                    !0 === u.browser.isTouch || u.$owlWrapper.hasClass("grabbing") || u.$owlWrapper.addClass("grabbing");
                    u.newPosX = 0;
                    u.newRelativeX = 0;
                    e(this).css(u.removeTransition());
                    s = e(this).position();
                    a.relativePos = s.left;
                    a.offsetX = r(n).x - s.left;
                    a.offsetY = r(n).y - s.top;
                    i("on");
                    a.sliding = !1;
                    a.targetElement = n.target || n.srcElement;
                }
            });
        },
        getNewPosition: function () {
            var e = this.closestItem();
            e > this.maximumItem ? (e = this.currentItem = this.maximumItem) : 0 <= this.newPosX && (this.currentItem = e = 0);
            return e;
        },
        closestItem: function () {
            var t = this,
                n = !0 === t.options.scrollPerPage ? t.pagesInArray : t.positionsInArray,
                r = t.newPosX,
                i = null;
            e.each(n, function (s, o) {
                r - t.itemWidth / 20 > n[s + 1] && r - t.itemWidth / 20 < o && "left" === t.moveDirection()
                    ? ((i = o), (t.currentItem = !0 === t.options.scrollPerPage ? e.inArray(i, t.positionsInArray) : s))
                    : r + t.itemWidth / 20 < o &&
                      r + t.itemWidth / 20 > (n[s + 1] || n[s] - t.itemWidth) &&
                      "right" === t.moveDirection() &&
                      (!0 === t.options.scrollPerPage ? ((i = n[s + 1] || n[n.length - 1]), (t.currentItem = e.inArray(i, t.positionsInArray))) : ((i = n[s + 1]), (t.currentItem = s + 1)));
            });
            return t.currentItem;
        },
        moveDirection: function () {
            var e;
            0 > this.newRelativeX ? ((e = "right"), (this.playDirection = "next")) : ((e = "left"), (this.playDirection = "prev"));
            return e;
        },
        customEvents: function () {
            var e = this;
            e.$elem.on("owl.next", function () {
                e.next();
            });
            e.$elem.on("owl.prev", function () {
                e.prev();
            });
            e.$elem.on("owl.play", function (t, n) {
                e.options.autoPlay = n;
                e.play();
                e.hoverStatus = "play";
            });
            e.$elem.on("owl.stop", function () {
                e.stop();
                e.hoverStatus = "stop";
            });
            e.$elem.on("owl.goTo", function (t, n) {
                e.goTo(n);
            });
            e.$elem.on("owl.jumpTo", function (t, n) {
                e.jumpTo(n);
            });
        },
        stopOnHover: function () {
            var e = this;
            !0 === e.options.stopOnHover &&
                !0 !== e.browser.isTouch &&
                !1 !== e.options.autoPlay &&
                (e.$elem.on("mouseover", function () {
                    e.stop();
                }),
                e.$elem.on("mouseout", function () {
                    "stop" !== e.hoverStatus && e.play();
                }));
        },
        lazyLoad: function () {
            var t, n, r, i, s;
            if (!1 === this.options.lazyLoad) return !1;
            for (t = 0; t < this.itemsAmount; t += 1)
                (n = e(this.$owlItems[t])),
                    "loaded" !== n.data("owl-loaded") &&
                        ((r = n.data("owl-item")),
                        (i = n.find(".lazyOwl")),
                        "string" !== typeof i.data("src")
                            ? n.data("owl-loaded", "loaded")
                            : (void 0 === n.data("owl-loaded") && (i.hide(), n.addClass("loading").data("owl-loaded", "checked")),
                              (s = !0 === this.options.lazyFollow ? r >= this.currentItem : !0) && r < this.currentItem + this.options.items && i.length && this.lazyPreload(n, i)));
        },
        lazyPreload: function (e, n) {
            function r() {
                e.data("owl-loaded", "loaded").removeClass("loading");
                n.removeAttr("data-src");
                "fade" === s.options.lazyEffect ? n.fadeIn(400) : n.show();
                "function" === typeof s.options.afterLazyLoad && s.options.afterLazyLoad.apply(this, [s.$elem]);
            }
            function i() {
                o += 1;
                s.completeImg(n.get(0)) || !0 === u ? r() : 100 >= o ? t.setTimeout(i, 100) : r();
            }
            var s = this,
                o = 0,
                u;
            "DIV" === n.prop("tagName") ? (n.css("background-image", "url(" + n.data("src") + ")"), (u = !0)) : (n[0].src = n.data("src"));
            i();
        },
        autoHeight: function () {
            function n() {
                var n = e(i.$owlItems[i.currentItem]).height();
                i.wrapperOuter.css("height", n + "px");
                i.wrapperOuter.hasClass("autoHeight") ||
                    t.setTimeout(function () {
                        i.wrapperOuter.addClass("autoHeight");
                    }, 0);
            }
            function r() {
                o += 1;
                i.completeImg(s.get(0)) ? n() : 100 >= o ? t.setTimeout(r, 100) : i.wrapperOuter.css("height", "");
            }
            var i = this,
                s = e(i.$owlItems[i.currentItem]).find("img"),
                o;
            void 0 !== s.get(0) ? ((o = 0), r()) : n();
        },
        completeImg: function (e) {
            return !e.complete || ("undefined" !== typeof e.naturalWidth && 0 === e.naturalWidth) ? !1 : !0;
        },
        onVisibleItems: function () {
            var t;
            !0 === this.options.addClassActive && this.$owlItems.removeClass("active");
            this.visibleItems = [];
            for (t = this.currentItem; t < this.currentItem + this.options.items; t += 1) this.visibleItems.push(t), !0 === this.options.addClassActive && e(this.$owlItems[t]).addClass("active");
            this.owl.visibleItems = this.visibleItems;
        },
        transitionTypes: function (e) {
            this.outClass = "owl-" + e + "-out";
            this.inClass = "owl-" + e + "-in";
        },
        singleItemTransition: function () {
            var e = this,
                t = e.outClass,
                n = e.inClass,
                r = e.$owlItems.eq(e.currentItem),
                i = e.$owlItems.eq(e.prevItem),
                s = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                o = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2;
            e.isTransition = !0;
            e.$owlWrapper.addClass("owl-origin").css({ "-webkit-transform-origin": o + "px", "-moz-perspective-origin": o + "px", "perspective-origin": o + "px" });
            i.css({ position: "relative", left: s + "px" })
                .addClass(t)
                .on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
                    e.endPrev = !0;
                    i.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
                    e.clearTransStyle(i, t);
                });
            r.addClass(n).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
                e.endCurrent = !0;
                r.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
                e.clearTransStyle(r, n);
            });
        },
        clearTransStyle: function (e, t) {
            e.css({ position: "", left: "" }).removeClass(t);
            this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), (this.isTransition = this.endCurrent = this.endPrev = !1));
        },
        owlStatus: function () {
            this.owl = {
                userOptions: this.userOptions,
                baseElement: this.$elem,
                userItems: this.$userItems,
                owlItems: this.$owlItems,
                currentItem: this.currentItem,
                prevItem: this.prevItem,
                visibleItems: this.visibleItems,
                isTouch: this.browser.isTouch,
                browser: this.browser,
                dragDirection: this.dragDirection,
            };
        },
        clearEvents: function () {
            this.$elem.off(".owl owl mousedown.disableTextSelect");
            e(n).off(".owl owl");
            e(t).off("resize", this.resizer);
        },
        unWrap: function () {
            0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove());
            this.clearEvents();
            this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"));
        },
        destroy: function () {
            this.stop();
            t.clearInterval(this.checkVisible);
            this.unWrap();
            this.$elem.removeData();
        },
        reinit: function (t) {
            t = e.extend({}, this.userOptions, t);
            this.unWrap();
            this.init(t, this.$elem);
        },
        addItem: function (e, t) {
            var n;
            if (!e) return !1;
            if (0 === this.$elem.children().length) return this.$elem.append(e), this.setVars(), !1;
            this.unWrap();
            n = void 0 === t || -1 === t ? -1 : t;
            n >= this.$userItems.length || -1 === n ? this.$userItems.eq(-1).after(e) : this.$userItems.eq(n).before(e);
            this.setVars();
        },
        removeItem: function (e) {
            if (0 === this.$elem.children().length) return !1;
            e = void 0 === e || -1 === e ? -1 : e;
            this.unWrap();
            this.$userItems.eq(e).remove();
            this.setVars();
        },
    };
    e.fn.owlCarousel = function (t) {
        return this.each(function () {
            if (!0 === e(this).data("owl-init")) return !1;
            e(this).data("owl-init", !0);
            var n = Object.create(r);
            n.init(t, this);
            e.data(this, "owlCarousel", n);
        });
    };
    e.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: t,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1,
    };
})(jQuery, window, document);
!(function () {
    function e() {}
    function t(e) {
        return s.retinaImageSuffix + e;
    }
    function n(e, n) {
        if (((this.path = e || ""), "undefined" != typeof n && null !== n)) (this.at_2x_path = n), (this.perform_check = !1);
        else {
            if (void 0 !== document.createElement) {
                var r = document.createElement("a");
                (r.href = this.path), (r.pathname = r.pathname.replace(o, t)), (this.at_2x_path = r.href);
            } else {
                var i = this.path.split("?");
                (i[0] = i[0].replace(o, t)), (this.at_2x_path = i.join("?"));
            }
            this.perform_check = !0;
        }
    }
    function r(e) {
        (this.el = e), (this.path = new n(this.el.getAttribute("src"), this.el.getAttribute("data-at2x")));
        var t = this;
        this.path.check_2x_variant(function (e) {
            e && t.swap();
        });
    }
    var i = "undefined" == typeof exports ? window : exports,
        s = { retinaImageSuffix: "@2x", check_mime_type: !0, force_original_dimensions: !0 };
    (i.Retina = e),
        (e.configure = function (e) {
            null === e && (e = {});
            for (var t in e) e.hasOwnProperty(t) && (s[t] = e[t]);
        }),
        (e.init = function (e) {
            null === e && (e = i);
            var t = e.onload || function () {};
            e.onload = function () {
                var e,
                    n,
                    i = document.getElementsByTagName("img"),
                    s = [];
                for (e = 0; e < i.length; e += 1) (n = i[e]), n.getAttributeNode("data-no-retina") || s.push(new r(n));
                t();
            };
        }),
        (e.isRetina = function () {
            var e = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
            return i.devicePixelRatio > 1 ? !0 : i.matchMedia && i.matchMedia(e).matches ? !0 : !1;
        });
    var o = /\.\w+$/;
    (i.RetinaImagePath = n),
        (n.confirmed_paths = []),
        (n.prototype.is_external = function () {
            return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain));
        }),
        (n.prototype.check_2x_variant = function (e) {
            var t,
                r = this;
            return this.is_external()
                ? e(!1)
                : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path
                ? this.at_2x_path in n.confirmed_paths
                    ? e(!0)
                    : ((t = new XMLHttpRequest()),
                      t.open("HEAD", this.at_2x_path),
                      (t.onreadystatechange = function () {
                          if (4 !== t.readyState) return e(!1);
                          if (t.status >= 200 && t.status <= 399) {
                              if (s.check_mime_type) {
                                  var i = t.getResponseHeader("Content-Type");
                                  if (null === i || !i.match(/^image/i)) return e(!1);
                              }
                              return n.confirmed_paths.push(r.at_2x_path), e(!0);
                          }
                          return e(!1);
                      }),
                      t.send(),
                      void 0)
                : e(!0);
        }),
        (i.RetinaImage = r),
        (r.prototype.swap = function (e) {
            function t() {
                n.el.complete ? (s.force_original_dimensions && (n.el.setAttribute("width", n.el.offsetWidth), n.el.setAttribute("height", n.el.offsetHeight)), n.el.setAttribute("src", e)) : setTimeout(t, 5);
            }
            "undefined" == typeof e && (e = this.path.at_2x_path);
            var n = this;
            t();
        }),
        e.isRetina() && e.init(i);
})();
window.smoothScroll = (function (e, t, n) {
    "use strict";
    var r = { speed: 500, easing: "easeInOutCubic", offset: 0, updateURL: false, callbackBefore: function () {}, callbackAfter: function () {} };
    var i = function (e, t) {
        for (var n in t) {
            e[n] = t[n];
        }
        return e;
    };
    var s = function (e, t) {
        if (e == "easeInQuad") return t * t;
        if (e == "easeOutQuad") return t * (2 - t);
        if (e == "easeInOutQuad") return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        if (e == "easeInCubic") return t * t * t;
        if (e == "easeOutCubic") return --t * t * t + 1;
        if (e == "easeInOutCubic") return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        if (e == "easeInQuart") return t * t * t * t;
        if (e == "easeOutQuart") return 1 - --t * t * t * t;
        if (e == "easeInOutQuart") return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
        if (e == "easeInQuint") return t * t * t * t * t;
        if (e == "easeOutQuint") return 1 + --t * t * t * t * t;
        if (e == "easeInOutQuint") return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
        return t;
    };
    var o = function (e, t, n) {
        var r = 0;
        if (e.offsetParent) {
            do {
                r += e.offsetTop;
                e = e.offsetParent;
            } while (e);
        }
        r = r - t - n;
        if (r >= 0) {
            return r;
        } else {
            return 0;
        }
    };
    var u = function () {
        return Math.max(t.body.scrollHeight, t.documentElement.scrollHeight, t.body.offsetHeight, t.documentElement.offsetHeight, t.body.clientHeight, t.documentElement.clientHeight);
    };
    var a = function (e) {
        if (e === null || e === n) {
            return {};
        } else {
            var t = {};
            e = e.split(";");
            e.forEach(function (e) {
                e = e.trim();
                if (e !== "") {
                    e = e.split(":");
                    t[e[0]] = e[1].trim();
                }
            });
            return t;
        }
    };
    var f = function (e, t) {
        if ((t === true || t === "true") && history.pushState) {
            history.pushState({ pos: e.id }, "", e);
        }
    };
    var l = function (n, l, c, h) {
        c = i(r, c || {});
        var p = a(n ? n.getAttribute("data-options") : null);
        var d = parseInt(p.speed || c.speed, 10);
        var v = p.easing || c.easing;
        var m = parseInt(p.offset || c.offset, 10);
        var g = p.updateURL || c.updateURL;
        var y = t.querySelector("[data-scroll-header]");
        var b = y === null ? 0 : y.offsetHeight + y.offsetTop;
        var w = e.pageYOffset;
        var E = o(t.querySelector(l), b, m);
        var S;
        var x = E - w;
        var T = u();
        var N = 0;
        var C, k;
        if (n && n.tagName === "A" && h) {
            h.preventDefault();
        }
        f(l, g);
        var L = function (t, r, i) {
            var s = e.pageYOffset;
            if (t == r || s == r || e.innerHeight + s >= T) {
                clearInterval(i);
                c.callbackAfter(n, l);
            }
        };
        var A = function () {
            N += 16;
            C = N / d;
            C = C > 1 ? 1 : C;
            k = w + x * s(v, C);
            e.scrollTo(0, Math.floor(k));
            L(k, E, S);
        };
        var O = function () {
            c.callbackBefore(n, l);
            S = setInterval(A, 16);
        };
        if (e.pageYOffset === 0) {
            e.scrollTo(0, 0);
        }
        O();
    };
    var c = function (n) {
        if ("querySelector" in t && "addEventListener" in e && Array.prototype.forEach) {
            n = i(r, n || {});
            var s = t.querySelectorAll("[data-scroll]");
            Array.prototype.forEach.call(s, function (e, t) {
                e.addEventListener("click", l.bind(null, e, e.getAttribute("href"), n), false);
            });
        }
    };
    return { init: c, animateScroll: l };
})(window, document);
(function () {
    var e =
            [].indexOf ||
            function (e) {
                for (var t = 0, n = this.length; t < n; t++) {
                    if (t in this && this[t] === e) return t;
                }
                return -1;
            },
        t = [].slice;
    (function (e, t) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function (n) {
                return t(n, e);
            });
        } else {
            return t(e.jQuery, e);
        }
    })(window, function (n, r) {
        var i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b;
        i = n(r);
        c = e.call(r, "ontouchstart") >= 0;
        u = { horizontal: {}, vertical: {} };
        a = 1;
        l = {};
        f = "waypoints-context-id";
        d = "resize.waypoints";
        v = "scroll.waypoints";
        m = 1;
        g = "waypoints-waypoint-ids";
        y = "waypoint";
        b = "waypoints";
        s = (function () {
            function e(e) {
                var t = this;
                this.$element = e;
                this.element = e[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + a++;
                this.oldScroll = { x: e.scrollLeft(), y: e.scrollTop() };
                this.waypoints = { horizontal: {}, vertical: {} };
                this.element[f] = this.id;
                l[this.id] = this;
                e.bind(v, function () {
                    var e;
                    if (!(t.didScroll || c)) {
                        t.didScroll = true;
                        e = function () {
                            t.doScroll();
                            return (t.didScroll = false);
                        };
                        return r.setTimeout(e, n[b].settings.scrollThrottle);
                    }
                });
                e.bind(d, function () {
                    var e;
                    if (!t.didResize) {
                        t.didResize = true;
                        e = function () {
                            n[b]("refresh");
                            return (t.didResize = false);
                        };
                        return r.setTimeout(e, n[b].settings.resizeThrottle);
                    }
                });
            }
            e.prototype.doScroll = function () {
                var e,
                    t = this;
                e = {
                    horizontal: { newScroll: this.$element.scrollLeft(), oldScroll: this.oldScroll.x, forward: "right", backward: "left" },
                    vertical: { newScroll: this.$element.scrollTop(), oldScroll: this.oldScroll.y, forward: "down", backward: "up" },
                };
                if (c && (!e.vertical.oldScroll || !e.vertical.newScroll)) {
                    n[b]("refresh");
                }
                n.each(e, function (e, r) {
                    var i, s, o;
                    o = [];
                    s = r.newScroll > r.oldScroll;
                    i = s ? r.forward : r.backward;
                    n.each(t.waypoints[e], function (e, t) {
                        var n, i;
                        if (r.oldScroll < (n = t.offset) && n <= r.newScroll) {
                            return o.push(t);
                        } else if (r.newScroll < (i = t.offset) && i <= r.oldScroll) {
                            return o.push(t);
                        }
                    });
                    o.sort(function (e, t) {
                        return e.offset - t.offset;
                    });
                    if (!s) {
                        o.reverse();
                    }
                    return n.each(o, function (e, t) {
                        if (t.options.continuous || e === o.length - 1) {
                            return t.trigger([i]);
                        }
                    });
                });
                return (this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll });
            };
            e.prototype.refresh = function () {
                var e,
                    t,
                    r,
                    i = this;
                r = n.isWindow(this.element);
                t = this.$element.offset();
                this.doScroll();
                e = {
                    horizontal: { contextOffset: r ? 0 : t.left, contextScroll: r ? 0 : this.oldScroll.x, contextDimension: this.$element.width(), oldScroll: this.oldScroll.x, forward: "right", backward: "left", offsetProp: "left" },
                    vertical: {
                        contextOffset: r ? 0 : t.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[b]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top",
                    },
                };
                return n.each(e, function (e, t) {
                    return n.each(i.waypoints[e], function (e, r) {
                        var i, s, o, u, a;
                        i = r.options.offset;
                        o = r.offset;
                        s = n.isWindow(r.element) ? 0 : r.$element.offset()[t.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element);
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil((t.contextDimension * i) / 100);
                            }
                        }
                        r.offset = s - t.contextOffset + t.contextScroll - i;
                        if ((r.options.onlyOnScroll && o != null) || !r.enabled) {
                            return;
                        }
                        if (o !== null && o < (u = t.oldScroll) && u <= r.offset) {
                            return r.trigger([t.backward]);
                        } else if (o !== null && o > (a = t.oldScroll) && a >= r.offset) {
                            return r.trigger([t.forward]);
                        } else if (o === null && t.oldScroll >= r.offset) {
                            return r.trigger([t.forward]);
                        }
                    });
                });
            };
            e.prototype.checkEmpty = function () {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([d, v].join(" "));
                    return delete l[this.id];
                }
            };
            return e;
        })();
        o = (function () {
            function e(e, t, r) {
                var i, s;
                if (r.offset === "bottom-in-view") {
                    r.offset = function () {
                        var e;
                        e = n[b]("viewportHeight");
                        if (!n.isWindow(t.element)) {
                            e = t.$element.height();
                        }
                        return e - n(this).outerHeight();
                    };
                }
                this.$element = e;
                this.element = e[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = t;
                this.enabled = r.enabled;
                this.id = "waypoints" + m++;
                this.offset = null;
                this.options = r;
                t.waypoints[this.axis][this.id] = this;
                u[this.axis][this.id] = this;
                i = (s = this.element[g]) != null ? s : [];
                i.push(this.id);
                this.element[g] = i;
            }
            e.prototype.trigger = function (e) {
                if (!this.enabled) {
                    return;
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, e);
                }
                if (this.options.triggerOnce) {
                    return this.destroy();
                }
            };
            e.prototype.disable = function () {
                return (this.enabled = false);
            };
            e.prototype.enable = function () {
                this.context.refresh();
                return (this.enabled = true);
            };
            e.prototype.destroy = function () {
                delete u[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty();
            };
            e.getWaypointsByElement = function (e) {
                var t, r;
                r = e[g];
                if (!r) {
                    return [];
                }
                t = n.extend({}, u.horizontal, u.vertical);
                return n.map(r, function (e) {
                    return t[e];
                });
            };
            return e;
        })();
        p = {
            init: function (e, t) {
                var r;
                t = n.extend({}, n.fn[y].defaults, t);
                if ((r = t.handler) == null) {
                    t.handler = e;
                }
                this.each(function () {
                    var e, r, i, u;
                    e = n(this);
                    i = (u = t.context) != null ? u : n.fn[y].defaults.context;
                    if (!n.isWindow(i)) {
                        i = e.closest(i);
                    }
                    i = n(i);
                    r = l[i[0][f]];
                    if (!r) {
                        r = new s(i);
                    }
                    return new o(e, r, t);
                });
                n[b]("refresh");
                return this;
            },
            disable: function () {
                return p._invoke.call(this, "disable");
            },
            enable: function () {
                return p._invoke.call(this, "enable");
            },
            destroy: function () {
                return p._invoke.call(this, "destroy");
            },
            prev: function (e, t) {
                return p._traverse.call(this, e, t, function (e, t, n) {
                    if (t > 0) {
                        return e.push(n[t - 1]);
                    }
                });
            },
            next: function (e, t) {
                return p._traverse.call(this, e, t, function (e, t, n) {
                    if (t < n.length - 1) {
                        return e.push(n[t + 1]);
                    }
                });
            },
            _traverse: function (e, t, i) {
                var s, o;
                if (e == null) {
                    e = "vertical";
                }
                if (t == null) {
                    t = r;
                }
                o = h.aggregate(t);
                s = [];
                this.each(function () {
                    var t;
                    t = n.inArray(this, o[e]);
                    return i(s, t, o[e]);
                });
                return this.pushStack(s);
            },
            _invoke: function (e) {
                this.each(function () {
                    var t;
                    t = o.getWaypointsByElement(this);
                    return n.each(t, function (t, n) {
                        n[e]();
                        return true;
                    });
                });
                return this;
            },
        };
        n.fn[y] = function () {
            var e, r;
            (r = arguments[0]), (e = 2 <= arguments.length ? t.call(arguments, 1) : []);
            if (p[r]) {
                return p[r].apply(this, e);
            } else if (n.isFunction(r)) {
                return p.init.apply(this, arguments);
            } else if (n.isPlainObject(r)) {
                return p.init.apply(this, [null, r]);
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.");
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.");
            }
        };
        n.fn[y].defaults = { context: r, continuous: true, enabled: true, horizontal: false, offset: 0, triggerOnce: false };
        h = {
            refresh: function () {
                return n.each(l, function (e, t) {
                    return t.refresh();
                });
            },
            viewportHeight: function () {
                var e;
                return (e = r.innerHeight) != null ? e : i.height();
            },
            aggregate: function (e) {
                var t, r, i;
                t = u;
                if (e) {
                    t = (i = l[n(e)[0][f]]) != null ? i.waypoints : void 0;
                }
                if (!t) {
                    return [];
                }
                r = { horizontal: [], vertical: [] };
                n.each(r, function (e, i) {
                    n.each(t[e], function (e, t) {
                        return i.push(t);
                    });
                    i.sort(function (e, t) {
                        return e.offset - t.offset;
                    });
                    r[e] = n.map(i, function (e) {
                        return e.element;
                    });
                    return (r[e] = n.unique(r[e]));
                });
                return r;
            },
            above: function (e) {
                if (e == null) {
                    e = r;
                }
                return h._filter(e, "vertical", function (e, t) {
                    return t.offset <= e.oldScroll.y;
                });
            },
            below: function (e) {
                if (e == null) {
                    e = r;
                }
                return h._filter(e, "vertical", function (e, t) {
                    return t.offset > e.oldScroll.y;
                });
            },
            left: function (e) {
                if (e == null) {
                    e = r;
                }
                return h._filter(e, "horizontal", function (e, t) {
                    return t.offset <= e.oldScroll.x;
                });
            },
            right: function (e) {
                if (e == null) {
                    e = r;
                }
                return h._filter(e, "horizontal", function (e, t) {
                    return t.offset > e.oldScroll.x;
                });
            },
            enable: function () {
                return h._invoke("enable");
            },
            disable: function () {
                return h._invoke("disable");
            },
            destroy: function () {
                return h._invoke("destroy");
            },
            extendFn: function (e, t) {
                return (p[e] = t);
            },
            _invoke: function (e) {
                var t;
                t = n.extend({}, u.vertical, u.horizontal);
                return n.each(t, function (t, n) {
                    n[e]();
                    return true;
                });
            },
            _filter: function (e, t, r) {
                var i, s;
                i = l[n(e)[0][f]];
                if (!i) {
                    return [];
                }
                s = [];
                n.each(i.waypoints[t], function (e, t) {
                    if (r(i, t)) {
                        return s.push(t);
                    }
                });
                s.sort(function (e, t) {
                    return e.offset - t.offset;
                });
                return n.map(s, function (e) {
                    return e.element;
                });
            },
        };
        n[b] = function () {
            var e, n;
            (n = arguments[0]), (e = 2 <= arguments.length ? t.call(arguments, 1) : []);
            if (h[n]) {
                return h[n].apply(null, e);
            } else {
                return h.aggregate.call(null, n);
            }
        };
        n[b].settings = { resizeThrottle: 100, scrollThrottle: 30 };
        return i.on("load.waypoints", function () {
            return n[b]("refresh");
        });
    });
}.call(this));
(function () {
    var e,
        t,
        n = function (e, t) {
            return function () {
                return e.apply(t, arguments);
            };
        };
    (e = (function () {
        function e() {}
        return (
            (e.prototype.extend = function (e, t) {
                var n, r;
                for (n in e) (r = e[n]), null != r && (t[n] = r);
                return t;
            }),
            (e.prototype.isMobile = function (e) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e);
            }),
            e
        );
    })()),
        (t =
            this.WeakMap ||
            (t = (function () {
                function e() {
                    (this.keys = []), (this.values = []);
                }
                return (
                    (e.prototype.get = function (e) {
                        var t, n, r, i, s;
                        for (s = this.keys, t = r = 0, i = s.length; i > r; t = ++r) if (((n = s[t]), n === e)) return this.values[t];
                    }),
                    (e.prototype.set = function (e, t) {
                        var n, r, i, s, o;
                        for (o = this.keys, n = i = 0, s = o.length; s > i; n = ++i) if (((r = o[n]), r === e)) return void (this.values[n] = t);
                        return this.keys.push(e), this.values.push(t);
                    }),
                    e
                );
            })())),
        (this.WOW = (function () {
            function r(e) {
                null == e && (e = {}),
                    (this.scrollCallback = n(this.scrollCallback, this)),
                    (this.scrollHandler = n(this.scrollHandler, this)),
                    (this.start = n(this.start, this)),
                    (this.scrolled = !0),
                    (this.config = this.util().extend(e, this.defaults)),
                    (this.animationNameCache = new t());
            }
            return (
                (r.prototype.defaults = { boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0 }),
                (r.prototype.init = function () {
                    var e;
                    return (this.element = window.document.documentElement), "interactive" === (e = document.readyState) || "complete" === e ? this.start() : document.addEventListener("DOMContentLoaded", this.start);
                }),
                (r.prototype.start = function () {
                    var e, t, n, r;
                    if (((this.boxes = this.element.getElementsByClassName(this.config.boxClass)), this.boxes.length)) {
                        if (this.disabled()) return this.resetStyle();
                        for (r = this.boxes, t = 0, n = r.length; n > t; t++) (e = r[t]), this.applyStyle(e, !0);
                        return window.addEventListener("scroll", this.scrollHandler, !1), window.addEventListener("resize", this.scrollHandler, !1), (this.interval = setInterval(this.scrollCallback, 50));
                    }
                }),
                (r.prototype.stop = function () {
                    return window.removeEventListener("scroll", this.scrollHandler, !1), window.removeEventListener("resize", this.scrollHandler, !1), null != this.interval ? clearInterval(this.interval) : void 0;
                }),
                (r.prototype.show = function (e) {
                    return this.applyStyle(e), (e.className = "" + e.className + " " + this.config.animateClass);
                }),
                (r.prototype.applyStyle = function (e, t) {
                    var n, r, i;
                    return (
                        (r = e.getAttribute("data-wow-duration")),
                        (n = e.getAttribute("data-wow-delay")),
                        (i = e.getAttribute("data-wow-iteration")),
                        this.animate(
                            (function (s) {
                                return function () {
                                    return s.customStyle(e, t, r, n, i);
                                };
                            })(this)
                        )
                    );
                }),
                (r.prototype.animate = (function () {
                    return "requestAnimationFrame" in window
                        ? function (e) {
                              return window.requestAnimationFrame(e);
                          }
                        : function (e) {
                              return e();
                          };
                })()),
                (r.prototype.resetStyle = function () {
                    var e, t, n, r, i;
                    for (r = this.boxes, i = [], t = 0, n = r.length; n > t; t++) (e = r[t]), i.push(e.setAttribute("style", "visibility: visible;"));
                    return i;
                }),
                (r.prototype.customStyle = function (e, t, n, r, i) {
                    return (
                        t && this.cacheAnimationName(e),
                        (e.style.visibility = t ? "hidden" : "visible"),
                        n && this.vendorSet(e.style, { animationDuration: n }),
                        r && this.vendorSet(e.style, { animationDelay: r }),
                        i && this.vendorSet(e.style, { animationIterationCount: i }),
                        this.vendorSet(e.style, { animationName: t ? "none" : this.cachedAnimationName(e) }),
                        e
                    );
                }),
                (r.prototype.vendors = ["moz", "webkit"]),
                (r.prototype.vendorSet = function (e, t) {
                    var n, r, i, s;
                    s = [];
                    for (n in t)
                        (r = t[n]),
                            (e["" + n] = r),
                            s.push(
                                function () {
                                    var t, s, o, u;
                                    for (o = this.vendors, u = [], t = 0, s = o.length; s > t; t++) (i = o[t]), u.push((e["" + i + n.charAt(0).toUpperCase() + n.substr(1)] = r));
                                    return u;
                                }.call(this)
                            );
                    return s;
                }),
                (r.prototype.vendorCSS = function (e, t) {
                    var n, r, i, s, o, u;
                    for (r = window.getComputedStyle(e), n = r.getPropertyCSSValue(t), u = this.vendors, s = 0, o = u.length; o > s; s++) (i = u[s]), (n = n || r.getPropertyCSSValue("-" + i + "-" + t));
                    return n;
                }),
                (r.prototype.animationName = function (e) {
                    var t;
                    try {
                        t = this.vendorCSS(e, "animation-name").cssText;
                    } catch (n) {
                        t = window.getComputedStyle(e).getPropertyValue("animation-name");
                    }
                    return "none" === t ? "" : t;
                }),
                (r.prototype.cacheAnimationName = function (e) {
                    return this.animationNameCache.set(e, this.animationName(e));
                }),
                (r.prototype.cachedAnimationName = function (e) {
                    return this.animationNameCache.get(e);
                }),
                (r.prototype.scrollHandler = function () {
                    return (this.scrolled = !0);
                }),
                (r.prototype.scrollCallback = function () {
                    var e;
                    return this.scrolled &&
                        ((this.scrolled = !1),
                        (this.boxes = function () {
                            var t, n, r, i;
                            for (r = this.boxes, i = [], t = 0, n = r.length; n > t; t++) (e = r[t]), e && (this.isVisible(e) ? this.show(e) : i.push(e));
                            return i;
                        }.call(this)),
                        !this.boxes.length)
                        ? this.stop()
                        : void 0;
                }),
                (r.prototype.offsetTop = function (e) {
                    for (var t; void 0 === e.offsetTop; ) e = e.parentNode;
                    for (t = e.offsetTop; (e = e.offsetParent); ) t += e.offsetTop;
                    return t;
                }),
                (r.prototype.isVisible = function (e) {
                    var t, n, r, i, s;
                    return (n = e.getAttribute("data-wow-offset") || this.config.offset), (s = window.pageYOffset), (i = s + this.element.clientHeight - n), (r = this.offsetTop(e)), (t = r + e.clientHeight), i >= r && t >= s;
                }),
                (r.prototype.util = function () {
                    return this._util || (this._util = new e());
                }),
                (r.prototype.disabled = function () {
                    return !this.config.mobile && this.util().isMobile(navigator.userAgent);
                }),
                r
            );
        })());
}.call(this));
