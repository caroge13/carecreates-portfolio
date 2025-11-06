import { cn } from "@/lib/utils";

interface ScrapbookArrowProps {
  startX: number; // Starting X position (percentage)
  startY: number; // Starting Y position (percentage)
  endX: number; // Ending X position (percentage)
  endY: number; // Ending Y position (percentage)
  text?: string; // Description text at the arrow end
  rotation?: number; // Optional rotation for the arrow
  className?: string;
  textOffsetX?: number; // Text horizontal offset multiplier (default: 0.7)
  textOffsetY?: string; // Text vertical offset (default: '-10px')
  textTranslateX?: number; // Text translateX after rotation (default: 20)
  textRotation?: number; // Additional text rotation in degrees (default: 0)
  arrowImage?: string; // Arrow image path (default: '/arrows.png')
}

export const ScrapbookArrow = ({ 
  startX, 
  startY, 
  endX, 
  endY, 
  text,
  rotation = 0,
  className,
  textOffsetX = 0.7,
  textOffsetY = '-10px',
  textTranslateX = 20,
  textRotation = 0,
  arrowImage = '/arrows.png'
}: ScrapbookArrowProps) => {
  // Calculate angle for rotation
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  // Calculate length in viewport units (approximate)
  const length = Math.sqrt(dx * dx + dy * dy) * 1.5; // Scale up for visibility
  
  return (
    <div 
      className={cn("absolute pointer-events-none z-20", className)}
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
      }}
    >
      <img
        src={arrowImage}
        alt=""
        className="overflow-visible object-contain"
        style={{ 
          width: `${Math.max(length, 80)}px`,
          maxWidth: '200px',
          height: 'auto',
          transform: `rotate(${angle + rotation}deg)`,
          transformOrigin: '0 50%',
        }}
      />
      {text && (
        <div
          className="absolute text-xs md:text-sm text-foreground/80 font-medium whitespace-nowrap bg-background/80 px-2 py-1 rounded"
          style={{
            left: `${Math.max(length, 80) * textOffsetX}px`,
            top: textOffsetY,
            transform: `rotate(${angle + rotation + textRotation}deg) translateX(${textTranslateX}px)`,
            transformOrigin: '0 0',
            maxWidth: '150px',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

// Simplified version for common use cases
interface SimpleScrapbookArrowProps {
  direction?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  text?: string;
  className?: string;
  offset?: number;
}

export const SimpleScrapbookArrow = ({
  direction = 'top-right',
  text,
  className,
  offset = 0
}: SimpleScrapbookArrowProps) => {
  const directions = {
    'top-right': { 
      startX: 75 + offset, 
      startY: offset, 
      endX: 95 + offset, 
      endY: -20 + offset, 
      rotation: 50,
      textOffsetX: 0.2,    // ← ADJUST HORIZONTAL TEXT POSITION HERE
      textOffsetY: '-10px', // ← ADJUST VERTICAL TEXT POSITION HERE
      textTranslateX: 20,    // ← ADJUST TEXT TRANSLATION AFTER ROTATION HERE
      arrowImage: '/right_arrows.png'  // ← RIGHT ARROW IMAGE
    },
    'top-left': { 
      startX: -40 + offset, 
      startY: 10 + offset, 
      endX: -65 + offset, 
      endY: -10 + offset, 
      rotation: 120,
      textOffsetX: -0.8,     // ← ADJUST HORIZONTAL TEXT POSITION HERE (lower = more left)
      textOffsetY: '0px', // ← ADJUST VERTICAL TEXT POSITION HERE (Lower = more up)
      textTranslateX: -40,   // ← ADJUST TEXT TRANSLATION AFTER ROTATION HERE (negative = left)
      textRotation: 0,      // ← ADDITIONAL TEXT ROTATION IN DEGREES
      arrowImage: '/left_arrows.png'  // ← LEFT ARROW IMAGE
    },
    'bottom-right': { 
      startX: 75 + offset, 
      startY: 65 - offset, 
      endX: 95 + offset, 
      endY: 95 - offset, 
      rotation: 5,
      textOffsetX: 0.7,    // ← ADJUST HORIZONTAL TEXT POSITION HERE
      textOffsetY: '-10px', // ← ADJUST VERTICAL TEXT POSITION HERE
      textTranslateX: 20,    // ← ADJUST TEXT TRANSLATION AFTER ROTATION HERE
      arrowImage: '/right_arrows.png'  // ← RIGHT ARROW IMAGE
    },
    'bottom-left': { 
      startX: -20 - offset, 
      startY: 65 - offset, 
      endX: -40 - offset, 
      endY: 85 - offset, 
      rotation: 200,
      textOffsetX: -1.8,    // ← ADJUST HORIZONTAL TEXT POSITION HERE
      textOffsetY: '40px', // ← ADJUST VERTICAL TEXT POSITION HERE
      textTranslateX: 40,    // ← ADJUST TEXT TRANSLATION AFTER ROTATION HERE
      arrowImage: '/left_arrows.png'  // ← LEFT ARROW IMAGE
    },
  };

  const config = directions[direction];
  
  return (
    <ScrapbookArrow
      {...config}
      text={text}
      className={className}
    />
  );
};

