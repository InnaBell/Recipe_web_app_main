import Link from "next/link";
import { HeaderAvatar } from "./header-avatar";
import { Playfair_Display } from "next/font/google";
import { AlignJustify } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["800"],
  style: "italic",
});

export const Header = () => {
  return (
    <section className="px-8 lg:px-11">
      <div className="mx-auto border-b py-7">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div>
              <Link
                href={"/"}
                className={`${playfair.className} text-2xl leading-none`}
              >
                Cookie
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-x-9">
            <Link
              className={cn(
                "flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors",
                navigationMenuTriggerStyle
              )}
              href={"/"}
            >
              Home
            </Link>
            <Link
              className={cn(
                "flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors",
                navigationMenuTriggerStyle
              )}
              href={"#"}
            >
              Suche
            </Link>
          </div>

          <HeaderAvatar />
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href={"/"}
                className={`${playfair.className} text-2xl leading-none`}
              >
                Cookie
              </Link>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"ghost"} className="hover:bg-transparent">
                  <AlignJustify style={{ width: "24px", height: "24px" }} />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="pb-6">
                    <div className="flex items-center gap-2">
                      <Link
                        href={"/"}
                        className={`${playfair.className} text-xl leading-none`}
                      >
                        Cookie
                      </Link>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-8 flex flex-col gap-4">
                  <Link
                    className={cn(
                      "flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors",
                      navigationMenuTriggerStyle
                    )}
                    href={"/"}
                  >
                    Home
                  </Link>
                  <Link
                    className={cn(
                      "flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors",
                      navigationMenuTriggerStyle
                    )}
                    href={"#"}
                  >
                    Suche
                  </Link>

                  <HeaderAvatar containerClassName="flex-col gap-y-4" />
                </div>

                <div className="border-t pt-4">
                  <div className="flex flex-col gap-4">
                    <Link
                      className={cn(
                        "flex items-center gap-x-1 text-sm/6 text-muted-foreground hover:text-primary transition-colors",
                        navigationMenuTriggerStyle
                      )}
                      href={"#"}
                    >
                      AGB
                    </Link>
                    <Link
                      className={cn(
                        "flex items-center gap-x-1 text-sm/6 text-muted-foreground hover:text-primary transition-colors",
                        navigationMenuTriggerStyle
                      )}
                      href={"#"}
                    >
                      Impressum
                    </Link>
                    <Link
                      className={cn(
                        "flex items-center gap-x-1 text-sm/6 text-muted-foreground hover:text-primary transition-colors",
                        navigationMenuTriggerStyle
                      )}
                      href={"#"}
                    >
                      Datenschutz
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
