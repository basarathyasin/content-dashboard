import DashboardLayout from "@/components/layout/DashboardLayout";
import Providers from "./providers/Provider";
import "./styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body>
        <Providers>
          <DashboardLayout>

          {children}
          </DashboardLayout>
          </Providers>
      </body>
    </html>
  );
}