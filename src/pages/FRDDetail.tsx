import { useEffect } from "react";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FRDDetail = () => {
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

  const content = project.frdContent || "Feature Requirements Document coming soon...";

  const renderTableCell = (cell: any): React.ReactNode => {
    if (typeof cell === 'string') {
      return cell;
    }
    
    if (Array.isArray(cell)) {
      // Handle array of bullet point objects - stack them vertically
      return (
        <div className="space-y-1 w-full">
          {cell.map((item: any, idx: number) => {
            if (typeof item === 'string') {
              return (
                <div key={idx} className="flex items-start text-sm w-full">
                  <span className="text-primary mr-2 flex-shrink-0">•</span>
                  <span className="flex-1">{item}</span>
                </div>
              );
            }
            if (item && item.type === 'bullet') {
              return (
                <div key={idx} className="flex items-start text-sm w-full">
                  <span className="text-primary mr-2 flex-shrink-0">•</span>
                  <span className="flex-1">{item.text}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    }
    
    if (cell && typeof cell === 'object' && cell.type === 'bullet') {
      return (
        <div className="flex items-start text-sm w-full">
          <span className="text-primary mr-2 flex-shrink-0">•</span>
          <span className="flex-1">{cell.text}</span>
        </div>
      );
    }
    
    return String(cell);
  };

  const renderTable = (table: { headers?: string[]; rows: string[][] }) => {
    return (
      <div className="overflow-x-auto my-4">
        <Table>
          {table.headers && table.headers.length > 0 && (
            <TableHeader>
              <TableRow>
                {table.headers.map((header, idx) => (
                  <TableHead key={idx} className="text-foreground font-semibold">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {table.rows.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <TableCell key={cellIdx} className="text-muted-foreground align-top">
                    {renderTableCell(cell)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderContent = (item: any, index: number): React.ReactNode => {
    if (typeof item === 'string') {
      return (
        <div key={index} className="whitespace-pre-wrap text-muted-foreground leading-relaxed mb-4">
          {item}
        </div>
      );
    }
    
    // Handle items with 'main' property (bullet points or paragraphs)
    if (item && typeof item === 'object' && 'main' in item && !item.type) {
      const hasSubItems = item.subItems && (Array.isArray(item.subItems) ? item.subItems.length > 0 : typeof item.subItems === 'string');
      return (
        <div key={index} className="mb-4">
          {hasSubItems ? (
            <div className="space-y-1">
              <div className="flex items-start">
                <span className="text-primary mr-2 flex-shrink-0">•</span>
                <span className="text-muted-foreground flex-1">{item.main}</span>
              </div>
              {Array.isArray(item.subItems) ? (
                <ul className="ml-6 space-y-1">
                  {item.subItems.map((subItem: string, subIdx: number) => (
                    <li key={subIdx} className="flex items-start text-sm text-muted-foreground/80">
                      <span className="text-primary mr-2 flex-shrink-0">◦</span>
                      <span className="flex-1">{subItem}</span>
                    </li>
                  ))}
                </ul>
              ) : typeof item.subItems === 'string' ? (
                <div className="ml-6 text-sm text-muted-foreground/80">
                  {item.subItems}
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {item.main}
            </p>
          )}
        </div>
      );
    }
    
    if (item.type === 'heading') {
      return (
        <h2 key={index} className={`font-serif text-3xl font-bold text-foreground ${index === 0 ? 'mt-0 mb-6' : 'mt-10 mb-6'}`}>
          {item.text}
        </h2>
      );
    }
    
    if (item.type === 'image') {
      return (
        <div key={index} className="my-6 flex justify-center">
          <img 
            src={item.src} 
            alt={item.alt || 'FRD diagram'} 
            className="max-w-full h-auto rounded-lg shadow-warm-md"
          />
        </div>
      );
    }
    
    if (item.type === 'subheading') {
      return (
        <div key={index} className="space-y-4 mt-6">
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
            {item.text}
          </h3>
          {item.content && item.content.map((subItem: any, subIdx: number) => {
            if (typeof subItem === 'string') {
              return (
                <div key={subIdx} className="text-muted-foreground leading-relaxed mb-4">
                  {subItem}
                </div>
              );
            }
            
            if (subItem.type === 'bullet') {
              return (
                <div key={subIdx} className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-muted-foreground">{subItem.text}</span>
                  </div>
                  {subItem.subItems && subItem.subItems.length > 0 && (
                    <ul className="ml-6 space-y-1">
                      {subItem.subItems.map((subItemText: string, subItemIdx: number) => (
                        <li key={subItemIdx} className="flex items-start text-sm text-muted-foreground/80">
                          <span className="text-primary mr-2">◦</span>
                          <span>{subItemText}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {subItem.table && renderTable(subItem.table)}
                </div>
              );
            }
            
            if (subItem.type === 'table') {
              return <div key={subIdx} className="mb-4">{renderTable(subItem)}</div>;
            }
            
            return null;
          })}
        </div>
      );
    }
    
    if (item.type === 'table') {
      return <div key={index} className="mb-4">{renderTable(item)}</div>;
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to={`/project/${project.id}`}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              back to project
            </Button>
          </Link>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">
            feature requirements document (FRD)
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {project.title}
          </p>
        </div>

        <Separator className="mb-8" />

        {/* FRD Content */}
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-warm-md space-y-6">
          {Array.isArray(content) ? (
            content.map((section, index) => (
              <div key={index}>
                {renderContent(section, index)}
              </div>
            ))
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FRDDetail;

