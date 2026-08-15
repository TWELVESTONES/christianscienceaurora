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

const jesusFaq = [
  {
    question: "Do Christian Scientists believe in Jesus Christ?",
    answer:
      "Yes. Christian Science honors Jesus as the Messiah and Way-shower and gives his life, teachings, healing works, crucifixion, and resurrection a central place. Christian Scientists seek to follow his teachings and example through prayer, moral regeneration, love of God and neighbor, and practical Christian discipleship.",
  },
  {
    question: "Why is Jesus important in Christian Science?",
    answer:
      "Jesus is important because Christian Science looks to his teachings and works as the clearest human demonstration of Christianity lived in practice. His prayer, love, obedience to God, moral teaching, healing works, crucifixion, and resurrection are central to how Christian Science understands Christian discipleship.",
  },
  {
    question: "What is the difference between Jesus and Christ?",
    answer:
      "Christian Science distinguishes Jesus, the human man, from Christ, the eternal divine idea of God that Jesus uniquely embodied and demonstrated. The distinction is intended to make Christ spiritually present and practical while fully honoring Jesus' unique place as Messiah and Way-shower.",
  },
  {
    question: "What does Christian Science mean by Christ?",
    answer:
      "Christian Science uses Christ for God's spiritual, eternal idea or divine message reaching human consciousness. Mary Baker Eddy describes Christ as the divine nature that animated Jesus. Jesus demonstrated Christ more fully than any other person, showing what relationship with God means in life, prayer, love, and healing.",
  },
  {
    question: "What did Jesus teach about prayer?",
    answer:
      "Jesus taught prayer as sincere relationship with God, not public performance. The Lord's Prayer directs thought toward God's holiness, kingdom, provision, forgiveness, moral strength, and deliverance from evil. Christian Science also emphasizes that prayer is proved in changed motives, greater love, obedience, and a more Christlike life.",
  },
  {
    question: "What did Jesus teach about healing?",
    answer:
      "The Gospels present healing as an integral part of Jesus' ministry alongside preaching and teaching. Christian Science understands his healing works as inseparable from his knowledge of God, compassion, prayer, and the spiritual authority of Christ—not as spectacle, suggestion, or merely positive thinking.",
  },
  {
    question: "How did Jesus heal people?",
    answer:
      "Christian Science understands Jesus' healings as flowing from his spiritual understanding of God and man, his compassion, and the divine authority of Christ. It does not reduce his works to a psychological technique or formula. His healings are studied as part of the Christian record of his teaching and discipleship.",
  },
  {
    question: "What does the Sermon on the Mount teach?",
    answer:
      "The Sermon on the Mount teaches qualities and practices at the heart of Christian discipleship: humility, mercy, purity, peacemaking, love for enemies, sincere prayer, forgiveness, trust in God, the Golden Rule, and living one's faith rather than merely professing it. See Matthew chapters 5 through 7.",
  },
  {
    question: "What does the Lord's Prayer mean?",
    answer:
      "The Lord's Prayer turns thought to God as Father, God's holiness and kingdom, daily provision, forgiveness, moral responsibility, and freedom from evil. Christian Science studies the prayer as a model for spiritual communion with God and as a call to live the qualities one is asking to understand and express.",
  },
  {
    question: "How can Jesus' teachings help in everyday life?",
    answer:
      "Jesus' teachings give a Christian framework for daily choices: love God and neighbor, forgive, pray sincerely, act mercifully, seek purity of heart, resist fear, trust God, and do to others as you would have them do to you. Christian Science emphasizes practicing these teachings rather than treating them as abstract ideals.",
  },
];

export const cluster4PageDefinitions: PageDefinition[] = [
  {
    path: "/christian-science/jesus-christ",
    canonicalPath: "/christian-science/jesus-christ/",
    eyebrow: "CHRIST JESUS",
    title: "Jesus Christ in Christian Science",
    seoTitle: "Jesus Christ in Christian Science: Teachings, Prayer & Healing",
    description:
      "Explore what Christian Science teaches about Jesus Christ, the distinction between Jesus and Christ, his teachings, prayer, healing works, and practical Christian discipleship.",
    directAnswer:
      "Christian Science honors Jesus as the Messiah and Way-shower and gives his life, teachings, healing works, crucifixion, and resurrection a central place. It distinguishes Jesus, the human man, from Christ, the eternal divine idea of God that Jesus uniquely embodied and demonstrated. Following Christ Jesus means learning from his teachings and works and putting them into practice through prayer, love, moral regeneration, and Christian discipleship.",
    actions: [
      { label: "What Is Christian Science?", href: "/christian-science/", variant: "primary" },
      { label: "Attend a Sunday Service", href: "/services/sunday", variant: "secondary" },
    ],
    structuredData: [
      webSiteSchema,
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Christian Science", path: "/christian-science/" },
        { name: "Jesus Christ", path: "/christian-science/jesus-christ/" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: jesusFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
    sections: [
      {
        id: "central-place",
        eyebrow: "CENTRAL TO CHRISTIAN FAITH",
        title: "Why is Jesus Christ important in Christian Science?",
        body: [
          "Christian Science honors Jesus as the Messiah and Way-shower and gives his life, teachings, healing works, crucifixion, and resurrection a central place. His example is not treated as remote history; it is a continuing standard for Christian discipleship.",
          "Mary Baker Eddy writes of Jesus teaching the way of Life by demonstration and of the divinity of Christ being made manifest in the humanity of Jesus. Christian Science therefore looks to both what Jesus taught and what he did as essential to understanding his mission.",
          "Source: Science and Health with Key to the Scriptures, pp. 25–27.",
        ],
      },
      {
        id: "jesus-and-christ",
        eyebrow: "JESUS AND CHRIST",
        title: "What is the difference between Jesus and Christ?",
        style: "periwinkle-mist",
        body: [
          "Christian Science distinguishes Jesus, the human man, from Christ, the eternal divine idea of God that Jesus uniquely embodied and demonstrated. Mary Baker Eddy describes Christ as spiritual and eternal and Jesus as the man who presented Christ more fully than any other person.",
          "This distinction is meant to make Christ present and practical, not to diminish Jesus. The title Christ Jesus points to the unique way Jesus expressed and demonstrated the divine Christ in human experience.",
          "Source: Science and Health, pp. 331–333, 473.",
        ],
      },
      {
        id: "teachings",
        eyebrow: "THE TEACHINGS OF JESUS",
        title: "What did Jesus teach?",
        intro:
          "The Gospels present a coherent Christian way of life centered on love for God and neighbor and proved through prayer, character, mercy, and action.",
        cards: [
          { title: "Love God and neighbor", text: "Jesus placed wholehearted love for God and love for one's neighbor at the center of Christian life. See Mark 12:28–31." },
          { title: "Live the Sermon on the Mount", text: "Humility, mercy, purity, peacemaking, love for enemies, sincere prayer, forgiveness, trust in God, and the Golden Rule shape Matthew 5–7." },
          { title: "Pray sincerely", text: "Jesus taught prayer directed to God rather than religious display, including the model Christians know as the Lord's Prayer. See Matthew 6:5–13." },
          { title: "Forgive", text: "Jesus repeatedly connected discipleship with forgiveness, reconciliation, mercy, and a refusal to make resentment the rule of life." },
          { title: "Trust God", text: "His teaching directs thought away from anxious preoccupation and toward confidence in God's care, goodness, and kingdom. See Matthew 6:25–34." },
          { title: "Let faith become action", text: "Jesus' teaching consistently joins belief with conduct: hearing his words is meant to result in doing them. See Matthew 7:24–27." },
        ],
      },
      {
        id: "prayer",
        eyebrow: "JESUS AND PRAYER",
        title: "What did Jesus teach about prayer?",
        style: "stone",
        body: [
          "Jesus taught prayer as sincere communion with God rather than a public performance. The Lord's Prayer directs thought toward God's holiness and kingdom, daily provision, forgiveness, moral responsibility, and deliverance from evil.",
          "Christian Science also reads Jesus' prayer life as inseparable from obedience and character. Prayer is expected to bear fruit in greater love, humility, purity, courage, forgiveness, and faithfulness—not remain only words.",
          "Bible reference: Matthew 6:5–13. Related source: Science and Health, pp. 1–17.",
        ],
        actions: [
          { label: "Attend a Wednesday Testimony Meeting", href: "/services/wednesday", variant: "secondary" },
        ],
      },
      {
        id: "healing",
        eyebrow: "JESUS AND HEALING",
        title: "Why are the healing works of Jesus important?",
        style: "teal-mist",
        body: [
          "The Gospels present healing as an integral part of Jesus' ministry alongside preaching and teaching. Christian Science therefore does not treat his healing works as incidental to his Christianity. They are studied as evidence of the practical spiritual authority with which he taught and lived.",
          "Mary Baker Eddy writes that Jesus established what he said by demonstration and that his acts proved his teaching. Christian Science connects those works with his understanding of God and the Christ, while rejecting explanations based on willpower, suggestion, or a merely human mind.",
          "Source: Science and Health, pp. 25–27, 473. This page explains religious teaching and does not promise a medical or physical outcome.",
        ],
        actions: [
          { label: "Hear About Prayer and Healing Experiences", href: "/services/wednesday", variant: "secondary" },
          { label: "Explore Christian Science Resources", href: "/resources", variant: "secondary" },
        ],
      },
      {
        id: "following",
        eyebrow: "CHRISTIAN DISCIPLESHIP",
        title: "What does it mean to follow Christ Jesus?",
        body: [
          "Christian Science understands following Jesus as more than admiring him or agreeing with a doctrine about him. It calls for putting his teachings into practice through love of God and neighbor, prayer, forgiveness, moral regeneration, compassion, honesty, purity, courage, and service.",
          "Mrs. Eddy emphasizes that Jesus worked for the guidance of his followers and that they must learn from his example rather than rely on admiration alone. The goal is practical Christianity: becoming more Christlike in motive, thought, and action.",
          "Source: Science and Health, pp. 25–26.",
        ],
      },
      {
        id: "sermon-on-mount",
        eyebrow: "THE SERMON ON THE MOUNT",
        title: "Why is the Sermon on the Mount important?",
        style: "stone",
        body: [
          "Matthew chapters 5 through 7 gather teachings that are foundational for Christian conduct: the Beatitudes, reconciliation, purity of heart, love for enemies, sincere prayer, forgiveness, trust in God, the Golden Rule, and the demand to live what one has heard.",
          "Christian Science values the Sermon on the Mount because it joins spirituality with practice. It points disciples toward inward transformation that becomes visible in relationships, decisions, prayer, and the way they respond to fear, conflict, injustice, and need.",
        ],
      },
      {
        id: "everyday-life",
        eyebrow: "PRACTICAL CHRISTIANITY",
        title: "How can Jesus' teachings help in everyday life?",
        body: [
          "Jesus' teachings offer a Christian framework for daily life: love God and neighbor, forgive, pray sincerely, act mercifully, seek purity of heart, resist fear, trust God, and treat others as you would want to be treated. Christian Science emphasizes practicing these teachings rather than leaving them as abstract ideals.",
          "For someone facing conflict, fear, uncertainty, resentment, or difficult choices, the first question can be practical: What would greater love, honesty, mercy, courage, prayer, and trust in God require of me now?",
        ],
        actions: [
          { label: "Plan Your Visit", href: "/visit", variant: "primary" },
          { label: "Ask a Question", href: "/contact", variant: "secondary" },
        ],
      },
      {
        id: "questions",
        eyebrow: "COMMON QUESTIONS",
        title: "Questions about Jesus Christ and Christian Science",
        faq: jesusFaq,
      },
      {
        id: "sources",
        eyebrow: "SOURCES AND FURTHER STUDY",
        title: "Where this explanation comes from",
        style: "teal-mist",
        body: [
          "This page is an original summary of Christian Science teachings, written from the framework of the Bible and Mary Baker Eddy's Science and Health with Key to the Scriptures. Key source sections include “Atonement and Eucharist” (especially pp. 18–55), “Science of Being” (pp. 330–333), and “Recapitulation” (especially pp. 472–473).",
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
