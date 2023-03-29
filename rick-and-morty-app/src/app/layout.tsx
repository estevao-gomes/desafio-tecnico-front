import { Menu } from "@/components/menu/Menu";
import { Navbar } from "@/components/navbar/Navbar";


import "./globals.css";


export const metadata = {
  title: "Rick and Morty Characters",
  description: "Rick and Morty interactive characters list",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div id="container">
          <Menu />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
