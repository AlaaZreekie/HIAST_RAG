"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const DashboardSidebar = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  return (
    <aside
      className={`w-64 bg-white shadow-sm min-h-screen ${
        lang === "ar" ? "order-2" : "order-1"
      }`}
    >
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {/* Dashboard */}
          <button
            onClick={() => router.push("/admin/dashboard")}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 w-full ${
              lang === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            {lang === "ar" ? (
              <>
                {t("dashboard.nav.dashboard")}
                <svg
                  className="ml-3 h-6 w-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                  />
                </svg>
              </>
            ) : (
              <>
                <svg
                  className="mr-3 h-6 w-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                  />
                </svg>
                {t("dashboard.nav.dashboard")}
              </>
            )}
          </button>

          {/* Posts Management */}
          <button
            onClick={() => router.push("/admin/posts")}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full ${
              lang === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            {lang === "ar" ? (
              <>
                {t("dashboard.nav.posts")}
                <svg
                  className="ml-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </>
            ) : (
              <>
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {t("dashboard.nav.posts")}
              </>
            )}
          </button>

          {/* Categories */}
          <button
            onClick={() => router.push("/admin/categories")}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full ${
              lang === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            {lang === "ar" ? (
              <>
                {t("dashboard.nav.categories")}
                <svg
                  className="ml-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </>
            ) : (
              <>
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {t("dashboard.nav.categories")}
              </>
            )}
          </button>

          {/* Users */}
          <button
            onClick={() => router.push("/admin/users")}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full ${
              lang === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            {lang === "ar" ? (
              <>
                {t("dashboard.nav.users")}
                <svg
                  className="ml-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </>
            ) : (
              <>
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                {t("dashboard.nav.users")}
              </>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={() => router.push("/admin/settings")}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full ${
              lang === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            {lang === "ar" ? (
              <>
                {t("dashboard.nav.settings")}
                <svg
                  className="ml-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </>
            ) : (
              <>
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {t("dashboard.nav.settings")}
              </>
            )}
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar; 