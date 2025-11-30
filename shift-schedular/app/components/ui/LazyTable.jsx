"use client";
import { Suspense, lazy, useEffect } from "react";

const TableComponent = lazy(() => import("./TableComponent"));

export default function LazyTable(props) {

  useEffect(()=>{

  },[])
  return (
    <Suspense fallback={<div>Loading table...</div>}>
      <TableComponent {...props} />
    </Suspense>
  );
}
