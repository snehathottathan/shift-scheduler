"use client";
import { Suspense, lazy } from "react";

const TableComponent = lazy(() => import("./TableComponent"));

export default function LazyTable(props) {
  return (
    <Suspense fallback={<div>Loading table...</div>}>
      <TableComponent {...props} />
    </Suspense>
  );
}
