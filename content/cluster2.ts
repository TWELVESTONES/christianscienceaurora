import type { PageDefinition } from "@/lib/types";
import { site } from "@/content/site";

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.domain}/#website`,
  name: site.shortName,
  url: site.domain,
};

const breadcrumbs = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${site.domain}${item.path}`,
  })),
});

const overviewFaq = [
  {
    question: "Do I need to be a Christian Scientist to attend?",
    answer:
      "No. Public services and the Reading Room welcome visitors, including people who are simply curious or learning about Christian Science. You do not need prior knowledge or church membership to attend, listen, read, or ask a question.",
  },
  {
    question: "What books do Christian Scientists study?",
    answer:
      "Christian Scientists study the Bible and Science and Health with Key to the Scriptures by Mary Baker Eddy. In church, readings from these two books form the Sunday Lesson-Sermon and are also used at Wednesday testimony meetings.",
  },
  {
    question: "Is Christian Science healing based on positive thinking?",
    answer:
      "No. Christian Science distinguishes prayer and spiritual healing from suggestion, willpower, or the action of a human mind. Its own theological basis is God, divine Mind, and the spiritual understanding of God and man taught and demonstrated by Christ Jesus.",
  },
];

export const cluster2PageDefinitions: PageDefinition[] = [
  {
    path: "/christian-science",
    canonicalPath: "/christian-science/",
    eyebrow: "CHRISTIAN SCIENCE EXPLAINED",
    title: "What is Christian Science?",
    seoTitle: "What Is Christian Science? Beliefs, Prayer & Practice",
    description:
      "A clear introduction to Christian Science: its Bible-based Christian foundation, understanding of God and Christ Jesus, prayer, spiritual identity, healing, and daily practice.",
    directAnswer:
      "Christian Science is a Christian religion discovered and founded by Mary Baker Eddy. It is grounded in the Bible and the teachings and healing works of Christ Jesus. Its study and practice center on understanding God, prayer, spiritual growth, moral transformation, and Christian healing, with Science and Health with Key to the Scriptures serving as its denominational textbook.",
    actions: [
      { label: "Plan Your Visit", href: "/visit", variant: "primary" },
      { label: "About Sunday Service", href: "/services/sunday", variant: "secondary" },
    ],
    structuredData: [
      webSiteSchema,
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Christian Science", path: "/christian-science/" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: overviewFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
    sections: [
      {
        id: "christian-foundation",
        eyebrow: "A CHRISTIAN FOUNDATION",
        title: "Is Christian Science Christian?",
        body: [
          "Yes. Christian Science is Christian. The Bible is foundational, Christ Jesus is central to its theology and practice, and Christian Scientists seek to follow his teachings, moral example, prayer, and healing ministry.",
          "Mary Baker Eddy’s six religious tenets summarize this foundation. They affirm one infinite God, one Christ, the Holy Ghost, man in God’s image and likeness, the significance of Jesus’ atonement and resurrection, salvation through Christ, and the call to live with the Mind of Christ through mercy, justice, purity, prayer, and the Golden Rule.",
          "Source: Science and Health with Key to the Scriptures, pp. 496–497.",
        ],
        actions: [
          { label: "Read the Six Religious Tenets", href: "/christian-science/beliefs/", variant: "secondary" },
        ],
      },
      {
        id: "bible",
        eyebrow: "SCRIPTURE AND STUDY",
        title: "Is Christian Science based on the Bible?",
        style: "stone",
        body: [
          "Yes. Mary Baker Eddy describes the inspired Word of the Bible as the sufficient guide to eternal Life and records that her discovery grew out of sustained Scriptural study. Science and Health is studied with the Bible, not as a replacement for it.",
          "Christian Scientists read both books individually and in church. The purpose is practical: to understand Christianity more deeply and live it more consistently.",
          "Source: Science and Health, Preface viii; pp. 496–497.",
        ],
        actions: [
          { label: "How the Bible and Science and Health Serve as Pastor", href: "/about/pastor", variant: "secondary" },
          { label: "About the Weekly Bible Lesson", href: "/services/weekly-bible-lesson", variant: "secondary" },
        ],
      },
      {
        id: "god",
        eyebrow: "UNDERSTANDING GOD",
        title: "What does Christian Science teach about God?",
        body: [
          "Christian Science teaches one infinite, incorporeal God. Mary Baker Eddy uses seven synonymous terms—Mind, Spirit, Soul, Principle, Life, Truth, and Love—to express the nature, essence, and wholeness of Deity. They refer to one God, not seven deities.",
          "This understanding emphasizes God as wholly good, intelligent, loving, spiritual, and present. It also shapes the Christian Science view of man as God’s image and likeness, expressing divine qualities rather than existing apart from God.",
          "Source: Science and Health, p. 465.",
        ],
        cards: [
          { title: "Mind", text: "God understood as the one divine intelligence, the source of true wisdom and understanding." },
          { title: "Spirit", text: "God understood as Spirit, directing thought beyond a material or bodily concept of Deity." },
          { title: "Truth", text: "God understood as Truth, the divine reality that corrects error and supports spiritual freedom." },
          { title: "Love", text: "God understood as Love, impartial and ever-present, and the basis of Christian compassion." },
        ],
        actions: [
          { label: "Explore God in Christian Science", href: "/christian-science/god/", variant: "secondary" },
        ],
      },
      {
        id: "jesus-and-christ",
        eyebrow: "CHRIST JESUS",
        title: "What do Christian Scientists believe about Jesus and Christ?",
        style: "periwinkle-mist",
        body: [
          "Christian Science honors Jesus as the Messiah and Way-shower and gives his life, teachings, healing works, crucifixion, and resurrection a central place. It also distinguishes Jesus, the human man, from Christ, the eternal divine idea of God that Jesus uniquely embodied and demonstrated.",
          "Mary Baker Eddy describes Christ as the divine nature that animated Jesus and as Truth reaching human consciousness. The distinction is meant to make the Christ present and practical, not to diminish Jesus.",
          "Source: Science and Health, pp. 26, 29–30, 332, 473.",
        ],
        actions: [
          { label: "Attend a Sunday Service", href: "/services/sunday", variant: "primary" },
        ],
      },
      {
        id: "prayer",
        eyebrow: "PRAYER AND PRACTICE",
        title: "What do Christian Scientists believe about prayer?",
        body: [
          "Prayer in Christian Science is more than asking God to change circumstances. It includes sincere desire, spiritual understanding, self-examination, gratitude, obedience, and living what one prays. Mary Baker Eddy connects effective prayer with following Christ Jesus and bringing thought and conduct into harmony with God.",
          "The opening chapter of Science and Health emphasizes that prayer is proved in life—in greater love, purity, humility, goodness, and faithfulness—not simply in words.",
          "Source: Science and Health, pp. 1–17.",
        ],
        actions: [
          { label: "Attend a Wednesday Testimony Meeting", href: "/services/wednesday", variant: "secondary" },
        ],
      },
      {
        id: "healing",
        eyebrow: "CHRISTIAN HEALING",
        title: "What do Christian Scientists believe about healing?",
        style: "teal-mist",
        body: [
          "Christian Science regards spiritual healing as part of Christian discipleship and connects it with prayer, understanding God, moral transformation, and the healing example of Christ Jesus. It does not describe healing as positive thinking, willpower, suggestion, or the action of a human mind.",
          "For Christian Scientists, healing is inseparable from a growing understanding of God and from living more consistently with Jesus’ teachings. This page explains the religious teaching; it does not offer medical advice or promise a particular physical outcome.",
          "Source: Science and Health, Preface x–xii; pp. 473, 495–497.",
        ],
        actions: [
          { label: "Hear About Prayer and Healing Experiences", href: "/services/wednesday", variant: "secondary" },
          { label: "Explore Trusted Christian Science Resources", href: "/resources", variant: "secondary" },
        ],
      },
      {
        id: "spiritual-identity",
        eyebrow: "SPIRITUAL IDENTITY",
        title: "What does Christian Science teach about spiritual identity?",
        body: [
          "Christian Science begins with the Biblical teaching that man is made in the image and likeness of God. Because God is Spirit, Christian Science understands man’s real identity as spiritual—the expression or reflection of God—rather than as a self separated from God.",
          "This is a theological statement about what Christian Science holds to be ultimately true of God and creation. It is the spiritual standpoint from which prayer, moral growth, and healing are approached.",
          "Source: Science and Health, pp. 476–477; pp. 496–497.",
        ],
      },
      {
        id: "name",
        eyebrow: "THE NAME",
        title: "Why is it called Christian Science?",
        style: "stone",
        body: [
          "Christian points to Christ Jesus—his teachings, works, and command to live the gospel. Science refers to Mary Baker Eddy’s conviction that Christianity rests on divine Principle and spiritual law that can be understood and demonstrated in life rather than remaining only a creed or theory.",
          "Science and Health uses expressions such as “the Science of Christianity” and “divine Science” for this understanding of the spiritual laws Mrs. Eddy saw underlying Jesus’ teachings and works.",
          "Source: Science and Health, pp. 123, 473, 495.",
        ],
        actions: [
          { label: "About Mary Baker Eddy", href: "/about/mary-baker-eddy", variant: "secondary" },
        ],
      },
      {
        id: "practice",
        eyebrow: "BELIEFS MADE PRACTICAL",
        title: "How do Christian Scientists practice their faith?",
        cards: [
          { title: "Study", text: "Read the Bible and Science and Health to grow in spiritual understanding and apply what is learned." },
          { title: "Pray", text: "Seek God’s guidance, examine motives, express gratitude, and live with greater love, purity, and integrity." },
          { title: "Follow Jesus", text: "Aim for practical Christianity through love of God and neighbor, moral regeneration, and discipleship." },
          { title: "Worship", text: "Sunday services, Wednesday testimony meetings, Sunday School, study, and fellowship support spiritual growth." },
          { title: "Seek healing through prayer", text: "Christian Scientists understand healing through prayer and spiritual understanding as part of following Christ Jesus." },
          { title: "Live the Golden Rule", text: "The six tenets conclude with a commitment to the Mind of Christ, mercy, justice, purity, and doing to others as we would have them do to us." },
        ],
        actions: [
          { label: "View Weekly Services", href: "/services", variant: "primary" },
        ],
      },
      {
        id: "beliefs",
        eyebrow: "THE SIX TENETS",
        title: "What are the basic beliefs of Christian Science?",
        style: "periwinkle-mist",
        body: [
          "Mary Baker Eddy gives six religious tenets in Science and Health. In summary, they affirm the Bible as the Scriptural guide; one infinite God, one Christ, the Holy Ghost, and man in God’s likeness; the destruction of sin; the meaning of Jesus’ atonement; the spiritual significance of the crucifixion and resurrection; and a commitment to live with the Mind of Christ.",
          "The beliefs page explains each tenet in context without reproducing extended passages from the textbook.",
          "Source: Science and Health, pp. 496–497.",
        ],
        actions: [
          { label: "Explore the Six Religious Tenets", href: "/christian-science/beliefs/", variant: "primary" },
        ],
      },
      {
        id: "begin",
        eyebrow: "FOR BEGINNERS",
        title: "How do I begin learning about Christian Science?",
        body: [
          "You do not need to become a member or agree with everything before you begin exploring. A simple starting point is to read the Bible alongside Science and Health with Key to the Scriptures, bring your questions, and learn at your own pace.",
          "The first chapter of Science and Health, “Prayer,” is a direct introduction to Christian Science practice. You can also attend a public service or visit the Reading Room without a membership commitment.",
        ],
        actions: [
          { label: "Visit the Reading Room", href: "/reading-room", variant: "secondary" },
          { label: "Plan Your Visit", href: "/visit", variant: "primary" },
        ],
      },
      {
        id: "newcomer-questions",
        eyebrow: "COMMON BEGINNER QUESTIONS",
        title: "What can I expect as I explore?",
        faq: overviewFaq,
      },
      {
        id: "sources",
        eyebrow: "SOURCES",
        title: "Source and content note",
        style: "stone",
        body: [
          "This page is an original summary of Christian Science teachings written from the framework of Mary Baker Eddy’s Science and Health with Key to the Scriptures. Principal source sections include the Preface, “Prayer” (pp. 1–17), “Atonement and Eucharist” (pp. 18–55), and “Recapitulation” (pp. 465–497).",
          "The page paraphrases teachings rather than reproducing extended passages. For complete wording and context, consult Science and Health directly and see this site’s Content Permissions information for reuse guidance.",
        ],
        actions: [
          { label: "Content Permissions", href: "/content-permissions", variant: "secondary" },
          { label: "Ask a Question", href: "/contact", variant: "secondary" },
        ],
      },
    ],
  },
  {
    path: "/christian-science/beliefs",
    canonicalPath: "/christian-science/beliefs/",
    eyebrow: "SIX RELIGIOUS TENETS",
    title: "The six religious tenets of Christian Science",
    seoTitle: "Six Religious Tenets of Christian Science",
    description:
      "A newcomer-friendly explanation of the six religious tenets Mary Baker Eddy gives in Science and Health with Key to the Scriptures, with source references for fuller study.",
    directAnswer:
      "Christian Science has six religious tenets that summarize its Christian theology and practice. They affirm the Bible as a guide, one supreme God, God’s forgiveness of sin through its destruction, the saving work of Christ, the significance of Jesus’ crucifixion and resurrection, and a commitment to prayer, mercy, justice, purity, and the Mind of Christ.",
    actions: [
      { label: "Read the Christian Science Overview", href: "/christian-science/", variant: "primary" },
      { label: "Plan Your Visit", href: "/visit", variant: "secondary" },
    ],
    structuredData: [
      webSiteSchema,
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Christian Science", path: "/christian-science/" },
        { name: "Beliefs", path: "/christian-science/beliefs/" },
      ]),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: "SIX POINTS",
        title: "How are the tenets presented here?",
        body: [
          "Mary Baker Eddy presents the six religious tenets in the question-and-answer chapter “Recapitulation.” The explanations below paraphrase those tenets and draw on nearby passages for context rather than reproducing the full text.",
          "The complete tenets appear in Science and Health with Key to the Scriptures, pp. 496–497.",
        ],
      },
      {
        id: "tenet-1",
        eyebrow: "TENET 1",
        title: "The Bible is the foundational Scriptural guide",
        style: "stone",
        body: [
          "Christian Science begins with the Bible. The first tenet identifies the inspired Word of the Bible as the sufficient guide to eternal Life, and Mary Baker Eddy traces her discovery of Christian Science to Scriptural study.",
          "Science and Health is studied with the Bible to help readers discern spiritual meaning and understand the Christianity Mrs. Eddy saw expressed in Jesus’ teachings and works.",
          "Source: Science and Health, Preface viii; pp. 496–497.",
        ],
        actions: [
          { label: "About the Christian Science Pastor", href: "/about/pastor", variant: "secondary" },
        ],
      },
      {
        id: "tenet-2",
        eyebrow: "TENET 2",
        title: "One infinite God, one Christ, the Holy Ghost, and man in God’s likeness",
        body: [
          "Christian Science is monotheistic. It teaches one supreme and infinite God, acknowledges Christ and the Holy Ghost, and affirms the Biblical teaching that man is made in God’s image and likeness.",
          "Mary Baker Eddy defines God as infinite Mind, Spirit, Soul, Principle, Life, Truth, and Love. These terms express the nature and wholeness of one God, not separate deities.",
          "Source: Science and Health, p. 465; pp. 476–477; pp. 496–497.",
        ],
      },
      {
        id: "tenet-3",
        eyebrow: "TENET 3",
        title: "Forgiveness is tied to the destruction of sin",
        style: "teal-mist",
        body: [
          "Christian Science does not treat forgiveness as a verbal declaration that leaves wrongdoing untouched. The third tenet connects God’s forgiveness with the destruction of sin and with spiritual understanding that exposes evil as having no divine basis.",
          "This makes repentance practical. Prayer and faith are expected to lead to reformation—to changed motives, conduct, and character. Science and Health repeatedly joins prayer with self-examination, obedience, and a sincere effort to live more consistently with Christ Jesus’ teachings.",
          "Source: Science and Health, pp. 4–11; pp. 496–497.",
        ],
      },
      {
        id: "tenet-4",
        eyebrow: "TENET 4",
        title: "Jesus’ atonement reveals divine Love and man’s unity with God",
        style: "periwinkle-mist",
        body: [
          "Christian Science regards Jesus’ atonement as evidence of divine Love. Mary Baker Eddy describes Christ Jesus as the Way-shower and connects salvation with Christ—with Truth, Life, and Love as Jesus demonstrated them.",
          "This teaching joins discipleship with belief. Jesus’ life and works show the way of reconciliation with God, and Christian Scientists seek to follow that way through spiritual growth, moral regeneration, love, prayer, and Christian healing.",
          "Source: Science and Health, pp. 18–26; pp. 496–497.",
        ],
        cards: [
          { title: "Jesus as Way-shower", text: "Jesus’ life and obedience are understood as the supreme human example of the Christ in action." },
          { title: "Salvation lived", text: "Salvation includes a growing conformity of thought and life to divine Truth, Life, and Love." },
        ],
      },
      {
        id: "tenet-5",
        eyebrow: "TENET 5",
        title: "The crucifixion and resurrection point to eternal Life",
        body: [
          "The fifth tenet emphasizes the spiritual significance of Jesus’ crucifixion and resurrection. Christian Science understands these events as lifting faith toward a deeper understanding of eternal Life and the supremacy of Spirit.",
          "Mary Baker Eddy presents the resurrection as essential evidence in Jesus’ demonstration of Life and as a foundation for the disciples’ increased spiritual understanding and confidence in his teachings.",
          "Source: Science and Health, pp. 42–46; pp. 496–497.",
        ],
      },
      {
        id: "tenet-6",
        eyebrow: "TENET 6",
        title: "The Mind of Christ should shape daily life",
        style: "teal-mist",
        body: [
          "The final tenet turns theology toward conduct. Christian Scientists commit themselves to watch and pray for the Mind that was in Christ Jesus, to practice the Golden Rule, and to be merciful, just, and pure.",
          "This is a concise statement of Christian Science ethics: spiritual understanding is expected to appear in character, relationships, choices, and service to others.",
          "Source: Science and Health, pp. 448, 495–497.",
        ],
        cards: [
          { title: "Watch", text: "Examine motives and habits that do not express the Mind of Christ." },
          { title: "Pray", text: "Seek spiritual understanding, humility, gratitude, and alignment with Truth and Love." },
          { title: "Act", text: "Let prayer result in fairness, compassion, honesty, forgiveness, and care for others." },
          { title: "Grow", text: "Treat spiritual progress as an ongoing practice rather than a label or intellectual position." },
        ],
      },
      {
        id: "sources",
        eyebrow: "SOURCES",
        title: "Source and content note",
        style: "periwinkle-mist",
        body: [
          "This page is an original explanation of the six religious tenets and related Christian Science teachings. It paraphrases rather than reproduces the full text of Mary Baker Eddy’s writings.",
          "For the complete wording and context, consult Science and Health with Key to the Scriptures, especially pp. 465–497. Copyright and reuse questions should follow the rights holder’s requirements and this site’s Content Permissions guidance.",
        ],
        actions: [
          { label: "Content Permissions", href: "/content-permissions", variant: "secondary" },
          { label: "Ask a Question", href: "/contact", variant: "secondary" },
        ],
      },
    ],
  },
];
