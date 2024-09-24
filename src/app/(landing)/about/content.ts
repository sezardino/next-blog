import {
  BarChart,
  Bell,
  Clock,
  Download,
  Edit3,
  Eye,
  FileText,
  Image,
  Lock,
  Save,
  Search,
  Shield,
  Tag,
  ThumbsUp,
  TrendingUp,
  User,
  UserCheck,
  Users,
} from "lucide-react";

export const aboutHeroSection = {
  title: "Welcome to the Future of Blogging",
  subtitle: `A powerful platform for creating, managing, and sharing your ideas
              with the world. Empower your voice with a blog designed for
              everyone.`,
  newVersion: "New Release",
  cta: "Explore Features",
};

export const aboutFeaturesSection = {
  title: "Our Core Features",
  badge: "Features",
  subtitle:
    "Discover the tools that make blogging simple and effective. Each feature is designed to help you create, share, and grow.",
  features: [
    {
      name: "Intuitive WYSIWYG Editor",
      description:
        "Easily create and format posts with a user-friendly visual editor. No need for coding knowledge.",
      icon: Edit3,
    },
    {
      name: "Tags and Hashtags",
      description:
        "Organize your content and boost its visibility with a powerful tag and hashtag system.",
      icon: Tag,
    },
    {
      name: "Post Analytics",
      description:
        "Track the performance of your posts in real time and make data-driven decisions.",
      icon: BarChart,
    },
    {
      name: "Scheduled Publishing",
      description:
        "Plan posts in advance and automatically publish them at your desired time.",
      icon: Clock,
    },
    {
      name: "Likes and Comments",
      description:
        "Let readers interact with content through likes and comments, boosting engagement.",
      icon: ThumbsUp,
    },
    {
      name: "Restricted Access to Posts",
      description:
        "Grant access to articles via link, email, or only to specific users.",
      icon: Lock,
    },
    {
      name: "Search by Keywords and Tags",
      description:
        "Easily find articles using a search system based on keywords, tags, or authors.",
      icon: Search,
    },
    {
      name: "Backups and Autosave",
      description:
        "All your posts are automatically saved and backed up for protection.",
      icon: Save,
    },
    {
      name: "Image Support",
      description:
        "Add images to your articles to create visually engaging content.",
      icon: Image,
    },
    {
      name: "Notifications and Subscriptions",
      description:
        "Receive notifications about new posts or subscribe to your favorite authors.",
      icon: Bell,
    },
    {
      name: "View Counts and Statistics",
      description:
        "Track the number of views and analyze which posts are the most popular.",
      icon: Eye,
    },
    {
      name: "SEO Support",
      description:
        "Optimize your articles for search engines to increase content visibility.",
      icon: TrendingUp,
    },
    {
      name: "Roles and Access Control",
      description:
        "Manage platform access through administrator, editor, or author roles.",
      icon: UserCheck,
    },
    {
      name: "Post Export",
      description:
        "Export your posts in JSON format for backup or other systems.",
      icon: Download,
    },
    {
      name: "Author Profile",
      description:
        "Readers can view all posts created by an author on their personal page.",
      icon: User,
    },
    {
      name: "Comment Moderation",
      description:
        "Allows authors or admins to moderate comments, remove unwanted content, or block users.",
      icon: Shield,
    },
    {
      name: "Drafts and Autosave",
      description:
        "Create drafts of articles and save them for future publishing, with autosave functionality.",
      icon: FileText,
    },
    {
      name: "Multi-Author Posts",
      description:
        "Collaborate with other authors to create joint posts with multiple contributors.",
      icon: Users,
    },
  ],
};
