import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { ScrapbookImage } from "@/components/ui/scrapbook-image";

export const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center animate-fade-in relative z-10">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-primary/20 text-foreground rounded-full text-sm font-medium mb-4">
            computer science & business student @ western university
          </span>
        </div>
        
        {/* Scrapbook image positioned top-right */}
        <div className="absolute top-[-20px] right-0 md:right-[-120px] z-0 opacity-90">
          <ScrapbookImage
            src="/me1.jpg"
            alt="Caroline's photo"
            arrowText="that's me!"
            arrowDirection="top-right"
            size="sm"
          />
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight relative z-10">
          hi! i'm{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            caroline
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
          just a girly passionate about collecting stories and building experiences
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 relative z-10">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-foreground font-medium px-8 shadow-warm-md hover:shadow-warm-lg transition-all"
            onClick={scrollToProjects}
          >
            view my work
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-secondary text-foreground hover:bg-secondary/10 font-medium px-8"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            get in touch
          </Button>
        </div>
        
        {/* Scrapbook image positioned bottom-left */}
        <div className="absolute bottom-[-20px] left-0 md:left-[-100px] z-0 opacity-90 hidden md:block">
          <ScrapbookImage
            src="/hero_puppers.jpg"
            alt="Puppy snapshot"
            arrowText="not my puppy but i \nlove her regardless"
            arrowDirection="top-left"
            size="sm"
            arrowTextOffsetX={-0.8}
            arrowTextOffsetY="-15px"
            arrowTextTranslateX={-50}
          />
        </div>
        
        <div className="animate-float relative z-10">
          <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto cursor-pointer" onClick={scrollToProjects} />
        </div>
      </div>
    </section>
  );
};
