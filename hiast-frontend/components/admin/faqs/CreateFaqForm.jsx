"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateFaqForm = ({ onSubmit, isLoading, error }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  return (
    <div>
      <p>FAQ Form Component</p>
      <button onClick={() => router.push("/admin/faqs")}>
        {t("faqs.form.cancel")}
      </button>
    </div>
  );
};

export default CreateFaqForm; 