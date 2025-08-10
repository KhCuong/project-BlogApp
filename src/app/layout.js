"use client";

import { ThemeContextProvider } from "../context/ThemeContext";
import "./globals.css";

import Navbar from "../components/layout/header/navbar/Navbar";
import Footer from "../components/layout/footer/Footer";
import ThemeProvider from "../providers/ThemeProvider";
import { UserProvider } from "../components/context/UserContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <ThemeProvider>
            <UserProvider>
              <div className="container">
                <Navbar />
                {children}
                <Footer />
              </div>
            </UserProvider>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html >
  );
}
