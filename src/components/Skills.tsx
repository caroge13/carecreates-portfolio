import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    category: "product management",
    skills: ["Product Strategy", "Roadmap Planning", "User Research", "Prototyping", "Analytics", "Feature Prioritization", "Business Requirements"]
  },
  {
    category: "technical",
    skills: ["SQL", "Python", "Figma", "Notion", "Jira", "Confluence", "Tableau", "Java", "R", "React", "Microsoft 365"]
  },
  {
    category: "soft skills",
    skills: ["Communication", "Leadership", "Problem Solving", "Stakeholder Management", "Agile/Scrum", "Data-Driven Decision Making", "Collaboration"]
  }
];

export const Skills = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
          skills & tools
        </h2>
        
        <div className="space-y-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 shadow-warm-sm">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <Badge 
                    key={idx} 
                    variant="secondary" 
                    className="bg-primary/10 text-foreground hover:bg-primary/20 text-base py-2 px-4 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
