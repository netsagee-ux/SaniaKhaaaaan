import { ReactNode } from "react";
import AdminClient from "./AdminClient";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AdminClient>{children}</AdminClient>;
}