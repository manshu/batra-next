import type { Metadata } from "next";
import ConsultingClient from "./consulting-client";

export const metadata: Metadata = {
  title: "Consulting",
  description: "Consulting - Himanshu Batra, PMP",
};

export default function ConsultingPage() {
  return <ConsultingClient />;
}
