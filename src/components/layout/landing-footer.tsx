import { ProjectUrls } from "@/const";
import { Github } from "lucide-react";
import Link from "next/link";
import { Typography } from "../ui/typography";

const currentYear = new Date().getFullYear();

type Props = {
  isUserAuthenticated: boolean;
};

export const LandingFooter = (props: Props) => {
  const { isUserAuthenticated } = props;

  const landingNavigationLinks = [
    { label: "Home", href: ProjectUrls.home },
    { label: "About", href: ProjectUrls.about },
    { label: "Road Map", href: ProjectUrls.roadMap },
    ...(isUserAuthenticated
      ? [{ label: "Dashboard", href: ProjectUrls.dashboard }]
      : []),
  ];

  return (
    <footer className="container py-28 flex flex-col items-center">
      <nav className="flex flex-wrap items-center justify-center gap-8 pb-8">
        {landingNavigationLinks.map((link, index) => (
          <ul key={index}>
            <li>
              <Typography
                asChild
                weight="medium"
                className="text-muted-foreground hover:underline underline-offset-4"
              >
                <Link href={link.href}>{link.label}</Link>
              </Typography>
            </li>
          </ul>
        ))}
      </nav>
      <Typography className="mt-6 text-muted-foreground">
        Copyright &copy; {currentYear} Next-blog
      </Typography>
      <div className="flex items-center gap-3 mt-6">
        <Typography styling="xxs" className="text-muted-foreground">
          Created for educational purposes
        </Typography>
        <Link
          href="https://github.com/sezardino/next-blog"
          className="hover:text-muted-foreground"
        >
          <Github className="w-4 h-4" />
        </Link>
      </div>
    </footer>
  );
};
