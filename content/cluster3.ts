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

const godFaq = [
  {
    question: "Who is God in Christian Science?",
    answer:
      "Christian Science teaches one infinite God, wholly good and spiritual. Mary Baker Eddy uses seven synonymous terms—Mind, Spirit, Soul, Principle, Life, Truth, and Love—to describe the nature of the one God. These terms are not separate deities; each helps express something of God's infinite nature.",
  },
  {
    question: "What is God?",
    answer:
      "Christian Science teaches God as infinite, incorporeal Spirit rather than a magnified human personality. It uses the synonymous terms Mind, Spirit, Soul, Principle, Life, Truth, and Love to express the nature of the one God and to help make spiritual ideas about God more understandable and practical.",
  },
  {
    question: "Why does Christian Science describe God as Love?",
    answer:
      "The Bible says that God is love, and Christian Science takes that statement as describing God's very nature rather than only one divine quality. Understanding God as divine Love emphasizes impartial goodness, care, mercy, and the spiritual basis for loving God and one's neighbor more consistently.",
  },
  {
    question: "Does God love everyone?",
    answer:
      "Christian Science understands divine Love as infinite and impartial, not selective or changeable. Because God is Love, God's goodness is not limited to a favored group. This understanding calls Christians to express more of that impartial love through mercy, justice, forgiveness, compassion, and care for every neighbor.",
  },
  {
    question: "What does Christian Science mean by divine Mind?",
    answer:
      "Mind is one of seven synonymous names Christian Science uses for God. It points to God as infinite intelligence and wisdom, not to a human or personal mind. Prayer therefore seeks a clearer understanding of divine Mind rather than relying on willpower, suggestion, or merely positive thinking.",
  },
  {
    question: "How can I understand God better?",
    answer:
      "Christian Science encourages prayer, study of the Bible and Science and Health with Key to the Scriptures, attention to Christ Jesus' teachings, and putting spiritual qualities into practice. Understanding is expected to become more practical as love, honesty, humility, purity, gratitude, wisdom, and trust in God shape daily choices.",
  },
  {
    question: "How can I feel God's presence?",
    answer:
      "Christian Science approaches God's presence through prayer and spiritual understanding rather than through a physical sensation. Quietly turning thought toward God's goodness, love, wisdom, and nearness—and living in ways consistent with those qualities—can help make God's presence more meaningful and practical in daily life.",
  },
  {
    question: "How can I trust God more?",
    answer:
      "Trust grows through prayer, Scriptural study, gratitude, and practicing what one is learning about God. Christian Science also looks to Christ Jesus' example of reliance on God. The aim is not blind optimism, but a more grounded spiritual confidence expressed in wiser motives, greater love, and steadier obedience to good.",
  },
  {
    question: "What is my relationship to God?",
    answer:
      "Christian Science begins with the Biblical teaching that man is made in God's image and likeness. It describes man's real identity as spiritual and as expressing God-given qualities. God is God and man is not God; the relationship is understood through reflection, likeness, dependence on God, and inseparability from divine good.",
  },
  {
    question: "Where can I ask questions about God in Aurora?",
    answer:
      "You are welcome to attend a public service, visit the Christian Science Reading Room, or contact Christian Science Aurora with a question. No church membership or prior knowledge is required. These are places to listen, read, pray, talk with someone, and explore at your own pace without pressure.",
  },
];

export const cluster3PageDefinitions: PageDefinition[] = [
  {
    path: "/christian-science/god",
    canonicalPath: "/christian-science/god/",
    eyebrow: "UNDERSTANDING GOD",
    title: "Understanding God in Christian Science",
    seoTitle: "Understanding God in Christian Science",
    description:
      "Explore the Christian Science understanding of God as infinite Mind, Spirit, Soul, Principle, Life, Truth, and Love—and what that means for prayer, identity, and daily life.",
    directAnswer:
      "Christian Science teaches one infinite God, wholly good and spiritual. Mary Baker Eddy uses seven synonymous terms—Mind, Spirit, Soul, Principle, Life, Truth, and Love—to describe God's nature. These names point to one God, not seven. Understanding God this way shapes prayer, spiritual identity, trust, moral growth, and the Christian effort to follow Christ Jesus.",
    actions: [
      { label: "What Is Christian Science?", href: "/christian-science/", variant: "primary" },
      { label: "Ask a Question", href: "/contact", variant: "secondary" },
    ],
    structuredData: [
      webSiteSchema,
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Christian Science", path: "/christian-science/" },
        { name: "God", path: "/christian-science/god/" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: godFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
    sections: [
      {
        id: "one-infinite-god",
        eyebrow: "ONE INFINITE GOD",
        title: "Who is God in Christian Science?",
        body: [
          "Christian Science is monotheistic. It teaches one God who is infinite, eternal, wholly good, spiritual, intelligent, and present. Mary Baker Eddy's writings use several Biblical and theological names for God to help readers move beyond a limited, humanlike concept of Deity.",
          "Science and Health describes God through seven synonymous terms—Mind, Spirit, Soul, Principle, Life, Truth, and Love. Each name points to the same infinite God from a different aspect; none represents a separate being or power.",
          "Source: Science and Health with Key to the Scriptures, p. 465; Glossary, p. 587.",
        ],
      },
      {
        id: "seven-synonyms",
        eyebrow: "SEVEN SYNONYMOUS TERMS",
        title: "Why does Christian Science use seven names for God?",
        intro:
          "The terms are meant to deepen understanding of one God. They are not seven gods, and they are not interchangeable labels without meaning.",
        style: "stone",
        cards: [
          { title: "Mind", text: "God understood as infinite intelligence and wisdom—the source of true understanding, not a magnified human mind." },
          { title: "Spirit", text: "God understood as wholly spiritual, infinite, and not confined to matter, a body, or a physical location." },
          { title: "Soul", text: "God understood as the source of spiritual identity, harmony, beauty, and individuality." },
          { title: "Principle", text: "God understood as the unchanging divine basis of reality, order, law, justice, and consistency." },
          { title: "Life", text: "God understood as eternal Life and the source of true being, directing thought beyond a limited material sense of life." },
          { title: "Truth", text: "God understood as divine reality and truth, the standard by which error, dishonesty, and false belief are corrected." },
          { title: "Love", text: "God understood as divine Love—impartial goodness, mercy, care, and the source of genuinely Christian love for others." },
        ],
      },
      {
        id: "bible-and-jesus",
        eyebrow: "THE BIBLE AND CHRIST JESUS",
        title: "What do the Bible and Christ Jesus teach about God?",
        body: [
          "Christian Science begins with the Bible. Scripture speaks of one God, describes God as Spirit and Love, and repeatedly presents God as creator, Father, guide, refuge, and source of good. Christian Scientists read these passages as invitations to know God more deeply rather than only to hold a creed about God.",
          "Christ Jesus makes relationship with God practical through prayer, obedience, love of God and neighbor, forgiveness, purity of heart, and trust in the Father's care. Christian Science looks to Jesus' life and works as the clearest human example of understanding God and living from that understanding.",
          "Related Bible passages include Deuteronomy 6:4; John 4:24; I John 4:8; and the Lord's Prayer in Matthew 6:9–13.",
        ],
        actions: [
          { label: "Attend a Sunday Service", href: "/services/sunday", variant: "secondary" },
        ],
      },
      {
        id: "god-is-love",
        eyebrow: "DIVINE LOVE",
        title: "What does it mean to understand God as Love?",
        style: "teal-mist",
        body: [
          "For Christian Science, Love is not only something God does; it is a name for God's nature. This understanding directs prayer away from the idea of a distant or changeable deity and toward divine goodness that is impartial, constant, and spiritually present.",
          "Taking God as Love also has an ethical demand. A growing understanding of divine Love should appear in more mercy, patience, honesty, forgiveness, courage, unselfishness, and care for others. Christian Science therefore connects knowing God with living more consistently with Christ Jesus' teachings.",
          "Source: Science and Health, pp. 2–4, 275, 465; Glossary, p. 587.",
        ],
      },
      {
        id: "relationship-to-god",
        eyebrow: "SPIRITUAL IDENTITY",
        title: "What is my relationship to God?",
        body: [
          "Christian Science begins with the Biblical teaching that man is made in the image and likeness of God. Because God is Spirit, it understands man's real identity as spiritual and as expressing God-derived qualities such as love, intelligence, integrity, joy, purity, and goodness.",
          "This does not mean that man is God. Christian Science distinguishes God from man while describing man as God's expression or reflection. The relationship is one of likeness and dependence: identity is understood more clearly as thought and life come into harmony with what is true of God.",
          "Source: Genesis 1:26–27; Science and Health, pp. 475–477, 479–480.",
        ],
      },
      {
        id: "know-god-better",
        eyebrow: "PRACTICAL SPIRITUAL GROWTH",
        title: "How can I understand God better?",
        intro:
          "Christian Science treats knowing God as something to be practiced, not only discussed.",
        cards: [
          { title: "Pray", text: "Turn sincerely to God, examine motives, listen for spiritually right direction, and let prayer change thought and conduct." },
          { title: "Study the Bible", text: "Read Scripture to learn how Biblical writers and Christ Jesus understood God's nature, guidance, love, and power." },
          { title: "Study Science and Health", text: "Use the Christian Science textbook alongside the Bible to explore God, prayer, spiritual identity, and Christian practice." },
          { title: "Follow Christ Jesus", text: "Measure spiritual progress by greater love for God and neighbor, humility, forgiveness, purity, courage, and practical discipleship." },
          { title: "Practice gratitude", text: "Notice and value good already present, allowing gratitude to become action rather than only words." },
          { title: "Live what you understand", text: "Let spiritual ideas shape choices, relationships, honesty, service, and the way you respond to difficulty." },
        ],
        actions: [
          { label: "Visit the Reading Room", href: "/reading-room", variant: "secondary" },
          { label: "Explore Christian Science Resources", href: "/resources", variant: "secondary" },
        ],
      },
      {
        id: "presence-and-guidance",
        eyebrow: "PRESENCE AND GUIDANCE",
        title: "How can I feel God's presence and recognize guidance?",
        style: "periwinkle-mist",
        body: [
          "Christian Science understands God's presence spiritually, not as a physical sensation or a private supernatural message. Prayer can include quiet listening, Scriptural study, gratitude, and a willingness to let selfishness, fear, or impulsiveness yield to qualities associated with God such as wisdom, love, purity, justice, patience, and unselfishness.",
          "Guidance is tested by its fruits. An idea that promotes honesty, compassion, moral courage, responsibility, peace, and love of God and neighbor is more consistent with the Christian standard than one that excuses harm, fear, manipulation, or self-interest.",
          "This approach keeps spiritual listening connected to the Bible, Christ Jesus' teachings, and responsible moral judgment.",
        ],
      },
      {
        id: "fear-and-peace",
        eyebrow: "TRUSTING GOD",
        title: "Can understanding God help with fear and bring peace?",
        body: [
          "Christian Science turns thought toward God's goodness, presence, wisdom, and love as a basis for prayer when facing fear, uncertainty, or unrest. The purpose is not to ignore a problem or force oneself to think positively, but to replace a limited view with a more spiritual and God-centered standpoint.",
          "Prayer may bring greater spiritual reassurance, steadiness, courage, and peace as trust in God grows and thought becomes less dominated by fear. This page describes a religious approach to prayer and spiritual growth; it does not promise a particular medical, emotional, or physical outcome.",
        ],
        actions: [
          { label: "Attend a Wednesday Testimony Meeting", href: "/services/wednesday", variant: "secondary" },
        ],
      },
      {
        id: "aurora-questions",
        eyebrow: "EXPLORE IN AURORA",
        title: "Where can I learn about God or ask questions in Aurora?",
        style: "stone",
        body: [
          "You are welcome to explore these questions without joining the church or already knowing Christian Science. Public services offer prayer, hymns, and readings from the Bible and Science and Health. The Reading Room offers a quiet place to read, study, and ask questions. You can also contact the church directly.",
          "Christian Science Aurora is at 15700 E. Quincy Avenue in Aurora, Colorado. Come to listen, study, pray, or ask a question at your own pace.",
        ],
        actions: [
          { label: "Plan Your Visit", href: "/visit", variant: "primary" },
          { label: "Visit the Reading Room", href: "/reading-room", variant: "secondary" },
          { label: "Ask a Question", href: "/contact", variant: "secondary" },
        ],
      },
      {
        id: "common-questions",
        eyebrow: "COMMON QUESTIONS",
        title: "Questions about God and Christian Science",
        faq: godFaq,
      },
      {
        id: "sources",
        eyebrow: "SOURCES AND FURTHER STUDY",
        title: "Where this explanation comes from",
        body: [
          "This page is an original summary of Christian Science teachings, written from the framework of the Bible and Mary Baker Eddy's Science and Health with Key to the Scriptures. Key source sections include “Recapitulation” (pp. 465–497) and the Glossary definitions related to God and Spirit (pp. 587, 594).",
          "The page paraphrases these teachings rather than reproducing extended copyrighted passages. For deeper study, read the Bible and Science and Health directly or use the church's approved resource links.",
        ],
        actions: [
          { label: "Explore Christian Science Resources", href: "/resources", variant: "secondary" },
          { label: "What Is Christian Science?", href: "/christian-science/", variant: "secondary" },
        ],
      },
    ],
  },
];
