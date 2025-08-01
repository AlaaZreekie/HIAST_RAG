import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata = {
  title: "HIAST Admin Dashboard",
  description:
    "Higher Institute for Applied Sciences and Technology Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
