
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import { NavBar } from "./components/NavBar/NavBar";

/** */
interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          {/* <head> */}
           {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        /> */}
            {/* Bootstrap Icons CDN */}
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"/>
          {/* </head> */}
          <section className={styles.container}>

            {/* 1. Left Fixed Sidebar (Nav) */}
            <NavBar />
            <div className={styles.left}>
             <div className={styles.header}></div>
            <main className={styles.main}>{children}</main>

            </div>


          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
