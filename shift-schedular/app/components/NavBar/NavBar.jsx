"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import "./NavBar.scss";

export const NavBar = () => {
  const pathname = usePathname();
  const linkClassName = "link";
  const activeClassName = "active";

  return (
    <nav className="nav">
      <div></div>
      <div className="nav-div">
        <Link
          className={`${linkClassName} ${pathname === "/" ? activeClassName : ""}`}
          href="/"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <i className="bi bi-calendar4-week"></i>
            Dashboard
          </div>
        </Link>

        <Link
          className={`${linkClassName} ${pathname === "/shifts" ? activeClassName : ""}`}
          href="/shifts"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <i className="bi bi-calendar4-week"></i>
            Shifts
          </div>
        </Link>
        <Link
          className={`${linkClassName} ${pathname === "/blocks" ? activeClassName : ""}`}
          href="/blocks"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <i className="bi bi-calendar4-week"></i>
            Blocks
          </div>
        </Link>
        <Link
          className={`${linkClassName} ${pathname === "/rooms" ? activeClassName : ""}`}
          href="/rooms"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <i className="bi bi-calendar4-week"></i>
            Rooms
          </div>
        </Link>
        <Link
          className={`${linkClassName} ${pathname === "/roomschedule" ? activeClassName : ""}`}
          href="/roomschedule"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <i className="bi bi-calendar4-week"></i>
            Room Schedule
          </div>
        </Link>

      </div>
    </nav>
  );
};
