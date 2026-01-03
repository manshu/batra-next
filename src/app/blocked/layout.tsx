// app/blocked/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blocked",
  description: "Not available in your region",
};

export default function BlockedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
