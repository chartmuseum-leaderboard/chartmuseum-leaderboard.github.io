"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

const HighlightedNavLink = ({ href, children }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={`${navigationMenuTriggerStyle()} 
            ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  );
};

export const NavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/examples", label: "Examples" },
    {
      href: "https://github.com/Liyan06/ChartMuseum",
      label: "Code",
      external: true,
    },
    {
      href: "https://huggingface.co/datasets/lytang/ChartMuseum",
      label: "Dataset",
      external: true,
    },
  ];

  return (
    <nav className="bg-background mx-auto bg-shadow sticky top-0 z-10 pt-4">
      <div className="flex md:justify-start justify-between items-center">
        <div className="flex flex-row mx-4 items-center">
          <div className="w-[40px] h-[40px] relative mr-1">
            <Image
              src="/site-logo.png"
              alt="Green checkmark for logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex text-2xl font-bold text-primary whitespace-nowrap">
            <Link href="/">ChartMuseum</Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-lg md:text-xl font-medium p-2 ${
                      pathname === item.href && !item.external ? "font-bold" : ""
                    }`}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : ""}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2">
                <Menu size={28} /> {/* Increased menu icon size */}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.href} className="p-2">
                  <Link
                    href={item.href}
                    className={`w-full text-lg ${
                      pathname === item.href && !item.external ? "font-bold" : ""
                    }`}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : ""}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator className="my-4 w-full" />
    </nav>
  );
};
