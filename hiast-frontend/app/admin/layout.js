import "./admin.css";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata = {
  title: "HIAST Admin Dashboard",
  description: "Admin dashboard for HIAST Institute",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageProvider>{children}</LanguageProvider>
    </div>
  );
}
