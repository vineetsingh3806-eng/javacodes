/**
 * App-wide constants and navigation configuration.
 */

export const APP_NAME = "StoryLens AI";
export const APP_TAGLINE =
  "Turn any document into interactive stories — powered by AI.";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/** Navigation item shape. */
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  description?: string;
}

/** Grouped navigation section. */
export interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * Grouped sidebar navigation.
 * Each icon string maps to a Lucide icon in the Sidebar's iconMap.
 */
export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: "LayoutDashboard",
        description: "Home & analytics",
      },
    ],
  },
  {
    title: "Create",
    items: [
      {
        label: "Upload Documents",
        href: "/upload",
        icon: "Upload",
        description: "Import PDF, DOCX & more",
      },
      {
        label: "AI Chat",
        href: "/chat",
        icon: "MessageSquare",
        description: "Ask questions about documents",
      },
      {
        label: "Timeline",
        href: "/timeline",
        icon: "Clock",
        description: "Chronological events",
      },
      {
        label: "Mind Map",
        href: "/mindmap",
        icon: "Network",
        description: "Visualize concepts",
      },
      {
        label: "Concept Graph",
        href: "/concept-graph",
        icon: "GitBranch",
        description: "Connected ideas",
      },
      {
        label: "Knowledge Graph",
        href: "/knowledge-graph",
        icon: "Database",
        description: "Entity relationships",
      },
      {
        label: "Semantic Search",
        href: "/semantic-search",
        icon: "Search",
        description: "Find meaning",
      },
    ],
  },
  {
    title: "Learn & Share",
    items: [
      {
        label: "Quiz",
        href: "/quiz",
        icon: "BrainCircuit",
        description: "Test comprehension",
      },
      {
        label: "Flashcards",
        href: "/flashcards",
        icon: "Layers",
        description: "Review key concepts",
      },
      {
        label: "Podcast",
        href: "/podcast",
        icon: "Mic2",
        description: "Audio script",
      },
      {
        label: "Presentation",
        href: "/presentation",
        icon: "Presentation",
        description: "Slide deck",
      },
      {
        label: "Teacher Mode",
        href: "/teacher-mode",
        icon: "GraduationCap",
        description: "Lesson plan tools",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        label: "Document Compare",
        href: "/document-compare",
        icon: "Files",
        description: "Compare documents",
      },
      {
        label: "Exports",
        href: "/exports",
        icon: "Download",
        description: "Download content",
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: "BarChart3",
        description: "Usage insights",
      },
    ],
  },
];

/** Flattened nav items (backward-compatible export). */
export const NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((section) => section.items);

/** Bottom "Account" section of the sidebar. */
export const SETTINGS_NAV: NavItem[] = [
  { label: "Profile", href: "/profile", icon: "UserRound" },
  { label: "Settings", href: "/settings", icon: "Settings" },
];

/** Allowed upload file extensions. */
export const ACCEPTED_FILE_TYPES = [
  ".pdf",
  ".docx",
  ".pptx",
  ".txt",
  ".md",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".tiff",
  ".bmp",
];

export const MAX_UPLOAD_SIZE_MB = 25;

/** Sample notification bell items (UI-only until a notifications API lands). */
export const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    title: "Document ready",
    message: "Your PDF finished processing and is ready for AI chat.",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    title: "Quiz generated",
    message: "A new quiz was created from “History of Rome”.",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    title: "Welcome to StoryLens AI",
    message: "Upload your first document to get started.",
    time: "1d ago",
    unread: false,
  },
];

