/**
 * @author Sneha T
 */

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
     
      <div className="nav-div">
        
        <div className="logo-div"></div>

        <Link
          className={`${linkClassName} ${pathname === "/dashboard " ? activeClassName : ""}`}
          href="/dashboard"
        >
          <div className='link-icons' >
            <i className="bi bi-calendar4-week"></i>
            Dashboard
          </div>
        </Link>

        <Link
          className={`${linkClassName} ${pathname === "/shifts" ? activeClassName : ""}`}
          href="/shifts"
        >
          <div className='link-icons'>
            <i className="bi bi-calendar4-week"></i>
            Shifts
          </div>
        </Link>
        <Link
          className={`${linkClassName} ${pathname === "/blocks" ? activeClassName : ""}`}
          href="/blocks"
        >
          <div className='link-icons'>
            <i className="bi bi-calendar4-week"></i>
            Blocks
          </div>
        </Link>
        <Link
          className={`${linkClassName} ${pathname === "/rooms" ? activeClassName : ""}`}
          href="/rooms"
        >
          <div className='link-icons'>
            <i className="bi bi-calendar4-week"></i>
            Rooms
          </div>
        </Link>
        <Link
          className={`${linkClassName} ${pathname === "/roomschedule" ? activeClassName : ""}`}
          href="/roomschedule"
        >
          <div className='link-icons'>
            <i className="bi bi-calendar4-week"></i>
            Room Schedule
          </div>
        </Link>

      </div>
    </nav>
  );
};
