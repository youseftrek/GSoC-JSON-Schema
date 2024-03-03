import Image from "next/image";
import Link from "next/link";
import React from "react";
import { navLinks } from "../../../constants";
import { Button } from "../ui/button";
import { IoMdSearch } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { ModeToggle } from "../ui/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Nav = () => {
  return (
    <header className="top-0 z-50 fixed bg-white dark:bg-background drop-shadow-md shadow-xl w-full">
      <nav className="flex justify-between items-center mx-auto md:px-10 md:py-5 p-3 border-b border-border/40 w-full max-w-[1920px]">
        <div>
          <Link className="block dark:hidden" href="/">
            <Image
              src="/assets/logo-light.svg"
              alt="logo"
              width={144}
              height={48}
            />
          </Link>
          <Link className="dark:block hidden" href="/">
            <Image
              src="/assets/logo-dark.svg"
              alt="logo"
              width={144}
              height={48}
            />
          </Link>
        </div>
        {/* DESKTOP NAV LINKS */}
        <div className="flex gap-2">
          <div className="lg:flex gap-2 hidden">
            {navLinks.map((navLink) => (
              <Link href={navLink.path} key={navLink.name}>
                <Button
                  variant="link"
                  className="font-bold text-gray-600 hover:text-primary dark:hover:text-primary dark:text-gray-300"
                >
                  {navLink.name}
                </Button>
              </Link>
            ))}

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="flex gap-2">
                  <IoMdSearch size={24} /> Search
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-3">
                    Type Something to search
                  </DialogTitle>
                  <DialogDescription>
                    <div className="flex gap-2 w-full">
                      <Input />
                      <Button size="icon" className="flex-shrink-0">
                        <IoMdSearch size={24} />
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Link
              target="blank"
              href="https://github.com/json-schema-org/json-schema-spec"
            >
              <Button className="flex gap-2">
                <FaGithub size={24} />
                Star on Github
              </Button>
            </Link>
          </div>

          <ModeToggle />
          {/* MOBILE MENU */}
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="icon">
                  <TbMenuDeep size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle className="flex mt-8 mb-5">
                    <div className="flex gap-2 bg-secondar w-full">
                      <Input placeholder="Search..." />
                      <Button size="icon" className="flex-shrink-0">
                        <IoMdSearch size={24} />
                      </Button>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="flex flex-col gap-2">
                    {navLinks.map((navLink) => (
                      <Link href={navLink.path} key={navLink.name}>
                        <Button
                          variant="ghost"
                          className="w-full font-bold text-gray-600 hover:text-primary dark:hover:text-primary dark:text-gray-300"
                        >
                          {navLink.name}
                        </Button>
                      </Link>
                    ))}
                    <Button className="flex gap-2 mt-5">
                      <FaGithub size={24} />
                      Star on Github
                    </Button>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
