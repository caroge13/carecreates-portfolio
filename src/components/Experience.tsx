import { ScrapbookImage } from "@/components/ui/scrapbook-image";

const experiences = [
  {
    role: "Operations Analyst",
    company: "Royal Bank of Canada",
    period: "May 2025 - August 2025",
    image: "/rbc.jpg",
    description: [
      "Designed and shipped a centralized Jira intake feature adopted by 30+ stakeholders across tech, ops, and strategy",
      "Build 10+ analytics models and Tableau dashboards to quantify automation ROI and optimize credit adjudication",
      "Created Figma workflows that cut manual triage time and improved cross-functional visibility"
    ]
  },
  {
    role: "President",
    company: "Western Founders Network (WesternU's largest business, tech, and entrepreneurship club)",
    period: "September 2023 - Present",
    image: "/wfn.JPEG",
    description: [
      "Scaled Western's largest biz-tech organization to 400+ members and 75+ execs, executing 15+ events annually",
      "Built internal systems that cut coordination overhead and empowered VPs to deliver faster, clearer decisions",     
      "Stepped in as strategic decision-maker and mentor, offering people-first guidance and resolving cross-team challenges to keep execution on track"
    ]
  },
  {
    role: "Internal Audit Intern",
    company: "Prairie Payments Joint Venture",
    period: "May 2024 - December 2024",
    image: "/ppjv.jpg",
    description: [
      "Led end-to-end process audits with >75% of recommendations implemented by leadership",
      "Mapped and redesigned workflows that cut compliance friction and standardized cross-team processes",
      "Delivered data-backed insights that informed strategic decisions across 6+ core business functions"
    ]
  }
];

export const Experience = () => {
  return (
    <section className="py-20 px-6 bg-card relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center">
            experience
          </h2>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0 hover:border-primary transition-colors"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
              
              <div className="bg-background rounded-xl p-6 shadow-warm-sm hover:shadow-warm-md transition-shadow relative">
                {/* Experience image */}
                <div className="absolute top-4 right-4 opacity-90">
                  <ScrapbookImage
                    src={exp.image}
                    alt={`${exp.company} experience`}
                    arrowText=""
                    size="sm"
                    className="w-20 h-20"
                  />
                </div>
                
                <div className="mb-4 pr-24">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-secondary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
                </div>
                
                <ul className="space-y-2 pr-24">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
