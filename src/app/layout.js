"use client";

import { ThemeContextProvider } from "../context/ThemeContext";
import "./globals.css";
import Navbar from "../components/layout/header/navbar/Navbar";
import Footer from "../components/layout/footer/Footer";
import ThemeProvider from "../providers/ThemeProvider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <ThemeProvider>

            <div className="container">


              <Navbar />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html >
  );
}
