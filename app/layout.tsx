import DashboardLayout from "@/components/layout/DashboardLayout";
import Providers from "./providers/Provider";
import "./styles/globals.css";
import ThemeProvider from "./providers/ThemeProvider";
import FavoritesHydrator from "./providers/FavoritesHydrator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <FavoritesHydrator />
          <ThemeProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}