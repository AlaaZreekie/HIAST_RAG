import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import AIChatbox from "@/components/AIChatbox";

export const metadata = {
  title: "HIAST Admin Dashboard",
  description:
    "Higher Institute for Applied Sciences and Technology Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        <AIChatbox />
      </body>
    </html>
  );
}
