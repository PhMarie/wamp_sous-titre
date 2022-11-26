/*! MY
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */
!(function (s) {
	"use strict"
	function e(s) {
		return new RegExp("(^|\\s+)" + s + "(\\s+|$)")
	}
	var n, a, t
	function c(s, e) {
		;(n(s, e) ? t : a)(s, e)
	}
	"classList" in document.documentElement
		? ((n = function (s, e) {
				return s.classList.contains(e)
		  }),
		  (a = function (s, e) {
				s.classList.add(e)
		  }),
		  (t = function (s, e) {
				s.classList.remove(e)
		  }))
		: ((n = function (s, n) {
				return e(n).test(s.className)
		  }),
		  (a = function (s, e) {
				n(s, e) || (s.className = s.className + " " + e)
		  }),
		  (t = function (s, n) {
				s.className = s.className.replace(e(n), " ")
		  }))
	var i = {
		hasClass: n,
		addClass: a,
		removeClass: t,
		toggleClass: c,
		has: n,
		add: a,
		remove: t,
		toggle: c,
	}
	"function" == typeof define && define.amd ? define(i) : (s.classie = i)
})(window)

/*! MY
counter
*/
!(function (e) {
	;(e.fn.countTo = function (t) {
		t = e.extend({}, e.fn.countTo.defaults, t || {})
		var n = Math.ceil(t.speed / t.refreshInterval),
			o = (t.to - t.from) / n
		return e(this).each(function () {
			var l = this,
				r = 0,
				a = t.from,
				f = setInterval(function () {
					;(a += o),
						r++,
						e(l).html(a.toFixed(t.decimals)),
						"function" == typeof t.onUpdate && t.onUpdate.call(l, a),
						r >= n &&
							(clearInterval(f),
							(a = t.to),
							"function" == typeof t.onComplete && t.onComplete.call(l, a))
				}, t.refreshInterval)
		})
	}),
		(e.fn.countTo.defaults = {
			from: 0,
			to: 100,
			speed: 1e3,
			refreshInterval: 100,
			decimals: 0,
			onUpdate: null,
			onComplete: null,
		})
})(jQuery)

/*!
 * imagesLoaded PACKAGED v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!(function (t, e) {
	"object" == typeof module && module.exports
		? (module.exports = e())
		: (t.EvEmitter = e())
})("undefined" != typeof window ? window : this, function () {
	function t() {}
	let e = t.prototype
	return (
		(e.on = function (t, e) {
			if (!t || !e) return this
			let i = (this._events = this._events || {}),
				s = (i[t] = i[t] || [])
			return s.includes(e) || s.push(e), this
		}),
		(e.once = function (t, e) {
			if (!t || !e) return this
			this.on(t, e)
			let i = (this._onceEvents = this._onceEvents || {})
			return ((i[t] = i[t] || {})[e] = !0), this
		}),
		(e.off = function (t, e) {
			let i = this._events && this._events[t]
			if (!i || !i.length) return this
			let s = i.indexOf(e)
			return -1 != s && i.splice(s, 1), this
		}),
		(e.emitEvent = function (t, e) {
			let i = this._events && this._events[t]
			if (!i || !i.length) return this
			;(i = i.slice(0)), (e = e || [])
			let s = this._onceEvents && this._onceEvents[t]
			for (let n of i) {
				s && s[n] && (this.off(t, n), delete s[n]), n.apply(this, e)
			}
			return this
		}),
		(e.allOff = function () {
			return delete this._events, delete this._onceEvents, this
		}),
		t
	)
}),
	/*! MY
	 * imagesLoaded v5.0.0
	 * JavaScript is all like "You images are done yet or what?"
	 * MIT License
	 */
	(function (t, e) {
		"object" == typeof module && module.exports
			? (module.exports = e(t, require("ev-emitter")))
			: (t.imagesLoaded = e(t, t.EvEmitter))
	})("undefined" != typeof window ? window : this, function (t, e) {
		let i = t.jQuery,
			s = t.console
		function n(t, e, o) {
			if (!(this instanceof n)) return new n(t, e, o)
			let r = t
			var h
			;("string" == typeof t && (r = document.querySelectorAll(t)), r)
				? ((this.elements =
						((h = r),
						Array.isArray(h)
							? h
							: "object" == typeof h && "number" == typeof h.length
							? [...h]
							: [h])),
				  (this.options = {}),
				  "function" == typeof e ? (o = e) : Object.assign(this.options, e),
				  o && this.on("always", o),
				  this.getImages(),
				  i && (this.jqDeferred = new i.Deferred()),
				  setTimeout(this.check.bind(this)))
				: s.error(`Bad element for imagesLoaded ${r || t}`)
		}
		;(n.prototype = Object.create(e.prototype)),
			(n.prototype.getImages = function () {
				;(this.images = []), this.elements.forEach(this.addElementImages, this)
			})
		const o = [1, 9, 11]
		n.prototype.addElementImages = function (t) {
			"IMG" === t.nodeName && this.addImage(t),
				!0 === this.options.background && this.addElementBackgroundImages(t)
			let { nodeType: e } = t
			if (!e || !o.includes(e)) return
			let i = t.querySelectorAll("img")
			for (let t of i) this.addImage(t)
			if ("string" == typeof this.options.background) {
				let e = t.querySelectorAll(this.options.background)
				for (let t of e) this.addElementBackgroundImages(t)
			}
		}
		const r = /url\((['"])?(.*?)\1\)/gi
		function h(t) {
			this.img = t
		}
		function d(t, e) {
			;(this.url = t), (this.element = e), (this.img = new Image())
		}
		return (
			(n.prototype.addElementBackgroundImages = function (t) {
				let e = getComputedStyle(t)
				if (!e) return
				let i = r.exec(e.backgroundImage)
				for (; null !== i; ) {
					let s = i && i[2]
					s && this.addBackground(s, t), (i = r.exec(e.backgroundImage))
				}
			}),
			(n.prototype.addImage = function (t) {
				let e = new h(t)
				this.images.push(e)
			}),
			(n.prototype.addBackground = function (t, e) {
				let i = new d(t, e)
				this.images.push(i)
			}),
			(n.prototype.check = function () {
				if (
					((this.progressedCount = 0),
					(this.hasAnyBroken = !1),
					!this.images.length)
				)
					return void this.complete()
				let t = (t, e, i) => {
					setTimeout(() => {
						this.progress(t, e, i)
					})
				}
				this.images.forEach(function (e) {
					e.once("progress", t), e.check()
				})
			}),
			(n.prototype.progress = function (t, e, i) {
				this.progressedCount++,
					(this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
					this.emitEvent("progress", [this, t, e]),
					this.jqDeferred &&
						this.jqDeferred.notify &&
						this.jqDeferred.notify(this, t),
					this.progressedCount === this.images.length && this.complete(),
					this.options.debug && s && s.log(`progress: ${i}`, t, e)
			}),
			(n.prototype.complete = function () {
				let t = this.hasAnyBroken ? "fail" : "done"
				if (
					((this.isComplete = !0),
					this.emitEvent(t, [this]),
					this.emitEvent("always", [this]),
					this.jqDeferred)
				) {
					let t = this.hasAnyBroken ? "reject" : "resolve"
					this.jqDeferred[t](this)
				}
			}),
			(h.prototype = Object.create(e.prototype)),
			(h.prototype.check = function () {
				this.getIsImageComplete()
					? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
					: ((this.proxyImage = new Image()),
					  this.img.crossOrigin &&
							(this.proxyImage.crossOrigin = this.img.crossOrigin),
					  this.proxyImage.addEventListener("load", this),
					  this.proxyImage.addEventListener("error", this),
					  this.img.addEventListener("load", this),
					  this.img.addEventListener("error", this),
					  (this.proxyImage.src = this.img.currentSrc || this.img.src))
			}),
			(h.prototype.getIsImageComplete = function () {
				return this.img.complete && this.img.naturalWidth
			}),
			(h.prototype.confirm = function (t, e) {
				this.isLoaded = t
				let { parentNode: i } = this.img,
					s = "PICTURE" === i.nodeName ? i : this.img
				this.emitEvent("progress", [this, s, e])
			}),
			(h.prototype.handleEvent = function (t) {
				let e = "on" + t.type
				this[e] && this[e](t)
			}),
			(h.prototype.onload = function () {
				this.confirm(!0, "onload"), this.unbindEvents()
			}),
			(h.prototype.onerror = function () {
				this.confirm(!1, "onerror"), this.unbindEvents()
			}),
			(h.prototype.unbindEvents = function () {
				this.proxyImage.removeEventListener("load", this),
					this.proxyImage.removeEventListener("error", this),
					this.img.removeEventListener("load", this),
					this.img.removeEventListener("error", this)
			}),
			(d.prototype = Object.create(h.prototype)),
			(d.prototype.check = function () {
				this.img.addEventListener("load", this),
					this.img.addEventListener("error", this),
					(this.img.src = this.url),
					this.getIsImageComplete() &&
						(this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
						this.unbindEvents())
			}),
			(d.prototype.unbindEvents = function () {
				this.img.removeEventListener("load", this),
					this.img.removeEventListener("error", this)
			}),
			(d.prototype.confirm = function (t, e) {
				;(this.isLoaded = t),
					this.emitEvent("progress", [this, this.element, e])
			}),
			(n.makeJQueryPlugin = function (e) {
				;(e = e || t.jQuery) &&
					((i = e),
					(i.fn.imagesLoaded = function (t, e) {
						return new n(this, t, e).jqDeferred.promise(i(this))
					}))
			}),
			n.makeJQueryPlugin(),
			n
		)
	})

/*! MY
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

!(function (t, e) {
	"function" == typeof define && define.amd
		? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
				return e(t, i)
		  })
		: "object" == typeof module && module.exports
		? (module.exports = e(t, require("jquery")))
		: (t.jQueryBridget = e(t, t.jQuery))
})(window, function (t, e) {
	"use strict"
	function i(i, s, a) {
		function u(t, e, o) {
			var n,
				s = "$()." + i + '("' + e + '")'
			return (
				t.each(function (t, u) {
					var h = a.data(u, i)
					if (!h)
						return void r(
							i + " not initialized. Cannot call methods, i.e. " + s
						)
					var d = h[e]
					if (!d || "_" == e.charAt(0))
						return void r(s + " is not a valid method")
					var l = d.apply(h, o)
					n = void 0 === n ? l : n
				}),
				void 0 !== n ? n : t
			)
		}
		function h(t, e) {
			t.each(function (t, o) {
				var n = a.data(o, i)
				n ? (n.option(e), n._init()) : ((n = new s(o, e)), a.data(o, i, n))
			})
		}
		;(a = a || e || t.jQuery),
			a &&
				(s.prototype.option ||
					(s.prototype.option = function (t) {
						a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
					}),
				(a.fn[i] = function (t) {
					if ("string" == typeof t) {
						var e = n.call(arguments, 1)
						return u(this, t, e)
					}
					return h(this, t), this
				}),
				o(a))
	}
	function o(t) {
		!t || (t && t.bridget) || (t.bridget = i)
	}
	var n = Array.prototype.slice,
		s = t.console,
		r =
			"undefined" == typeof s
				? function () {}
				: function (t) {
						s.error(t)
				  }
	return o(e || t.jQuery), i
}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define("ev-emitter/ev-emitter", e)
			: "object" == typeof module && module.exports
			? (module.exports = e())
			: (t.EvEmitter = e())
	})("undefined" != typeof window ? window : this, function () {
		function t() {}
		var e = t.prototype
		return (
			(e.on = function (t, e) {
				if (t && e) {
					var i = (this._events = this._events || {}),
						o = (i[t] = i[t] || [])
					return o.indexOf(e) == -1 && o.push(e), this
				}
			}),
			(e.once = function (t, e) {
				if (t && e) {
					this.on(t, e)
					var i = (this._onceEvents = this._onceEvents || {}),
						o = (i[t] = i[t] || {})
					return (o[e] = !0), this
				}
			}),
			(e.off = function (t, e) {
				var i = this._events && this._events[t]
				if (i && i.length) {
					var o = i.indexOf(e)
					return o != -1 && i.splice(o, 1), this
				}
			}),
			(e.emitEvent = function (t, e) {
				var i = this._events && this._events[t]
				if (i && i.length) {
					;(i = i.slice(0)), (e = e || [])
					for (
						var o = this._onceEvents && this._onceEvents[t], n = 0;
						n < i.length;
						n++
					) {
						var s = i[n],
							r = o && o[s]
						r && (this.off(t, s), delete o[s]), s.apply(this, e)
					}
					return this
				}
			}),
			(e.allOff = function () {
				delete this._events, delete this._onceEvents
			}),
			t
		)
	}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define("get-size/get-size", e)
			: "object" == typeof module && module.exports
			? (module.exports = e())
			: (t.getSize = e())
	})(window, function () {
		"use strict"
		function t(t) {
			var e = parseFloat(t),
				i = t.indexOf("%") == -1 && !isNaN(e)
			return i && e
		}
		function e() {}
		function i() {
			for (
				var t = {
						width: 0,
						height: 0,
						innerWidth: 0,
						innerHeight: 0,
						outerWidth: 0,
						outerHeight: 0,
					},
					e = 0;
				e < h;
				e++
			) {
				var i = u[e]
				t[i] = 0
			}
			return t
		}
		function o(t) {
			var e = getComputedStyle(t)
			return (
				e ||
					a(
						"Style returned " +
							e +
							". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
					),
				e
			)
		}
		function n() {
			if (!d) {
				d = !0
				var e = document.createElement("div")
				;(e.style.width = "200px"),
					(e.style.padding = "1px 2px 3px 4px"),
					(e.style.borderStyle = "solid"),
					(e.style.borderWidth = "1px 2px 3px 4px"),
					(e.style.boxSizing = "border-box")
				var i = document.body || document.documentElement
				i.appendChild(e)
				var n = o(e)
				;(r = 200 == Math.round(t(n.width))),
					(s.isBoxSizeOuter = r),
					i.removeChild(e)
			}
		}
		function s(e) {
			if (
				(n(),
				"string" == typeof e && (e = document.querySelector(e)),
				e && "object" == typeof e && e.nodeType)
			) {
				var s = o(e)
				if ("none" == s.display) return i()
				var a = {}
				;(a.width = e.offsetWidth), (a.height = e.offsetHeight)
				for (
					var d = (a.isBorderBox = "border-box" == s.boxSizing), l = 0;
					l < h;
					l++
				) {
					var f = u[l],
						c = s[f],
						m = parseFloat(c)
					a[f] = isNaN(m) ? 0 : m
				}
				var p = a.paddingLeft + a.paddingRight,
					y = a.paddingTop + a.paddingBottom,
					g = a.marginLeft + a.marginRight,
					v = a.marginTop + a.marginBottom,
					_ = a.borderLeftWidth + a.borderRightWidth,
					z = a.borderTopWidth + a.borderBottomWidth,
					I = d && r,
					x = t(s.width)
				x !== !1 && (a.width = x + (I ? 0 : p + _))
				var S = t(s.height)
				return (
					S !== !1 && (a.height = S + (I ? 0 : y + z)),
					(a.innerWidth = a.width - (p + _)),
					(a.innerHeight = a.height - (y + z)),
					(a.outerWidth = a.width + g),
					(a.outerHeight = a.height + v),
					a
				)
			}
		}
		var r,
			a =
				"undefined" == typeof console
					? e
					: function (t) {
							console.error(t)
					  },
			u = [
				"paddingLeft",
				"paddingRight",
				"paddingTop",
				"paddingBottom",
				"marginLeft",
				"marginRight",
				"marginTop",
				"marginBottom",
				"borderLeftWidth",
				"borderRightWidth",
				"borderTopWidth",
				"borderBottomWidth",
			],
			h = u.length,
			d = !1
		return s
	}),
	(function (t, e) {
		"use strict"
		"function" == typeof define && define.amd
			? define("desandro-matches-selector/matches-selector", e)
			: "object" == typeof module && module.exports
			? (module.exports = e())
			: (t.matchesSelector = e())
	})(window, function () {
		"use strict"
		var t = (function () {
			var t = window.Element.prototype
			if (t.matches) return "matches"
			if (t.matchesSelector) return "matchesSelector"
			for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
				var o = e[i],
					n = o + "MatchesSelector"
				if (t[n]) return n
			}
		})()
		return function (e, i) {
			return e[t](i)
		}
	}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define(
					"fizzy-ui-utils/utils",
					["desandro-matches-selector/matches-selector"],
					function (i) {
						return e(t, i)
					}
			  )
			: "object" == typeof module && module.exports
			? (module.exports = e(t, require("desandro-matches-selector")))
			: (t.fizzyUIUtils = e(t, t.matchesSelector))
	})(window, function (t, e) {
		var i = {}
		;(i.extend = function (t, e) {
			for (var i in e) t[i] = e[i]
			return t
		}),
			(i.modulo = function (t, e) {
				return ((t % e) + e) % e
			})
		var o = Array.prototype.slice
		;(i.makeArray = function (t) {
			if (Array.isArray(t)) return t
			if (null === t || void 0 === t) return []
			var e = "object" == typeof t && "number" == typeof t.length
			return e ? o.call(t) : [t]
		}),
			(i.removeFrom = function (t, e) {
				var i = t.indexOf(e)
				i != -1 && t.splice(i, 1)
			}),
			(i.getParent = function (t, i) {
				for (; t.parentNode && t != document.body; )
					if (((t = t.parentNode), e(t, i))) return t
			}),
			(i.getQueryElement = function (t) {
				return "string" == typeof t ? document.querySelector(t) : t
			}),
			(i.handleEvent = function (t) {
				var e = "on" + t.type
				this[e] && this[e](t)
			}),
			(i.filterFindElements = function (t, o) {
				t = i.makeArray(t)
				var n = []
				return (
					t.forEach(function (t) {
						if (t instanceof HTMLElement) {
							if (!o) return void n.push(t)
							e(t, o) && n.push(t)
							for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++)
								n.push(i[s])
						}
					}),
					n
				)
			}),
			(i.debounceMethod = function (t, e, i) {
				i = i || 100
				var o = t.prototype[e],
					n = e + "Timeout"
				t.prototype[e] = function () {
					var t = this[n]
					clearTimeout(t)
					var e = arguments,
						s = this
					this[n] = setTimeout(function () {
						o.apply(s, e), delete s[n]
					}, i)
				}
			}),
			(i.docReady = function (t) {
				var e = document.readyState
				"complete" == e || "interactive" == e
					? setTimeout(t)
					: document.addEventListener("DOMContentLoaded", t)
			}),
			(i.toDashed = function (t) {
				return t
					.replace(/(.)([A-Z])/g, function (t, e, i) {
						return e + "-" + i
					})
					.toLowerCase()
			})
		var n = t.console
		return (
			(i.htmlInit = function (e, o) {
				i.docReady(function () {
					var s = i.toDashed(o),
						r = "data-" + s,
						a = document.querySelectorAll("[" + r + "]"),
						u = document.querySelectorAll(".js-" + s),
						h = i.makeArray(a).concat(i.makeArray(u)),
						d = r + "-options",
						l = t.jQuery
					h.forEach(function (t) {
						var i,
							s = t.getAttribute(r) || t.getAttribute(d)
						try {
							i = s && JSON.parse(s)
						} catch (a) {
							return void (
								n &&
								n.error("Error parsing " + r + " on " + t.className + ": " + a)
							)
						}
						var u = new e(t, i)
						l && l.data(t, o, u)
					})
				})
			}),
			i
		)
	}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define(
					"outlayer/item",
					["ev-emitter/ev-emitter", "get-size/get-size"],
					e
			  )
			: "object" == typeof module && module.exports
			? (module.exports = e(require("ev-emitter"), require("get-size")))
			: ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)))
	})(window, function (t, e) {
		"use strict"
		function i(t) {
			for (var e in t) return !1
			return (e = null), !0
		}
		function o(t, e) {
			t &&
				((this.element = t),
				(this.layout = e),
				(this.position = { x: 0, y: 0 }),
				this._create())
		}
		function n(t) {
			return t.replace(/([A-Z])/g, function (t) {
				return "-" + t.toLowerCase()
			})
		}
		var s = document.documentElement.style,
			r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
			a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
			u = {
				WebkitTransition: "webkitTransitionEnd",
				transition: "transitionend",
			}[r],
			h = {
				transform: a,
				transition: r,
				transitionDuration: r + "Duration",
				transitionProperty: r + "Property",
				transitionDelay: r + "Delay",
			},
			d = (o.prototype = Object.create(t.prototype))
		;(d.constructor = o),
			(d._create = function () {
				;(this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
					this.css({ position: "absolute" })
			}),
			(d.handleEvent = function (t) {
				var e = "on" + t.type
				this[e] && this[e](t)
			}),
			(d.getSize = function () {
				this.size = e(this.element)
			}),
			(d.css = function (t) {
				var e = this.element.style
				for (var i in t) {
					var o = h[i] || i
					e[o] = t[i]
				}
			}),
			(d.getPosition = function () {
				var t = getComputedStyle(this.element),
					e = this.layout._getOption("originLeft"),
					i = this.layout._getOption("originTop"),
					o = t[e ? "left" : "right"],
					n = t[i ? "top" : "bottom"],
					s = parseFloat(o),
					r = parseFloat(n),
					a = this.layout.size
				o.indexOf("%") != -1 && (s = (s / 100) * a.width),
					n.indexOf("%") != -1 && (r = (r / 100) * a.height),
					(s = isNaN(s) ? 0 : s),
					(r = isNaN(r) ? 0 : r),
					(s -= e ? a.paddingLeft : a.paddingRight),
					(r -= i ? a.paddingTop : a.paddingBottom),
					(this.position.x = s),
					(this.position.y = r)
			}),
			(d.layoutPosition = function () {
				var t = this.layout.size,
					e = {},
					i = this.layout._getOption("originLeft"),
					o = this.layout._getOption("originTop"),
					n = i ? "paddingLeft" : "paddingRight",
					s = i ? "left" : "right",
					r = i ? "right" : "left",
					a = this.position.x + t[n]
				;(e[s] = this.getXValue(a)), (e[r] = "")
				var u = o ? "paddingTop" : "paddingBottom",
					h = o ? "top" : "bottom",
					d = o ? "bottom" : "top",
					l = this.position.y + t[u]
				;(e[h] = this.getYValue(l)),
					(e[d] = ""),
					this.css(e),
					this.emitEvent("layout", [this])
			}),
			(d.getXValue = function (t) {
				var e = this.layout._getOption("horizontal")
				return this.layout.options.percentPosition && !e
					? (t / this.layout.size.width) * 100 + "%"
					: t + "px"
			}),
			(d.getYValue = function (t) {
				var e = this.layout._getOption("horizontal")
				return this.layout.options.percentPosition && e
					? (t / this.layout.size.height) * 100 + "%"
					: t + "px"
			}),
			(d._transitionTo = function (t, e) {
				this.getPosition()
				var i = this.position.x,
					o = this.position.y,
					n = t == this.position.x && e == this.position.y
				if ((this.setPosition(t, e), n && !this.isTransitioning))
					return void this.layoutPosition()
				var s = t - i,
					r = e - o,
					a = {}
				;(a.transform = this.getTranslate(s, r)),
					this.transition({
						to: a,
						onTransitionEnd: { transform: this.layoutPosition },
						isCleaning: !0,
					})
			}),
			(d.getTranslate = function (t, e) {
				var i = this.layout._getOption("originLeft"),
					o = this.layout._getOption("originTop")
				return (
					(t = i ? t : -t),
					(e = o ? e : -e),
					"translate3d(" + t + "px, " + e + "px, 0)"
				)
			}),
			(d.goTo = function (t, e) {
				this.setPosition(t, e), this.layoutPosition()
			}),
			(d.moveTo = d._transitionTo),
			(d.setPosition = function (t, e) {
				;(this.position.x = parseFloat(t)), (this.position.y = parseFloat(e))
			}),
			(d._nonTransition = function (t) {
				this.css(t.to), t.isCleaning && this._removeStyles(t.to)
				for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
			}),
			(d.transition = function (t) {
				if (!parseFloat(this.layout.options.transitionDuration))
					return void this._nonTransition(t)
				var e = this._transn
				for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]
				for (i in t.to)
					(e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0)
				if (t.from) {
					this.css(t.from)
					var o = this.element.offsetHeight
					o = null
				}
				this.enableTransition(t.to), this.css(t.to), (this.isTransitioning = !0)
			})
		var l = "opacity," + n(a)
		;(d.enableTransition = function () {
			if (!this.isTransitioning) {
				var t = this.layout.options.transitionDuration
				;(t = "number" == typeof t ? t + "ms" : t),
					this.css({
						transitionProperty: l,
						transitionDuration: t,
						transitionDelay: this.staggerDelay || 0,
					}),
					this.element.addEventListener(u, this, !1)
			}
		}),
			(d.onwebkitTransitionEnd = function (t) {
				this.ontransitionend(t)
			}),
			(d.onotransitionend = function (t) {
				this.ontransitionend(t)
			})
		var f = { "-webkit-transform": "transform" }
		;(d.ontransitionend = function (t) {
			if (t.target === this.element) {
				var e = this._transn,
					o = f[t.propertyName] || t.propertyName
				if (
					(delete e.ingProperties[o],
					i(e.ingProperties) && this.disableTransition(),
					o in e.clean &&
						((this.element.style[t.propertyName] = ""), delete e.clean[o]),
					o in e.onEnd)
				) {
					var n = e.onEnd[o]
					n.call(this), delete e.onEnd[o]
				}
				this.emitEvent("transitionEnd", [this])
			}
		}),
			(d.disableTransition = function () {
				this.removeTransitionStyles(),
					this.element.removeEventListener(u, this, !1),
					(this.isTransitioning = !1)
			}),
			(d._removeStyles = function (t) {
				var e = {}
				for (var i in t) e[i] = ""
				this.css(e)
			})
		var c = {
			transitionProperty: "",
			transitionDuration: "",
			transitionDelay: "",
		}
		return (
			(d.removeTransitionStyles = function () {
				this.css(c)
			}),
			(d.stagger = function (t) {
				;(t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms")
			}),
			(d.removeElem = function () {
				this.element.parentNode.removeChild(this.element),
					this.css({ display: "" }),
					this.emitEvent("remove", [this])
			}),
			(d.remove = function () {
				return r && parseFloat(this.layout.options.transitionDuration)
					? (this.once("transitionEnd", function () {
							this.removeElem()
					  }),
					  void this.hide())
					: void this.removeElem()
			}),
			(d.reveal = function () {
				delete this.isHidden, this.css({ display: "" })
				var t = this.layout.options,
					e = {},
					i = this.getHideRevealTransitionEndProperty("visibleStyle")
				;(e[i] = this.onRevealTransitionEnd),
					this.transition({
						from: t.hiddenStyle,
						to: t.visibleStyle,
						isCleaning: !0,
						onTransitionEnd: e,
					})
			}),
			(d.onRevealTransitionEnd = function () {
				this.isHidden || this.emitEvent("reveal")
			}),
			(d.getHideRevealTransitionEndProperty = function (t) {
				var e = this.layout.options[t]
				if (e.opacity) return "opacity"
				for (var i in e) return i
			}),
			(d.hide = function () {
				;(this.isHidden = !0), this.css({ display: "" })
				var t = this.layout.options,
					e = {},
					i = this.getHideRevealTransitionEndProperty("hiddenStyle")
				;(e[i] = this.onHideTransitionEnd),
					this.transition({
						from: t.visibleStyle,
						to: t.hiddenStyle,
						isCleaning: !0,
						onTransitionEnd: e,
					})
			}),
			(d.onHideTransitionEnd = function () {
				this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide"))
			}),
			(d.destroy = function () {
				this.css({
					position: "",
					left: "",
					right: "",
					top: "",
					bottom: "",
					transition: "",
					transform: "",
				})
			}),
			o
		)
	}),
	(function (t, e) {
		"use strict"
		"function" == typeof define && define.amd
			? define(
					"outlayer/outlayer",
					[
						"ev-emitter/ev-emitter",
						"get-size/get-size",
						"fizzy-ui-utils/utils",
						"./item",
					],
					function (i, o, n, s) {
						return e(t, i, o, n, s)
					}
			  )
			: "object" == typeof module && module.exports
			? (module.exports = e(
					t,
					require("ev-emitter"),
					require("get-size"),
					require("fizzy-ui-utils"),
					require("./item")
			  ))
			: (t.Outlayer = e(
					t,
					t.EvEmitter,
					t.getSize,
					t.fizzyUIUtils,
					t.Outlayer.Item
			  ))
	})(window, function (t, e, i, o, n) {
		"use strict"
		function s(t, e) {
			var i = o.getQueryElement(t)
			if (!i)
				return void (
					u &&
					u.error(
						"Bad element for " + this.constructor.namespace + ": " + (i || t)
					)
				)
			;(this.element = i),
				h && (this.$element = h(this.element)),
				(this.options = o.extend({}, this.constructor.defaults)),
				this.option(e)
			var n = ++l
			;(this.element.outlayerGUID = n), (f[n] = this), this._create()
			var s = this._getOption("initLayout")
			s && this.layout()
		}
		function r(t) {
			function e() {
				t.apply(this, arguments)
			}
			return (
				(e.prototype = Object.create(t.prototype)),
				(e.prototype.constructor = e),
				e
			)
		}
		function a(t) {
			if ("number" == typeof t) return t
			var e = t.match(/(^\d*\.?\d*)(\w*)/),
				i = e && e[1],
				o = e && e[2]
			if (!i.length) return 0
			i = parseFloat(i)
			var n = m[o] || 1
			return i * n
		}
		var u = t.console,
			h = t.jQuery,
			d = function () {},
			l = 0,
			f = {}
		;(s.namespace = "outlayer"),
			(s.Item = n),
			(s.defaults = {
				containerStyle: { position: "relative" },
				initLayout: !0,
				originLeft: !0,
				originTop: !0,
				resize: !0,
				resizeContainer: !0,
				transitionDuration: "0.4s",
				hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
				visibleStyle: { opacity: 1, transform: "scale(1)" },
			})
		var c = s.prototype
		o.extend(c, e.prototype),
			(c.option = function (t) {
				o.extend(this.options, t)
			}),
			(c._getOption = function (t) {
				var e = this.constructor.compatOptions[t]
				return e && void 0 !== this.options[e]
					? this.options[e]
					: this.options[t]
			}),
			(s.compatOptions = {
				initLayout: "isInitLayout",
				horizontal: "isHorizontal",
				layoutInstant: "isLayoutInstant",
				originLeft: "isOriginLeft",
				originTop: "isOriginTop",
				resize: "isResizeBound",
				resizeContainer: "isResizingContainer",
			}),
			(c._create = function () {
				this.reloadItems(),
					(this.stamps = []),
					this.stamp(this.options.stamp),
					o.extend(this.element.style, this.options.containerStyle)
				var t = this._getOption("resize")
				t && this.bindResize()
			}),
			(c.reloadItems = function () {
				this.items = this._itemize(this.element.children)
			}),
			(c._itemize = function (t) {
				for (
					var e = this._filterFindItemElements(t),
						i = this.constructor.Item,
						o = [],
						n = 0;
					n < e.length;
					n++
				) {
					var s = e[n],
						r = new i(s, this)
					o.push(r)
				}
				return o
			}),
			(c._filterFindItemElements = function (t) {
				return o.filterFindElements(t, this.options.itemSelector)
			}),
			(c.getItemElements = function () {
				return this.items.map(function (t) {
					return t.element
				})
			}),
			(c.layout = function () {
				this._resetLayout(), this._manageStamps()
				var t = this._getOption("layoutInstant"),
					e = void 0 !== t ? t : !this._isLayoutInited
				this.layoutItems(this.items, e), (this._isLayoutInited = !0)
			}),
			(c._init = c.layout),
			(c._resetLayout = function () {
				this.getSize()
			}),
			(c.getSize = function () {
				this.size = i(this.element)
			}),
			(c._getMeasurement = function (t, e) {
				var o,
					n = this.options[t]
				n
					? ("string" == typeof n
							? (o = this.element.querySelector(n))
							: n instanceof HTMLElement && (o = n),
					  (this[t] = o ? i(o)[e] : n))
					: (this[t] = 0)
			}),
			(c.layoutItems = function (t, e) {
				;(t = this._getItemsForLayout(t)),
					this._layoutItems(t, e),
					this._postLayout()
			}),
			(c._getItemsForLayout = function (t) {
				return t.filter(function (t) {
					return !t.isIgnored
				})
			}),
			(c._layoutItems = function (t, e) {
				if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
					var i = []
					t.forEach(function (t) {
						var o = this._getItemLayoutPosition(t)
						;(o.item = t), (o.isInstant = e || t.isLayoutInstant), i.push(o)
					}, this),
						this._processLayoutQueue(i)
				}
			}),
			(c._getItemLayoutPosition = function () {
				return { x: 0, y: 0 }
			}),
			(c._processLayoutQueue = function (t) {
				this.updateStagger(),
					t.forEach(function (t, e) {
						this._positionItem(t.item, t.x, t.y, t.isInstant, e)
					}, this)
			}),
			(c.updateStagger = function () {
				var t = this.options.stagger
				return null === t || void 0 === t
					? void (this.stagger = 0)
					: ((this.stagger = a(t)), this.stagger)
			}),
			(c._positionItem = function (t, e, i, o, n) {
				o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
			}),
			(c._postLayout = function () {
				this.resizeContainer()
			}),
			(c.resizeContainer = function () {
				var t = this._getOption("resizeContainer")
				if (t) {
					var e = this._getContainerSize()
					e &&
						(this._setContainerMeasure(e.width, !0),
						this._setContainerMeasure(e.height, !1))
				}
			}),
			(c._getContainerSize = d),
			(c._setContainerMeasure = function (t, e) {
				if (void 0 !== t) {
					var i = this.size
					i.isBorderBox &&
						(t += e
							? i.paddingLeft +
							  i.paddingRight +
							  i.borderLeftWidth +
							  i.borderRightWidth
							: i.paddingBottom +
							  i.paddingTop +
							  i.borderTopWidth +
							  i.borderBottomWidth),
						(t = Math.max(t, 0)),
						(this.element.style[e ? "width" : "height"] = t + "px")
				}
			}),
			(c._emitCompleteOnItems = function (t, e) {
				function i() {
					n.dispatchEvent(t + "Complete", null, [e])
				}
				function o() {
					r++, r == s && i()
				}
				var n = this,
					s = e.length
				if (!e || !s) return void i()
				var r = 0
				e.forEach(function (e) {
					e.once(t, o)
				})
			}),
			(c.dispatchEvent = function (t, e, i) {
				var o = e ? [e].concat(i) : i
				if ((this.emitEvent(t, o), h))
					if (((this.$element = this.$element || h(this.element)), e)) {
						var n = h.Event(e)
						;(n.type = t), this.$element.trigger(n, i)
					} else this.$element.trigger(t, i)
			}),
			(c.ignore = function (t) {
				var e = this.getItem(t)
				e && (e.isIgnored = !0)
			}),
			(c.unignore = function (t) {
				var e = this.getItem(t)
				e && delete e.isIgnored
			}),
			(c.stamp = function (t) {
				;(t = this._find(t)),
					t &&
						((this.stamps = this.stamps.concat(t)),
						t.forEach(this.ignore, this))
			}),
			(c.unstamp = function (t) {
				;(t = this._find(t)),
					t &&
						t.forEach(function (t) {
							o.removeFrom(this.stamps, t), this.unignore(t)
						}, this)
			}),
			(c._find = function (t) {
				if (t)
					return (
						"string" == typeof t && (t = this.element.querySelectorAll(t)),
						(t = o.makeArray(t))
					)
			}),
			(c._manageStamps = function () {
				this.stamps &&
					this.stamps.length &&
					(this._getBoundingRect(),
					this.stamps.forEach(this._manageStamp, this))
			}),
			(c._getBoundingRect = function () {
				var t = this.element.getBoundingClientRect(),
					e = this.size
				this._boundingRect = {
					left: t.left + e.paddingLeft + e.borderLeftWidth,
					top: t.top + e.paddingTop + e.borderTopWidth,
					right: t.right - (e.paddingRight + e.borderRightWidth),
					bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
				}
			}),
			(c._manageStamp = d),
			(c._getElementOffset = function (t) {
				var e = t.getBoundingClientRect(),
					o = this._boundingRect,
					n = i(t),
					s = {
						left: e.left - o.left - n.marginLeft,
						top: e.top - o.top - n.marginTop,
						right: o.right - e.right - n.marginRight,
						bottom: o.bottom - e.bottom - n.marginBottom,
					}
				return s
			}),
			(c.handleEvent = o.handleEvent),
			(c.bindResize = function () {
				t.addEventListener("resize", this), (this.isResizeBound = !0)
			}),
			(c.unbindResize = function () {
				t.removeEventListener("resize", this), (this.isResizeBound = !1)
			}),
			(c.onresize = function () {
				this.resize()
			}),
			o.debounceMethod(s, "onresize", 100),
			(c.resize = function () {
				this.isResizeBound && this.needsResizeLayout() && this.layout()
			}),
			(c.needsResizeLayout = function () {
				var t = i(this.element),
					e = this.size && t
				return e && t.innerWidth !== this.size.innerWidth
			}),
			(c.addItems = function (t) {
				var e = this._itemize(t)
				return e.length && (this.items = this.items.concat(e)), e
			}),
			(c.appended = function (t) {
				var e = this.addItems(t)
				e.length && (this.layoutItems(e, !0), this.reveal(e))
			}),
			(c.prepended = function (t) {
				var e = this._itemize(t)
				if (e.length) {
					var i = this.items.slice(0)
					;(this.items = e.concat(i)),
						this._resetLayout(),
						this._manageStamps(),
						this.layoutItems(e, !0),
						this.reveal(e),
						this.layoutItems(i)
				}
			}),
			(c.reveal = function (t) {
				if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
					var e = this.updateStagger()
					t.forEach(function (t, i) {
						t.stagger(i * e), t.reveal()
					})
				}
			}),
			(c.hide = function (t) {
				if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
					var e = this.updateStagger()
					t.forEach(function (t, i) {
						t.stagger(i * e), t.hide()
					})
				}
			}),
			(c.revealItemElements = function (t) {
				var e = this.getItems(t)
				this.reveal(e)
			}),
			(c.hideItemElements = function (t) {
				var e = this.getItems(t)
				this.hide(e)
			}),
			(c.getItem = function (t) {
				for (var e = 0; e < this.items.length; e++) {
					var i = this.items[e]
					if (i.element == t) return i
				}
			}),
			(c.getItems = function (t) {
				t = o.makeArray(t)
				var e = []
				return (
					t.forEach(function (t) {
						var i = this.getItem(t)
						i && e.push(i)
					}, this),
					e
				)
			}),
			(c.remove = function (t) {
				var e = this.getItems(t)
				this._emitCompleteOnItems("remove", e),
					e &&
						e.length &&
						e.forEach(function (t) {
							t.remove(), o.removeFrom(this.items, t)
						}, this)
			}),
			(c.destroy = function () {
				var t = this.element.style
				;(t.height = ""),
					(t.position = ""),
					(t.width = ""),
					this.items.forEach(function (t) {
						t.destroy()
					}),
					this.unbindResize()
				var e = this.element.outlayerGUID
				delete f[e],
					delete this.element.outlayerGUID,
					h && h.removeData(this.element, this.constructor.namespace)
			}),
			(s.data = function (t) {
				t = o.getQueryElement(t)
				var e = t && t.outlayerGUID
				return e && f[e]
			}),
			(s.create = function (t, e) {
				var i = r(s)
				return (
					(i.defaults = o.extend({}, s.defaults)),
					o.extend(i.defaults, e),
					(i.compatOptions = o.extend({}, s.compatOptions)),
					(i.namespace = t),
					(i.data = s.data),
					(i.Item = r(n)),
					o.htmlInit(i, t),
					h && h.bridget && h.bridget(t, i),
					i
				)
			})
		var m = { ms: 1, s: 1e3 }
		return (s.Item = n), s
	}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define("isotope-layout/js/item", ["outlayer/outlayer"], e)
			: "object" == typeof module && module.exports
			? (module.exports = e(require("outlayer")))
			: ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)))
	})(window, function (t) {
		"use strict"
		function e() {
			t.Item.apply(this, arguments)
		}
		var i = (e.prototype = Object.create(t.Item.prototype)),
			o = i._create
		;(i._create = function () {
			;(this.id = this.layout.itemGUID++), o.call(this), (this.sortData = {})
		}),
			(i.updateSortData = function () {
				if (!this.isIgnored) {
					;(this.sortData.id = this.id),
						(this.sortData["original-order"] = this.id),
						(this.sortData.random = Math.random())
					var t = this.layout.options.getSortData,
						e = this.layout._sorters
					for (var i in t) {
						var o = e[i]
						this.sortData[i] = o(this.element, this)
					}
				}
			})
		var n = i.destroy
		return (
			(i.destroy = function () {
				n.apply(this, arguments), this.css({ display: "" })
			}),
			e
		)
	}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define(
					"isotope-layout/js/layout-mode",
					["get-size/get-size", "outlayer/outlayer"],
					e
			  )
			: "object" == typeof module && module.exports
			? (module.exports = e(require("get-size"), require("outlayer")))
			: ((t.Isotope = t.Isotope || {}),
			  (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)))
	})(window, function (t, e) {
		"use strict"
		function i(t) {
			;(this.isotope = t),
				t &&
					((this.options = t.options[this.namespace]),
					(this.element = t.element),
					(this.items = t.filteredItems),
					(this.size = t.size))
		}
		var o = i.prototype,
			n = [
				"_resetLayout",
				"_getItemLayoutPosition",
				"_manageStamp",
				"_getContainerSize",
				"_getElementOffset",
				"needsResizeLayout",
				"_getOption",
			]
		return (
			n.forEach(function (t) {
				o[t] = function () {
					return e.prototype[t].apply(this.isotope, arguments)
				}
			}),
			(o.needsVerticalResizeLayout = function () {
				var e = t(this.isotope.element),
					i = this.isotope.size && e
				return i && e.innerHeight != this.isotope.size.innerHeight
			}),
			(o._getMeasurement = function () {
				this.isotope._getMeasurement.apply(this, arguments)
			}),
			(o.getColumnWidth = function () {
				this.getSegmentSize("column", "Width")
			}),
			(o.getRowHeight = function () {
				this.getSegmentSize("row", "Height")
			}),
			(o.getSegmentSize = function (t, e) {
				var i = t + e,
					o = "outer" + e
				if ((this._getMeasurement(i, o), !this[i])) {
					var n = this.getFirstItemSize()
					this[i] = (n && n[o]) || this.isotope.size["inner" + e]
				}
			}),
			(o.getFirstItemSize = function () {
				var e = this.isotope.filteredItems[0]
				return e && e.element && t(e.element)
			}),
			(o.layout = function () {
				this.isotope.layout.apply(this.isotope, arguments)
			}),
			(o.getSize = function () {
				this.isotope.getSize(), (this.size = this.isotope.size)
			}),
			(i.modes = {}),
			(i.create = function (t, e) {
				function n() {
					i.apply(this, arguments)
				}
				return (
					(n.prototype = Object.create(o)),
					(n.prototype.constructor = n),
					e && (n.options = e),
					(n.prototype.namespace = t),
					(i.modes[t] = n),
					n
				)
			}),
			i
		)
	}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define(
					"masonry-layout/masonry",
					["outlayer/outlayer", "get-size/get-size"],
					e
			  )
			: "object" == typeof module && module.exports
			? (module.exports = e(require("outlayer"), require("get-size")))
			: (t.Masonry = e(t.Outlayer, t.getSize))
	})(window, function (t, e) {
		var i = t.create("masonry")
		i.compatOptions.fitWidth = "isFitWidth"
		var o = i.prototype
		return (
			(o._resetLayout = function () {
				this.getSize(),
					this._getMeasurement("columnWidth", "outerWidth"),
					this._getMeasurement("gutter", "outerWidth"),
					this.measureColumns(),
					(this.colYs = [])
				for (var t = 0; t < this.cols; t++) this.colYs.push(0)
				;(this.maxY = 0), (this.horizontalColIndex = 0)
			}),
			(o.measureColumns = function () {
				if ((this.getContainerWidth(), !this.columnWidth)) {
					var t = this.items[0],
						i = t && t.element
					this.columnWidth = (i && e(i).outerWidth) || this.containerWidth
				}
				var o = (this.columnWidth += this.gutter),
					n = this.containerWidth + this.gutter,
					s = n / o,
					r = o - (n % o),
					a = r && r < 1 ? "round" : "floor"
				;(s = Math[a](s)), (this.cols = Math.max(s, 1))
			}),
			(o.getContainerWidth = function () {
				var t = this._getOption("fitWidth"),
					i = t ? this.element.parentNode : this.element,
					o = e(i)
				this.containerWidth = o && o.innerWidth
			}),
			(o._getItemLayoutPosition = function (t) {
				t.getSize()
				var e = t.size.outerWidth % this.columnWidth,
					i = e && e < 1 ? "round" : "ceil",
					o = Math[i](t.size.outerWidth / this.columnWidth)
				o = Math.min(o, this.cols)
				for (
					var n = this.options.horizontalOrder
							? "_getHorizontalColPosition"
							: "_getTopColPosition",
						s = this[n](o, t),
						r = { x: this.columnWidth * s.col, y: s.y },
						a = s.y + t.size.outerHeight,
						u = o + s.col,
						h = s.col;
					h < u;
					h++
				)
					this.colYs[h] = a
				return r
			}),
			(o._getTopColPosition = function (t) {
				var e = this._getTopColGroup(t),
					i = Math.min.apply(Math, e)
				return { col: e.indexOf(i), y: i }
			}),
			(o._getTopColGroup = function (t) {
				if (t < 2) return this.colYs
				for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++)
					e[o] = this._getColGroupY(o, t)
				return e
			}),
			(o._getColGroupY = function (t, e) {
				if (e < 2) return this.colYs[t]
				var i = this.colYs.slice(t, t + e)
				return Math.max.apply(Math, i)
			}),
			(o._getHorizontalColPosition = function (t, e) {
				var i = this.horizontalColIndex % this.cols,
					o = t > 1 && i + t > this.cols
				i = o ? 0 : i
				var n = e.size.outerWidth && e.size.outerHeight
				return (
					(this.horizontalColIndex = n ? i + t : this.horizontalColIndex),
					{ col: i, y: this._getColGroupY(i, t) }
				)
			}),
			(o._manageStamp = function (t) {
				var i = e(t),
					o = this._getElementOffset(t),
					n = this._getOption("originLeft"),
					s = n ? o.left : o.right,
					r = s + i.outerWidth,
					a = Math.floor(s / this.columnWidth)
				a = Math.max(0, a)
				var u = Math.floor(r / this.columnWidth)
				;(u -= r % this.columnWidth ? 0 : 1), (u = Math.min(this.cols - 1, u))
				for (
					var h = this._getOption("originTop"),
						d = (h ? o.top : o.bottom) + i.outerHeight,
						l = a;
					l <= u;
					l++
				)
					this.colYs[l] = Math.max(d, this.colYs[l])
			}),
			(o._getContainerSize = function () {
				this.maxY = Math.max.apply(Math, this.colYs)
				var t = { height: this.maxY }
				return (
					this._getOption("fitWidth") &&
						(t.width = this._getContainerFitWidth()),
					t
				)
			}),
			(o._getContainerFitWidth = function () {
				for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++
				return (this.cols - t) * this.columnWidth - this.gutter
			}),
			(o.needsResizeLayout = function () {
				var t = this.containerWidth
				return this.getContainerWidth(), t != this.containerWidth
			}),
			i
		)
	}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define(
					"isotope-layout/js/layout-modes/masonry",
					["../layout-mode", "masonry-layout/masonry"],
					e
			  )
			: "object" == typeof module && module.exports
			? (module.exports = e(
					require("../layout-mode"),
					require("masonry-layout")
			  ))
			: e(t.Isotope.LayoutMode, t.Masonry)
	})(window, function (t, e) {
		"use strict"
		var i = t.create("masonry"),
			o = i.prototype,
			n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 }
		for (var s in e.prototype) n[s] || (o[s] = e.prototype[s])
		var r = o.measureColumns
		o.measureColumns = function () {
			;(this.items = this.isotope.filteredItems), r.call(this)
		}
		var a = o._getOption
		return (
			(o._getOption = function (t) {
				return "fitWidth" == t
					? void 0 !== this.options.isFitWidth
						? this.options.isFitWidth
						: this.options.fitWidth
					: a.apply(this.isotope, arguments)
			}),
			i
		)
	}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e)
			: "object" == typeof exports
			? (module.exports = e(require("../layout-mode")))
			: e(t.Isotope.LayoutMode)
	})(window, function (t) {
		"use strict"
		var e = t.create("fitRows"),
			i = e.prototype
		return (
			(i._resetLayout = function () {
				;(this.x = 0),
					(this.y = 0),
					(this.maxY = 0),
					this._getMeasurement("gutter", "outerWidth")
			}),
			(i._getItemLayoutPosition = function (t) {
				t.getSize()
				var e = t.size.outerWidth + this.gutter,
					i = this.isotope.size.innerWidth + this.gutter
				0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY))
				var o = { x: this.x, y: this.y }
				return (
					(this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
					(this.x += e),
					o
				)
			}),
			(i._getContainerSize = function () {
				return { height: this.maxY }
			}),
			e
		)
	}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e)
			: "object" == typeof module && module.exports
			? (module.exports = e(require("../layout-mode")))
			: e(t.Isotope.LayoutMode)
	})(window, function (t) {
		"use strict"
		var e = t.create("vertical", { horizontalAlignment: 0 }),
			i = e.prototype
		return (
			(i._resetLayout = function () {
				this.y = 0
			}),
			(i._getItemLayoutPosition = function (t) {
				t.getSize()
				var e =
						(this.isotope.size.innerWidth - t.size.outerWidth) *
						this.options.horizontalAlignment,
					i = this.y
				return (this.y += t.size.outerHeight), { x: e, y: i }
			}),
			(i._getContainerSize = function () {
				return { height: this.y }
			}),
			e
		)
	}),
	(function (t, e) {
		"function" == typeof define && define.amd
			? define(
					[
						"outlayer/outlayer",
						"get-size/get-size",
						"desandro-matches-selector/matches-selector",
						"fizzy-ui-utils/utils",
						"isotope-layout/js/item",
						"isotope-layout/js/layout-mode",
						"isotope-layout/js/layout-modes/masonry",
						"isotope-layout/js/layout-modes/fit-rows",
						"isotope-layout/js/layout-modes/vertical",
					],
					function (i, o, n, s, r, a) {
						return e(t, i, o, n, s, r, a)
					}
			  )
			: "object" == typeof module && module.exports
			? (module.exports = e(
					t,
					require("outlayer"),
					require("get-size"),
					require("desandro-matches-selector"),
					require("fizzy-ui-utils"),
					require("isotope-layout/js/item"),
					require("isotope-layout/js/layout-mode"),
					require("isotope-layout/js/layout-modes/masonry"),
					require("isotope-layout/js/layout-modes/fit-rows"),
					require("isotope-layout/js/layout-modes/vertical")
			  ))
			: (t.Isotope = e(
					t,
					t.Outlayer,
					t.getSize,
					t.matchesSelector,
					t.fizzyUIUtils,
					t.Isotope.Item,
					t.Isotope.LayoutMode
			  ))
	})(window, function (t, e, i, o, n, s, r) {
		function a(t, e) {
			return function (i, o) {
				for (var n = 0; n < t.length; n++) {
					var s = t[n],
						r = i.sortData[s],
						a = o.sortData[s]
					if (r > a || r < a) {
						var u = void 0 !== e[s] ? e[s] : e,
							h = u ? 1 : -1
						return (r > a ? 1 : -1) * h
					}
				}
				return 0
			}
		}
		var u = t.jQuery,
			h = String.prototype.trim
				? function (t) {
						return t.trim()
				  }
				: function (t) {
						return t.replace(/^\s+|\s+$/g, "")
				  },
			d = e.create("isotope", {
				layoutMode: "masonry",
				isJQueryFiltering: !0,
				sortAscending: !0,
			})
		;(d.Item = s), (d.LayoutMode = r)
		var l = d.prototype
		;(l._create = function () {
			;(this.itemGUID = 0),
				(this._sorters = {}),
				this._getSorters(),
				e.prototype._create.call(this),
				(this.modes = {}),
				(this.filteredItems = this.items),
				(this.sortHistory = ["original-order"])
			for (var t in r.modes) this._initLayoutMode(t)
		}),
			(l.reloadItems = function () {
				;(this.itemGUID = 0), e.prototype.reloadItems.call(this)
			}),
			(l._itemize = function () {
				for (
					var t = e.prototype._itemize.apply(this, arguments), i = 0;
					i < t.length;
					i++
				) {
					var o = t[i]
					o.id = this.itemGUID++
				}
				return this._updateItemsSortData(t), t
			}),
			(l._initLayoutMode = function (t) {
				var e = r.modes[t],
					i = this.options[t] || {}
				;(this.options[t] = e.options ? n.extend(e.options, i) : i),
					(this.modes[t] = new e(this))
			}),
			(l.layout = function () {
				return !this._isLayoutInited && this._getOption("initLayout")
					? void this.arrange()
					: void this._layout()
			}),
			(l._layout = function () {
				var t = this._getIsInstant()
				this._resetLayout(),
					this._manageStamps(),
					this.layoutItems(this.filteredItems, t),
					(this._isLayoutInited = !0)
			}),
			(l.arrange = function (t) {
				this.option(t), this._getIsInstant()
				var e = this._filter(this.items)
				;(this.filteredItems = e.matches),
					this._bindArrangeComplete(),
					this._isInstant
						? this._noTransition(this._hideReveal, [e])
						: this._hideReveal(e),
					this._sort(),
					this._layout()
			}),
			(l._init = l.arrange),
			(l._hideReveal = function (t) {
				this.reveal(t.needReveal), this.hide(t.needHide)
			}),
			(l._getIsInstant = function () {
				var t = this._getOption("layoutInstant"),
					e = void 0 !== t ? t : !this._isLayoutInited
				return (this._isInstant = e), e
			}),
			(l._bindArrangeComplete = function () {
				function t() {
					e &&
						i &&
						o &&
						n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
				}
				var e,
					i,
					o,
					n = this
				this.once("layoutComplete", function () {
					;(e = !0), t()
				}),
					this.once("hideComplete", function () {
						;(i = !0), t()
					}),
					this.once("revealComplete", function () {
						;(o = !0), t()
					})
			}),
			(l._filter = function (t) {
				var e = this.options.filter
				e = e || "*"
				for (
					var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0;
					r < t.length;
					r++
				) {
					var a = t[r]
					if (!a.isIgnored) {
						var u = s(a)
						u && i.push(a),
							u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
					}
				}
				return { matches: i, needReveal: o, needHide: n }
			}),
			(l._getFilterTest = function (t) {
				return u && this.options.isJQueryFiltering
					? function (e) {
							return u(e.element).is(t)
					  }
					: "function" == typeof t
					? function (e) {
							return t(e.element)
					  }
					: function (e) {
							return o(e.element, t)
					  }
			}),
			(l.updateSortData = function (t) {
				var e
				t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
					this._getSorters(),
					this._updateItemsSortData(e)
			}),
			(l._getSorters = function () {
				var t = this.options.getSortData
				for (var e in t) {
					var i = t[e]
					this._sorters[e] = f(i)
				}
			}),
			(l._updateItemsSortData = function (t) {
				for (var e = t && t.length, i = 0; e && i < e; i++) {
					var o = t[i]
					o.updateSortData()
				}
			})
		var f = (function () {
			function t(t) {
				if ("string" != typeof t) return t
				var i = h(t).split(" "),
					o = i[0],
					n = o.match(/^\[(.+)\]$/),
					s = n && n[1],
					r = e(s, o),
					a = d.sortDataParsers[i[1]]
				return (t = a
					? function (t) {
							return t && a(r(t))
					  }
					: function (t) {
							return t && r(t)
					  })
			}
			function e(t, e) {
				return t
					? function (e) {
							return e.getAttribute(t)
					  }
					: function (t) {
							var i = t.querySelector(e)
							return i && i.textContent
					  }
			}
			return t
		})()
		;(d.sortDataParsers = {
			parseInt: function (t) {
				return parseInt(t, 10)
			},
			parseFloat: function (t) {
				return parseFloat(t)
			},
		}),
			(l._sort = function () {
				if (this.options.sortBy) {
					var t = n.makeArray(this.options.sortBy)
					this._getIsSameSortBy(t) ||
						(this.sortHistory = t.concat(this.sortHistory))
					var e = a(this.sortHistory, this.options.sortAscending)
					this.filteredItems.sort(e)
				}
			}),
			(l._getIsSameSortBy = function (t) {
				for (var e = 0; e < t.length; e++)
					if (t[e] != this.sortHistory[e]) return !1
				return !0
			}),
			(l._mode = function () {
				var t = this.options.layoutMode,
					e = this.modes[t]
				if (!e) throw new Error("No layout mode: " + t)
				return (e.options = this.options[t]), e
			}),
			(l._resetLayout = function () {
				e.prototype._resetLayout.call(this), this._mode()._resetLayout()
			}),
			(l._getItemLayoutPosition = function (t) {
				return this._mode()._getItemLayoutPosition(t)
			}),
			(l._manageStamp = function (t) {
				this._mode()._manageStamp(t)
			}),
			(l._getContainerSize = function () {
				return this._mode()._getContainerSize()
			}),
			(l.needsResizeLayout = function () {
				return this._mode().needsResizeLayout()
			}),
			(l.appended = function (t) {
				var e = this.addItems(t)
				if (e.length) {
					var i = this._filterRevealAdded(e)
					this.filteredItems = this.filteredItems.concat(i)
				}
			}),
			(l.prepended = function (t) {
				var e = this._itemize(t)
				if (e.length) {
					this._resetLayout(), this._manageStamps()
					var i = this._filterRevealAdded(e)
					this.layoutItems(this.filteredItems),
						(this.filteredItems = i.concat(this.filteredItems)),
						(this.items = e.concat(this.items))
				}
			}),
			(l._filterRevealAdded = function (t) {
				var e = this._filter(t)
				return (
					this.hide(e.needHide),
					this.reveal(e.matches),
					this.layoutItems(e.matches, !0),
					e.matches
				)
			}),
			(l.insert = function (t) {
				var e = this.addItems(t)
				if (e.length) {
					var i,
						o,
						n = e.length
					for (i = 0; i < n; i++)
						(o = e[i]), this.element.appendChild(o.element)
					var s = this._filter(e).matches
					for (i = 0; i < n; i++) e[i].isLayoutInstant = !0
					for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant
					this.reveal(s)
				}
			})
		var c = l.remove
		return (
			(l.remove = function (t) {
				t = n.makeArray(t)
				var e = this.getItems(t)
				c.call(this, t)
				for (var i = e && e.length, o = 0; i && o < i; o++) {
					var s = e[o]
					n.removeFrom(this.filteredItems, s)
				}
			}),
			(l.shuffle = function () {
				for (var t = 0; t < this.items.length; t++) {
					var e = this.items[t]
					e.sortData.random = Math.random()
				}
				;(this.options.sortBy = "random"), this._sort(), this._layout()
			}),
			(l._noTransition = function (t, e) {
				var i = this.options.transitionDuration
				this.options.transitionDuration = 0
				var o = t.apply(this, e)
				return (this.options.transitionDuration = i), o
			}),
			(l.getFilteredItemElements = function () {
				return this.filteredItems.map(function (t) {
					return t.element
				})
			}),
			d
		)
	})

/*! MY
Backstretch - v2.1.18 -
2019-09-18
* Copyright (c) 2019 Scott Robbin;
* Fork of improvements - by Daniel Cohen Gindi (danielgindi@gmail.com) Licensed MIT
*/ !(function (t, e, i) {
	"use strict"
	function r(t) {
		return u.hasOwnProperty(t) ? t : "cover"
	}
	var a =
		/^.*(youtu\.be\/|youtube\.com\/v\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtube\.com\/watch\?.*\&v=)([^#\&\?]*).*/i
	;(t.fn.backstretch = function (r, a) {
		var o,
			n = arguments
		return (
			0 === t(e).scrollTop() && e.scrollTo(0, 0),
			this.each(function (e) {
				var s = t(this),
					h = s.data("backstretch")
				if (h) {
					if ("string" == typeof n[0] && "function" == typeof h[n[0]]) {
						var c = h[n[0]].apply(h, Array.prototype.slice.call(n, 1))
						return (
							c === h && (c = i), void (c !== i && ((o = o || []), (o[e] = c)))
						)
					}
					;(a = t.extend(h.options, a)),
						"object" == typeof h && "destroy" in h && h.destroy(!0)
				}
				if (!r || (r && 0 === r.length)) {
					var d = s.css("background-image")
					d && "none" !== d
						? (r = [
								{ url: s.css("backgroundImage").replace(/url\(|\)|"|'/g, "") },
						  ])
						: t.error(
								"No images were supplied for Backstretch, or element must have a CSS-defined background image."
						  )
				}
				;(h = new p(this, r, a || {})), s.data("backstretch", h)
			}),
			o ? (1 === o.length ? o[0] : o) : this
		)
	}),
		(t.backstretch = function (e, i) {
			return t("body").backstretch(e, i).data("backstretch")
		}),
		(t.expr[":"].backstretch = function (e) {
			return t(e).data("backstretch") !== i
		}),
		(t.fn.backstretch.defaults = {
			duration: 5e3,
			transition: "fade",
			transitionDuration: 0,
			animateFirst: !0,
			alignX: 0.5,
			alignY: 0.5,
			paused: !1,
			start: 0,
			preload: 2,
			preloadSize: 1,
			resolutionRefreshRate: 2500,
			resolutionChangeRatioThreshold: 0.1,
		})
	var o = {
			wrap: {
				left: 0,
				top: 0,
				overflow: "hidden",
				margin: 0,
				padding: 0,
				height: "100%",
				width: "100%",
				zIndex: -999999,
			},
			itemWrapper: {
				position: "absolute",
				display: "none",
				margin: 0,
				padding: 0,
				border: "none",
				width: "100%",
				height: "100%",
				zIndex: -999999,
			},
			item: {
				position: "absolute",
				margin: 0,
				padding: 0,
				border: "none",
				width: "100%",
				height: "100%",
				maxWidth: "none",
			},
		},
		n = (function () {
			var i = function (t) {
					for (var e = 1; e < t.length; e++) {
						for (
							var i = t[e], r = e;
							t[r - 1] && parseInt(t[r - 1].width, 10) > parseInt(i.width, 10);

						)
							(t[r] = t[r - 1]), --r
						t[r] = i
					}
					return t
				},
				r = function (t, i, r) {
					for (
						var a,
							o,
							n = e.devicePixelRatio || 1,
							s = y(),
							h = (f(), i > t ? "portrait" : t > i ? "landscape" : "square"),
							c = 0,
							d = 0;
						d < r.length &&
						("string" == typeof (o = r[d]) && (o = r[d] = { url: o }),
						(o.pixelRatio &&
							"auto" !== o.pixelRatio &&
							parseFloat(o.pixelRatio) !== n) ||
							(o.deviceOrientation && o.deviceOrientation !== s) ||
							(o.windowOrientation && o.windowOrientation !== s) ||
							(o.orientation && o.orientation !== h) ||
							((c = d),
							(a = t),
							"auto" === o.pixelRatio && (t *= n),
							!(o.width >= a)));
						d++
					);
					return r[Math.min(d, c)]
				},
				a = function (t, e) {
					if ("string" == typeof t) t = t.replace(/{{(width|height)}}/g, e)
					else if (t instanceof Array)
						for (var i = 0; i < t.length; i++)
							t[i].src ? (t[i].src = a(t[i].src, e)) : (t[i] = a(t[i], e))
					return t
				}
			return function (e, o) {
				for (
					var n = e.width(),
						s = e.height(),
						h = [],
						c = function (t, e) {
							return "width" === e ? n : "height" === e ? s : t
						},
						d = 0;
					d < o.length;
					d++
				)
					if (t.isArray(o[d])) {
						o[d] = i(o[d])
						var l = r(n, s, o[d])
						h.push(l)
					} else {
						"string" == typeof o[d] && (o[d] = { url: o[d] })
						var u = t.extend({}, o[d])
						;(u.url = a(u.url, c)), h.push(u)
					}
				return h
			}
		})(),
		s = function (t) {
			return a.test(t.url) || t.isVideo
		},
		h = (function (e, i, r, a, o) {
			var n = [],
				h = function (t) {
					for (var e = 0; e < n.length; e++) if (n[e].src === t.src) return n[e]
					return n.push(t), t
				},
				c = function (t, e, i) {
					"function" == typeof e && e.call(t, i)
				}
			return function e(i, r, a, o, n) {
				if (void 0 !== i) {
					t.isArray(i) || (i = [i]),
						arguments.length < 5 &&
							"function" == typeof arguments[arguments.length - 1] &&
							(n = arguments[arguments.length - 1]),
						(r = "function" != typeof r && r ? r : 0),
						(a =
							"function" == typeof a || !a || a < 0
								? i.length
								: Math.min(a, i.length)),
						(o = "function" != typeof o && o ? o : 1),
						r >= i.length && ((r = 0), (a = 0)),
						o < 0 && (o = a),
						(o = Math.min(o, a))
					var d = i.slice(r + o, a - o)
					if (((i = i.slice(r, o)), !(a = i.length))) return void c(i, n, !0)
					for (
						var l,
							u = 0,
							p = function () {
								++u === a && (c(i, n, !d), e(d, 0, 0, o, n))
							},
							g = 0;
						g < i.length;
						g++
					)
						s(i[g]) ||
							(((l = new Image()).src = i[g].url),
							(l = h(l)).complete ? p() : t(l).on("load error", p))
				}
			}
		})(),
		c = function (e) {
			for (var i = [], r = 0; r < e.length; r++)
				"string" == typeof e[r]
					? i.push({ url: e[r] })
					: t.isArray(e[r])
					? i.push(c(e[r]))
					: i.push(d(e[r]))
			return i
		},
		d = function (t, a) {
			return (
				(t.centeredX || t.centeredY) &&
					(e.console &&
						e.console.log &&
						e.console.log(
							"jquery.backstretch: `centeredX`/`centeredY` is deprecated, please use `alignX`/`alignY`"
						),
					t.centeredX && (t.alignX = 0.5),
					t.centeredY && (t.alignY = 0.5)),
				t.speed !== i &&
					(e.console &&
						e.console.log &&
						e.console.log(
							"jquery.backstretch: `speed` is deprecated, please use `transitionDuration`"
						),
					(t.transitionDuration = t.speed),
					(t.transition = "fade")),
				t.resolutionChangeRatioTreshold !== i &&
					(e.console.log("jquery.backstretch: `treshold` is a typo!"),
					(t.resolutionChangeRatioThreshold = t.resolutionChangeRatioTreshold)),
				t.fadeFirst !== i && (t.animateFirst = t.fadeFirst),
				t.fade !== i &&
					((t.transitionDuration = t.fade), (t.transition = "fade")),
				t.scale && (t.scale = r(t.scale)),
				l(t)
			)
		},
		l = function (t, e) {
			return (
				"left" === t.alignX
					? (t.alignX = 0)
					: "center" === t.alignX
					? (t.alignX = 0.5)
					: "right" === t.alignX
					? (t.alignX = 1)
					: (t.alignX !== i || e) &&
					  ((t.alignX = parseFloat(t.alignX)),
					  isNaN(t.alignX) && (t.alignX = 0.5)),
				"top" === t.alignY
					? (t.alignY = 0)
					: "center" === t.alignY
					? (t.alignY = 0.5)
					: "bottom" === t.alignY
					? (t.alignY = 1)
					: (t.alignX !== i || e) &&
					  ((t.alignY = parseFloat(t.alignY)),
					  isNaN(t.alignY) && (t.alignY = 0.5)),
				t
			)
		},
		u = {
			cover: "cover",
			fit: "fit",
			"fit-smaller": "fit-smaller",
			fill: "fill",
		},
		p = function (i, r, a) {
			;(this.options = t.extend({}, t.fn.backstretch.defaults, a || {})),
				(this.firstShow = !0),
				d(this.options, !0),
				(this.images = c(t.isArray(r) ? r : [r])),
				this.options.paused && (this.paused = !0),
				this.options.start >= this.images.length &&
					(this.options.start = this.images.length - 1),
				this.options.start < 0 && (this.options.start = 0),
				(this.isBody = i === document.body)
			var s = t(e)
			;(this.$container = t(i)),
				(this.$root = this.isBody ? (v ? s : t(document)) : this.$container),
				(this.originalImages = this.images),
				(this.images = n(
					this.options.alwaysTestWindowResolution ? s : this.$root,
					this.originalImages
				)),
				h(this.images, this.options.start || 0, this.options.preload || 1)
			var l = this.$container.children(".backstretch").first()
			if (
				((this.$wrap = l.length
					? l
					: t('<div class="backstretch"></div>')
							.css(this.options.bypassCss ? {} : o.wrap)
							.appendTo(this.$container)),
				!this.options.bypassCss)
			) {
				if (!this.isBody) {
					var u = this.$container.css("position"),
						p = this.$container.css("zIndex")
					this.$container.css({
						position: "static" === u ? "relative" : u,
						zIndex: "auto" === p ? 0 : p,
					}),
						this.$wrap.css({ zIndex: -999998 })
				}
				this.$wrap.css({ position: this.isBody && v ? "fixed" : "absolute" })
			}
			;(this.index = this.options.start),
				this.show(this.index),
				s.on("resize.backstretch", t.proxy(this.resize, this)).on(
					"orientationchange.backstretch",
					t.proxy(function () {
						this.isBody &&
							0 === e.pageYOffset &&
							(e.scrollTo(0, 1), this.resize())
					}, this)
				)
		}
	p.prototype = {
		resize: function () {
			try {
				var a = this.options.alwaysTestWindowResolution ? t(e) : this.$root,
					o = a.width(),
					s = a.height(),
					c = o / (this._lastResizeContainerWidth || 0),
					d = s / (this._lastResizeContainerHeight || 0),
					l = this.options.resolutionChangeRatioThreshold || 0
				if (
					(o !== this._lastResizeContainerWidth ||
						s !== this._lastResizeContainerHeight) &&
					(Math.abs(c - 1) >= l ||
						isNaN(c) ||
						Math.abs(d - 1) >= l ||
						isNaN(d)) &&
					((this._lastResizeContainerWidth = o),
					(this._lastResizeContainerHeight = s),
					(this.images = n(a, this.originalImages)),
					this.options.preload &&
						h(
							this.images,
							(this.index + 1) % this.images.length,
							this.options.preload
						),
					1 === this.images.length &&
						this._currentImage.url !== this.images[0].url)
				) {
					var u = this
					clearTimeout(u._selectAnotherResolutionTimeout),
						(u._selectAnotherResolutionTimeout = setTimeout(function () {
							u.show(0)
						}, this.options.resolutionRefreshRate))
				}
				var p,
					g,
					y = { left: 0, top: 0, right: "auto", bottom: "auto" },
					f = this.isBody ? this.$root.width() : this.$root.innerWidth(),
					v = this.isBody
						? e.innerHeight
							? e.innerHeight
							: this.$root.height()
						: this.$root.innerHeight(),
					m = this.$itemWrapper.data("width"),
					b = this.$itemWrapper.data("height"),
					_ = m / b || 1,
					w =
						this._currentImage.alignX === i
							? this.options.alignX
							: this._currentImage.alignX,
					$ =
						this._currentImage.alignY === i
							? this.options.alignY
							: this._currentImage.alignY,
					T = r(this._currentImage.scale || this.options.scale)
				if ("fit" === T || "fit-smaller" === T) {
					if (((g = b), (p = m) > f || g > v || "fit-smaller" === T)) {
						var k = f / v
						k > _
							? ((p = Math.floor(v * _)), (g = v))
							: k < _
							? ((p = f), (g = Math.floor(f / _)))
							: ((p = f), (g = v))
					}
				} else
					"fill" === T
						? ((p = f), (g = v))
						: ((p = Math.max(v * _, f)), (g = Math.max(p / _, v)))
				;(y.top = -(g - v) * $),
					(y.left = -(p - f) * w),
					(y.width = p),
					(y.height = g),
					this.options.bypassCss ||
						this.$wrap
							.css({ width: f, height: v })
							.find(">.backstretch-item")
							.not(".deleteable")
							.each(function () {
								t(this).find("img,video,iframe").css(y)
							})
				var x = t.Event("backstretch.resize", {
					relatedTarget: this.$container[0],
				})
				this.$container.trigger(x, this)
			} catch (t) {}
			return this
		},
		show: function (e, r) {
			if (!(Math.abs(e) > this.images.length - 1)) {
				var a = this,
					n = a.$wrap.find(">.backstretch-item").addClass("deleteable"),
					h = a.videoWrapper,
					c = { relatedTarget: a.$container[0] }
				a.$container.trigger(t.Event("backstretch.before", c), [a, e]),
					(this.index = e)
				var d = a.images[e]
				clearTimeout(a._cycleTimeout), delete a.videoWrapper
				var l = s(d)
				return (
					l
						? ((a.videoWrapper = new g(d)),
						  (a.$item = a.videoWrapper.$video.css("pointer-events", "none")))
						: (a.$item = t("<img />")),
					(a.$itemWrapper = t('<div class="backstretch-item">').append(
						a.$item
					)),
					this.options.bypassCss
						? a.$itemWrapper.css({ display: "none" })
						: (a.$itemWrapper.css(o.itemWrapper), a.$item.css(o.item)),
					a.$item.bind(l ? "canplay" : "load", function (o) {
						var s = t(this).parent(),
							d = s.data("options")
						r && (d = t.extend({}, d, r))
						var u = this.naturalWidth || this.videoWidth || this.width,
							p = this.naturalHeight || this.videoHeight || this.height
						s.data("width", u).data("height", p)
						var g = function (t) {
								return d[t] !== i ? d[t] : a.options[t]
							},
							y = g("transition"),
							f = g("transitionEasing"),
							v = g("transitionDuration"),
							m = function () {
								h && (h.stop(), h.destroy()),
									n.remove(),
									!a.paused && a.images.length > 1 && a.cycle(),
									a.options.bypassCss ||
										a.isBody ||
										a.$container.css("background-image", "none"),
									t(["after", "show"]).each(function () {
										a.$container.trigger(t.Event("backstretch." + this, c), [
											a,
											e,
										])
									}),
									l && a.videoWrapper.play()
							}
						;(a.firstShow && !a.options.animateFirst) || !v || !y
							? (s.show(), m())
							: (function (e) {
									var r = e.transition || "fade"
									"string" == typeof r &&
										r.indexOf("|") > -1 &&
										(r = r.split("|")),
										r instanceof Array &&
											(r = r[Math.round(Math.random() * (r.length - 1))])
									var a = e.new,
										o = e.old ? e.old : t([])
									switch (r.toString().toLowerCase()) {
										default:
										case "fade":
											a.fadeIn({
												duration: e.duration,
												complete: e.complete,
												easing: e.easing || i,
											})
											break
										case "fadeinout":
										case "fade_in_out":
											var n = function () {
												a.fadeIn({
													duration: e.duration / 2,
													complete: e.complete,
													easing: e.easing || i,
												})
											}
											o.length
												? o.fadeOut({
														duration: e.duration / 2,
														complete: n,
														easing: e.easing || i,
												  })
												: n()
											break
										case "pushleft":
										case "push_left":
										case "pushright":
										case "push_right":
										case "pushup":
										case "push_up":
										case "pushdown":
										case "push_down":
										case "coverleft":
										case "cover_left":
										case "coverright":
										case "cover_right":
										case "coverup":
										case "cover_up":
										case "coverdown":
										case "cover_down":
											var s = r.match(/^(cover|push)_?(.*)$/),
												h =
													"left" === s[2]
														? "right"
														: "right" === s[2]
														? "left"
														: "down" === s[2]
														? "top"
														: "up" === s[2]
														? "bottom"
														: "right",
												c = { display: "" },
												d = {}
											if (
												((c[h] = "-100%"),
												(d[h] = 0),
												a.css(c).animate(d, {
													duration: e.duration,
													complete: function () {
														a.css(h, ""), e.complete.apply(this, arguments)
													},
													easing: e.easing || i,
												}),
												"push" === s[1] && o.length)
											) {
												var l = {}
												;(l[h] = "100%"),
													o.animate(l, {
														duration: e.duration,
														complete: function () {
															o.css("display", "none")
														},
														easing: e.easing || i,
													})
											}
									}
							  })({
									new: s,
									old: n,
									transition: y,
									duration: v,
									easing: f,
									complete: m,
							  }),
							(a.firstShow = !1),
							a.resize()
					}),
					a.$itemWrapper.appendTo(a.$wrap),
					a.$item.attr("alt", d.alt || ""),
					a.$itemWrapper.data("options", d),
					l || a.$item.attr("src", d.url),
					(a._currentImage = d),
					a
				)
			}
		},
		current: function () {
			return this.index
		},
		next: function () {
			var t = Array.prototype.slice.call(arguments, 0)
			return (
				t.unshift(this.index < this.images.length - 1 ? this.index + 1 : 0),
				this.show.apply(this, t)
			)
		},
		prev: function () {
			var t = Array.prototype.slice.call(arguments, 0)
			return (
				t.unshift(0 === this.index ? this.images.length - 1 : this.index - 1),
				this.show.apply(this, t)
			)
		},
		pause: function () {
			return (
				(this.paused = !0), this.videoWrapper && this.videoWrapper.pause(), this
			)
		},
		resume: function () {
			return (
				(this.paused = !1),
				this.videoWrapper && this.videoWrapper.play(),
				this.cycle(),
				this
			)
		},
		cycle: function () {
			if (this.images.length > 1) {
				clearTimeout(this._cycleTimeout)
				var e =
						(this._currentImage && this._currentImage.duration) ||
						this.options.duration,
					i = s(this._currentImage),
					r = function () {
						this.$item.off(".cycle"), this.paused || this.next()
					}
				if (i) {
					if (!this._currentImage.loop) {
						var a = 0
						this.$item
							.on("playing.cycle", function () {
								var e = t(this).data("player")
								clearTimeout(a),
									(a = setTimeout(function () {
										e.pause(), e.$video.trigger("ended")
									}, 1e3 * (e.getDuration() - e.getCurrentTime())))
							})
							.on("ended.cycle", function () {
								clearTimeout(a)
							})
					}
					this.$item.on("error.cycle initerror.cycle", t.proxy(r, this))
				}
				i && !this._currentImage.duration
					? this.$item.on("ended.cycle", t.proxy(r, this))
					: (this._cycleTimeout = setTimeout(t.proxy(r, this), e))
			}
			return this
		},
		destroy: function (i) {
			t(e).off("resize.backstretch orientationchange.backstretch"),
				this.videoWrapper && this.videoWrapper.destroy(),
				clearTimeout(this._cycleTimeout),
				i || this.$wrap.remove(),
				this.$container.removeData("backstretch")
		},
	}
	var g = function () {
		this.init.apply(this, arguments)
	}
	;(g.prototype.init = function (r) {
		var o,
			n = this,
			s = function () {
				;(n.$video = o), (n.video = o[0])
			},
			h = "video"
		if (
			(r.url instanceof Array || !a.test(r.url) || (h = "youtube"),
			(n.type = h),
			"youtube" === h)
		) {
			g.loadYoutubeAPI(), (n.ytId = r.url.match(a)[2])
			var c =
				"https://www.youtube.com/embed/" +
				n.ytId +
				"?rel=0&autoplay=0&showinfo=0&controls=0&modestbranding=1&cc_load_policy=0&disablekb=1&iv_load_policy=3&loop=0&enablejsapi=1&origin=" +
				encodeURIComponent(e.location.origin)
			;(n.__ytStartMuted = !!r.mute || r.mute === i),
				(o = t("<iframe />")
					.attr({ src_to_load: c })
					.css({ border: 0, margin: 0, padding: 0 })
					.data("player", n)),
				r.loop &&
					o.on("ended.loop", function () {
						n.__manuallyStopped || n.play()
					}),
				(n.ytReady = !1),
				s(),
				e.YT && e.YT.loaded
					? (n._initYoutube(), o.trigger("initsuccess"))
					: t(e).one("youtube_api_load", function () {
							n._initYoutube(), o.trigger("initsuccess")
					  })
		} else {
			o = t("<video>")
				.prop("autoplay", !1)
				.prop("controls", !1)
				.prop("loop", !!r.loop)
				.prop("muted", !!r.mute || r.mute === i)
				.prop("preload", "auto")
				.prop("poster", r.poster || "")
			for (
				var d = r.url instanceof Array ? r.url : [r.url], l = 0;
				l < d.length;
				l++
			) {
				var u = d[l]
				"string" == typeof u && (u = { src: u }),
					t("<source>")
						.attr("src", u.src)
						.attr("type", u.type || null)
						.appendTo(o)
			}
			o[0].canPlayType && d.length
				? o.trigger("initsuccess")
				: o.trigger("initerror"),
				s()
		}
	}),
		(g.prototype._initYoutube = function () {
			var i = this,
				r = e.YT
			i.$video
				.attr("src", i.$video.attr("src_to_load"))
				.removeAttr("src_to_load")
			var a = !!i.$video[0].parentNode
			if (!a) {
				var o = t("<div>")
					.css("display", "none !important")
					.appendTo(document.body)
				i.$video.appendTo(o)
			}
			var n = new r.Player(i.video, {
				events: {
					onReady: function () {
						i.__ytStartMuted && n.mute(),
							a ||
								(i.$video[0].parentNode === o[0] && i.$video.detach(),
								o.remove()),
							(i.ytReady = !0),
							i._updateYoutubeSize(),
							i.$video.trigger("canplay")
					},
					onStateChange: function (t) {
						switch (t.data) {
							case r.PlayerState.PLAYING:
								i.$video.trigger("playing")
								break
							case r.PlayerState.ENDED:
								i.$video.trigger("ended")
								break
							case r.PlayerState.PAUSED:
								i.$video.trigger("pause")
								break
							case r.PlayerState.BUFFERING:
								i.$video.trigger("waiting")
								break
							case r.PlayerState.CUED:
								i.$video.trigger("canplay")
						}
					},
					onPlaybackQualityChange: function () {
						i._updateYoutubeSize(), i.$video.trigger("resize")
					},
					onError: function (t) {
						;(i.hasError = !0), i.$video.trigger({ type: "error", error: t })
					},
				},
			})
			return (i.ytPlayer = n), i
		}),
		(g.prototype._updateYoutubeSize = function () {
			var t = this
			switch (t.ytPlayer.getPlaybackQuality() || "medium") {
				case "small":
					;(t.video.videoWidth = 426), (t.video.videoHeight = 240)
					break
				case "medium":
					;(t.video.videoWidth = 640), (t.video.videoHeight = 360)
					break
				default:
				case "large":
					;(t.video.videoWidth = 854), (t.video.videoHeight = 480)
					break
				case "hd720":
					;(t.video.videoWidth = 1280), (t.video.videoHeight = 720)
					break
				case "hd1080":
					;(t.video.videoWidth = 1920), (t.video.videoHeight = 1080)
					break
				case "highres":
					;(t.video.videoWidth = 2560), (t.video.videoHeight = 1440)
			}
			return t
		}),
		(g.prototype.play = function () {
			var t = this
			return (
				(t.__manuallyStopped = !1),
				"youtube" === t.type
					? t.ytReady && (t.$video.trigger("play"), t.ytPlayer.playVideo())
					: t.video.play(),
				t
			)
		}),
		(g.prototype.pause = function () {
			var t = this
			return (
				(t.__manuallyStopped = !1),
				"youtube" === t.type
					? t.ytReady && t.ytPlayer.pauseVideo()
					: t.video.pause(),
				t
			)
		}),
		(g.prototype.stop = function () {
			var t = this
			return (
				(t.__manuallyStopped = !0),
				"youtube" === t.type
					? t.ytReady && (t.ytPlayer.pauseVideo(), t.ytPlayer.seekTo(0))
					: (t.video.pause(), (t.video.currentTime = 0)),
				t
			)
		}),
		(g.prototype.destroy = function () {
			var t = this
			return t.ytPlayer && t.ytPlayer.destroy(), t.$video.remove(), t
		}),
		(g.prototype.getCurrentTime = function (t) {
			var e = this
			return "youtube" !== e.type
				? e.video.currentTime
				: e.ytReady
				? e.ytPlayer.getCurrentTime()
				: 0
		}),
		(g.prototype.setCurrentTime = function (t) {
			var e = this
			return (
				"youtube" === e.type
					? e.ytReady && e.ytPlayer.seekTo(t, !0)
					: (e.video.currentTime = t),
				e
			)
		}),
		(g.prototype.getDuration = function () {
			var t = this
			return "youtube" !== t.type
				? t.video.duration
				: t.ytReady
				? t.ytPlayer.getDuration()
				: 0
		}),
		(g.loadYoutubeAPI = function () {
			;(e.YT && e.__yt_load_event_interval__) ||
				(e.YT ||
					t("script[src*=www\\.youtube\\.com\\/iframe_api]").length ||
					t(
						'<script type="text/javascript" src="https://www.youtube.com/iframe_api">'
					).appendTo("body"),
				(e.__yt_load_event_interval__ = setInterval(function () {
					e.YT &&
						e.YT.loaded &&
						(t(e).trigger("youtube_api_load"),
						clearTimeout(e.__yt_load_event_interval__),
						delete e.__yt_load_event_interval__)
				}, 50)))
		})
	var y = function () {
			if ("matchMedia" in e) {
				if (e.matchMedia("(orientation: portrait)").matches) return "portrait"
				if (e.matchMedia("(orientation: landscape)").matches) return "landscape"
			}
			return screen.height > screen.width ? "portrait" : "landscape"
		},
		f = function () {
			return e.innerHeight > e.innerWidth
				? "portrait"
				: e.innerWidth > e.innerHeight
				? "landscape"
				: "square"
		},
		v = (function () {
			var t = navigator.userAgent,
				i = navigator.platform,
				r = t.match(/AppleWebKit\/([0-9]+)/),
				a = !!r && r[1],
				o = t.match(/Fennec\/([0-9]+)/),
				n = !!o && o[1],
				s = t.match(/Opera Mobi\/([0-9]+)/),
				h = !!s && s[1],
				c = t.match(/MSIE ([0-9]+)/),
				d = !!c && c[1]
			return !(
				((i.indexOf("iPhone") > -1 ||
					i.indexOf("iPad") > -1 ||
					i.indexOf("iPod") > -1) &&
					a &&
					a < 534) ||
				(e.operamini &&
					"[object OperaMini]" === {}.toString.call(e.operamini)) ||
				(s && h < 7458) ||
				(t.indexOf("Android") > -1 && a && a < 533) ||
				(n && n < 6) ||
				("palmGetResource" in e && a && a < 534) ||
				(t.indexOf("MeeGo") > -1 && t.indexOf("NokiaBrowser/8.5.0") > -1) ||
				(d && d <= 6)
			)
		})()
})(jQuery, window)

/*! MY
 * Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
!(function (e) {
	"function" == typeof define && define.amd
		? define(["jquery"], e)
		: e(
				"object" == typeof exports
					? require("jquery")
					: window.jQuery || window.Zepto
		  )
})(function (e) {
	var t,
		i,
		n,
		o,
		r,
		a,
		s = "Close",
		l = "BeforeClose",
		c = "MarkupParse",
		d = "Open",
		u = "Change",
		p = "mfp",
		f = "." + p,
		m = "mfp-ready",
		g = "mfp-removing",
		v = "mfp-prevent-close",
		h = function () {},
		y = !!window.jQuery,
		C = e(window),
		w = function (e, i) {
			t.ev.on(p + e + f, i)
		},
		b = function (t, i, n, o) {
			var r = document.createElement("div")
			return (
				(r.className = "mfp-" + t),
				n && (r.innerHTML = n),
				o ? i && i.appendChild(r) : ((r = e(r)), i && r.appendTo(i)),
				r
			)
		},
		I = function (i, n) {
			t.ev.triggerHandler(p + i, n),
				t.st.callbacks &&
					((i = i.charAt(0).toLowerCase() + i.slice(1)),
					t.st.callbacks[i] &&
						t.st.callbacks[i].apply(t, e.isArray(n) ? n : [n]))
		},
		x = function (i) {
			return (
				(i === a && t.currTemplate.closeBtn) ||
					((t.currTemplate.closeBtn = e(
						t.st.closeMarkup.replace("%title%", t.st.tClose)
					)),
					(a = i)),
				t.currTemplate.closeBtn
			)
		},
		k = function () {
			e.magnificPopup.instance ||
				((t = new h()).init(), (e.magnificPopup.instance = t))
		}
	;(h.prototype = {
		constructor: h,
		init: function () {
			var i = navigator.appVersion
			;(t.isLowIE = t.isIE8 = document.all && !document.addEventListener),
				(t.isAndroid = /android/gi.test(i)),
				(t.isIOS = /iphone|ipad|ipod/gi.test(i)),
				(t.supportsTransition = (function () {
					var e = document.createElement("p").style,
						t = ["ms", "O", "Moz", "Webkit"]
					if (void 0 !== e.transition) return !0
					for (; t.length; ) if (t.pop() + "Transition" in e) return !0
					return !1
				})()),
				(t.probablyMobile =
					t.isAndroid ||
					t.isIOS ||
					/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
						navigator.userAgent
					)),
				(n = e(document)),
				(t.popupsCache = {})
		},
		open: function (i) {
			var o
			if (!1 === i.isObj) {
				;(t.items = i.items.toArray()), (t.index = 0)
				var a,
					s = i.items
				for (o = 0; o < s.length; o++)
					if (((a = s[o]).parsed && (a = a.el[0]), a === i.el[0])) {
						t.index = o
						break
					}
			} else
				(t.items = e.isArray(i.items) ? i.items : [i.items]),
					(t.index = i.index || 0)
			if (!t.isOpen) {
				;(t.types = []),
					(r = ""),
					i.mainEl && i.mainEl.length ? (t.ev = i.mainEl.eq(0)) : (t.ev = n),
					i.key
						? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}),
						  (t.currTemplate = t.popupsCache[i.key]))
						: (t.currTemplate = {}),
					(t.st = e.extend(!0, {}, e.magnificPopup.defaults, i)),
					(t.fixedContentPos =
						"auto" === t.st.fixedContentPos
							? !t.probablyMobile
							: t.st.fixedContentPos),
					t.st.modal &&
						((t.st.closeOnContentClick = !1),
						(t.st.closeOnBgClick = !1),
						(t.st.showCloseBtn = !1),
						(t.st.enableEscapeKey = !1)),
					t.bgOverlay ||
						((t.bgOverlay = b("bg").on("click" + f, function () {
							t.close()
						})),
						(t.wrap = b("wrap")
							.attr("tabindex", -1)
							.on("click" + f, function (e) {
								t._checkIfClose(e.target) && t.close()
							})),
						(t.container = b("container", t.wrap))),
					(t.contentContainer = b("content")),
					t.st.preloader &&
						(t.preloader = b("preloader", t.container, t.st.tLoading))
				var l = e.magnificPopup.modules
				for (o = 0; o < l.length; o++) {
					var u = l[o]
					;(u = u.charAt(0).toUpperCase() + u.slice(1)), t["init" + u].call(t)
				}
				I("BeforeOpen"),
					t.st.showCloseBtn &&
						(t.st.closeBtnInside
							? (w(c, function (e, t, i, n) {
									i.close_replaceWith = x(n.type)
							  }),
							  (r += " mfp-close-btn-in"))
							: t.wrap.append(x())),
					t.st.alignTop && (r += " mfp-align-top"),
					t.fixedContentPos
						? t.wrap.css({
								overflow: t.st.overflowY,
								overflowX: "hidden",
								overflowY: t.st.overflowY,
						  })
						: t.wrap.css({ top: C.scrollTop(), position: "absolute" }),
					(!1 === t.st.fixedBgPos ||
						("auto" === t.st.fixedBgPos && !t.fixedContentPos)) &&
						t.bgOverlay.css({ height: n.height(), position: "absolute" }),
					t.st.enableEscapeKey &&
						n.on("keyup" + f, function (e) {
							27 === e.keyCode && t.close()
						}),
					C.on("resize" + f, function () {
						t.updateSize()
					}),
					t.st.closeOnContentClick || (r += " mfp-auto-cursor"),
					r && t.wrap.addClass(r)
				var p = (t.wH = C.height()),
					g = {}
				if (t.fixedContentPos && t._hasScrollBar(p)) {
					var v = t._getScrollbarSize()
					v && (g.marginRight = v)
				}
				t.fixedContentPos &&
					(t.isIE7
						? e("body, html").css("overflow", "hidden")
						: (g.overflow = "hidden"))
				var h = t.st.mainClass
				return (
					t.isIE7 && (h += " mfp-ie7"),
					h && t._addClassToMFP(h),
					t.updateItemHTML(),
					I("BuildControls"),
					e("html").css(g),
					t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
					(t._lastFocusedEl = document.activeElement),
					setTimeout(function () {
						t.content
							? (t._addClassToMFP(m), t._setFocus())
							: t.bgOverlay.addClass(m),
							n.on("focusin" + f, t._onFocusIn)
					}, 16),
					(t.isOpen = !0),
					t.updateSize(p),
					I(d),
					i
				)
			}
			t.updateItemHTML()
		},
		close: function () {
			t.isOpen &&
				(I(l),
				(t.isOpen = !1),
				t.st.removalDelay && !t.isLowIE && t.supportsTransition
					? (t._addClassToMFP(g),
					  setTimeout(function () {
							t._close()
					  }, t.st.removalDelay))
					: t._close())
		},
		_close: function () {
			I(s)
			var i = g + " " + m + " "
			if (
				(t.bgOverlay.detach(),
				t.wrap.detach(),
				t.container.empty(),
				t.st.mainClass && (i += t.st.mainClass + " "),
				t._removeClassFromMFP(i),
				t.fixedContentPos)
			) {
				var o = { marginRight: "" }
				t.isIE7 ? e("body, html").css("overflow", "") : (o.overflow = ""),
					e("html").css(o)
			}
			n.off("keyup.mfp focusin" + f),
				t.ev.off(f),
				t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
				t.bgOverlay.attr("class", "mfp-bg"),
				t.container.attr("class", "mfp-container"),
				!t.st.showCloseBtn ||
					(t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type]) ||
					(t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach()),
				t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
				(t.currItem = null),
				(t.content = null),
				(t.currTemplate = null),
				(t.prevHeight = 0),
				I("AfterClose")
		},
		updateSize: function (e) {
			if (t.isIOS) {
				var i = document.documentElement.clientWidth / window.innerWidth,
					n = window.innerHeight * i
				t.wrap.css("height", n), (t.wH = n)
			} else t.wH = e || C.height()
			t.fixedContentPos || t.wrap.css("height", t.wH), I("Resize")
		},
		updateItemHTML: function () {
			var i = t.items[t.index]
			t.contentContainer.detach(),
				t.content && t.content.detach(),
				i.parsed || (i = t.parseEl(t.index))
			var n = i.type
			if (
				(I("BeforeChange", [t.currItem ? t.currItem.type : "", n]),
				(t.currItem = i),
				!t.currTemplate[n])
			) {
				var r = !!t.st[n] && t.st[n].markup
				I("FirstMarkupParse", r), (t.currTemplate[n] = !r || e(r))
			}
			o && o !== i.type && t.container.removeClass("mfp-" + o + "-holder")
			var a = t["get" + n.charAt(0).toUpperCase() + n.slice(1)](
				i,
				t.currTemplate[n]
			)
			t.appendContent(a, n),
				(i.preloaded = !0),
				I(u, i),
				(o = i.type),
				t.container.prepend(t.contentContainer),
				I("AfterChange")
		},
		appendContent: function (e, i) {
			;(t.content = e),
				e
					? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[i]
						? t.content.find(".mfp-close").length || t.content.append(x())
						: (t.content = e)
					: (t.content = ""),
				I("BeforeAppend"),
				t.container.addClass("mfp-" + i + "-holder"),
				t.contentContainer.append(t.content)
		},
		parseEl: function (i) {
			var n,
				o = t.items[i]
			if (
				(o.tagName
					? (o = { el: e(o) })
					: ((n = o.type), (o = { data: o, src: o.src })),
				o.el)
			) {
				for (var r = t.types, a = 0; a < r.length; a++)
					if (o.el.hasClass("mfp-" + r[a])) {
						n = r[a]
						break
					}
				;(o.src = o.el.attr("data-mfp-src")),
					o.src || (o.src = o.el.attr("href"))
			}
			return (
				(o.type = n || t.st.type || "inline"),
				(o.index = i),
				(o.parsed = !0),
				(t.items[i] = o),
				I("ElementParse", o),
				t.items[i]
			)
		},
		addGroup: function (e, i) {
			var n = function (n) {
				;(n.mfpEl = this), t._openClick(n, e, i)
			}
			i || (i = {})
			var o = "click.magnificPopup"
			;(i.mainEl = e),
				i.items
					? ((i.isObj = !0), e.off(o).on(o, n))
					: ((i.isObj = !1),
					  i.delegate
							? e.off(o).on(o, i.delegate, n)
							: ((i.items = e), e.off(o).on(o, n)))
		},
		_openClick: function (i, n, o) {
			if (
				(void 0 !== o.midClick
					? o.midClick
					: e.magnificPopup.defaults.midClick) ||
				!(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)
			) {
				var r =
					void 0 !== o.disableOn
						? o.disableOn
						: e.magnificPopup.defaults.disableOn
				if (r)
					if (e.isFunction(r)) {
						if (!r.call(t)) return !0
					} else if (C.width() < r) return !0
				i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()),
					(o.el = e(i.mfpEl)),
					o.delegate && (o.items = n.find(o.delegate)),
					t.open(o)
			}
		},
		updateStatus: function (e, n) {
			if (t.preloader) {
				i !== e && t.container.removeClass("mfp-s-" + i),
					n || "loading" !== e || (n = t.st.tLoading)
				var o = { status: e, text: n }
				I("UpdateStatus", o),
					(e = o.status),
					(n = o.text),
					t.preloader.html(n),
					t.preloader.find("a").on("click", function (e) {
						e.stopImmediatePropagation()
					}),
					t.container.addClass("mfp-s-" + e),
					(i = e)
			}
		},
		_checkIfClose: function (i) {
			if (!e(i).hasClass(v)) {
				var n = t.st.closeOnContentClick,
					o = t.st.closeOnBgClick
				if (n && o) return !0
				if (
					!t.content ||
					e(i).hasClass("mfp-close") ||
					(t.preloader && i === t.preloader[0])
				)
					return !0
				if (i === t.content[0] || e.contains(t.content[0], i)) {
					if (n) return !0
				} else if (o && e.contains(document, i)) return !0
				return !1
			}
		},
		_addClassToMFP: function (e) {
			t.bgOverlay.addClass(e), t.wrap.addClass(e)
		},
		_removeClassFromMFP: function (e) {
			this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
		},
		_hasScrollBar: function (e) {
			return (
				(t.isIE7 ? n.height() : document.body.scrollHeight) > (e || C.height())
			)
		},
		_setFocus: function () {
			;(t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
		},
		_onFocusIn: function (i) {
			return i.target === t.wrap[0] || e.contains(t.wrap[0], i.target)
				? void 0
				: (t._setFocus(), !1)
		},
		_parseMarkup: function (t, i, n) {
			var o
			n.data && (i = e.extend(n.data, i)),
				I(c, [t, i, n]),
				e.each(i, function (i, n) {
					if (void 0 === n || !1 === n) return !0
					if ((o = i.split("_")).length > 1) {
						var r = t.find(f + "-" + o[0])
						if (r.length > 0) {
							var a = o[1]
							"replaceWith" === a
								? r[0] !== n[0] && r.replaceWith(n)
								: "img" === a
								? r.is("img")
									? r.attr("src", n)
									: r.replaceWith(
											e("<img>").attr("src", n).attr("class", r.attr("class"))
									  )
								: r.attr(o[1], n)
						}
					} else t.find(f + "-" + i).html(n)
				})
		},
		_getScrollbarSize: function () {
			if (void 0 === t.scrollbarSize) {
				var e = document.createElement("div")
				;(e.style.cssText =
					"width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
					document.body.appendChild(e),
					(t.scrollbarSize = e.offsetWidth - e.clientWidth),
					document.body.removeChild(e)
			}
			return t.scrollbarSize
		},
	}),
		(e.magnificPopup = {
			instance: null,
			proto: h.prototype,
			modules: [],
			open: function (t, i) {
				return (
					k(),
					((t = t ? e.extend(!0, {}, t) : {}).isObj = !0),
					(t.index = i || 0),
					this.instance.open(t)
				)
			},
			close: function () {
				return e.magnificPopup.instance && e.magnificPopup.instance.close()
			},
			registerModule: function (t, i) {
				i.options && (e.magnificPopup.defaults[t] = i.options),
					e.extend(this.proto, i.proto),
					this.modules.push(t)
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
				closeMarkup:
					'<button title="%title%" type="button" class="mfp-close">&#215;</button>',
				tClose: "Close (Esc)",
				tLoading: "Loading...",
				autoFocusLast: !0,
			},
		}),
		(e.fn.magnificPopup = function (i) {
			k()
			var n = e(this)
			if ("string" == typeof i)
				if ("open" === i) {
					var o,
						r = y ? n.data("magnificPopup") : n[0].magnificPopup,
						a = parseInt(arguments[1], 10) || 0
					r.items
						? (o = r.items[a])
						: ((o = n), r.delegate && (o = o.find(r.delegate)), (o = o.eq(a))),
						t._openClick({ mfpEl: o }, n, r)
				} else
					t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1))
			else
				(i = e.extend(!0, {}, i)),
					y ? n.data("magnificPopup", i) : (n[0].magnificPopup = i),
					t.addGroup(n, i)
			return n
		})
	var T,
		_,
		P,
		S = "inline",
		E = function () {
			P && (_.after(P.addClass(T)).detach(), (P = null))
		}
	e.magnificPopup.registerModule(S, {
		options: {
			hiddenClass: "hide",
			markup: "",
			tNotFound: "Content not found",
		},
		proto: {
			initInline: function () {
				t.types.push(S),
					w(s + "." + S, function () {
						E()
					})
			},
			getInline: function (i, n) {
				if ((E(), i.src)) {
					var o = t.st.inline,
						r = e(i.src)
					if (r.length) {
						var a = r[0].parentNode
						a &&
							a.tagName &&
							(_ || ((T = o.hiddenClass), (_ = b(T)), (T = "mfp-" + T)),
							(P = r.after(_).detach().removeClass(T))),
							t.updateStatus("ready")
					} else t.updateStatus("error", o.tNotFound), (r = e("<div>"))
					return (i.inlineElement = r), r
				}
				return t.updateStatus("ready"), t._parseMarkup(n, {}, i), n
			},
		},
	})
	var z,
		O = "ajax",
		M = function () {
			z && e(document.body).removeClass(z)
		},
		B = function () {
			M(), t.req && t.req.abort()
		}
	e.magnificPopup.registerModule(O, {
		options: {
			settings: null,
			cursor: "mfp-ajax-cur",
			tError: '<a href="%url%">The content</a> could not be loaded.',
		},
		proto: {
			initAjax: function () {
				t.types.push(O),
					(z = t.st.ajax.cursor),
					w(s + "." + O, B),
					w("BeforeChange." + O, B)
			},
			getAjax: function (i) {
				z && e(document.body).addClass(z), t.updateStatus("loading")
				var n = e.extend(
					{
						url: i.src,
						success: function (n, o, r) {
							var a = { data: n, xhr: r }
							I("ParseAjax", a),
								t.appendContent(e(a.data), O),
								(i.finished = !0),
								M(),
								t._setFocus(),
								setTimeout(function () {
									t.wrap.addClass(m)
								}, 16),
								t.updateStatus("ready"),
								I("AjaxContentAdded")
						},
						error: function () {
							M(),
								(i.finished = i.loadError = !0),
								t.updateStatus(
									"error",
									t.st.ajax.tError.replace("%url%", i.src)
								)
						},
					},
					t.st.ajax.settings
				)
				return (t.req = e.ajax(n)), ""
			},
		},
	})
	var L,
		H = function (i) {
			if (i.data && void 0 !== i.data.title) return i.data.title
			var n = t.st.image.titleSrc
			if (n) {
				if (e.isFunction(n)) return n.call(t, i)
				if (i.el) return i.el.attr(n) || ""
			}
			return ""
		}
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
				var i = t.st.image,
					n = ".image"
				t.types.push("image"),
					w(d + n, function () {
						"image" === t.currItem.type &&
							i.cursor &&
							e(document.body).addClass(i.cursor)
					}),
					w(s + n, function () {
						i.cursor && e(document.body).removeClass(i.cursor),
							C.off("resize" + f)
					}),
					w("Resize" + n, t.resizeImage),
					t.isLowIE && w("AfterChange", t.resizeImage)
			},
			resizeImage: function () {
				var e = t.currItem
				if (e && e.img && t.st.image.verticalFit) {
					var i = 0
					t.isLowIE &&
						(i =
							parseInt(e.img.css("padding-top"), 10) +
							parseInt(e.img.css("padding-bottom"), 10)),
						e.img.css("max-height", t.wH - i)
				}
			},
			_onImageHasSize: function (e) {
				e.img &&
					((e.hasSize = !0),
					L && clearInterval(L),
					(e.isCheckingImgSize = !1),
					I("ImageHasSize", e),
					e.imgHidden &&
						(t.content && t.content.removeClass("mfp-loading"),
						(e.imgHidden = !1)))
			},
			findImageSize: function (e) {
				var i = 0,
					n = e.img[0],
					o = function (r) {
						L && clearInterval(L),
							(L = setInterval(function () {
								return n.naturalWidth > 0
									? void t._onImageHasSize(e)
									: (i > 200 && clearInterval(L),
									  void (3 === ++i
											? o(10)
											: 40 === i
											? o(50)
											: 100 === i && o(500)))
							}, r))
					}
				o(1)
			},
			getImage: function (i, n) {
				var o = 0,
					r = function () {
						i &&
							(i.img[0].complete
								? (i.img.off(".mfploader"),
								  i === t.currItem &&
										(t._onImageHasSize(i), t.updateStatus("ready")),
								  (i.hasSize = !0),
								  (i.loaded = !0),
								  I("ImageLoadComplete"))
								: 200 > ++o
								? setTimeout(r, 100)
								: a())
					},
					a = function () {
						i &&
							(i.img.off(".mfploader"),
							i === t.currItem &&
								(t._onImageHasSize(i),
								t.updateStatus("error", s.tError.replace("%url%", i.src))),
							(i.hasSize = !0),
							(i.loaded = !0),
							(i.loadError = !0))
					},
					s = t.st.image,
					l = n.find(".mfp-img")
				if (l.length) {
					var c = document.createElement("img")
					;(c.className = "mfp-img"),
						i.el &&
							i.el.find("img").length &&
							(c.alt = i.el.find("img").attr("alt")),
						(i.img = e(c).on("load.mfploader", r).on("error.mfploader", a)),
						(c.src = i.src),
						l.is("img") && (i.img = i.img.clone()),
						(c = i.img[0]).naturalWidth > 0
							? (i.hasSize = !0)
							: c.width || (i.hasSize = !1)
				}
				return (
					t._parseMarkup(n, { title: H(i), img_replaceWith: i.img }, i),
					t.resizeImage(),
					i.hasSize
						? (L && clearInterval(L),
						  i.loadError
								? (n.addClass("mfp-loading"),
								  t.updateStatus("error", s.tError.replace("%url%", i.src)))
								: (n.removeClass("mfp-loading"), t.updateStatus("ready")),
						  n)
						: (t.updateStatus("loading"),
						  (i.loading = !0),
						  i.hasSize ||
								((i.imgHidden = !0),
								n.addClass("mfp-loading"),
								t.findImageSize(i)),
						  n)
				)
			},
		},
	})
	var A
	e.magnificPopup.registerModule("zoom", {
		options: {
			enabled: !1,
			easing: "ease-in-out",
			duration: 300,
			opener: function (e) {
				return e.is("img") ? e : e.find("img")
			},
		},
		proto: {
			initZoom: function () {
				var e,
					i = t.st.zoom,
					n = ".zoom"
				if (i.enabled && t.supportsTransition) {
					var o,
						r,
						a = i.duration,
						c = function (e) {
							var t = e
									.clone()
									.removeAttr("style")
									.removeAttr("class")
									.addClass("mfp-animated-image"),
								n = "all " + i.duration / 1e3 + "s " + i.easing,
								o = {
									position: "fixed",
									zIndex: 9999,
									left: 0,
									top: 0,
									"-webkit-backface-visibility": "hidden",
								},
								r = "transition"
							return (
								(o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = n),
								t.css(o),
								t
							)
						},
						d = function () {
							t.content.css("visibility", "visible")
						}
					w("BuildControls" + n, function () {
						if (t._allowZoom()) {
							if (
								(clearTimeout(o),
								t.content.css("visibility", "hidden"),
								!(e = t._getItemToZoom()))
							)
								return void d()
							;(r = c(e)).css(t._getOffset()),
								t.wrap.append(r),
								(o = setTimeout(function () {
									r.css(t._getOffset(!0)),
										(o = setTimeout(function () {
											d(),
												setTimeout(function () {
													r.remove(), (e = r = null), I("ZoomAnimationEnded")
												}, 16)
										}, a))
								}, 16))
						}
					}),
						w(l + n, function () {
							if (t._allowZoom()) {
								if ((clearTimeout(o), (t.st.removalDelay = a), !e)) {
									if (!(e = t._getItemToZoom())) return
									r = c(e)
								}
								r.css(t._getOffset(!0)),
									t.wrap.append(r),
									t.content.css("visibility", "hidden"),
									setTimeout(function () {
										r.css(t._getOffset())
									}, 16)
							}
						}),
						w(s + n, function () {
							t._allowZoom() && (d(), r && r.remove(), (e = null))
						})
				}
			},
			_allowZoom: function () {
				return "image" === t.currItem.type
			},
			_getItemToZoom: function () {
				return !!t.currItem.hasSize && t.currItem.img
			},
			_getOffset: function (i) {
				var n,
					o = (n = i
						? t.currItem.img
						: t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
					r = parseInt(n.css("padding-top"), 10),
					a = parseInt(n.css("padding-bottom"), 10)
				o.top -= e(window).scrollTop() - r
				var s = {
					width: n.width(),
					height: (y ? n.innerHeight() : n[0].offsetHeight) - a - r,
				}
				return (
					void 0 === A &&
						(A = void 0 !== document.createElement("p").style.MozTransform),
					A
						? (s["-moz-transform"] = s.transform =
								"translate(" + o.left + "px," + o.top + "px)")
						: ((s.left = o.left), (s.top = o.top)),
					s
				)
			},
		},
	})
	var F = "iframe",
		j = function (e) {
			if (t.currTemplate[F]) {
				var i = t.currTemplate[F].find("iframe")
				i.length &&
					(e || (i[0].src = "//about:blank"),
					t.isIE8 && i.css("display", e ? "block" : "none"))
			}
		}
	e.magnificPopup.registerModule(F, {
		options: {
			markup:
				'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
			srcAction: "iframe_src",
			patterns: {
				youtube: {
					index: "youtube.com",
					id: "v=",
					src: "//www.youtube.com/embed/%id%?autoplay=1",
				},
				vimeo: {
					index: "vimeo.com/",
					id: "/",
					src: "//player.vimeo.com/video/%id%?autoplay=1",
				},
				gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
			},
		},
		proto: {
			initIframe: function () {
				t.types.push(F),
					w("BeforeChange", function (e, t, i) {
						t !== i && (t === F ? j() : i === F && j(!0))
					}),
					w(s + "." + F, function () {
						j()
					})
			},
			getIframe: function (i, n) {
				var o = i.src,
					r = t.st.iframe
				e.each(r.patterns, function () {
					return o.indexOf(this.index) > -1
						? (this.id &&
								(o =
									"string" == typeof this.id
										? o.substr(
												o.lastIndexOf(this.id) + this.id.length,
												o.length
										  )
										: this.id.call(this, o)),
						  (o = this.src.replace("%id%", o)),
						  !1)
						: void 0
				})
				var a = {}
				return (
					r.srcAction && (a[r.srcAction] = o),
					t._parseMarkup(n, a, i),
					t.updateStatus("ready"),
					n
				)
			},
		},
	})
	var N = function (e) {
			var i = t.items.length
			return e > i - 1 ? e - i : 0 > e ? i + e : e
		},
		W = function (e, t, i) {
			return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
		}
	e.magnificPopup.registerModule("gallery", {
		options: {
			enabled: !1,
			arrowMarkup:
				'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
			preload: [0, 2],
			navigateByImgClick: !0,
			arrows: !0,
			tPrev: "Previous (Left arrow key)",
			tNext: "Next (Right arrow key)",
			tCounter: "%curr% of %total%",
		},
		proto: {
			initGallery: function () {
				var i = t.st.gallery,
					o = ".mfp-gallery"
				return (
					(t.direction = !0),
					!(!i || !i.enabled) &&
						((r += " mfp-gallery"),
						w(d + o, function () {
							i.navigateByImgClick &&
								t.wrap.on("click" + o, ".mfp-img", function () {
									return t.items.length > 1 ? (t.next(), !1) : void 0
								}),
								n.on("keydown" + o, function (e) {
									37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
								})
						}),
						w("UpdateStatus" + o, function (e, i) {
							i.text && (i.text = W(i.text, t.currItem.index, t.items.length))
						}),
						w(c + o, function (e, n, o, r) {
							var a = t.items.length
							o.counter = a > 1 ? W(i.tCounter, r.index, a) : ""
						}),
						w("BuildControls" + o, function () {
							if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
								var n = i.arrowMarkup,
									o = (t.arrowLeft = e(
										n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")
									).addClass(v)),
									r = (t.arrowRight = e(
										n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")
									).addClass(v))
								o.click(function () {
									t.prev()
								}),
									r.click(function () {
										t.next()
									}),
									t.container.append(o.add(r))
							}
						}),
						w(u + o, function () {
							t._preloadTimeout && clearTimeout(t._preloadTimeout),
								(t._preloadTimeout = setTimeout(function () {
									t.preloadNearbyImages(), (t._preloadTimeout = null)
								}, 16))
						}),
						void w(s + o, function () {
							n.off(o),
								t.wrap.off("click" + o),
								(t.arrowRight = t.arrowLeft = null)
						}))
				)
			},
			next: function () {
				;(t.direction = !0), (t.index = N(t.index + 1)), t.updateItemHTML()
			},
			prev: function () {
				;(t.direction = !1), (t.index = N(t.index - 1)), t.updateItemHTML()
			},
			goTo: function (e) {
				;(t.direction = e >= t.index), (t.index = e), t.updateItemHTML()
			},
			preloadNearbyImages: function () {
				var e,
					i = t.st.gallery.preload,
					n = Math.min(i[0], t.items.length),
					o = Math.min(i[1], t.items.length)
				for (e = 1; e <= (t.direction ? o : n); e++) t._preloadItem(t.index + e)
				for (e = 1; e <= (t.direction ? n : o); e++) t._preloadItem(t.index - e)
			},
			_preloadItem: function (i) {
				if (((i = N(i)), !t.items[i].preloaded)) {
					var n = t.items[i]
					n.parsed || (n = t.parseEl(i)),
						I("LazyLoad", n),
						"image" === n.type &&
							(n.img = e('<img class="mfp-img" />')
								.on("load.mfploader", function () {
									n.hasSize = !0
								})
								.on("error.mfploader", function () {
									;(n.hasSize = !0), (n.loadError = !0), I("LazyLoadError", n)
								})
								.attr("src", n.src)),
						(n.preloaded = !0)
				}
			},
		},
	})
	var Z = "retina"
	e.magnificPopup.registerModule(Z, {
		options: {
			replaceSrc: function (e) {
				return e.src.replace(/\.\w+$/, function (e) {
					return "@2x" + e
				})
			},
			ratio: 1,
		},
		proto: {
			initRetina: function () {
				if (window.devicePixelRatio > 1) {
					var e = t.st.retina,
						i = e.ratio
					;(i = isNaN(i) ? i() : i) > 1 &&
						(w("ImageHasSize." + Z, function (e, t) {
							t.img.css({
								"max-width": t.img[0].naturalWidth / i,
								width: "100%",
							})
						}),
						w("ElementParse." + Z, function (t, n) {
							n.src = e.replaceSrc(n, i)
						}))
				}
			},
		},
	}),
		k()
})

/*! MY
js\MyAllScript\jquery.stellar-min.js
*/
// !function(t,e,i,s){var o={scrollProperty:"scroll",positionProperty:"position",horizontalScrolling:!0,verticalScrolling:!0,horizontalOffset:0,verticalOffset:0,responsive:!1,parallaxBackgrounds:!0,parallaxElements:!0,hideDistantElements:!0,hideElement:function(t){t.hide()},showElement:function(t){t.show()}},n={scroll:{getLeft:function(t){return t.scrollLeft()},setLeft:function(t,e){t.scrollLeft(e)},getTop:function(t){return t.scrollTop()},setTop:function(t,e){t.scrollTop(e)}},position:{getLeft:function(t){return-1*parseInt(t.css("left"),10)},getTop:function(t){return-1*parseInt(t.css("top"),10)}},margin:{getLeft:function(t){return-1*parseInt(t.css("margin-left"),10)},getTop:function(t){return-1*parseInt(t.css("margin-top"),10)}},transform:{getLeft:function(t){var e=getComputedStyle(t[0])[a];return"none"!==e?-1*parseInt(e.match(/(-?[0-9]+)/g)[4],10):0},getTop:function(t){var e=getComputedStyle(t[0])[a];return"none"!==e?-1*parseInt(e.match(/(-?[0-9]+)/g)[5],10):0}}},r={position:{setLeft:function(t,e){t.css("left",e)},setTop:function(t,e){t.css("top",e)}},transform:{setPosition:function(t,e,i,s,o){t[0].style[a]="translate3d("+(e-i)+"px, "+(s-o)+"px, 0)"}}},a=function(){var e,i=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,s=t("script")[0].style,o="";for(e in s)if(i.test(e)){o=e.match(i)[0];break}return"WebkitOpacity"in s&&(o="Webkit"),"KhtmlOpacity"in s&&(o="Khtml"),function(t){return o+(o.length>0?t.charAt(0).toUpperCase()+t.slice(1):t)}}()("transform"),l=t("<div />",{style:"background:#fff"}).css("background-position-x")!==s,f=l?function(t,e,i){t.css({"background-position-x":e,"background-position-y":i})}:function(t,e,i){t.css("background-position",e+" "+i)},c=l?function(t){return[t.css("background-position-x"),t.css("background-position-y")]}:function(t){return t.css("background-position").split(" ")},h=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){setTimeout(t,1e3/60)};function p(e,i){this.element=e,this.options=t.extend({},o,i),this._defaults=o,this._name="stellar",this.init()}p.prototype={init:function(){this.options.name="stellar_"+Math.floor(1e9*Math.random()),this._defineElements(),this._defineGetters(),this._defineSetters(),this._handleWindowLoadAndResize(),this._detectViewport(),this.refresh({firstLoad:!0}),"scroll"===this.options.scrollProperty?this._handleScrollEvent():this._startAnimationLoop()},_defineElements:function(){this.element===i.body&&(this.element=e),this.$scrollElement=t(this.element),this.$element=this.element===e?t("body"):this.$scrollElement,this.$viewportElement=this.options.viewportElement!==s?t(this.options.viewportElement):this.$scrollElement[0]===e||"scroll"===this.options.scrollProperty?this.$scrollElement:this.$scrollElement.parent()},_defineGetters:function(){var t=this,e=n[t.options.scrollProperty];this._getScrollLeft=function(){return e.getLeft(t.$scrollElement)},this._getScrollTop=function(){return e.getTop(t.$scrollElement)}},_defineSetters:function(){var e=this,i=n[e.options.scrollProperty],s=r[e.options.positionProperty],o=i.setLeft,a=i.setTop;this._setScrollLeft="function"==typeof o?function(t){o(e.$scrollElement,t)}:t.noop,this._setScrollTop="function"==typeof a?function(t){a(e.$scrollElement,t)}:t.noop,this._setPosition=s.setPosition||function(t,i,o,n,r){e.options.horizontalScrolling&&s.setLeft(t,i,o),e.options.verticalScrolling&&s.setTop(t,n,r)}},_handleWindowLoadAndResize:function(){var i=this,s=t(e);i.options.responsive&&s.bind("load."+this.name,(function(){i.refresh()})),s.bind("resize."+this.name,(function(){i._detectViewport(),i.options.responsive&&i.refresh()}))},refresh:function(i){var s=this,o=s._getScrollLeft(),n=s._getScrollTop();i&&i.firstLoad||this._reset(),this._setScrollLeft(0),this._setScrollTop(0),this._setOffsets(),this._findParticles(),this._findBackgrounds(),i&&i.firstLoad&&/WebKit/.test(navigator.userAgent)&&t(e).load((function(){var t=s._getScrollLeft(),e=s._getScrollTop();s._setScrollLeft(t+1),s._setScrollTop(e+1),s._setScrollLeft(t),s._setScrollTop(e)})),this._setScrollLeft(o),this._setScrollTop(n)},_detectViewport:function(){var t=this.$viewportElement.offset(),e=null!==t&&t!==s;this.viewportWidth=this.$viewportElement.width(),this.viewportHeight=this.$viewportElement.height(),this.viewportOffsetTop=e?t.top:0,this.viewportOffsetLeft=e?t.left:0},_findParticles:function(){var e=this;if(this._getScrollLeft(),this._getScrollTop(),this.particles!==s)for(var i=this.particles.length-1;i>=0;i--)this.particles[i].$element.data("stellar-elementIsActive",s);this.particles=[],this.options.parallaxElements&&this.$element.find("[data-stellar-ratio]").each((function(i){var o,n,r,a,l,f,c,h,p,d=t(this),u=0,g=0,m=0,v=0;if(d.data("stellar-elementIsActive")){if(d.data("stellar-elementIsActive")!==this)return}else d.data("stellar-elementIsActive",this);e.options.showElement(d),d.data("stellar-startingLeft")?(d.css("left",d.data("stellar-startingLeft")),d.css("top",d.data("stellar-startingTop"))):(d.data("stellar-startingLeft",d.css("left")),d.data("stellar-startingTop",d.css("top"))),r=d.position().left,a=d.position().top,l="auto"===d.css("margin-left")?0:parseInt(d.css("margin-left"),10),f="auto"===d.css("margin-top")?0:parseInt(d.css("margin-top"),10),h=d.offset().left-l,p=d.offset().top-f,d.parents().each((function(){var e=t(this);if(!0===e.data("stellar-offset-parent"))return u=m,g=v,c=e,!1;m+=e.position().left,v+=e.position().top})),o=d.data("stellar-horizontal-offset")!==s?d.data("stellar-horizontal-offset"):c!==s&&c.data("stellar-horizontal-offset")!==s?c.data("stellar-horizontal-offset"):e.horizontalOffset,n=d.data("stellar-vertical-offset")!==s?d.data("stellar-vertical-offset"):c!==s&&c.data("stellar-vertical-offset")!==s?c.data("stellar-vertical-offset"):e.verticalOffset,e.particles.push({$element:d,$offsetParent:c,isFixed:"fixed"===d.css("position"),horizontalOffset:o,verticalOffset:n,startingPositionLeft:r,startingPositionTop:a,startingOffsetLeft:h,startingOffsetTop:p,parentOffsetLeft:u,parentOffsetTop:g,stellarRatio:d.data("stellar-ratio")!==s?d.data("stellar-ratio"):1,width:d.outerWidth(!0),height:d.outerHeight(!0),isHidden:!1})}))},_findBackgrounds:function(){var e,i=this,o=this._getScrollLeft(),n=this._getScrollTop();this.backgrounds=[],this.options.parallaxBackgrounds&&(e=this.$element.find("[data-stellar-background-ratio]"),this.$element.data("stellar-background-ratio")&&(e=e.add(this.$element)),e.each((function(){var e,r,a,l,h,p,d,u=t(this),g=c(u),m=0,v=0,L=0,_=0;if(u.data("stellar-backgroundIsActive")){if(u.data("stellar-backgroundIsActive")!==this)return}else u.data("stellar-backgroundIsActive",this);u.data("stellar-backgroundStartingLeft")?f(u,u.data("stellar-backgroundStartingLeft"),u.data("stellar-backgroundStartingTop")):(u.data("stellar-backgroundStartingLeft",g[0]),u.data("stellar-backgroundStartingTop",g[1])),a="auto"===u.css("margin-left")?0:parseInt(u.css("margin-left"),10),l="auto"===u.css("margin-top")?0:parseInt(u.css("margin-top"),10),h=u.offset().left-a-o,p=u.offset().top-l-n,u.parents().each((function(){var e=t(this);if(!0===e.data("stellar-offset-parent"))return m=L,v=_,d=e,!1;L+=e.position().left,_+=e.position().top})),e=u.data("stellar-horizontal-offset")!==s?u.data("stellar-horizontal-offset"):d!==s&&d.data("stellar-horizontal-offset")!==s?d.data("stellar-horizontal-offset"):i.horizontalOffset,r=u.data("stellar-vertical-offset")!==s?u.data("stellar-vertical-offset"):d!==s&&d.data("stellar-vertical-offset")!==s?d.data("stellar-vertical-offset"):i.verticalOffset,i.backgrounds.push({$element:u,$offsetParent:d,isFixed:"fixed"===u.css("background-attachment"),horizontalOffset:e,verticalOffset:r,startingValueLeft:g[0],startingValueTop:g[1],startingBackgroundPositionLeft:isNaN(parseInt(g[0],10))?0:parseInt(g[0],10),startingBackgroundPositionTop:isNaN(parseInt(g[1],10))?0:parseInt(g[1],10),startingPositionLeft:u.position().left,startingPositionTop:u.position().top,startingOffsetLeft:h,startingOffsetTop:p,parentOffsetLeft:m,parentOffsetTop:v,stellarRatio:u.data("stellar-background-ratio")===s?1:u.data("stellar-background-ratio")})})))},_reset:function(){var t,e,i,s,o;for(o=this.particles.length-1;o>=0;o--)e=(t=this.particles[o]).$element.data("stellar-startingLeft"),i=t.$element.data("stellar-startingTop"),this._setPosition(t.$element,e,e,i,i),this.options.showElement(t.$element),t.$element.data("stellar-startingLeft",null).data("stellar-elementIsActive",null).data("stellar-backgroundIsActive",null);for(o=this.backgrounds.length-1;o>=0;o--)(s=this.backgrounds[o]).$element.data("stellar-backgroundStartingLeft",null).data("stellar-backgroundStartingTop",null),f(s.$element,s.startingValueLeft,s.startingValueTop)},destroy:function(){this._reset(),this.$scrollElement.unbind("resize."+this.name).unbind("scroll."+this.name),this._animationLoop=t.noop,t(e).unbind("load."+this.name).unbind("resize."+this.name)},_setOffsets:function(){var i=this,s=t(e);s.unbind("resize.horizontal-"+this.name).unbind("resize.vertical-"+this.name),"function"==typeof this.options.horizontalOffset?(this.horizontalOffset=this.options.horizontalOffset(),s.bind("resize.horizontal-"+this.name,(function(){i.horizontalOffset=i.options.horizontalOffset()}))):this.horizontalOffset=this.options.horizontalOffset,"function"==typeof this.options.verticalOffset?(this.verticalOffset=this.options.verticalOffset(),s.bind("resize.vertical-"+this.name,(function(){i.verticalOffset=i.options.verticalOffset()}))):this.verticalOffset=this.options.verticalOffset},_repositionElements:function(){var t,e,i,s,o,n,r,a,l,c,h=this._getScrollLeft(),p=this._getScrollTop(),d=!0,u=!0;if(this.currentScrollLeft!==h||this.currentScrollTop!==p||this.currentWidth!==this.viewportWidth||this.currentHeight!==this.viewportHeight){for(this.currentScrollLeft=h,this.currentScrollTop=p,this.currentWidth=this.viewportWidth,this.currentHeight=this.viewportHeight,c=this.particles.length-1;c>=0;c--)e=(t=this.particles[c]).isFixed?1:0,this.options.horizontalScrolling?a=(n=(h+t.horizontalOffset+this.viewportOffsetLeft+t.startingPositionLeft-t.startingOffsetLeft+t.parentOffsetLeft)*-(t.stellarRatio+e-1)+t.startingPositionLeft)-t.startingPositionLeft+t.startingOffsetLeft:(n=t.startingPositionLeft,a=t.startingOffsetLeft),this.options.verticalScrolling?l=(r=(p+t.verticalOffset+this.viewportOffsetTop+t.startingPositionTop-t.startingOffsetTop+t.parentOffsetTop)*-(t.stellarRatio+e-1)+t.startingPositionTop)-t.startingPositionTop+t.startingOffsetTop:(r=t.startingPositionTop,l=t.startingOffsetTop),this.options.hideDistantElements&&(u=!this.options.horizontalScrolling||a+t.width>(t.isFixed?0:h)&&a<(t.isFixed?0:h)+this.viewportWidth+this.viewportOffsetLeft,d=!this.options.verticalScrolling||l+t.height>(t.isFixed?0:p)&&l<(t.isFixed?0:p)+this.viewportHeight+this.viewportOffsetTop),u&&d?(t.isHidden&&(this.options.showElement(t.$element),t.isHidden=!1),this._setPosition(t.$element,n,t.startingPositionLeft,r,t.startingPositionTop)):t.isHidden||(this.options.hideElement(t.$element),t.isHidden=!0);for(c=this.backgrounds.length-1;c>=0;c--)e=(i=this.backgrounds[c]).isFixed?0:1,s=this.options.horizontalScrolling?(h+i.horizontalOffset-this.viewportOffsetLeft-i.startingOffsetLeft+i.parentOffsetLeft-i.startingBackgroundPositionLeft)*(e-i.stellarRatio)+"px":i.startingValueLeft,o=this.options.verticalScrolling?(p+i.verticalOffset-this.viewportOffsetTop-i.startingOffsetTop+i.parentOffsetTop-i.startingBackgroundPositionTop)*(e-i.stellarRatio)+"px":i.startingValueTop,f(i.$element,s,o)}},_handleScrollEvent:function(){var t=this,e=!1,i=function(){t._repositionElements(),e=!1},s=function(){e||(h(i),e=!0)};this.$scrollElement.bind("scroll."+this.name,s),s()},_startAnimationLoop:function(){var t=this;this._animationLoop=function(){h(t._animationLoop),t._repositionElements()},this._animationLoop()}},t.fn.stellar=function(e){var i=arguments;return e===s||"object"==typeof e?this.each((function(){t.data(this,"plugin_stellar")||t.data(this,"plugin_stellar",new p(this,e))})):"string"==typeof e&&"_"!==e[0]&&"init"!==e?this.each((function(){var s=t.data(this,"plugin_stellar");s instanceof p&&"function"==typeof s[e]&&s[e].apply(s,Array.prototype.slice.call(i,1)),"destroy"===e&&t.data(this,"plugin_stellar",null)})):void 0},t.stellar=function(i){var s=t(e);return s.stellar.apply(s,Array.prototype.slice.call(arguments,0))},t.stellar.scrollProperty=n,t.stellar.positionProperty=r,e.Stellar=p}(jQuery,this,document);

/*! MY
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
Doc : http://imakewebthings.com/waypoints/guides/getting-started/
*/
!(function () {
	"use strict"
	var t = 0,
		e = {}
	function i(o) {
		if (!o) throw new Error("No options passed to Waypoint constructor")
		if (!o.element)
			throw new Error("No element option passed to Waypoint constructor")
		if (!o.handler)
			throw new Error("No handler option passed to Waypoint constructor")
		;(this.key = "waypoint-" + t),
			(this.options = i.Adapter.extend({}, i.defaults, o)),
			(this.element = this.options.element),
			(this.adapter = new i.Adapter(this.element)),
			(this.callback = o.handler),
			(this.axis = this.options.horizontal ? "horizontal" : "vertical"),
			(this.enabled = this.options.enabled),
			(this.triggerPoint = null),
			(this.group = i.Group.findOrCreate({
				name: this.options.group,
				axis: this.axis,
			})),
			(this.context = i.Context.findOrCreateByElement(this.options.context)),
			i.offsetAliases[this.options.offset] &&
				(this.options.offset = i.offsetAliases[this.options.offset]),
			this.group.add(this),
			this.context.add(this),
			(e[this.key] = this),
			(t += 1)
	}
	;(i.prototype.queueTrigger = function (t) {
		this.group.queueTrigger(this, t)
	}),
		(i.prototype.trigger = function (t) {
			this.enabled && this.callback && this.callback.apply(this, t)
		}),
		(i.prototype.destroy = function () {
			this.context.remove(this), this.group.remove(this), delete e[this.key]
		}),
		(i.prototype.disable = function () {
			return (this.enabled = !1), this
		}),
		(i.prototype.enable = function () {
			return this.context.refresh(), (this.enabled = !0), this
		}),
		(i.prototype.next = function () {
			return this.group.next(this)
		}),
		(i.prototype.previous = function () {
			return this.group.previous(this)
		}),
		(i.invokeAll = function (t) {
			var i = []
			for (var o in e) i.push(e[o])
			for (var n = 0, r = i.length; n < r; n++) i[n][t]()
		}),
		(i.destroyAll = function () {
			i.invokeAll("destroy")
		}),
		(i.disableAll = function () {
			i.invokeAll("disable")
		}),
		(i.enableAll = function () {
			for (var t in (i.Context.refreshAll(), e)) e[t].enabled = !0
			return this
		}),
		(i.refreshAll = function () {
			i.Context.refreshAll()
		}),
		(i.viewportHeight = function () {
			return window.innerHeight || document.documentElement.clientHeight
		}),
		(i.viewportWidth = function () {
			return document.documentElement.clientWidth
		}),
		(i.adapters = []),
		(i.defaults = {
			context: window,
			continuous: !0,
			enabled: !0,
			group: "default",
			horizontal: !1,
			offset: 0,
		}),
		(i.offsetAliases = {
			"bottom-in-view": function () {
				return this.context.innerHeight() - this.adapter.outerHeight()
			},
			"right-in-view": function () {
				return this.context.innerWidth() - this.adapter.outerWidth()
			},
		}),
		(window.Waypoint = i)
})(),
	(function () {
		"use strict"
		function t(t) {
			window.setTimeout(t, 1e3 / 60)
		}
		var e = 0,
			i = {},
			o = window.Waypoint,
			n = window.onload
		function r(t) {
			;(this.element = t),
				(this.Adapter = o.Adapter),
				(this.adapter = new this.Adapter(t)),
				(this.key = "waypoint-context-" + e),
				(this.didScroll = !1),
				(this.didResize = !1),
				(this.oldScroll = {
					x: this.adapter.scrollLeft(),
					y: this.adapter.scrollTop(),
				}),
				(this.waypoints = { vertical: {}, horizontal: {} }),
				(t.waypointContextKey = this.key),
				(i[t.waypointContextKey] = this),
				(e += 1),
				o.windowContext ||
					((o.windowContext = !0), (o.windowContext = new r(window))),
				this.createThrottledScrollHandler(),
				this.createThrottledResizeHandler()
		}
		;(r.prototype.add = function (t) {
			var e = t.options.horizontal ? "horizontal" : "vertical"
			;(this.waypoints[e][t.key] = t), this.refresh()
		}),
			(r.prototype.checkEmpty = function () {
				var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
					e = this.Adapter.isEmptyObject(this.waypoints.vertical),
					o = this.element == this.element.window
				t && e && !o && (this.adapter.off(".waypoints"), delete i[this.key])
			}),
			(r.prototype.createThrottledResizeHandler = function () {
				var t = this
				function e() {
					t.handleResize(), (t.didResize = !1)
				}
				this.adapter.on("resize.waypoints", function () {
					t.didResize || ((t.didResize = !0), o.requestAnimationFrame(e))
				})
			}),
			(r.prototype.createThrottledScrollHandler = function () {
				var t = this
				function e() {
					t.handleScroll(), (t.didScroll = !1)
				}
				this.adapter.on("scroll.waypoints", function () {
					;(t.didScroll && !o.isTouch) ||
						((t.didScroll = !0), o.requestAnimationFrame(e))
				})
			}),
			(r.prototype.handleResize = function () {
				o.Context.refreshAll()
			}),
			(r.prototype.handleScroll = function () {
				var t = {},
					e = {
						horizontal: {
							newScroll: this.adapter.scrollLeft(),
							oldScroll: this.oldScroll.x,
							forward: "right",
							backward: "left",
						},
						vertical: {
							newScroll: this.adapter.scrollTop(),
							oldScroll: this.oldScroll.y,
							forward: "down",
							backward: "up",
						},
					}
				for (var i in e) {
					var o = e[i],
						n = o.newScroll > o.oldScroll ? o.forward : o.backward
					for (var r in this.waypoints[i]) {
						var s = this.waypoints[i][r]
						if (null !== s.triggerPoint) {
							var a = o.oldScroll < s.triggerPoint,
								l = o.newScroll >= s.triggerPoint
							;((a && l) || (!a && !l)) &&
								(s.queueTrigger(n), (t[s.group.id] = s.group))
						}
					}
				}
				for (var h in t) t[h].flushTriggers()
				this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll }
			}),
			(r.prototype.innerHeight = function () {
				return this.element == this.element.window
					? o.viewportHeight()
					: this.adapter.innerHeight()
			}),
			(r.prototype.remove = function (t) {
				delete this.waypoints[t.axis][t.key], this.checkEmpty()
			}),
			(r.prototype.innerWidth = function () {
				return this.element == this.element.window
					? o.viewportWidth()
					: this.adapter.innerWidth()
			}),
			(r.prototype.destroy = function () {
				var t = []
				for (var e in this.waypoints)
					for (var i in this.waypoints[e]) t.push(this.waypoints[e][i])
				for (var o = 0, n = t.length; o < n; o++) t[o].destroy()
			}),
			(r.prototype.refresh = function () {
				var t,
					e = this.element == this.element.window,
					i = e ? void 0 : this.adapter.offset(),
					n = {}
				for (var r in (this.handleScroll(),
				(t = {
					horizontal: {
						contextOffset: e ? 0 : i.left,
						contextScroll: e ? 0 : this.oldScroll.x,
						contextDimension: this.innerWidth(),
						oldScroll: this.oldScroll.x,
						forward: "right",
						backward: "left",
						offsetProp: "left",
					},
					vertical: {
						contextOffset: e ? 0 : i.top,
						contextScroll: e ? 0 : this.oldScroll.y,
						contextDimension: this.innerHeight(),
						oldScroll: this.oldScroll.y,
						forward: "down",
						backward: "up",
						offsetProp: "top",
					},
				}))) {
					var s = t[r]
					for (var a in this.waypoints[r]) {
						var l,
							h,
							p,
							c,
							u = this.waypoints[r][a],
							d = u.options.offset,
							f = u.triggerPoint,
							w = 0,
							y = null == f
						u.element !== u.element.window &&
							(w = u.adapter.offset()[s.offsetProp]),
							"function" == typeof d
								? (d = d.apply(u))
								: "string" == typeof d &&
								  ((d = parseFloat(d)),
								  u.options.offset.indexOf("%") > -1 &&
										(d = Math.ceil((s.contextDimension * d) / 100))),
							(l = s.contextScroll - s.contextOffset),
							(u.triggerPoint = Math.floor(w + l - d)),
							(h = f < s.oldScroll),
							(p = u.triggerPoint >= s.oldScroll),
							(c = !h && !p),
							!y && h && p
								? (u.queueTrigger(s.backward), (n[u.group.id] = u.group))
								: ((!y && c) || (y && s.oldScroll >= u.triggerPoint)) &&
								  (u.queueTrigger(s.forward), (n[u.group.id] = u.group))
					}
				}
				return (
					o.requestAnimationFrame(function () {
						for (var t in n) n[t].flushTriggers()
					}),
					this
				)
			}),
			(r.findOrCreateByElement = function (t) {
				return r.findByElement(t) || new r(t)
			}),
			(r.refreshAll = function () {
				for (var t in i) i[t].refresh()
			}),
			(r.findByElement = function (t) {
				return i[t.waypointContextKey]
			}),
			(window.onload = function () {
				n && n(), r.refreshAll()
			}),
			(o.requestAnimationFrame = function (e) {
				;(
					window.requestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					t
				).call(window, e)
			}),
			(o.Context = r)
	})(),
	(function () {
		"use strict"
		function t(t, e) {
			return t.triggerPoint - e.triggerPoint
		}
		function e(t, e) {
			return e.triggerPoint - t.triggerPoint
		}
		var i = { vertical: {}, horizontal: {} },
			o = window.Waypoint
		function n(t) {
			;(this.name = t.name),
				(this.axis = t.axis),
				(this.id = this.name + "-" + this.axis),
				(this.waypoints = []),
				this.clearTriggerQueues(),
				(i[this.axis][this.name] = this)
		}
		;(n.prototype.add = function (t) {
			this.waypoints.push(t)
		}),
			(n.prototype.clearTriggerQueues = function () {
				this.triggerQueues = { up: [], down: [], left: [], right: [] }
			}),
			(n.prototype.flushTriggers = function () {
				for (var i in this.triggerQueues) {
					var o = this.triggerQueues[i],
						n = "up" === i || "left" === i
					o.sort(n ? e : t)
					for (var r = 0, s = o.length; r < s; r += 1) {
						var a = o[r]
						;(a.options.continuous || r === o.length - 1) && a.trigger([i])
					}
				}
				this.clearTriggerQueues()
			}),
			(n.prototype.next = function (e) {
				this.waypoints.sort(t)
				var i = o.Adapter.inArray(e, this.waypoints)
				return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1]
			}),
			(n.prototype.previous = function (e) {
				this.waypoints.sort(t)
				var i = o.Adapter.inArray(e, this.waypoints)
				return i ? this.waypoints[i - 1] : null
			}),
			(n.prototype.queueTrigger = function (t, e) {
				this.triggerQueues[e].push(t)
			}),
			(n.prototype.remove = function (t) {
				var e = o.Adapter.inArray(t, this.waypoints)
				e > -1 && this.waypoints.splice(e, 1)
			}),
			(n.prototype.first = function () {
				return this.waypoints[0]
			}),
			(n.prototype.last = function () {
				return this.waypoints[this.waypoints.length - 1]
			}),
			(n.findOrCreate = function (t) {
				return i[t.axis][t.name] || new n(t)
			}),
			(o.Group = n)
	})(),
	(function () {
		"use strict"
		var t = window.jQuery,
			e = window.Waypoint
		function i(e) {
			this.$element = t(e)
		}
		t.each(
			[
				"innerHeight",
				"innerWidth",
				"off",
				"offset",
				"on",
				"outerHeight",
				"outerWidth",
				"scrollLeft",
				"scrollTop",
			],
			function (t, e) {
				i.prototype[e] = function () {
					var t = Array.prototype.slice.call(arguments)
					return this.$element[e].apply(this.$element, t)
				}
			}
		),
			t.each(["extend", "inArray", "isEmptyObject"], function (e, o) {
				i[o] = t[o]
			}),
			e.adapters.push({ name: "jquery", Adapter: i }),
			(e.Adapter = i)
	})(),
	(function () {
		"use strict"
		var t = window.Waypoint
		function e(e) {
			return function () {
				var i = [],
					o = arguments[0]
				return (
					e.isFunction(arguments[0]) &&
						((o = e.extend({}, arguments[1])).handler = arguments[0]),
					this.each(function () {
						var n = e.extend({}, o, { element: this })
						"string" == typeof n.context &&
							(n.context = e(this).closest(n.context)[0]),
							i.push(new t(n))
					}),
					i
				)
			}
		}
		window.jQuery && (window.jQuery.fn.waypoint = e(window.jQuery)),
			window.Zepto && (window.Zepto.fn.waypoint = e(window.Zepto))
	})()

/*! MY
 * Retina.js v1.3.0
 *
 * Copyright 2014 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */
!(function () {
	var t = "undefined" == typeof exports ? window : exports,
		e = {
			retinaImageSuffix: "@2x",
			check_mime_type: !0,
			force_original_dimensions: !0,
		}
	function i() {}
	;(t.Retina = i),
		(i.configure = function (t) {
			for (var i in (null === t && (t = {}), t))
				t.hasOwnProperty(i) && (e[i] = t[i])
		}),
		(i.init = function (e) {
			null === e && (e = t)
			var i = e.onload || function () {}
			e.onload = function () {
				var t,
					e,
					n = document.getElementsByTagName("img"),
					a = []
				for (t = 0; t < n.length; t += 1)
					(e = n[t]).getAttributeNode("data-no-retina") || a.push(new h(e))
				i()
			}
		}),
		(i.isRetina = function () {
			return (
				t.devicePixelRatio > 1 ||
				!(
					!t.matchMedia ||
					!t.matchMedia(
						"(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)"
					).matches
				)
			)
		})
	var n = /\.\w+$/
	function a(t) {
		return e.retinaImageSuffix + t
	}
	function r(t, e) {
		if (((this.path = t || ""), null != e))
			(this.at_2x_path = e), (this.perform_check = !1)
		else {
			if (void 0 !== document.createElement) {
				var i = document.createElement("a")
				;(i.href = this.path),
					(i.pathname = i.pathname.replace(n, a)),
					(this.at_2x_path = i.href)
			} else {
				var r = this.path.split("?")
				;(r[0] = r[0].replace(n, a)), (this.at_2x_path = r.join("?"))
			}
			this.perform_check = !0
		}
	}
	function h(t) {
		;(this.el = t),
			(this.path = new r(
				this.el.getAttribute("src"),
				this.el.getAttribute("data-at2x")
			))
		var e = this
		this.path.check_2x_variant(function (t) {
			t && e.swap()
		})
	}
	;(t.RetinaImagePath = r),
		(r.confirmed_paths = []),
		(r.prototype.is_external = function () {
			return !(
				!this.path.match(/^https?\:/i) ||
				this.path.match("//" + document.domain)
			)
		}),
		(r.prototype.check_2x_variant = function (t) {
			var i,
				n = this
			return this.is_external()
				? t(!1)
				: this.perform_check ||
				  void 0 === this.at_2x_path ||
				  null === this.at_2x_path
				? this.at_2x_path in r.confirmed_paths
					? t(!0)
					: ((i = new XMLHttpRequest()).open("HEAD", this.at_2x_path),
					  (i.onreadystatechange = function () {
							if (4 !== i.readyState) return t(!1)
							if (i.status >= 200 && i.status <= 399) {
								if (e.check_mime_type) {
									var a = i.getResponseHeader("Content-Type")
									if (null === a || !a.match(/^image/i)) return t(!1)
								}
								return r.confirmed_paths.push(n.at_2x_path), t(!0)
							}
							return t(!1)
					  }),
					  void i.send())
				: t(!0)
		}),
		(t.RetinaImage = h),
		(h.prototype.swap = function (t) {
			void 0 === t && (t = this.path.at_2x_path)
			var i = this
			!(function n() {
				i.el.complete
					? (e.force_original_dimensions &&
							(i.el.setAttribute("width", i.el.offsetWidth),
							i.el.setAttribute("height", i.el.offsetHeight)),
					  i.el.setAttribute("src", t))
					: setTimeout(n, 5)
			})()
		}),
		i.isRetina() && i.init(t)
})()
/*! MY modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csstransitions-domprefixes-prefixed-setclasses-shiv-testallprops-testprop !*/
!(function (e, t, n) {
	function r(e) {
		var t = w.className,
			n = Modernizr._config.classPrefix || ""
		if ((_ && (t = t.baseVal), Modernizr._config.enableJSClass)) {
			var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)")
			t = t.replace(r, "$1" + n + "js$2")
		}
		Modernizr._config.enableClasses &&
			((t += " " + n + e.join(" " + n)),
			_ ? (w.className.baseVal = t) : (w.className = t))
	}
	function o(e, t) {
		return typeof e === t
	}
	function i() {
		var e, t, n, r, i, a, s
		for (var l in S)
			if (S.hasOwnProperty(l)) {
				if (
					((e = []),
					(t = S[l]),
					t.name &&
						(e.push(t.name.toLowerCase()),
						t.options && t.options.aliases && t.options.aliases.length))
				)
					for (n = 0; n < t.options.aliases.length; n++)
						e.push(t.options.aliases[n].toLowerCase())
				for (r = o(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++)
					(a = e[i]),
						(s = a.split(".")),
						1 === s.length
							? (Modernizr[s[0]] = r)
							: (!Modernizr[s[0]] ||
									Modernizr[s[0]] instanceof Boolean ||
									(Modernizr[s[0]] = new Boolean(Modernizr[s[0]])),
							  (Modernizr[s[0]][s[1]] = r)),
						C.push((r ? "" : "no-") + s.join("-"))
			}
	}
	function a(e) {
		return e
			.replace(/([a-z])-([a-z])/g, function (e, t, n) {
				return t + n.toUpperCase()
			})
			.replace(/^-/, "")
	}
	function s(e, t) {
		return !!~("" + e).indexOf(t)
	}
	function l() {
		return "function" != typeof t.createElement
			? t.createElement(arguments[0])
			: _
			? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0])
			: t.createElement.apply(t, arguments)
	}
	function u(t, n, r) {
		var o
		if ("getComputedStyle" in e) {
			o = getComputedStyle.call(e, t, n)
			var i = e.console
			if (null !== o) r && (o = o.getPropertyValue(r))
			else if (i) {
				var a = i.error ? "error" : "log"
				i[a].call(
					i,
					"getComputedStyle returning null, its possible modernizr test results are inaccurate"
				)
			}
		} else o = !n && t.currentStyle && t.currentStyle[r]
		return o
	}
	function c(e) {
		return e
			.replace(/([A-Z])/g, function (e, t) {
				return "-" + t.toLowerCase()
			})
			.replace(/^ms-/, "-ms-")
	}
	function f(e, t) {
		return function () {
			return e.apply(t, arguments)
		}
	}
	function d(e, t, n) {
		var r
		for (var i in e)
			if (e[i] in t)
				return n === !1
					? e[i]
					: ((r = t[e[i]]), o(r, "function") ? f(r, n || t) : r)
		return !1
	}
	function p() {
		var e = t.body
		return e || ((e = l(_ ? "svg" : "body")), (e.fake = !0)), e
	}
	function m(e, n, r, o) {
		var i,
			a,
			s,
			u,
			c = "modernizr",
			f = l("div"),
			d = p()
		if (parseInt(r, 10))
			for (; r--; )
				(s = l("div")), (s.id = o ? o[r] : c + (r + 1)), f.appendChild(s)
		return (
			(i = l("style")),
			(i.type = "text/css"),
			(i.id = "s" + c),
			(d.fake ? d : f).appendChild(i),
			d.appendChild(f),
			i.styleSheet
				? (i.styleSheet.cssText = e)
				: i.appendChild(t.createTextNode(e)),
			(f.id = c),
			d.fake &&
				((d.style.background = ""),
				(d.style.overflow = "hidden"),
				(u = w.style.overflow),
				(w.style.overflow = "hidden"),
				w.appendChild(d)),
			(a = n(f, e)),
			d.fake
				? (d.parentNode.removeChild(d), (w.style.overflow = u), w.offsetHeight)
				: f.parentNode.removeChild(f),
			!!a
		)
	}
	function h(t, r) {
		var o = t.length
		if ("CSS" in e && "supports" in e.CSS) {
			for (; o--; ) if (e.CSS.supports(c(t[o]), r)) return !0
			return !1
		}
		if ("CSSSupportsRule" in e) {
			for (var i = []; o--; ) i.push("(" + c(t[o]) + ":" + r + ")")
			return (
				(i = i.join(" or ")),
				m(
					"@supports (" + i + ") { #modernizr { position: absolute; } }",
					function (e) {
						return "absolute" == u(e, null, "position")
					}
				)
			)
		}
		return n
	}
	function g(e, t, r, i) {
		function u() {
			f && (delete P.style, delete P.modElem)
		}
		if (((i = o(i, "undefined") ? !1 : i), !o(r, "undefined"))) {
			var c = h(e, r)
			if (!o(c, "undefined")) return c
		}
		for (
			var f, d, p, m, g, v = ["modernizr", "tspan", "samp"];
			!P.style && v.length;

		)
			(f = !0), (P.modElem = l(v.shift())), (P.style = P.modElem.style)
		for (p = e.length, d = 0; p > d; d++)
			if (
				((m = e[d]),
				(g = P.style[m]),
				s(m, "-") && (m = a(m)),
				P.style[m] !== n)
			) {
				if (i || o(r, "undefined")) return u(), "pfx" == t ? m : !0
				try {
					P.style[m] = r
				} catch (y) {}
				if (P.style[m] != g) return u(), "pfx" == t ? m : !0
			}
		return u(), !1
	}
	function v(e, t, n, r, i) {
		var a = e.charAt(0).toUpperCase() + e.slice(1),
			s = (e + " " + N.join(a + " ") + a).split(" ")
		return o(t, "string") || o(t, "undefined")
			? g(s, t, r, i)
			: ((s = (e + " " + b.join(a + " ") + a).split(" ")), d(s, t, n))
	}
	function y(e, t, r) {
		return v(e, n, n, t, r)
	}
	var C = [],
		S = [],
		E = {
			_version: "3.6.0",
			_config: {
				classPrefix: "",
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0,
			},
			_q: [],
			on: function (e, t) {
				var n = this
				setTimeout(function () {
					t(n[e])
				}, 0)
			},
			addTest: function (e, t, n) {
				S.push({ name: e, fn: t, options: n })
			},
			addAsyncTest: function (e) {
				S.push({ name: null, fn: e })
			},
		},
		Modernizr = function () {}
	;(Modernizr.prototype = E), (Modernizr = new Modernizr())
	var x = "Moz O ms Webkit",
		b = E._config.usePrefixes ? x.toLowerCase().split(" ") : []
	E._domPrefixes = b
	var w = t.documentElement,
		_ = "svg" === w.nodeName.toLowerCase()
	_ ||
		!(function (e, t) {
			function n(e, t) {
				var n = e.createElement("p"),
					r = e.getElementsByTagName("head")[0] || e.documentElement
				return (
					(n.innerHTML = "x<style>" + t + "</style>"),
					r.insertBefore(n.lastChild, r.firstChild)
				)
			}
			function r() {
				var e = C.elements
				return "string" == typeof e ? e.split(" ") : e
			}
			function o(e, t) {
				var n = C.elements
				"string" != typeof n && (n = n.join(" ")),
					"string" != typeof e && (e = e.join(" ")),
					(C.elements = n + " " + e),
					u(t)
			}
			function i(e) {
				var t = y[e[g]]
				return t || ((t = {}), v++, (e[g] = v), (y[v] = t)), t
			}
			function a(e, n, r) {
				if ((n || (n = t), f)) return n.createElement(e)
				r || (r = i(n))
				var o
				return (
					(o = r.cache[e]
						? r.cache[e].cloneNode()
						: h.test(e)
						? (r.cache[e] = r.createElem(e)).cloneNode()
						: r.createElem(e)),
					!o.canHaveChildren || m.test(e) || o.tagUrn
						? o
						: r.frag.appendChild(o)
				)
			}
			function s(e, n) {
				if ((e || (e = t), f)) return e.createDocumentFragment()
				n = n || i(e)
				for (
					var o = n.frag.cloneNode(), a = 0, s = r(), l = s.length;
					l > a;
					a++
				)
					o.createElement(s[a])
				return o
			}
			function l(e, t) {
				t.cache ||
					((t.cache = {}),
					(t.createElem = e.createElement),
					(t.createFrag = e.createDocumentFragment),
					(t.frag = t.createFrag())),
					(e.createElement = function (n) {
						return C.shivMethods ? a(n, e, t) : t.createElem(n)
					}),
					(e.createDocumentFragment = Function(
						"h,f",
						"return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
							r()
								.join()
								.replace(/[\w\-:]+/g, function (e) {
									return (
										t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
									)
								}) +
							");return n}"
					)(C, t.frag))
			}
			function u(e) {
				e || (e = t)
				var r = i(e)
				return (
					!C.shivCSS ||
						c ||
						r.hasCSS ||
						(r.hasCSS = !!n(
							e,
							"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}"
						)),
					f || l(e, r),
					e
				)
			}
			var c,
				f,
				d = "3.7.3",
				p = e.html5 || {},
				m =
					/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
				h =
					/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
				g = "_html5shiv",
				v = 0,
				y = {}
			!(function () {
				try {
					var e = t.createElement("a")
					;(e.innerHTML = "<xyz></xyz>"),
						(c = "hidden" in e),
						(f =
							1 == e.childNodes.length ||
							(function () {
								t.createElement("a")
								var e = t.createDocumentFragment()
								return (
									"undefined" == typeof e.cloneNode ||
									"undefined" == typeof e.createDocumentFragment ||
									"undefined" == typeof e.createElement
								)
							})())
				} catch (n) {
					;(c = !0), (f = !0)
				}
			})()
			var C = {
				elements:
					p.elements ||
					"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
				version: d,
				shivCSS: p.shivCSS !== !1,
				supportsUnknownElements: f,
				shivMethods: p.shivMethods !== !1,
				type: "default",
				shivDocument: u,
				createElement: a,
				createDocumentFragment: s,
				addElements: o,
			}
			;(e.html5 = C),
				u(t),
				"object" == typeof module && module.exports && (module.exports = C)
		})("undefined" != typeof e ? e : this, t)
	var N = E._config.usePrefixes ? x.split(" ") : []
	E._cssomPrefixes = N
	var j = function (t) {
		var r,
			o = prefixes.length,
			i = e.CSSRule
		if ("undefined" == typeof i) return n
		if (!t) return !1
		if (
			((t = t.replace(/^@/, "")),
			(r = t.replace(/-/g, "_").toUpperCase() + "_RULE"),
			r in i)
		)
			return "@" + t
		for (var a = 0; o > a; a++) {
			var s = prefixes[a],
				l = s.toUpperCase() + "_" + r
			if (l in i) return "@-" + s.toLowerCase() + "-" + t
		}
		return !1
	}
	E.atRule = j
	var z = { elem: l("modernizr") }
	Modernizr._q.push(function () {
		delete z.elem
	})
	var P = { style: z.elem.style }
	Modernizr._q.unshift(function () {
		delete P.style
	})
	E.testProp = function (e, t, r) {
		return g([e], n, t, r)
	}
	E.testAllProps = v
	E.prefixed = function (e, t, n) {
		return 0 === e.indexOf("@")
			? j(e)
			: (-1 != e.indexOf("-") && (e = a(e)), t ? v(e, t, n) : v(e, "pfx"))
	}
	;(E.testAllProps = y),
		Modernizr.addTest("csstransitions", y("transition", "all", !0)),
		i(),
		r(C),
		delete E.addTest,
		delete E.addAsyncTest
	for (var k = 0; k < Modernizr._q.length; k++) Modernizr._q[k]()
	e.Modernizr = Modernizr
})(window, document)
/* MY borderMenu */
!(function () {
	function e() {
		if (classie.has(i, "open")) {
			classie.remove(i, "open"), classie.add(i, "close")
			var e = function (n) {
				if (support.transitions) {
					if ("visibility" !== n.propertyName) return
					this.removeEventListener(transEndEventName, e)
				}
				classie.remove(i, "close")
			}
			support.transitions ? i.addEventListener(transEndEventName, e) : e()
		} else classie.has(i, "close") || classie.add(i, "open")
	}

	var n = document.getElementById("trigger-overlay"),
		i = document.querySelector("div.overlay"),
		t = document.querySelector("div.overlay nav ul li:first-child"),
		r = document.querySelector("div.overlay nav ul li:nth-child(2)"),
		s = document.querySelector("div.overlay nav ul li:nth-child(3)"),
		a = document.querySelector("div.overlay nav ul li:nth-child(4)"),
		o = document.querySelector("div.overlay nav ul li:nth-child(5)"),
		d = document.querySelector("div.overlay nav ul li:nth-child(6)"),
		l = i.querySelector("a.overlay-close")
	;(transEndEventNames = {
		WebkitTransition: "webkitTransitionEnd",
		MozTransition: "transitionend",
		OTransition: "oTransitionEnd",
		msTransition: "MSTransitionEnd",
		transition: "transitionend",
	}),
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
})()

/* MY custom */
/* touch and wheel event listeners as passive */
jQuery.event.special.touchstart = {
	setup: function (_, ns, handle) {
		this.addEventListener("touchstart", handle, {
			passive: !ns.includes("noPreventDefault"),
		})
	},
}
jQuery.event.special.touchmove = {
	setup: function (_, ns, handle) {
		this.addEventListener("touchmove", handle, {
			passive: !ns.includes("noPreventDefault"),
		})
	},
}
jQuery.event.special.wheel = {
	setup: function (_, ns, handle) {
		this.addEventListener("wheel", handle, { passive: true })
	},
}
jQuery.event.special.mousewheel = {
	setup: function (_, ns, handle) {
		this.addEventListener("mousewheel", handle, { passive: true })
	},
}
/* 1.Intro Height  */

$(function () {
	function introHeight() {
		var wh = $(window).height()
		$("#accueil").css({ height: wh })
	}

	introHeight()

	$(window).on("resize", function () {
		//Update slider height on resize
		introHeight()
	})

	$("#charts").waypoint(
		function () {
			"use strict"
			// first timer
			$(".timer1").countTo({
				from: 0, // the number you want to start
				to: 125, // the number you want to reach
				speed: 125,
				refreshInterval: 1,
			})

			// second timer
			$(".timer2").countTo({
				from: 0, // the number you want to start
				to: 71, // the number you want to reach
				speed: 250,
				refreshInterval: 1,
			})

			// third timer
			$(".timer3").countTo({
				from: 0, // the number you want to start
				to: 212, // the number you want to reach
				speed: 100,
				refreshInterval: 1,
			})
		},
		{ offset: 500 }
	)

	var $container = $(".gallery").imagesLoaded(function () {
		$container.isotope({
			// options
		})
	})

	$("#filters").on("click", "button", function () {
		var filterValue = $(this).attr("data-filter")
		$container.isotope({ filter: filterValue })
	})

	$container.isotope({
		filter: "*", // IF YOU WANT TO DISPLAY AT FIRST ONLY ONE FILTER, FOR EXAMPLE DESIGNS: SUBSTITUTE '*' WITH '.designs'
	})

	$(".gallery-inner").magnificPopup({
		delegate: " .popup-link",
		gallery: {
			enabled: true, // set to true to enable gallery
			navigateByImgClick: true,
			arrowMarkup:
				'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
			tPrev: "Previous (Left arrow key)", // title for left button
			tNext: "Next (Right arrow key)", // title for right button
		},
		type: "image",
		mainClass: "mfp-fade",
		// Info about options is in docs:
		// http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

		tLoading: "Loading...",
	})

	// $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
	// 	disableOn: 100,
	// 	type: "iframe",
	// 	mainClass: "mfp-fade",
	// 	removalDelay: 160,
	// 	preloader: false,

	// 	fixedContentPos: false,
	// })

	/* 8. Google Map Init */

	// function initialize() {
	//     var map_canvas = document.getElementById('googleMap');

	//     var map_options = {
	//         center: new google.maps.LatLng(48.8697366,2.4679583),
	//         zoom: 15,
	//         mapTypeId: google.maps.MapTypeId.ROADMAP,
	//         scrollwheel: false
	//     };

	//     var map = new google.maps.Map(map_canvas, map_options);
	//     var marker = new google.maps.Marker({
	//         position: new google.maps.LatLng(48.8697366,2.4679583),
	//         map: map,
	//         title: 'Sous-titre.com'
	//     });
	//     var styles = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-77}]},{"featureType":"road"}]
	//     map.setOptions({styles: styles});
	// }
	// google.maps.event.addDomListener(window, 'load', initialize);

	// smoothScroll.init({
	//     speed: 1000, // Integer. How fast to complete the scroll in milliseconds
	//     easing: 'easeInOutCubic', // Easing pattern to use
	//     updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
	//     offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
	//     callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
	//     callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
	// });

	$("#filters .btn").tooltip()

	// $("body").fitVids();
})

/* 12. Preloader */

$(window).load(function () {
	// makes sure the whole site is loaded
	"use strict"
	$("#status").fadeOut() // will first fade out the loading animation
	$("#preloader").delay(100).fadeOut("slow") // will fade out the white DIV that covers the website.
	// $("body").delay(100).css({ overflow: "visible" })
})

/* Mobile bug fixes  */

// if(Modernizr.touch){
//     $('.caption .valign').css("top","40px");
// }

// $(".gallery-inner").bind("touchstart", function () {
// 	$(this).addClass(".caption")
// })

// $(".gallery-inner").bind("touchend", function () {
// 	$(this).removeClass(".caption")
// })

// $(".featuredWork").bind("touchstart", function () {
// 	$(this).addClass(".caption")
// })

// $(".featuredWork").bind("touchend", function () {
// 	$(this).removeClass(".caption")
// })

/*!
MY Modal (tuto grafikart) Mentions légales RGPD
*/

let modal = null
const focusableSelector = "button, a, input, textarea, select"
let focusables = []
let previouslyFocusElement = null

const openModal = async (e) => {
	e.preventDefault()
	const target = e.target.getAttribute("href")
	if (target.startsWith("#")) {
		modal = document.querySelector(target)
	} else {
		modal = await loadModal(target)
	}
	focusables = Array.from(modal.querySelectorAll(focusableSelector))
	previouslyFocusElement = document.querySelector(":focus")
	modal.style.display = null
	focusables[0].focus()
	modal.removeAttribute("aria-hidden")
	modal.setAttribute("aria-modal", "true")
	modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
}

const closeModal = (e) => {
	if (modal === null) return
	if (previouslyFocusElement !== null) previouslyFocusElement.focus()
	e.preventDefault()
	window.setTimeout(() => {
		modal.style.display = "none"
		modal = null
	}, 500)
	modal.setAttribute("aria-hidden", "true")
	modal.removeAttribute("aria-modal")
	modal
		.querySelector(".js-modal-close")
		.removeEventListener("click", closeModal)
}

const focusInModal = (e) => {
	e.preventDefault()
	let index = focusables.findIndex((f) => f === modal.querySelector(":focus"))
	if (e.shiftKey === true) {
		index--
	} else {
		index++
	}
	if (index >= focusables.length) {
		index = 0
	}
	if (index < 0) {
		index = focusables.length - 1
	}
	focusables[index].focus()
}

const loadModal = async (url) => {
	// TODO : afficher un "loader"
	const target = "#" + url.split("#")[1]
	// console.log(target);
	const existingModal = document.querySelector(target)
	if (existingModal !== null) return existingModal
	const html = await fetch(url).then((response) => response.text())
	// MDN DocumentFragment
	const fragment = document.createRange().createContextualFragment(html)
	const element = fragment.querySelector(target)
	if (element === null)
		throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`
	// console.log(element);
	document.body.append(element)
	// on retourne element qui peut être utilisé par la suite
	return element
}

document.querySelectorAll(".js-modal").forEach((a) => {
	a.addEventListener("click", openModal)
})

window.addEventListener("keydown", (e) => {
	if (e.key === "Escape" || e.key === "Esc") {
		closeModal(e)
	}
	if (e.key === "Tab" && modal !== null) {
		focusInModal(e)
	}
})
/* End Modal Mentions légales RGPD */

/* MY Waypoints Test
http://imakewebthings.com/waypoints/
*/
$("#projets").waypoint(
	function () {
		"use strict"
		// first timer
		$(".timer1").countTo({
			from: 0, // the number you want to start
			to: 125, // the number you want to reach
			speed: 125,
			refreshInterval: 1,
		})

		// second timer
		$(".timer2").countTo({
			from: 0, // the number you want to start
			to: 71, // the number you want to reach
			speed: 250,
			refreshInterval: 1,
		})

		// third timer
		$(".timer3").countTo({
			from: 0, // the number you want to start
			to: 212, // the number you want to reach
			speed: 100,
			refreshInterval: 1,
		})
	},
	{ offset: 500 }
)
var Waypoint = new Waypoint({
	element: document.getElementById("projets"),
	handler: function () {
		document.querySelector(".navbar").classList.toggle("navbarVisible")
	},
})

/*!
MY retire les # des ancres visible dans l'url
*/
const removeAnchors = function (event) {
	let href = event.target.getAttribute("href")
	let target = document.querySelector(href)
	window.scrollTo(0, target.offsetTop)
	event.preventDefault()
}
let links = document.querySelectorAll(
	'a[href^="#accueil"], a[href^="#presentation"], a[href^="#competences"], a[href^="#projets"], a[href^="#contact"]'
)
links.forEach(function (link) {
	console.log(link)
	link.addEventListener("click", removeAnchors)
})

/*! MY Wow-like Effect
https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API#compatibilit%C3%A9_des_navigateurs
*/
const ratio = 0.1
const options = {
	// root: document.querySelector("#scrollArea")
	root: null,
	rootMargin: "0px",
	// à 1 veut dire il faut que l'entièreté de l'élément soit visible pour déclencher, 0.1 = 10%
	threshold: ratio,
}

const handleIntersect = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.intersectionRatio > ratio) {
			entry.target.classList.remove("reveal")
			observer.unobserve(entry.target)
		}
	})
}
document.documentElement.classList.add("reveal-loaded")
const observer = new IntersectionObserver(handleIntersect, options)
document.querySelectorAll(".reveal").forEach((r) => {
	observer.observe(r)
})

/* MY backstretch BG carousel */

// $("body").backstretch(
// 	[
// 		"img/webp/bg10.webp",
// 		"img/webp/bg04.webp",
// 		"img/webp/bg08.webp",
// 		//"img/webp/bg01.webp",
// 		//"img/webp/bg02.webp",
// 		//"img/webp/bg03.webp",
// 		//"img/webp/bg07.webp",
// 		//"img/webp/bg11.webp",
// 		"img/webp/bg12.webp",
// 		"img/webp/bg05.webp",
// 		"img/webp/bg06.webp",
// 	],
// 	{ duration: 4000, fade: 750 }
// )
if (window.matchMedia("(min-width: 992px)").matches) {
	// desktop
	const localLargeImageUrls = [
		"img/webp/bg10.webp",
		"img/webp/bg04.webp",
		"img/webp/bg08.webp",
		"img/webp/bg12.webp",
		"img/webp/bg05.webp",
		"img/webp/bg06.webp",
	]
	// "https://source.unsplash.com/user/c_v_r/1600x900",
	// const picsumLargeImageUrls = [
	// 	"https://picsum.photos/1100/600.jpg?random=1",
	// 	"https://picsum.photos/1100/600.jpg?random=2",
	// 	"https://picsum.photos/1100/600.jpg?random=3",
	// 	"https://picsum.photos/1100/600.jpg?random=4",
	// 	"https://picsum.photos/1100/600.jpg?random=5",
	// 	"https://picsum.photos/1100/600.jpg?random=6"
	// ]

	$.backstretch(localLargeImageUrls, {
		duration: 4000,
		fade: 750,
	})
} else {
	//tab or phone
	const localSmallImageUrls = ["img/webp/smaller/bg10.webp"]
	// const picsumSmallImageUrls = [
	// 	"https://picsum.photos/375/675?random=1",
	// 	"https://picsum.photos/375/675?random=2",
	// 	"https://picsum.photos/375/675?random=3",
	// 	"https://picsum.photos/375/675?random=4",
	// 	"https://picsum.photos/375/675?random=5"
	// ]
	$.backstretch(localSmallImageUrls, {
		duration: 4000,
		fade: 750,
	})
}

/*!
 * Lazy Load - JavaScript plugin for lazy loading images
 *
 * Copyright (c) 2007-2019 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://appelsiini.net/projects/lazyload
 *
 * Version: 2.0.0-rc.2
 *
 */

;(function (root, factory) {
	if (typeof exports === "object") {
		module.exports = factory(root)
	} else if (typeof define === "function" && define.amd) {
		define([], factory)
	} else {
		root.LazyLoad = factory(root)
	}
})(
	typeof global !== "undefined" ? global : this.window || this.global,
	function (root) {
		"use strict"

		if (typeof define === "function" && define.amd) {
			root = window
		}

		const defaults = {
			src: "data-src",
			srcset: "data-srcset",
			selector: ".lazyload",
			root: null,
			rootMargin: "0px",
			threshold: 0,
		}

		/**
		 * Merge two or more objects. Returns a new object.
		 * @private
		 * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
		 * @param {Object}   objects  The objects to merge together
		 * @returns {Object}          Merged values of defaults and options
		 */
		const extend = function () {
			let extended = {}
			let deep = false
			let i = 0
			let length = arguments.length

			/* Check if a deep merge */
			if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
				deep = arguments[0]
				i++
			}

			/* Merge the object into the extended object */
			let merge = function (obj) {
				for (let prop in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, prop)) {
						/* If deep merge and property is an object, merge properties */
						if (
							deep &&
							Object.prototype.toString.call(obj[prop]) === "[object Object]"
						) {
							extended[prop] = extend(true, extended[prop], obj[prop])
						} else {
							extended[prop] = obj[prop]
						}
					}
				}
			}

			/* Loop through each object and conduct a merge */
			for (; i < length; i++) {
				let obj = arguments[i]
				merge(obj)
			}

			return extended
		}

		function LazyLoad(images, options) {
			this.settings = extend(defaults, options || {})
			this.images = images || document.querySelectorAll(this.settings.selector)
			this.observer = null
			this.init()
		}

		LazyLoad.prototype = {
			init: function () {
				/* Without observers load everything and bail out early. */
				if (!root.IntersectionObserver) {
					this.loadImages()
					return
				}

				let self = this
				let observerConfig = {
					root: this.settings.root,
					rootMargin: this.settings.rootMargin,
					threshold: [this.settings.threshold],
				}

				this.observer = new IntersectionObserver(function (entries) {
					Array.prototype.forEach.call(entries, function (entry) {
						if (entry.isIntersecting) {
							self.observer.unobserve(entry.target)
							let src = entry.target.getAttribute(self.settings.src)
							let srcset = entry.target.getAttribute(self.settings.srcset)
							if ("img" === entry.target.tagName.toLowerCase()) {
								if (src) {
									entry.target.src = src
								}
								if (srcset) {
									entry.target.srcset = srcset
								}
							} else {
								entry.target.style.backgroundImage = "url(" + src + ")"
							}
						}
					})
				}, observerConfig)

				Array.prototype.forEach.call(this.images, function (image) {
					self.observer.observe(image)
				})
			},

			loadAndDestroy: function () {
				if (!this.settings) {
					return
				}
				this.loadImages()
				this.destroy()
			},

			loadImages: function () {
				if (!this.settings) {
					return
				}

				let self = this
				Array.prototype.forEach.call(this.images, function (image) {
					let src = image.getAttribute(self.settings.src)
					let srcset = image.getAttribute(self.settings.srcset)
					if ("img" === image.tagName.toLowerCase()) {
						if (src) {
							image.src = src
						}
						if (srcset) {
							image.srcset = srcset
						}
					} else {
						image.style.backgroundImage = "url('" + src + "')"
					}
				})
			},

			destroy: function () {
				if (!this.settings) {
					return
				}
				this.observer.disconnect()
				this.settings = null
			},
		}

		root.lazyload = function (images, options) {
			return new LazyLoad(images, options)
		}

		if (root.jQuery) {
			const $ = root.jQuery
			$.fn.lazyload = function (options) {
				options = options || {}
				options.attribute = options.attribute || "data-src"
				new LazyLoad($.makeArray(this), options)
				return this
			}
		}

		return LazyLoad
	}
)

/* MY lazyload */
lazyload()

/* copy to clipboard button */
function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement("textarea")
	textArea.value = text

	// Avoid scrolling to bottom
	textArea.style.top = "0"
	textArea.style.left = "0"
	textArea.style.position = "fixed"

	document.body.appendChild(textArea)
	textArea.focus()
	textArea.select()

	try {
		var successful = document.execCommand("copy")
		var msg = successful ? "successful" : "unsuccessful"
		console.log("Fallback: Copying text command was " + msg)
	} catch (err) {
		console.error("Fallback: Oops, unable to copy", err)
	}

	document.body.removeChild(textArea)
}
function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text)
		return
	}
	navigator.clipboard.writeText(text).then(
		function () {
			console.log("Async: Copying to clipboard was successful!")
		},
		function (err) {
			console.error("Async: Could not copy text: ", err)
		}
	)
}

var copyMailBtn = document.querySelector(".js-copy-mail-btn")

copyMailBtn.addEventListener("click", function (event) {
	event.preventDefault()
	copyTextToClipboard("freelance@sous-titre.com")
})
