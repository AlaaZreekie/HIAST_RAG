module.exports = {

"[project]/locales/ar.json (json)": ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"login.title\":\"تسجيل الدخول إلى لوحة الإدارة\",\"login.email\":\"البريد الإلكتروني\",\"login.password\":\"كلمة المرور\",\"login.rememberMe\":\"تذكرني\",\"login.button\":\"تسجيل الدخول\",\"login.loading\":\"جاري تسجيل الدخول...\",\"login.error.requiredEmail\":\"البريد الإلكتروني مطلوب\",\"login.error.requiredPassword\":\"كلمة المرور مطلوبة\",\"login.error.invalidEmail\":\"يرجى إدخال بريد إلكتروني صحيح\",\"login.support\":\"تواجه مشكلة في تسجيل الدخول؟\",\"login.contactSupport\":\"تواصل مع الدعم\",\"dashboard.welcome\":\"مرحباً، {name}\",\"dashboard.title\":\"لوحة إدارة المعهد العالي\",\"dashboard.signOut\":\"تسجيل الخروج\",\"dashboard.stats.posts\":\"المشاركات\",\"dashboard.stats.courses\":\"الدورات\",\"dashboard.stats.users\":\"المستخدمون\",\"dashboard.stats.views\":\"المشاهدات\",\"dashboard.quickActions\":\"إجراءات سريعة\",\"dashboard.createPost\":\"إنشاء مشاركة\",\"dashboard.addCourse\":\"إضافة دورة\",\"dashboard.uploadMedia\":\"رفع ملفات\",\"dashboard.createPostDesc\":\"إضافة منشور جديد\",\"dashboard.addCourseDesc\":\"إنشاء دورة جديدة\",\"dashboard.uploadMediaDesc\":\"إضافة صور وملفات\",\"dashboard.loading\":\"جاري تحميل لوحة التحكم...\"}"));}),
"[project]/locales/en.json (json)": ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"login.title\":\"Sign in to access the admin panel\",\"login.email\":\"Email Address\",\"login.password\":\"Password\",\"login.rememberMe\":\"Remember me\",\"login.button\":\"Sign in\",\"login.loading\":\"Signing in...\",\"login.error.requiredEmail\":\"Email is required\",\"login.error.requiredPassword\":\"Password is required\",\"login.error.invalidEmail\":\"Please enter a valid email address\",\"login.support\":\"Having trouble signing in?\",\"login.contactSupport\":\"Contact support\",\"dashboard.welcome\":\"Welcome, {name}\",\"dashboard.title\":\"HIAST Admin Dashboard\",\"dashboard.signOut\":\"Sign Out\",\"dashboard.stats.posts\":\"Posts\",\"dashboard.stats.courses\":\"Courses\",\"dashboard.stats.users\":\"Users\",\"dashboard.stats.views\":\"Views\",\"dashboard.quickActions\":\"Quick Actions\",\"dashboard.createPost\":\"Create Post\",\"dashboard.addCourse\":\"Add Course\",\"dashboard.uploadMedia\":\"Upload Media\",\"dashboard.createPostDesc\":\"Add a new blog post\",\"dashboard.addCourseDesc\":\"Create a new course\",\"dashboard.uploadMediaDesc\":\"Add images and files\",\"dashboard.loading\":\"Loading dashboard...\"}"));}),
"[project]/components/LanguageProvider.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "LanguageProvider": ()=>LanguageProvider,
    "useLanguage": ()=>useLanguage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createContext"])();
const defaultLang = "undefined" !== "undefined" && localStorage.getItem("lang") || "ar";
function loadLocale(lang) {
    try {
        return __turbopack_context__.f({
            "../locales/ar.json": {
                id: ()=>"[project]/locales/ar.json (json)",
                module: ()=>__turbopack_context__.r("[project]/locales/ar.json (json)")
            },
            "../locales/en.json": {
                id: ()=>"[project]/locales/en.json (json)",
                module: ()=>__turbopack_context__.r("[project]/locales/en.json (json)")
            }
        })(`../locales/${lang}.json`);
    } catch  {
        return __turbopack_context__.r("[project]/locales/ar.json (json)");
    }
}
const LanguageProvider = ({ children })=>{
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(defaultLang);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(loadLocale(defaultLang));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem("lang", lang);
        setMessages(loadLocale(lang));
    }, [
        lang
    ]);
    const t = (key, vars = {})=>{
        let text = messages[key] || key;
        Object.keys(vars).forEach((k)=>{
            text = text.replace(`{${k}}`, vars[k]);
        });
        return text;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            lang,
            setLang,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/LanguageProvider.jsx",
        lineNumber: 33,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useLanguage = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
}),
"[project]/app/layout.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>RootLayout,
    "metadata": ()=>metadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LanguageProvider$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LanguageProvider.jsx [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LanguageProvider$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LanguageProvider"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/app/layout.js",
                lineNumber: 13,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/layout.js",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/layout.js",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),

};

//# sourceMappingURL=_c0467be3._.js.map