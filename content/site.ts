export const site = {
  name: "First Church of Christ, Scientist, Aurora, Colorado",
  shortName: "Christian Science Aurora",
  domain: "https://christianscienceaurora.com",
  address: {
    street: "15700 E. Quincy Avenue",
    city: "Aurora",
    region: "Colorado",
    postalCode: "80015",
    country: "US"
  },
  phone: "(303) 766-0620",
  email: "info@christianscienceaurora.com",
  serviceTimes: {
    sundayService: "Sunday at 10:00 a.m.",
    sundaySchool: "Sunday at 10:00 a.m.",
    wednesday: "Wednesday at 7:30 p.m."
  },
  tagline: "A place for spiritual discovery, healing, and hope.",
  relationshipNotice:
    "This website is maintained by the local Aurora branch church and is not operated by The First Church of Christ, Scientist, in Boston, Massachusetts."
} as const;

export const nav = [
  { label: "Visit", href: "/visit" },
  { label: "Services", href: "/services" },
  { label: "Sermons", href: "/sermons" },
  { label: "Sunday School", href: "/sunday-school" },
  { label: "Reading Room", href: "/reading-room" },
  { label: "Events", href: "/events" },
  { label: "Articles", href: "/articles" },
  { label: "About", href: "/about" },
  { label: "Give", href: "/give" }
] as const;
