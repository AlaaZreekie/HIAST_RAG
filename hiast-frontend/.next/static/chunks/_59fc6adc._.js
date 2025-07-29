(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/postsApi.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "formatPostDate": ()=>formatPostDate,
    "getLanguageCode": ()=>getLanguageCode,
    "getLanguageName": ()=>getLanguageName,
    "postsAPI": ()=>postsAPI
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";
// Generic API request function for posts
async function postsApiRequest(endpoint) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const url = "".concat(API_BASE_URL, "/admin/posts").concat(endpoint);
    const defaultOptions = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // Add authorization header if token exists
    const token = localStorage.getItem("admin_token");
    if (token) {
        defaultOptions.headers["Authorization"] = "Bearer ".concat(token);
    }
    // Check if user is admin before making request
    const { isAdmin } = await __turbopack_context__.r("[project]/lib/api.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
    if (!isAdmin()) {
        throw new Error("Access denied. Admin role required.");
    }
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    try {
        console.log("Making Posts API request to:", url);
        const response = await fetch(url, config);
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);
        if (!response.ok) {
            throw new Error(data.Message || "API request failed");
        }
        return data;
    } catch (error) {
        console.error("Posts API Error:", error);
        throw error;
    }
}
const postsAPI = {
    // Get all posts
    async getAllPosts () {
        const response = await postsApiRequest("/GetAllPosts", {
            method: "GET"
        });
        return response;
    },
    // Create new post
    async createPost (postData) {
        const response = await postsApiRequest("/CreatePost", {
            method: "POST",
            body: JSON.stringify(postData)
        });
        return response;
    },
    // Update existing post
    async updatePost (postData) {
        const response = await postsApiRequest("/UpdatePost", {
            method: "PUT",
            body: JSON.stringify(postData)
        });
        return response;
    },
    // Delete post
    async deletePost (postId) {
        const response = await postsApiRequest("/DeletePost", {
            method: "DELETE",
            body: JSON.stringify({
                Id: postId
            })
        });
        return response;
    },
    // Add post translation
    async addPostTranslation (translationData) {
        const response = await postsApiRequest("/AddPostTranslation", {
            method: "POST",
            body: JSON.stringify(translationData)
        });
        return response;
    },
    // Get posts by filter
    async getPostsByFilter (filterData) {
        const queryParams = new URLSearchParams();
        Object.keys(filterData).forEach((key)=>{
            if (filterData[key] !== null && filterData[key] !== undefined) {
                queryParams.append(key, filterData[key]);
            }
        });
        const response = await postsApiRequest("/GetByFilter?".concat(queryParams.toString()), {
            method: "GET"
        });
        return response;
    }
};
const formatPostDate = (dateString)=>{
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
};
const getLanguageName = (languageCode)=>{
    const languages = {
        1: "Arabic",
        2: "English",
        3: "French",
        4: "German"
    };
    return languages[languageCode] || "Unknown";
};
const getLanguageCode = (languageName)=>{
    const codes = {
        Arabic: 1,
        English: 2,
        French: 3,
        German: 4
    };
    return codes[languageName] || 2; // Default to English
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/api.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "authAPI": ()=>authAPI,
    "clearAuth": ()=>clearAuth,
    "getCurrentUserFromStorage": ()=>getCurrentUserFromStorage,
    "isAdmin": ()=>isAdmin,
    "isAuthenticated": ()=>isAuthenticated
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";
// API Response wrapper
class ApiResponse {
    constructor(success, message, statusCode, data){
        this.success = success;
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}
// Generic API request function
async function apiRequest(endpoint) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const url = "".concat(API_BASE_URL).concat(endpoint);
    const defaultOptions = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // Add authorization header if token exists
    const token = localStorage.getItem("admin_token");
    if (token) {
        defaultOptions.headers["Authorization"] = "Bearer ".concat(token);
    }
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    try {
        console.log("Making API request to:", url);
        const response = await fetch(url, config);
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);
        if (!response.ok) {
            throw new Error(data.message || "API request failed");
        }
        return data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}
const authAPI = {
    // Login user
    async login (email, password) {
        let rememberMe = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        var _response_Data_Token, _response_Data;
        const response = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                Email: email,
                Password: password,
                RememberMe: rememberMe
            })
        });
        console.log("Login response:", response);
        // Handle the actual backend response structure
        if (response.Result && ((_response_Data = response.Data) === null || _response_Data === void 0 ? void 0 : (_response_Data_Token = _response_Data.Token) === null || _response_Data_Token === void 0 ? void 0 : _response_Data_Token.Token)) {
            localStorage.setItem("admin_token", response.Data.Token.Token);
            console.log("Token set:", response.Data.Token.Token);
            localStorage.setItem("admin_user", JSON.stringify(response.Data));
        } else {
            var _response_Data1, _response_Data_Token1, _response_Data2;
            console.log("Login failed - response structure:", {
                result: response.Result,
                hasData: !!response.Data,
                hasToken: !!((_response_Data1 = response.Data) === null || _response_Data1 === void 0 ? void 0 : _response_Data1.Token),
                hasTokenToken: !!((_response_Data2 = response.Data) === null || _response_Data2 === void 0 ? void 0 : (_response_Data_Token1 = _response_Data2.Token) === null || _response_Data_Token1 === void 0 ? void 0 : _response_Data_Token1.Token)
            });
        }
        return response;
    },
    // Logout user
    async logout () {
        try {
            await apiRequest("/Auth/Logout", {
                method: "POST"
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally{
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_user");
        }
    },
    // Get current authenticated user
    async getCurrentUser () {
        return await apiRequest("/auth/GetAuthenticatedUser", {
            method: "GET"
        });
    },
    // Register new user (if needed)
    async register (username, email, password) {
        return await apiRequest("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                Username: username,
                Email: email,
                Password: password
            })
        });
    }
};
const isAuthenticated = ()=>{
    const token = localStorage.getItem("admin_token");
    return !!token;
};
const getCurrentUserFromStorage = ()=>{
    const userStr = localStorage.getItem("admin_user");
    return userStr ? JSON.parse(userStr) : null;
};
const isAdmin = ()=>{
    var _user_Token_UserRoles, _user_Token;
    const user = getCurrentUserFromStorage();
    return (user === null || user === void 0 ? void 0 : (_user_Token = user.Token) === null || _user_Token === void 0 ? void 0 : (_user_Token_UserRoles = _user_Token.UserRoles) === null || _user_Token_UserRoles === void 0 ? void 0 : _user_Token_UserRoles.includes("Admin")) || false;
};
const clearAuth = ()=>{
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/adminAuth.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "checkAdminAuth": ()=>checkAdminAuth,
    "getAdminUser": ()=>getAdminUser,
    "requireAdminAuth": ()=>requireAdminAuth
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
;
const checkAdminAuth = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAdmin"])();
};
const requireAdminAuth = (router)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])()) {
        router.push("/admin/login");
        return false;
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAdmin"])()) {
        router.push("/admin/login");
        return false;
    }
    return true;
};
const getAdminUser = ()=>{
    if (!checkAdminAuth()) {
        return null;
    }
    const userStr = localStorage.getItem("admin_user");
    return userStr ? JSON.parse(userStr) : null;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/admin/posts/create/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>CreatePostPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LanguageProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LanguageProvider.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$postsApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/postsApi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminAuth.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function CreatePostPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LanguageProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        CategoryId: "",
        Translations: [
            {
                LanguageCode: 2,
                Title: "",
                Content: ""
            }
        ]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreatePostPage.useEffect": ()=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requireAdminAuth"])(router)) {
                return;
            }
            // TODO: Load categories
            loadCategories();
        }
    }["CreatePostPage.useEffect"], [
        router
    ]);
    const loadCategories = async ()=>{
        // TODO: Implement categories API
        setCategories([
            {
                Id: "1",
                Name: "Institute News"
            },
            {
                Id: "2",
                Name: "Events"
            },
            {
                Id: "3",
                Name: "Announcements"
            }
        ]);
    };
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleTranslationChange = (index, field, value)=>{
        setFormData((prev)=>({
                ...prev,
                Translations: prev.Translations.map((trans, i)=>i === index ? {
                        ...trans,
                        [field]: value
                    } : trans)
            }));
    };
    const addTranslation = ()=>{
        setFormData((prev)=>({
                ...prev,
                Translations: [
                    ...prev.Translations,
                    {
                        LanguageCode: 2,
                        Title: "",
                        Content: ""
                    }
                ]
            }));
    };
    const removeTranslation = (index)=>{
        if (formData.Translations.length > 1) {
            setFormData((prev)=>({
                    ...prev,
                    Translations: prev.Translations.filter((_, i)=>i !== index)
                }));
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$postsApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postsAPI"].createPost(formData);
            if (response.Result) {
                router.push("/admin/posts");
            } else {
                setError(response.Message || "Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Failed to create post");
        } finally{
            setLoading(false);
        }
    };
    const languages = [
        {
            code: 1,
            name: "Arabic"
        },
        {
            code: 2,
            name: "English"
        },
        {
            code: 3,
            name: "French"
        },
        {
            code: 4,
            name: "German"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white shadow-sm border-b",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center py-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push("/admin/posts"),
                                    className: "mr-4 text-gray-600 hover:text-gray-900",
                                    children: "← Back to Posts"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/posts/create/page.js",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-gray-900",
                                    children: "Create New Post"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/posts/create/page.js",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/posts/create/page.js",
                            lineNumber: 115,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/posts/create/page.js",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/posts/create/page.js",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/posts/create/page.js",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-4xl mx-auto py-6 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-6 sm:px-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-6",
                        children: [
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/app/admin/posts/create/page.js",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "Category *"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/posts/create/page.js",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        name: "CategoryId",
                                        value: formData.CategoryId,
                                        onChange: handleInputChange,
                                        required: true,
                                        className: "admin-input",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select a category"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/posts/create/page.js",
                                                lineNumber: 153,
                                                columnNumber: 17
                                            }, this),
                                            categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: category.Id,
                                                    children: category.Name
                                                }, category.Id, false, {
                                                    fileName: "[project]/app/admin/posts/create/page.js",
                                                    lineNumber: 155,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/posts/create/page.js",
                                        lineNumber: 146,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/posts/create/page.js",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-medium text-gray-900",
                                                children: "Post Content"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/posts/create/page.js",
                                                lineNumber: 165,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: addTranslation,
                                                className: "admin-button admin-button-secondary",
                                                children: "Add Language"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/posts/create/page.js",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/posts/create/page.js",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this),
                                    formData.Translations.map((translation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "admin-card p-6 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-md font-medium text-gray-900",
                                                            children: [
                                                                "Translation ",
                                                                index + 1
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/posts/create/page.js",
                                                            lineNumber: 180,
                                                            columnNumber: 21
                                                        }, this),
                                                        formData.Translations.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>removeTranslation(index),
                                                            className: "text-red-600 hover:text-red-900",
                                                            children: "Remove"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/posts/create/page.js",
                                                            lineNumber: 184,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/posts/create/page.js",
                                                    lineNumber: 179,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                                    children: "Language *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/posts/create/page.js",
                                                                    lineNumber: 197,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: translation.LanguageCode,
                                                                    onChange: (e)=>handleTranslationChange(index, "LanguageCode", parseInt(e.target.value)),
                                                                    required: true,
                                                                    className: "admin-input",
                                                                    children: languages.map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: lang.code,
                                                                            children: lang.name
                                                                        }, lang.code, false, {
                                                                            fileName: "[project]/app/admin/posts/create/page.js",
                                                                            lineNumber: 213,
                                                                            columnNumber: 27
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/posts/create/page.js",
                                                                    lineNumber: 200,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/posts/create/page.js",
                                                            lineNumber: 196,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                                    children: "Title *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/posts/create/page.js",
                                                                    lineNumber: 222,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: translation.Title,
                                                                    onChange: (e)=>handleTranslationChange(index, "Title", e.target.value),
                                                                    required: true,
                                                                    className: "admin-input",
                                                                    placeholder: "Enter post title"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/posts/create/page.js",
                                                                    lineNumber: 225,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/posts/create/page.js",
                                                            lineNumber: 221,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                                    children: "Content *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/posts/create/page.js",
                                                                    lineNumber: 243,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                    value: translation.Content,
                                                                    onChange: (e)=>handleTranslationChange(index, "Content", e.target.value),
                                                                    required: true,
                                                                    rows: 8,
                                                                    className: "admin-input",
                                                                    placeholder: "Enter post content (HTML supported)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/admin/posts/create/page.js",
                                                                    lineNumber: 246,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/posts/create/page.js",
                                                            lineNumber: 242,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/posts/create/page.js",
                                                    lineNumber: 194,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/app/admin/posts/create/page.js",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/posts/create/page.js",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>router.push("/admin/posts"),
                                        className: "admin-button admin-button-secondary",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/posts/create/page.js",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: loading,
                                        className: "admin-button admin-button-primary",
                                        children: loading ? "Creating..." : "Create Post"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/posts/create/page.js",
                                        lineNumber: 275,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/posts/create/page.js",
                                lineNumber: 267,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/posts/create/page.js",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/posts/create/page.js",
                    lineNumber: 132,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/posts/create/page.js",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/posts/create/page.js",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(CreatePostPage, "L3ftEzt3bgOQ8K4ZI6YnH9XKr0A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LanguageProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = CreatePostPage;
var _c;
__turbopack_context__.k.register(_c, "CreatePostPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_59fc6adc._.js.map