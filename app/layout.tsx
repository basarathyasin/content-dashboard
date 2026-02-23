import DashboardLayout from "@/components/layout/DashboardLayout";
import Providers from "./providers/Provider";
import "./styles/globals.css";
import ThemeProvider from "./providers/ThemeProvider";
import FavoritesHydrator from "./providers/FavoritesHydrator";
import PreferencesHydrator from "./providers/PreferencesHydrator";
import LocatorJs from "./locator";





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LocatorJs />
        <Providers>
          <FavoritesHydrator />
           <PreferencesHydrator />
          <ThemeProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}