try {
    var h = Object.defineProperty;
    var F = Object.getOwnPropertyDescriptor;
    var G = Object.getOwnPropertyNames;
    var K = Object.prototype.hasOwnProperty;
    var p = (e, t) => () => (e && (t = e(e = 0)), t);
    var C = (e, t) => () => (t || e((t = {exports: {}}).exports, t), t.exports), S = (e, t) => {
        for (var r in t) h(e, r, {get: t[r], enumerable: !0})
    }, Y = (e, t, r, o) => {
        if (t && typeof t == "object" || typeof t == "function") for (let u of G(t)) !K.call(e, u) && u !== r && h(e, u, {
            get: () => t[u],
            enumerable: !(o = F(t, u)) || o.enumerable
        });
        return e
    };
    var T = e => Y(h({}, "__esModule", {value: !0}), e);
    var a = p(() => {
    });
    var n = p(() => {
    });
    var l = p(() => {
    });
    var I = {};
    S(I, {addons: () => V, default: () => U, mockChannel: () => $, types: () => z});
    var U, V, z, $, R = p(() => {
        a();
        n();
        l();
        U = __STORYBOOKADDONS__, {addons: V, types: z, mockChannel: $} = __STORYBOOKADDONS__
    });
    var A = C(s => {
        "use strict";
        a();
        n();
        l();
        Object.defineProperty(s, "__esModule", {value: !0});
        s.TOOL_ID = s.EVENTS = s.ADDON_ID = void 0;
        var m = "storybook/tailwind-dark-mode";
        s.ADDON_ID = m;
        var Q = "".concat(m, "/tool");
        s.TOOL_ID = Q;
        var Z = {RESULT: "".concat(m, "/result"), REQUEST: "".concat(m, "/request"), CLEAR: "".concat(m, "/clear")};
        s.EVENTS = Z
    });
    var M = {};
    S(M, {
        Children: () => X,
        Component: () => j,
        Fragment: () => ee,
        Profiler: () => te,
        PureComponent: () => re,
        StrictMode: () => oe,
        Suspense: () => ae,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => ne,
        cloneElement: () => le,
        createContext: () => ue,
        createElement: () => ce,
        createFactory: () => ie,
        createRef: () => se,
        default: () => J,
        forwardRef: () => pe,
        isValidElement: () => de,
        lazy: () => fe,
        memo: () => ye,
        useCallback: () => _e,
        useContext: () => me,
        useDebugValue: () => Oe,
        useEffect: () => Se,
        useImperativeHandle: () => Te,
        useLayoutEffect: () => be,
        useMemo: () => ve,
        useReducer: () => he,
        useRef: () => Ae,
        useState: () => De,
        version: () => Ee
    });
    var J, X, j, ee, te, re, oe, ae, ne, le, ue, ce, ie, se, pe, de, fe, ye, _e, me, Oe, Se, Te, be, ve, he, Ae, De, Ee, k = p(() => {
        a();
        n();
        l();
        J = __REACT__, {
            Children: X,
            Component: j,
            Fragment: ee,
            Profiler: te,
            PureComponent: re,
            StrictMode: oe,
            Suspense: ae,
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ne,
            cloneElement: le,
            createContext: ue,
            createElement: ce,
            createFactory: ie,
            createRef: se,
            forwardRef: pe,
            isValidElement: de,
            lazy: fe,
            memo: ye,
            useCallback: _e,
            useContext: me,
            useDebugValue: Oe,
            useEffect: Se,
            useImperativeHandle: Te,
            useLayoutEffect: be,
            useMemo: ve,
            useReducer: he,
            useRef: Ae,
            useState: De,
            version: Ee
        } = __REACT__
    });
    var L = {};
    S(L, {
        ActiveTabs: () => Ce,
        Consumer: () => Ie,
        ManagerContext: () => Re,
        Provider: () => Me,
        addons: () => ke,
        combineParameters: () => Le,
        controlOrMetaKey: () => Pe,
        controlOrMetaSymbol: () => Ne,
        default: () => ge,
        eventMatchesShortcut: () => Be,
        eventToShortcut: () => we,
        isMacLike: () => xe,
        isShortcutTaken: () => We,
        keyToSymbol: () => qe,
        merge: () => He,
        mockChannel: () => Fe,
        optionOrAltSymbol: () => Ge,
        shortcutMatchesShortcut: () => Ke,
        shortcutToHumanString: () => Ye,
        types: () => Ue,
        useAddonState: () => Ve,
        useArgTypes: () => ze,
        useArgs: () => $e,
        useChannel: () => Qe,
        useGlobalTypes: () => Ze,
        useGlobals: () => Je,
        useParameter: () => Xe,
        useSharedState: () => je,
        useStoryPrepared: () => et,
        useStorybookApi: () => tt,
        useStorybookState: () => rt
    });
    var ge, Ce, Ie, Re, Me, ke, Le, Pe, Ne, Be, we, xe, We, qe, He, Fe, Ge, Ke, Ye, Ue, Ve, ze, $e, Qe, Ze, Je, Xe, je, et, tt, rt, P = p(() => {
        a();
        n();
        l();
        ge = __STORYBOOKAPI__, {
            ActiveTabs: Ce,
            Consumer: Ie,
            ManagerContext: Re,
            Provider: Me,
            addons: ke,
            combineParameters: Le,
            controlOrMetaKey: Pe,
            controlOrMetaSymbol: Ne,
            eventMatchesShortcut: Be,
            eventToShortcut: we,
            isMacLike: xe,
            isShortcutTaken: We,
            keyToSymbol: qe,
            merge: He,
            mockChannel: Fe,
            optionOrAltSymbol: Ge,
            shortcutMatchesShortcut: Ke,
            shortcutToHumanString: Ye,
            types: Ue,
            useAddonState: Ve,
            useArgTypes: ze,
            useArgs: $e,
            useChannel: Qe,
            useGlobalTypes: Ze,
            useGlobals: Je,
            useParameter: Xe,
            useSharedState: je,
            useStoryPrepared: et,
            useStorybookApi: tt,
            useStorybookState: rt
        } = __STORYBOOKAPI__
    });
    var N = {};
    S(N, {
        A: () => at,
        ActionBar: () => nt,
        AddonPanel: () => lt,
        Badge: () => ut,
        Bar: () => ct,
        Blockquote: () => it,
        Button: () => st,
        Code: () => pt,
        DL: () => dt,
        Div: () => ft,
        DocumentWrapper: () => yt,
        ErrorFormatter: () => _t,
        FlexBar: () => mt,
        Form: () => Ot,
        H1: () => St,
        H2: () => Tt,
        H3: () => bt,
        H4: () => vt,
        H5: () => ht,
        H6: () => At,
        HR: () => Dt,
        IconButton: () => Et,
        IconButtonSkeleton: () => gt,
        Icons: () => Ct,
        Img: () => It,
        LI: () => Rt,
        Link: () => Mt,
        ListItem: () => kt,
        Loader: () => Lt,
        OL: () => Pt,
        P: () => Nt,
        Placeholder: () => Bt,
        Pre: () => wt,
        ResetWrapper: () => xt,
        ScrollArea: () => Wt,
        Separator: () => qt,
        Spaced: () => Ht,
        Span: () => Ft,
        StorybookIcon: () => Gt,
        StorybookLogo: () => Kt,
        Symbols: () => Yt,
        SyntaxHighlighter: () => Ut,
        TT: () => Vt,
        TabBar: () => zt,
        TabButton: () => $t,
        TabWrapper: () => Qt,
        Table: () => Zt,
        Tabs: () => Jt,
        TabsState: () => Xt,
        TooltipLinkList: () => jt,
        TooltipMessage: () => er,
        TooltipNote: () => tr,
        UL: () => rr,
        WithTooltip: () => or,
        WithTooltipPure: () => ar,
        Zoom: () => nr,
        codeCommon: () => lr,
        components: () => ur,
        createCopyToClipboardFunction: () => cr,
        default: () => ot,
        getStoryHref: () => ir,
        icons: () => sr,
        interleaveSeparators: () => pr,
        nameSpaceClassNames: () => dr,
        resetComponents: () => fr,
        withReset: () => yr
    });
    var ot, at, nt, lt, ut, ct, it, st, pt, dt, ft, yt, _t, mt, Ot, St, Tt, bt, vt, ht, At, Dt, Et, gt, Ct, It, Rt, Mt, kt, Lt, Pt, Nt, Bt, wt, xt,
        Wt, qt, Ht, Ft, Gt, Kt, Yt, Ut, Vt, zt, $t, Qt, Zt, Jt, Xt, jt, er, tr, rr, or, ar, nr, lr, ur, cr, ir, sr, pr, dr, fr, yr, B = p(() => {
            a();
            n();
            l();
            ot = __STORYBOOKCOMPONENTS__, {
                A: at,
                ActionBar: nt,
                AddonPanel: lt,
                Badge: ut,
                Bar: ct,
                Blockquote: it,
                Button: st,
                Code: pt,
                DL: dt,
                Div: ft,
                DocumentWrapper: yt,
                ErrorFormatter: _t,
                FlexBar: mt,
                Form: Ot,
                H1: St,
                H2: Tt,
                H3: bt,
                H4: vt,
                H5: ht,
                H6: At,
                HR: Dt,
                IconButton: Et,
                IconButtonSkeleton: gt,
                Icons: Ct,
                Img: It,
                LI: Rt,
                Link: Mt,
                ListItem: kt,
                Loader: Lt,
                OL: Pt,
                P: Nt,
                Placeholder: Bt,
                Pre: wt,
                ResetWrapper: xt,
                ScrollArea: Wt,
                Separator: qt,
                Spaced: Ht,
                Span: Ft,
                StorybookIcon: Gt,
                StorybookLogo: Kt,
                Symbols: Yt,
                SyntaxHighlighter: Ut,
                TT: Vt,
                TabBar: zt,
                TabButton: $t,
                TabWrapper: Qt,
                Table: Zt,
                Tabs: Jt,
                TabsState: Xt,
                TooltipLinkList: jt,
                TooltipMessage: er,
                TooltipNote: tr,
                UL: rr,
                WithTooltip: or,
                WithTooltipPure: ar,
                Zoom: nr,
                codeCommon: lr,
                components: ur,
                createCopyToClipboardFunction: cr,
                getStoryHref: ir,
                icons: sr,
                interleaveSeparators: pr,
                nameSpaceClassNames: dr,
                resetComponents: fr,
                withReset: yr
            } = __STORYBOOKCOMPONENTS__
        });
    var W = C(v => {
        "use strict";
        a();
        n();
        l();

        function D(e) {
            "@babel/helpers - typeof";
            return D = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
                return typeof t
            } : function (t) {
                return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, D(e)
        }

        Object.defineProperty(v, "__esModule", {value: !0});
        v.Tool = void 0;
        var b = Sr((k(), T(M))), _r = (P(), T(L)), mr = (B(), T(N)), Or = A();

        function x(e) {
            if (typeof WeakMap != "function") return null;
            var t = new WeakMap, r = new WeakMap;
            return (x = function (u) {
                return u ? r : t
            })(e)
        }

        function Sr(e, t) {
            if (!t && e && e.__esModule) return e;
            if (e === null || D(e) !== "object" && typeof e != "function") return {default: e};
            var r = x(t);
            if (r && r.has(e)) return r.get(e);
            var o = {}, u = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var c in e) if (c !== "default" && Object.prototype.hasOwnProperty.call(e, c)) {
                var i = u ? Object.getOwnPropertyDescriptor(e, c) : null;
                i && (i.get || i.set) ? Object.defineProperty(o, c, i) : o[c] = e[c]
            }
            return o.default = e, r && r.set(e, o), o
        }

        function Tr(e, t) {
            return Ar(e) || hr(e, t) || vr(e, t) || br()
        }

        function br() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
        }

        function vr(e, t) {
            if (e) {
                if (typeof e == "string") return w(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
                if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return w(e, t)
            }
        }

        function w(e, t) {
            (t == null || t > e.length) && (t = e.length);
            for (var r = 0, o = new Array(t); r < t; r++) o[r] = e[r];
            return o
        }

        function hr(e, t) {
            var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
            if (r != null) {
                var o, u, c, i, _ = [], O = !0, g = !1;
                try {
                    if (c = (r = r.call(e)).next, t === 0) {
                        if (Object(r) !== r) return;
                        O = !1
                    } else for (; !(O = (o = c.call(r)).done) && (_.push(o.value), _.length !== t); O = !0) ;
                } catch (H) {
                    g = !0, u = H
                } finally {
                    try {
                        if (!O && r.return != null && (i = r.return(), Object(i) !== i)) return
                    } finally {
                        if (g) throw u
                    }
                }
                return _
            }
        }

        function Ar(e) {
            if (Array.isArray(e)) return e
        }

        var Dr = function () {
            var t = (0, _r.useGlobals)(), r = Tr(t, 2), o = r[0], u = o.darkMode, c = o.className, i = r[1], _ = (0, b.useCallback)(function () {
                return i({darkMode: !u, className: c})
            }, [u, c]);
            return b.default.createElement(mr.IconButton, {
                key: Or.TOOL_ID,
                active: u,
                title: "Enable dark mode",
                onClick: _
            }, b.default.createElement("svg", {viewBox: "0 0 24 24"}, b.default.createElement("path", {
                fill: "currentColor",
                d: "M7.746 23.962c-1.216 0-2.426-.187-3.596-.554-.314-.099-.525-.386-.525-.715s.211-.617.525-.715c4.396-1.384 7.349-5.409 7.35-10.018-.001-4.608-2.954-8.634-7.35-10.018-.315-.099-.526-.387-.526-.716 0-.329.211-.617.525-.715 1.177-.37 2.392-.557 3.61-.557 1.909 0 3.825.473 5.539 1.368 2.842 1.483 4.935 3.984 5.896 7.042.959 3.053.67 6.302-.815 9.146-1.485 2.845-3.984 4.939-7.037 5.898-1.171.367-2.381.554-3.596.554zm-.868-1.537c.289.024.578.036.867.036 1.063 0 2.122-.163 3.147-.485 5.523-1.735 8.606-7.64 6.871-13.164-.841-2.676-2.673-4.864-5.159-6.162-1.5-.783-3.176-1.197-4.846-1.197-.294 0-.589.013-.883.038 3.756 2.101 6.123 6.087 6.124 10.468 0 4.38-2.366 8.365-6.121 10.466z"
            })))
        };
        v.Tool = Dr
    });
    a();
    n();
    l();
    a();
    n();
    l();
    var E = (R(), T(I)), q = A(), Er = W();
    E.addons.register(q.ADDON_ID, function () {
        E.addons.add(q.TOOL_ID, {
            type: E.types.TOOL, title: "Tailwind dark mode", match: function (t) {
                var r = t.viewMode;
                return !!(r && r.match(/^(story|docs)$/))
            }, render: Er.Tool
        })
    });
} catch (e) {
    console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
//# sourceMappingURL=manager-bundle.js.map
