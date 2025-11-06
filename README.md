# Portfolio Website - Caroline Ge

A personal portfolio website showcasing my work, projects, and experiences.

## 🎨 Features

- **Hero Section**: Introduction
- **About Me**: Three guiding principles (people, process, passion)
- **Projects Showcase**: Detailed project cards with status indicators and lifecycle tracking
  - Project detail pages with custom lifecycle documentation
  - Architecture documentation pages for technical projects
  - GitHub and Figma links for each project
- **Experience Timeline**: Professional experience with photos and detailed descriptions
- **Skills**: Technical and professional skills display
- **Contact**: Resume download and contact information

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library (built on Radix UI)
- **Lucide React** - Icon library


## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── About.tsx        # About me section
│   │   ├── BackToTop.tsx    # Floating back-to-top button
│   │   ├── Contact.tsx      # Contact section
│   │   ├── Experience.tsx   # Experience timeline
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Projects.tsx     # Projects showcase
│   │   ├── Skills.tsx       # Skills display
│   │   ├── scrapbook-arrow.tsx    # Custom arrow component
│   │   └── scrapbook-image.tsx    # Scrapbook-style image component
│   ├── pages/               # Route pages
│   │   ├── Index.tsx        # Main landing page
│   │   ├── ProjectDetail.tsx      # Individual project pages
│   │   ├── ArchitectureDetail.tsx # Architecture documentation pages
│   │   ├── Resume.tsx       # Resume viewer
│   │   └── NotFound.tsx     # 404 page
│   ├── data/
│   │   └── projects.ts      # Project data and content
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── public/                  # Static assets
│   ├── flower.png           # Favicon
│   ├── left_arrows.png      # Left-pointing arrow images
│   ├── right_arrows.png     # Right-pointing arrow images
│   ├── me1.jpg              # Personal photos
│   └── SYCarolineGe_Resume.pdf
└── .github/
    └── workflows/
        └── deploy.yml        # GitHub Actions deployment workflow
```
## 📚 Documentation

### Project Content

Project details and lifecycle content are managed in `src/data/projects.ts`. Each project can have:
- Custom lifecycle steps and content
- Architecture documentation
- GitHub and Figma links
- Status indicators (completed/in progress with lifecycle step)

### Adding New Projects

1. Open `src/data/projects.ts`
2. Add a new project object to the `projects` array with:
   - `id`: Unique identifier (used in URLs)
   - `title`: Project name
   - `status`: "completed" or "in progress"
   - `lifecycleStep`: Current step (if in progress)
   - `description`: Short description
   - `impact`: Impact statement
   - `skills`: Array of skills used
   - `lifecycleContent`: Object with custom lifecycle steps and content
   - `architectureContent`: Array for architecture documentation (optional)

### Customizing Content

- **About Section**: Edit `src/components/About.tsx`
- **Experience**: Edit `src/components/Experience.tsx`
- **Skills**: Edit `src/components/Skills.tsx`
- **Hero Section**: Edit `src/components/Hero.tsx`
- **Contact**: Edit `src/components/Contact.tsx`

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Styling

The website uses Tailwind CSS with custom theme colours.

### Scrapbook Components

- **ScrapbookImage**: Displays images with arrows and callout text
- **ScrapbookArrow**: Custom arrow component with configurable positioning
- **SimpleScrapbookArrow**: Simplified arrow component with preset directions

## 🌐 Live Site

This portfolio is hosted on a custom domain ([carolinege.me](https://carolinege.me)) and is publicly accessible. The site is automatically deployed via GitHub Actions when changes are pushed to the `main` branch.

## 🎨 Design Philosophy

This portfolio follows a cozy "scrapbook" or "story" aesthetic:
- Warm colour palette of soft purple, cream, green, and dark grey for a cozy feel
- Hand-drawn style arrows pointing to images and sections
- Personal photos integrated throughout
- Lowercase headings and UI elements for a casual, approachable feel
- Story-like flow through sections

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a personal portfolio project. For questions or feedback, please reach out through the contact section on the website.
