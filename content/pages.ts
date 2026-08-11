import type { ImagePlaceholder, PageDefinition } from "@/lib/types";
import { site } from "@/content/site";

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
    directAnswer: [
      "Sunday Service and Sunday School meet at 10:00 a.m.",
      "Wednesday Testimony Meeting begins at 7:30 p.m.",
      "The church is at 15700 E. Quincy Avenue, Aurora, Colorado 80015."
    ],
    heroImage: photo("visit-entrance", "Church entrance and arrival", "Photograph the main visitor approach in soft morning light. Show the door, walkway, sign, and a clear sense of arrival without staged posing.", "Main entrance and walkway at First Church of Christ, Scientist, Aurora.", "4:3", false, "/images/photography/visit-entrance.webp"),
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
          { title: "Phone", text: "(303) 766-0620", meta: "Call with any questions" }
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
          { question: "May I bring children?", answer: "Yes. Sunday School meets at 10:00 a.m. and welcomes children and young adults under the age of 20. Students are checked in and placed in age-appropriate classes, and childcare is available for infants and toddlers." },
          { question: "Will I be expected to give?", answer: "No. Any collection is voluntary, and visitors are never expected to contribute." }
        ]
      }
    ],
    churchConfirmation: ["Service duration", "Remote attendance"]
  },
  {
    path: "/visit/directions-parking",
    eyebrow: "DIRECTIONS & PARKING",
    title: "Find the church and arrive with confidence.",
    description: "Driving directions, parking, entrance, and arrival information for the Aurora church.",
    directAnswer: "The church is located at 15700 E. Quincy Avenue, Aurora, Colorado 80015.",
    heroImage: photo("directions-exterior", "Wide exterior and parking approach", "Create a wide street-to-building view in clear natural light. Include visible driveway, parking approach, walkway, and church architecture. Avoid dramatic skies.", "Wide view of the Aurora church, driveway, parking approach, and main entrance.", "16:9", false, "/images/photography/directions-exterior.webp"),
    actions: [{ label: "Open in Maps", href: "https://www.google.com/maps/search/?api=1&query=15700+E+Quincy+Avenue+Aurora+CO+80015", external: true, variant: "primary" }, actions.contact],
    sections: [
      { id: "map", title: "15700 E. Quincy Avenue", intro: "Aurora, Colorado 80015", body: ["Use the interactive map or your preferred navigation app.", "Allow a few extra minutes on your first visit so you can identify the correct entrance."], image: photo("parking-diagram", "Parking and entrance guide", "Photograph or diagram the actual parking areas and accessible route after church confirmation. Clearly identify visitor entrance without exposing private vehicle information.", "Parking areas, accessible route, and visitor entrance at the Aurora church.", "4:3", false, "/images/photography/parking-diagram.webp"), style: "stone" },
      { id: "parking", title: "Parking and entrance", body: ["Free parking is available on-site. The entrance to the parking lot is on Jasper Street, at the corner of Jasper Street and Quincy Avenue.", "Follow the walkway from the parking lot to the main entrance."] }
    ]
  },
  {
    path: "/visit/what-to-expect",
    eyebrow: "WHAT TO EXPECT",
    title: "Come as you are. Participate at your own comfort level.",
    description: "A plain-language guide to Sunday worship, Wednesday testimony meetings, and visiting for the first time.",
    heroImage: photo("greeter-program", "Natural visitor welcome", "Document a natural moment of an adult greeter offering a program near the entrance. Use real participants with releases, candid body language, and natural light.", "A visitor receiving a service program near the church entrance.", "2:3", false, "/images/photography/greeter-program.webp"),
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
        { question: "May I bring my children?", answer: "Yes. Sunday School meets at 10:00 a.m. and welcomes children and young adults under the age of 20. Students are checked in and placed in age-appropriate classes, and childcare is available for infants and toddlers." },
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
    directAnswer: "The building has a step-free entrance, accessible parking, and accessible restrooms. The website is designed toward WCAG 2.2 AA.",
    actions: [actions.contact, actions.directions],
    sections: [
      { id: "website", title: "Accessible website experience", cards: [
        { title: "Keyboard access", text: "Navigation, forms, calendars, store controls, and media interfaces are designed for keyboard use." },
        { title: "Readable content", text: "Body text is 17–18 pixels or larger with clear headings and strong contrast." },
        { title: "Media access", text: "Published video requires captions, and audio or video content includes transcripts when available." }
      ] },
      { id: "building", title: "Building access", cards: [
        { title: "Entrance", text: "There are no steps to enter the building or move through it. There is a curb between the parking lot and the walkway, with an accessibility ramp near the handicap parking spaces on the south-east side of the parking lot." },
        { title: "Parking", text: "Handicap parking spaces are available on the south-east side of the parking lot, next to the accessibility ramp." },
        { title: "Restrooms", text: "Accessible restrooms are available inside the building." },
        { title: "Assistive listening", text: "Assistive listening devices are available — just ask an usher." },
        { title: "Large print and braille", text: "Braille materials are not kept on hand, but a Bible and Science and Health with Key to the Scriptures in braille can be ordered through the Reading Room upon request." },
        { title: "Requesting an accommodation", text: "If you're at the church, ask any usher. Otherwise, call (303) 766-0620 to reach the church clerk." }
      ] }
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
        { eyebrow: "WEDNESDAYS · 7:30 P.M.", title: "Testimony Meeting", text: "Mid-week pause with readings, prayer, and sharing of gratitude and inspiration.", href: "/services/wednesday", action: "Wednesday Meetings" },
        { eyebrow: "OFFICIAL RESOURCE", title: "Weekly Bible Lesson", text: "Find official information and access options for the lesson studied during the week.", href: "/services/weekly-bible-lesson", action: "Find Lesson Information" },
        { eyebrow: "REMOTE ATTENDANCE", title: "Attend Online", text: "Remote attendance is not currently available. See this page for updates.", href: "/services/attend-online", action: "View Attendance Status" }
      ] }
    ]
  },
  {
    path: "/services/sunday",
    eyebrow: "SUNDAYS AT 10:00 A.M.",
    title: "A thoughtful hour of worship, prayer, and spiritual discovery.",
    description: "Join a service centered on the Bible and the teachings of Christian Science. Visitors are always welcome.",
    heroImage: photo("sunday-sanctuary-detail", "Sunday worship environment", "Photograph the sanctuary before service with warm daylight, orderly seating, hymnals, and architectural detail. No identifiable attendees unless released.", "Quiet sanctuary prepared for Sunday worship.", "4:3", false, "/images/photography/sunday-sanctuary-detail.webp"),
    actions: [actions.visit, actions.directions],
    sections: [
      { id: "what-happens", title: "What happens during the service?", body: ["The service includes music, hymns, silent and spoken prayer, a Scriptural selection, the Lord’s Prayer, and a Bible Lesson sermon.", "Two Readers conduct the service: one reads from the Bible and the other reads correlative passages from Science and Health with Key to the Scriptures."] },
      { id: "lesson", title: "What is a Bible Lesson sermon?", body: ["A Bible Lesson sermon is a collection of passages organized around a weekly subject. Christian Science churches around the world hear the same lesson while each congregation worships in its own community."], style: "teal-mist" },
      { id: "first-time", title: "For first-time visitors", body: ["No prior knowledge is needed. Printed materials help you follow the service, and you may participate in hymns and prayers as you feel comfortable.", "Sunday School meets at the same time and welcomes children and young adults under the age of 20. Students are checked in and placed in age-appropriate classes, and childcare is available for infants and toddlers."] }
    ]
  },
  {
    path: "/services/wednesday",
    eyebrow: "WEDNESDAYS AT 7:30 P.M.",
    title: "A midweek pause for prayer, gratitude, and healing.",
    description: "Step away from the week’s demands and join music, prayer, readings, and first-person expressions of gratitude.",
    heroImage: photo("wednesday-evening", "Church entrance at early evening", "Photograph the illuminated entrance during blue hour with realistic ambient light and a calm, safe arrival feeling. No artificial glow or dramatic sky replacement.", "Church entrance in the early evening before the Wednesday testimony meeting.", "4:3", false, "/images/photography/wednesday-evening.webp"),
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
      { id: "status", title: "Not currently available", body: ["Remote attendance is not currently offered. Please check back here for updates, or contact us with questions."] }
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
    heroImage: photo("sermon-reader-view", "Readers’ platform and open books", "Create a respectful, permission-aware detail of the Readers’ platform or approved open study materials. Avoid readable copyrighted pages and restricted trademark emphasis.", "Readers’ platform prepared for a Christian Science service.", "4:3", false, "/images/photography/sermon-reader-view.webp"),
    actions: [{ label: "View Latest Sermon", href: "/sermons/peace-through-prayer-placeholder", variant: "primary" }],
    sections: [
      { id: "pastor", body: ["Sermons are given by our Pastor, the Bible and Science and Health with Key to the Scriptures by Mary Baker Eddy. The Readers are elected by our membership."], style: "teal-mist" }
    ]
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
    heroImage: photo("sunday-school-hands", "Children creating at a table", "Show hands and materials rather than identifiable faces: children coloring or arranging activity cards with a teacher nearby. Strip metadata and require guardian releases for any recognizable child.", "Children’s hands working on a Sunday School activity with a teacher nearby.", "3:2", true, "/images/photography/sunday-school-hands.webp"),
    actions: [{ label: "Plan Your First Sunday", href: "/sunday-school/parents", variant: "primary" }, { label: "Explore Activities", href: "/sunday-school/activities", variant: "secondary" }],
    sections: [
      { id: "curious", title: "You can be curious here.", body: ["There is no such thing as a silly question. You can listen, talk, read, draw, solve a puzzle, or share an idea. We learn together."], style: "gold-accent" },
      { id: "what-they-learn", title: "What students learn", body: ["Children are taught the Scriptures and instructed according to their own understanding and ability to grasp the simpler meanings taught.", "The first lessons are the Ten Commandments (Exodus 20:3–17), the Lord's Prayer (Matthew 6:9–13), and the Sermon on the Mount (Matthew 5:3–12)."] },
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
    heroImage: photo("family-arrival", "Family arriving for Sunday School", "Show a parent and child approaching the entrance from behind or at a non-identifying angle. Natural morning light, relaxed movement, no staged smiles. Releases required.", "A family walking toward the church entrance for Sunday School.", "4:3", true, "/images/photography/family-arrival.webp"),
    actions: [{ label: "Plan Your First Sunday", href: "/visit", variant: "primary" }, { label: "Contact Sunday School", href: "/contact", variant: "secondary" }],
    sections: [
      { id: "learn", title: "What students learn", body: ["Age-appropriate lessons may include Bible stories, the Ten Commandments, the Sermon on the Mount, the Lord’s Prayer, and ideas about God’s love, identity, courage, kindness, healing, and wise choices."] },
      { id: "typical", title: "A typical Sunday", body: ["Students are welcomed by a teacher, explore a Bible-based idea, ask questions, discuss how it applies to life, and may complete a related activity.", "The goal is thoughtful participation—not memorizing a set of answers."], style: "teal-mist" },
      { id: "safety", title: "Safety and privacy", body: ["Sunday School welcomes children and young adults under the age of 20. Students are checked in and placed in age-appropriate classes, and childcare is available for infants and toddlers.", "Children’s full names, profiles, public comments, and recognizable images are not published without documented authorization."] },
      { id: "parent-faq", faq: [
        { question: "Does my child need Bible knowledge?", answer: "No. Teachers explain ideas in age-appropriate language and welcome questions." },
        { question: "Must our family be church members?", answer: "No. Families and visitors are welcome." },
        { question: "What should my child bring?", answer: "Nothing special is required unless an activity says otherwise." },
        { question: "May I visit the class?", answer: "Contact the Sunday School team before your first visit to arrange a classroom visit." }
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
    description: "Original printable coloring pages for Bible stories, gratitude, kindness, courage, peace, and reflection.",
    pageType: "children-library",
    sections: []
  },
  {
    path: "/sunday-school/stories",
    eyebrow: "CHILDREN’S STORIES",
    title: "Explore brave choices and helpful ideas.",
    description: "Short, original stories that connect Bible ideas with school, friendships, family, and everyday decisions.",
    pageType: "children-library",
    heroImage: photo("story-illustration", "Original children’s story illustration", "Commission an original, contemporary editorial illustration with simple shapes, warm white space, teal/periwinkle palette, and restrained gold. No separate Sunday School logo.", "Original illustration of children reading and discussing a Bible story together.", "4:3", false, "/images/photography/story-illustration.webp"),
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
    actions: [{ label: "Start Activity", href: "#instructions", variant: "primary" }, { label: "Download Printable", href: "/downloads/gratitude-garden-leaf-template.pdf", variant: "secondary" }],
    sections: [
      { id: "materials", title: "You will need", body: ["The printable leaf template (or your own paper leaves), crayons or markers, scissors with grown-up help, and a place to display your leaves."], style: "gold-accent" },
      { id: "instructions", title: "Let’s begin", body: ["1. Print the leaf template, or draw and cut out four or five paper leaves of your own.", "2. On each leaf, write or draw one good thing you noticed today.", "3. Arrange the leaves into a garden, tree, or wreath.", "4. Share one way gratitude changed how you felt or what you noticed."] },
      { id: "think", title: "Think about it", faq: [
        { question: "What good thing was easy to notice?", answer: "There is no single right answer. Notice what feels true and meaningful to you." },
        { question: "What good thing did you almost miss?", answer: "Think about a quiet kindness, helpful idea, or moment of peace." },
        { question: "How do these good things make you think about God?", answer: "Think about how all the good around us reflects God." }
      ] },
      { id: "privacy", title: "Download note", body: ["The printable is a single black-and-white PDF page with four leaf shapes to cut out — no form, comments, child profile, or tracking field. Ask a grown-up before downloading or printing."] }
    ]
  },
  {
    path: "/sunday-school/resources/courage-maze",
    eyebrow: "PUZZLE · AGES 7–12 · 10 MINUTES",
    title: "The Courage Maze",
    description: "Find the path while thinking about one brave, kind choice you can make today.",
    pageType: "children-detail",
    actions: [{ label: "Start Activity", href: "#instructions", variant: "primary" }, { label: "Download Printable", href: "/downloads/courage-maze.pdf", variant: "secondary" }],
    sections: [
      { id: "materials", title: "You will need", body: ["The printable maze, and a pencil or crayon."], style: "gold-accent" },
      { id: "instructions", title: "Let’s begin", body: ["1. Print the maze, or view it on a screen.", "2. Start at START and trace a path with your finger or a pencil.", "3. When you reach FINISH, take a breath and remember: “Be strong and of a good courage.” (Joshua 1:9)", "4. Talk about a time you felt afraid, and how you found your way through."] },
      { id: "think", title: "Think about it", faq: [
        { question: "What helped you find your way through the maze?", answer: "Think about trying different paths, backing up when needed, and not giving up." },
        { question: "What is one brave, kind choice you could make today?", answer: "It could be trying something new, telling the truth, or standing up for a friend." }
      ] },
      { id: "privacy", title: "Download note", body: ["The printable is a single black-and-white PDF maze puzzle — no form, comments, child profile, or tracking field. Ask a grown-up before downloading or printing."] }
    ]
  },
  {
    path: "/sunday-school/resources/kindness-story-cards",
    eyebrow: "STORY AND DISCUSSION · AGES 5–10 · 20 MINUTES",
    title: "Kindness Story Cards",
    description: "Choose a story card and talk about how love can guide the next step.",
    pageType: "children-detail",
    actions: [{ label: "Start Activity", href: "#instructions", variant: "primary" }, { label: "Download Printable", href: "/downloads/kindness-story-cards.pdf", variant: "secondary" }],
    sections: [
      { id: "materials", title: "You will need", body: ["The printable story cards, and scissors with grown-up help to cut them apart."], style: "gold-accent" },
      { id: "instructions", title: "Let’s begin", body: ["1. Print and cut out the eight story cards.", "2. Take turns picking a card and reading the situation out loud.", "3. Talk about what a kind next step could look like, and why.", "4. If you like, act out your idea together."] },
      { id: "think", title: "Think about it", faq: [
        { question: "Why can kindness feel hard sometimes?", answer: "Talk about feeling shy, unsure what to say, or worried about what others think — and how a small act of courage can help." },
        { question: "How does being kind to others reflect God's love?", answer: "Think about how every kind thought and action is a way of expressing God's love to those around us." }
      ] },
      { id: "privacy", title: "Download note", body: ["The printable is a single black-and-white PDF page with eight story cards to cut apart — no form, comments, child profile, or tracking field. Ask a grown-up before downloading or printing."] }
    ]
  },
  {
    path: "/sunday-school/resources/coloring-mbe-carriage",
    eyebrow: "COLORING PAGE · AGES 5–10",
    title: "Mary Baker Eddy in Her Carriage",
    description: "Color a scene of Mary Baker Eddy riding through town in her carriage.",
    pageType: "children-detail",
    heroImage: photo("coloring-mbe-carriage", "Mary Baker Eddy in Her Carriage coloring page", "Original line-art coloring page.", "A line-art coloring page showing Mary Baker Eddy riding in a horse-drawn carriage through town.", "3:4", false, "/images/photography/sunday-school/coloring-mbe-carriage.webp"),
    actions: [{ label: "Download Printable", href: "/downloads/coloring-mbe-carriage.pdf", variant: "primary" }],
    sections: [
      { id: "about", title: "About this scene", body: ["Mary Baker Eddy discovered and founded Christian Science. This scene imagines her riding through town, greeted by neighbors along the way."] },
      { id: "privacy", title: "Download note", body: ["The printable is a single black-and-white PDF coloring page — no form, comments, child profile, or tracking field. Ask a grown-up before downloading or printing."] }
    ]
  },
  {
    path: "/sunday-school/resources/coloring-israel-wrestling-angel",
    eyebrow: "COLORING PAGE · AGES 8–13",
    title: "Israel Wrestling with the Angel",
    description: "Color the story of Jacob wrestling with the angel until daybreak, from Genesis 32:26.",
    pageType: "children-detail",
    heroImage: photo("coloring-israel-wrestling-angel", "Israel Wrestling with the Angel coloring page", "Original line-art coloring page.", "A line-art coloring page showing Jacob wrestling with an angel by a river at night.", "3:4", false, "/images/photography/sunday-school/coloring-israel-wrestling-angel.webp"),
    actions: [{ label: "Download Printable", href: "/downloads/coloring-israel-wrestling-angel.pdf", variant: "primary" }],
    sections: [
      { id: "about", title: "About this scene", body: ["“The man said, ‘Let me go, for it is daybreak.’ But Jacob said, ‘I will not let you go unless you bless me.’” — Genesis 32:26"] },
      { id: "privacy", title: "Download note", body: ["The printable is a single black-and-white PDF coloring page — no form, comments, child profile, or tracking field. Ask a grown-up before downloading or printing."] }
    ]
  },
  {
    path: "/sunday-school/resources/coloring-joseph-coat-of-many-colors",
    eyebrow: "COLORING PAGE · AGES 5–10",
    title: "Joseph and His Coat of Many Colors",
    description: "Color Joseph in his coat of many colors, standing before his brothers.",
    pageType: "children-detail",
    heroImage: photo("coloring-joseph-coat-of-many-colors", "Joseph and His Coat of Many Colors coloring page", "Original line-art coloring page.", "A line-art coloring page showing Joseph wearing his coat of many colors while his brothers look on.", "3:4", false, "/images/photography/sunday-school/coloring-joseph-coat-of-many-colors.webp"),
    actions: [{ label: "Download Printable", href: "/downloads/coloring-joseph-coat-of-many-colors.pdf", variant: "primary" }],
    sections: [
      { id: "about", title: "About this scene", body: ["Joseph's story of forgiveness and trust in God begins in Genesis 37, when his father gave him a special coat."] },
      { id: "privacy", title: "Download note", body: ["The printable is a single black-and-white PDF coloring page — no form, comments, child profile, or tracking field. Ask a grown-up before downloading or printing."] }
    ]
  },
  {
    path: "/sunday-school/resources/coloring-jesus-walking-on-water",
    eyebrow: "COLORING PAGE · AGES 5–10",
    title: "Jesus Walking on Water",
    description: "Color Jesus walking on the water toward His disciples in their boat.",
    pageType: "children-detail",
    heroImage: photo("coloring-jesus-walking-on-water", "Jesus Walking on Water coloring page", "Original line-art coloring page.", "A line-art coloring page showing Jesus walking on the water toward His disciples in a boat during a storm.", "3:4", false, "/images/photography/sunday-school/coloring-jesus-walking-on-water.webp"),
    actions: [{ label: "Download Printable", href: "/downloads/coloring-jesus-walking-on-water.pdf", variant: "primary" }],
    sections: [
      { id: "about", title: "About this scene", body: ["This scene tells of Jesus walking on the water to reach His disciples during a storm, found in Matthew 14:22–33."] },
      { id: "privacy", title: "Download note", body: ["The printable is a single black-and-white PDF coloring page — no form, comments, child profile, or tracking field. Ask a grown-up before downloading or printing."] }
    ]
  },
  {
    path: "/sunday-school/resources/coloring-jesus-calls-lazarus",
    eyebrow: "COLORING PAGE · AGES 8–13",
    title: "Jesus Calls Lazarus from the Tomb",
    description: "Color the moment Jesus calls Lazarus out of the tomb, healed and alive.",
    pageType: "children-detail",
    heroImage: photo("coloring-jesus-calls-lazarus", "Jesus Calls Lazarus from the Tomb coloring page", "Original line-art coloring page.", "A line-art coloring page showing Jesus calling Lazarus out of the tomb while others look on.", "3:4", false, "/images/photography/sunday-school/coloring-jesus-calls-lazarus.webp"),
    actions: [{ label: "Download Printable", href: "/downloads/coloring-jesus-calls-lazarus.pdf", variant: "primary" }],
    sections: [
      { id: "about", title: "About this scene", body: ["This scene tells of Jesus calling Lazarus out of the tomb, found in John 11:38–44."] },
      { id: "privacy", title: "Download note", body: ["The printable is a single black-and-white PDF coloring page — no form, comments, child profile, or tracking field. Ask a grown-up before downloading or printing."] }
    ]
  },
  {
    path: "/sunday-school/resources/coloring-moses-ten-commandments",
    eyebrow: "COLORING PAGE · AGES 8–13",
    title: "Moses and the Ten Commandments",
    description: "Color Moses holding the tablets of the Ten Commandments before the people.",
    pageType: "children-detail",
    heroImage: photo("coloring-moses-ten-commandments", "Moses and the Ten Commandments coloring page", "Original line-art coloring page.", "A line-art coloring page showing Moses holding the tablets of the Ten Commandments before the people.", "3:4", false, "/images/photography/sunday-school/coloring-moses-ten-commandments.webp"),
    actions: [{ label: "Download Printable", href: "/downloads/coloring-moses-ten-commandments.pdf", variant: "primary" }],
    sections: [
      { id: "about", title: "About this scene", body: ["This scene tells of Moses receiving and sharing the Ten Commandments, found in Exodus 20 and Exodus 34."] },
      { id: "privacy", title: "Download note", body: ["The printable is a single black-and-white PDF coloring page — no form, comments, child profile, or tracking field. Ask a grown-up before downloading or printing."] }
    ]
  },
  {
    path: "/reading-room",
    eyebrow: "CHRISTIAN SCIENCE READING ROOM",
    title: "A place to read, ask questions, and explore.",
    description: "Browse books and periodicals, study quietly, find helpful resources, or talk with someone about Christian Science.",
    heroImage: photo("reading-room-interior", "Reading Room interior", "Photograph a welcoming wide interior with shelves, a clear reading table, natural light, and uncluttered surfaces. Show publication covers only if authorized.", "Wide interior view of the Christian Science Reading Room with shelves and a quiet reading table.", "2:3", false, "/images/photography/reading-room-interior.webp"),
    actions: [{ label: "Plan Your Visit", href: "/reading-room/visit", variant: "primary" }, { label: "Shop Books", href: "/reading-room/shop", variant: "secondary" }],
    sections: [
      { id: "find", title: "What you will find", cards: [
        { title: "Books and study resources", text: "The Bible, writings by Mary Baker Eddy, Christian Science publications, study tools, and approved family resources." },
        { title: "A quiet place to read", text: "Spend time reading, studying, or praying in a calm environment." },
        { title: "Helpful staff", text: "Ask about Christian Science, publications, Bible Lessons, local services, or where to find a resource." },
        { title: "Digital resources", text: "Explore approved articles, audio, verified testimonies, and official resource links." }
      ], style: "teal-mist" },
      { id: "more", title: "Explore the Reading Room", cards: [
        { title: "Shop", text: "Browse books, periodicals, and study resources.", href: "/reading-room/shop", action: "Shop Books" },
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
    heroImage: photo("product-cover-placeholder", "Authorized product cover placeholder", "Use the complete official cover only in an approved product-promotional context and within permitted sizing. Otherwise show a neutral typographic placeholder.", "Product image for Science and Health with Key to the Scriptures, pending authorized cover use.", "2:3", false, "/images/photography/product-cover-placeholder.webp"),
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
      { id: "next", title: "Fulfillment", body: ["Pickup: We will contact you when your order is ready.", "Shipping: Available methods and costs appear before payment when configured.", "Contact the Reading Room with questions about inventory, pricing, or pickup."] }
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
      { id: "status", title: "Check back soon", body: ["No Reading Room events are scheduled right now. Please check back, or see the main events calendar for church-wide gatherings."], actions: [{ label: "View Events Calendar", href: "/events", variant: "secondary" }] }
    ]
  },
  {
    path: "/reading-room/visit",
    eyebrow: "VISIT THE READING ROOM",
    title: "Find a quiet place to read and ask questions.",
    description: "Address, hours, phone, and parking for the Christian Science Reading Room in Aurora, Colorado.",
    heroImage: photo("reading-room-exterior", "Reading Room exterior or entrance", "Public entrance to the Christian Science Reading Room, same building as the church.", "Public entrance to the Christian Science Reading Room.", "2:3", false, "/images/photography/reading-room-exterior.webp"),
    actions: [actions.contact],
    sections: [
      { id: "details", title: "Visit the Reading Room", cards: [
        { title: "Address", text: "15700 E. Quincy Avenue, Aurora, Colorado 80015 — same building as the church." },
        { title: "Hours", text: "Monday–Friday, 10:00 a.m.–2:00 p.m. We recommend calling to confirm before dropping by." },
        { title: "Phone", text: "(303) 766-0620 — same number as the church." },
        { title: "Parking", text: "Free parking, shared with the church. The parking lot entrance is on Jasper Street, at the corner of Jasper Street and Quincy Avenue." }
      ] }
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
        { title: "Accessibility", text: "Fully Accessible" },
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
    heroImage: photo("article-arrival", "Visitor entering the church", "Create a candid arrival image with one adult visitor walking toward an open entrance. Avoid identifiable faces unless released; use realistic morning light.", "A visitor approaching the open entrance of the Aurora church.", "2:3", false, "/images/photography/article-arrival.webp"),
    sections: [
      { id: "arrival", title: "What happens when I arrive?", body: ["Come a few minutes early if you would like time to find a seat or ask a question. You may sit anywhere, and no one will ask you to sign in or introduce yourself publicly."] },
      { id: "worship", title: "How does the service work?", body: ["The service includes hymns, prayer, and readings from the Bible and Science and Health with Key to the Scriptures.", "Printed materials help you follow along. Participate as much or as little as you wish."], style: "teal-mist" },
      { id: "after", title: "What happens after the service?", body: ["You are welcome to leave quietly or stay to meet people and ask questions. There is no pressure to join or make a contribution.", "Once a month we hold a fellowship luncheon at a local restaurant. We would love to have you join us. See the events calendar for dates."], actions: [{ label: "View the Events Calendar", href: "/events", variant: "secondary" }] },
      { id: "sources", title: "Explore further", actions: [{ label: "Plan Your Visit", href: "/visit", variant: "primary" }, { label: "About Sunday Service", href: "/services/sunday", variant: "secondary" }] }
    ]
  },
  {
    path: "/about",
    eyebrow: "ABOUT",
    title: "A welcoming Christian Science church in Aurora.",
    description: "First Church of Christ, Scientist, Aurora serves Aurora and surrounding communities through worship, Sunday School, a Reading Room, public events, and spiritual study.",
    heroImage: photo("about-exterior-community", "Church exterior with local context", "Photograph the church exterior with recognizable Aurora landscaping and natural human activity, without making people the primary identifiable subject.", "First Church of Christ, Scientist, Aurora in its local neighborhood setting.", "16:9", false, "/images/photography/about-exterior-community.webp"),
    actions: [actions.visit, { label: "Contact Us", href: "/contact", variant: "secondary" }],
    sections: [
      { id: "local", title: "Our local church", body: ["The congregation has served the community for more than 70 years. People from every background are welcome to attend services, ask questions, study, and explore the practical meaning of God’s love.", "While we are located in Aurora, Colorado, we are the easternmost Christian Science church in Colorado, and we serve the cities of Parker, Centennial, Bennett, Elizabeth, Byers, and all the towns of the eastern Colorado plains."] },
      { id: "relationship", title: "Our relationship to The Mother Church", body: ["We are a local branch of The First Church of Christ, Scientist, in Boston, Massachusetts.", "The Aurora church is independently administered by its local membership. ChristianScienceAurora.com is maintained by the Aurora branch and is not operated by The Mother Church."], style: "teal-mist" },
      { id: "tenets", title: "The Tenets of Christian Science", intro: "The Christian Science Church does not have a formal creed, but its core beliefs are summarized in six tenets found in Science and Health with Key to the Scriptures by Mary Baker Eddy (pages 496–497). These tenets are considered the foundation of Christian Science.", cards: [
        { title: "1. The Bible as our guide", text: "As adherents of Truth, we take the inspired Word of the Bible as our sufficient guide to eternal Life." },
        { title: "2. One supreme and infinite God", text: "We acknowledge and adore one supreme and infinite God. We acknowledge His Son, one Christ; the Holy Ghost or divine Comforter; and man in God’s image and likeness." },
        { title: "3. The forgiveness of sin", text: "We acknowledge God’s forgiveness of sin in the destruction of sin and the spiritual understanding that casts out evil as unreal. But the belief in sin is punished so long as the belief lasts." },
        { title: "4. Jesus’ atonement and love", text: "We acknowledge Jesus’ atonement as the evidence of divine, efficacious Love, unfolding man’s unity with God through Christ Jesus the Way-shower; and we acknowledge that man is saved through Christ, through Truth, Life, and Love as demonstrated by the Galilean Prophet in healing the sick and overcoming sin and death." },
        { title: "5. The crucifixion and resurrection", text: "We acknowledge that the crucifixion of Jesus and his resurrection served to uplift faith to understand eternal Life, even the allness of Soul, Spirit, and the nothingness of matter." },
        { title: "6. Our moral and spiritual commitment", text: "And we solemnly promise to watch, and pray for that Mind to be in us which was also in Christ Jesus; to do unto others as we would have them do unto us; and to be merciful, just, and pure." }
      ] },
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
      { id: "intro", title: "A local introduction", body: ["Mary Baker Eddy discovered and founded Christian Science and wrote Science and Health with Key to the Scriptures, the Christian Science textbook.", "For a complete official introduction to beliefs, teachings, healing, and church resources, visit ChristianScience.com."], style: "teal-mist" }
    ]
  },
  {
    path: "/about/history",
    eyebrow: "OUR HISTORY",
    title: "More than 70 years of worship and community in Aurora.",
    description: "From a small congregation on Jamaica Street to the church home on East Quincy Avenue — more than 70 years of worship, healing, and service to the Aurora community.",
    heroImage: photo("history-old-church-jamaica-st", "First Church of Christ, Scientist, Aurora — original building, 1300 Jamaica St.", "Church-supplied archival photograph of the congregation's original building at 1300 Jamaica Street, Aurora, CO. Real photo, not a production placeholder. Higher-resolution version supplied 2026-08-11, re-cropped to trim overhead tree canopy for a tighter, better-balanced composition at 16:9.", "First Church of Christ, Scientist, Aurora, in its original building at 1300 Jamaica Street, Aurora, Colorado.", "16:9", false, "/images/photography/history-old-church-jamaica-st.webp"),
    actions: [{ label: "Contact Us About Church History", href: "/contact", variant: "primary" }],
    sections: [
      {
        id: "beginnings",
        title: "Organized in 1954",
        body: [
          "First Church of Christ, Scientist, Aurora was organized on December 28, 1954, growing out of the Christian Science Society, Aurora, Colorado — a group of local Christian Scientists who had already been meeting together for study and worship before the church was formally organized.",
          "For much of the more than 70 years since, the congregation gathered in a modest building at 1300 Jamaica Street — pictured above — where Sunday services and Wednesday testimony meetings were held for generations of members and visitors.",
          "As Aurora grew, so did the congregation's vision for a church home that could serve the eastern edge of the metro area for decades to come."
        ]
      },
      {
        id: "word-on-building",
        title: "Built on a sure foundation",
        style: "stone",
        cards: [
          { eyebrow: "PSALM 127:1", title: "Except the Lord build the house", text: "“Except the LORD build the house, they labour in vain that build it: except the LORD keep the city, the watchman waketh but in vain.”" },
          { eyebrow: "MATTHEW 7:24–25", title: "Founded upon a rock", text: "“...I will liken him unto a wise man, which built his house upon a rock: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock.”" }
        ]
      },
      {
        id: "groundbreaking",
        title: "Breaking ground on East Quincy Avenue",
        style: "teal-mist",
        image: photo("history-groundbreaking-quincy-ave", "Groundbreaking ceremony, 15700 E. Quincy Ave.", "Church-supplied archival photograph of the groundbreaking ceremony for the current church building. Real photo, not a production placeholder. Per church confirmation, only 2 of the 5 people pictured are among the 10 named founders/builders and 2 are construction workers (identity of the 5th unconfirmed) — church has directed that no names be attached to this specific photo. Higher-resolution version supplied 2026-08-11, already full-bleed (no border to crop).", "Members of the congregation and the construction crew breaking ground with shovels at the site of the new church building on East Quincy Avenue.", "3:2", false, "/images/photography/history-groundbreaking-quincy-ave.webp"),
        body: [
          "The congregation made the decision to build a new church home at 15700 E. Quincy Avenue — the church's current location, and today the easternmost Christian Science church in Colorado. Members and the construction crew broke ground on the project together, marking the start of a new chapter for the church's presence in Aurora."
        ]
      },
      {
        id: "living-stones",
        title: "Living stones, growing together",
        cards: [
          { eyebrow: "1 PETER 2:5", title: "A spiritual house", text: "“Ye also, as lively stones, are built up a spiritual house, an holy priesthood, to offer up spiritual sacrifices, acceptable to God by Jesus Christ.”" },
          { eyebrow: "1 CORINTHIANS 3:9, 11", title: "Labourers together with God", text: "“For we are labourers together with God: ye are God's husbandry, ye are God's building. ... For other foundation can no man lay than that is laid, which is Jesus Christ.”" }
        ]
      },
      {
        id: "builders",
        title: "The people who built it",
        image: photo("history-founders-builders-group", "Founders and builders of the current church", "Church-supplied archival photograph of the congregation members who founded and helped build the current church. Names per church records: Mal, Claire, Joy, Wally, Dan, Robert, Helen, Tom, and Rob. Real photo, not a production placeholder. Higher-resolution version supplied 2026-08-11; rounded-corner postcard border cropped out.", "A group of founding and building-committee members gathered on the church grounds.", "16:9", false, "/images/photography/history-founders-builders-group.webp"),
        body: [
          "The new building was made possible by the dedication of members who gave their time, skill, and support to see it through — among them Cindy, Tom, Rob, Mal, Claire, Joy, Wally, Dan, Robert, and Helen. Their work, grounded in gratitude and service, is part of the foundation the congregation still stands on today."
        ]
      },
      {
        id: "first-service",
        title: "A new sanctuary opens",
        style: "periwinkle-mist",
        image: photo("history-new-church-quincy-ave", "First Church of Christ, Scientist, Aurora — current building, 15700 E. Quincy Ave.", "Church-supplied photograph of the current church building at 15700 E. Quincy Avenue, Aurora, CO. Real photo, not a production placeholder. Supplied 2026-08-11, already full-bleed at ~16:9, no crop needed.", "First Church of Christ, Scientist, Aurora, at its current location on East Quincy Avenue.", "16:9", false, "/images/photography/history-new-church-quincy-ave.webp"),
        body: [
          "The first service in the new church home was held on August 26, 2001, with Donna Rae Scarth serving as First Reader. It was the first of what has since become thousands of Sunday services and Wednesday testimony meetings held on East Quincy Avenue, continuing the congregation's long history of worship in Aurora."
        ]
      },
      {
        id: "community",
        title: "A steady presence for Aurora",
        body: [
          "Beyond its regular services, First Church of Christ, Scientist, Aurora has sought to be a source of comfort and prayer for the wider community in difficult moments. In the aftermath of the 2012 Aurora theater shooting, the church opened its doors and held a prayer service to which the entire community was invited — an expression of the congregation's belief that prayer and healing are for everyone, not members alone.",
          "That same spirit — a welcome extended to all of Aurora, in ordinary weeks and hard ones — continues to guide the congregation today."
        ],
        cards: [
          { eyebrow: "JOHN 4:35", title: "White already to harvest", text: "“...Lift up your eyes, and look on the fields; for they are white already to harvest.”" }
        ]
      },
      {
        id: "what-is-a-church",
        title: "What is a church?",
        style: "gold-accent",
        cards: [
          { eyebrow: "EPHESIANS 2:20–21", title: "Fitly framed together", text: "“...built upon the foundation of the apostles and prophets, Jesus Christ himself being the chief corner stone; in whom all the building fitly framed together groweth unto an holy temple in the Lord.”" },
          { eyebrow: "MARY BAKER EDDY, SCIENCE AND HEALTH, P. 583", title: "The structure of Truth and Love", text: "“Church. The structure of Truth and Love; whatever rests upon and proceeds from divine Principle.”" }
        ]
      },
      {
        id: "gratitude",
        title: "With eternal gratitude",
        style: "periwinkle-mist",
        body: [
          "We are eternally grateful for the founders, builders, Readers, and workers this congregation has been blessed with throughout its decades in Aurora — and for divine Love, whose blessings on this church we hold in gratitude, past, present, and future."
        ]
      },
      {
        id: "more-to-come",
        title: "Help us tell the fuller story",
        style: "stone",
        body: [
          "This history is still being gathered. If you have photographs, programs, dates, or memories from the congregation's past, we would be glad to include them here — this page will continue to grow as more of that history comes to light."
        ],
        actions: [{ label: "Share Church History With Us", href: "/contact", variant: "primary" }]
      }
    ],
    churchConfirmation: ["Full names (last names) of the founders and builders pictured", "Additional historical milestones and dates"]
  },
  {
    path: "/about/pastor",
    eyebrow: "THE CHRISTIAN SCIENCE PASTOR",
    title: "The Bible and Science and Health serve as the Pastor.",
    description: "Christian Science churches do not have personal clergy. Their Pastor consists of the Bible and Science and Health with Key to the Scriptures by Mary Baker Eddy.",
    heroImage: photo("pastor-books", "Bible and Science and Health", "Photograph approved editions resting naturally on a simple reading surface. Keep text pages unreadable and ensure any cover use is permitted for this informational context.", "The Bible and Science and Health with Key to the Scriptures displayed together.", "3:2", false, "/images/photography/pastor-books.webp"),
    actions: [{ label: "Learn About Sunday Services", href: "/services/sunday", variant: "primary" }, { label: "Explore Weekly Bible Lesson", href: "/services/weekly-bible-lesson", variant: "secondary" }],
    sections: [
      { id: "role", title: "How the Pastor serves", body: ["Readings from the Bible and Science and Health form the sermon at Sunday services and are also read at Wednesday testimony meetings, providing a foundation for study and prayer."] }
    ]
  },
  {
    path: "/about/mary-baker-eddy",
    eyebrow: "MARY BAKER EDDY",
    title: "Discoverer and founder of Christian Science.",
    description: "Mary Baker Eddy was a religious leader, author, teacher, and founder of the Church of Christ, Scientist.",
    actions: [{ label: "Visit the Mary Baker Eddy Library", href: "https://www.marybakereddylibrary.org/", external: true, variant: "primary" }, { label: "Official Biography and Resources", href: "https://www.christianscience.com/what-is-christian-science/mary-baker-eddy", external: true, variant: "secondary" }],
    sections: [
      { id: "overview", title: "Official sources for fuller information", body: ["Mrs. Eddy's principal work, Science and Health with Key to the Scriptures, explains the theology and practice of Christian Science."], style: "teal-mist" }
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
    path: "/events/god-is-relevant-lecture-october-2026",
    eyebrow: "FREE PUBLIC LECTURE",
    title: "God is Relevant",
    seoTitle: "\"God is Relevant\" — Christian Science Lecture with Tim Myers, CS",
    description: "\"God is Relevant\" is a free Christian Science lecture with Tim Myers, CS, hosted by First Church of Christ, Scientist, Aurora, CO.",
    keywords: ["Tim Myers, CS", "Christian Science Lecture", "God is Relevant", "Christian Science Aurora", "free public lecture", "Christian Science Board of Lectureship"],
    directAnswer: "Thursday, October 8, 2026 at 7:00 PM. Location to be announced. Free and open to the public. This lecture will not be broadcast or recorded — attendance is in person only.",
    heroImage: photo("campaign-god-is-relevant", "\"God is Relevant\" lecture banner (square)", "Church-supplied promotional banner for the hero image slot; event details are baked into the image itself. Same asset used for the homepage Featured Event banner.", "Free Public Lecture \"God is Relevant\" with Tim Myers, CS — Thursday, October 8, 2026, 7:00 PM, location to be announced.", "1:1", false, "/images/photography/campaign-god-is-relevant.webp"),
    actions: [
      { label: "Add to Calendar", href: "data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0ABEGIN:VEVENT%0ASUMMARY:Free%20Public%20Lecture%3A%20%22God%20is%20Relevant%22%20with%20Tim%20Myers%2C%20CS%0ADTSTART:20261008T1900000600%0ADTEND:20261008T2000000600%0AEND:VEVENT%0AEND:VCALENDAR", variant: "primary", external: true },
      { label: "Google Calendar", href: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Free%20Public%20Lecture%3A%20%22God%20is%20Relevant%22%20with%20Tim%20Myers%2C%20CS&dates=2026-10-08T19:00:00-06:00/2026-10-08T20:00:00-06:00&location=Location%20to%20be%20announced", variant: "secondary", external: true }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "God is Relevant",
      description: "A free Christian Science lecture exploring whether God remains relevant today, through Christ Jesus' healing works and contemporary accounts of healing involving injury, depression, and addiction.",
      startDate: "2026-10-08T19:00:00-06:00",
      endDate: "2026-10-08T20:00:00-06:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      isAccessibleForFree: true,
      location: { "@type": "Place", name: "First Church of Christ, Scientist, Aurora, Colorado", address: "15700 E. Quincy Avenue, Aurora, Colorado 80015" },
      organizer: { "@type": "Organization", name: site.name, url: site.domain },
      performer: { "@type": "Person", name: "Tim Myers, CS", jobTitle: "Christian Science Practitioner and Lecturer", url: "https://www.christianscience.com/lecturers/tim-myers" }
    },
    sections: [
      {
        id: "notice",
        title: "This lecture will not be recorded",
        body: [
          "In keeping with directives from the Christian Science Board of Lectureship, this lecture will not be broadcast, livestreamed, or recorded in any format.",
          "No video or audio version will be made available afterward. Everyone who wishes to hear this lecture is warmly invited to attend in person."
        ],
        style: "gold-accent"
      },
      {
        id: "details",
        title: "Lecture details",
        cards: [
          { title: "When", text: "Thursday, October 8, 2026 · 7:00 PM" },
          { title: "Where", text: "Location to be announced. Check back here, or contact us closer to the date." },
          { title: "Cost", text: "Free and open to the public. No signup or church membership required." },
          { title: "Format", text: "In person only. Not broadcast, livestreamed, or recorded." }
        ]
      },
      {
        id: "about-topic",
        title: "About this lecture",
        body: [
          "\"God is Relevant\" explores whether God remains relevant in our lives today. Drawing on Christ Jesus' teachings and contemporary accounts of healing — including injury, depression, and addiction — Tim Myers considers how understanding God as Love brings a practical, relevant impact into everyday life.",
          "This lecture is sponsored by First Church of Christ, Scientist, Aurora, CO."
        ],
        style: "teal-mist",
        actions: [{ label: "Official Lecture Description", href: "https://www.christianscience.com/lectures/god-is-relevant", external: true, variant: "secondary" }]
      },
      {
        id: "about-speaker",
        eyebrow: "ABOUT THE SPEAKER",
        title: "Tim Myers, CS",
        body: [
          "Tim Myers graduated from Occidental College with a degree in English, served as an officer in the United States Army, and built and led his own construction business, collaborating with award-winning architects on several notable structures in the Los Angeles area.",
          "After closing his business, Tim devoted himself to community service — including helping build a local teen center, serving on its board, studying conflict resolution, and providing counseling for young people. He taught Sunday School at detention centers in Southern California and served on the chaplain's staff at his alma mater, where he took part in interfaith dialogues.",
          "For more than thirty years, Tim has served as a Christian Science practitioner, offering prayer-based treatment and witnessing healings among friends, family, and others who have sought his support. He now speaks to audiences across the United States — in prisons, homeless shelters, libraries, churches, and college campuses — as a member of the Christian Science Board of Lectureship."
        ],
        actions: [{ label: "Official Lecturer Profile", href: "https://www.christianscience.com/lecturers/tim-myers", external: true, variant: "secondary" }]
      },
      {
        id: "watch",
        eyebrow: "WATCH",
        title: "\"Remove the Mask and See the Child of God\"",
        intro: "A recorded Christian Science talk by Tim Myers, shared publicly on YouTube.",
        body: [
          "Tim Myers has also written on this same theme. His related essay, published under the same title in the Christian Science Monitor, is linked below — it's a companion piece by the same author on the same subject, not a verbatim transcript of this recorded talk."
        ],
        video: { youtubeId: "dTRPvVrlO90", title: "Remove the Mask and See the Child of God • Tim Myers Christian Science Talk" },
        actions: [
          { label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=dTRPvVrlO90", external: true, variant: "secondary" },
          { label: "Read the Related Essay", href: "https://www.csmonitor.com/Commentary/A-Christian-Science-Perspective/2015/1027/Remove-the-mask-and-see-the-child-of-God", external: true, variant: "secondary" }
        ]
      },
      {
        id: "hear-more",
        title: "Read and listen: more from Tim Myers, CS",
        intro: "Published articles and audio talks by Tim Myers in the Christian Science Sentinel, ahead of the lecture.",
        cards: [
          { title: "Living in an Age of Anxiety?", text: "A Christian Science Sentinel article by Tim Myers on finding calm and quiet through prayer.", href: "https://sentinel.christianscience.com/issues/2007/11/109-46/living-in-an-age-of-anxiety", action: "Read article" },
          { title: "Looking for Love in the Right Place", text: "A Christian Science Sentinel Watch audio talk in which Tim Myers shares how understanding God as Love brought healing and renewal to his own life.", href: "https://sentinel.christianscience.com/sentinel-audio/sentinel-watch/looking-for-love-in-the-right-place", action: "Listen" },
          { title: "How God's Law of Love Can Heal You", text: "A Christian Science Sentinel audio chat led by Tim Myers on self-worth, bullying, and healing through God's law of love.", href: "https://sentinel.christianscience.com/sentinel-audio/audio-chats/how-god-s-law-of-love-can-heal-you", action: "Listen" }
        ]
      },
      {
        id: "join-us",
        title: "We hope you'll join us in person.",
        body: ["Seating details and the exact venue will be posted here as soon as they're confirmed."],
        actions: [actions.contact]
      }
    ]
  },
  {
    path: "/give",
    eyebrow: "GIVE",
    title: "Support the work of Christian Science Aurora.",
    description: "Giving is voluntary. Contributions can support worship, Sunday School, the Reading Room, public events, outreach, and care of the church property.",
    pageType: "giving",
    actions: [{ label: "Give Now", href: "#giving-module", variant: "primary" }],
    sections: [
      { id: "giving-module", title: "Give online", intro: "Scan a QR code with your phone's camera, or use the link on each card.", cards: [
        { title: "Give via PayPal", text: "Scan the code or tap through to give securely with PayPal.", href: "https://www.paypal.com/qrcodes/managed/5f176883-4027-426d-b859-07f541087fee?utm_source=hawk_quick_link", action: "Give via PayPal", image: { id: "giving-paypal-qr", label: "PayPal giving QR code", productionNote: "Church-issued PayPal quick-link QR code.", altText: "QR code to give to First Church of Christ, Scientist, Aurora via PayPal.", aspectRatio: "1:1", src: "/images/photography/giving/paypal-qr.webp" } },
        { title: "Give via Zelle", text: "Send from your bank's Zelle feature to cschurchaurora@outlook.com, or scan the code to enroll and confirm the recipient name before sending.", href: "https://enroll.zellepay.com/qr-codes/?data=eyJuYW1lIjoiRklSU1QgQ0hVUkNIIE9GIENIUklTVCwgU0NJRU5USVNULCIsInRva2VuIjoiY3NjaHVyY2hhdXJvcmFAb3V0bG9vay5jb20iLCJhY3Rpb24iOiJwYXltZW50In0=", action: "Give via Zelle", image: { id: "giving-zelle-qr", label: "Zelle giving QR code", productionNote: "Church-issued Zelle enrollment QR code, registered to cschurchaurora@outlook.com.", altText: "QR code to give to First Church of Christ, Scientist, Aurora via Zelle.", aspectRatio: "1:1", src: "/images/photography/giving/zelle-qr.webp" } }
      ] },
      { id: "choices", title: "Ways to give", cards: [
        { title: "One-time gift", text: "Make a single contribution in the amount you choose." },
        { title: "Recurring gift", text: "Set up an ongoing contribution and change or cancel it any time through PayPal or your bank's Zelle feature." },
        { title: "By check", text: "Make checks payable to \"First Church of Christ, Scientist, Aurora\" and mail or bring them to 15700 E. Quincy Avenue, Aurora, Colorado 80015." },
        { title: "Other ways", text: "In-person gifts are always welcome. For bequests, gifts of goods-in-kind, real estate, vehicles, stock, or donor-advised funds, our treasurer would be glad to help." }
      ] },
      { id: "planned-giving", title: "Planned and special gifts", body: ["Thinking about remembering the church in your will, or giving something other than cash — goods-in-kind, real estate, a vehicle, or another asset? We would be honored, and we know these decisions deserve care and a real conversation.", "Please reach out to our treasurer at treasurer@christianscienceaurora.com. We're happy to answer questions, walk through the options together, or simply talk — with no obligation. Whatever you're able to give, we're deeply grateful for your generosity and support."], style: "teal-mist" },
      { id: "privacy", title: "Your privacy and receipt", body: ["Payments are processed directly through PayPal or Zelle. The church receives only the information needed to record the gift and provide a receipt.", "Do not send payment-card, bank, or Zelle information by email or through the general contact form."] }
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
      { id: "contact-details", title: "First Church of Christ, Scientist, Aurora", body: ["15700 E. Quincy Avenue", "Aurora, Colorado 80015", "(303) 766-0620", "info@christianscienceaurora.com"] }
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
    title: "Privacy Policy",
    description: "How ChristianScienceAurora.com collects, uses, and protects your information.",
    pageType: "legal",
    sections: [
      { id: "intro", title: "Overview", body: ["First Church of Christ, Scientist, Aurora (\"the church,\" \"we,\" or \"us\") maintains ChristianScienceAurora.com. This policy explains what information the website collects, how it is used, and how it is protected. This policy applies only to this website and not to third-party sites we link to, such as ChristianScience.com, JSH-Online, or The Christian Science Monitor."] },
      { id: "provided", title: "Information you provide", body: ["We collect the information you choose to submit through the contact form on this site — your name, email address, topic, and message. We use this only to respond to your inquiry.", "If you give online, PayPal or Zelle process your payment directly. We never see or store your card number, bank account, or payment credentials — we only receive confirmation that a gift was made, the amount, and information needed to send a receipt or thank-you."] },
      { id: "automatic", title: "Information collected automatically", body: ["This website does not currently use analytics, tracking, or advertising cookies. Our hosting provider may automatically log basic technical information (such as IP address and browser type) for security and reliability, as is standard for any website."] },
      { id: "use", title: "How information is used", body: ["Information submitted through this site is used only to respond to inquiries, process voluntary gifts, and maintain basic church records. We do not sell, rent, or share your information with third parties for marketing purposes."] },
      { id: "children", title: "Children’s privacy", body: ["This website is not designed to collect personal information directly from children. Any Sunday School registration or related information should be submitted by a parent or guardian."], style: "teal-mist" },
      { id: "retention", title: "Retention and your choices", body: ["We keep contact-form and giving records only as long as reasonably needed for church administration and recordkeeping. To ask what information we have about you, or to request it be corrected or deleted, contact us at info@christianscienceaurora.com."] },
      { id: "changes", title: "Changes to this policy", body: ["We may update this policy as the website changes. Material changes will be reflected here with an updated date.", "Last updated: August 2026."] }
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
      { id: "building", title: "Accessibility at the church building", body: ["The building has a step-free entrance — there are no steps to enter or move through the building. There is a curb between the parking lot and the walkway, with an accessibility ramp near the handicap parking spaces on the south-east side of the parking lot.", "Accessible restrooms are available inside the building. Assistive listening devices are available on request — just ask an usher.", "Braille materials are not kept on hand, but a Bible and Science and Health with Key to the Scriptures in braille can be ordered through the Reading Room upon request."] },
      { id: "contact", title: "Requesting an accommodation", body: ["If you're at the church, ask any usher. Otherwise, call (303) 766-0620 to reach the church clerk, or use the contact form.", "Last reviewed: August 2, 2026."] }
    ]
  },
  {
    path: "/terms",
    eyebrow: "LEGAL",
    title: "Terms of Use",
    description: "General terms for using ChristianScienceAurora.com.",
    pageType: "legal",
    sections: [
      { id: "use", title: "Lawful and responsible use", body: ["By using this website, you agree to use it lawfully and respectfully. Content is provided for general informational and spiritual purposes and may be changed, updated, or removed at any time without notice."] },
      { id: "giving", title: "Giving", body: ["Contributions made through this site are voluntary and processed by PayPal or Zelle. We do our best to record and acknowledge gifts accurately; contact our treasurer at treasurer@christianscienceaurora.com with any questions or to request a correction."] },
      { id: "content", title: "Content and permissions", body: ["Local text, photography, and design on this site belong to or are used with permission by Christian Science Aurora. The Bible, Science and Health with Key to the Scriptures, other Christian Science publications, trademarks, quotations, and recordings belong to their respective owners and may require separate permission to reuse. See our Content Permissions page for details."] },
      { id: "external", title: "External links", body: ["This site links to official Christian Science resources and other third-party sites for convenience. We do not control those sites and are not responsible for their content, security, availability, or privacy practices."] },
      { id: "availability", title: "Availability", body: ["We aim to keep this website available and accurate but do not guarantee uninterrupted access. We may update these terms from time to time; continued use of the site means you accept the current terms.", "Last updated: August 2026."] }
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
        { title: "Give", text: "Ways to give online, by check, or in other ways.", href: "/give", action: "Open Give" },
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
      { id: "notice", title: "Appearance does not grant reuse rights", body: ["Contact Christian Science Aurora concerning locally owned material. For official Christian Science content, contact the applicable rights holder.", "Link to official resources unless reuse is expressly authorized."], style: "teal-mist" }
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
