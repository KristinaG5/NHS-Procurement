/*!
 * Bootstrap v4.5.2
 * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, e, n) {
    "use strict";

    function i(t) {
        return t && "object" == typeof t && "default" in t ? t : {
            default: t
        }
    }
    var d = i(e),
        o = i(n);

    function a(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && a(t.prototype, e), n && a(t, n), t
    }

    function l(e, t) {
        var n, i = Object.keys(e);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        })), i.push.apply(i, n)), i
    }

    function r(i) {
        for (var t = 1; t < arguments.length; t++) {
            var o = null != arguments[t] ? arguments[t] : {};
            t % 2 ? l(Object(o), !0).forEach(function(t) {
                var e, n;
                e = i, t = o[n = t], n in e ? Object.defineProperty(e, n, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = t
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o)) : l(Object(o)).forEach(function(t) {
                Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(o, t))
            })
        }
        return i
    }
    var u = "transitionend";

    function c(t) {
        var e = this,
            n = !1;
        return d.default(this).one(f.TRANSITION_END, function() {
            n = !0
        }), setTimeout(function() {
            n || f.triggerTransitionEnd(e)
        }, t), this
    }
    var f = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function(t) {
            for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
            return t
        },
        getSelectorFromElement: function(t) {
            var e = t.getAttribute("data-target");
            e && "#" !== e || (e = (t = t.getAttribute("href")) && "#" !== t ? t.trim() : "");
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        },
        getTransitionDurationFromElement: function(t) {
            if (!t) return 0;
            var e = d.default(t).css("transition-duration"),
                n = d.default(t).css("transition-delay"),
                i = parseFloat(e),
                t = parseFloat(n);
            return i || t ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(n))) : 0
        },
        reflow: function(t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function(t) {
            d.default(t).trigger(u)
        },
        supportsTransitionEnd: function() {
            return Boolean(u)
        },
        isElement: function(t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function(t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var o = n[i],
                        a = e[i],
                        s = a && f.isElement(a) ? "element" : null == (s = a) ? "" + s : {}.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();
                    if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
                }
            var s
        },
        findShadowRoot: function(t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? f.findShadowRoot(t.parentNode) : null;
            t = t.getRootNode();
            return t instanceof ShadowRoot ? t : null
        },
        jQueryDetection: function() {
            if (void 0 === d.default) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = d.default.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }
    };
    f.jQueryDetection(), d.default.fn.emulateTransitionEnd = c, d.default.event.special[f.TRANSITION_END] = {
        bindType: u,
        delegateType: u,
        handle: function(t) {
            if (d.default(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var h = "alert",
        g = "bs.alert",
        m = d.default.fn[h],
        _ = function() {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, t.dispose = function() {
                d.default.removeData(this._element, g), this._element = null
            }, t._getRootElement = function(t) {
                var e = f.getSelectorFromElement(t),
                    n = !1;
                return e && (n = document.querySelector(e)), n = n || d.default(t).closest(".alert")[0]
            }, t._triggerCloseEvent = function(t) {
                var e = d.default.Event("close.bs.alert");
                return d.default(t).trigger(e), e
            }, t._removeElement = function(e) {
                var t, n = this;
                d.default(e).removeClass("show"), d.default(e).hasClass("fade") ? (t = f.getTransitionDurationFromElement(e), d.default(e).one(f.TRANSITION_END, function(t) {
                    return n._destroyElement(e, t)
                }).emulateTransitionEnd(t)) : this._destroyElement(e)
            }, t._destroyElement = function(t) {
                d.default(t).detach().trigger("closed.bs.alert").remove()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = d.default(this),
                        e = t.data(g);
                    e || (e = new i(this), t.data(g, e)), "close" === n && e[n](this)
                })
            }, i._handleDismiss = function(e) {
                return function(t) {
                    t && t.preventDefault(), e.close(this)
                }
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }]), i
        }();
    d.default(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', _._handleDismiss(new _)), d.default.fn[h] = _._jQueryInterface, d.default.fn[h].Constructor = _, d.default.fn[h].noConflict = function() {
        return d.default.fn[h] = m, _._jQueryInterface
    };
    var p = "button",
        v = "bs.button",
        e = "." + v,
        n = ".data-api",
        y = d.default.fn[p],
        b = "active",
        E = '[data-toggle^="button"]',
        w = 'input:not([type="hidden"])',
        T = ".btn",
        C = function() {
            function n(t) {
                this._element = t
            }
            var t = n.prototype;
            return t.toggle = function() {
                var t, e = !0,
                    n = !0,
                    i = d.default(this._element).closest('[data-toggle="buttons"]')[0];
                !i || (t = this._element.querySelector(w)) && ("radio" === t.type && (t.checked && this._element.classList.contains(b) ? e = !1 : (i = i.querySelector(".active")) && d.default(i).removeClass(b)), e && ("checkbox" !== t.type && "radio" !== t.type || (t.checked = !this._element.classList.contains(b)), d.default(t).trigger("change")), t.focus(), n = !1), this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (n && this._element.setAttribute("aria-pressed", !this._element.classList.contains(b)), e && d.default(this._element).toggleClass(b))
            }, t.dispose = function() {
                d.default.removeData(this._element, v), this._element = null
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = d.default(this).data(v);
                    t || (t = new n(this), d.default(this).data(v, t)), "toggle" === e && t[e]()
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }]), n
        }();
    d.default(document).on("click.bs.button.data-api", E, function(t) {
        var e = t.target,
            n = e;
        if (d.default(e).hasClass("btn") || (e = d.default(e).closest(T)[0]), !e || e.hasAttribute("disabled") || e.classList.contains("disabled")) t.preventDefault();
        else {
            var i = e.querySelector(w);
            if (i && (i.hasAttribute("disabled") || i.classList.contains("disabled"))) return void t.preventDefault();
            ("LABEL" !== n.tagName || i && "checkbox" !== i.type) && C._jQueryInterface.call(d.default(e), "toggle")
        }
    }).on("focus.bs.button.data-api blur.bs.button.data-api", E, function(t) {
        var e = d.default(t.target).closest(T)[0];
        d.default(e).toggleClass("focus", /^focus(in)?$/.test(t.type))
    }), d.default(window).on("load.bs.button.data-api", function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), e = 0, n = t.length; e < n; e++) {
            var i = t[e],
                o = i.querySelector(w);
            o.checked || o.hasAttribute("checked") ? i.classList.add(b) : i.classList.remove(b)
        }
        for (var a = 0, s = (t = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; a < s; a++) {
            var l = t[a];
            "true" === l.getAttribute("aria-pressed") ? l.classList.add(b) : l.classList.remove(b)
        }
    }), d.default.fn[p] = C._jQueryInterface, d.default.fn[p].Constructor = C, d.default.fn[p].noConflict = function() {
        return d.default.fn[p] = y, C._jQueryInterface
    };
    var S = "carousel",
        D = "bs.carousel",
        N = "." + D,
        e = ".data-api",
        A = d.default.fn[S],
        k = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        I = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        O = "next",
        j = "prev",
        P = "slid" + N,
        R = "active",
        x = ".active.carousel-item",
        L = {
            TOUCH: "touch",
            PEN: "pen"
        },
        q = function() {
            function o(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }
            var t = o.prototype;
            return t.next = function() {
                this._isSliding || this._slide(O)
            }, t.nextWhenVisible = function() {
                !document.hidden && d.default(this._element).is(":visible") && "hidden" !== d.default(this._element).css("visibility") && this.next()
            }, t.prev = function() {
                this._isSliding || this._slide(j)
            }, t.pause = function(t) {
                t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (f.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, t.cycle = function(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, t.to = function(t) {
                var e = this;
                this._activeElement = this._element.querySelector(x);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) d.default(this._element).one(P, function() {
                        return e.to(t)
                    });
                    else {
                        if (n === t) return this.pause(), void this.cycle();
                        n = n < t ? O : j;
                        this._slide(n, this._items[t])
                    }
            }, t.dispose = function() {
                d.default(this._element).off(N), d.default.removeData(this._element, D), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, t._getConfig = function(t) {
                return t = r(r({}, k), t), f.typeCheckConfig(S, t, I), t
            }, t._handleSwipe = function() {
                var t = Math.abs(this.touchDeltaX);
                t <= 40 || (t = t / this.touchDeltaX, (this.touchDeltaX = 0) < t && this.prev(), t < 0 && this.next())
            }, t._addEventListeners = function() {
                var e = this;
                this._config.keyboard && d.default(this._element).on("keydown.bs.carousel", function(t) {
                    return e._keydown(t)
                }), "hover" === this._config.pause && d.default(this._element).on("mouseenter.bs.carousel", function(t) {
                    return e.pause(t)
                }).on("mouseleave.bs.carousel", function(t) {
                    return e.cycle(t)
                }), this._config.touch && this._addTouchEventListeners()
            }, t._addTouchEventListeners = function() {
                var t, e, n = this;
                this._touchSupported && (t = function(t) {
                    n._pointerEvent && L[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX)
                }, e = function(t) {
                    n._pointerEvent && L[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function(t) {
                        return n.cycle(t)
                    }, 500 + n._config.interval))
                }, d.default(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", function(t) {
                    return t.preventDefault()
                }), this._pointerEvent ? (d.default(this._element).on("pointerdown.bs.carousel", t), d.default(this._element).on("pointerup.bs.carousel", e), this._element.classList.add("pointer-event")) : (d.default(this._element).on("touchstart.bs.carousel", t), d.default(this._element).on("touchmove.bs.carousel", function(t) {
                    (t = t).originalEvent.touches && 1 < t.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = t.originalEvent.touches[0].clientX - n.touchStartX
                }), d.default(this._element).on("touchend.bs.carousel", e)))
            }, t._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, t._getItemIndex = function(t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(t)
            }, t._getItemByDirection = function(t, e) {
                var n = t === O,
                    i = t === j,
                    o = this._getItemIndex(e),
                    a = this._items.length - 1;
                if ((i && 0 === o || n && o === a) && !this._config.wrap) return e;
                t = (o + (t === j ? -1 : 1)) % this._items.length;
                return -1 == t ? this._items[this._items.length - 1] : this._items[t]
            }, t._triggerSlideEvent = function(t, e) {
                var n = this._getItemIndex(t),
                    i = this._getItemIndex(this._element.querySelector(x)),
                    n = d.default.Event("slide.bs.carousel", {
                        relatedTarget: t,
                        direction: e,
                        from: i,
                        to: n
                    });
                return d.default(this._element).trigger(n), n
            }, t._setActiveIndicatorElement = function(t) {
                var e;
                this._indicatorsElement && (e = [].slice.call(this._indicatorsElement.querySelectorAll(".active")), d.default(e).removeClass(R), (t = this._indicatorsElement.children[this._getItemIndex(t)]) && d.default(t).addClass(R))
            }, t._slide = function(t, e) {
                var n, i, o, a = this,
                    s = this._element.querySelector(x),
                    l = this._getItemIndex(s),
                    r = e || s && this._getItemByDirection(t, s),
                    u = this._getItemIndex(r),
                    e = Boolean(this._interval),
                    t = t === O ? (n = "carousel-item-left", i = "carousel-item-next", "left") : (n = "carousel-item-right", i = "carousel-item-prev", "right");
                r && d.default(r).hasClass(R) ? this._isSliding = !1 : this._triggerSlideEvent(r, t).isDefaultPrevented() || s && r && (this._isSliding = !0, e && this.pause(), this._setActiveIndicatorElement(r), o = d.default.Event(P, {
                    relatedTarget: r,
                    direction: t,
                    from: l,
                    to: u
                }), d.default(this._element).hasClass("slide") ? (d.default(r).addClass(i), f.reflow(r), d.default(s).addClass(n), d.default(r).addClass(n), (u = parseInt(r.getAttribute("data-interval"), 10)) ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = u) : this._config.interval = this._config.defaultInterval || this._config.interval, u = f.getTransitionDurationFromElement(s), d.default(s).one(f.TRANSITION_END, function() {
                    d.default(r).removeClass(n + " " + i).addClass(R), d.default(s).removeClass(R + " " + i + " " + n), a._isSliding = !1, setTimeout(function() {
                        return d.default(a._element).trigger(o)
                    }, 0)
                }).emulateTransitionEnd(u)) : (d.default(s).removeClass(R), d.default(r).addClass(R), this._isSliding = !1, d.default(this._element).trigger(o)), e && this.cycle())
            }, o._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = d.default(this).data(D),
                        e = r(r({}, k), d.default(this).data());
                    "object" == typeof i && (e = r(r({}, e), i));
                    var n = "string" == typeof i ? i : e.slide;
                    if (t || (t = new o(this, e), d.default(this).data(D, t)), "number" == typeof i) t.to(i);
                    else if ("string" == typeof n) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    } else e.interval && e.ride && (t.pause(), t.cycle())
                })
            }, o._dataApiClickHandler = function(t) {
                var e, n, i = f.getSelectorFromElement(this);
                !i || (e = d.default(i)[0]) && d.default(e).hasClass("carousel") && (n = r(r({}, d.default(e).data()), d.default(this).data()), (i = this.getAttribute("data-slide-to")) && (n.interval = !1), o._jQueryInterface.call(d.default(e), n), i && d.default(e).data(D).to(i), t.preventDefault())
            }, s(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }, {
                key: "Default",
                get: function() {
                    return k
                }
            }]), o
        }();
    d.default(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", q._dataApiClickHandler), d.default(window).on("load.bs.carousel.data-api", function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), e = 0, n = t.length; e < n; e++) {
            var i = d.default(t[e]);
            q._jQueryInterface.call(i, i.data())
        }
    }), d.default.fn[S] = q._jQueryInterface, d.default.fn[S].Constructor = q, d.default.fn[S].noConflict = function() {
        return d.default.fn[S] = A, q._jQueryInterface
    };
    var F = "collapse",
        Q = "bs.collapse",
        n = "." + Q,
        B = d.default.fn[F],
        H = {
            toggle: !0,
            parent: ""
        },
        U = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        M = "show",
        W = "collapse",
        V = "collapsing",
        z = "collapsed",
        K = '[data-toggle="collapse"]',
        X = function() {
            function a(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(K)), i = 0, o = n.length; i < o; i++) {
                    var a = n[i],
                        s = f.getSelectorFromElement(a),
                        l = [].slice.call(document.querySelectorAll(s)).filter(function(t) {
                            return t === e
                        });
                    null !== s && 0 < l.length && (this._selector = s, this._triggerArray.push(a))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var t = a.prototype;
            return t.toggle = function() {
                d.default(this._element).hasClass(M) ? this.hide() : this.show()
            }, t.show = function() {
                var t, e, n, i, o = this;
                this._isTransitioning || d.default(this._element).hasClass(M) || (this._parent && 0 === (i = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function(t) {
                    return "string" == typeof o._config.parent ? t.getAttribute("data-parent") === o._config.parent : t.classList.contains(W)
                })).length && (i = null), i && (n = d.default(i).not(this._selector).data(Q)) && n._isTransitioning || (t = d.default.Event("show.bs.collapse"), d.default(this._element).trigger(t), t.isDefaultPrevented() || (i && (a._jQueryInterface.call(d.default(i).not(this._selector), "hide"), n || d.default(i).data(Q, null)), e = this._getDimension(), d.default(this._element).removeClass(W).addClass(V), this._element.style[e] = 0, this._triggerArray.length && d.default(this._triggerArray).removeClass(z).attr("aria-expanded", !0), this.setTransitioning(!0), n = "scroll" + (e[0].toUpperCase() + e.slice(1)), i = f.getTransitionDurationFromElement(this._element), d.default(this._element).one(f.TRANSITION_END, function() {
                    d.default(o._element).removeClass(V).addClass(W + " " + M), o._element.style[e] = "", o.setTransitioning(!1), d.default(o._element).trigger("shown.bs.collapse")
                }).emulateTransitionEnd(i), this._element.style[e] = this._element[n] + "px")))
            }, t.hide = function() {
                var t = this;
                if (!this._isTransitioning && d.default(this._element).hasClass(M)) {
                    var e = d.default.Event("hide.bs.collapse");
                    if (d.default(this._element).trigger(e), !e.isDefaultPrevented()) {
                        e = this._getDimension();
                        this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", f.reflow(this._element), d.default(this._element).addClass(V).removeClass(W + " " + M);
                        var n = this._triggerArray.length;
                        if (0 < n)
                            for (var i = 0; i < n; i++) {
                                var o = this._triggerArray[i],
                                    a = f.getSelectorFromElement(o);
                                null !== a && (d.default([].slice.call(document.querySelectorAll(a))).hasClass(M) || d.default(o).addClass(z).attr("aria-expanded", !1))
                            }
                        this.setTransitioning(!0);
                        this._element.style[e] = "";
                        e = f.getTransitionDurationFromElement(this._element);
                        d.default(this._element).one(f.TRANSITION_END, function() {
                            t.setTransitioning(!1), d.default(t._element).removeClass(V).addClass(W).trigger("hidden.bs.collapse")
                        }).emulateTransitionEnd(e)
                    }
                }
            }, t.setTransitioning = function(t) {
                this._isTransitioning = t
            }, t.dispose = function() {
                d.default.removeData(this._element, Q), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, t._getConfig = function(t) {
                return (t = r(r({}, H), t)).toggle = Boolean(t.toggle), f.typeCheckConfig(F, t, U), t
            }, t._getDimension = function() {
                return d.default(this._element).hasClass("width") ? "width" : "height"
            }, t._getParent = function() {
                var t, n = this;
                f.isElement(this._config.parent) ? (t = this._config.parent, void 0 !== this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
                var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    e = [].slice.call(t.querySelectorAll(e));
                return d.default(e).each(function(t, e) {
                    n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
                }), t
            }, t._addAriaAndCollapsedClass = function(t, e) {
                t = d.default(t).hasClass(M);
                e.length && d.default(e).toggleClass(z, !t).attr("aria-expanded", t)
            }, a._getTargetFromElement = function(t) {
                t = f.getSelectorFromElement(t);
                return t ? document.querySelector(t) : null
            }, a._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = d.default(this),
                        e = t.data(Q),
                        n = r(r(r({}, H), t.data()), "object" == typeof i && i ? i : {});
                    if (!e && n.toggle && "string" == typeof i && /show|hide/.test(i) && (n.toggle = !1), e || (e = new a(this, n), t.data(Q, e)), "string" == typeof i) {
                        if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i]()
                    }
                })
            }, s(a, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }, {
                key: "Default",
                get: function() {
                    return H
                }
            }]), a
        }();
    d.default(document).on("click.bs.collapse.data-api", K, function(t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = d.default(this),
            t = f.getSelectorFromElement(this),
            t = [].slice.call(document.querySelectorAll(t));
        d.default(t).each(function() {
            var t = d.default(this),
                e = t.data(Q) ? "toggle" : n.data();
            X._jQueryInterface.call(t, e)
        })
    }), d.default.fn[F] = X._jQueryInterface, d.default.fn[F].Constructor = X, d.default.fn[F].noConflict = function() {
        return d.default.fn[F] = B, X._jQueryInterface
    };
    var Y = "dropdown",
        $ = "bs.dropdown",
        J = "." + $,
        E = ".data-api",
        G = d.default.fn[Y],
        Z = new RegExp("38|40|27"),
        tt = "hide" + J,
        et = "hidden" + J,
        e = "click" + J + E,
        n = "keydown" + J + E,
        nt = "disabled",
        it = "show",
        ot = "dropdown-menu-right",
        at = '[data-toggle="dropdown"]',
        st = ".dropdown-menu",
        lt = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null
        },
        rt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string",
            popperConfig: "(null|object)"
        },
        ut = function() {
            function u(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var t = u.prototype;
            return t.toggle = function() {
                var t;
                this._element.disabled || d.default(this._element).hasClass(nt) || (t = d.default(this._menu).hasClass(it), u._clearMenus(), t || this.show(!0))
            }, t.show = function(t) {
                if (void 0 === t && (t = !1), !(this._element.disabled || d.default(this._element).hasClass(nt) || d.default(this._menu).hasClass(it))) {
                    var e = {
                            relatedTarget: this._element
                        },
                        n = d.default.Event("show.bs.dropdown", e),
                        i = u._getParentFromElement(this._element);
                    if (d.default(i).trigger(n), !n.isDefaultPrevented()) {
                        if (!this._inNavbar && t) {
                            if (void 0 === o.default) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                            t = this._element;
                            "parent" === this._config.reference ? t = i : f.isElement(this._config.reference) && (t = this._config.reference, void 0 !== this._config.reference.jquery && (t = this._config.reference[0])), "scrollParent" !== this._config.boundary && d.default(i).addClass("position-static"), this._popper = new o.default(t, this._menu, this._getPopperConfig())
                        }
                        "ontouchstart" in document.documentElement && 0 === d.default(i).closest(".navbar-nav").length && d.default(document.body).children().on("mouseover", null, d.default.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), d.default(this._menu).toggleClass(it), d.default(i).toggleClass(it).trigger(d.default.Event("shown.bs.dropdown", e))
                    }
                }
            }, t.hide = function() {
                var t, e, n;
                this._element.disabled || d.default(this._element).hasClass(nt) || !d.default(this._menu).hasClass(it) || (t = {
                    relatedTarget: this._element
                }, e = d.default.Event(tt, t), n = u._getParentFromElement(this._element), d.default(n).trigger(e), e.isDefaultPrevented() || (this._popper && this._popper.destroy(), d.default(this._menu).toggleClass(it), d.default(n).toggleClass(it).trigger(d.default.Event(et, t))))
            }, t.dispose = function() {
                d.default.removeData(this._element, $), d.default(this._element).off(J), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, t.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, t._addEventListeners = function() {
                var e = this;
                d.default(this._element).on("click.bs.dropdown", function(t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle()
                })
            }, t._getConfig = function(t) {
                return t = r(r(r({}, this.constructor.Default), d.default(this._element).data()), t), f.typeCheckConfig(Y, t, this.constructor.DefaultType), t
            }, t._getMenuElement = function() {
                var t;
                return this._menu || (t = u._getParentFromElement(this._element)) && (this._menu = t.querySelector(st)), this._menu
            }, t._getPlacement = function() {
                var t = d.default(this._element.parentNode),
                    e = "bottom-start";
                return t.hasClass("dropup") ? e = d.default(this._menu).hasClass(ot) ? "top-end" : "top-start" : t.hasClass("dropright") ? e = "right-start" : t.hasClass("dropleft") ? e = "left-start" : d.default(this._menu).hasClass(ot) && (e = "bottom-end"), e
            }, t._detectNavbar = function() {
                return 0 < d.default(this._element).closest(".navbar").length
            }, t._getOffset = function() {
                var e = this,
                    t = {};
                return "function" == typeof this._config.offset ? t.fn = function(t) {
                    return t.offsets = r(r({}, t.offsets), e._config.offset(t.offsets, e._element) || {}), t
                } : t.offset = this._config.offset, t
            }, t._getPopperConfig = function() {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), r(r({}, t), this._config.popperConfig)
            }, u._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = d.default(this).data($);
                    if (t || (t = new u(this, "object" == typeof e ? e : null), d.default(this).data($, t)), "string" == typeof e) {
                        if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, u._clearMenus = function(t) {
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                    for (var e = [].slice.call(document.querySelectorAll(at)), n = 0, i = e.length; n < i; n++) {
                        var o, a, s = u._getParentFromElement(e[n]),
                            l = d.default(e[n]).data($),
                            r = {
                                relatedTarget: e[n]
                            };
                        t && "click" === t.type && (r.clickEvent = t), l && (o = l._menu, d.default(s).hasClass(it) && (t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && d.default.contains(s, t.target) || (a = d.default.Event(tt, r), d.default(s).trigger(a), a.isDefaultPrevented() || ("ontouchstart" in document.documentElement && d.default(document.body).children().off("mouseover", null, d.default.noop), e[n].setAttribute("aria-expanded", "false"), l._popper && l._popper.destroy(), d.default(o).removeClass(it), d.default(s).removeClass(it).trigger(d.default.Event(et, r))))))
                    }
            }, u._getParentFromElement = function(t) {
                var e, n = f.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, u._dataApiKeydownHandler = function(t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || d.default(t.target).closest(st).length)) : Z.test(t.which)) && !this.disabled && !d.default(this).hasClass(nt)) {
                    var e = u._getParentFromElement(this),
                        n = d.default(e).hasClass(it);
                    if (n || 27 !== t.which) {
                        if (t.preventDefault(), t.stopPropagation(), !n || n && (27 === t.which || 32 === t.which)) return 27 === t.which && d.default(e.querySelector(at)).trigger("focus"), void d.default(this).trigger("click");
                        n = [].slice.call(e.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function(t) {
                            return d.default(t).is(":visible")
                        });
                        0 !== n.length && (e = n.indexOf(t.target), 38 === t.which && 0 < e && e--, 40 === t.which && e < n.length - 1 && e++, e < 0 && (e = 0), n[e].focus())
                    }
                }
            }, s(u, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }, {
                key: "Default",
                get: function() {
                    return lt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return rt
                }
            }]), u
        }();
    d.default(document).on(n, at, ut._dataApiKeydownHandler).on(n, st, ut._dataApiKeydownHandler).on(e + " keyup.bs.dropdown.data-api", ut._clearMenus).on(e, at, function(t) {
        t.preventDefault(), t.stopPropagation(), ut._jQueryInterface.call(d.default(this), "toggle")
    }).on(e, ".dropdown form", function(t) {
        t.stopPropagation()
    }), d.default.fn[Y] = ut._jQueryInterface, d.default.fn[Y].Constructor = ut, d.default.fn[Y].noConflict = function() {
        return d.default.fn[Y] = G, ut._jQueryInterface
    };
    var dt = "modal",
        ct = "bs.modal",
        ft = "." + ct,
        ht = d.default.fn[dt],
        gt = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        mt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        _t = "hidden" + ft,
        pt = "show" + ft,
        vt = "focusin" + ft,
        yt = "resize" + ft,
        bt = "click.dismiss" + ft,
        Et = "keydown.dismiss" + ft,
        wt = "mousedown.dismiss" + ft,
        Tt = "modal-open",
        Ct = "fade",
        St = "show",
        Dt = "modal-static",
        Nt = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        At = ".sticky-top",
        kt = function() {
            function o(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var t = o.prototype;
            return t.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t)
            }, t.show = function(t) {
                var e, n = this;
                this._isShown || this._isTransitioning || (d.default(this._element).hasClass(Ct) && (this._isTransitioning = !0), e = d.default.Event(pt, {
                    relatedTarget: t
                }), d.default(this._element).trigger(e), this._isShown || e.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), d.default(this._element).on(bt, '[data-dismiss="modal"]', function(t) {
                    return n.hide(t)
                }), d.default(this._dialog).on(wt, function() {
                    d.default(n._element).one("mouseup.dismiss.bs.modal", function(t) {
                        d.default(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                    })
                }), this._showBackdrop(function() {
                    return n._showElement(t)
                })))
            }, t.hide = function(t) {
                var e = this;
                t && t.preventDefault(), this._isShown && !this._isTransitioning && (t = d.default.Event("hide.bs.modal"), d.default(this._element).trigger(t), this._isShown && !t.isDefaultPrevented() && (this._isShown = !1, (t = d.default(this._element).hasClass(Ct)) && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), d.default(document).off(vt), d.default(this._element).removeClass(St), d.default(this._element).off(bt), d.default(this._dialog).off(wt), t ? (t = f.getTransitionDurationFromElement(this._element), d.default(this._element).one(f.TRANSITION_END, function(t) {
                    return e._hideModal(t)
                }).emulateTransitionEnd(t)) : this._hideModal()))
            }, t.dispose = function() {
                [window, this._element, this._dialog].forEach(function(t) {
                    return d.default(t).off(ft)
                }), d.default(document).off(vt), d.default.removeData(this._element, ct), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, t.handleUpdate = function() {
                this._adjustDialog()
            }, t._getConfig = function(t) {
                return t = r(r({}, gt), t), f.typeCheckConfig(dt, t, mt), t
            }, t._triggerBackdropTransition = function() {
                var t = this;
                if ("static" === this._config.backdrop) {
                    var e = d.default.Event("hidePrevented.bs.modal");
                    if (d.default(this._element).trigger(e), e.defaultPrevented) return;
                    var n = this._element.scrollHeight > document.documentElement.clientHeight;
                    n || (this._element.style.overflowY = "hidden"), this._element.classList.add(Dt);
                    var i = f.getTransitionDurationFromElement(this._dialog);
                    d.default(this._element).off(f.TRANSITION_END), d.default(this._element).one(f.TRANSITION_END, function() {
                        t._element.classList.remove(Dt), n || d.default(t._element).one(f.TRANSITION_END, function() {
                            t._element.style.overflowY = ""
                        }).emulateTransitionEnd(t._element, i)
                    }).emulateTransitionEnd(i), this._element.focus()
                } else this.hide()
            }, t._showElement = function(t) {
                var e = this,
                    n = d.default(this._element).hasClass(Ct),
                    i = this._dialog ? this._dialog.querySelector(".modal-body") : null;
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), d.default(this._dialog).hasClass("modal-dialog-scrollable") && i ? i.scrollTop = 0 : this._element.scrollTop = 0, n && f.reflow(this._element), d.default(this._element).addClass(St), this._config.focus && this._enforceFocus();
                var o = d.default.Event("shown.bs.modal", {
                        relatedTarget: t
                    }),
                    t = function() {
                        e._config.focus && e._element.focus(), e._isTransitioning = !1, d.default(e._element).trigger(o)
                    };
                n ? (n = f.getTransitionDurationFromElement(this._dialog), d.default(this._dialog).one(f.TRANSITION_END, t).emulateTransitionEnd(n)) : t()
            }, t._enforceFocus = function() {
                var e = this;
                d.default(document).off(vt).on(vt, function(t) {
                    document !== t.target && e._element !== t.target && 0 === d.default(e._element).has(t.target).length && e._element.focus()
                })
            }, t._setEscapeEvent = function() {
                var e = this;
                this._isShown ? d.default(this._element).on(Et, function(t) {
                    e._config.keyboard && 27 === t.which ? (t.preventDefault(), e.hide()) : e._config.keyboard || 27 !== t.which || e._triggerBackdropTransition()
                }) : this._isShown || d.default(this._element).off(Et)
            }, t._setResizeEvent = function() {
                var e = this;
                this._isShown ? d.default(window).on(yt, function(t) {
                    return e.handleUpdate(t)
                }) : d.default(window).off(yt)
            }, t._hideModal = function() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function() {
                    d.default(document.body).removeClass(Tt), t._resetAdjustments(), t._resetScrollbar(), d.default(t._element).trigger(_t)
                })
            }, t._removeBackdrop = function() {
                this._backdrop && (d.default(this._backdrop).remove(), this._backdrop = null)
            }, t._showBackdrop = function(t) {
                var e = this,
                    n = d.default(this._element).hasClass(Ct) ? Ct : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), d.default(this._backdrop).appendTo(document.body), d.default(this._element).on(bt, function(t) {
                            e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && e._triggerBackdropTransition()
                        }), n && f.reflow(this._backdrop), d.default(this._backdrop).addClass(St), !t) return;
                    if (!n) return void t();
                    var i = f.getTransitionDurationFromElement(this._backdrop);
                    d.default(this._backdrop).one(f.TRANSITION_END, t).emulateTransitionEnd(i)
                } else {
                    !this._isShown && this._backdrop ? (d.default(this._backdrop).removeClass(St), n = function() {
                        e._removeBackdrop(), t && t()
                    }, d.default(this._element).hasClass(Ct) ? (i = f.getTransitionDurationFromElement(this._backdrop), d.default(this._backdrop).one(f.TRANSITION_END, n).emulateTransitionEnd(i)) : n()) : t && t()
                }
            }, t._adjustDialog = function() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, t._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, t._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, t._setScrollbar = function() {
                var t, e, o = this;
                this._isBodyOverflowing && (t = [].slice.call(document.querySelectorAll(Nt)), e = [].slice.call(document.querySelectorAll(At)), d.default(t).each(function(t, e) {
                    var n = e.style.paddingRight,
                        i = d.default(e).css("padding-right");
                    d.default(e).data("padding-right", n).css("padding-right", parseFloat(i) + o._scrollbarWidth + "px")
                }), d.default(e).each(function(t, e) {
                    var n = e.style.marginRight,
                        i = d.default(e).css("margin-right");
                    d.default(e).data("margin-right", n).css("margin-right", parseFloat(i) - o._scrollbarWidth + "px")
                }), t = document.body.style.paddingRight, e = d.default(document.body).css("padding-right"), d.default(document.body).data("padding-right", t).css("padding-right", parseFloat(e) + this._scrollbarWidth + "px")), d.default(document.body).addClass(Tt)
            }, t._resetScrollbar = function() {
                var t = [].slice.call(document.querySelectorAll(Nt));
                d.default(t).each(function(t, e) {
                    var n = d.default(e).data("padding-right");
                    d.default(e).removeData("padding-right"), e.style.paddingRight = n || ""
                });
                t = [].slice.call(document.querySelectorAll(At));
                d.default(t).each(function(t, e) {
                    var n = d.default(e).data("margin-right");
                    void 0 !== n && d.default(e).css("margin-right", n).removeData("margin-right")
                });
                t = d.default(document.body).data("padding-right");
                d.default(document.body).removeData("padding-right"), document.body.style.paddingRight = t || ""
            }, t._getScrollbarWidth = function() {
                var t = document.createElement("div");
                t.className = "modal-scrollbar-measure", document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, o._jQueryInterface = function(n, i) {
                return this.each(function() {
                    var t = d.default(this).data(ct),
                        e = r(r(r({}, gt), d.default(this).data()), "object" == typeof n && n ? n : {});
                    if (t || (t = new o(this, e), d.default(this).data(ct, t)), "string" == typeof n) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n](i)
                    } else e.show && t.show(i)
                })
            }, s(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }, {
                key: "Default",
                get: function() {
                    return gt
                }
            }]), o
        }();
    d.default(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var e, n = this,
            i = f.getSelectorFromElement(this);
        i && (e = document.querySelector(i));
        i = d.default(e).data(ct) ? "toggle" : r(r({}, d.default(e).data()), d.default(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var o = d.default(e).one(pt, function(t) {
            t.isDefaultPrevented() || o.one(_t, function() {
                d.default(n).is(":visible") && n.focus()
            })
        });
        kt._jQueryInterface.call(d.default(e), i, this)
    }), d.default.fn[dt] = kt._jQueryInterface, d.default.fn[dt].Constructor = kt, d.default.fn[dt].noConflict = function() {
        return d.default.fn[dt] = ht, kt._jQueryInterface
    };
    var It = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        e = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        Ot = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
        jt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

    function Pt(t, o, e) {
        if (0 === t.length) return t;
        if (e && "function" == typeof e) return e(t);
        for (var t = (new window.DOMParser).parseFromString(t, "text/html"), a = Object.keys(o), s = [].slice.call(t.body.querySelectorAll("*")), n = function(t) {
                var e = s[t],
                    n = e.nodeName.toLowerCase();
                if (-1 === a.indexOf(e.nodeName.toLowerCase())) return e.parentNode.removeChild(e), "continue";
                var t = [].slice.call(e.attributes),
                    i = [].concat(o["*"] || [], o[n] || []);
                t.forEach(function(t) {
                    ! function(t, e) {
                        var n = t.nodeName.toLowerCase();
                        if (-1 !== e.indexOf(n)) return -1 === It.indexOf(n) || Boolean(t.nodeValue.match(Ot) || t.nodeValue.match(jt));
                        for (var i = e.filter(function(t) {
                                return t instanceof RegExp
                            }), o = 0, a = i.length; o < a; o++)
                            if (n.match(i[o])) return 1
                    }(t, i) && e.removeAttribute(t.nodeName)
                })
            }, i = 0, l = s.length; i < l; i++) n(i);
        return t.body.innerHTML
    }
    var Rt = "tooltip",
        xt = "bs.tooltip",
        Lt = "." + xt,
        qt = d.default.fn[Rt],
        Ft = "bs-tooltip",
        Qt = new RegExp("(^|\\s)" + Ft + "\\S+", "g"),
        Bt = ["sanitize", "whiteList", "sanitizeFn"],
        Ht = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object",
            popperConfig: "(null|object)"
        },
        Ut = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Mt = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: e,
            popperConfig: null
        },
        Wt = "show",
        Vt = {
            HIDE: "hide" + Lt,
            HIDDEN: "hidden" + Lt,
            SHOW: "show" + Lt,
            SHOWN: "shown" + Lt,
            INSERTED: "inserted" + Lt,
            CLICK: "click" + Lt,
            FOCUSIN: "focusin" + Lt,
            FOCUSOUT: "focusout" + Lt,
            MOUSEENTER: "mouseenter" + Lt,
            MOUSELEAVE: "mouseleave" + Lt
        },
        zt = "fade",
        Kt = "show",
        Xt = "hover",
        Yt = "focus",
        $t = function() {
            function i(t, e) {
                if (void 0 === o.default) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var t = i.prototype;
            return t.enable = function() {
                this._isEnabled = !0
            }, t.disable = function() {
                this._isEnabled = !1
            }, t.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, t.toggle = function(t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            n = d.default(t.currentTarget).data(e);
                        n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), d.default(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (d.default(this.getTipElement()).hasClass(Kt)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, t.dispose = function() {
                clearTimeout(this._timeout), d.default.removeData(this.element, this.constructor.DATA_KEY), d.default(this.element).off(this.constructor.EVENT_KEY), d.default(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && d.default(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, t.show = function() {
                var e = this;
                if ("none" === d.default(this.element).css("display")) throw new Error("Please use show on visible elements");
                var t = d.default.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    d.default(this.element).trigger(t);
                    var n = f.findShadowRoot(this.element),
                        i = d.default.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !i) return;
                    n = this.getTipElement(), t = f.getUID(this.constructor.NAME);
                    n.setAttribute("id", t), this.element.setAttribute("aria-describedby", t), this.setContent(), this.config.animation && d.default(n).addClass(zt);
                    i = "function" == typeof this.config.placement ? this.config.placement.call(this, n, this.element) : this.config.placement, t = this._getAttachment(i);
                    this.addAttachmentClass(t);
                    i = this._getContainer();
                    d.default(n).data(this.constructor.DATA_KEY, this), d.default.contains(this.element.ownerDocument.documentElement, this.tip) || d.default(n).appendTo(i), d.default(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new o.default(this.element, n, this._getPopperConfig(t)), d.default(n).addClass(Kt), "ontouchstart" in document.documentElement && d.default(document.body).children().on("mouseover", null, d.default.noop);
                    t = function() {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, d.default(e.element).trigger(e.constructor.Event.SHOWN), "out" === t && e._leave(null, e)
                    };
                    d.default(this.tip).hasClass(zt) ? (n = f.getTransitionDurationFromElement(this.tip), d.default(this.tip).one(f.TRANSITION_END, t).emulateTransitionEnd(n)) : t()
                }
            }, t.hide = function(t) {
                function e() {
                    n._hoverState !== Wt && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), d.default(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
                }
                var n = this,
                    i = this.getTipElement(),
                    o = d.default.Event(this.constructor.Event.HIDE);
                d.default(this.element).trigger(o), o.isDefaultPrevented() || (d.default(i).removeClass(Kt), "ontouchstart" in document.documentElement && d.default(document.body).children().off("mouseover", null, d.default.noop), this._activeTrigger.click = !1, this._activeTrigger[Yt] = !1, this._activeTrigger[Xt] = !1, d.default(this.tip).hasClass(zt) ? (o = f.getTransitionDurationFromElement(i), d.default(i).one(f.TRANSITION_END, e).emulateTransitionEnd(o)) : e(), this._hoverState = "")
            }, t.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, t.isWithContent = function() {
                return Boolean(this.getTitle())
            }, t.addAttachmentClass = function(t) {
                d.default(this.getTipElement()).addClass(Ft + "-" + t)
            }, t.getTipElement = function() {
                return this.tip = this.tip || d.default(this.config.template)[0], this.tip
            }, t.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(d.default(t.querySelectorAll(".tooltip-inner")), this.getTitle()), d.default(t).removeClass(zt + " " + Kt)
            }, t.setElementContent = function(t, e) {
                "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = Pt(e, this.config.whiteList, this.config.sanitizeFn)), t.html(e)) : t.text(e) : this.config.html ? d.default(e).parent().is(t) || t.empty().append(e) : t.text(d.default(e).text())
            }, t.getTitle = function() {
                return this.element.getAttribute("data-original-title") || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
            }, t._getPopperConfig = function(t) {
                var e = this;
                return r(r({}, {
                    placement: t,
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                            element: ".arrow"
                        },
                        preventOverflow: {
                            boundariesElement: this.config.boundary
                        }
                    },
                    onCreate: function(t) {
                        t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                    },
                    onUpdate: function(t) {
                        return e._handlePopperPlacementChange(t)
                    }
                }), this.config.popperConfig)
            }, t._getOffset = function() {
                var e = this,
                    t = {};
                return "function" == typeof this.config.offset ? t.fn = function(t) {
                    return t.offsets = r(r({}, t.offsets), e.config.offset(t.offsets, e.element) || {}), t
                } : t.offset = this.config.offset, t
            }, t._getContainer = function() {
                return !1 === this.config.container ? document.body : f.isElement(this.config.container) ? d.default(this.config.container) : d.default(document).find(this.config.container)
            }, t._getAttachment = function(t) {
                return Ut[t.toUpperCase()]
            }, t._setListeners = function() {
                var n = this;
                this.config.trigger.split(" ").forEach(function(t) {
                    var e;
                    "click" === t ? d.default(n.element).on(n.constructor.Event.CLICK, n.config.selector, function(t) {
                        return n.toggle(t)
                    }) : "manual" !== t && (e = t === Xt ? n.constructor.Event.MOUSEENTER : n.constructor.Event.FOCUSIN, t = t === Xt ? n.constructor.Event.MOUSELEAVE : n.constructor.Event.FOCUSOUT, d.default(n.element).on(e, n.config.selector, function(t) {
                        return n._enter(t)
                    }).on(t, n.config.selector, function(t) {
                        return n._leave(t)
                    }))
                }), this._hideModalHandler = function() {
                    n.element && n.hide()
                }, d.default(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = r(r({}, this.config), {}, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, t._fixTitle = function() {
                var t = typeof this.element.getAttribute("data-original-title");
                !this.element.getAttribute("title") && "string" == t || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, t._enter = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || d.default(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), d.default(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? Yt : Xt] = !0), d.default(e.getTipElement()).hasClass(Kt) || e._hoverState === Wt ? e._hoverState = Wt : (clearTimeout(e._timeout), e._hoverState = Wt, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function() {
                    e._hoverState === Wt && e.show()
                }, e.config.delay.show) : e.show())
            }, t._leave = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || d.default(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), d.default(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? Yt : Xt] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function() {
                    "out" === e._hoverState && e.hide()
                }, e.config.delay.hide) : e.hide())
            }, t._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, t._getConfig = function(t) {
                var e = d.default(this.element).data();
                return Object.keys(e).forEach(function(t) {
                    -1 !== Bt.indexOf(t) && delete e[t]
                }), "number" == typeof(t = r(r(r({}, this.constructor.Default), e), "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), f.typeCheckConfig(Rt, t, this.constructor.DefaultType), t.sanitize && (t.template = Pt(t.template, t.whiteList, t.sanitizeFn)), t
            }, t._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, t._cleanTipClass = function() {
                var t = d.default(this.getTipElement()),
                    e = t.attr("class").match(Qt);
                null !== e && e.length && t.removeClass(e.join(""))
            }, t._handlePopperPlacementChange = function(t) {
                this.tip = t.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, t._fixTransition = function() {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (d.default(t).removeClass(zt), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = d.default(this).data(xt),
                        e = "object" == typeof n && n;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), d.default(this).data(xt, t)), "string" == typeof n)) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }, {
                key: "Default",
                get: function() {
                    return Mt
                }
            }, {
                key: "NAME",
                get: function() {
                    return Rt
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return xt
                }
            }, {
                key: "Event",
                get: function() {
                    return Vt
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Lt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Ht
                }
            }]), i
        }();
    d.default.fn[Rt] = $t._jQueryInterface, d.default.fn[Rt].Constructor = $t, d.default.fn[Rt].noConflict = function() {
        return d.default.fn[Rt] = qt, $t._jQueryInterface
    };
    var Jt = "popover",
        Gt = "bs.popover",
        Zt = "." + Gt,
        te = d.default.fn[Jt],
        ee = "bs-popover",
        ne = new RegExp("(^|\\s)" + ee + "\\S+", "g"),
        ie = r(r({}, $t.Default), {}, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        oe = r(r({}, $t.DefaultType), {}, {
            content: "(string|element|function)"
        }),
        ae = {
            HIDE: "hide" + Zt,
            HIDDEN: "hidden" + Zt,
            SHOW: "show" + Zt,
            SHOWN: "shown" + Zt,
            INSERTED: "inserted" + Zt,
            CLICK: "click" + Zt,
            FOCUSIN: "focusin" + Zt,
            FOCUSOUT: "focusout" + Zt,
            MOUSEENTER: "mouseenter" + Zt,
            MOUSELEAVE: "mouseleave" + Zt
        },
        se = function(t) {
            var e;

            function i() {
                return t.apply(this, arguments) || this
            }
            n = t, (e = i).prototype = Object.create(n.prototype), (e.prototype.constructor = e).__proto__ = n;
            var n = i.prototype;
            return n.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, n.addAttachmentClass = function(t) {
                d.default(this.getTipElement()).addClass(ee + "-" + t)
            }, n.getTipElement = function() {
                return this.tip = this.tip || d.default(this.config.template)[0], this.tip
            }, n.setContent = function() {
                var t = d.default(this.getTipElement());
                this.setElementContent(t.find(".popover-header"), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(".popover-body"), e), t.removeClass("fade show")
            }, n._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, n._cleanTipClass = function() {
                var t = d.default(this.getTipElement()),
                    e = t.attr("class").match(ne);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = d.default(this).data(Gt),
                        e = "object" == typeof n ? n : null;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), d.default(this).data(Gt, t)), "string" == typeof n)) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }, {
                key: "Default",
                get: function() {
                    return ie
                }
            }, {
                key: "NAME",
                get: function() {
                    return Jt
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Gt
                }
            }, {
                key: "Event",
                get: function() {
                    return ae
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Zt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return oe
                }
            }]), i
        }($t);
    d.default.fn[Jt] = se._jQueryInterface, d.default.fn[Jt].Constructor = se, d.default.fn[Jt].noConflict = function() {
        return d.default.fn[Jt] = te, se._jQueryInterface
    };
    var le = "scrollspy",
        re = "bs.scrollspy",
        ue = "." + re,
        de = d.default.fn[le],
        ce = {
            offset: 10,
            method: "auto",
            target: ""
        },
        fe = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        he = "active",
        ge = ".nav, .list-group",
        me = ".nav-link",
        _e = ".list-group-item",
        pe = "position",
        ve = function() {
            function n(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + me + "," + this._config.target + " " + _e + "," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, d.default(this._scrollElement).on("scroll.bs.scrollspy", function(t) {
                    return n._process(t)
                }), this.refresh(), this._process()
            }
            var t = n.prototype;
            return t.refresh = function() {
                var e = this,
                    t = this._scrollElement === this._scrollElement.window ? "offset" : pe,
                    i = "auto" === this._config.method ? t : this._config.method,
                    o = i === pe ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(t) {
                    var e, n = f.getSelectorFromElement(t);
                    if (n && (e = document.querySelector(n)), e) {
                        t = e.getBoundingClientRect();
                        if (t.width || t.height) return [d.default(e)[i]().top + o, n]
                    }
                    return null
                }).filter(function(t) {
                    return t
                }).sort(function(t, e) {
                    return t[0] - e[0]
                }).forEach(function(t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, t.dispose = function() {
                d.default.removeData(this._element, re), d.default(this._scrollElement).off(ue), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, t._getConfig = function(t) {
                var e;
                return "string" != typeof(t = r(r({}, ce), "object" == typeof t && t ? t : {})).target && f.isElement(t.target) && ((e = d.default(t.target).attr("id")) || (e = f.getUID(le), d.default(t.target).attr("id", e)), t.target = "#" + e), f.typeCheckConfig(le, t, fe), t
            }, t._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, t._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, t._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, t._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    n = this._targets[this._targets.length - 1];
                    this._activeTarget !== n && this._activate(n)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var i = this._offsets.length; i--;) {
                        this._activeTarget !== this._targets[i] && t >= this._offsets[i] && (void 0 === this._offsets[i + 1] || t < this._offsets[i + 1]) && this._activate(this._targets[i])
                    }
                }
            }, t._activate = function(e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",").map(function(t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                    }),
                    t = d.default([].slice.call(document.querySelectorAll(t.join(","))));
                t.hasClass("dropdown-item") ? (t.closest(".dropdown").find(".dropdown-toggle").addClass(he), t.addClass(he)) : (t.addClass(he), t.parents(ge).prev(me + ", " + _e).addClass(he), t.parents(ge).prev(".nav-item").children(me).addClass(he)), d.default(this._scrollElement).trigger("activate.bs.scrollspy", {
                    relatedTarget: e
                })
            }, t._clear = function() {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function(t) {
                    return t.classList.contains(he)
                }).forEach(function(t) {
                    return t.classList.remove(he)
                })
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = d.default(this).data(re);
                    if (t || (t = new n(this, "object" == typeof e && e), d.default(this).data(re, t)), "string" == typeof e) {
                        if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }, {
                key: "Default",
                get: function() {
                    return ce
                }
            }]), n
        }();
    d.default(window).on("load.bs.scrollspy.data-api", function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), e = t.length; e--;) {
            var n = d.default(t[e]);
            ve._jQueryInterface.call(n, n.data())
        }
    }), d.default.fn[le] = ve._jQueryInterface, d.default.fn[le].Constructor = ve, d.default.fn[le].noConflict = function() {
        return d.default.fn[le] = de, ve._jQueryInterface
    };
    var ye = "bs.tab",
        e = "." + ye,
        be = d.default.fn.tab,
        Ee = "active",
        we = ".active",
        Te = "> li > .active",
        Ce = function() {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.show = function() {
                var t, e, n, i, o, a, s = this;
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && d.default(this._element).hasClass(Ee) || d.default(this._element).hasClass("disabled") || (a = d.default(this._element).closest(".nav, .list-group")[0], e = f.getSelectorFromElement(this._element), a && (o = "UL" === a.nodeName || "OL" === a.nodeName ? Te : we, n = (n = d.default.makeArray(d.default(a).find(o)))[n.length - 1]), i = d.default.Event("hide.bs.tab", {
                    relatedTarget: this._element
                }), o = d.default.Event("show.bs.tab", {
                    relatedTarget: n
                }), n && d.default(n).trigger(i), d.default(this._element).trigger(o), o.isDefaultPrevented() || i.isDefaultPrevented() || (e && (t = document.querySelector(e)), this._activate(this._element, a), a = function() {
                    var t = d.default.Event("hidden.bs.tab", {
                            relatedTarget: s._element
                        }),
                        e = d.default.Event("shown.bs.tab", {
                            relatedTarget: n
                        });
                    d.default(n).trigger(t), d.default(s._element).trigger(e)
                }, t ? this._activate(t, t.parentNode, a) : a()))
            }, t.dispose = function() {
                d.default.removeData(this._element, ye), this._element = null
            }, t._activate = function(t, e, n) {
                var i = this,
                    o = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? d.default(e).children(we) : d.default(e).find(Te))[0],
                    a = n && o && d.default(o).hasClass("fade"),
                    e = function() {
                        return i._transitionComplete(t, o, n)
                    };
                o && a ? (a = f.getTransitionDurationFromElement(o), d.default(o).removeClass("show").one(f.TRANSITION_END, e).emulateTransitionEnd(a)) : e()
            }, t._transitionComplete = function(t, e, n) {
                var i;
                e && (d.default(e).removeClass(Ee), (i = d.default(e.parentNode).find("> .dropdown-menu .active")[0]) && d.default(i).removeClass(Ee), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)), d.default(t).addClass(Ee), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), f.reflow(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && d.default(t.parentNode).hasClass("dropdown-menu") && ((e = d.default(t).closest(".dropdown")[0]) && (e = [].slice.call(e.querySelectorAll(".dropdown-toggle")), d.default(e).addClass(Ee)), t.setAttribute("aria-expanded", !0)), n && n()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = d.default(this),
                        e = t.data(ye);
                    if (e || (e = new i(this), t.data(ye, e)), "string" == typeof n) {
                        if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }]), i
        }();
    d.default(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(t) {
        t.preventDefault(), Ce._jQueryInterface.call(d.default(this), "show")
    }), d.default.fn.tab = Ce._jQueryInterface, d.default.fn.tab.Constructor = Ce, d.default.fn.tab.noConflict = function() {
        return d.default.fn.tab = be, Ce._jQueryInterface
    };
    var Se = "toast",
        De = "bs.toast",
        e = "." + De,
        Ne = d.default.fn[Se],
        Ae = "click.dismiss" + e,
        ke = "show",
        Ie = "showing",
        Oe = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        je = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        Pe = function() {
            function i(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }
            var t = i.prototype;
            return t.show = function() {
                var t, e = this,
                    n = d.default.Event("show.bs.toast");
                d.default(this._element).trigger(n), n.isDefaultPrevented() || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), t = function() {
                    e._element.classList.remove(Ie), e._element.classList.add(ke), d.default(e._element).trigger("shown.bs.toast"), e._config.autohide && (e._timeout = setTimeout(function() {
                        e.hide()
                    }, e._config.delay))
                }, this._element.classList.remove("hide"), f.reflow(this._element), this._element.classList.add(Ie), this._config.animation ? (n = f.getTransitionDurationFromElement(this._element), d.default(this._element).one(f.TRANSITION_END, t).emulateTransitionEnd(n)) : t())
            }, t.hide = function() {
                var t;
                this._element.classList.contains(ke) && (t = d.default.Event("hide.bs.toast"), d.default(this._element).trigger(t), t.isDefaultPrevented() || this._close())
            }, t.dispose = function() {
                this._clearTimeout(), this._element.classList.contains(ke) && this._element.classList.remove(ke), d.default(this._element).off(Ae), d.default.removeData(this._element, De), this._element = null, this._config = null
            }, t._getConfig = function(t) {
                return t = r(r(r({}, je), d.default(this._element).data()), "object" == typeof t && t ? t : {}), f.typeCheckConfig(Se, t, this.constructor.DefaultType), t
            }, t._setListeners = function() {
                var t = this;
                d.default(this._element).on(Ae, '[data-dismiss="toast"]', function() {
                    return t.hide()
                })
            }, t._close = function() {
                function t() {
                    n._element.classList.add("hide"), d.default(n._element).trigger("hidden.bs.toast")
                }
                var e, n = this;
                this._element.classList.remove(ke), this._config.animation ? (e = f.getTransitionDurationFromElement(this._element), d.default(this._element).one(f.TRANSITION_END, t).emulateTransitionEnd(e)) : t()
            }, t._clearTimeout = function() {
                clearTimeout(this._timeout), this._timeout = null
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = d.default(this),
                        e = t.data(De);
                    if (e || (e = new i(this, "object" == typeof n && n), t.data(De, e)), "string" == typeof n) {
                        if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n](this)
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Oe
                }
            }, {
                key: "Default",
                get: function() {
                    return je
                }
            }]), i
        }();
    d.default.fn[Se] = Pe._jQueryInterface, d.default.fn[Se].Constructor = Pe, d.default.fn[Se].noConflict = function() {
        return d.default.fn[Se] = Ne, Pe._jQueryInterface
    }, t.Alert = _, t.Button = C, t.Carousel = q, t.Collapse = X, t.Dropdown = ut, t.Modal = kt, t.Popover = se, t.Scrollspy = ve, t.Tab = Ce, t.Toast = Pe, t.Tooltip = $t, t.Util = f, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=bootstrap.js.map