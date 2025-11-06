import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ScrapbookImage } from "@/components/ui/scrapbook-image";

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-20 mb-4">
          <div className="hidden md:block">
            <ScrapbookImage
              src="/projects_essential.jpg"
              alt="Ginger health shots"
              arrowText="essential for the grind!"
              arrowDirection="bottom-left"
              size="sm"
            />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center">
            featured projects
          </h2>
          <div className="hidden md:block">
            <ScrapbookImage
              src="/projects_teamwork.jpg"
              alt="Teamwork makes the dream work"
              arrowText="community + connection = dream teamwork"
              arrowDirection="top-right"
              size="sm"
            />
          </div>
        </div>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          a selection of product work i'm proud of :)
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} to={`/project/${project.id}`} className="h-full">
              <Card 
                className="group hover:shadow-warm-lg transition-all duration-300 bg-card border-border hover:scale-105 cursor-pointer h-full flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap flex-1">
                      <CardTitle className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <Badge 
                        variant={project.status === "completed" ? "default" : "secondary"}
                        className={
                          project.status === "completed" 
                            ? "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30"
                            : "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30"
                        }
                      >
                        {project.status === "in progress" ? (
                          <>
                            {project.status}
                            {project.lifecycleStep && (
                              <span className="ml-1">• {project.lifecycleStep}</span>
                            )}
                          </>
                        ) : (
                          project.status
                        )}
                      </Badge>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-secondary mb-2">impact:</p>
                    <p className="text-sm text-muted-foreground">{project.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/20 text-foreground hover:bg-primary/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
