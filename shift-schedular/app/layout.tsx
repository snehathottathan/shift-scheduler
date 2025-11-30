import Image from "next/image";
import type { ReactNode } from "react";
import  StoreProvider  from './StoreProvider';
import { Nav } from "./components/Nav";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import { NavBar } from "./components/NavBar/NavBar";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
   
      <html lang="en">
        <body>
          <head>
            {/* Bootstrap Icons CDN */}
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"/>
          </head>
           <StoreProvider>
          <section className={styles.container}>

            {/* 1. Left Fixed Sidebar (Nav) */}
            <NavBar />
            <main className={styles.main}>{children}</main>


          </section>
          </StoreProvider>
        </body>
      </html>
   
  );
}
