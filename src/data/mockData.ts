import { User, Achievement, Article, Mentor, Notice, Meeting } from "../types";
import Dogesh from "../assets/dogesh.jpg";
import Bhediya from "../assets/bhediya.jpg";
import pfp1 from "../assets/pfp1.jpg";
import ws from "../assets/ws.jpg";

export const studentUser: User = {
  id: "1",
  name: "Ansal Pandey",
  email: "pandeyji@email.com",
  avatar: Dogesh,
  title: "Computer Science Graduate",
  level: "Silver",
  levelProgress: 75,
  joinDate: "2023-01-15",
  achievements: [],
  articles: [],
  role: "student",
};

export const alumniUser: User = {
  id: "2",
  name: "Mr. Aman",
  email: "aman@alumni.test",
  avatar: Bhediya,
  title: "Senior Software Engineer at Lund University International",
  level: "Gold",
  levelProgress: 58,
  joinDate: "2020-05-10",
  achievements: [],
  articles: [],
  role: "alumni",
};

export const adminUser: User = {
  id: "3",
  name: "Sir Ankit",
  email: "ankit@gradapp.test",
  avatar: ws,
  title: "System Administrator",
  level: "Gold",
  levelProgress: 100,
  joinDate: "2019-01-01",
  achievements: [],
  articles: [],
  role: "admin",
};

// Backward compatibility: default currentUser as student
export const currentUser: User = studentUser;

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "Academic Excellence Award",
    description: "Graduated with honors in Computer Science",
    date: "2023-12-15",
    type: "academic",
    badge: "🎓",
  },
  {
    id: "2",
    title: "Tech Internship Completed",
    description: "Successfully completed 6-month internship at Google",
    date: "2023-08-30",
    type: "professional",
    badge: "💼",
  },
  {
    id: "3",
    title: "Hackathon Winner",
    description: "First place in University Hackathon 2023",
    date: "2023-03-20",
    type: "extracurricular",
    badge: "🏆",
  },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "Breaking into Tech: A Junior's Journey",
    description:
      "My experience transitioning from university to the tech industry",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Sarah Johnson",
    date: "2024-01-15",
    category: "Career Advice",
    tags: ["tech", "career", "junior"],
    likes: 24,
    views: 156,
  },
  {
    id: "2",
    title: "The Importance of Networking in Tech",
    description: "How building connections can accelerate your career",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Mike Chen",
    date: "2024-01-10",
    category: "Networking",
    tags: ["networking", "career", "professional"],
    likes: 18,
    views: 89,
  },
];

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Emily Rodriguez",
    title: "Senior Software Engineer",
    company: "Microsoft",
    expertise: ["Machine Learning", "Python", "Data Science"],
    rating: 4.9,
    availability: "Available",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Experienced ML engineer with 8+ years in tech industry",
    experience: 8,
  },
  {
    id: "2",
    name: "James Wilson",
    title: "Product Manager",
    company: "Google",
    expertise: ["Product Strategy", "Leadership", "Analytics"],
    rating: 4.8,
    availability: "Busy",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Product leader focused on user-centric solutions",
    experience: 6,
  },
  {
    id: "3",
    name: "Lisa Park",
    title: "UX Designer",
    company: "Apple",
    expertise: ["UI/UX Design", "Prototyping", "User Research"],
    rating: 4.7,
    availability: "Available",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Design thinking advocate with focus on accessibility",
    experience: 5,
  },
];

export const notices: Notice[] = [
  {
    id: "1",
    title: "New Mentorship Program Launch",
    content:
      "We are excited to announce our new AI-powered mentorship matching system...",
    category: "Announcement",
    priority: "urgent",
    date: "2024-01-20",
    author: "Admin Team",
  },
  {
    id: "2",
    title: "Career Fair 2024 Registration Open",
    content:
      "Register now for our annual career fair featuring top tech companies...",
    category: "Events",
    priority: "normal",
    date: "2024-01-18",
    author: "Career Services",
  },
  {
    id: "3",
    title: "Platform Maintenance Scheduled",
    content: "Scheduled maintenance on January 25th from 2-4 AM EST...",
    category: "Technical",
    priority: "info",
    date: "2024-01-16",
    author: "Tech Team",
  },
];

export const meetings: Meeting[] = [
  {
    id: "1",
    title: "Career Guidance Session",
    mentor: "Dr. Emily Rodriguez",
    date: "2024-01-25T14:00:00Z",
    duration: 60,
    type: "virtual",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Portfolio Review",
    mentor: "Lisa Park",
    date: "2024-01-27T16:00:00Z",
    duration: 45,
    type: "virtual",
    status: "upcoming",
  },
];

// Demo credentials for local authentication only
export const demoCredentials = {
  email: "demo@gradapp.test",
  password: "demo1234",
};
