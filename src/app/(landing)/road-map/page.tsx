import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils/styles";
import { Check } from "lucide-react";
import { Metadata } from "next";
import { roadmapPage } from "./content";

const currentMVPVersion = 1;

export const metadata: Metadata = { title: "Road Map" };

const RoadMapPage = () => {
  return (
    <main>
      <section className="container py-20">
        <header className="text-center">
          <Typography
            level="h1"
            styling="h1"
            weight="bold"
            className="my-6 text-pretty"
          >
            {roadmapPage.title}
          </Typography>
          <Typography level="p" className="mb-8 text-muted-foreground">
            {roadmapPage.subtitle}
          </Typography>
        </header>
        <ul className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {roadmapPage.mvps.map((mvp, index) => (
            <li
              key={index}
              className={cn(
                "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
                currentMVPVersion >= index && "is-active"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border border-white bg-background group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
                )}
              >
                {currentMVPVersion >= index && <Check />}
              </div>
              {/* Card */}
              <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                <CardHeader>
                  <div>
                    <Badge className="inline">MVP {index + 1}</Badge>{" "}
                    <Typography
                      level="h3"
                      styling="large"
                      weight="bold"
                      className="inline"
                    >
                      {mvp.name}
                    </Typography>
                  </div>
                  <Typography styling="small">{mvp.description}</Typography>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc">
                    {mvp.features.map((feature, featureIndex) => (
                      <Typography
                        key={featureIndex}
                        asChild
                        styling="small"
                        className="text-muted-foreground"
                      >
                        <li>{feature}</li>
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default RoadMapPage;
