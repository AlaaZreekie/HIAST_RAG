"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import QuickActionCard from "./QuickActionCard";

const QuickActionsGrid = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  const quickActionsData = [
    {
      title: "dashboard.actions.createPost",
      description: "dashboard.actions.createPostDesc",
      icon: (
        <svg
          className="w-5 h-5 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      onClick: () => router.push("/admin/posts/create")
    },
    {
      title: "dashboard.actions.manageCategories",
      description: "dashboard.actions.manageCategoriesDesc",
      icon: (
        <svg
          className="w-5 h-5 text-indigo-600"
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
      ),
      onClick: () => router.push("/admin/categories")
    },
    {
      title: "dashboard.actions.viewUsers",
      description: "dashboard.actions.viewUsersDesc",
      icon: (
        <svg
          className="w-5 h-5 text-indigo-600"
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
      ),
      onClick: () => router.push("/admin/users")
    },
    {
      title: "dashboard.actions.settings",
      description: "dashboard.actions.settingsDesc",
      icon: (
        <svg
          className="w-5 h-5 text-indigo-600"
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
      ),
      onClick: () => router.push("/admin/settings")
    }
  ];

  const displayActions = lang === "ar" ? [...quickActionsData].reverse() : quickActionsData;

  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold text-gray-900 ${
        lang === "ar" ? "text-right" : "text-left"
      }`}>
        {t("dashboard.actions.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayActions.map((action, index) => (
          <div key={index} onClick={action.onClick}>
            <QuickActionCard
              icon={action.icon}
              title={action.title}
              description={action.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid; 