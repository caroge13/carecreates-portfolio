import { ScrapbookImage } from "@/components/ui/scrapbook-image";

export const About = () => {
  return (
    <section className="py-20 px-6 bg-card relative overflow-hidden">
      <div className="max-w-4xl mx-auto animate-slide-up">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
          who am i?
        </h2>
        
        <div className="bg-background rounded-2xl p-8 md:p-12 shadow-warm-md relative">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Hey there! I'm Caroline, but my friends call me Care. I'm a Computer Science and Business student at Western University with a passion for the intersection of business and technology, especially how to translate between the two. I love being creative (and need to be), and am obsessed with hobbies, nature, people, and talking about any of these three.
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6 relative">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">people</h3>
              <div className="float-right ml-4 mt-4 hidden lg:block">
                <ScrapbookImage
                  src="/people.JPEG"
                  alt="Tech Mixer with other clubs at Western University"
                  size="sm"
                />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Everything I do revolves around the people involved, and I firmly believe that there's something to be learned from every single person we meet. Great products are built by great people coming together towards a common goal. I seek and cultivate spaces for creatives, who prioritize those who will use the product, recognizing them as people in all their complexity, rather than just 'users'. Furthermore, embracing individuality in teamwork, creating a truly inclusive and collaborative working environment.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-6 relative">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">process</h3>
              <div className="float-left mr-4 mb-4">
                <ScrapbookImage
                  src="/process.jpg"
                  alt="Working environment is just as important as the work itself"
                  size="sm"
                />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                How we do something is just as important, if not even more, than what we do. I believe that the journey to an outcome directly translates to the effectiveness and sustainability of the outcome. Great products come from deeply understanding user needs and translating them into elegant solutions through thoughtful processes, which means these processes must prioritize empathy and collaboration as well.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-6 relative">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">passion</h3>
              <div className="float-right ml-4 mt-4">
                <ScrapbookImage
                  src="/passion.jpg"
                  alt="Passion project"
                  arrowText="i painted this!"
                  arrowDirection="top-right"
                  size="sm"
                />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You'll be hard-pressed to find someone more optimistic, passionate, and driven than me. When I'm interested in something, I throw myself into it completely, and I got lucky in that I find a 'sparkle' in everything. This means that my life is constantly in momentum, where I'm always looking for ways to create better experiences and learn from every challenge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
