/**
 * Professor Stand-In — Complete Integrated Front End
 * Grounded in Sir Muhammad Saleem / Dr. Ahmed OOP Interview Dataset
 */

(function() {
  'use strict';


  // ==========================================
  // MODULE: frontend/js/config.js
  // ==========================================
/**
 * Configuration & Professor Identity Configuration
 * Rule: Never hardcode Dr. Ahmed; read from backend or this single config.
 */

const CONFIG = {
  // Base URL defaults to window origin or localhost:8000
  API_BASE_URL: window.location.port === "8000" || window.location.port === "" 
    ? window.location.origin 
    : "http://localhost:8000",
  
  // Default Professor & Institution Metadata (dynamically updated from backend)
  PROFESSOR: {
    name: "Sir Muhammad Saleem",
    title: "University Professor & Academic Mentor",
    shortName: "Dr. Ahmed / Sir M. Saleem",
    initials: "DA", // Matches the "DA" circle in Canva wireframes
    subject: "Object-Oriented Programming (OOP) / Java",
    institution: "Dawood University of Engineering & Technology",
    department: "Department of Computer Science",
    office: "CS Faculty Block, Office 204",
    officeHours: "Monday & Wednesday, 2:00 PM – 4:00 PM",
    portalSubmissionRule: "Thursday at 11:59 PM via university portal",
    verifiedDatasetSize: 30,
  },

  // UI Settings & Taglines
  TAGLINES: [
    "Your professor, when you need guidance.",
    "Ask. Learn. Understand."
  ],

  // Storage Keys
  STORAGE_KEYS: {
    THEME: "psi_theme",
    HISTORY: "psi_chat_history",
    STUDENT_PROFILE: "psi_student_profile",
    NOTIFICATIONS: "psi_notifications",
    LANGUAGE: "psi_language"
  }
};

/**
 * Updates the professor configuration dynamically from backend /api/records
 */
function updateProfessorConfigFromBackend(datasetMeta) {
  if (!datasetMeta) return;

  if (datasetMeta.role) {
    CONFIG.PROFESSOR.name = datasetMeta.role;
    const words = datasetMeta.role.replace(/^(Dr\.|Sir|Prof\.)\s*/i, "").trim().split(/\s+/);
    if (words.length >= 2) {
      CONFIG.PROFESSOR.initials = (words[0][0] + words[words.length - 1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      CONFIG.PROFESSOR.initials = words[0].slice(0, 2).toUpperCase();
    }
  }

  if (datasetMeta.subject) {
    CONFIG.PROFESSOR.subject = datasetMeta.subject;
  }

  if (datasetMeta.context) {
    CONFIG.PROFESSOR.institution = datasetMeta.context;
  }

  if (Array.isArray(datasetMeta.records)) {
    CONFIG.PROFESSOR.verifiedDatasetSize = datasetMeta.records.length;
  }

  // Update UI avatar elements dynamically
  document.querySelectorAll(".mentor-avatar-text").forEach(el => {
    el.textContent = CONFIG.PROFESSOR.initials;
  });
  document.querySelectorAll(".mentor-name-text").forEach(el => {
    el.textContent = CONFIG.PROFESSOR.name;
  });
  document.querySelectorAll(".mentor-subject-text").forEach(el => {
    el.textContent = CONFIG.PROFESSOR.subject;
  });
  document.querySelectorAll(".mentor-institution-text").forEach(el => {
    el.textContent = CONFIG.PROFESSOR.institution;
  });
}


  // ==========================================
  // MODULE: frontend/dataset.js
  // ==========================================
const OFFLINE_DATASET = {
  "role": "Sir Muhammad Saleem",
  "subject": "Object-Oriented Programming (OOP) / Java",
  "context": "Dawood University of Engineering and Technology.",
  "purpose": "Prototype knowledge base and escalation testing",
  "records": [
    {
      "id": 1,
      "category": "Uncategorized",
      "student_question": "What is the deadline for Assignment 1?",
      "professor_response": "Assignment 1 is due on **Thursday at 11:59 PM** through the university portal. I always recommend that students submit a little earlier rather than waiting until the last hour because technical problems can happen.\n\nIf the portal shows a successful submission, that's the important confirmation. I don't consider an assignment submitted just because a student says they uploaded it.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 2,
      "category": "Uncategorized",
      "student_question": "What are your office hours and where is your office?",
      "professor_response": "My regular office hours are **Monday and Wednesday from 2:00 to 4:00 PM**, and my office is in the Computer Science department.\n\nIf you need to discuss something complicated, especially a project or a conceptual problem, I'd suggest coming during office hours rather than trying to explain everything through a short message.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 3,
      "category": "Uncategorized",
      "student_question": "Where can I find the lecture slides for Week 4?",
      "professor_response": "The Week 4 slides are uploaded on the course portal under the **Lecture Materials** section. You should also find the accompanying examples there.\n\nI recommend looking at the slides together with the code examples because the slides alone don't always give you the complete picture.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 4,
      "category": "Uncategorized",
      "student_question": "Which textbook should I use for this course?",
      "professor_response": "The primary reference for the course is the textbook listed on the syllabus. I don't expect students to memorize an entire textbook. What matters more is understanding the programming concepts and being able to apply them.\n\nFor difficult topics, I may also recommend additional articles or tutorials during the semester.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 5,
      "category": "Uncategorized",
      "student_question": "What IDE do you recommend for Java programming?",
      "professor_response": "For this course, I generally recommend **IntelliJ IDEA** because it provides good support for Java and makes debugging easier.\n\nThat said, the IDE isn't the most important thing. If you're comfortable with Eclipse or another Java environment and your code compiles and runs correctly, that's fine.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 6,
      "category": "PART 2 \u2014 COURSE POLICIES",
      "student_question": "What is the policy for late assignment submissions?",
      "professor_response": "The standard rule is that assignments submitted after the deadline are subject to the late-submission policy mentioned in the syllabus.\n\nI don't want students to assume that asking me afterward automatically removes the penalty. If there's a genuine exceptional circumstance, that's a separate matter and I'd need to look at the situation individually.",
      "status": "\u2705 IN-SCOPE for the general policy.",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 7,
      "category": "PART 2 \u2014 COURSE POLICIES",
      "student_question": "How is the final grade calculated?",
      "professor_response": "The final grade is based on the components listed in the syllabus\u2014assignments, quizzes, examinations, and the lab component.\n\nI encourage students to look at the official grading breakdown rather than relying on what another student tells them. If the syllabus says something different from an informal conversation, the syllabus is the reference point.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 8,
      "category": "PART 2 \u2014 COURSE POLICIES",
      "student_question": "What is the passing criteria for the OOP lab?",
      "professor_response": "You need to satisfy the minimum lab requirements specified in the course outline. It's not simply about attending the lab; you also need to demonstrate that you can actually perform the required programming tasks.\n\nIf you're concerned about whether you've met the requirement personally, I'd want to check your actual record rather than give you a generic answer.",
      "status": "\u2705 IN-SCOPE for general policy; individual cases may require escalation.",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 9,
      "category": "PART 2 \u2014 COURSE POLICIES",
      "student_question": "What textbook chapters should I read before the multithreading lectures?",
      "professor_response": "I'd start with the chapters covering **threads, concurrency, synchronization, and shared resources**.\n\nBefore jumping into multithreading, though, make sure you're comfortable with classes, objects, inheritance, and exception handling. Students sometimes try to learn threads before they're comfortable with basic Java, and that makes the topic unnecessarily difficult.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 10,
      "category": "PART 2 \u2014 COURSE POLICIES",
      "student_question": "Can you explain how I should approach a database or programming project for this course?",
      "professor_response": "Start by understanding the requirements before writing code. That's something I repeat to students quite often.\n\nFirst identify what the program is supposed to do, then break the problem into smaller classes and responsibilities. Don't start by creating ten classes just because the project is supposed to demonstrate OOP.\n\nI would rather see a small number of well-designed classes than a large project where nobody understands why the classes exist.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 11,
      "category": "PART 3 \u2014 LEARNING OOP CONCEPTS",
      "student_question": "What is the difference between an abstract class and an interface in Java?",
      "professor_response": "The simple way I explain it is this: an **abstract class** is useful when you have classes that share some common identity or implementation, while an **interface** is useful for describing a capability or contract that different classes can implement.\n\nFor example, if I have different types of employees, an abstract `Employee` class might contain common information. But an interface such as `Payable` could represent the ability to perform a particular operation.\n\nDon't just memorize the syntax. Ask yourself: *Am I modeling a shared base type, or am I defining a capability?*",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 12,
      "category": "PART 3 \u2014 LEARNING OOP CONCEPTS",
      "student_question": "Can you give me a real-world analogy for polymorphism?",
      "professor_response": "Sure. Think about a person who tells different employees, **\u201cDo your job.\u201d**\n\nA manager, a programmer, and an accountant may all respond differently to that instruction because their actual behavior is different.\n\nIn programming, polymorphism allows us to work with objects through a common type while allowing the specific object to determine the appropriate behavior.\n\nThat's usually easier for students to understand than memorizing a definition from a textbook.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 13,
      "category": "PART 3 \u2014 LEARNING OOP CONCEPTS",
      "student_question": "Why do we use encapsulation?",
      "professor_response": "Encapsulation is about controlling how the internal state of an object is accessed and modified.\n\nFor example, I wouldn't normally want another part of the program to freely change an employee's salary without going through some controlled mechanism.\n\nSo when I teach encapsulation, I tell students: **don't think of it merely as \u201cmake variables private.\u201d Think about protecting the object's state and controlling how that state changes.**",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 14,
      "category": "PART 3 \u2014 LEARNING OOP CONCEPTS",
      "student_question": "What mistake do students commonly make when learning inheritance?",
      "professor_response": "One of the biggest mistakes is using inheritance simply because it exists.\n\nStudents sometimes think, *\u201cI have two classes that look similar, therefore one must inherit from the other.\u201d* That's not necessarily true.\n\nThere should be a meaningful **is-a relationship**. If the relationship doesn't make conceptual sense, composition may be a better solution.\n\nI've seen students create very complicated inheritance hierarchies when a couple of simple classes would have solved the problem.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 15,
      "category": "PART 3 \u2014 LEARNING OOP CONCEPTS",
      "student_question": "What mistakes do students commonly make in Java programming?",
      "professor_response": "A common one is trying to solve everything in one large method.\n\nAnother is not understanding the difference between an object's state and the operations performed on that state.\n\nStudents also tend to ignore debugging. They'll stare at the code and hope the error becomes obvious instead of actually reading the error message and tracing the program.\n\nMy advice is simple: **learn to debug systematically.**",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 16,
      "category": "PART 3 \u2014 LEARNING OOP CONCEPTS",
      "student_question": "How should I debug a Java program that isn't working?",
      "professor_response": "Don't immediately change five things at once.\n\nFirst reproduce the problem. Then read the error message carefully. Find the line where the problem occurs and determine what the program actually received versus what you expected it to receive.\n\nIf necessary, use breakpoints and inspect the values of your variables.\n\nGood debugging is almost like detective work. You're trying to find the point where reality and your assumptions stopped matching.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 17,
      "category": "PART 3 \u2014 LEARNING OOP CONCEPTS",
      "student_question": "I'm struggling to understand OOP. What would you recommend?",
      "professor_response": "Don't try to memorize every definition at once.\n\nTake a small problem\u2014perhaps a library system, a bank account, or a student management system\u2014and try to identify the objects, their data, and their behaviors.\n\nThen implement it yourself.\n\nIn my experience, OOP starts making sense when students stop treating it as a collection of terminology and start using it to model actual problems.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 18,
      "category": "PART 3 \u2014 LEARNING OOP CONCEPTS",
      "student_question": "What's your advice for students who are learning Java for the first time?",
      "professor_response": "Write code regularly.\n\nWatching someone else write Java can make you feel like you understand it, but that's different from sitting in front of an empty editor and solving a problem yourself.\n\nStart with small programs. Make mistakes. Read the errors. Fix them. Then gradually increase the difficulty.\n\nYou don't need to become an expert in two weeks.",
      "status": "\u2705 IN-SCOPE",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 19,
      "category": "PART 4 \u2014 GUIDANCE WITHOUT DOING THE STUDENT'S WORK",
      "student_question": "I'm stuck on my assignment. Can you tell me how I should approach it?",
      "professor_response": "Yes, I can help you understand the problem and discuss possible approaches.\n\nBut I'd want you to show me what you've tried first. I'm more interested in helping you understand your reasoning than simply giving you something you can paste into the assignment.\n\nTell me where you became stuck, and we can work through that part.",
      "status": "\u2705 IN-SCOPE \u2014 guidance allowed.",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 20,
      "category": "PART 4 \u2014 GUIDANCE WITHOUT DOING THE STUDENT'S WORK",
      "student_question": "Can you explain this Java error to me?",
      "professor_response": "Absolutely. Understanding an error message is part of learning programming.\n\nShow me the error and the relevant part of your code, and I'd help you identify what the message means and where you should investigate.\n\nI wouldn't automatically rewrite the entire program for you because that removes the learning opportunity.",
      "status": "\u2705 IN-SCOPE \u2014 explanation allowed.",
      "escalation_required": false,
      "source": "dataset.txt"
    },
    {
      "id": 21,
      "category": "PART 5 \u2014 ACADEMIC INTEGRITY BOUNDARIES",
      "student_question": "Write the complete Java code for Question 3 of my assignment.",
      "professor_response": "I wouldn't provide the complete submission for an assessed assignment.\n\nI can help you understand the requirements, explain the relevant OOP concept, or give you a smaller example that teaches the technique. But the final assignment should represent your own work.\n\nIf you show me your attempt, we can discuss where you're stuck.",
      "status": "\ud83d\udea8 ESCALATE / REFUSE DIRECT COMPLETION",
      "escalation_required": true,
      "source": "dataset.txt"
    },
    {
      "id": 22,
      "category": "PART 5 \u2014 ACADEMIC INTEGRITY BOUNDARIES",
      "student_question": "Can you give me the exact answer key for Quiz 2?",
      "professor_response": "No. I wouldn't provide an answer key for an active assessment.\n\nIf you're preparing for the quiz, I can explain the topics covered and create practice questions that test the same concepts without revealing the actual answers.",
      "status": "\ud83d\udea8 ESCALATE / REFUSE",
      "escalation_required": true,
      "source": "dataset.txt"
    },
    {
      "id": 23,
      "category": "PART 5 \u2014 ACADEMIC INTEGRITY BOUNDARIES",
      "student_question": "Can I use ChatGPT to write my entire semester project report?",
      "professor_response": "That depends on the course's academic-integrity policy and what level of AI assistance is permitted.\n\nI wouldn't tell you that it's automatically acceptable.\n\nYou should check the official course policy. If AI assistance is permitted, it should still be used transparently and within the limits specified by the instructor.",
      "status": "\ud83d\udea8 ESCALATE / POLICY CHECK",
      "escalation_required": true,
      "source": "dataset.txt"
    },
    {
      "id": 24,
      "category": "PART 5 \u2014 ACADEMIC INTEGRITY BOUNDARIES",
      "student_question": "Is it okay if I copy my classmate's code as long as I change the variable names?",
      "professor_response": "No. Changing variable names doesn't turn somebody else's work into your own.\n\nIf you're looking at another student's solution to understand an idea, you need to make sure you're following the course's collaboration rules. There's a significant difference between discussing a concept and copying someone's implementation.\n\nIf you're unsure about what collaboration is permitted, ask the instructor before submitting the work.",
      "status": "\ud83d\udea8 ESCALATE / ACADEMIC INTEGRITY",
      "escalation_required": true,
      "source": "dataset.txt"
    },
    {
      "id": 25,
      "category": "PART 5 \u2014 ACADEMIC INTEGRITY BOUNDARIES",
      "student_question": "What specific questions will be on the final exam next week?",
      "professor_response": "I wouldn't disclose the actual exam questions in advance.\n\nI can tell you which topics and learning outcomes you should prepare based on the syllabus and material covered in class.\n\nThe purpose of an exam is to assess your understanding, so giving out the questions beforehand would undermine that.",
      "status": "\ud83d\udea8 ESCALATE / REFUSE",
      "escalation_required": true,
      "source": "dataset.txt"
    },
    {
      "id": 26,
      "category": "PART 5 \u2014 ACADEMIC INTEGRITY BOUNDARIES",
      "student_question": "Can you bypass the plagiarism checker on my assignment?",
      "professor_response": "No. I wouldn't help someone disguise copied work or bypass an academic-integrity system.\n\nIf you're worried that your work is being flagged incorrectly, the appropriate thing is to discuss the issue with the instructor and provide evidence of how you produced the work.",
      "status": "\ud83d\udea8 ESCALATE / REFUSE",
      "escalation_required": true,
      "source": "dataset.txt"
    },
    {
      "id": 27,
      "category": "PART 6 \u2014 PERSONAL, GRADING & EXCEPTION REQUESTS",
      "student_question": "I missed the midterm because I had a hospital emergency. Can I take it again?",
      "professor_response": "That's something I wouldn't decide through an automated system.\n\nIf there was a genuine medical emergency, you should contact the department or instructor as soon as possible and provide whatever documentation the university requires.\n\nI can explain the general policy, but whether an individual student receives a makeup exam requires a human decision.",
      "status": "\ud83d\udea8 ESCALATE TO PROFESSOR / DEPARTMENT",
      "escalation_required": true,
      "source": "dataset.txt"
    },
    {
      "id": 28,
      "category": "PART 6 \u2014 PERSONAL, GRADING & EXCEPTION REQUESTS",
      "student_question": "I think Question 2 on my midterm was graded unfairly. Can you re-evaluate it?",
      "professor_response": "A grading dispute needs to be handled through the official re-evaluation process.\n\nI'd want to look at the actual question, your answer, the marking scheme, and the applicable course policy before making any decision.\n\nAn AI Stand-In shouldn't independently change or promise to change a student's grade.",
      "status": "\ud83d\udea8 ESCALATE",
      "escalation_required": true,
      "source": "dataset.txt"
    },
    {
      "id": 29,
      "category": "PART 6 \u2014 PERSONAL, GRADING & EXCEPTION REQUESTS",
      "student_question": "I'm at 89%. Can you round my grade up to an A?",
      "professor_response": "I wouldn't make that decision automatically.\n\nIf the syllabus has a published grading rule, that's what we should follow. If there is discretion involved, the actual instructor needs to make that decision.\n\nYour current percentage by itself isn't enough information for an AI system to change a final grade.",
      "status": "\ud83d\udea8 ESCALATE",
      "escalation_required": true,
      "source": "dataset.txt"
    },
    {
      "id": 30,
      "category": "PART 6 \u2014 PERSONAL, GRADING & EXCEPTION REQUESTS",
      "student_question": "I need a letter of recommendation from Dr. Ahmed for a scholarship.",
      "professor_response": "That's a personal request that should go directly to Dr. Ahmed.\n\nAn AI Stand-In can explain how students normally request a recommendation or tell them what information they should prepare, but it shouldn't pretend to personally recommend a student or generate an official recommendation in the professor's name without authorization.\n\nI'd tell the student to contact me directly and provide the scholarship details, deadline, CV, and any other information I request.",
      "status": "\ud83d\udea8 ESCALATE TO HUMAN",
      "escalation_required": true,
      "source": "dataset.txt"
    }
  ]
};


  // ==========================================
  // MODULE: frontend/js/storage.js
  // ==========================================
/**
 * Storage Service — Professor Stand-In
 * Manages client-side persistence for Conversation History, Theme, and Preferences
 */



const storage = {
  // Theme Management
  getTheme() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  },

  setTheme(theme) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  },

  // Conversation History Management
  getHistory() {
    try {
      const data = localStorage.getItem(CONFIG.STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load history from localStorage:", e);
      return [];
    }
  },

  saveConversation(convo) {
    try {
      const list = this.getHistory();
      const newEntry = {
        id: convo.id || 'conv_' + Date.now(),
        question: convo.question,
        answer: convo.answer,
        escalation: convo.escalation || false,
        sources: convo.sources || [],
        timestamp: convo.timestamp || new Date().toISOString(),
        category: convo.category || "General Inquiry"
      };

      const updated = [newEntry, ...list.filter(c => c.id !== newEntry.id)];
      localStorage.setItem(CONFIG.STORAGE_KEYS.HISTORY, JSON.stringify(updated));
      return newEntry;
    } catch (e) {
      console.error("Failed to save conversation:", e);
    }
  },

  deleteConversation(id) {
    try {
      const list = this.getHistory();
      const updated = list.filter(c => c.id !== id);
      localStorage.setItem(CONFIG.STORAGE_KEYS.HISTORY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Failed to delete conversation:", e);
      return [];
    }
  },

  clearAllHistory() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.HISTORY);
  },

  // Preferences & Profile
  getStudentProfile() {
    try {
      const data = localStorage.getItem(CONFIG.STORAGE_KEYS.STUDENT_PROFILE);
      return data ? JSON.parse(data) : { name: "CS Undergraduate", id: "DUET-2024-OOP" };
    } catch (e) {
      return { name: "CS Undergraduate", id: "DUET-2024-OOP" };
    }
  },

  setStudentProfile(profile) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(profile));
  },

  getNotifications() {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.NOTIFICATIONS) === 'true';
  },

  setNotifications(enabled) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.NOTIFICATIONS, enabled ? 'true' : 'false');
  }
};


  // ==========================================
  // MODULE: frontend/js/markdown.js
  // ==========================================
/**
 * Markdown & Code Renderer — Professor Stand-In
 * Clean, lightweight, XSS-safe markdown renderer with syntax-styled code blocks and copy buttons
 */

function renderMarkdown(rawText) {
  if (!rawText) return "";

  // 1. Sanitize HTML entities
  let text = rawText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Fenced Code Blocks (```java ... ``` or ``` ...)
  text = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || "java";
    const cleanCode = code.trim();
    return `
      <div class="code-block-wrapper">
        <div class="code-block-header">
          <span class="code-lang-label">${language}</span>
          <button class="copy-code-btn" onclick="navigator.clipboard.writeText(this.closest('.code-block-wrapper').querySelector('code').innerText); this.innerText='Copied!'; setTimeout(() => this.innerText='Copy', 2000)">Copy</button>
        </div>
        <pre><code class="language-${language}">${cleanCode}</code></pre>
      </div>
    `;
  });

  // 3. Inline Code (`code`)
  text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // 4. Bold (**text**)
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // 5. Italic (*text* or _text_)
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // 6. Blockquotes (> quote)
  text = text.replace(/^>\s+(.+)$/gm, '<blockquote class="academic-quote">$1</blockquote>');

  // 7. Unordered Lists (- item or * item)
  text = text.replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  text = text.replace(/<\/ul>\s*<ul>/g, '');

  // 8. Paragraphs: split by double newlines
  const paragraphs = text.split(/\n{2,}/);
  return paragraphs.map(p => {
    p = p.trim();
    if (!p) return "";
    if (p.startsWith("<div") || p.startsWith("<pre") || p.startsWith("<ul") || p.startsWith("<blockquote")) {
      return p;
    }
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  }).join("\n");
}


  // ==========================================
  // MODULE: frontend/js/api.js
  // ==========================================
/**
 * API Client Module — Professor Stand-In
 * Handles all network requests to the FastAPI backend with offline fallback support
 */




class ApiClient {
  constructor() {
    this.baseUrl = CONFIG.API_BASE_URL;
    this.cachedDataset = null;
    this.isOnline = true;
  }

  /**
   * Health check endpoint
   */
  async checkStatus() {
    try {
      const res = await fetch(`${this.baseUrl}/api/status`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      this.isOnline = true;
      return { online: true, ...data };
    } catch (err) {
      console.warn("Backend status check failed, using offline mode:", err.message);
      this.isOnline = false;
      return {
        online: false,
        message: "Offline / Standalone mode active",
        records: OFFLINE_DATASET.records.length
      };
    }
  }

  /**
   * Fetch all knowledge base records
   */
  async getRecords() {
    if (this.cachedDataset) return this.cachedDataset;

    try {
      const res = await fetch(`${this.baseUrl}/api/records`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(5000)
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      this.cachedDataset = data;
      this.isOnline = true;
      updateProfessorConfigFromBackend(data);
      return data;
    } catch (err) {
      console.warn("Could not fetch remote records, using offline dataset:", err.message);
      this.isOnline = false;
      this.cachedDataset = OFFLINE_DATASET;
      updateProfessorConfigFromBackend(OFFLINE_DATASET);
      return OFFLINE_DATASET;
    }
  }

  /**
   * Submit a student question to POST /ask
   * Returns: { answer, escalation, sources, fallbackNotice }
   */
  async askQuestion(questionText) {
    if (!questionText || !questionText.trim()) {
      throw new Error("Question cannot be empty.");
    }

    try {
      const res = await fetch(`${this.baseUrl}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ question: questionText.trim() }),
        signal: AbortSignal.timeout(30000)
      });

      if (!res.ok) {
        throw new Error(`Server returned error code ${res.status}`);
      }

      const data = await res.json();
      return {
        answer: data.answer || "No response text was returned.",
        escalation: Boolean(data.escalation),
        sources: Array.isArray(data.sources) ? data.sources : [],
        fallbackNotice: data.fallback_notice || null
      };

    } catch (err) {
      console.warn("Direct /ask request failed, using client-side verified retrieval:", err);
      return this.localDatasetFallback(questionText);
    }
  }

  /**
   * Client-side fallback matching backend's tokenize & score logic
   */
  localDatasetFallback(question) {
    const dataset = this.cachedDataset || OFFLINE_DATASET;
    const records = dataset.records || [];

    const tokenize = (str) => {
      const words = (str || "").toLowerCase().match(/[a-z0-9]+/g) || [];
      return new Set(words.filter(w => w.length > 2));
    };

    const queryWords = tokenize(question);
    const scored = [];

    for (const record of records) {
      const searchable = [
        record.student_question,
        record.professor_response,
        record.category,
        record.status
      ].join(" ");
      const words = tokenize(searchable);
      
      let score = 0;
      for (const w of queryWords) {
        if (words.has(w)) score += 1;
      }

      const questionWords = tokenize(record.student_question);
      for (const w of queryWords) {
        if (questionWords.has(w)) score += 2;
      }

      if (score > 0) {
        scored.push({ score, record });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    const relevant = scored.slice(0, 5).map(s => s.record);

    if (relevant.length === 0) {
      return {
        answer: "I don't have enough approved information in Sir Muhammad Saleem's knowledge base to answer that reliably. Please contact Sir Muhammad Saleem directly if the question requires his personal judgment.",
        escalation: true,
        sources: [],
        fallbackNotice: "Served via local client matcher (backend unreachable)."
      };
    }

    const top = relevant[0];
    return {
      answer: top.professor_response,
      escalation: Boolean(top.escalation_required),
      sources: relevant.map(r => `Interview entry ${r.id}: ${r.student_question}`),
      fallbackNotice: "Served directly from Sir Muhammad Saleem's verified knowledge base (Backend offline mode)."
    };
  }
}

const api = new ApiClient();


  // ==========================================
  // MODULE: frontend/js/tabs/home.js
  // ==========================================
/**
 * Home Tab View — Professor Stand-In
 * Landing & Academic Overview
 */





function initHomeView() {
  const container = document.getElementById('tab-home');
  if (!container) return;

  const hour = new Date().getHours();
  let timeGreeting = "Good day";
  if (hour < 12) timeGreeting = "Good morning";
  else if (hour < 17) timeGreeting = "Good afternoon";
  else timeGreeting = "Good evening";

  container.innerHTML = `
    <div class="tab-view-wrapper">
      <!-- Hero Welcome Card -->
      <div class="home-hero-card">
        <h1 class="home-hero-greeting">${timeGreeting}, Student</h1>
        <p class="home-hero-tagline">
          I am the AI academic stand-in for <strong class="mentor-name-text">${CONFIG.PROFESSOR.name}</strong>, 
          representing his approved course knowledge and academic guidance for 
          <span class="mentor-subject-text">${CONFIG.PROFESSOR.subject}</span> at 
          <span class="mentor-institution-text">${CONFIG.PROFESSOR.institution}</span>.
        </p>

        <!-- Quick Question Input Bar -->
        <div class="home-quick-prompt-box">
          <input 
            type="text" 
            id="home-prompt-input" 
            class="home-prompt-input" 
            placeholder="Ask a question about OOP concepts, course policies, or assignments..." 
            autocomplete="off"
          />
          <button id="home-prompt-submit" class="home-prompt-submit-btn" aria-label="Send question">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>

      <!-- Suggested Starter Questions Section -->
      <div class="home-starters-section">
        <h2 class="home-section-title">Suggested Inquiries</h2>
        <div class="starter-questions-grid">
          <button class="starter-btn" data-query="What is encapsulation and why do we use it?">
            <span class="starter-btn-icon">💡</span>
            <div>
              <strong>Concept Explanation</strong>
              <p>What is encapsulation and why do we use it?</p>
            </div>
          </button>
          <button class="starter-btn" data-query="What is the deadline for Assignment 1?">
            <span class="starter-btn-icon">📅</span>
            <div>
              <strong>Course Deadlines</strong>
              <p>What is the deadline for Assignment 1?</p>
            </div>
          </button>
          <button class="starter-btn" data-query="What are your office hours and where is your office?">
            <span class="starter-btn-icon">🏛️</span>
            <div>
              <strong>Faculty Office Hours</strong>
              <p>What are your office hours and where is your office?</p>
            </div>
          </button>
          <button class="starter-btn" data-query="Can you round my grade up to an A?">
            <span class="starter-btn-icon">🚨</span>
            <div>
              <strong>Escalation Boundary</strong>
              <p>Can you round my grade up to an A?</p>
            </div>
          </button>
        </div>
      </div>

      <!-- 3 Key Features Overview -->
      <div class="home-overview-grid">
        <div class="home-feature-card" data-goto="knowledge">
          <div class="home-feature-icon">
            <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <h3 class="home-feature-title">Verified Knowledge Base</h3>
          <p class="home-feature-desc">Browse 30 curated interview records spanning OOP design patterns, lab passing criteria, and debugging tips.</p>
        </div>

        <div class="home-feature-card" data-goto="history">
          <div class="home-feature-icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
          </div>
          <h3 class="home-feature-title">Discussion History</h3>
          <p class="home-feature-desc">Revisit questions you asked previously, review citations, and reopen full conversation threads.</p>
        </div>

        <div class="home-feature-card" data-goto="about">
          <div class="home-feature-icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h3 class="home-feature-title">Academic Transparency</h3>
          <p class="home-feature-desc">Explore the 5-step RAG pipeline, professor credentials, and explicit ethical boundary policies.</p>
        </div>
      </div>
    </div>
  `;

  // Bind input submission
  const input = container.querySelector('#home-prompt-input');
  const btn = container.querySelector('#home-prompt-submit');

  const triggerAsk = () => {
    const val = input.value.trim();
    if (!val) return;
    input.value = '';
    sendQuestionToChat(val);
  };

  btn.addEventListener('click', triggerAsk);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerAsk();
    }
  });

  // Bind starter questions
  container.querySelectorAll('.starter-btn').forEach(b => {
    b.addEventListener('click', () => {
      const q = b.getAttribute('data-query');
      if (q) sendQuestionToChat(q);
    });
  });

  // Bind navigation feature cards
  container.querySelectorAll('.home-feature-card').forEach(c => {
    c.addEventListener('click', () => {
      const target = c.getAttribute('data-goto');
      if (target) switchToTab(target);
    });
  });
}


  // ==========================================
  // MODULE: frontend/js/tabs/chat.js
  // ==========================================
/**
 * Chat Tab View — Professor Stand-In
 * Real-time Q&A stream connected to POST /ask with verified citations and escalation alerts
 */







let isGenerating = false;

function initChatView() {
  const container = document.getElementById('tab-chat');
  if (!container) return;

  container.innerHTML = `
    <div class="chat-tab-wrapper">
      <!-- Chat Header -->
      <div class="chat-mentor-header">
        <div class="mentor-profile-info">
          <div class="mentor-avatar mentor-avatar-text">${CONFIG.PROFESSOR.initials}</div>
          <div class="mentor-meta">
            <div class="mentor-name">
              <span class="mentor-name-text">${CONFIG.PROFESSOR.name}</span>
              <span class="mentor-verified-check" title="Authorized Academic Stand-In">✓</span>
            </div>
            <div class="mentor-desc">
              <span class="mentor-subject-text">${CONFIG.PROFESSOR.subject}</span> • Stand-In AI
            </div>
          </div>
        </div>

        <div class="chat-header-actions">
          <button id="clear-chat-btn" class="new-chat-btn" title="Start a fresh conversation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
            New Session
          </button>
        </div>
      </div>

      <!-- Scrollable Message Feed -->
      <div id="chat-feed" class="chat-feed" role="log" aria-live="polite">
        <!-- Render starter screen if no active conversation -->
        <div id="chat-empty-view" class="chat-empty-state">
          <div class="empty-state-icon">
            <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <h2 class="empty-state-title">Ask Your Professor</h2>
          <p class="empty-state-desc">
            Ask any question regarding Java, Object-Oriented Programming, assignment policies, or lab criteria. Responses are strictly grounded in Sir Muhammad Saleem's verified academic dataset.
          </p>
          <div class="starter-questions-grid">
            <button class="starter-btn chat-starter-prompt" data-q="What is the difference between an abstract class and an interface in Java?">
              <span class="starter-btn-icon">💡</span>
              <div><strong>Core Concept</strong><p>Abstract class vs. Interface</p></div>
            </button>
            <button class="starter-btn chat-starter-prompt" data-q="What is the policy for late assignment submissions?">
              <span class="starter-btn-icon">📋</span>
              <div><strong>Course Policy</strong><p>Late submission rules</p></div>
            </button>
            <button class="starter-btn chat-starter-prompt" data-q="How should I debug a Java program that isn't working?">
              <span class="starter-btn-icon">🔍</span>
              <div><strong>Debugging Advice</strong><p>Systematic debugging steps</p></div>
            </button>
            <button class="starter-btn chat-starter-prompt" data-q="Can you give me the exact answer key for Quiz 2?">
              <span class="starter-btn-icon">🚨</span>
              <div><strong>Integrity Check</strong><p>Requesting active quiz answers</p></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Chat Input Area -->
      <div class="chat-input-container">
        <div class="chat-input-box">
          <textarea 
            id="chat-textarea" 
            class="chat-textarea" 
            placeholder="Type your question for the professor (Enter to send, Shift+Enter for new line)..." 
            rows="1"
          ></textarea>
          <div class="chat-actions-group">
            <button id="chat-send-btn" class="chat-send-btn" aria-label="Send question">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
        <div class="chat-input-hint">
          Press <strong>Enter</strong> to send • <strong>Shift + Enter</strong> for a new line • Grounded in ${CONFIG.PROFESSOR.verifiedDatasetSize} interview records
        </div>
      </div>
    </div>
  `;

  // Bind textarea auto-resize & key events
  const textarea = container.querySelector('#chat-textarea');
  const sendBtn = container.querySelector('#chat-send-btn');
  const clearBtn = container.querySelector('#clear-chat-btn');

  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 140) + 'px';
  });

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  sendBtn.addEventListener('click', handleSend);

  clearBtn.addEventListener('click', () => {
    const feed = document.getElementById('chat-feed');
    feed.innerHTML = '';
    const emptyView = document.getElementById('chat-empty-view');
    if (!emptyView) {
      initChatView();
    }
  });

  // Bind starter buttons inside chat empty state
  container.querySelectorAll('.chat-starter-prompt').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-q');
      if (q) executeQuestion(q);
    });
  });
}

function handleSend() {
  const textarea = document.getElementById('chat-textarea');
  if (!textarea || isGenerating) return;

  const text = textarea.value.trim();
  if (!text) return;

  textarea.value = '';
  textarea.style.height = 'auto';
  executeQuestion(text);
}

/**
 * Public function to ask a question from other tabs (e.g. Home or Knowledge)
 */
function sendQuestionToChat(questionText) {
  switchToTab('chat');
  setTimeout(() => {
    executeQuestion(questionText);
  }, 100);
}

/**
 * Execute Question Flow:
 * 1. Render student bubble
 * 2. Show subtle node-pulse generation state
 * 3. Call api.askQuestion
 * 4. Render 3px gold left edge professor card
 * 5. Save to local storage history
 */
async function executeQuestion(questionText) {
  const feed = document.getElementById('chat-feed');
  if (!feed) return;

  // Remove empty view if present
  const emptyView = document.getElementById('chat-empty-view');
  if (emptyView) emptyView.remove();

  // 1. Render Student Message (clean, lightweight)
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const studentEl = document.createElement('div');
  studentEl.className = 'msg-student';
  studentEl.innerHTML = `
    <div class="student-bubble">${escapeHtml(questionText)}</div>
    <div class="msg-timestamp">${timeStr}</div>
  `;
  feed.appendChild(studentEl);
  feed.scrollTop = feed.scrollHeight;

  // 2. Render Subtle AI Generation Pulse (No robot heads!)
  isGenerating = true;
  updateControlsState();

  const generatingEl = document.createElement('div');
  generatingEl.className = 'msg-professor';
  generatingEl.id = 'active-generating-msg';
  generatingEl.innerHTML = `
    <div class="generating-card">
      <div class="node-pulse-wrapper">
        <div class="node-line"></div>
        <div class="node-dot"></div>
      </div>
      <span class="generating-text">Consulting ${CONFIG.PROFESSOR.name}'s verified knowledge...</span>
    </div>
  `;
  feed.appendChild(generatingEl);
  feed.scrollTop = feed.scrollHeight;

  try {
    // 3. Connect to backend POST /ask
    const res = await api.askQuestion(questionText);

    // Remove generating indicator
    generatingEl.remove();

    // 4. Render Professor Stand-In Message
    const profEl = document.createElement('div');
    profEl.className = 'msg-professor';
    
    const msgId = 'prof_msg_' + Date.now();

    let sourcesHtml = '';
    if (res.sources && res.sources.length > 0) {
      sourcesHtml = `
        <div class="sources-accordion">
          <button class="sources-toggle-btn" onclick="this.closest('.sources-accordion').classList.toggle('open')">
            <span class="sources-arrow">▶</span>
            <span>Knowledge Sources (${res.sources.length} retrieved entries)</span>
          </button>
          <div class="sources-list">
            ${res.sources.map(s => `<div class="source-item">${escapeHtml(s)}</div>`).join('')}
          </div>
        </div>
      `;
    }

    let escalationHtml = '';
    if (res.escalation) {
      escalationHtml = `
        <div class="escalation-alert-box" role="alert">
          <span style="font-size: 16px;">🚨</span>
          <div>
            <strong>Escalation Boundary Triggered:</strong>
            This request involves personal faculty discretion, official grading exceptions, or academic integrity policies. The AI Stand-In cannot make exceptions on the professor's behalf. Please contact Sir Muhammad Saleem directly during office hours or through official DUET channels.
          </div>
        </div>
      `;
    }

    let fallbackHtml = '';
    if (res.fallbackNotice) {
      fallbackHtml = `<span class="footer-source-chip" title="${escapeHtml(res.fallbackNotice)}">🛡️ ${escapeHtml(res.fallbackNotice)}</span>`;
    } else {
      fallbackHtml = `<span class="footer-source-chip">✓ Verified interview response</span>`;
    }

    profEl.innerHTML = `
      <div class="professor-card" id="${msgId}">
        <div class="professor-card-header">
          <div class="professor-badge-title">
            <span>${CONFIG.PROFESSOR.name}</span>
            <span class="mentor-verified-check">✓</span>
          </div>
          <div class="card-actions-bar">
            <button class="card-action-btn copy-answer-btn" title="Copy response to clipboard">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy</span>
            </button>
          </div>
        </div>

        <div class="msg-body">
          ${renderMarkdown(res.answer)}
        </div>

        ${escalationHtml}
        ${sourcesHtml}

        <div class="professor-card-footer">
          <span>Based on approved ${CONFIG.PROFESSOR.subject} knowledge</span>
          ${fallbackHtml}
        </div>
      </div>
    `;

    // Bind copy button
    profEl.querySelector('.copy-answer-btn').addEventListener('click', function() {
      navigator.clipboard.writeText(res.answer);
      const span = this.querySelector('span');
      span.textContent = 'Copied!';
      setTimeout(() => { span.textContent = 'Copy'; }, 2000);
    });

    feed.appendChild(profEl);
    feed.scrollTop = feed.scrollHeight;

    // 5. Persist into client conversation history
    storage.saveConversation({
      question: questionText,
      answer: res.answer,
      escalation: res.escalation,
      sources: res.sources,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    if (generatingEl) generatingEl.remove();
    const errorEl = document.createElement('div');
    errorEl.className = 'msg-professor';
    errorEl.innerHTML = `
      <div class="professor-card" style="border-left-color: var(--status-escalate);">
        <p style="color: var(--status-escalate); font-weight: 500;">
          Unable to generate a response. Please check that the backend server is active.
        </p>
        <button class="starter-btn" style="margin-top: 10px;" onclick="executeQuestion('${escapeHtml(questionText)}')">
          🔄 Retry Question
        </button>
      </div>
    `;
    feed.appendChild(errorEl);
  } finally {
    isGenerating = false;
    updateControlsState();
    feed.scrollTop = feed.scrollHeight;
  }
}

function updateControlsState() {
  const sendBtn = document.getElementById('chat-send-btn');
  const textarea = document.getElementById('chat-textarea');
  if (sendBtn) sendBtn.disabled = isGenerating;
  if (textarea) textarea.disabled = isGenerating;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


  // ==========================================
  // MODULE: frontend/js/tabs/knowledge.js
  // ==========================================
/**
 * Knowledge Base Tab View — Professor Stand-In
 * Faithfully mirrors Wireframe 1 & 2: Search bar, 6 Filter Pills, and 8 Academic Domain Cards
 */





// The 8 Academic Domains matching the 8 wireframe cards
const DOMAINS = [
  {
    id: "curriculum",
    title: "Curriculum & Lab Criteria",
    desc: "Passing criteria for OOP labs, practical assignments, and technical evaluation standards.",
    icon: `<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>`,
    category: "Academic",
    recordIds: [1, 8]
  },
  {
    id: "lectures",
    title: "Lectures, Slides & Materials",
    desc: "Where to access lecture slides, slide-code pairings, and portal resources.",
    icon: `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    category: "Teaching",
    recordIds: [3]
  },
  {
    id: "textbooks",
    title: "Textbooks & References",
    desc: "Primary recommended textbooks, multithreading reading list, and supplemental articles.",
    icon: `<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    category: "Academic",
    recordIds: [4, 9]
  },
  {
    id: "advice",
    title: "Advice & Learning Strategies",
    desc: "Strategies for first-time Java learners, tackling OOP confusion, and writing code daily.",
    icon: `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    category: "Advice",
    recordIds: [17, 18, 19]
  },
  {
    id: "projects",
    title: "Course Projects & Architecture",
    desc: "Breaking down problem domains into classes without unnecessary over-engineering.",
    icon: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    category: "Experience",
    recordIds: [10]
  },
  {
    id: "policies",
    title: "Department Policies & Grading",
    desc: "Late assignment penalties, grade breakdowns, and formal dispute procedures.",
    icon: `<svg viewBox="0 0 24 24"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="5 6 12 3 19 6"></polyline><line x1="4" y1="10" x2="4" y2="21"></line><line x1="20" y1="10" x2="20" y2="21"></line></svg>`,
    category: "Academic",
    recordIds: [6, 7, 27, 28, 29]
  },
  {
    id: "office_hours",
    title: "Office Hours & FAQs",
    desc: "Faculty office location, weekly consultation slots, and direct meeting guidelines.",
    icon: `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
    category: "FAQs",
    recordIds: [2, 5, 30]
  },
  {
    id: "oop_concepts",
    title: "OOP Concepts & Debugging",
    desc: "Polymorphism analogies, encapsulation rationale, abstract classes, and debugging traps.",
    icon: `<svg viewBox="0 0 24 24"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>`,
    category: "Teaching",
    recordIds: [11, 12, 13, 14, 15, 16, 20]
  }
];

let allRecords = [];
let currentFilter = "All";
let searchQuery = "";

async function initKnowledgeView() {
  const container = document.getElementById('tab-knowledge');
  if (!container) return;

  const data = await api.getRecords();
  allRecords = data.records || [];

  container.innerHTML = `
    <div class="tab-view-wrapper">
      <div class="knowledge-header-controls">
        <!-- Exact Wireframe Top Search Bar -->
        <div class="search-bar-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="knowledge-search-input" 
            class="search-input" 
            placeholder="Search syllabus, course policies, OOP concepts, or interview notes..."
            value="${searchQuery}"
          />
        </div>

        <!-- Exact Wireframe Filter Pills -->
        <div class="filter-pills-row" role="tablist">
          <button class="filter-pill ${currentFilter === 'All' ? 'active' : ''}" data-cat="All">All</button>
          <button class="filter-pill ${currentFilter === 'Teaching' ? 'active' : ''}" data-cat="Teaching">Teaching</button>
          <button class="filter-pill ${currentFilter === 'Academic' ? 'active' : ''}" data-cat="Academic">Academic</button>
          <button class="filter-pill ${currentFilter === 'Advice' ? 'active' : ''}" data-cat="Advice">Advice</button>
          <button class="filter-pill ${currentFilter === 'Experience' ? 'active' : ''}" data-cat="Experience">Experience</button>
          <button class="filter-pill ${currentFilter === 'FAQs' ? 'active' : ''}" data-cat="FAQs">FAQs</button>
        </div>
      </div>

      <!-- 8-Card Grid (Matching Wireframe 1 exactly) -->
      <div id="knowledge-grid" class="cards-grid">
        ${renderDomainCards()}
      </div>

      <!-- Modal Dialog for Inspecting Records in a Domain -->
      <div id="record-detail-modal" class="modal-backdrop">
        <div class="modal-content">
          <button id="modal-close" class="modal-close-btn" aria-label="Close modal">✕</button>
          <div id="modal-body-content"></div>
        </div>
      </div>
    </div>
  `;

  // Bind Search input
  const searchInput = container.querySelector('#knowledge-search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    updateGridDisplay();
  });

  // Bind Category Filter Pills
  container.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      container.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-cat');
      updateGridDisplay();
    });
  });

  // Bind Card Click Events
  bindCardClickEvents(container);

  // Bind Modal Close
  const modal = container.querySelector('#record-detail-modal');
  const modalClose = container.querySelector('#modal-close');
  modalClose.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

function renderDomainCards() {
  return DOMAINS.map(domain => {
    const isVisible = checkDomainVisibility(domain);
    if (!isVisible) return '';

    return `
      <div class="topic-card" data-domain-id="${domain.id}">
        <div>
          <div class="topic-card-icon">${domain.icon}</div>
          <h3 class="topic-card-title">${domain.title}</h3>
          <p class="topic-card-desc">${domain.desc}</p>
        </div>
        <div class="topic-card-footer">
          <span>${domain.category}</span>
          <span class="topic-count-badge">${domain.recordIds.length} records</span>
        </div>
      </div>
    `;
  }).join('');
}

function checkDomainVisibility(domain) {
  if (currentFilter !== 'All' && domain.category !== currentFilter) {
    return false;
  }

  if (searchQuery) {
    const titleMatch = domain.title.toLowerCase().includes(searchQuery);
    const descMatch = domain.desc.toLowerCase().includes(searchQuery);
    
    const recordMatch = domain.recordIds.some(id => {
      const rec = allRecords.find(r => r.id === id);
      if (!rec) return false;
      return (
        rec.student_question.toLowerCase().includes(searchQuery) ||
        rec.professor_response.toLowerCase().includes(searchQuery)
      );
    });

    return titleMatch || descMatch || recordMatch;
  }

  return true;
}

function updateGridDisplay() {
  const grid = document.getElementById('knowledge-grid');
  if (!grid) return;
  grid.innerHTML = renderDomainCards();
  const container = document.getElementById('tab-knowledge');
  bindCardClickEvents(container);
}

function bindCardClickEvents(container) {
  container.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', () => {
      const domainId = card.getAttribute('data-domain-id');
      const domain = DOMAINS.find(d => d.id === domainId);
      if (domain) openDomainModal(domain);
    });
  });
}

function openDomainModal(domain) {
  const modal = document.getElementById('record-detail-modal');
  const body = document.getElementById('modal-body-content');
  if (!modal || !body) return;

  const records = domain.recordIds
    .map(id => allRecords.find(r => r.id === id))
    .filter(Boolean);

  body.innerHTML = `
    <div class="record-drawer-content">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <div class="topic-card-icon" style="margin: 0;">${domain.icon}</div>
        <div>
          <h2 style="font-family: var(--font-serif); font-size: 20px; font-weight: 600;">${domain.title}</h2>
          <span style="font-size: 12px; color: var(--text-secondary);">${records.length} Verified Entries from Professor Dataset</span>
        </div>
      </div>
      <p style="font-size: 13.5px; color: var(--text-secondary); margin-bottom: 16px;">${domain.desc}</p>

      <div style="display: flex; flex-direction: column; gap: 18px;">
        ${records.map(rec => `
          <div style="background-color: var(--bg-surface-subtle); border: 1px solid var(--border-warm); border-radius: var(--radius-inner); padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 8px;">
              <h4 style="font-size: 14.5px; font-weight: 600; color: var(--text-primary);">${rec.student_question}</h4>
              <span class="history-badge ${rec.escalation_required ? 'escalated' : 'in-scope'}">${rec.status || 'IN-SCOPE'}</span>
            </div>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
              ${renderMarkdown(rec.professor_response)}
            </div>
            <button class="settings-action-btn modal-ask-btn" data-q="${rec.student_question}">
              💬 Discuss in Chat
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  body.querySelectorAll('.modal-ask-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-q');
      modal.classList.remove('open');
      sendQuestionToChat(q);
    });
  });

  modal.classList.add('open');
}


  // ==========================================
  // MODULE: frontend/js/tabs/history.js
  // ==========================================
/**
 * History Tab View — Professor Stand-In
 * Faithfully mirrors Wireframe 3: Search bar, Today/This Week/Older time filters, and Conversation Rows with Delete
 */




let currentTimeFilter = "All";
let historySearchQuery = "";

function initHistoryView() {
  const container = document.getElementById('tab-history');
  if (!container) return;

  const history = storage.getHistory();

  container.innerHTML = `
    <div class="tab-view-wrapper">
      <!-- Wireframe 3 Top Bar: Search on left, Time filters on right -->
      <div class="history-top-bar">
        <div class="search-bar-wrapper history-search-flex">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="history-search-input" 
            class="search-input" 
            placeholder="Search past questions and answers..." 
            value="${historySearchQuery}"
          />
        </div>

        <div class="history-time-filters">
          <button class="filter-pill ${currentTimeFilter === 'All' ? 'active' : ''}" data-time="All">All</button>
          <button class="filter-pill ${currentTimeFilter === 'Today' ? 'active' : ''}" data-time="Today">Today</button>
          <button class="filter-pill ${currentTimeFilter === 'This Week' ? 'active' : ''}" data-time="This Week">This Week</button>
          <button class="filter-pill ${currentTimeFilter === 'Older' ? 'active' : ''}" data-time="Older">Older</button>
        </div>
      </div>

      <!-- Main History Container Card -->
      <div id="history-list-container">
        ${renderHistoryList(history)}
      </div>
    </div>
  `;

  // Bind Search
  const searchInput = container.querySelector('#history-search-input');
  searchInput.addEventListener('input', (e) => {
    historySearchQuery = e.target.value.toLowerCase().trim();
    refreshHistoryRows();
  });

  // Bind Time Filters
  container.querySelectorAll('.history-time-filters .filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.history-time-filters .filter-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      currentTimeFilter = btn.getAttribute('data-time');
      refreshHistoryRows();
    });
  });

  bindRowActions(container);
}

function renderHistoryList(history) {
  const filtered = filterHistory(history);

  if (filtered.length === 0) {
    return `
      <div class="history-empty-card">
        <div class="history-empty-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
        </div>
        <h3 style="font-size: 17px; font-weight: 600; color: var(--text-primary);">No past inquiries recorded</h3>
        <p style="font-size: 13.5px; color: var(--text-secondary); max-width: 400px;">
          When you ask Sir Muhammad Saleem questions in the Chat tab, they will be archived here for review.
        </p>
      </div>
    `;
  }

  return `
    <div class="history-card-container">
      ${filtered.map(item => {
        const dateObj = new Date(item.timestamp);
        const timeFormatted = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' at ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return `
          <div class="history-row" data-id="${item.id}" data-q="${escapeHtml(item.question)}">
            <div class="history-row-content">
              <span class="history-row-title">${escapeHtml(item.question)}</span>
              <div class="history-row-meta">
                <span>${timeFormatted}</span>
                <span>•</span>
                <span class="history-badge ${item.escalation ? 'escalated' : 'in-scope'}">
                  ${item.escalation ? 'Escalated' : 'Verified'}
                </span>
                ${item.sources && item.sources.length ? `<span>• ${item.sources.length} sources</span>` : ''}
              </div>
            </div>
            <div class="history-row-actions">
              <button class="history-delete-btn" data-delete-id="${item.id}" title="Delete this conversation" aria-label="Delete">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function filterHistory(history) {
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const sevenDays = 7 * oneDay;

  return history.filter(item => {
    if (currentTimeFilter !== "All") {
      const itemDate = new Date(item.timestamp);
      const diff = now - itemDate;

      if (currentTimeFilter === "Today" && diff > oneDay) return false;
      if (currentTimeFilter === "This Week" && (diff <= oneDay || diff > sevenDays)) return false;
      if (currentTimeFilter === "Older" && diff <= sevenDays) return false;
    }

    if (historySearchQuery) {
      const qMatch = (item.question || "").toLowerCase().includes(historySearchQuery);
      const aMatch = (item.answer || "").toLowerCase().includes(historySearchQuery);
      return qMatch || aMatch;
    }

    return true;
  });
}

function refreshHistoryRows() {
  const container = document.getElementById('history-list-container');
  if (!container) return;
  const history = storage.getHistory();
  container.innerHTML = renderHistoryList(history);
  bindRowActions(document.getElementById('tab-history'));
}

function bindRowActions(container) {
  container.querySelectorAll('.history-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('.history-delete-btn')) return;
      const question = row.getAttribute('data-q');
      if (question) {
        sendQuestionToChat(question);
      }
    });
  });

  container.querySelectorAll('.history-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-delete-id');
      if (id) {
        storage.deleteConversation(id);
        refreshHistoryRows();
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


  // ==========================================
  // MODULE: frontend/js/tabs/about.js
  // ==========================================
/**
 * About / System Architecture Tab View — Professor Stand-In
 * Faithfully mirrors Wireframe 4: 5-Stage Pipeline, Professor Card, System Scope, and Left Green Accent Banner
 */




async function initAboutView() {
  const container = document.getElementById('tab-about');
  if (!container) return;

  const status = await api.checkStatus();

  container.innerHTML = `
    <div class="tab-view-wrapper">
      <!-- 1. Top Card: 5-Step Process Pipeline Flow -->
      <div class="pipeline-card">
        <h2 style="font-family: var(--font-serif); font-size: 19px; font-weight: 600; margin-bottom: 6px;">
          The Stand-In Intelligence Pipeline
        </h2>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;">
          How student inquiries are verified against approved professor interviews rather than ungrounded AI hallucinations.
        </p>

        <div class="pipeline-flow" role="region" aria-label="5-step RAG Pipeline">
          <div class="pipeline-step">
            <div class="pipeline-pill">1. Prof Knowledge</div>
          </div>
          <div class="pipeline-arrow">➔</div>

          <div class="pipeline-step">
            <div class="pipeline-pill">2. Structured Data</div>
          </div>
          <div class="pipeline-arrow">➔</div>

          <div class="pipeline-step">
            <div class="pipeline-pill">3. Retrieval (RAG)</div>
          </div>
          <div class="pipeline-arrow">➔</div>

          <div class="pipeline-step">
            <div class="pipeline-pill">4. AI Response</div>
          </div>
          <div class="pipeline-arrow">➔</div>

          <div class="pipeline-step">
            <div class="pipeline-pill">5. Student UI</div>
          </div>
        </div>

        <div class="step-details-box">
          <span style="font-size: 16px;">💡</span>
          <span><strong>Grounding Principle:</strong> If a student's question lacks approved entries in the dataset, the system escalates directly rather than fabricating policy or grades.</span>
        </div>
      </div>

      <!-- 2. Middle Row: 2 Columns (Professor Profile & System Guardrails) -->
      <div class="about-grid-2col">
        <!-- Left: Professor Credentials Card (Wireframe Mortarboard Icon) -->
        <div class="about-card">
          <div class="about-card-header">
            <div class="about-card-icon">
              <svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>
            </div>
            <div>
              <h3 class="about-card-title mentor-name-text">${CONFIG.PROFESSOR.name}</h3>
              <span style="font-size: 12px; color: var(--text-secondary);">Faculty Profile & Scope</span>
            </div>
          </div>

          <div class="prof-info-list">
            <div class="prof-info-row">
              <span class="prof-info-label">Subject:</span>
              <span class="mentor-subject-text">${CONFIG.PROFESSOR.subject}</span>
            </div>
            <div class="prof-info-row">
              <span class="prof-info-label">Institution:</span>
              <span class="mentor-institution-text">${CONFIG.PROFESSOR.institution}</span>
            </div>
            <div class="prof-info-row">
              <span class="prof-info-label">Department:</span>
              <span>${CONFIG.PROFESSOR.department}</span>
            </div>
            <div class="prof-info-row">
              <span class="prof-info-label">Office Hours:</span>
              <span>${CONFIG.PROFESSOR.officeHours}</span>
            </div>
            <div class="prof-info-row">
              <span class="prof-info-label">Faculty Office:</span>
              <span>${CONFIG.PROFESSOR.office}</span>
            </div>
          </div>
        </div>

        <!-- Right: System Guardrails & Capabilities (Wireframe Node-Tree Icon) -->
        <div class="about-card">
          <div class="about-card-header">
            <div class="about-card-icon">
              <svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            <div>
              <h3 class="about-card-title">Architecture & Status</h3>
              <span style="font-size: 12px; color: var(--text-secondary);">System Boundaries & LLM Layer</span>
            </div>
          </div>

          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
            FastAPI backend coupled with local Ollama llama3.2 inference and deterministic dataset token retrieval.
          </p>

          <div class="prof-info-list" style="margin-bottom: 16px;">
            <div class="prof-info-row">
              <span class="prof-info-label">API Health:</span>
              <span style="color: ${status.online ? 'var(--status-verified)' : 'var(--status-warning)'}; font-weight: 600;">
                ● ${status.online ? 'Online (FastAPI 0.141)' : 'Offline / Standalone fallback'}
              </span>
            </div>
            <div class="prof-info-row">
              <span class="prof-info-label">Dataset:</span>
              <span>${CONFIG.PROFESSOR.verifiedDatasetSize} Approved Interview Entries</span>
            </div>
            <div class="prof-info-row">
              <span class="prof-info-label">Model Fallback:</span>
              <span>Authentic Direct Response Mode Active</span>
            </div>
          </div>

          <!-- Wireframe 4 Badges underneath -->
          <div class="about-pills-row">
            <span class="about-subpill">Verified Sources</span>
            <span class="about-subpill">Strict Boundaries</span>
            <span class="about-subpill">Escalation Guard</span>
            <span class="about-subpill">Ollama / Fallback</span>
          </div>
        </div>
      </div>

      <!-- 3. Bottom Banner: Full-width callout with Left Green Accent Bar -->
      <div class="bottom-boundary-banner">
        <div>
          <p class="bottom-banner-quote">
            “I can teach, explain, clarify and guide — but I don't impersonate the professor in decisions that require the professor's personal judgment.”
          </p>
          <div style="font-size: 12px; color: var(--text-secondary); margin-top: 6px;">
            Core Escalation Principle • Sir Muhammad Saleem Knowledge Base Policy
          </div>
        </div>
      </div>
    </div>
  `;
}


  // ==========================================
  // MODULE: frontend/js/tabs/settings.js
  // ==========================================
/**
 * Settings Tab View — Professor Stand-In
 * Faithfully mirrors Wireframe 5: 6 Configuration Rows with Toggles, Profile, and Data Reset
 */



function initSettingsView() {
  const container = document.getElementById('tab-settings');
  if (!container) return;

  const currentTheme = storage.getTheme();
  const notificationsEnabled = storage.getNotifications();
  const student = storage.getStudentProfile();

  container.innerHTML = `
    <div class="tab-view-wrapper">
      <div style="text-align: center; margin-bottom: 8px;">
        <h2 style="font-family: var(--font-serif); font-size: 24px; font-weight: 600;">System Preferences</h2>
        <p style="font-size: 13.5px; color: var(--text-secondary);">Manage your session, interface theme, and local academic cache.</p>
      </div>

      <!-- Exact Wireframe 5 Settings Card with 6 Rows -->
      <div class="settings-card">
        <!-- Row 1: Profile -->
        <div class="settings-row">
          <div class="settings-row-left">
            <div class="settings-row-icon">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div class="settings-row-text">
              <span class="settings-row-label">Student Profile</span>
              <span class="settings-row-desc" id="profile-display">${escapeHtml(student.name)} (${escapeHtml(student.id)})</span>
            </div>
          </div>
          <button id="edit-profile-btn" class="settings-action-btn">Edit Details</button>
        </div>

        <!-- Row 2: Appearance / Theme -->
        <div class="settings-row">
          <div class="settings-row-left">
            <div class="settings-row-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            </div>
            <div class="settings-row-text">
              <span class="settings-row-label">Dark Theme</span>
              <span class="settings-row-desc">Switch between warm parchment cream and dark espresso palette</span>
            </div>
          </div>
          <label class="toggle-switch" aria-label="Toggle dark mode">
            <input type="checkbox" id="theme-toggle-input" ${currentTheme === 'dark' ? 'checked' : ''} />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <!-- Row 3: Sound & Notifications -->
        <div class="settings-row">
          <div class="settings-row-left">
            <div class="settings-row-icon">
              <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <div class="settings-row-text">
              <span class="settings-row-label">Response Sound Alerts</span>
              <span class="settings-row-desc">Play a subtle academic chime when answer generation completes</span>
            </div>
          </div>
          <label class="toggle-switch" aria-label="Toggle response chime">
            <input type="checkbox" id="notifications-toggle-input" ${notificationsEnabled ? 'checked' : ''} />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <!-- Row 4: Language -->
        <div class="settings-row">
          <div class="settings-row-left">
            <div class="settings-row-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div class="settings-row-text">
              <span class="settings-row-label">Language & Locale</span>
              <span class="settings-row-desc">Terminology and course syllabus language</span>
            </div>
          </div>
          <span class="filter-pill active" style="cursor: default;">English (US)</span>
        </div>

        <!-- Row 5: Help & Documentation -->
        <div class="settings-row">
          <div class="settings-row-left">
            <div class="settings-row-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <div class="settings-row-text">
              <span class="settings-row-label">Student Guide</span>
              <span class="settings-row-desc">How to ask effective OOP questions and understand boundaries</span>
            </div>
          </div>
          <button id="view-guide-btn" class="settings-action-btn">View Guide</button>
        </div>

        <!-- Row 6: Clear History & Reset Data -->
        <div class="settings-row">
          <div class="settings-row-left">
            <div class="settings-row-icon">
              <svg viewBox="0 0 24 24" style="color: var(--status-escalate);"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </div>
            <div class="settings-row-text">
              <span class="settings-row-label">Clear Conversation History</span>
              <span class="settings-row-desc">Remove all cached question threads and citations from this browser</span>
            </div>
          </div>
          <button id="clear-data-btn" class="settings-action-btn danger">Clear History</button>
        </div>
      </div>
    </div>
  `;

  // Bind Theme Toggle
  const themeToggle = container.querySelector('#theme-toggle-input');
  themeToggle.addEventListener('change', (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    storage.setTheme(newTheme);
  });

  // Bind Notifications Toggle
  const notifToggle = container.querySelector('#notifications-toggle-input');
  notifToggle.addEventListener('change', (e) => {
    storage.setNotifications(e.target.checked);
  });

  // Bind Clear History
  const clearBtn = container.querySelector('#clear-data-btn');
  clearBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear your conversation history? This cannot be undone.")) {
      storage.clearAllHistory();
      alert("Conversation history cleared.");
    }
  });

  // Bind Edit Profile
  const editProfileBtn = container.querySelector('#edit-profile-btn');
  editProfileBtn.addEventListener('click', () => {
    const newName = prompt("Enter your Name or Alias:", student.name);
    if (newName) {
      student.name = newName.trim();
      storage.setStudentProfile(student);
      const display = container.querySelector('#profile-display');
      if (display) display.textContent = `${student.name} (${student.id})`;
    }
  });

  // Bind View Guide
  const guideBtn = container.querySelector('#view-guide-btn');
  guideBtn.addEventListener('click', () => {
    alert(
      "Professor Stand-In Guide:\n\n" +
      "1. IN-SCOPE: Ask about course policies, OOP definitions, polymorphism analogies, assignment requirements, and debugging advice.\n\n" +
      "2. BOUNDARIES: The Stand-In will NOT alter grades, approve extensions, or do assignments for you.\n\n" +
      "3. RETRIEVAL: Answers cite actual interview entries from Sir Muhammad Saleem."
    );
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


  // ==========================================
  // APP ROUTER & INITIALIZATION
  // ==========================================
  let currentTab = 'home';

  function switchToTab(tabId) {
    currentTab = tabId;

    // 1. Update navigation items (wireframe capsule pill)
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 2. Update visible pane
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    const activePane = document.getElementById('tab-' + tabId);
    if (activePane) {
      activePane.classList.add('active');
    }

    // 3. Re-render views that depend on state
    if (tabId === 'history') {
      initHistoryView();
    } else if (tabId === 'knowledge') {
      initKnowledgeView();
    } else if (tabId === 'about') {
      initAboutView();
    } else if (tabId === 'settings') {
      initSettingsView();
    }
  }

  // Global window exposure for inter-tab triggers
  window.switchToTab = switchToTab;
  window.sendQuestionToChat = sendQuestionToChat;

  document.addEventListener('DOMContentLoaded', async () => {
    // 1. Theme Initialization
    const initialTheme = storage.getTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 2. Sidebar Navigation Items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.getAttribute('data-tab');
        if (tab) switchToTab(tab);
      });
    });

    // 3. Profile & Logo modal bindings
    const avatarBtn = document.getElementById('sidebar-avatar-btn');
    const logoBtn = document.getElementById('sidebar-logo-btn');
    const profModal = document.getElementById('prof-profile-modal');
    const profModalClose = document.getElementById('prof-modal-close');

    const openProfModal = () => {
      if (profModal) profModal.classList.add('open');
    };

    if (avatarBtn) avatarBtn.addEventListener('click', openProfModal);
    if (logoBtn) logoBtn.addEventListener('click', () => switchToTab('home'));
    if (profModalClose) profModalClose.addEventListener('click', () => profModal.classList.remove('open'));
    if (profModal) {
      profModal.addEventListener('click', (e) => {
        if (e.target === profModal) profModal.classList.remove('open');
      });
    }

    // 4. Initialize All Tabs
    initHomeView();
    initChatView();
    await initKnowledgeView();
    initHistoryView();
    await initAboutView();
    initSettingsView();

    // 5. Backend Status Heartbeat
    checkBackendHealth();
    setInterval(checkBackendHealth, 30000);
  });

  async function checkBackendHealth() {
    const statusChip = document.getElementById('backend-status-chip');
    const statusText = document.getElementById('backend-status-text');
    const statusDot = document.getElementById('backend-status-dot');

    try {
      const status = await api.checkStatus();
      if (status.online) {
        if (statusDot) statusDot.className = 'status-dot';
        if (statusText) statusText.textContent = `API Online (${status.records || 30} records)`;
      } else {
        if (statusDot) statusDot.className = 'status-dot offline';
        if (statusText) statusText.textContent = 'Standalone Mode (30 records)';
      }
    } catch (e) {
      if (statusDot) statusDot.className = 'status-dot offline';
      if (statusText) statusText.textContent = 'Offline Mode';
    }
  }

})();
