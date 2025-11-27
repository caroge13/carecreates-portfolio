import { ChartTooltip } from "@/components/ui/chart";
import { TLSSocket } from "tls";

export interface Project {
  id: string;
  title: string;
  status: "completed" | "in progress";
  lifecycleStep?: string;
  description: string;
  impact: string;
  skills: string[];
  githubLink?: string;
  figmaLink?: string;
  image?: string;
  lifecycleContent?: {
    [key: string]: string | string[] | (string | { main: string; subItems?: string[]; numberedItems?: Array<{ main: string; subItems?: string[] }>; image?: string; table?: { rows: string[][] } })[];
  };
  architectureContent?: string | string[] | Array<any>;
  frdContent?: string | string[] | Array<any>;
}

export const projects: Project[] = [
  {
    id: "internshipnet",
    title: "InternshipNet",
    status: "in progress",
    lifecycleStep: "development",
    description: "A website that helps users track every target company in a watchlist, and notifications as soon as job postings for these companies drop.",
    impact: "Increased number of applications submitted on the day of release by 40%",
    skills: ["Full-Stack Development", "Product Development", "System Architecture", "User Research", "Technical Implementation", "Database Design", "API Integration"],
    githubLink: "https://github.com/caroge13/internship-net",
    figmaLink: "https://figma.com/placeholder",
    image: "/project-internshipnet.jpg",
    architectureContent: [
      { type: 'heading', text: 'overview' },
      "InternshipNet is a full-stack web application, combining a React frontend with Supabase backend services, including serverless edge functions for data scraping and enrichment.",
      
      // system architecture section
      { type: 'heading', text: 'system architecture' },
      { type: 'image', src: '/architecture.png', alt: 'InternshipNet system architecture diagram' },
      
      // core platforms & technologies section
      { type: 'heading', text: 'core platforms & technologies' },
      {
        type: 'subheading',
        text: 'frontend stack',
        content: [
          { type: 'bullet', text: 'React + Vite', table: { rows: [['purpose', 'modern, fast development and build toolchain'], ['key features', 'hot module replacement, TypeScript support, optimised builds'], ['routing', 'React Router DOM for client-side navigation'], ['state management', 'React Query (TanStack Query) for server state, React hooks for local state']] } },
          { type: 'bullet', text: 'UI Framework', table: { rows: [['purpose', 'consistent, accessible UI components with minimal bundle size'], ['Tailwind CSS', 'utility-first CSS framework for styling'], ['shadcn/ui', 'component library built on Radix UI primitives']] } },
          { type: 'bullet', text: 'key libraries', table: { rows: [['React Query', 'handles data fetching, caching, and sync with backend'], ['React Hook form', 'form state management and validation'], ['Zod', 'schema validation for TypeScript']] } },
        ]
      },
      {
        type: 'subheading',
        text: 'backend platform: Supabase',
        content: [
          { type: 'bullet', text: 'Supabase serves as the complete BaaS platform'},
          { type: 'bullet', text: 'authentication system', table: { rows: [['service', 'built-in email/password authentication'], ['session management', 'JWT tokens stored in browser localStorage'], ['security', 'automatic token refresh, secure session handling']] } },
          { type: 'bullet', text: 'database system', table: { rows: [['database', 'PostgreSQL (managed by Supabase)'], ['row-level security (RLS)', 'fine-grained access control at database level'], ['features',
            { type: 'bullet', text: 'automatic triggers for user profile creation' },
            { type: 'bullet', text: 'timestamp auto-updates' },
            { type: 'bullet', text: 'foreign key relationships with cascade deletes' },
            { type: 'bullet', text: 'full-text search capabilities' }
            ], ['key tables', 
              { type: 'bullet', text: '"profile": user profile data linked to auth.users' },
              { type: 'bullet', text: '"companies": public company directory' },
              { type: 'bullet', text: '"user_watchlist": many-to-many relationship between users and companies' },
              { type: 'bullet', text: '"job_listings": user alert preferences' },
              { type: 'bullet', text: '"career_pages": company career page URLs' }
            ]] } },
          { type: 'bullet', text: 'edge functions', table: { rows: [['purpose', 'server-side logic that requires elevated permissions or external API access'], ['runtime', 'Deno (serverless functions)'], ['deployment', 'deployed separately from frontend, invoked via HTTPS'], ['authentication', 'uses service role key to bypass RLS when needed']] } },
        ]
      },
      {
        type: 'subheading',
        text: 'external data sources',
        content: [
          { type: 'bullet', text: 'LinkedIn', table: { rows: [['purpose', 'company search and logo extraction'], ['method', 'web scraping LinkedIn company pages'], ['edge function', '"search-linkedin-companies"']] } },
          { type: 'bullet', text: 'Wikipedia', table: { rows: [['purpose', 'company descriptions and industry information'], ['method', 'Wikipedia REST API (" /api/rest_v1/page/summary")'], ['edge function', '"scrape-company-info"']] } },
          { type: 'bullet', text: 'company career pages', table: { rows: [['purpose', 'job listing data'], ['method', 'web scraping HTML pages and parsing structured data (JSON-LD, microdata)'], ['edge function', '"scrape-careers"']] } },
        ]
      },
      
      // system interactions & data flow section
      { type: 'heading', text: 'system interactions & data flow' },
      {
        type: 'subheading',
        text: 'authentication flow',
        content: [
          { type: 'bullet', text: 'user --> frontend --> Supabase auth service --> database' },
          { type: 'bullet', text: 'JWT token generated --> stored in localStorage --> included in all subsequent API requests --> database RLS policies validate user context' },
          { type: 'bullet', text: 'key points', subItems: ['Authentication state managed by Supabase client', 'Frontend automatically includes auth token in API calls', 'RLS policies enforce user-specific data access', 'Session persists across browser sessions'] }
        ]
      },
      {
        type: 'subheading',
        text: 'company watchlist management',
        content: [
          { type: 'bullet', text: 'adding companies', subItems: ['User searches --> frontend calls "search-linkedin-companies" edge function --> edge function searches LinkedIn --> returns company suggestions', 'User selects company --> frontend calls "add-company" edge function', 'Edge function validates user authentication --> checks if company exists in database --> creates company if needed --> adds to user\'s watchlist', 'Returns success --> frontend refreshes watchlist'] },
          { type: 'bullet', text: 'key points', subItems: ['2-step process: search externally, then add to database', 'Edge functions use service role for database writes (bypasses RLS)', 'User context still validated for security', 'Watchlist additions respect RLS (users can only manage their own watchlist)'] }
        ]
      },
      {
        type: 'subheading',
        text: 'job scraping workflow',
        content: [
          { type: 'bullet', text: 'manual refresh trigger', subItems: ['User clicks "refresh jobs" --> frontend calls "scrape-careers" edge function', 'Edge function retrieves user\'s watchlist companies', 'Fetches career page URLs from database --> for each company, fetches HTML from career page, parses structured data, extracts job listings, filters for internship positions, geographically filters if specified --> upserts jobs to database', 'Returns job count --> frontend refreshes job listings'] },
          { type: 'bullet', text: 'key points', subItems: ['Scraping runs server-side (edge functions) to avoid CORS issues', 'Uses service role key for database writes', 'Handles multiple parsing strategies (JSON-LD, microdata, HTML)', 'Filters invalid job titles & non-internship positions', 'Prevents duplicates via database constraints'] }
        ]
      },
      {
        type: 'subheading',
        text: 'data access patterns',
        content: [
          { type: 'bullet', text: 'reading data', subItems: ['Frontend queries Supabase directly using client SDK', 'RLS policies automatically filter data based on authenticated user', 'React Query caches responses for performance', 'Real-time subscriptions possible (not currently implemented)'] },
          { type: 'bullet', text: 'writing data', subItems: ['User-specific data (watchlist, alerts): direct database writes with RLS', 'Shared data (companies, job listings): edge functions with service role', 'Rationale: shared data requires elevated permissions to prevent conflicts'] }
        ]
      },
      {
        type: 'subheading',
        text: 'company information enrichment',
        content: [
          { type: 'bullet', text: 'User views company --> frontend calls "scrape-company-info" edge function'},
          { type: 'bullet', text: 'Edge function attempts Wikipedia API for description --> falls back to scraping company website --> updates company record in database' },
          { type: 'bullet', text: 'Returns enriched data --> frontend displays updated information'}
        ]
      },
      
      // security architecture section
      { type: 'heading', text: 'security architecture' },
      {
        type: 'subheading',
        text: 'row-level security (RLS)',
        content: [
          { type: 'bullet', text: 'principle: database-level access control enforced by PostgreSQL policies' },
          { type: 'bullet', text: 'policies', table: { rows: [['companies', 'public read, authenticated insert via edge function'], ['job listings', 'public read, authenticated insert via edge function'], ['user watchlist', 'users can only view/modify their own watchlist'], ['job alerts', 'users can only manage their own alerts'], ['profiles', 'users can only view/update their own profile']] } },
          { type: 'bullet', text: 'implementation', subItems: ['Policies use "auth.uid()" function to get current user ID', 'Edge functions use service role key for operations requiring elevated permissions', 'User context still validated in edge functions before using service role']}
        ]
      },
      {
        type: 'subheading',
        text: 'authentication security',
        content: [
          { type: 'bullet', text: 'JWT tokens with automatic refresh'},
          { type: 'bullet', text: 'token stored securely in localStorage'},
          { type: 'bullet', text: 'all API requests include authorization header'},
          { type: 'bullet', text: 'edge functions validate user authentication before processing' }
        ]
      },
      
      // edge functions architecture section
      { type: 'heading', text: 'edge functions architecture' },
      {
        type: 'subheading',
        text: 'function types',
        content: [
          { type: 'bullet', text: 'user-triggered functions', table: { rows: [['add-company', 'adds companies to database and user watchlist'], ['scrape-careers', 'manually triggers job scraping'], ['scrape-company-info', 'enriches company data'], ['search-linkedin-companies', 'searches LinkedIn for company suggestions']] } },
          { type: 'bullet', text: 'data processing functions', subItems: ['All functions use service role key for database operations', 'All functions validate user authentication first', 'Functions handle CORS for browser requests'] }
        ]
      },
      {
        type: 'subheading',
        text: 'deployment model',
        content: [
          { type: 'bullet', text: 'functions deployed independently from frontend'},
          { type: 'bullet', text: 'accessed via HTTPS endpoints'},
          { type: 'bullet', text: 'environment variables for configuration (Supabase URL, keys)'},
          { type: 'bullet', text: 'Deno runtime (not Node.js): TypeScript-first, secure by default'}
        ]
      },
      
      // data persistence section
      { type: 'heading', text: 'data persistence' },
      {
        type: 'subheading',
        text: 'database schema relationships',
        content: [
          { type: 'bullet', text: 'auth.users (Supabase-managed) --> profiles (1:1 with auth.users) --> user_watchlist (many-to-many) --> companies (shared, many-to-many via watchlist) --> job_listings (1:many from companies) --> career pages (1:many from companies)' },
        ]
      },
      {
        type: 'subheading',
        text: 'data lifecycle',
        content: [
          { type: 'bullet', text: 'companies: created once, shared across all users' },
          { type: 'bullet', text: 'job listings: scraped periodically, deduplicated by title/company/URL' },
          { type: 'bullet', text: 'user data: created on signup, deleted on account deletion (cascade)' },
          { type: 'bullet', text: 'watchlist: user-specific, many-to-many relationship' },
        ]
      },

      // external integrations section
      { type: 'heading', text: 'external integrations' },
      {
        type: 'subheading',
        text: 'LinkedIn integration',
        content: [
          { type: 'bullet', text: 'method: web scraping (no official API)' },
          { type: 'bullet', text: 'rate limiting: handled by edge function timeout/abort' },
          { type: 'bullet', text: 'data extracted: company name, LinkedIn URLs, logos' },
        ]
      },
      {
        type: 'subheading',
        text: 'Wikipedia integration',
        content: [
          { type: 'bullet', text: 'method: official REST API' },
          { type: 'bullet', text: 'endpoint: " /api/rest_v1/page/summary"' },
          { type: 'bullet', text: 'data extracted: company descriptions' }
        ]
      },
      {
        type: 'subheading',
        text: 'company websites',
        content: [
          { type: 'bullet', text: 'method: HTTP scraping with HTML parsing' },
          { type: 'bullet', text: 'parsing strategies: JSON-LD structured data, microdata, HTML' },
          { type: 'bullet', text: 'data extracted: job titles, descriptions, locations, deadlines, skills' }
        ]
      },

      // development & deployment section
      { type: 'heading', text: 'development & deployment' },
      {
        type: 'subheading',
        text: 'development environment',
        content: [
          { type: 'bullet', text: 'frontend: Vite dev server (localhost)' },
          { type: 'bullet', text: 'backend: Supabase local development (via Supabase CLI)'},
          { type: 'bullet', text: 'environment variables: " .env" file for Supabase credentials'},
        ]
      },
      {
        type: 'subheading',
        text: 'deployment',
        content: [
          { type: 'bullet', text: 'frontend: deployed via ____' },
          { type: 'bullet', text: 'backend: Supabase cloud platform (managed)' },
          { type: 'bullet', text: 'edge functions: deployed via Supabase CLI ("supabase functions deploy")' }
        ]
      },
      {
        type: 'subheading',
        text: 'configuration management',
        content: [
          { type: 'bullet', text: 'environment variables for API keys and URLs (stored in Supabase config)' },
          { type: 'bullet', text: 'Supabase project configuration in "supabase/config.toml"' },
          { type: 'bullet', text: 'database migrations in "supabase/migrations/"' }
        ]
      },
      
      // scalability considerations section
      { type: 'heading', text: 'scalability considerations' },
      {
        type: 'subheading',
        text: 'current architecture strengths',
        content: [
          { type: 'bullet', text: 'serverless edge functions scale automatically' },
          { type: 'bullet', text: 'database connection pooling handled by Supabase' },
          { type: 'bullet', text: 'React Query caching reduces database load' },
          { type: 'bullet', text: 'RLS policies enforce security at database level' },
        ]
      },
      {
        type: 'subheading',
        text: 'potential bottlenecks',
        content: [
          { type: 'bullet', text: 'sequential scraping in "scrape-careers" function' },
          { type: 'bullet', text: 'external API rate limits (LinkedIn, Wikipedia)' },
          { type: 'bullet', text: 'HTML parsing performance for large career pages' }
        ]
      },
      {
        type: 'subheading',
        text: 'future optimisation opportunities',
        content: [
          { type: 'bullet', text: 'parallel scraping for multiple companies' },
          { type: 'bullet', text: 'background job processing via Supabase cron jobs' },
          { type: 'bullet', text: 'caching of scraped company info' },
          { type: 'bullet', text: 'rate limiting and retry logic for external APIs' }
        ]
      },
     
      // monitoring & observability section
      { type: 'heading', text: 'monitoring & observability' },
      {
        type: 'subheading',
        text: 'current state',
        content: [
          { type: 'bullet', text: 'console logging in edge functions' },
          { type: 'bullet', text: 'Supabase dashboard for database monitoring' },
          { type: 'bullet', text: 'no centralized logging or error tracking (future enhancement)' },
        ]
      },
      {
        type: 'subheading',
        text: 'improvements',
        content: [
          { type: 'bullet', text: 'error tracking service (Sentry, LogRocket)' },
          { type: 'bullet', text: 'performance monitoring' },
          { type: 'bullet', text: 'scraping success rate tracking' },
          { type: 'bullet', text: 'user activity analytics' },
        ]
      }
    ],
    lifecycleContent: {
      "problem statement": "Students who are applying for internships struggle to know when postings within their target companies are released. This leads students to miss some postings and, therefore, opportunities, as many postings receive an influx of applications immediately upon posting.",
      "unique value proposition": "While Google Alert and job boards like LinkedIn, Indeed, and Glassdoor have similar functions, the unique value proposition of InternshipNet is that all of a user’s target companies are centralized. They then receive an alert as soon as their watchlist companies’ internship postings drop. Additionally, information such as visa sponsorship, acceptance rate, location, duration, and key skills are also listed– information that often influences a student’s decision to apply to and/or accept an internship offer.",
      "mvp success metrics": [
        { main: "Percentage of users who add 3+ companies to their watchlist within their first session", subItems: ["Indicates user interest and clarity of value"] },
        { main: "Time from posting drop to notification arriving in inbox", subItems: ["Confirms functional speed reliability of core feature"] },
        { main: "Notification engagement rate: percentage of notifications that are opened within 24 hours", subItems: ["Indicates value of alerts to users"] },
        { main: "Post-alert application intent rate: percentage of users who apply to the job posting after receiving a notification", subItems: ["Indicates the alert-to-action conversion"]},
        { main: "Sign-up rate"},
        { main: "DAU, MAU, retention rates, watchlist churn rate", subItems: ["Track via user analytics"] },
        { main: "Landing page conversion rate: percentage of visitors who sign up after seeing the landing page"}
      ],
      "tracking note": "To track: ask beta testers to note down and track quantity accordingly",
      "design notes": "InternshipNet follows an edgy, techy, metallic ocean theme. This theme is executed through the gradient colour palette, as well as wordplay throughout the website. This theme was chosen to represent how fleeting many job postings are, with the application window often “swimming by” (even though many postings stay active for months, the bulk of applications considered are those sent in earlier). The website icon of kelp represents growth, but also an ability to “catch fish” as they “swim by”. The choice of a metallic ocean theme over a more light and growth-focused one was to suggest rapid movement and consistent momentum.",
      "development - systems architecture": "Currently developing the MVP (doesn't work completely correctly yet), but see documentation for how the code works as of right now!",
      "functional improvements & iterations": [
        "More cohesive UI",
        "Remove job postings from watchlist if they become inactive, and alert user"
      ]
    }
  },
  {
    id: "bounce-app-feature-improvement",
    title: "Bounce App Feature Improvement",
    status: "in progress",
    lifecycleStep: "mvp & OKRs",
    description: "Bounce is an event ticketing platform that recently partnered with WFN. As an event organizer and attendee, I recognized some pain points and opportunities for improvement. Therefore, I've ideated a new feature that will address these.",
    impact: "In contact with Bounce representatives, and will present project to decision-makers, influencing product roadmap decisions.",
    skills: ["User Research", "Problem Identification", "Feature Ideation", "Prioritization (RICE)", "Stakeholder Communication", "Real-World Application"],
    githubLink: "https://github.com/placeholder",
    figmaLink: "https://figma.com/placeholder",
    image: "/bounce_logo.png",
    lifecycleContent: {
      "discovery - problem statement": "Bounce users who both organize and attend events through the web app platform struggle to distinguish between organizer-only and attendee-only features. This leads users to accidentally interact with features or use tools that are irrelevant to their intent.",
      "discovery - user research": [
        {main: "Example behaviours:", subItems: ["Organizers accidentally create an event under their personal Bounce account instead of under their organization user interest and clarity of value", "Organizers struggle to find where to purchase tickets to their own event, leading to them having to coordinate directly with the organizing team, which can lead to inefficiencies in documentation"] },
        {main: "Why this matters:", subItems: ["After speaking with Bounce representatives, Bounce's strategic direction is to partner with professional student organizations as well and expand beyond 'bar nights'; right now, its brand image is that of a party life event platform. Therefore, they are actively sourcing partnerships with professional student organizations (WFN being one of them), and these organizations typically already operate within their university's student council (e.g., Western USC) or have a direct ticketing platforrm. For these student orgs to choose Bounce as a partner, especially with the additional fee, the event organization experience must be smoother, specifically for event organizers, who are also students likely using the platform to attend other local events."]},
        {main: "Target user persona:", subItems: ["Users who organize/manage events on behalf of an organization but also attends other events personally."]},
        {main: "Current state - user journey", image: "/Current State - User Journey.png"}
      ],
      "feature ideation & prioritization": [
        {main: "Possible features:", numberedItems: [
          {main: "Different dashboard UI for attendee vs. organizer modes", subItems: ["Clearer role switch toggle (header taskbar)", "Role-specific footer taskbar - 'Feed', 'Explore', 'Tickets', 'Chat' for Attendee, 'Host Event', Event Analytics', 'Chat' for Organizer"]},
          {main: "Distinct colour palette for attendee vs. organizer modes", subItems: ["Need to still align with Bounce's colour palette"]},
          {main: "Smart role detection", subItems: ["Automatically shows organizer tools only when the user is viewing owned events"]}
        ]},
        {main: "Prioritization - RICE:", table: { rows: [['Concept', 'Reach', 'Impact', 'Confidence', 'Effort'], ['Different Dashboard UI', 'High', 'High', 'High', 'Medium'], ['Role-specific Colour Palette', 'Medium', 'Medium', 'High', 'Low'], ['Smart Role Detection', 'Medium', 'High', 'Medium', 'High']] } },
        {main: "Feature choice:", subItems: ["Role-specific distinct dashboard UI"]},
        {main: "Future state - user journey:", image: "/Future State - User Journey.png"}
      ],
      "feature specification": "Click on the FRD below :)",
      "mvp & OKRs": "Coming soon!",
        // embed figma mockup link
      "development": "This will be at the discretion of Bounce representatives.",
      "iterations & improvements": "Coming soon!",
      "project presentation": "Figma link above will become active!"
    },
    frdContent: [
      // feature
      {type: 'heading', text: "feature"},
      {main: "Host/Attendee Mode Toggle for Bounce Web App"},
      // tl;dr
      {type: 'heading', text: "tl;dr"},
      {main: "A feature add to the Bounce browser web app that adds distinct 'Host' and 'Attendee' modes for dual-role Bounce users, with role-specific header toggle and footer navigation tabs. This addresses ocnfusion and inefficiency experienced by users who both organize events for their organization and attend local events as attendees, streamlining workflows and reducing support friction."},
      // goals
      {type: 'heading', text: "goals"},
      {main: "Business Goals", subItems: ["Reduce support tickes related to account/role confusion by 40%", "Increase user retention and engagemement among dual-role users", "Improve event creation efficiency to drive more hosted events", "Strengthen platform stickiness for high-value organizational users, aligning with strategic direction of partnership with professional organizations"]},
      {main: "Users Goals", subItems: ["Seamlessly switch between hosting and attending contexts", "Access role-appropriate tools and information quickly", "Reduce cognitive load when navigating between different use cases", "Complete event creation and management tasks more efficiently"]},
      {main: "Non-Goals", subItems: ["Mobile app implementation (web browser only)", "Separate account creation or login flows", "Changes to existing event discovery algorithms", "Integration with third-party calendar systems"]},
      // user stories
      {type: 'heading', text: "user stories"},
      // put user stories here
      {main: "Dedicated David, Lead Singer of a local band", subItems: ["As a gig organizer, I want a clear Host Mode so I can manage gigs without mixing them up with similar music events I attend."]},
      {main: "Overcommitted Olivia, President of a professional student club", subItems: ["As a club president, I want a fast way to switch roles so I don't accidentally act as an attendee when organizing events, blurring the lines between my personal life and professional role."]},
      {main: "Multitasking Michelle, Venue Manager of a local restaurant", subItems: ["As a venue manager, I want organizer-specific tools in one place so I can run events quickly between my other tasks."]},
      // functional requirements
      {type: 'heading', text: "functional requirements"},
      {main: "Priority 1 (MVP):", subItems: ["Header toggle switch between 'Host' and 'Attendee' modes with clear visual distinction", "Mode-specific footer navigation tabs (Host: Create Event, Event Analytics, Chat; Attendee: Feed, Explore, Tickets, Chat)"]},
      {main: "Priority 2 (Enhancement):", subItems: ["Contextual mode suggestions based on user behaviour patterns", "Quick-switch shortcuts and keyboard navigation", "Mode-specific dashboard customization", "Enhanced analytics views for host mode"]},
      {main: "Priority 3 (Future):", subItems: ["Role-based notification preferences", "Advanced host tools integration", "Attendee socila features expansion"]},
      // user experience
      {type: 'heading', text: "user experience"},
      {main: "Initial user flow: First-time dual-role users see onboarding tooltip explaining toggle functionality"},
      {main: "Mode switching: Single-click toggle in header with smooth transition animation and confirmation of active mode"},
      {main: "Navigation consistency: Chat remains available in both modes, but other tabs update based on selected role"},
      {main: "Visual clarity: Distinct colour schemes differentiate modes without overwhelming UI"},
      {main: "Edge cases and UI notes:", subItems: ["Handle users mid-task when switching modes (Save draft states, show appropriate warnings", "Graceful fallback fi user permissions don't match selected mode", "Clear error messaging for role-specific actions attempted in wrong mode", "Responsive design considerations for different screen sizes"]},
      // narrative
      {type: 'heading', text: "narrative"},
      {main: "It's a Tuesday morning, and Overcommitted Olivia needs to finalize details for her professional student club's upcoming conference. She opens Bounce and immediately sees she's in Attendee mode from browsing weekend events the last time she used platform. One click on the header toggle switches her ot Host mode, where her existing event draft, analytics from last month's event, and creation tools are prominently displayed. She publishes the event in under 5 minutes."},
      {main: "Later that evening, happy that she's published the event and waiting for sign-ups, Overcommitted Olivia switches back to Attendee mode to browse local networking events. The interface nwo shows her personal ticket history, personalized event recommendations, and community feed, exactly what she needs as an event-goer! No confusion, no wasted clicks, just the right tools at the right time."},
      {type: 'heading', text: 'success metrics'},
      {main: "Adoption: ≥60% of dual-role userse engage with toggle within first 30 days"},
      {main: "Engagement: +20% average time spent in Host Mode per active organizer vs. baseline"},
      {main: "Error Reduction: -40% support tickets about wrong account/event ownership issues"},
      {main: "Efficiency: Event creation time reduced by 2 minutes"},
      {main: "Retention: +10-15% in repeat hosting rate within 60 days"},
      // milestones & sequencing
      {type: 'heading', text: "milestones & sequencing"},
      {main: "Phase 1 (Weeks 1-3): Core toggle functionality and basic mode-specific navigation", subItems: ["Implement header toggle component", "Build mode-specific footer tabs", "Add user preference storage", "Basic QA and internal testing"]},
      {main: "Phase 2 (Weeks 4-5): Polish and optimization", subItems: ["UI/UX refinements based on internal feedback", "Performance optimization for mode switching", "Edge case handling and error states", "Comprehensive testing across browsers"]},
      {main: "Phase 3 (Weeks 6-8): Launch and iteration", subItems: ["Gradual rollout to dual-role user segment", "Monitor success metrics and user feedback", "Quick iteration cycle for immediate improvements", "Prepare enhancement backlog based on learnings"]}
    ],
  },
  {
    id: "brainstation-course-project",
    title: "BrainStation Product Management Certification Course",
    status: "in progress",
    lifecycleStep: "mvp & testing",
    description: "Course led by Njeri Grevious, Senior PM - Copilot Experiences @ Microsoft. Creating a product to combat the 'hobby crisis' and increase mindfulness. Project presentation and feedback takes place December 17, 2025.",
    impact: "",
    skills: ["Product Lifecycle Management", "Discovery & Hypothesis Testing", "User Research & Personas", "Competitive Analysis", "Value Proposition", "Product Strategy"],
    githubLink: "https://github.com/placeholder",
    figmaLink: "https://figma.com/placeholder",
    image: "/project-brainstation.jpg",
    lifecycleContent: {
      "strategy submission slidedeck": [
        {main: "Strategy submission"},
      ],
      "mvp & testing": "Coming soon, MVP link will go here!",
      "development": "Coming soon!",
      "metrics": "Coming soon!",
      "iterations & improvements": "Coming soon!",
    }
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

