import type { Lesson } from '../types'

const S = 'D11_ComputingImpact'
const p = (...pages: number[]) => pages.map((page) => ({ src: S, page }))

export const lesson: Lesson = {
  deck: 'D11',
  title: 'Impacts and Trends of Computing Technology',
  summary:
    'A conceptual deck: how computing changes learning, work, privacy, ethics and law, and what AI adds. The UTS tests it as multi-correct statements (tick the true ones) and short essays, so exact definitions and law numbers matter.',
  minutes: 40,
  goals: [
    'Tell the online-violence terms apart (cyberbullying, grooming, trolling, doxxing, cyberviolence) and say how to avoid addiction.',
    'State the privacy and identity-theft facts the slides give, and name Law No. 27/2022 (PDP) correctly.',
    'Separate norms/ethics from regulations, and list the netiquette rules (including "don\'t assume you are anonymous").',
    'Recall the ITE Law numbers and what Articles 27(3), 28 and 45 say, without mixing them up with the PDP Law.',
    'Match the four AI approaches to their definitions, and explain generative AI, its dangers and agentic AI.',
  ],
  examAngle:
    'Part I of the UTS is a block of ten "tick all that apply" statements (marks are lost for wrong ticks), and D11 supplies a good share of them: definitions with one word swapped, law numbers, and "which is a negative/positive impact". Older papers also asked short essays (green computing, privacy threats and personal protection, netiquette, ethical use of AI, what to do about piracy or someone else\'s open account). Learn the slide wording; the traps are swapped terms and swapped numbers.',
  sections: [
    {
      id: 'digital-world',
      title: 'The digital world and daily life',
      blocks: [
        {
          t: 'text',
          md: 'Computing has changed *how we live*. PCs and laptops are no longer only office equipment but also entertainment devices. **Cyberspace** (the Internet) is a new world that anyone can enter, "unconstrained by time or space", and it is **human beings** who step into it.',
          refs: p(3),
        },
        {
          t: 'text',
          md: 'It is also a source of **lifelong learning**: materials are readily available; references (encyclopedias, dictionaries, atlases, medical references) are digital via the Internet, smartphone apps and CD/DVDs; blogs, forums and websites enable **distance learning**; **edutainment** *combines* education with entertainment.',
          refs: p(4),
        },
        {
          t: 'text',
          md: 'At work, computing brings **efficiency**, **automation** (which opens new jobs), unlocks creativity (AI), and **globalization** (a worldwide workforce and global markets). The flip side: jobs replaceable by machines are threatened. In daily life the slides list shopping and delivery, entertainment (movies, games, streaming) and transport booking, with threats of **addiction and violence, identity theft and threats to privacy**.',
          refs: p(5, 8),
        },
        {
          t: 'key',
          md: 'Positive: efficiency, automation, new jobs, creativity, globalization, edutainment, distance learning. Negative: job loss to machines, addiction, violence, identity theft, privacy loss. Edutainment **combines** (never separates) education and entertainment.',
        },
        {
          t: 'quiz',
          q: 'Which statements about the digital world are correct? (tick all that apply)',
          options: [
            'Edutainment combines education with entertainment.',
            'Cyberspace is entered by machines and bots, not by humans.',
            'The Internet supports distance learning through blogs, forums and websites.',
            'Computing technology only changed office work, not how we live.',
          ],
          correct: [0, 2],
          why: [
            'Right: slide 4.',
            'Wrong: slide 3 says it is human beings who step into this virtual world.',
            'Right: slide 4.',
            'Wrong: slide 3 says advances in computing changed how we live.',
          ],
        },
        { t: 'question', id: 'uts25-i-01', note: 'UTS 2025 Part I no. 1 on this topic.' },
      ],
    },
    {
      id: 'violence-addiction',
      title: 'Online violence and addiction',
      blocks: [
        {
          t: 'text',
          md: 'Slides 11 and 12 define the terms the exam likes to swap. Learn each one with its key word.',
          refs: p(11, 12),
        },
        {
          t: 'text',
          md: '| Term | Slide definition (key idea) |\n|---|---|\n| **Cyberbullying** | verbal or psychological abuse through digital platforms (social media, instant messaging, forums) |\n| **Grooming** | a predator builds a relationship with a young or vulnerable person via technology, for exploitation or abuse |\n| **Trolling, cyberstalking, doxxing** | listed together on slide 11 |\n| **Visual violence / extreme content** | distribution of violent videos, extremism, radical propaganda |\n| **Cyberviolence** | use of computer systems to cause, facilitate or threaten violence against individuals, resulting in (or likely to result in) physical, sexual, psychological or economic harm |',
          refs: p(11, 12),
        },
        {
          t: 'trap',
          md: '**Doxxing is not trolling.** Trolling = posting inflammatory, off-topic or false content to provoke an emotional response. Doxxing = exposing and spreading someone\'s private information. UTS 2025 swapped exactly these two.',
        },
        {
          t: 'text',
          md: '**Internet addiction** = excessive use that interferes with social life, work and education. The slide cites up to 31.4% of Indonesian adolescents (2021 data); consequences include declining interest in learning, behavioural changes, emotional instability, hallucinations, even severe mental disorders. **Gaming** can help (less stress, concentration, creativity, decision-making, even income); **gaming addiction** interferes with daily activities, work and relationships. APJII 2023: 42.23% of online gamers play more than 4 hours a day.',
          refs: p(13, 14),
        },
        {
          t: 'key',
          md: 'Avoiding addiction and violence (slide 15): hobbies unrelated to the internet and social activities; physical activity; socialise in the real world; discuss problems **in person**; talk to parents, a teacher or a doctor and **do not search for all the answers alone online**; limit screen time; delete unnecessary apps; use filtering software (especially for children).',
        },
        {
          t: 'quiz',
          q: 'Which of these terms are defined correctly? (tick all that apply)',
          options: [
            'Cyberbullying: verbal or psychological abuse via social media, messaging or forums.',
            'Grooming: a predator builds a relationship with a vulnerable person via technology to exploit or abuse them.',
            'Doxxing: posting inflammatory or off-topic content to provoke emotional responses.',
            'Cyberviolence: using computer systems to cause, facilitate or threaten violence that causes physical, sexual, psychological or economic harm.',
          ],
          correct: [0, 1, 3],
          why: [
            'Right (slide 11).',
            'Right (slide 11).',
            'Wrong: that is trolling; doxxing exposes private information.',
            'Right (slide 12, Council of Europe wording).',
          ],
        },
        { t: 'question', id: 'uts25-i-03', note: 'Which actions prevent addiction and violence (slide 15).' },
        { t: 'question', id: 'uts25-i-04', note: 'The real UTS 2025 item on the terms above.' },
      ],
    },
    {
      id: 'identity-privacy',
      title: 'Identity theft, privacy and the PDP Law',
      blocks: [
        {
          t: 'text',
          md: '**Identity theft** is a substantial criminal industry. It can happen through carelessness online or a simple miscalculation. Consequences: large unauthorised phone or internet bills, threats from strangers, your social media used to spread slander or threats (even arrest), and fixing it can take years.',
          refs: p(17),
        },
        {
          t: 'key',
          md: 'Protecting yourself (slide 18): pay online with a reputable credit card or e-payment, a **separate card for online transactions**; check bills promptly; make sure a **secure website** handles the transaction; do not disclose personal information by phone or chat; handle email and social media with care; shred sensitive mail; copy your cards; **report identity theft promptly**.',
        },
        {
          t: 'text',
          md: '**Threats to privacy** (slide 19): personal data placed online is stored in a **server database** and spreads easily; e-commerce companies may use it (for example advertising); employees can be strictly monitored at work; **surveillance cameras** in public spaces; IT enables **wiretapping** of individuals, organisations or whole nations.\n\n**Your privacy rights** (slide 20): do not readily share your KTP number, driver\'s licence, phone, email, bank account or other sensitive data (yours or someone else\'s); do not readily consent to sharing; **THINK before you POST**; use technology to protect your rights; correct damaging information about you.',
          refs: p(19, 20),
        },
        {
          t: 'trap',
          md: 'Security features are **protections**, not threats. Two-factor authentication protects an account; it is not a privacy threat (UTS 2025 no. 6 used it as the wrong option).',
        },
        {
          t: 'key',
          md: 'Indonesian law on personal data: **Law No. 27 of 2022 concerning Personal Data Protection** (UU PDP). Slide 21 shows **Article 1** (definitions: *Data Pribadi*, *Pelindungan Data Pribadi*) and **Article 65(1)-(3)**: it is forbidden, unlawfully, to (1) obtain or collect personal data that is not yours to benefit yourself or others, (2) **disclose** personal data not yours, (3) **use** personal data not yours.',
        },
        { t: 'slide', ref: { src: S, page: 21 }, caption: 'Slide 21: PDP Law, Articles 1 and 65 (in Indonesian).' },
        {
          t: 'quiz',
          q: 'Which of these threaten privacy? (tick all that apply)',
          options: [
            'Personal data stored in a company server database and used for advertising.',
            'CCTV and monitoring of employees at work.',
            'Two-factor authentication on a social media account.',
            'Wiretapping of communications made possible by IT.',
          ],
          correct: [0, 1, 3],
          why: [
            'Threat (slide 19).',
            'Threat (slide 19).',
            'A protection, not a threat.',
            'Threat (slide 19).',
          ],
        },
        { t: 'question', id: 'uts25-i-06', note: 'The actual UTS 2025 privacy item.' },
        { t: 'question', id: 'k21-s3a', note: 'Essay form (UTS 2021): two privacy threats and a personal action for each.' },
      ],
    },
    {
      id: 'ethics-netiquette',
      title: 'Norms, ethics, regulations and netiquette',
      blocks: [
        {
          t: 'text',
          md: '**Norms and ethics** relate to morality and act as "guidelines"; your conscience plays a role, and violating them should bring a sense of **shame**. **Rules and regulations** are operational: they explicitly state requirements, regulations, penalties and sanctions, and violating them brings **punishment**. Rules exist to make communal life comfortable, not to create difficulties.',
          refs: p(24),
        },
        {
          t: 'key',
          md: 'Norms/ethics = moral guidelines, shame. Regulations = explicit rules with sanctions, punishment. They are **not the same thing**.',
        },
        {
          t: 'text',
          md: '**Computer ethics** (slide 25): know the rules and the law; don\'t assume it\'s okay if it\'s legal; think scenarios; when in doubt, talk it out; make yourself proud; remember the golden rule; take the long view; do your part.\n\n**Netiquette and messaging etiquette** (slide 26): say what you mean, say it with care; keep it short; proofread; **don\'t assume you are anonymous**; learn the "nonverbal" language of the Net; know your abbreviations; keep your cool; don\'t be a source of spam; say no, and say nothing, to spam.',
          refs: p(25, 26),
        },
        {
          t: 'trap',
          md: '"Assume you are anonymous" is the reverse of the rule. "We can do anything online as long as we are anonymous" is false (UTS 2025 no. 5d, mock FTI no. 1).',
        },
        {
          t: 'quiz',
          q: 'Which statements are correct? (tick all that apply)',
          options: [
            'In computer ethics we are expected to understand the law well.',
            'Norms and ethics are essentially the same as regulations.',
            'Online communication can differ from face-to-face communication, so messaging etiquette must be learned.',
            'You can do anything online as long as you are anonymous.',
          ],
          correct: [0, 2],
          why: [
            'Right: "Know the rules and the law" (slide 25).',
            'Wrong: ethics are moral guidelines; regulations carry sanctions (slide 24).',
            'Right: "learn the nonverbal language of the Net" (slide 26).',
            'Wrong: "Don\'t assume you are anonymous" (slide 26).',
          ],
        },
        { t: 'question', id: 'uts25-i-05', note: 'The actual UTS 2025 item.' },
        { t: 'question', id: 'k19-s1b-2', note: 'Essay form (UTS 2019): define netiquette, say why it matters, give an example.' },
      ],
    },
    {
      id: 'ite-law',
      title: 'Freedom, social media and the ITE Law',
      blocks: [
        {
          t: 'text',
          md: 'The Internet gives freedom to speak and express opinions, which can be abused. We remain responsible for whatever we think, say or write, online or offline. The government regulates this with the **ITE Law**.',
          refs: p(27),
        },
        {
          t: 'key',
          md: '**ITE** (Information and Electronic Transactions) = **Law No. 11 of 2008**.\n- **Law No. 19 of 2016**: amendment to Law 11/2008.\n- **Law No. 1 of 2024**: the *second* amendment to Law 11/2008.\n- **Law No. 27 of 2022** is a different law: Personal Data Protection (PDP).',
        },
        {
          t: 'text',
          md: 'Social media (WhatsApp, Instagram, Facebook, X ...) connect people without space or time limits. Use group features instead of broadcasting information meant for specific people; think before you hit "send"; do not share content involving **SARA** (ethnicity, religion, race, societal groups), pornography, illegal material or anything that could cause public unrest (an ITB student was once suspended for SARA content); limit personal information in public.',
          refs: p(28, 29),
        },
        {
          t: 'text',
          md: 'The articles shown on slide 30 (paraphrased; the slide has the Indonesian text):\n\n| Article | What it forbids / says |\n|---|---|\n| **27(3)** | intentionally and without right distributing, transmitting or making accessible electronic information/documents with **insulting and/or defamatory** content |\n| **28(1)** | intentionally and without right spreading **false and misleading news** that causes **consumer loss** in electronic transactions |\n| **28(2)** | spreading information meant to cause **hatred or hostility** toward individuals/groups based on **SARA** |\n| **45(1)** | violating 27(1), (2), (3) or (4): imprisonment **up to 6 years** and/or a fine **up to Rp1,000,000,000** |\n| **45(2)** | violating 28(1) or (2): likewise up to 6 years and/or up to Rp1 billion |',
          refs: p(30),
        },
        { t: 'slide', ref: { src: S, page: 30 }, caption: 'Slide 30: the articles as the exam shows them.' },
        {
          t: 'trap',
          md: 'Do not attribute Article 65 (disclosing someone else\'s personal data) to the ITE Law: Article 65 is in the **PDP Law (No. 27/2022)**. And do not mix the years: ITE = 2008, PDP = 2022. Slide 28(1) is about *consumer loss*, 28(2) about *SARA hatred*.',
        },
        {
          t: 'quiz',
          q: 'Which statements are true about the ITE Law as the slides present it? (tick all that apply)',
          options: [
            'It is Law No. 11 of 2008.',
            'It is Law No. 27 of 2022.',
            'Article 27(3) concerns insult and/or defamation.',
            'Article 28(2) concerns spreading hatred or hostility based on SARA.',
            'Article 45(1) gives a maximum of 6 years imprisonment and/or a fine of up to Rp1 billion for violating Article 27.',
          ],
          correct: [0, 2, 3, 4],
          why: [
            'Right (slide 27).',
            'Wrong: 27/2022 is the Personal Data Protection law.',
            'Right (slide 30).',
            'Right (slide 30).',
            'Right (slide 30).',
          ],
        },
        { t: 'question', id: 'uts25-i-07', note: 'UTS 2025 Part I no. 7 (ITE vs PDP).' },
        { t: 'question', id: 'imp-i-33-1', note: 'Practice item on Article 28.' },
      ],
    },
    {
      id: 'work-automation',
      title: 'Work: automation, globalization, outsourcing',
      blocks: [
        {
          t: 'text',
          md: 'Many jobs have been transformed by digital technology: entertainment, publishing, medicine, airlines, science (slide 31).\n\n**The automated factory** (slide 32): robots do specific manual tasks (painting, welding, repetitive assembly); computers track inventory, time the delivery of parts, control quality, monitor wear and tear and schedule maintenance. Automation reduces idle time and **reduces waste** in facilities, raw materials and labour.\n\n**The automated office** (slide 33): as factory jobs decline, office work matters more, and modern offices have been transformed by digital technology.',
          refs: p(31, 32, 33),
        },
        {
          t: 'text',
          md: 'Slide 34: analysts once predicted massive unemployment; others predicted countless new jobs. Today people are used to computers at work, and **job automation remains an important issue** for millions of workers. The job market is also **global**: competitors come from abroad too, and remote work makes **outsourcing** possible without physical presence.',
          refs: p(34, 35),
        },
        {
          t: 'trap',
          md: 'An effect counts as a "computing impact" only if computing causes it. Hiring skilled experts or buying better materials improves a factory but is not an impact of computing (UTS 2025 no. 8, options b and d).',
        },
        {
          t: 'quiz',
          q: 'Which are impacts of computing technology in the workplace? (tick all that apply)',
          options: [
            'Automation can displace work once done physically by people.',
            'A factory buys higher-quality raw materials.',
            'Workers abroad can be outsourced to work remotely over the Internet.',
            'Computers schedule machine maintenance and monitor wear and tear.',
          ],
          correct: [0, 2, 3],
          why: [
            'Yes (slides 5, 34).',
            'Not caused by computing.',
            'Yes: globalization and outsourcing (slides 5, 34).',
            'Yes (slide 32).',
          ],
        },
        { t: 'question', id: 'uts25-i-08', note: 'The actual UTS 2025 item.' },
      ],
    },
    {
      id: 'ai',
      title: 'Artificial intelligence and generative AI',
      blocks: [
        {
          t: 'text',
          md: '**8 definitions, 4 approaches** (slide 39, from Russell & Norvig). Each approach has two definitions:\n\n| | Humanly | Rationally |\n|---|---|---|\n| **Thinking** | making computers think, "machines with minds" (Haugeland, 1985); automating activities we associate with human thinking: decisions, problem solving, learning (Bellman, 1978) | the study of mental faculties through computational models (Charniak & McDermott, 1985); **the study of the computations that make it possible to perceive, reason and act** (Winston, 1992) |\n| **Acting** | the art of creating machines that perform functions requiring intelligence when done by people (Kurzweil, 1990); **the study of how to make computers do things at which, at the moment, people are better** (Rich & Knight, 1991) | computational intelligence is the study of the design of intelligent agents (Poole et al., 1998); AI is concerned with intelligent behavior in artifacts (Nilsson, 1998) |',
          refs: p(39),
        },
        { t: 'slide', ref: { src: S, page: 39 }, caption: 'Slide 39: the table to learn (exam options swap the labels).' },
        {
          t: 'quiz',
          q: 'Which definitions are matched to the correct approach? (tick all that apply)',
          options: [
            'Thinking humanly: the study of the computations that make it possible to perceive, reason, and act.',
            'Thinking rationally: the study of the computations that make it possible to perceive, reason, and act.',
            'Acting rationally: the study of how to make computers do things at which people are better.',
            'Acting humanly: the study of how to make computers do things at which people are better.',
          ],
          correct: [1, 3],
          why: [
            'Wrong: this is Winston\'s thinking rationally.',
            'Right.',
            'Wrong: this is Rich & Knight\'s acting humanly.',
            'Right.',
          ],
        },
        {
          t: 'text',
          md: '**History** (slide 40): 1950 Turing test; 1955 the term "artificial intelligence" coined; 1965 ELIZA; 1980s expert systems (Feigenbaum); 1997 Deep Blue beats Kasparov; 2002 Roomba; 2009 Google self-driving car; 2011 Watson wins Jeopardy!; 2011-2014 voice assistants (Siri, Google Now, Cortana); 2014 GAN (Goodfellow); 2016 AlphaGo beats Lee Sedol 4-1.\n\n**AI in life** (slides 42-54): assistants, biometric verification (fingerprint, face), game AI (Dota 2, AlphaStar for StarCraft II), face transformation, recommender systems, traffic (path finding, traffic patterns), fraud detection, self-driving cars, Amazon\'s Proteus autonomous warehouse robot, healthcare, manufacturing, education.',
          refs: p(40, 42, 51),
        },
        {
          t: 'text',
          md: '**Generative AI** (slide 56) is a subset of AI that uses generative models to produce text, images, video or other data, usually in response to prompts; it learns the patterns and structure of its training data to create new data. Examples: text (GPT-3/4/4o, LaMDA, LLaMA, BLOOM, Gemini, Claude), code (GitHub Copilot, CodeT5, OpenAI Codex), image (Imagen, DALL-E 3, Midjourney, Adobe Firefly, FLUX.1), audio and music (MusicLM, MusicGen).\n\n**Agentic AI** (slide 60, "2026 onward"): autonomous systems that do not just generate text but independently perceive their environment, **plan multi-step workflows, use tools or APIs, execute actions and reflect on results**.',
          refs: p(56, 60),
        },
        {
          t: 'key',
          md: 'AI dangers (slide 58), seven of them: **bias and inaccuracies**; **privacy concerns**; **loss of human judgment**; **deepfakes and manipulation**; **loss of human control**; **employment disruption**; **existential and long-term risks** (AGI misaligned with human interests). Positive uses: warehouse robots, route finding, fraud detection, healthcare.',
        },
        {
          t: 'quiz',
          q: 'Which are generative AI tools? (tick all that apply)',
          options: ['GPT-4', 'Scratch', 'GitHub Copilot', 'Midjourney'],
          correct: [0, 2, 3],
          why: [
            'Text generative model (slide 56).',
            'A visual programming environment, not generative AI.',
            'Code generation (slide 56).',
            'Image generation (slide 56).',
          ],
        },
        { t: 'question', id: 'uts25-i-09', note: 'UTS 2025 Part I no. 9 on the AI definition table.' },
        { t: 'question', id: 'uts25-i-10', note: 'Positive versus negative impacts of AI.' },
        { t: 'question', id: 'ku23-s3a', note: 'Essay form (UTS 2023): the ethical limits of using ChatGPT as a student.' },
      ],
    },
    {
      id: 'essay-extras',
      title: 'Essay topics beyond the slides',
      blocks: [
        {
          t: 'text',
          md: 'Past essay questions (UTS 2018-2023) asked topics that D11\'s slides only touch on. They are marked by the quality of your reasoning, so have a structure ready: **state your position, give a reason, offer a realistic alternative**. These points are exam-answer material from the bank, not slide facts.',
        },
        {
          t: 'text',
          md: '- **Green computing**: using computing resources efficiently and in an environmentally friendly way (design, production, use, disposal) to cut energy use and e-waste. Student habits: sleep or switch off devices, power-saving mode, repair and recycle, print less.\n- **Software piracy** (cheap cracked copy of expensive software): refuse. It infringes copyright, harms developers and risks malware. Alternatives: scheduled lab time, student licences or trials, open-source equivalents.\n- **Someone else\'s account left logged in**: do not use or change it, even if the owner is a bully or spreads hoaxes. Log out and inform the owner or the assistant; unauthorised access is unethical and illegal under the ITE Law; report the owner\'s behaviour through official channels with evidence.\n- **A data-security threat on social media**: e.g. phishing or account takeover; prevent with strong unique passwords, two-factor authentication, privacy settings and not clicking suspicious links.\n- **Avoiding game addiction**: give at least three concrete tips (time limits, replacement activities, support from family or a professional).',
        },
        {
          t: 'quiz',
          q: 'Which answers show the ethical stance expected in the UTS essays? (tick all that apply)',
          options: [
            'Refuse the cracked software and use the lab schedule, a student licence or an open-source alternative.',
            'Use the stranger\'s open account to delete a bully\'s posts, since everyone will thank you.',
            'Log out of the open account and tell the owner or the assistant.',
            'Copy ChatGPT\'s answer and submit it as your own work.',
          ],
          correct: [0, 2],
          why: [
            'Yes: refuse, give the reason, offer a legal alternative.',
            'No: unauthorised access is unlawful; someone else\'s wrongdoing does not justify yours.',
            'Yes: it secures the account without misusing it.',
            'No: that is plagiarism and academic dishonesty.',
          ],
        },
        { t: 'question', id: 'k21-s1a', note: 'Essay (UTS 2021): define green computing and give two applications.' },
        { t: 'question', id: 'k18-s1b', note: 'Essay (UTS 2018): software piracy.' },
      ],
    },
    {
      id: 'drill',
      title: 'Exam drill and summary',
      blocks: [
        {
          t: 'text',
          md: '| Theme | Facts the exam checks |\n|---|---|\n| Learning | inexhaustible, accessible; distance learning; edutainment = combine |\n| Violence terms | cyberbullying (abuse), grooming (predator), trolling (provoke), doxxing (expose private data), cyberviolence (harm: physical, sexual, psychological, economic) |\n| Addiction | limit time, real-world activity, talk to parents/teacher/doctor |\n| Privacy | server database, employee monitoring, CCTV, wiretapping; 2FA is protection |\n| PDP Law | **No. 27/2022**; Article 65: obtain / disclose / use others\' data |\n| Norms vs rules | ethics = shame; regulations = sanctions |\n| Netiquette | don\'t assume you are anonymous |\n| ITE Law | **No. 11/2008**; amended by 19/2016 and 1/2024; 27(3) defamation; 28(2) SARA; 45(1) up to 6 years / Rp1 billion |\n| Work | automation, globalization, outsourcing, job threat |\n| AI | 8 definitions, 4 approaches; 1950 Turing, 1997 Deep Blue, 2016 AlphaGo; generative vs agentic |',
        },
        {
          t: 'trap',
          md: 'The five classic swaps:\n1. **doxxing** vs **trolling**;\n2. **PDP (27/2022)** vs **ITE (11/2008)**, and Article 65 vs Articles 27/28/45;\n3. **thinking rationally** vs **acting humanly** definitions;\n4. "anonymous" in netiquette;\n5. protections (2FA) listed as threats, or non-computing causes listed as computing impacts.\n\nAlso: in Part I a wrong tick costs a correct one, so leave a statement blank if you truly do not know.',
        },
        {
          t: 'quiz',
          q: 'Which of these pairings are correct? (tick all that apply)',
          options: [
            'Law No. 11/2008: ITE Law.',
            'Law No. 27/2022: ITE Law.',
            'Article 65: forbids unlawfully disclosing personal data that is not yours (PDP Law).',
            'Article 27(3): insult and/or defamation (ITE Law).',
            '2024 amendment: Law No. 19 of 2016.',
          ],
          correct: [0, 2, 3],
          why: [
            'Right.',
            'Wrong: that is the PDP law.',
            'Right (slide 21).',
            'Right (slide 30).',
            'Wrong: Law No. 19/2016 is the first amendment; the second is Law No. 1/2024.',
          ],
        },
        { t: 'question', id: 'uts25-i-02', note: 'Negative uses of computing in academic life (UTS 2025 no. 2).' },
        { t: 'question', id: 'imp-i-47-1', note: 'Practice item on the dangers of AI.' },
      ],
    },
  ],
}
