import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
          let's connect :)
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          i'm actively seeking product management internship opportunities for summer 2026. 
          let's chat about how i can contribute to your team!
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-foreground shadow-warm-md hover:shadow-warm-lg transition-all"
            onClick={() => window.location.href = 'mailto:carolinesyge@gmail.com'}
          >
            <Mail className="w-5 h-5 mr-2" />
            email me
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-secondary text-foreground hover:bg-secondary/10"
            onClick={() => window.open('https://linkedin.com/in/carolinege', '_blank')}
          >
            <Linkedin className="w-5 h-5 mr-2" />
            linkedin
          </Button>
          
          <Link to="/resume">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-secondary text-foreground hover:bg-secondary/10"
            >
              <FileText className="w-5 h-5 mr-2" />
              resume
            </Button>
          </Link>
        </div>
        
        <div className="border-t border-border pt-8">
          <p className="text-muted-foreground mb-4">
            © 2025 Caroline Ge. Built with <em>care</em> 🫶🏻
          </p>
          <div className="flex justify-center">
            <a 
              href="https://github.com/caroge13/carecreates-portfolio" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="bg-background border-2 border-primary text-foreground hover:bg-primary/10 transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                view on github
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
