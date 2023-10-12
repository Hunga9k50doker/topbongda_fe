"use client"; // Error components must be Client Components
import Custom404 from "@/components/Pages/Error/404";
export default function Error({ error }: { error: Error }) {
  return <Custom404 error={error} />;
}
