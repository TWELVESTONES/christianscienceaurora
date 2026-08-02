import type {
  ArticleItem,
  EventItem,
  ExternalResource,
  ProductItem,
  SermonItem,
  SundaySchoolResource
} from "@/lib/types";

export const events: EventItem[] = [
  {
    slug: "sunday-service-july-19-2026",
    title: "Sunday Service and Sunday School",
    summary: "Weekly worship and Sunday School. Everyone is welcome.",
    category: "Service",
    start: "2026-07-19T10:00:00-06:00",
    end: "2026-07-19T11:00:00-06:00",
    timezone: "America/Denver",
    location: "15700 E. Quincy Avenue, Aurora, Colorado 80015",
    recurring: "Weekly on Sunday at 10:00 a.m.",
    status: "scheduled",
    featured: true,
    cost: "Free",
    accessibility: "Fully Accessible",
    parking: "CMS / Church Confirmation: publish verified parking and entrance details.",
    familySuitable: true
  },
  {
    slug: "wednesday-testimony-meeting-july-22-2026",
    title: "Wednesday Testimony Meeting",
    summary: "A midweek gathering with hymns, readings, prayer, gratitude, and voluntary sharing.",
    category: "Service",
    start: "2026-07-22T19:30:00-06:00",
    end: "2026-07-22T20:30:00-06:00",
    timezone: "America/Denver",
    location: "15700 E. Quincy Avenue, Aurora, Colorado 80015",
    recurring: "Weekly on Wednesday at 7:30 p.m.",
    status: "scheduled",
    featured: true,
    cost: "Free",
    accessibility: "Fully Accessible",
    parking: "CMS / Church Confirmation: publish verified parking and entrance details.",
    familySuitable: true
  },
  {
    slug: "public-talk-placeholder",
    title: "Public Talk — Church Confirmation Required",
    summary: "Campaign-ready event placeholder. Replace with an approved title, speaker, date, and permissions record.",
    category: "Talk",
    start: "2026-09-20T14:00:00-06:00",
    end: "2026-09-20T15:00:00-06:00",
    timezone: "America/Denver",
    location: "Location pending church confirmation",
    status: "scheduled",
    featured: true,
    cost: "To be confirmed",
    accessibility: "To be confirmed before publication.",
    parking: "To be confirmed before publication.",
    familySuitable: true
  }
];

export const sermons: SermonItem[] = [
  {
    slug: "peace-through-prayer-placeholder",
    title: "Peace Through Prayer — Approved Media Placeholder",
    serviceDate: "2026-07-12",
    topic: "Peace",
    summary: "A sample sermon record demonstrating audio, video, transcript, citation, and rights-review fields without republishing protected Bible Lesson content.",
    formats: ["audio", "video", "text"],
    duration: "42:18",
    rightsStatus: "placeholder"
  },
  {
    slug: "discovering-hope-placeholder",
    title: "Discovering Hope — Summary Placeholder",
    serviceDate: "2026-07-05",
    topic: "Hope",
    summary: "A concise, permission-aware summary placeholder for a recent service.",
    formats: ["text"],
    rightsStatus: "placeholder"
  },
  {
    slug: "god-love-placeholder",
    title: "Understanding God’s Love — Media Placeholder",
    serviceDate: "2026-06-28",
    topic: "God’s Love",
    summary: "A sample library card. Publication requires completed rights, accessibility, and editorial reviews.",
    formats: ["audio", "text"],
    duration: "38:05",
    rightsStatus: "placeholder"
  }
];

export const articles: ArticleItem[] = [
  {
    slug: "what-to-expect-first-visit",
    title: "What can I expect at my first Christian Science service?",
    category: "New Here",
    summary: "A practical guide to arrival, worship, participation, and what happens after the service.",
    author: "Christian Science Aurora editorial team",
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-10",
    readingTime: "4 min read"
  },
  {
    slug: "questions-are-welcome",
    title: "Why questions are welcome here",
    category: "Prayer and Healing",
    summary: "An introduction to thoughtful spiritual exploration without pressure or prior knowledge.",
    author: "Christian Science Aurora editorial team",
    publishedAt: "2026-07-02",
    updatedAt: "2026-07-02",
    readingTime: "3 min read"
  },
  {
    slug: "reading-room-quiet-study",
    title: "A quiet place to read, study, and ask questions",
    category: "Reading Room",
    summary: "A placeholder feature explaining the Reading Room experience; hours and location require confirmation.",
    author: "Reading Room editor",
    publishedAt: "2026-06-25",
    updatedAt: "2026-06-25",
    readingTime: "4 min read"
  }
];

export const products: ProductItem[] = [
  {
    slug: "science-and-health-placeholder",
    title: "Science and Health with Key to the Scriptures",
    author: "Mary Baker Eddy",
    category: "Mary Baker Eddy",
    price: 0,
    format: "Format and price require inventory confirmation",
    availability: "Special order",
    permissionStatus: "placeholder"
  },
  {
    slug: "bible-study-resource-placeholder",
    title: "Bible Study Resource — Product Placeholder",
    author: "Publisher confirmation required",
    category: "Bible Study",
    price: 0,
    format: "Paperback placeholder",
    availability: "Special order",
    permissionStatus: "placeholder"
  },
  {
    slug: "family-resource-placeholder",
    title: "Family Resource — Product Placeholder",
    author: "Publisher confirmation required",
    category: "Families",
    price: 0,
    format: "Activity resource placeholder",
    availability: "Special order",
    permissionStatus: "placeholder"
  },
  {
    slug: "periodical-placeholder",
    title: "Christian Science Periodical — Inventory Placeholder",
    author: "Publisher confirmation required",
    category: "Periodicals",
    price: 0,
    format: "Current issue placeholder",
    availability: "Special order",
    permissionStatus: "placeholder"
  }
];

export const sundaySchoolResources: SundaySchoolResource[] = [
  {
    slug: "gratitude-garden",
    title: "Grow a Gratitude Garden",
    type: "Gratitude activity",
    ageGroup: "Ages 6–11",
    topic: "Gratitude",
    estimatedTime: "15 minutes",
    delivery: "Printable",
    adultAssistance: "A little",
    summary: "Write one good thing on each paper leaf and build a garden of gratitude together."
  },
  {
    slug: "courage-maze",
    title: "The Courage Maze",
    type: "Puzzle",
    ageGroup: "Ages 7–12",
    topic: "Courage",
    estimatedTime: "10 minutes",
    delivery: "Printable",
    adultAssistance: "None",
    summary: "Find the path while thinking about one brave, kind choice you can make today."
  },
  {
    slug: "kindness-story-cards",
    title: "Kindness Story Cards",
    type: "Story and discussion",
    ageGroup: "Ages 5–10",
    topic: "Kindness",
    estimatedTime: "20 minutes",
    delivery: "Printable",
    adultAssistance: "Recommended",
    summary: "Choose a story card and talk about how love can guide the next step."
  }
];

export const externalResources: ExternalResource[] = [
  {
    name: "ChristianScience.com",
    url: "https://www.christianscience.com/",
    description: "Official starting place for Christian Science, church services, prayer resources, lectures, and worldwide directories.",
    category: "Study and Worship",
    featured: true,
    order: 1,
    reviewDate: "2026-07-15",
    owner: "Website Coordinator",
    publicationStatus: "published"
  },
  {
    name: "Spirituality.com / JSH-Online",
    url: "https://jsh.christianscience.com/",
    description: "Articles, audio, and verified testimonies from the Journal, Sentinel, and Herald ecosystem.",
    category: "Articles, Audio, and Inspiration",
    featured: true,
    order: 2,
    reviewDate: "2026-07-15",
    owner: "Website Coordinator",
    publicationStatus: "published"
  },
  {
    name: "The Christian Science Monitor",
    url: "https://www.csmonitor.com/",
    description: "Independent international news and thoughtful perspective.",
    category: "News and Perspective",
    featured: true,
    order: 3,
    reviewDate: "2026-07-15",
    owner: "Website Coordinator",
    publicationStatus: "published"
  },
  {
    name: "The Mary Baker Eddy Library",
    url: "https://www.marybakereddylibrary.org/",
    description: "Historical and biographical research about Mary Baker Eddy and the Christian Science movement.",
    category: "History and Research",
    featured: true,
    order: 4,
    reviewDate: "2026-07-15",
    owner: "Website Coordinator",
    publicationStatus: "published"
  },
  {
    name: "Christian Science Reading Room Directory",
    url: "https://directory.christianscience.com/",
    description: "Official directory for churches, societies, Reading Rooms, and other resources.",
    category: "Study and Worship",
    featured: false,
    order: 5,
    reviewDate: "2026-07-15",
    owner: "Reading Room Manager",
    publicationStatus: "published"
  },
  {
    name: "Weekly Bible Lesson Information",
    url: "https://biblelesson.christianscience.com/",
    description: "Official information and access options for the weekly Christian Science Bible Lesson.",
    category: "Study and Worship",
    featured: true,
    order: 6,
    reviewDate: "2026-07-15",
    owner: "Sermon Editor",
    publicationStatus: "published"
  },
  {
    name: "Christian Science Talks and Broadcasts",
    url: "https://www.christianscience.com/people-and-community/talks-on-christian-science",
    description: "Official information and recordings related to public talks on Christian Science.",
    category: "Articles, Audio, and Inspiration",
    featured: false,
    order: 7,
    reviewDate: "2026-07-15",
    owner: "Events Editor",
    publicationStatus: "published"
  },
  {
    name: "Christian Science Colorado",
    url: "https://www.christiansciencecolorado.org/",
    description: "Regional Colorado events, inspiration, and Christian Science resources.",
    category: "Colorado Resources",
    featured: true,
    order: 8,
    reviewDate: "2026-07-15",
    owner: "Website Coordinator",
    publicationStatus: "published"
  },
  {
    name: "Official Youth Resources",
    url: "https://www.christianscience.com/youth",
    description: "Official resources for children, teens, young adults, parents, and Sunday School teachers.",
    category: "Children and Families",
    featured: true,
    order: 9,
    reviewDate: "2026-07-15",
    owner: "Sunday School Editor",
    publicationStatus: "published"
  }
];
