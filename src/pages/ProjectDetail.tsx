import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, Figma, ExternalLink } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrapbookImage } from "@/components/ui/scrapbook-image";

const lifecycleSteps = [
  "discovery",
  "user research",
  "feature prioritization & specification",
  "MVP success metrics",
  "design",
  "development",
  "mvp & testing",
  "metrics",
  "iterations & improvements"
];

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">project not found</h1>
          <p className="text-muted-foreground mb-6">the project you're looking for doesn't exist :(</p>
          <Link to="/">
            <Button variant="outline">back to home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/#projects">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              back to projects
            </Button>
          </Link>
          
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">
                {project.title}
              </h1>
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
            
            <div className="flex gap-2">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Github className="w-4 h-4" />
                    github
                  </Button>
                </a>
              )}
              {project.figmaLink && (
                <a href={project.figmaLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Figma className="w-4 h-4" />
                    figma
                  </Button>
                </a>
              )}
            </div>
          </div>
          
          {/* Main project image */}
          <div className="mb-6 flex justify-center">
            <ScrapbookImage
              src={project.image}
              alt={`${project.title} main screenshot`}
              size="lg"
            />
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>
          
          <div className="mb-6">
            <p className="text-sm font-medium text-secondary mb-2">Impact:</p>
            <p className="text-base text-muted-foreground">{project.impact}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="bg-primary/20 text-foreground">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Project Lifecycle Documentation */}
        <div className="space-y-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
            project lifecycle
          </h2>
          
          {(() => {
            // Get lifecycle steps directly from the project's lifecycleContent
            // Each project defines its own custom lifecycle steps
            const projectLifecycleSteps = project.lifecycleContent 
              ? Object.keys(project.lifecycleContent).filter(key => key !== "tracking note") // Exclude tracking note as it's displayed within MVP success metrics
              : [];
            
            // Map custom content keys to display names (optional - for prettier titles)
            const stepDisplayNames: { [key: string]: string } = {
              "problem statement": "problem statement",
              "unique value proposition": "unique value proposition",
              "mvp success metrics": "MVP success metrics",
              "MVP success metrics": "MVP success metrics",
              "design notes": "design",
              "development - systems architecture": "development",
              "functional improvements & iterations": "iterations & improvements"
            };
            
            return projectLifecycleSteps.map((stepKey, index) => {
              const step = stepDisplayNames[stepKey] || stepKey;
              const content = project.lifecycleContent![stepKey];
              
              // Check if this is the current step (for status indicators)
              const stepLower = step.toLowerCase();
              const projectStepLower = (project.lifecycleStep || "").toLowerCase();
              const isCurrentStep = project.status === "in progress" && 
                (projectStepLower.includes(stepLower) || stepLower.includes(projectStepLower));
              
              return (
              <div key={stepKey} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  isCurrentStep
                    ? "bg-orange-500/20 text-orange-700 dark:text-orange-400"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {index + 1}
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  {step}
                </h3>
                {isCurrentStep && (
                  <Badge variant="secondary" className="bg-orange-500/20 text-orange-700 dark:text-orange-400">
                    current step
                  </Badge>
                )}
              </div>
              
              <div className="ml-11 pl-4 border-l-2 border-border min-h-[100px] space-y-4">
                {(() => {
                  // Use content directly from the project's lifecycleContent
                  const isDevelopment = stepKey.toLowerCase().includes("development");
                  const hasArchitecture = project.architectureContent;
                  
                  if (Array.isArray(content)) {
                    // Check if array contains objects with main/subItems structure
                    return (
                      <div className="space-y-4">
                        <ul className="text-muted-foreground space-y-2">
                          {content.map((item, idx) => {
                            if (typeof item === 'object' && item !== null && 'main' in item) {
                              const itemWithSub = item as { main: string; subItems?: string[] };
                              return (
                                <li key={idx} className="space-y-1">
                                  <div className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>{itemWithSub.main}</span>
                                  </div>
                                  {itemWithSub.subItems && itemWithSub.subItems.length > 0 && (
                                    <ul className="ml-6 space-y-1">
                                      {itemWithSub.subItems.map((subItem, subIdx) => (
                                        <li key={subIdx} className="flex items-start text-sm text-muted-foreground/80">
                                          <span className="text-primary mr-2">◦</span>
                                          <span>{subItem}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              );
                            } else {
                              return (
                                <li key={idx} className="flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  <span>{item as string}</span>
                                </li>
                              );
                            }
                          })}
                        </ul>
                    {/* Display tracking note if it exists and we're showing MVP success metrics */}
                    {project.lifecycleContent?.["tracking note"] && (stepKey === "MVP success metrics" || stepKey === "mvp success metrics") && (
                      <p className="text-muted-foreground mt-4 italic">
                        {typeof project.lifecycleContent["tracking note"] === 'string' ? project.lifecycleContent["tracking note"] : ''}
                      </p>
                    )}
                        {isDevelopment && hasArchitecture && (
                          <Link 
                            to={`/project/${project.id}/architecture`}
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium mt-4"
                          >
                            <span>detailed architecture documentation</span>
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    );
                  }
                  
                  return (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {content}
                      </p>
                      {isDevelopment && hasArchitecture && (
                        <Link 
                          to={`/project/${project.id}/architecture`}
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                          <span>detailed architecture documentation</span>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  );
                })()}
              </div>
              </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

