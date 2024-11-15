import { NotFoundSvg } from "@/components/images/NotFound";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <NotFoundSvg />

      <h2 className="text-4xl font-bold text-blue-500 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-300 mb-6">
        Sorry, we couldn`&apos;`t find the page you were looking for.
      </p>
      <Link href="/">
        <p className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
          Return Home
        </p>
      </Link>
    </div>
  );
}
