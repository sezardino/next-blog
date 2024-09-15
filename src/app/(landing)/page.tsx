import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { homeFeaturesSection, homeHeroSection } from "./content";

const HomePage = () => {
  return (
    <main>
      <section>
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <header className="flex flex-col items-center py-32 text-center lg:mx-auto lg:items-start lg:px-0 lg:text-left">
              {/* TODO: uncomment when mvp v2 will be ready */}
              {/* <p>{homeHeroSection.newVersion}</p> */}
              <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                {homeHeroSection.title}
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                {homeHeroSection.subtitle}
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Button className="w-full sm:w-auto">
                  <Link href="#features">{homeHeroSection.cta}</Link>
                </Button>
              </div>
            </header>
            <div className="relative aspect-[3/4]">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 800 800"
                  className="size-full text-muted-foreground opacity-20"
                >
                  {Array.from(Array(720).keys()).map((dot, index, array) => {
                    const angle = 0.2 * index;
                    const scalar = 40 + index * (360 / array.length);
                    const x = Math.round(Math.cos(angle) * scalar);
                    const y = Math.round(Math.sin(angle) * scalar);

                    return (
                      <circle
                        fill="currentColor"
                        key={index}
                        r={(3 * index) / array.length}
                        cx={400 + x}
                        cy={400 + y}
                        opacity={1 - Math.sin(angle)}
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="absolute left-[8%] top-[10%] flex aspect-[5/6] w-[38%] justify-center rounded-lg border border-border bg-accent overflow-hidden">
                <Image
                  src="/images/hero/one.jpg"
                  alt="decorative image about our blog"
                  width={350}
                  height={260}
                />
              </div>
              <div className="absolute right-[12%] top-[20%] flex aspect-square w-1/5 justify-center rounded-lg border border-border bg-accent overflow-hidden">
                <Image
                  src="/images/hero/three.jpg"
                  alt="decorative image about our blog"
                  width={220}
                  height={220}
                />
              </div>
              <div className="absolute bottom-[24%] right-[24%] flex aspect-[5/6] w-[38%] justify-center rounded-lg border border-border bg-accent overflow-hidden">
                <Image
                  src="/images/hero/two.jpg"
                  alt="decorative image about our blog"
                  width={350}
                  height={260}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="py-32">
        <div className="container mx-auto max-w-screen-xl">
          <header className="flex flex-col">
            <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
              {homeFeaturesSection.title}
            </h2>
            <p className="md:pl-5 mt-4 max-w-2xl text-muted-foreground lg:text-xl">
              {homeFeaturesSection.subtitle}
            </p>
            <p className="mb-4 text-xs text-muted-foreground md:pl-5 -order-1">
              {homeFeaturesSection.badge}
            </p>
          </header>
          <ul className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 xl:grid-cols-3 lg:mt-20">
            {homeFeaturesSection.features.map((feature, idx) => (
              <li className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
                <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                  <feature.icon />
                </span>
                <div>
                  <h3 className="font-medium md:mb-2 md:text-xl">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
