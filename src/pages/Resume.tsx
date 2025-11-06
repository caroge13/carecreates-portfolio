import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Resume = () => {
  const resumePath = "/SYCarolineGe_Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "SYCarolineGe_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              back to home
            </Button>
          </Link>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-warm-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              resume
            </h1>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              download pdf
            </Button>
          </div>

          <div className="w-full h-[calc(100vh-200px)] border border-border rounded-lg overflow-hidden">
            <iframe
              src={`${resumePath}#toolbar=0`}
              className="w-full h-full"
              title="Resume PDF"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;

