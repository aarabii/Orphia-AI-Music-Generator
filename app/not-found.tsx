"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import { House } from "lucide-react";

import notFoundSvg from "@/assets/notFound.svg";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section>
      <div className="bg-black text-zinc-100">
        <div className="flex h-screen">
          <div className="m-auto text-center">
            <div>
              <Image src={notFoundSvg} alt="Not Found" className="mx-auto" />
            </div>
            <p className="gap-3 mt-2 leading-5 text-sm md:text-base text-zinc-300 p-2 mb-4">
              Oops! The page `
              <code className="rounded bg-zinc-800 bg-opacity-50 p-1 my-1 text-lg">
                {pathname}
              </code>
              ` you are trying to look for does not exist.
              <br />
              It might have been moved or deleted.
              <br />
            </p>
            <div className="flex flex-1 justify-center items-center text-center ">
              <button
                onClick={() => router.push("/")}
                className="bg-transparent hover:bg-zinc-300 text-zinc-300 hover:text-zinc-800 rounded shadow hover:shadow-lg py-2 px-4 border border-zinc-300 hover:border-transparent"
              >
                <House className="inline-block w-6 h-6" />
                <span className="ml-2">Take me home!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
