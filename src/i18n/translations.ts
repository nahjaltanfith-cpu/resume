export type Lang = "ar" | "en";

export const translations = {
  nav: {
    home: { ar: "الرئيسية", en: "Home" },
    about: { ar: "عن الجمعية", en: "About Us" },
    governance: { ar: "الحوكمة", en: "Governance" },
    beneficiaries: { ar: "المستفيدين", en: "Beneficiaries" },
    reports: { ar: "التقارير", en: "Reports" },
    projects: { ar: "المشاريع", en: "Projects" },
    contact: { ar: "تواصل معنا", en: "Contact Us" },
  },
  hero: {
    title: { ar: "جمعية دعائم", en: "Daaem Association" },
    subtitle: { ar: "للتعليم والتطوير", en: "For Education & Development" },
    description: {
      ar: "جمعية أهلية غير ربحية مرخصة من المركز الوطني لتنمية القطاع غير الربحي، تقدّم برامج تعليمية متميزة لطلاب المراحل الابتدائية والمتوسطة والثانوية بمحافظة الأحساء.",
      en: "A licensed non-profit association providing distinguished educational programs for primary, intermediate, and secondary students in Al-Ahsa Governorate.",
    },
    cta1: { ar: "تعرف علينا", en: "About Us" },
    cta2: { ar: "مشاريعنا", en: "Our Projects" },
  },
  vision: {
    title: { ar: "رؤيتنا", en: "Our Vision" },
    text: { ar: "تعليم متميز يصنع جيلاً واعياً، منتمياً، ومبدعاً.", en: "Distinguished education shaping an aware, loyal, and creative generation." },
  },
  mission: {
    title: { ar: "رسالتنا", en: "Our Mission" },
    text: {
      ar: "تقديم برامج ومشاريع تعليمية وتدريبية نوعية تُسهم في تجويد نواتج التعلّم، ورعاية المتميزين، وتعزيز قيم الانتماء والوسطية لدى طلاب التعليم العام بمحافظة الأحساء.",
      en: "Delivering quality educational and training programs that improve learning outcomes, nurture talented students, and reinforce values of belonging and moderation among general education students in Al-Ahsa.",
    },
  },
  values: {
    title: { ar: "القيم", en: "Our Values" },
    items: [
      { ar: "الإتقان", en: "Excellence" },
      { ar: "الشفافية", en: "Transparency" },
      { ar: "المسؤولية", en: "Responsibility" },
      { ar: "الانتماء", en: "Belonging" },
      { ar: "الإبداع", en: "Creativity" },
    ],
  },
  directions: {
    title: { ar: "التوجهات الاستراتيجية", en: "Strategic Directions" },
    items: [
      { ar: "تجويد نواتج التعلّم في التعليم العام", en: "Improving learning outcomes in general education" },
      { ar: "رعاية الطلبة الموهوبين والمتميزين", en: "Nurturing gifted and high-achieving students" },
      { ar: "تطوير مهارات المستقبل للطلاب والمعلمين", en: "Developing future skills for students and teachers" },
      { ar: "تعزيز قيم الوسطية والتسامح والانتماء للوطن", en: "Reinforcing values of moderation, tolerance and national belonging" },
      { ar: "بناء شراكات نوعية مع القطاع التعليمي", en: "Building quality partnerships with the education sector" },
    ],
  },
  workAreas: {
    title: { ar: "محاور العمل", en: "Work Areas" },
    items: [
      { title: { ar: "التعليم", en: "Education" }, desc: { ar: "برامج تدريبية في المناهج الرئيسية ودورات في اختبارات نافس (الرياضيات، العلوم، اللغة العربية).", en: "Training programs in core curricula and Nafis test prep (Math, Science, Arabic)." } },
      { title: { ar: "التطوير", en: "Development" }, desc: { ar: "تطوير المهارات المستقبلية للطلبة والمعلمين: الذكاء الاصطناعي، الأمن السيبراني، المهارات الشخصية، والتدريس الإبداعي.", en: "Developing future skills for students and teachers: AI, cybersecurity, soft skills, and creative teaching." } },
      { title: { ar: "تعزيز القيم", en: "Values" }, desc: { ar: "برامج ومشاريع تدريبية في تعزيز قيم الوسطية والتسامح والانتماء للوطن.", en: "Training programs and projects fostering moderation, tolerance, and national belonging." } },
      { title: { ar: "رعاية المتميزين", en: "Gifted Care" }, desc: { ar: "برامج لرعاية الطلبة الموهوبين وتعزيز مهاراتهم في الابتكار والبحث العلمي.", en: "Programs nurturing gifted students and enhancing their innovation and research skills." } },
    ],
  },
  impact: {
    title: { ar: "أثرنا بالأرقام", en: "Our Impact in Numbers" },
    subtitle: { ar: "نسعى لخدمة طلاب التعليم العام بمحافظة الأحساء عبر برامج تعليمية وتدريبية نوعية", en: "We serve general education students in Al-Ahsa through quality educational and training programs" },
    items: [
      { value: 3, label: { ar: "دورات تدريبية مُنفذة", en: "Training Courses Delivered" } },
      { value: 4, label: { ar: "محاور عمل رئيسية", en: "Core Work Areas" } },
      { value: 7, label: { ar: "أهداف استراتيجية", en: "Strategic Goals" } },
      { value: 1, label: { ar: "محافظة مستهدفة (الأحساء)", en: "Target Governorate (Al-Ahsa)" } },
    ],
  },
  projects: {
    title: { ar: "المشاريع والدورات", en: "Projects & Courses" },
    subtitle: { ar: "دورات تدريبية نوعية تستهدف طلاب التعليم العام بمحافظة الأحساء", en: "Quality training courses targeting general education students in Al-Ahsa" },
    viewAll: { ar: "عرض الكل", en: "View All" },
    sectionBadge: { ar: "دوراتنا التدريبية", en: "Our Training Courses" },
    sectionTitleStart: { ar: "برامج", en: "Quality" },
    sectionTitleHighlight: { ar: "نوعية", en: "Programs" },
    sectionTitleEnd: { ar: "لطلابنا", en: "for Our Students" },
    tagEducation: { ar: "تعليم", en: "Education" },
    tagSkill: { ar: "تطوير المهارات", en: "Skill Development" },
    tagLocation: { ar: "محافظة الأحساء", en: "Al-Ahsa" },
    courseTag: { ar: "دورة تدريبية", en: "Training Course" },
    items: [
      {
        titleAr: "مهارات التواصل الفعّال وسبل تعزيزها",
        titleEn: "Effective Communication Skills",
        descAr: "دورة تدريبية تستهدف الطلاب لتنمية قدراتهم في التواصل الفعّال داخل الصف وخارجه، وبناء الثقة في عرض الأفكار، والإصغاء النشط، والتعبير اللفظي وغير اللفظي بأسلوب يعكس شخصية متزنة وواعية.",
        descEn: "A training course empowering students with effective communication skills inside and outside the classroom — confidence in presenting ideas, active listening, and verbal & non-verbal expression that reflects a balanced, mindful personality.",
        image: "",
      },
      {
        titleAr: "أسرار تعلّم اللغة الإنجليزية",
        titleEn: "Secrets of Learning English",
        descAr: "دورة تكشف للطالب أحدث الأساليب لاكتساب اللغة الإنجليزية بثقة وسرعة، عبر مهارات الاستماع والمحادثة والقراءة والكتابة، مع تقنيات حديثة لكسر حاجز الخوف وبناء حصيلة لغوية قوية.",
        descEn: "A course revealing modern methods to acquire English with confidence and speed — covering listening, speaking, reading, and writing, with contemporary techniques to break the fear barrier and build a strong vocabulary.",
        image: "",
      },
      {
        titleAr: "إضاءة نحو التميّز الدراسي وتقنيات الحفظ والاستذكار",
        titleEn: "Toward Academic Excellence: Memory & Study Techniques",
        descAr: "دورة تُقدّم للطلاب أحدث استراتيجيات الاستذكار وتقنيات الحفظ السريع وإدارة الوقت الدراسي، لتمكينهم من الوصول إلى أعلى مستويات التميّز الأكاديمي بثقة وكفاءة.",
        descEn: "A course introducing students to the latest study strategies, fast-memorization techniques, and academic time management — empowering them to reach the highest levels of academic excellence.",
        image: "",
      },
    ],
  },
  about: {
    title: { ar: "عن جمعية دعائم", en: "About Daaem Association" },
    subtitle: { ar: "جمعية أهلية تعليمية تخدم طلاب التعليم العام بمحافظة الأحساء", en: "An educational non-profit serving general education students in Al-Ahsa" },
    whoWeAre: { ar: "من نحن", en: "Who We Are" },
    whoWeAreText: {
      ar: "جمعية دعائم جمعية أهلية غير ربحية مرخصة من المركز الوطني لتنمية القطاع غير الربحي برقم ترخيص 1000700100 وتاريخ 23/05/1446هـ، وتخضع لإشراف إداري ومالي من المركز، وإشراف فني من وزارة التعليم. تهدف الجمعية إلى تقديم برامج تعليمية متميزة لطلاب المراحل الابتدائية والمتوسطة والثانوية.",
      en: "Daaem is a non-profit association licensed by the National Center for Non-Profit Sector Development under license No. 1000700100 dated 23/05/1446 AH. It operates under the administrative and financial supervision of the Center and the technical supervision of the Ministry of Education, providing distinguished educational programs to primary, intermediate, and secondary students.",
    },
    whyNama: { ar: "لماذا دعائم؟", en: "Why Daaem?" },
    whyNamaItems: [
      { ar: "ترخيص رسمي وإشراف من جهات متخصصة", en: "Official license and specialized supervision" },
      { ar: "برامج تعليمية وتدريبية نوعية", en: "Quality educational and training programs" },
      { ar: "تركيز على رعاية المتميزين والموهوبين", en: "Focus on nurturing gifted and high-achieving students" },
      { ar: "تعزيز قيم الانتماء والوسطية", en: "Promoting values of belonging and moderation" },
    ],
    story: {
      ar: "جمعية دعائم جمعية أهلية تعليمية تأسست لتكون رافداً نوعياً لمنظومة التعليم العام بمحافظة الأحساء، عبر تقديم برامج ومشاريع تُجوّد نواتج التعلّم وتُمكّن الطلاب والمعلمين من امتلاك مهارات المستقبل.",
      en: "Daaem Association was founded as a quality contributor to the general education system in Al-Ahsa, delivering programs and projects that improve learning outcomes and equip students and teachers with future-ready skills.",
    },
    strategicDirections: {
      title: { ar: "التوجهات الاستراتيجية", en: "Strategic Directions" },
      items: [
        { ar: "تجويد نواتج التعلم", en: "Improving learning outcomes" },
        { ar: "رعاية المتميزين والموهوبين", en: "Nurturing gifted students" },
        { ar: "تطوير مهارات المستقبل", en: "Developing future skills" },
        { ar: "تعزيز قيم الوسطية والانتماء", en: "Promoting moderation and belonging" },
      ],
    },
    strategicGoals: {
      title: { ar: "الأهداف الاستراتيجية", en: "Strategic Goals" },
      items: [
        { ar: "تعزيز مشاركة المجتمع في التعليم والتعلم", en: "Enhancing community participation in education and learning" },
        { ar: "تقديم الحلول المناسبة لمشاكل التعليم والتسرب الدراسي", en: "Providing solutions to educational problems and school dropout" },
        { ar: "المساهمة في رعاية الطلاب المتميزين تعليمياً", en: "Contributing to the care of academically distinguished students" },
        { ar: "تعزيز الانتماء الوطني وقيم التسامح والاعتدال والوسطية", en: "Fostering national belonging and values of tolerance and moderation" },
        { ar: "المساهمة في تجويد نواتج التعلم وتحسين موقع النظام التعليمي عالمياً", en: "Improving learning outcomes and the global standing of the education system" },
        { ar: "دعم ضمان التعليم للجميع وتعزيز فرص التعلم مدى الحياة", en: "Supporting education for all and lifelong learning opportunities" },
        { ar: "تنفيذ المبادرات التعليمية التي تلبي احتياجات المجتمع", en: "Implementing educational initiatives that meet community needs" },
      ],
    },
    workModel: {
      title: { ar: "نموذج العمل", en: "Work Model" },
      beneficiaries: [
        { name: { ar: "طلاب التعليم العام", en: "General Education Students" }, service: { ar: "دورات وبرامج تدريبية تعليمية", en: "Educational training courses & programs" } },
        { name: { ar: "المعلمون", en: "Teachers" }, service: { ar: "برامج لتطوير مهارات التدريس", en: "Programs developing teaching skills" } },
        { name: { ar: "الطلبة الموهوبون", en: "Gifted Students" }, service: { ar: "رعاية وتنمية الابتكار والبحث", en: "Nurturing innovation and research" } },
        { name: { ar: "المجتمع المحلي", en: "Local Community" }, service: { ar: "مبادرات تعليمية مجتمعية", en: "Community educational initiatives" } },
      ],
    },
    executiveCommittee: {
      title: { ar: "اللجنة التنفيذية", en: "Executive Committee" },
      desc: {
        ar: "تنفّذ قرارات مجلس الإدارة وفق الصلاحيات المخوّلة لها، وتُشرف مباشرة على البرامج والمشاريع التعليمية للجمعية.",
        en: "Executes Board decisions within delegated authorities and directly supervises the association's educational programs and projects.",
      },
    },
  },
  associationGoals: {
    title: { ar: "أهداف الجمعية", en: "Association Goals" },
    intro: {
      ar: "تهدف الجمعية إلى تحقيق الغرض الذي أُنشئت من أجله، وذلك بتحقيق الأهداف التالية:",
      en: "The association aims to fulfill its founding purpose by achieving the following goals:",
    },
    items: [
      { ar: "تعزيز مشاركة المجتمع في التعليم والتعلم", en: "Enhancing community participation in education and learning" },
      { ar: "تقديم الحلول المناسبة لمشاكل التعليم والتسرب الدراسي", en: "Providing solutions for educational problems and school dropout" },
      { ar: "المساهمة في رعاية الطلاب المتميزين تعليمياً", en: "Contributing to the care of academically distinguished students" },
      { ar: "تعزيز الانتماء الوطني وقيم التسامح والاعتدال والوسطية", en: "Fostering national belonging and values of tolerance and moderation" },
      { ar: "المساهمة في تجويد نواتج التعلم وتحسين موقع النظام التعليمي عالمياً", en: "Improving learning outcomes and the global standing of the education system" },
      { ar: "دعم ضمان التعليم للجميع وتعزيز فرص التعلم مدى الحياة", en: "Supporting inclusive education and lifelong learning opportunities" },
      { ar: "تنفيذ المبادرات التعليمية التي تلبي احتياجات المجتمع", en: "Implementing educational initiatives that meet community needs" },
    ],
  },
  boardOfDirectors: {
    title: { ar: "مجلس الإدارة", en: "Board of Directors" },
    members: [
      { name: { ar: "رئيس مجلس الإدارة", en: "Chairman of the Board" }, role: { ar: "رئيس مجلس الإدارة", en: "Chairman" }, title: { ar: "", en: "" } },
      { name: { ar: "نائب رئيس مجلس الإدارة", en: "Vice Chairman" }, role: { ar: "نائب رئيس مجلس الإدارة", en: "Vice Chairman" }, title: { ar: "", en: "" } },
      { name: { ar: "عضو مجلس الإدارة", en: "Board Member" }, role: { ar: "عضو", en: "Member" }, title: { ar: "", en: "" } },
      { name: { ar: "عضو مجلس الإدارة", en: "Board Member" }, role: { ar: "عضو", en: "Member" }, title: { ar: "", en: "" } },
      { name: { ar: "عضو مجلس الإدارة", en: "Board Member" }, role: { ar: "عضو", en: "Member" }, title: { ar: "", en: "" } },
    ],
  },
  associationMembers: {
    title: { ar: "أعضاء الجمعية", en: "Association Members" },
    members: [
      { ar: "حسب ما تحدده اللائحة الأساسية للجمعية", en: "As determined by the association's bylaws" },
    ],
  },
  associationInfo: {
    title: { ar: "بيانات الجمعية", en: "Association Information" },
    name: { ar: "جمعية دعائم", en: "Daaem Association" },
    location: { ar: "الهفوف، محافظة الأحساء، المنطقة الشرقية", en: "Hofuf, Al-Ahsa Governorate, Eastern Province" },
    scope: { ar: "حسب ما تحدده اللائحة الأساسية", en: "As determined by the bylaws" },
    certificate: {
      ar: "صدرت هذه الشهادة بموجب الترخيص رقم 1000700100 وتاريخ 23/05/1446هـ بناءً على نظام الجمعيات والمؤسسات الأهلية الصادر بالمرسوم الملكي رقم م/٨ وتاريخ ١٩/٢/١٤٣٧هـ. يسري العمل بهذه الشهادة حتى تاريخ 24/11/2028م.",
      en: "Issued under license No. 1000700100 dated 23/05/1446 AH, pursuant to the Associations and Civil Institutions Law (Royal Decree M/8 dated 19/2/1437 AH). Valid until 24/11/2028.",
    },
  },
  board: {
    title: { ar: "مجلس الإدارة", en: "Board of Directors" },
    members: [
      { name: { ar: "رئيس مجلس الإدارة", en: "Chairman" }, role: { ar: "الرئيس", en: "Chairman" } },
      { name: { ar: "نائب رئيس مجلس الإدارة", en: "Vice Chairman" }, role: { ar: "نائب الرئيس", en: "Vice Chairman" } },
      { name: { ar: "عضو مجلس إدارة", en: "Board Member" }, role: { ar: "عضو", en: "Member" } },
      { name: { ar: "عضو مجلس إدارة", en: "Board Member" }, role: { ar: "عضو", en: "Member" } },
      { name: { ar: "عضو مجلس إدارة", en: "Board Member" }, role: { ar: "عضو", en: "Member" } },
    ],
  },
  team: {
    title: { ar: "فريق العمل", en: "Our Team" },
    members: [
      { name: { ar: "المدير التنفيذي", en: "Executive Director" }, role: { ar: "الإدارة التنفيذية", en: "Executive Management" } },
      { name: { ar: "إدارة المشاريع", en: "Projects Department" }, role: { ar: "التعليم والتطوير وتعزيز القيم والدعم الأكاديمي", en: "Education, Development, Values & Academic Support" } },
      { name: { ar: "إدارة الاتصال والتسويق", en: "Communications & Marketing" }, role: { ar: "الاتصال والشراكات والإعلام وتنمية الموارد", en: "Communications, Partnerships, Media & Resources" } },
      { name: { ar: "إدارة الشؤون الإدارية والمالية", en: "Administrative & Financial Affairs" }, role: { ar: "الموارد البشرية والشؤون المالية والخدمات والتقنية", en: "HR, Finance, Support Services & IT" } },
    ],
  },
  partnerships: {
    title: { ar: "شراكاتنا", en: "Our Partnerships" },
    subtitle: { ar: "نؤمن بأن الشراكة هي أساس النجاح في تحقيق أهدافنا التعليمية", en: "Partnership is the foundation of our educational success" },
    types: [
      { title: { ar: "وزارة التعليم", en: "Ministry of Education" }, desc: { ar: "إشراف فني وتعاون مباشر مع إدارة تعليم الأحساء", en: "Technical supervision and direct cooperation with Al-Ahsa Education Department" } },
      { title: { ar: "المركز الوطني لتنمية القطاع غير الربحي", en: "National Center for NPO Development" }, desc: { ar: "إشراف إداري ومالي على عمل الجمعية", en: "Administrative and financial supervision of the association" } },
      { title: { ar: "شراكات مجتمعية", en: "Community Partnerships" }, desc: { ar: "العمل مع المؤسسات والجمعيات بمحافظة الأحساء", en: "Working with institutions and associations in Al-Ahsa" } },
      { title: { ar: "شراكات أكاديمية", en: "Academic Partnerships" }, desc: { ar: "التعاون مع الجامعات ومراكز التدريب لتطوير البرامج", en: "Cooperating with universities and training centers to develop programs" } },
    ],
  },
  contact: {
    title: { ar: "تواصل معنا", en: "Contact Us" },
    subtitle: { ar: "نسعد بتواصلكم ونرحب باستفساراتكم ومقترحاتكم", en: "We welcome your inquiries and suggestions" },
    name: { ar: "الاسم", en: "Name" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    subject: { ar: "الموضوع", en: "Subject" },
    message: { ar: "الرسالة", en: "Message" },
    send: { ar: "إرسال الرسالة", en: "Send Message" },
    info: { ar: "معلومات التواصل", en: "Contact Information" },
  },
  footer: {
    description: {
      ar: "جمعية دعائم - جمعية أهلية تعليمية مرخصة، تخدم طلاب التعليم العام بمحافظة الأحساء عبر برامج ومشاريع نوعية.",
      en: "Daaem - A licensed educational non-profit serving general education students in Al-Ahsa through quality programs and projects.",
    },
    quickLinks: { ar: "روابط سريعة", en: "Quick Links" },
    contactInfo: { ar: "معلومات التواصل", en: "Contact Info" },
    email: { ar: "daaemedu@gmail.com", en: "daaemedu@gmail.com" },
    phone: { ar: "0538807776", en: "0538807776" },
    rights: { ar: "جميع الحقوق محفوظة", en: "All Rights Reserved" },
  },
};
