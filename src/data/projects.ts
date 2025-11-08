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
    [key: string]: string | string[] | (string | { main: string; subItems?: string[]; image?: string })[];
  };
  architectureContent?: string | string[] | Array<any>;
}

export const projects: Project[] = [
  {
    id: "internshipnet",
    title: "InternshipNet",
    status: "in progress",
    lifecycleStep: "development",
    description: "A website that helps users track every target company in a watchlist, and notifications as soon as job postings for these companies drop.",
    impact: "Increased number of applications submitted on the day of release by 40%",
    skills: ["User Research", "Product Strategy", "Wireframing", "A/B Testing"],
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
    lifecycleStep: "mvp",
    description: "Bounce is an event ticketing platform that recently partnered with WFN. As an event organizer and user, I recognized some pain points and opportunities for improvement. Therefore, I've ideated a new feature that will address these.",
    impact: "In contact with Bounce representatives, and will present project to decision-makers, influencing product roadmap decisions.",
    skills: ["Market Research", "Data Analysis", "Competitive Analysis", "Presentation"],
    githubLink: "https://github.com/placeholder",
    figmaLink: "https://figma.com/placeholder",
    image: "/project-bounce.jpg",
    lifecycleContent: {
      "discovery - problem statement": "Bounce users who both organize and attend events through the web app platform struggle to distinguish between organizer-only and attendee-only features. This leads users to accidentally interact with features or use tools that are irrelevant to their intent.",
      "discovery - user research": [
        {main: "Example behaviours:", subItems: ["Organizers accidentally create an event under their personal Bounce account instead of under their organization user interest and clarity of value", "Organizers struggle to find where to purchase tickets to their own event, leading to them having to coordinate directly with the organizing team, which can lead to inefficiencies in documentation"] },
        {main: "Why this matters:", subItems: ["After speaking with Bounce representatives, Bounce's strategic direction is to partner with professional student organizations as well and expand beyond 'bar nights'; right now, its brand image is that of a party life event platform. Therefore, they are actively sourcing partnerships with professional student organizations (WFN being one of them), and these organizations typically already operate within their university's student council (e.g., Western USC) or have a direct ticketing platforrm. For these student orgs to choose Bounce as a partner, especially with the additional fee, the event organization experience must be smoother, specifically for event organizers, who are also students likely using the platform to attend other local events."]},
        {main: "Current state - user journey", image: "/placeholder.jpg"}
      ],
      "feature prioritization & specification": "Your custom content for feature prioritization step here",
      "mvp": "Currently working on the MVP, Figma link above!",
      "development": "This will be at the discretion of Bounce representatives.",
      "testing & metrics": "Coming soon!",
      "iterations & improvements": "Coming soon!"
    }
  },
  {
    id: "brainstation-course-project",
    title: "BrainStation Product Management Certification Course",
    status: "in progress",
    lifecycleStep: "discovery",
    description: "Course led by Njeri Grevious, Senior PM - Copilot Experiences @ Microsoft. Creating a product at the intersection of social connection and productivity. Project presentation and feedback takes place December 17, 2025.",
    impact: "",
    skills: ["Agile", "User Stories", "Analytics", "Cross-functional Collaboration"],
    githubLink: "https://github.com/placeholder",
    figmaLink: "https://figma.com/placeholder",
    image: "/project-brainstation.jpg",
    lifecycleContent: {
      "discovery - problem statement": "Your custom content for problem statement step here",
      "discovery - user research": "Your custom content for user research step here",
      "feature prioritization & specification": "Coming soon!",
      "design": "Coming soon!",
      "development": "Coming soon!",
      "mvp & testing": "Coming soon!",
      "metrics": "Coming soon!",
      "iterations & improvements": "Coming soon!"
    }
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

