import type { ImagePlaceholder, PageDefinition } from "@/lib/types";

const photo = (
  id: string,
  label: string,
  productionNote: string,
  altText: string,
  aspectRatio: ImagePlaceholder["aspectRatio"] = "16:9",
  youthReleaseRequired = false,
  src?: string
): ImagePlaceholder => ({ id, label, productionNote, altText, aspectRatio, youthReleaseRequired, src });

const actions = {
  visit: { label: "Plan Your Visit", href: "/visit", variant: "primary" as const },
  directions: { label: "Get Directions", href: "/visit/directions-parking", variant: "secondary" as const },
  contact: { label: "Ask a Question", href: "/contact", variant: "secondary" as const }
};

export const pageDefinitions: PageDefinition[] = [
  {
    path: "/visit",
    eyebrow: "PLAN YOUR VISIT",
    title: "Your first visit, made simple.",
    description: "Everything you need to know before joining a Sunday service, Sunday School, or Wednesday testimony meeting.",
    directAnswer: "Sunday Service and Sunday School meet at 10:00 a.m. Wednesday testimony meetings begin at 7:30 p.m. The church is at 15700 E. Quincy Avenue in Aurora.",
    heroImage: photo("visit-entrance", "Church entrance and arrival", "Photograph the main visitor approach in soft morning light. Show the door, walkway, sign, and a clear sense of arrival without staged posing.", "Main entrance and walkway at First Church of Christ, Scientist, Aurora."),
    actions: [actions.directions, actions.contact],
    sections: [
      {
        id: "at-a-glance",
        eyebrow: "AT A GLANCE",
        title: "The essentials",
        cards: [
          { title: "Sunday", text: "Service and Sunday School at 10:00 a.m.", meta: "Weekly" },
          { title: "Wednesday", text: "Testimony meeting at 7:30 p.m.", meta: "Weekly" },
          { title: "Address", text: "15700 E. Quincy Avenue, Aurora, Colorado 80015", meta: "Aurora" },
          { title: "Phone", text: "(303) 766-0620", meta: "Call before your visit" }
        ]
      },
      {
        id: "what-to-expect",
        title: "What should I expect?",
        intro: "There is no sign-in, public introduction, or membership requirement.",
        cards: [
          { eyebrow: "01", title: "Arrive", text: "Come a few minutes early if you would like time to find a seat or ask a question." },
          { eyebrow: "02", title: "Worship", text: "Services include hymns, prayer, and readings from the Bible and Science and Health with Key to the Scriptures." },
          { eyebrow: "03", title: "Connect", text: "Leave quietly after the service or stay to meet people and ask questions. There is no pressure to join or give." }
        ],
        style: "teal-mist"
      },
      {
        id: "visitor-details",
        title: "Practical details",
        faq: [
          { question: "What should I wear?", answer: "Wear what helps you feel comfortable and respectful. You will see a range from casual to dressier clothing." },
          { question: "May I bring children?", answer: "Yes. Sunday School meets at 10:00 a.m. Confirmed check-in and age-group details will be published before launch." },
          { question: "Will I be expected to give?", answer: "No. Any collection is voluntary, and visitors are never expected to contribute." }
        ],
        confirmationNote: "CMS / Church Confirmation: service duration, parking, entrance, accessibility, childcare or Children’s Room, and remote attendance."
      }
    ],
    churchConfirmation: ["Parking and entrance", "Accessibility accommodations", "Service duration", "Children’s Room", "Remote attendance"]
  },
  {
    path: "/visit/directions-parking",
    eyebrow: "DIRECTIONS & PARKING",
    title: "Find the church and arrive with confidence.",
    description: "Driving directions, parking, entrance, and arrival information for the Aurora church.",
    directAnswer: "The church is located at 15700 E. Quincy Avenue, Aurora, Colorado 80015.",
    heroImage: photo("directions-exterior", "Wide exterior and parking approach", "Create a wide street-to-building view in clear natural light. Include visible driveway, parking approach, walkway, and church architecture. Avoid dramatic skies.", "Wide view of the Aurora church, driveway, parking approach, and main entrance."),
    actions: [{ label: "Open in Maps", href: "https://www.google.com/maps/search/?api=1&query=15700+E+Quincy+Avenue+Aurora+CO+80015", external: true, variant: "primary" }, actions.contact],
    sections: [
      { id: "map", title: "15700 E. Quincy Avenue", intro: "Aurora, Colorado 80015", body: ["Use the interactive map or your preferred navigation app.", "Allow a few extra minutes on your first visit so you can identify the correct entrance."], image: photo("parking-diagram", "Parking and entrance guide", "Photograph or diagram the actual parking areas and accessible route after church confirmation. Clearly identify visitor entrance without exposing private vehicle information.", "Parking areas, accessible route, and visitor entrance at the Aurora church.", "4:3"), style: "stone" },
      { id: "parking", title: "Parking and entrance", body: ["Parking and entrance details are intentionally held as a CMS confirmation field until church leadership verifies the public instructions."], confirmationNote: "CMS / Church Confirmation: designated visitor parking, accessible spaces, snow-route guidance, and preferred entrance." }
    ]
  },
  {
    path: "/visit/what-to-expect",
    eyebrow: "WHAT TO EXPECT",
    title: "Come as you are. Participate at your own comfort level.",
    description: "A plain-language guide to Sunday worship, Wednesday testimony meetings, and visiting for the first time.",
    heroImage: photo("greeter-program", "Natural visitor welcome", "Document a natural moment of an adult greeter offering a program near the entrance. Use real participants with releases, candid body language, and natural light.", "A visitor receiving a service program near the church entrance.", "16:9", false, "/images/photography/foyer-welcome-table.webp"),
    actions: [actions.visit, actions.directions],
    sections: [
      { id: "sunday", title: "Sunday service", body: ["The service includes hymns, silent and spoken prayer, a Scriptural selection, the Lord’s Prayer, and a Bible Lesson sermon read from the Bible and Science and Health with Key to the Scriptures.", "Printed materials help visitors follow along."], style: "teal-mist" },
      { id: "wednesday", title: "Wednesday testimony meeting", body: ["The meeting begins with hymns and readings selected for the needs of the community.", "The second portion allows people to share gratitude and experiences of healing through prayer. Speaking is always voluntary."], style: "periwinkle-mist" },
      { id: "no-pressure", title: "What will not happen", cards: [
        { title: "No public introduction", text: "You will not be asked to identify yourself in front of the congregation." },
        { title: "No membership requirement", text: "People who are new, curious, or visiting are welcome." },
        { title: "No giving pressure", text: "Visitors are never expected to make a contribution." }
      ] }
    ]
  },
  {
    path: "/visit/faq",
    eyebrow: "VISITOR FAQ",
    title: "Questions before your first visit",
    description: "Clear answers to common questions about services, children, giving, online attendance, and accessibility.",
    actions: [actions.contact, actions.directions],
    sections: [
      { id: "faq", faq: [
        { question: "Do I need to be a Christian Scientist?", answer: "No. Everyone is welcome, including people who are simply curious or visiting for the first time." },
        { question: "Will I be asked to introduce myself?", answer: "No. You may attend quietly and participate at your own comfort level." },
        { question: "Is there a collection?", answer: "A voluntary collection may be taken. Visitors are never expected to give." },
        { question: "May I bring my children?", answer: "Yes. Sunday School meets at 10:00 a.m. Confirmed check-in details will be published before launch." },
        { question: "Can I attend online?", answer: "Remote attendance has not yet been confirmed. When available, verified access details will appear on the Attend Online page." },
        { question: "Who can answer a question?", answer: "Call (303) 766-0620 or use the contact form." }
      ] }
    ]
  },
  {
    path: "/visit/accessibility",
    eyebrow: "ACCESSIBILITY",
    title: "We want everyone to be able to participate.",
    description: "Accessibility information for the building, services, website, documents, and online media.",
    directAnswer: "The website is designed toward WCAG 2.2 AA. Building-specific accommodation details must be verified before launch.",
    actions: [actions.contact, actions.directions],
    sections: [
      { id: "website", title: "Accessible website experience", cards: [
        { title: "Keyboard access", text: "Navigation, forms, calendars, store controls, and media interfaces are designed for keyboard use." },
        { title: "Readable content", text: "Body text is 17–18 pixels or larger with clear headings and strong contrast." },
        { title: "Media access", text: "Published video requires captions, and audio or video content includes transcripts when available." }
      ] },
      { id: "building", title: "Building access", body: ["Accessible parking, entrance, seating, restrooms, hearing support, and other accommodation details will be published after church verification."], confirmationNote: "CMS / Church Confirmation: accessible route, seating, restroom, hearing assistance, service animal guidance, and contact process." }
    ]
  },
  {
    path: "/services",
    eyebrow: "WEEKLY SERVICES",
    title: "Worship with us each week.",
    description: "Sunday and Wednesday gatherings offer prayer, Bible study, music, gratitude, and spiritual renewal.",
    heroImage: photo("sanctuary-wide", "Sanctuary from a visitor’s perspective", "Photograph the full sanctuary from the rear or center aisle in balanced natural light. Show seating, Readers’ platform, windows, and music detail; avoid emphasizing restricted trademarks.", "Interior of the Aurora church sanctuary viewed from the visitor seating area.", "16:9", false, "/images/photography/sanctuary-wide.webp"),
    actions: [actions.visit, actions.directions],
    sections: [
      { id: "service-cards", cards: [
        { eyebrow: "SUNDAYS · 10:00 A.M.", title: "Sunday Service", text: "A Bible-centered service with hymns, prayer, and a weekly Bible Lesson sermon.", href: "/services/sunday", action: "Explore Sunday Service" },
        { eyebrow: "WEDNESDAYS · 7:30 P.M.", title: "Testimony Meeting", text: "A midweek pause with readings, prayer, gratitude, and voluntary sharing.", href: "/services/wednesday", action: "Explore Wednesday Meetings" },
        { eyebrow: "OFFICIAL RESOURCE", title: "Weekly Bible Lesson", text: "Find official information and access options for the lesson studied during the week.", href: "/services/weekly-bible-lesson", action: "Find Lesson Information" },
        { eyebrow: "CHURCH CONFIRMATION", title: "Attend Online", text: "Remote access details will appear only after the church confirms the service and publication policy.", href: "/services/attend-online", action: "View Attendance Status" }
      ] }
    ]
  },
  {
    path: "/services/sunday",
    eyebrow: "SUNDAYS AT 10:00 A.M.",
    title: "A thoughtful hour of worship, prayer, and spiritual discovery.",
    description: "Join a service centered on the Bible and the teachings of Christian Science. Visitors are always welcome.",
    heroImage: photo("sunday-sanctuary-detail", "Sunday worship environment", "Photograph the sanctuary before service with warm daylight, orderly seating, hymnals, and architectural detail. No identifiable attendees unless released.", "Quiet sanctuary prepared for Sunday worship."),
    actions: [actions.visit, actions.directions],
    sections: [
      { id: "what-happens", title: "What happens during the service?", body: ["The service includes music, hymns, silent and spoken prayer, a Scriptural selection, the Lord’s Prayer, and a Bible Lesson sermon.", "Two Readers conduct the service: one reads from the Bible and the other reads correlative passages from Science and Health with Key to the Scriptures."] },
      { id: "lesson", title: "What is a Bible Lesson sermon?", body: ["A Bible Lesson sermon is a collection of passages organized around a weekly subject. Christian Science churches around the world hear the same lesson while each congregation worships in its own community."], style: "teal-mist" },
      { id: "first-time", title: "For first-time visitors", body: ["No prior knowledge is needed. Printed materials help you follow the service, and you may participate in hymns and prayers as you feel comfortable.", "Sunday School meets at the same time for children and young people."], confirmationNote: "CMS / Church Confirmation: typical duration, Communion Sunday language, childcare or Children’s Room, and remote access." }
    ]
  },
  {
    path: "/services/wednesday",
    eyebrow: "WEDNESDAYS AT 7:30 P.M.",
    title: "A midweek pause for prayer, gratitude, and healing.",
    description: "Step away from the week’s demands and join music, prayer, readings, and first-person expressions of gratitude.",
    heroImage: photo("wednesday-evening", "Church entrance at early evening", "Photograph the illuminated entrance during blue hour with realistic ambient light and a calm, safe arrival feeling. No artificial glow or dramatic sky replacement.", "Church entrance in the early evening before the Wednesday testimony meeting."),
    actions: [actions.visit, actions.directions],
    sections: [
      { id: "meeting", title: "What happens at a testimony meeting?", body: ["The meeting begins with hymns and readings from the Bible and Science and Health with Key to the Scriptures.", "The second part is open for attendees to share gratitude and experiences that show how prayer and a growing understanding of God have brought help or healing."] },
      { id: "questions", faq: [
        { question: "Do I have to speak?", answer: "No. You are welcome to listen quietly. Sharing is always voluntary." },
        { question: "Can I attend if I am new?", answer: "Yes. The meeting is open to everyone, and no previous experience with Christian Science is required." }
      ], style: "periwinkle-mist" }
    ]
  },
  {
    path: "/services/attend-online",
    eyebrow: "ATTEND ONLINE",
    title: "Remote attendance is pending church confirmation.",
    description: "This page is built and ready for verified Zoom, livestream, telephone, or official online-service details.",
    directAnswer: "No local remote-attendance method has been confirmed for publication.",
    actions: [{ label: "Official Mother Church Services", href: "https://www.christianscience.com/the-mother-church-in-boston/the-mother-church-services", external: true, variant: "primary" }, actions.contact],
    sections: [
      { id: "status", title: "What will appear here when confirmed?", cards: [
        { title: "Attendance method", text: "Verified Zoom, livestream, telephone, or other access option." },
        { title: "Schedule and access", text: "Current time, link, dial-in instructions, privacy guidance, and service status." },
        { title: "Accessibility", text: "Captioning, transcript, telephone, or other available accommodations." }
      ], confirmationNote: "CMS / Church Confirmation: remote availability, public-link policy, passcode handling, host ownership, privacy, captions, and backup plan." }
    ]
  },
  {
    path: "/services/weekly-bible-lesson",
    eyebrow: "WEEKLY BIBLE LESSON",
    title: "A lesson for study throughout the week.",
    description: "Each weekly Bible Lesson brings together related passages from the Bible and Science and Health with Key to the Scriptures.",
    directAnswer: "The full copyrighted Bible Lesson is not republished on this local site. Use the official source for current access information.",
    actions: [{ label: "Visit Official Bible Lesson Site", href: "https://biblelesson.christianscience.com/", external: true, variant: "primary" }, { label: "About Sunday Service", href: "/services/sunday", variant: "secondary" }],
    sections: [
      { id: "how-used", title: "How is the lesson used?", body: ["The lesson can be studied during the week and forms the sermon read at Sunday services.", "This local page links to official information rather than copying protected lesson content."], style: "teal-mist" },
      { id: "permissions", title: "Content-use safeguard", body: ["Any future local use of lesson subjects, Golden Text, Responsive Reading, quotations, recordings, or publication imagery requires documented permissions review and time-limited publishing rules."] }
    ]
  },
  {
    path: "/sermons",
    eyebrow: "SERMON LIBRARY",
    title: "Listen, watch, or read.",
    description: "Explore approved sermons, readings, recordings, and summaries from Christian Science Aurora.",
    pageType: "sermon-library",
    heroImage: photo("sermon-reader-view", "Readers’ platform and open books", "Create a respectful, permission-aware detail of the Readers’ platform or approved open study materials. Avoid readable copyrighted pages and restricted trademark emphasis.", "Readers’ platform prepared for a Christian Science service."),
    actions: [{ label: "View Latest Sermon", href: "/sermons/peace-through-prayer-placeholder", variant: "primary" }],
    sections: []
  },
  {
    path: "/sermons/peace-through-prayer-placeholder",
    eyebrow: "JULY 12, 2026 · PEACE",
    title: "Peace Through Prayer — Approved Media Placeholder",
    description: "A sample sermon record showing the approved layout for audio, video, transcript, citations, related content, and rights notes.",
    pageType: "sermon-detail",
    actions: [{ label: "Listen", href: "#audio", variant: "primary" }, { label: "Read Transcript", href: "#transcript", variant: "secondary" }],
    sections: [
      { id: "overview", title: "Overview", body: ["This concise placeholder introduces the central spiritual idea without reproducing protected Bible Lesson text.", "Replace it only after content, rights, accessibility, and SEO review."] },
      { id: "transcript", title: "Transcript placeholder", body: ["[AUTHORIZED TRANSCRIPT CONTENT WILL APPEAR HERE AFTER RIGHTS/PERMISSIONS REVIEW.]", "The public page supports headings, time markers, citations, downloadable approved transcripts, and related official resources."], confirmationNote: "Rights status: PLACEHOLDER. Do not publish protected text, recordings, or imagery until approved." },
      { id: "citations", title: "Readings and citations", body: ["Citations may be listed here when authorized. Full copyrighted Christian Science Quarterly Bible Lesson content is not posted without documented permission."], style: "teal-mist" }
    ]
  },
  {
    path: "/sunday-school",
    eyebrow: "SUNDAYS AT 10:00 A.M.",
    title: "A joyful place to ask, learn, and grow.",
    description: "Children can explore the Bible, talk about ideas, make things, and learn how prayer can help every day.",
    heroImage: photo("sunday-school-hands", "Children creating at a table", "Show hands and materials rather than identifiable faces: children coloring or arranging activity cards with a teacher nearby. Strip metadata and require guardian releases for any recognizable child.", "Children’s hands working on a Sunday School activity with a teacher nearby.", "16:9", true),
    actions: [{ label: "Plan Your First Sunday", href: "/sunday-school/parents", variant: "primary" }, { label: "Explore Activities", href: "/sunday-school/activities", variant: "secondary" }],
    sections: [
      { id: "curious", title: "You can be curious here.", body: ["There is no such thing as a silly question. You can listen, talk, read, draw, solve a puzzle, or share an idea. We learn together."], style: "gold-accent" },
      { id: "sunday-flow", title: "What happens on Sunday?", cards: [
        { eyebrow: "01", title: "Welcome", text: "Meet your teacher and take a little time to get comfortable." },
        { eyebrow: "02", title: "Explore the Bible", text: "Hear stories about courage, kindness, trust, and helping others." },
        { eyebrow: "03", title: "Ask questions", text: "Talk about what a story means and how it connects with your life." },
        { eyebrow: "04", title: "Try an activity", text: "Color, write, make something, solve a puzzle, or practice an idea." }
      ] },
      { id: "explore", title: "Things to explore", cards: [
        { title: "Color and create", text: "Print a coloring page, maze, puzzle, or craft.", href: "/sunday-school/coloring-pages", action: "Find Coloring Pages" },
        { title: "Read a story", text: "Meet Bible characters, discover brave choices, and think about God’s love.", href: "/sunday-school/stories", action: "Read Children’s Stories" },
        { title: "Try an activity", text: "Practice gratitude, kindness, courage, peace, and listening for good ideas.", href: "/sunday-school/activities", action: "Choose an Activity" },
        { title: "Family articles", text: "Explore short parent-friendly ideas and questions for home.", href: "/sunday-school/family-articles", action: "Read Family Articles" }
      ], style: "periwinkle-mist" }
    ]
  },
  {
    path: "/sunday-school/parents",
    eyebrow: "PARENT INFORMATION",
    title: "A caring place for children to explore spiritual ideas.",
    description: "Sunday School meets at 10:00 a.m., at the same time as the Sunday service.",
    heroImage: photo("family-arrival", "Family arriving for Sunday School", "Show a parent and child approaching the entrance from behind or at a non-identifying angle. Natural morning light, relaxed movement, no staged smiles. Releases required.", "A family walking toward the church entrance for Sunday School.", "16:9", true),
    actions: [{ label: "Plan Your First Sunday", href: "/visit", variant: "primary" }, { label: "Contact Sunday School", href: "/contact", variant: "secondary" }],
    sections: [
      { id: "learn", title: "What students learn", body: ["Age-appropriate lessons may include Bible stories, the Ten Commandments, the Sermon on the Mount, the Lord’s Prayer, and ideas about God’s love, identity, courage, kindness, healing, and wise choices."] },
      { id: "typical", title: "A typical Sunday", body: ["Students are welcomed by a teacher, explore a Bible-based idea, ask questions, discuss how it applies to life, and may complete a related activity.", "The goal is thoughtful participation—not memorizing a set of answers."], style: "teal-mist" },
      { id: "safety", title: "Safety and privacy", body: ["Children’s full names, profiles, public comments, and recognizable images are not published without documented authorization.", "Image metadata is stripped and youth content requires editorial and compliance approval."], confirmationNote: "CMS / Church Confirmation: ages served, class groupings, check-in/out, guardian presence, safety procedures, accessibility, and contact." },
      { id: "parent-faq", faq: [
        { question: "Does my child need Bible knowledge?", answer: "No. Teachers explain ideas in age-appropriate language and welcome questions." },
        { question: "Must our family be church members?", answer: "No. Families and visitors are welcome." },
        { question: "What should my child bring?", answer: "Nothing special is required unless an activity says otherwise." },
        { question: "May I visit the class?", answer: "The classroom visitor policy must be confirmed. Contact the Sunday School team before your first visit." }
      ] }
    ]
  },
  {
    path: "/sunday-school/activities",
    eyebrow: "ACTIVITY LIBRARY",
    title: "Choose something fun to explore.",
    description: "Pick a coloring page, story, puzzle, craft, gratitude activity, or question for your family to try together.",
    pageType: "children-library",
    actions: [{ label: "Show All Resources", href: "/sunday-school/activities", variant: "primary" }],
    sections: []
  },
  {
    path: "/sunday-school/coloring-pages",
    eyebrow: "COLORING PAGES",
    title: "Color, notice, and think.",
    description: "Original printable placeholders for Bible stories, gratitude, kindness, courage, peace, and reflection.",
    pageType: "children-library",
    sections: [
      { id: "coloring-note", title: "Original artwork only", body: ["All coloring pages must be original or properly licensed, accessible as tagged PDFs, and reviewed for theological clarity and age appropriateness."], style: "gold-accent" }
    ]
  },
  {
    path: "/sunday-school/stories",
    eyebrow: "CHILDREN’S STORIES",
    title: "Meet brave choices and helpful ideas.",
    description: "Short, original story placeholders that connect Bible ideas with school, friendships, family, and everyday decisions.",
    pageType: "children-library",
    heroImage: photo("story-illustration", "Original children’s story illustration", "Commission an original, contemporary editorial illustration with simple shapes, warm white space, teal/periwinkle palette, and restrained gold. No separate Sunday School logo.", "Original illustration of children reading and discussing a Bible story together.", "4:3", false),
    sections: []
  },
  {
    path: "/sunday-school/family-articles",
    eyebrow: "FAMILY ARTICLES",
    title: "Ideas for families to explore together.",
    description: "Parent-friendly articles and approved links about prayer, gratitude, courage, kindness, and Bible study.",
    pageType: "article-library",
    sections: []
  },
  {
    path: "/sunday-school/resources/gratitude-garden",
    eyebrow: "GRATITUDE ACTIVITY · AGES 6–11 · 15 MINUTES",
    title: "Grow a Gratitude Garden",
    description: "Write one good thing on each paper leaf and build a garden of gratitude together.",
    pageType: "children-detail",
    actions: [{ label: "Start Activity", href: "#instructions", variant: "primary" }, { label: "Download Printable", href: "#download", variant: "secondary" }],
    sections: [
      { id: "materials", title: "You will need", body: ["Paper, crayons or markers, scissors with grown-up help, and a place to display your leaves."], style: "gold-accent" },
      { id: "instructions", title: "Let’s begin", body: ["1. Draw or cut out five paper leaves.", "2. On each leaf, write or draw one good thing you noticed today.", "3. Arrange the leaves into a garden, tree, or wreath.", "4. Share one way gratitude changed how you felt or what you noticed."] },
      { id: "think", title: "Think about it", faq: [
        { question: "What good thing was easy to notice?", answer: "There is no single right answer. Notice what feels true and meaningful to you." },
        { question: "What good thing did you almost miss?", answer: "Think about a quiet kindness, helpful idea, or moment of peace." }
      ] },
      { id: "privacy", title: "Download note", body: ["Ask a grown-up before downloading or printing. This resource contains no form, comments, child profile, or tracking field."] }
    ]
  },
  {
    path: "/reading-room",
    eyebrow: "CHRISTIAN SCIENCE READING ROOM",
    title: "A place to read, ask questions, and explore.",
    description: "Browse books and periodicals, study quietly, find helpful resources, or talk with someone about Christian Science.",
    heroImage: photo("reading-room-interior", "Reading Room interior", "Photograph a welcoming wide interior with shelves, a clear reading table, natural light, and uncluttered surfaces. Show publication covers only if authorized.", "Wide interior view of the Christian Science Reading Room with shelves and a quiet reading table.", "16:9", false, "/images/photography/reading-room-lounge.webp"),
    actions: [{ label: "Plan Your Visit", href: "/reading-room/visit", variant: "primary" }, { label: "Shop Books", href: "/reading-room/shop", variant: "secondary" }],
    sections: [
      { id: "confirmation", title: "Reading Room public details", body: ["The website structure is complete, but the current location, hours, phone, parking, accessibility, appointment policy, and relationship to the church building must be confirmed before publication."], confirmationNote: "CMS / Church Confirmation: all Reading Room operating details." },
      { id: "find", title: "What you will find", cards: [
        { title: "Books and study resources", text: "The Bible, writings by Mary Baker Eddy, Christian Science publications, study tools, and approved family resources." },
        { title: "A quiet place to read", text: "Spend time reading, studying, or praying in a calm environment." },
        { title: "Helpful staff", text: "Ask about Christian Science, publications, Bible Lessons, local services, or where to find a resource." },
        { title: "Digital resources", text: "Explore approved articles, audio, verified testimonies, and official resource links." }
      ], style: "teal-mist" },
      { id: "more", title: "Explore the Reading Room", cards: [
        { title: "Shop", text: "Browse permission-aware products and inventory placeholders.", href: "/reading-room/shop", action: "Shop Books" },
        { title: "Articles", text: "Read local introductions and approved resource summaries.", href: "/reading-room/articles", action: "Read Articles" },
        { title: "Events", text: "Find talks, study opportunities, and community activities.", href: "/reading-room/events", action: "View Events" },
        { title: "Visit", text: "Find confirmed hours, parking, accessibility, and contact details.", href: "/reading-room/visit", action: "Plan a Visit" }
      ] }
    ]
  },
  {
    path: "/reading-room/shop",
    eyebrow: "READING ROOM SHOP",
    title: "Books and resources for thoughtful exploration.",
    description: "Browse approved books, periodicals, study resources, music, gifts, and materials for children and families.",
    pageType: "product-library",
    actions: [{ label: "View Cart", href: "/reading-room/cart", variant: "primary" }],
    sections: []
  },
  {
    path: "/reading-room/shop/science-and-health-placeholder",
    eyebrow: "MARY BAKER EDDY · PRODUCT PLACEHOLDER",
    title: "Science and Health with Key to the Scriptures",
    description: "A product-detail template with permission-aware cover handling, variants, inventory, pickup, shipping, tax, and secure checkout boundaries.",
    pageType: "product-detail",
    heroImage: photo("product-cover-placeholder", "Authorized product cover placeholder", "Use the complete official cover only in an approved product-promotional context and within permitted sizing. Otherwise show a neutral typographic placeholder.", "Product image for Science and Health with Key to the Scriptures, pending authorized cover use.", "2:3"),
    actions: [{ label: "Add to Cart", href: "/reading-room/cart", variant: "primary" }, { label: "Ask About This Item", href: "/contact", variant: "secondary" }],
    sections: [
      { id: "details", title: "Product details", cards: [
        { title: "Format", text: "Format requires inventory confirmation." },
        { title: "Availability", text: "Special order placeholder." },
        { title: "Fulfillment", text: "Local pickup and optional shipping integration points are included." },
        { title: "Price", text: "Price requires Reading Room confirmation." }
      ] },
      { id: "permission", title: "Permission-aware imagery", body: ["Cover images and official descriptions appear only in approved product-promotional contexts. The CMS stores source, permission status, reviewer, and review date."], style: "teal-mist" }
    ]
  },
  {
    path: "/reading-room/cart",
    eyebrow: "YOUR CART",
    title: "Review your books and resources.",
    description: "A provider-neutral cart interface prepared for local pickup and optional shipping.",
    pageType: "checkout",
    sections: [
      { id: "cart", title: "Cart preview", cards: [
        { title: "Science and Health with Key to the Scriptures", text: "Quantity 1 · Price pending confirmed inventory", meta: "Local pickup selected" }
      ] },
      { id: "next", title: "Fulfillment", body: ["Pickup: We will contact you when your order is ready.", "Shipping: Available methods and costs appear before payment when configured."], confirmationNote: "CMS / Church Confirmation: inventory, pricing, pickup location/hours, shipping zones, tax, return/refund policy, and payment provider." }
    ]
  },
  {
    path: "/reading-room/checkout",
    eyebrow: "SECURE CHECKOUT",
    title: "Complete your order.",
    description: "A secure payment integration boundary with accessible errors, receipts, order management, and refund hooks.",
    pageType: "checkout",
    sections: [
      { id: "disabled", title: "Checkout is disabled in seed mode", body: ["Set PAYMENTS_PROVIDER and verified commerce settings before enabling payment submission.", "Never collect payment-card information in the general contact form or store raw card data in this application."], style: "teal-mist" }
    ]
  },
  {
    path: "/reading-room/articles",
    eyebrow: "READING ROOM ARTICLES",
    title: "Ideas for study and spiritual discovery.",
    description: "Local introductions, Reading Room features, and links to trusted official resources.",
    pageType: "article-library",
    sections: []
  },
  {
    path: "/reading-room/events",
    eyebrow: "READING ROOM EVENTS",
    title: "Join a conversation or activity.",
    description: "Talks, study opportunities, family activities, and community programs associated with the Reading Room.",
    pageType: "calendar",
    sections: [
      { id: "confirmation", title: "Event status", body: ["No Reading Room events are confirmed in the seed content. The calendar can publish verified recurring or one-time events when details are approved."], confirmationNote: "CMS / Church Confirmation: current Reading Room programs and event ownership." }
    ]
  },
  {
    path: "/reading-room/visit",
    eyebrow: "VISIT THE READING ROOM",
    title: "Find a quiet place to read and ask questions.",
    description: "Location, hours, phone, parking, accessibility, appointment, and map fields are ready for church confirmation.",
    heroImage: photo("reading-room-exterior", "Reading Room exterior or entrance", "Photograph the actual public entrance with visible accessibility and wayfinding after the location is confirmed. Avoid unauthorized publication signage or personal vehicle details.", "Public entrance to the Christian Science Reading Room."),
    actions: [actions.contact],
    sections: [
      { id: "details", title: "Public information pending confirmation", cards: [
        { title: "Address", text: "[READING ROOM ADDRESS]" },
        { title: "Hours", text: "[CURRENT PUBLIC HOURS]" },
        { title: "Phone", text: "[READING ROOM PHONE]" },
        { title: "Access", text: "[PARKING AND ACCESSIBILITY]" }
      ], confirmationNote: "Do not publish until all fields are verified by the Reading Room Manager." }
    ]
  },
  {
    path: "/events",
    eyebrow: "EVENTS",
    title: "Gather, listen, learn, and connect.",
    description: "Explore weekly services, public talks, Reading Room activities, family programs, and other events in Aurora.",
    pageType: "calendar",
    actions: [{ label: "View Annual List", href: "/events/year", variant: "secondary" }],
    sections: []
  },
  {
    path: "/events/year",
    eyebrow: "2026 ANNUAL LIST",
    title: "Events throughout the year.",
    description: "A chronological, filterable, and print-friendly annual schedule with status handling and recurring-service controls.",
    pageType: "calendar",
    actions: [{ label: "Print Schedule", href: "#print", variant: "primary" }, { label: "Month View", href: "/events", variant: "secondary" }],
    sections: []
  },
  {
    path: "/events/public-talk-placeholder",
    eyebrow: "TALK · DATE PLACEHOLDER",
    title: "Public Talk — Church Confirmation Required",
    description: "This event-detail template is ready for an approved title, speaker, date, location, registration, virtual access, parking, accessibility, and permissions record.",
    pageType: "calendar",
    heroImage: photo("event-speaker", "Public talk and audience", "Photograph a speaker and audience from a respectful side or rear angle with natural room light. Obtain releases and confirm lecture-media permissions before publication.", "A public speaker presenting to an audience at a Christian Science event."),
    actions: [{ label: "Add to Calendar", href: "#calendar", variant: "primary" }, actions.contact],
    sections: [
      { id: "details", title: "Event details", cards: [
        { title: "When", text: "[DAY, DATE, START–END TIME, TIME ZONE]" },
        { title: "Where", text: "[VENUE, ADDRESS, OR ONLINE]" },
        { title: "Cost", text: "[FREE OR CONFIRMED COST]" },
        { title: "Who is welcome", text: "[AUDIENCE AND FAMILY SUITABILITY]" },
        { title: "Accessibility", text: "[CONFIRMED DETAILS]" },
        { title: "Parking", text: "[CONFIRMED DETAILS]" }
      ], confirmationNote: "Event is not publishable until all required fields and rights review are complete." }
    ]
  },
  {
    path: "/events/archive",
    eyebrow: "EVENT ARCHIVE",
    title: "Past events and approved replays.",
    description: "Completed, postponed, and canceled event URLs remain clear and useful without showing stale calls to action.",
    pageType: "calendar",
    sections: [
      { id: "archive-policy", title: "Archive behavior", body: ["Expired campaign placements are removed automatically.", "Canceled and postponed pages retain their stable URL and show a prominent status message.", "Lecture replays remain only while permissions are valid."], style: "teal-mist" }
    ]
  },
  {
    path: "/articles",
    eyebrow: "ARTICLES",
    title: "Ideas for spiritual discovery and everyday life.",
    description: "Explore newcomer guides, local stories, Reading Room features, event recaps, family resources, and introductions to trusted Christian Science sources.",
    pageType: "article-library",
    actions: [{ label: "Browse Newcomer Articles", href: "/articles/category/new-here", variant: "primary" }],
    sections: []
  },
  {
    path: "/articles/category/new-here",
    eyebrow: "NEW HERE",
    title: "Start with practical answers.",
    description: "Visitor guides, service explanations, common questions, and local information for people exploring Christian Science Aurora.",
    pageType: "article-library",
    sections: []
  },
  {
    path: "/articles/what-to-expect-first-visit",
    eyebrow: "NEW HERE",
    title: "What can I expect at my first Christian Science service?",
    description: "A practical guide to arrival, worship, participation, and what happens after the service.",
    pageType: "article-detail",
    heroImage: photo("article-arrival", "Visitor entering the church", "Create a candid arrival image with one adult visitor walking toward an open entrance. Avoid identifiable faces unless released; use realistic morning light.", "A visitor approaching the open entrance of the Aurora church."),
    sections: [
      { id: "arrival", title: "What happens when I arrive?", body: ["Come a few minutes early if you would like time to find a seat or ask a question. You may sit anywhere, and no one will ask you to sign in or introduce yourself publicly."] },
      { id: "worship", title: "How does the service work?", body: ["The service includes hymns, prayer, and readings from the Bible and Science and Health with Key to the Scriptures.", "Printed materials help you follow along. Participate as much or as little as you wish."], style: "teal-mist" },
      { id: "after", title: "What happens after the service?", body: ["You are welcome to leave quietly or stay to meet people and ask questions. There is no pressure to join or make a contribution."] },
      { id: "sources", title: "Explore further", actions: [{ label: "Plan Your Visit", href: "/visit", variant: "primary" }, { label: "About Sunday Service", href: "/services/sunday", variant: "secondary" }] }
    ]
  },
  {
    path: "/about",
    eyebrow: "ABOUT",
    title: "A welcoming Christian Science church in Aurora.",
    description: "First Church of Christ, Scientist, Aurora serves Aurora and surrounding communities through worship, Sunday School, a Reading Room, public events, and spiritual study.",
    heroImage: photo("about-exterior-community", "Church exterior with local context", "Photograph the church exterior with recognizable Aurora landscaping and natural human activity, without making people the primary identifiable subject.", "First Church of Christ, Scientist, Aurora in its local neighborhood setting."),
    actions: [actions.visit, { label: "Contact Us", href: "/contact", variant: "secondary" }],
    sections: [
      { id: "local", title: "Our local church", body: ["The congregation has served the community for more than 70 years. People from every background are welcome to attend services, ask questions, study, and explore the practical meaning of God’s love."] },
      { id: "relationship", title: "Our relationship to The Mother Church", body: ["We are a local branch of The First Church of Christ, Scientist, in Boston, Massachusetts.", "The Aurora church is independently administered by its local membership. ChristianScienceAurora.com is maintained by the Aurora branch and is not operated by The Mother Church."], style: "teal-mist" },
      { id: "explore", title: "Explore", cards: [
        { title: "What is Christian Science?", text: "A local introduction with links to official sources.", href: "/about/christian-science", action: "Explore Christian Science" },
        { title: "Our history", text: "More than 70 years of worship and community in Aurora.", href: "/about/history", action: "View History" },
        { title: "The Pastor", text: "Learn how the Bible and Science and Health serve as Pastor.", href: "/about/pastor", action: "Meet the Pastor" },
        { title: "Mary Baker Eddy", text: "Official biographical and historical resources.", href: "/about/mary-baker-eddy", action: "Explore Resources" }
      ] }
    ],
    churchConfirmation: ["Founding date", "Historical milestones", "Mission wording", "Approved archival images"]
  },
  {
    path: "/about/christian-science",
    eyebrow: "WHAT IS CHRISTIAN SCIENCE?",
    title: "A Christian way of life centered on God’s love and the healing example of Jesus.",
    description: "Christian Science is based on the Bible and emphasizes prayer, spiritual understanding, and the practical power of God’s goodness and love.",
    actions: [{ label: "Official Christian Science Introduction", href: "https://www.christianscience.com/what-is-christian-science", external: true, variant: "primary" }, { label: "Explore Local Services", href: "/services", variant: "secondary" }],
    sections: [
      { id: "intro", title: "A local introduction", body: ["Mary Baker Eddy discovered and founded Christian Science and wrote Science and Health with Key to the Scriptures, the Christian Science textbook.", "For a complete official introduction to beliefs, teachings, healing, and church resources, visit ChristianScience.com."], style: "teal-mist" },
      { id: "health", title: "A note about health information", body: ["This local introduction is not a substitute for medical advice and does not promise a particular outcome. People are free to make their own health-care decisions."] }
    ]
  },
  {
    path: "/about/history",
    eyebrow: "OUR HISTORY",
    title: "More than 70 years of worship and community in Aurora.",
    description: "A holding page for verified milestones, photographs, programs, and stories from the congregation’s history.",
    heroImage: photo("history-archive", "Approved historical materials", "Digitize verified photographs, programs, or building records with high resolution and neutral lighting. Record date, source, rights owner, caption, and approval status.", "Selected archival materials from the history of First Church of Christ, Scientist, Aurora.", "4:3"),
    actions: [{ label: "Contact Us About Church History", href: "/contact", variant: "primary" }],
    sections: [
      { id: "timeline", title: "Verified timeline coming after church review", body: ["Replace this holding copy with the confirmed founding date, building history, milestones, and approved archival materials."], confirmationNote: "CMS / Church Confirmation: founding date, major milestones, building history, captions, sources, and permissions." }
    ]
  },
  {
    path: "/about/pastor",
    eyebrow: "THE CHRISTIAN SCIENCE PASTOR",
    title: "The Bible and Science and Health serve as the Pastor.",
    description: "Christian Science churches do not have personal clergy. Their Pastor consists of the Bible and Science and Health with Key to the Scriptures by Mary Baker Eddy.",
    heroImage: photo("pastor-books", "Bible and Science and Health", "Photograph approved editions resting naturally on a simple reading surface. Keep text pages unreadable and ensure any cover use is permitted for this informational context.", "The Bible and Science and Health with Key to the Scriptures displayed together."),
    actions: [{ label: "Learn About Sunday Services", href: "/services/sunday", variant: "primary" }, { label: "Explore Weekly Bible Lesson", href: "/services/weekly-bible-lesson", variant: "secondary" }],
    sections: [
      { id: "role", title: "How the Pastor serves", body: ["Readings from the Bible and Science and Health form the sermon at Sunday services and provide a foundation for study and prayer."] }
    ]
  },
  {
    path: "/about/mary-baker-eddy",
    eyebrow: "MARY BAKER EDDY",
    title: "Discoverer and founder of Christian Science.",
    description: "Mary Baker Eddy was a religious leader, author, teacher, and founder of the Church of Christ, Scientist.",
    actions: [{ label: "Visit the Mary Baker Eddy Library", href: "https://www.marybakereddylibrary.org/", external: true, variant: "primary" }, { label: "Official Biography and Resources", href: "https://www.christianscience.com/what-is-christian-science/mary-baker-eddy", external: true, variant: "secondary" }],
    sections: [
      { id: "overview", title: "Official sources for fuller information", body: ["Her principal work, Science and Health with Key to the Scriptures, explains the theology and practice of Christian Science.", "Images, quotations, and source material should be published only within applicable permission guidelines."], style: "teal-mist" }
    ]
  },
  {
    path: "/about/official-resources",
    eyebrow: "OFFICIAL RESOURCES",
    title: "Continue exploring trusted Christian Science sources.",
    description: "Official destinations for beliefs, healing, publications, history, services, directories, and youth resources.",
    pageType: "resource-library",
    actions: [{ label: "View All Resources", href: "/resources", variant: "primary" }],
    sections: []
  },
  {
    path: "/resources",
    eyebrow: "RESOURCES & LINKS OF INTEREST",
    title: "Explore trusted Christian Science resources.",
    description: "External sites offering Bible study, articles, audio, news, history, church information, and resources for children and families.",
    pageType: "resource-library",
    directAnswer: "These links open sites maintained by other organizations. Christian Science Aurora does not control their content, privacy practices, or availability.",
    sections: []
  },
  {
    path: "/give",
    eyebrow: "GIVE",
    title: "Support the work of Christian Science Aurora.",
    description: "Giving is voluntary. Contributions can support worship, Sunday School, the Reading Room, public events, outreach, and care of the church property.",
    pageType: "giving",
    actions: [{ label: "Give Online", href: "#giving-module", variant: "primary" }],
    sections: [
      { id: "choices", title: "Choose how to give", cards: [
        { title: "One-time gift", text: "Make a single contribution in the amount you choose." },
        { title: "Recurring gift", text: "Schedule an ongoing contribution and change or cancel it through the giving provider." },
        { title: "Other ways", text: "Checks, in-person gifts, memorial gifts, stock, donor-advised funds, or other methods require church confirmation." }
      ] },
      { id: "privacy", title: "Your privacy and receipt", body: ["Payments must be processed through a secure third-party provider. The church receives only the information needed to record the gift and provide a receipt.", "Do not send payment-card information by email or through the general contact form."], style: "teal-mist" },
      { id: "confirmation", title: "Giving module disabled in seed mode", body: ["The interface and adapter boundary are included, but online giving remains disabled until the church confirms the provider, tax language, funds, receipts, refunds, contact, and alternative methods."], confirmationNote: "CMS / Church Confirmation: giving provider, designations, tax language, receipt process, refunds, assistance contact, and privacy terms." }
    ]
  },
  {
    path: "/contact",
    eyebrow: "CONTACT",
    title: "We are glad to hear from you.",
    description: "Ask a question about visiting, services, Sunday School, the Reading Room, events, accessibility, or another church activity.",
    pageType: "contact",
    actions: [{ label: "Call (303) 766-0620", href: "tel:+13037660620", variant: "primary" }, actions.directions],
    sections: [
      { id: "contact-details", title: "First Church of Christ, Scientist, Aurora", body: ["15700 E. Quincy Avenue", "Aurora, Colorado 80015", "(303) 766-0620", "[DOMAIN EMAIL - CHURCH CONFIRMATION]"] }
    ]
  },
  {
    path: "/search",
    eyebrow: "SEARCH",
    title: "What are you looking for?",
    description: "Search services, sermons, events, articles, Sunday School resources, and Reading Room materials.",
    pageType: "search",
    sections: []
  },
  {
    path: "/privacy",
    eyebrow: "LEGAL",
    title: "Privacy Policy — Draft Framework",
    description: "This policy must be updated to match the website’s final forms, analytics, registration, commerce, giving, email, and embedded services.",
    pageType: "legal",
    sections: [
      { id: "provided", title: "Information you provide", body: ["We may collect information submitted through contact forms, event registrations, newsletter forms, orders, donation forms, or other voluntary interactions."] },
      { id: "automatic", title: "Information collected automatically", body: ["The website may collect limited device, browser, usage, cookie, and analytics information to operate, secure, and improve the site."] },
      { id: "use", title: "How information is used", body: ["Information may be used to respond to inquiries, manage registrations, fulfill orders, process gifts, send requested communications, maintain records, prevent misuse, and improve performance."] },
      { id: "children", title: "Children’s privacy", body: ["The public website is not designed to collect personal information directly from children. Youth forms and information should be submitted and managed by a parent or guardian."], style: "teal-mist" },
      { id: "review", title: "Legal review required", body: ["Finalize this policy only after vendors, cookies, retention schedules, payment flows, forms, and email practices are known."], confirmationNote: "CMS / Church Confirmation and legal review required." }
    ]
  },
  {
    path: "/accessibility",
    eyebrow: "ACCESSIBILITY STATEMENT",
    title: "Our commitment to accessibility.",
    description: "Christian Science Aurora wants everyone to be able to use this website and participate in church activities.",
    pageType: "legal",
    sections: [
      { id: "commitment", title: "WCAG 2.2 Level AA target", body: ["We aim to continually improve accessibility across pages, forms, calendars, media, documents, and online services.", "If you encounter a barrier or need information in another format, call (303) 766-0620 or use the contact form."], style: "teal-mist" },
      { id: "review", title: "Statement details pending confirmation", body: ["Add the actual accessibility contact, response process, known limitations, and last review date before publication."], confirmationNote: "CMS / Church Confirmation: accessibility contact and response process." }
    ]
  },
  {
    path: "/terms",
    eyebrow: "LEGAL",
    title: "Terms of Use — Draft Framework",
    description: "General website terms for lawful use, no guarantee of outcomes, permissions, external links, and availability.",
    pageType: "legal",
    sections: [
      { id: "use", title: "Lawful and responsible use", body: ["Content is provided for general informational and spiritual purposes and may be changed without notice."] },
      { id: "outcomes", title: "No guarantee of outcomes", body: ["The website does not promise or guarantee medical, financial, legal, or other outcomes. It is not a substitute for professional advice."], style: "teal-mist" },
      { id: "content", title: "Content and permissions", body: ["Local text and design may be owned or used by Christian Science Aurora. Other trademarks, publications, quotations, recordings, and images belong to their respective owners and may require separate permission."] },
      { id: "external", title: "External links", body: ["External links are provided for convenience and exploration. The church does not control those sites and is not responsible for their content, security, availability, or privacy practices."] },
      { id: "review", title: "Legal review required", body: ["Obtain legal review after commerce, giving, refunds, registrations, analytics, and user-submission behavior are finalized."], confirmationNote: "Legal review required before launch." }
    ]
  },
  {
    path: "/sitemap",
    eyebrow: "SITEMAP",
    title: "Find every public section.",
    description: "A human-readable map of the public information architecture.",
    sections: [
      { id: "main", cards: [
        { title: "Visit", text: "Plan Your Visit, directions, what to expect, FAQ, accessibility.", href: "/visit", action: "Open Visit" },
        { title: "Services", text: "Sunday, Wednesday, Attend Online, Weekly Bible Lesson.", href: "/services", action: "Open Services" },
        { title: "Sermons", text: "Library, detail, audio, video, transcripts, topics.", href: "/sermons", action: "Open Sermons" },
        { title: "Sunday School", text: "Overview, parents, activities, coloring, stories, family articles.", href: "/sunday-school", action: "Open Sunday School" },
        { title: "Reading Room", text: "Overview, shop, products, articles, events, visit.", href: "/reading-room", action: "Open Reading Room" },
        { title: "Events", text: "Month calendar, annual list, event details, archive.", href: "/events", action: "Open Events" },
        { title: "Articles", text: "Categories and article details.", href: "/articles", action: "Open Articles" },
        { title: "About", text: "Local church, Christian Science, history, Pastor, Mary Baker Eddy.", href: "/about", action: "Open About" },
        { title: "Resources", text: "Trusted external Christian Science resources.", href: "/resources", action: "Open Resources" },
        { title: "Give", text: "Voluntary giving information and disabled integration boundary.", href: "/give", action: "Open Give" },
        { title: "Contact", text: "Address, phone, and inquiry form.", href: "/contact", action: "Open Contact" }
      ] }
    ]
  },
  {
    path: "/content-permissions",
    eyebrow: "CONTENT PERMISSIONS",
    title: "Protected material requires documented authorization.",
    description: "Christian Science publications, Bible Lesson material, trademarks, recordings, testimony content, quotations, product images, and third-party materials may be protected.",
    pageType: "legal",
    sections: [
      { id: "notice", title: "Appearance does not grant reuse rights", body: ["Contact Christian Science Aurora concerning locally owned material. For official Christian Science content, contact the applicable rights holder.", "Link to official resources unless reuse is expressly authorized."], style: "teal-mist" },
      { id: "review", title: "Content requiring review", cards: [
        { title: "Bible Lesson content", text: "Do not automatically republish full copyrighted lessons." },
        { title: "Testimonies", text: "Prefer links to verified official publications and review any local submission carefully." },
        { title: "Youth content", text: "Use guardian releases, no profiles or surnames, metadata stripping, and editorial approval." },
        { title: "Covers and trademarks", text: "Use only within authorized contexts. Do not use the Cross and Crown as a favicon or decoration." }
      ] }
    ]
  },
  {
    path: "/admin",
    eyebrow: "ADMIN PORTAL PREVIEW",
    title: "Secure, role-based content operations.",
    description: "A non-production demonstration of modules, workflow, review gates, and provider boundaries. Authentication must be connected before deployment.",
    pageType: "admin",
    sections: [
      { id: "modules", title: "Admin modules", cards: [
        { title: "Campaign Banners", text: "Desktop/mobile imagery, headline, date, CTA, priority, start, expiration." },
        { title: "Events", text: "Calendar, recurrence, status, registration, accessibility, structured data." },
        { title: "Sermons", text: "Media, transcripts, citations, rights status, reviewer, review date." },
        { title: "Articles", text: "Editorial workflow, authorship, dates, citations, metadata, related content." },
        { title: "Products & Orders", text: "Inventory, variants, pickup, shipping, tax, receipts, refunds." },
        { title: "Sunday School", text: "Activities, stories, downloads, age filters, youth safeguards." },
        { title: "Media Library", text: "Source, license, releases, alt text, metadata stripping, crops." },
        { title: "Compliance", text: "Rights, permissions, accessibility, youth, SEO, and review gates." }
      ] },
      { id: "workflow", title: "Publishing workflow", body: ["Draft → Content Review → Rights/Permissions Review → Accessibility Review → SEO Review → Approved → Scheduled/Published → Archived or Re-reviewed"], style: "teal-mist" },
      { id: "security", title: "Security requirements", body: ["2FA support, least privilege, audit logs, revisions, scheduling, backups, staging, secure headers, dependency monitoring, and documented recovery procedures."] }
    ]
  }
];

export const pageMap = new Map(pageDefinitions.map((page) => [page.path, page]));

export const allPublicPaths = ["/", ...pageDefinitions.map((page) => page.path)];
