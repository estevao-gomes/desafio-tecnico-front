import { Menu } from "@/components/menu/Menu";
import { Navbar } from "@/components/navbar/Navbar";
import { CharacterContextProvider } from "@/contexts/characterContext";

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
          <main>
            <CharacterContextProvider>{children}</CharacterContextProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
