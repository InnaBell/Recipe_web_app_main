import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["800"],
  style: "italic",
});

export const Footer = () => {
  return (
    <section className="px-8 py-7 lg:px-11">
      <div className="mx-auto">
        <footer>
          <div className="mx-auto">
            <nav className="justify-between flex flex-col gap-4 md:flex-row md:items-center">
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

              <div className="flex items-center gap-x-3">
                <Link
                  className={cn(
                    "flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors",
                    navigationMenuTriggerStyle
                  )}
                  href={"#"}
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link
                  className={cn(
                    "flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors",
                    navigationMenuTriggerStyle
                  )}
                  href={"#"}
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>

                <Link
                  className={cn(
                    "flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors",
                    navigationMenuTriggerStyle
                  )}
                  href={"#"}
                >
                  <span className="sr-only">TikTok</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.6 5.82C15.9166 5.03953 15.5399 4.0374 15.54 3H12.45V15.4C12.4266 16.0712 12.1435 16.7071 11.6603 17.1735C11.1771 17.6399 10.5316 17.9004 9.85997 17.9C8.43997 17.9 7.25997 16.74 7.25997 15.3C7.25997 13.58 8.91997 12.29 10.63 12.82V9.66C7.17997 9.2 4.15997 11.88 4.15997 15.3C4.15997 18.63 6.91997 21 9.84997 21C12.99 21 15.54 18.45 15.54 15.3V9.01C16.793 9.90985 18.2973 10.3926 19.84 10.39V7.3C19.84 7.3 17.96 7.39 16.6 5.82Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>

                <Link
                  className={cn(
                    "flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors",
                    navigationMenuTriggerStyle
                  )}
                  href={"#"}
                >
                  <span className="sr-only">Pinterest</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.04 21.54C10 21.83 10.97 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 16.25 4.67 19.9 8.44 21.34C8.35 20.56 8.26 19.27 8.44 18.38L9.59 13.44C9.59 13.44 9.3 12.86 9.3 11.94C9.3 10.56 10.16 9.53 11.14 9.53C12 9.53 12.4 10.16 12.4 10.97C12.4 11.83 11.83 13.06 11.54 14.24C11.37 15.22 12.06 16.08 13.06 16.08C14.84 16.08 16.22 14.18 16.22 11.5C16.22 9.1 14.5 7.46 12.03 7.46C9.21 7.46 7.55 9.56 7.55 11.77C7.55 12.63 7.83 13.5 8.29 14.07C8.38 14.13 8.38 14.21 8.35 14.36L8.06 15.45C8.06 15.62 7.95 15.68 7.78 15.56C6.5 15 5.76 13.18 5.76 11.71C5.76 8.55 8 5.68 12.32 5.68C15.76 5.68 18.44 8.15 18.44 11.43C18.44 14.87 16.31 17.63 13.26 17.63C12.29 17.63 11.34 17.11 11 16.5L10.33 18.87C10.1 19.73 9.47 20.88 9.04 21.57V21.54Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
                <Link
                  className={cn(
                    "flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors",
                    navigationMenuTriggerStyle
                  )}
                  href={"#"}
                >
                  <span className="sr-only">Youtube</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10 15L15.19 12L10 9V15ZM21.56 7.17C21.69 7.64 21.78 8.27 21.84 9.07C21.91 9.87 21.94 10.56 21.94 11.16L22 12C22 14.19 21.84 15.8 21.56 16.83C21.31 17.73 20.73 18.31 19.83 18.56C19.36 18.69 18.5 18.78 17.18 18.84C15.88 18.91 14.69 18.94 13.59 18.94L12 19C7.81 19 5.2 18.84 4.17 18.56C3.27 18.31 2.69 17.73 2.44 16.83C2.31 16.36 2.22 15.73 2.16 14.93C2.09 14.13 2.06 13.44 2.06 12.84L2 12C2 9.81 2.16 8.2 2.44 7.17C2.69 6.27 3.27 5.69 4.17 5.44C4.64 5.31 5.5 5.22 6.82 5.16C8.12 5.09 9.31 5.06 10.41 5.06L12 5C16.19 5 18.8 5.16 19.83 5.44C20.73 5.69 21.31 6.27 21.56 7.17Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </div>
            </nav>
          </div>

          <div className="mt-8 pt-8 flex flex-col justify-center gap-4 border-t text-sm text-muted-foreground md:flex-row md:items-center">
            <p>© 2024 Cookie.</p>
            <Link
              className="flex items-center gap-x-1 text-sm/6 hover:text-foreground transition-colors"
              href={"/"}
            >
              AGB
            </Link>
            <Link
              className="flex items-center gap-x-1 text-sm/6 hover:text-foreground transition-colors"
              href={"/"}
            >
              Datenschutz
            </Link>
            <Link
              className="flex items-center gap-x-1 text-sm/6 hover:text-foreground transition-colors"
              href={"/"}
            >
              Impressum
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
};
