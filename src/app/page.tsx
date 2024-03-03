import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VscDebugStart } from "react-icons/vsc";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center bg-[linear-gradient(72.68deg,_#002CC4_28.97%,_#5468FF_145.47%)] mx-auto md:px-10 md:py-5 p-3 max-w-[1920px]">
      <main className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-6 font-bold text-4xl text-center text-white lg:text-5xl">
          Welcome to JSON Schema Tour!
        </h1>
        <p className="mb-2 font-bold text-center text-white text-xl">
          This interactive tour will guide you through learning JSON Schema.
        </p>
        <p className="opacity-80 max-w-[600px] text-center text-white">
          JSON Schema is a powerful tool for defining the structure, content,
          and validation rules of JSON (JavaScript Object Notation) documents.
          It provides a standardized way to describe the expected shape and
          constraints of JSON data, enabling developers to ensure data
          consistency and integrity across different applications and systems.
        </p>
        <div className="flex gap-3 mt-5">
          <Link href="/welcome">
            <Button
              size="lg"
              className="flex gap-2 border-2 dark:border-white bg-transparent dark:text-white"
            >
              <VscDebugStart size={24} />
              Start a tour
            </Button>
          </Link>
          <Link href="/welcome">
            <Button size="lg" variant="outline">
              Know More
            </Button>
          </Link>
        </div>
      </main>
    </section>
  );
}
