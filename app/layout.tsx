import DashboardLayout from "@/components/layout/DashboardLayout";
import Providers from "./providers/Provider";
import "./styles/globals.css";
import ThemeProvider from "./providers/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}