import { cn } from "@/lib/utils";
import { SimpleScrapbookArrow } from "./scrapbook-arrow";

interface ScrapbookImageProps {
  src?: string;
  alt: string;
  arrowText?: string;
  arrowDirection?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

export const ScrapbookImage = ({
  src,
  alt,
  arrowText,
  arrowDirection = 'top-right',
  className,
  size = 'md',
  rounded = true,
}: ScrapbookImageProps) => {
  const sizeClasses = {
    sm: 'w-32 h-32 md:w-40 md:h-40',
    md: 'w-48 h-48 md:w-64 md:h-64',
    lg: 'w-64 h-64 md:w-80 md:h-80',
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div className={cn(
        "relative overflow-hidden",
        sizeClasses[size],
        rounded && "rounded-2xl",
        "shadow-lg border-2 border-foreground/10",
        "transform rotate-[-1deg] hover:rotate-0 transition-transform duration-300"
      )}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-muted-foreground text-sm text-center px-4">
              {alt}
            </span>
          </div>
        )}
      </div>
      
      {/* Decorative corner tape effect */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/20 rotate-45 transform opacity-60" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-secondary/20 rotate-45 transform opacity-60" />
      
      {/* Arrow with description */}
      {arrowText && (
        <SimpleScrapbookArrow
          direction={arrowDirection}
          text={arrowText}
          className="z-10"
          offset={10}
        />
      )}
    </div>
  );
};

