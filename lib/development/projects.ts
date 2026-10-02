import type { DevelopmentProject } from "./types";

/**
 * Authoritative normalized data store for software development projects.
 * Sourced directly from docs/dev-md/ and showcase media in public/dev/.
 */
export const developmentProjects: DevelopmentProject[] = [
  // ==========================================
  // CLIENT SYSTEMS
  // ==========================================
  {
    slug: "sk-balite-plus",
    number: "01",
    title: "SK Balite Plus",
    shortTitle: "SK Balite Plus",
    client: "Sangguniang Kabataan & Barangay Balite",
    type: "client",
    eyebrow: "CLIENT SYSTEM — YOUTH & EVENT OPERATIONS PLATFORM",
    tagline: "Full-stack barangay youth engagement, live attendance, and digital administration.",
    summary:
      "A modern full-stack web platform and PWA designed to streamline Sangguniang Kabataan and barangay youth operations. Centralizes event management, live Supabase Realtime attendance, tokenized guest access, digital certificates, evaluations, sports festival leaderboards, and gamified community rewards.",
    role: "Lead Full-Stack Developer & UI/UX Designer",
    status: "Active Development",
    year: "2025–2026",
    coverImage: "/dev/sk-balite-plus-standee.png",
    coverAlt: "SK Balite Plus event standee and platform preview",
    coverFit: "cover",
    coverPosition: "object-top",
    heroMediaMode: "full-bleed",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Supabase Realtime",
    ],
    stackGroups: [
      {
        label: "Frontend & UI",
        items: ["Next.js 15 (App Router)", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui / Radix UI", "PWA"],
      },
      {
        label: "Backend & Database",
        items: ["Supabase", "PostgreSQL", "PostgreSQL RPC Functions", "Next.js Server Actions", "Row Level Security (RLS)"],
      },
      {
        label: "Realtime & Services",
        items: ["Supabase Realtime", "Supabase Storage", "Resend (Transactional Email)", "Supabase Auth"],
      },
      {
        label: "Infrastructure & Edge",
        items: ["Vercel", "Cloudflare DNS / Edge", "Git / GitHub"],
      },
    ],
    highlights: [
      {
        title: "18 → 1 Dashboard Round-Trip RPC Optimization",
        description:
          "Consolidated an initial 18 separate PostgREST queries per admin dashboard load into a single optimized PostgreSQL RPC function, aggregating attendance metrics and trend graphs database-side.",
      },
      {
        title: "Live Attendance with Database Pagination",
        description:
          "Engineered live event attendance leveraging Supabase Realtime for operational check-in/out updates while enforcing database-level pagination on large participant registries.",
      },
      {
        title: "Tokenized Guest Access Architecture",
        description:
          "Implemented secure server-side session and tokenized guest access flows, allowing non-registered participants to check in, evaluate events, and receive certificates without exposing auth credentials.",
      },
      {
        title: "Domain-Based Architecture & Shared Caching",
        description:
          "Structured feature domains with domain-tagged runtime cache invalidation for stable configuration data (categories, venues) while keeping identity and auth state verified against live database state.",
      },
    ],
    features: [
      "Admin Dashboard with PostgreSQL RPC metrics aggregation",
      "Live Event Attendance with Supabase Realtime synchronization",
      "Secure Guest Attendance Portal with tokenized access",
      "Authenticated Resident Portal with point rewards and QR attendance",
      "Digital Certificate Generator with Creative Studio design selection",
      "Event Evaluation Forms with database-level response pagination",
      "Sports Festival / Olympics Module with cached live leaderboards",
      "Raffle draw engine optimized against N+1 query patterns",
      "Katipunan ng Kabataan (KK) youth demographic profiling",
      "Administrative Participation & Demographic Reports",
    ],
    problem:
      "Barangay and SK youth initiatives traditionally depended on disconnected spreadsheets, paper sign-in sheets, manual certificate formatting, and unorganized social media messaging, leading to lost participant records and slow administrative reporting.",
    solution:
      "Engineered an integrated web application and PWA centralizing registration, attendance, evaluations, certificates, and youth records into one unified database with server-enforced role-based access control.",
    architecture:
      "Next.js App Router and React Server Components communicating with Supabase PostgreSQL via Server Actions and stored RPC procedures, with Cloudflare edge protection and Supabase Realtime event channels.",
    architectureSteps: [
      "Browser / Mobile PWA",
      "Cloudflare Edge Layer",
      "Vercel (Next.js 15 Server Components & Actions)",
      "Supabase (Auth, PostgreSQL RLS, RPCs, Realtime)",
    ],
    challengeSections: [
      {
        title: "Admin Dashboard Query Overhead",
        body: "Initial dashboard rendering triggered 18 separate PostgREST requests. Resolved by developing a unified PostgreSQL stored procedure that executes aggregations directly in the database engine, returning a single structured JSON payload.",
      },
      {
        title: "High-Volume Attendance Table Scalability",
        body: "Replaced client-side array filtering with server-side pagination and query pushdown, omitting heavy base64 signatures from list payloads to maintain responsive sub-100ms transitions during active events.",
      },
    ],
    privacySecurity:
      "Enforces server-side authorization guards and PostgreSQL Row Level Security (RLS). Secret service-role keys remain strictly on the server; guest sessions use secure HTTP-only cookies and token verification.",
    testing: "45 targeted automated regression tests covering cache safety, RPC integrity, and auth boundaries.",
    liveUrl: "https://skbaliteplus.site",
    sourceDoc: "docs/dev-md/SK_Balite_Plus_Portfolio_Showcase.md",
    featured: true,
  },
  {
    slug: "learnmca",
    number: "02",
    title: "LearnMCA",
    shortTitle: "LearnMCA",
    client: "Maranatha Christian Academy Foundation",
    type: "client",
    eyebrow: "CLIENT SYSTEM — SCHOOL MANAGEMENT & AI",
    tagline: "AI-enhanced full-stack school management system integrating enrollment, academics, LMS, payments, attendance, communication, and intelligent analytics.",
    summary:
      "A full-stack school management platform built for Maranatha Christian Academy Foundation. Centralizes enrollment, student and personnel records, academic management, teacher assignments, spreadsheet-style grading, payments, RFID attendance, school services, learning resources, communication, and AI-assisted analytics in one institutional system. Features an integrated LMS with interactive activities and quizzes, offline grade entry with sync resilience, and multi-channel notifications.",
    role: "Lead Full-Stack Developer & System Architect",
    status: "Active Development",
    year: "2024–2026",
    coverImage: "/dev/learn-mca.png",
    coverAlt: "LearnMCA School Management System Interface",
    coverFit: "cover",
    coverPosition: "object-top",
    heroMediaMode: "full-bleed",
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "PHP (LavaLust MVC)",
      "MySQL",
      "LMS & Offline Sync",
      "RFID Attendance",
      "AI & Analytics",
      "Tailwind CSS",
    ],
    stackGroups: [
      {
        label: "Frontend & UI",
        items: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "TanStack Query", "Zustand", "Recharts"],
      },
      {
        label: "Backend & Core",
        items: ["PHP", "LavaLust 4.2.5 MVC", "REST-style API", "JWT & Session Auth", "Custom Security Helpers", "Offline Sync Engine"],
      },
      {
        label: "Database & Storage",
        items: ["MySQL (Relational Schema)", "Indexed Queries", "Normalized Academic Models"],
      },
      {
        label: "Attendance & Hardware",
        items: ["Hardware RFID Integration", "Email Notification API", "SMS Dispatch API", "Session Matching"],
      },
      {
        label: "AI & Intelligent Analytics",
        items: ["AI Chatbot Integration", "Model-Driven Predictive Analytics", "Semantic & Sentiment Analysis", "Model Inference Services", "Hugging Face"],
      },
      {
        label: "Infrastructure",
        items: ["Hostinger Shared Hosting", "Cloudflare", "Git / GitHub"],
      },
    ],
    highlights: [
      {
        title: "Unified School Operations",
        description:
          "Designed a single institutional data model connecting enrollment, academics, personnel, grades, payments, attendance, LMS activity, and school services.",
      },
      {
        title: "LMS + Academic Grade Synchronization",
        description:
          "Built learning workflows where teachers can publish modules, upload materials, create interactive quizzes and activities, then synchronize LMS-generated results into official academic grade records alongside manual grading.",
      },
      {
        title: "Offline-First Grade Entry",
        description:
          "Implemented resilient grade-entry workflows that allow teachers to continue recording grades during connectivity interruptions and synchronize queued changes once a connection is restored.",
      },
      {
        title: "RFID Attendance + Notifications",
        description:
          "Integrated RFID-based entry and exit attendance with administrative monitoring and automated parent notification workflows through email and SMS.",
      },
      {
        title: "AI-Assisted School Intelligence",
        description:
          "Integrated chatbot assistance, predictive analytics, and semantic/sentiment analysis to help users interpret institutional information and surface useful planning insights.",
      },
    ],
    features: [
      "Online & manual enrollment with approval workflows and transferee tracking",
      "Spreadsheet-style teacher grade entry for rapid class-level encoding",
      "LMS module management with teacher-uploaded digital learning materials",
      "Interactive quizzes and learning activities with automated result capture",
      "LMS-to-academic grade synchronization alongside manual grading workflows",
      "Offline-capable grade entry with automatic synchronization on reconnect",
      "Academic period, subject curriculum, section, and advisory class management",
      "Role-based portals for Admins, Teachers, Students, and Personnel",
      "Hardware RFID gate attendance with entry/exit session detection",
      "Automated multi-channel attendance notifications via Email and SMS",
      "Tuition ledgering, flexible installment plans, and financial reporting",
      "School services management including uniform orders and service requests",
      "School-wide and section-targeted announcement broadcast system",
      "Student concern & administrative ticketing with communication history",
      "AI-Powered Academic Chatbot for conversational institutional guidance",
      "Model-Driven Predictive Analytics for enrollment & revenue trend projections",
      "Semantic & Sentiment Analysis on student inquiries and feedback tickets",
      "Administrative summary and institutional compliance reporting",
    ],
    problem:
      "School operations are often fragmented across enrollment forms, spreadsheets, paper attendance logs, payment records, messaging tools, and separate learning platforms. This creates duplicated data, inconsistent records, slow administrative work, and disconnects between classroom activities and official academic records.",
    solution:
      "Engineered a unified school-management architecture that connects administrative operations, classroom workflows, financial records, learning resources, attendance, communication, and AI-assisted decision support through one role-based platform.",
    architecture:
      "Decoupled React/TypeScript Single Page Application communicating via REST endpoints with a PHP LavaLust MVC backend on MySQL, structured across core operational domains (Enrollment, LMS, Grading, Payments, RFID Attendance, Services, Announcements) with an AI intelligence layer handling conversational assistance, forward-looking predictive analytics, and sentiment processing.",
    architectureSteps: [
      "React 18 / TypeScript Frontend",
      "REST API & Auth Layer",
      "PHP LavaLust Backend (Domain Services)",
      "MySQL Institutional Database",
      "AI Layer (Chatbot, Predictive Analytics, Sentiment)",
    ],
    challengeSections: [
      {
        title: "LMS and Academic Grade Synchronization with Offline Resilience",
        body: "Engineered a spreadsheet-style grade entry interface with offline resilience allowing teachers to continue recording marks during network drops and sync later, alongside bidirectional synchronization connecting interactive LMS quiz scores into formal quarterly grade reports.",
      },
      {
        title: "Protecting Student Data in AI Workflows",
        body: "Enforced strict payload sanitization before sending queries to external model inference services, ensuring student PII (names, IDs, addresses, payment details) is excluded before external model processing.",
      },
    ],
    privacySecurity:
      "Includes login rate limiting (5 attempts / 5-minute lockout), password hashing, JWT bearer protection on APIs, role-based backend guards, and zero student PII transmission to external model services.",
    liveUrl: "https://learnmca.online",
    sourceDoc: "docs/dev-md/mca-markdown.txt",
    featured: false,
  },
  {
    slug: "lrms",
    number: "03",
    title: "LRMS",
    shortTitle: "LRMS",
    client: "Adriatico Memorial School",
    type: "client",
    eyebrow: "CLIENT SYSTEM — CURRICULUM & RESOURCE MANAGEMENT",
    tagline: "Centralized learning resource repository, curriculum management, and SBM governance.",
    summary:
      "A server-rendered Django educational management system developed for Adriatico Memorial School. Centralizes curriculum management, teaching assignments, digital learning resource evaluation and approval workflows, and School-Based Management (SBM) document compliance.",
    role: "Primary Developer / Project Lead (~80% Development Contribution)",
    status: "Active Development",
    year: "2024–2026",
    coverImage: "/dev/lrms-dev.png",
    coverAlt: "Learning Resource Management System Dashboard Interface",
    coverFit: "cover",
    stack: [
      "Python",
      "Django",
      "Django ORM",
      "JavaScript",
      "HTML5",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    stackGroups: [
      {
        label: "Backend & Core",
        items: ["Python", "Django 5", "Django ORM", "Server-Rendered Architecture", "Django Authentication"],
      },
      {
        label: "Database & Storage",
        items: ["PostgreSQL", "Django Migrations", "Media File Management", "Relational Resource Schemas"],
      },
      {
        label: "Frontend & UI",
        items: ["HTML5", "Tailwind CSS", "JavaScript", "Custom Component System"],
      },
      {
        label: "Governance & RBAC",
        items: ["Role-Based Access Control", "Resource Approval Lifecycle", "School-Based Management (SBM)"],
      },
    ],
    highlights: [
      {
        title: "Primary Developer & Architectural Lead",
        description:
          "Initiated the LRMS platform and engineered approximately 80% of the system across backend architecture, database modeling, frontend UI/UX, and domain business logic.",
      },
      {
        title: "Digital Resource Approval Workflow",
        description:
          "Designed multi-tier review workflows where learning materials submitted by educators undergo structured evaluation, revision requests, and administrative approval before publication.",
      },
      {
        title: "School-Based Management (SBM) Evidence System",
        description:
          "Built a structured compliance repository for organizing, tagging, and auditing institutional School-Based Management documents against standard educational benchmarks.",
      },
      {
        title: "Curriculum & Teaching Assignment Modeling",
        description:
          "Structured relational schemas linking grade levels, subject curricula, teacher assignments, and classroom resources with relational integrity checks.",
      },
    ],
    features: [
      "Centralized user and workforce directory with granular RBAC",
      "Student enrollment tracking and grade-level class assignments",
      "Teacher subject assignments and advisory management",
      "Curriculum structure mapping with grade-to-subject associations",
      "Learning resource repository with categorized digital uploads",
      "Multi-step resource evaluation and administrative approval pipeline",
      "School-Based Management (SBM) artifact organization and verification",
      "Strict data integrity protections on prerequisite records",
      "Responsive, clean UI design system tailored for school staff",
      "Audit logs for resource status changes and approvals",
    ],
    problem:
      "Public schools frequently face scattered instructional materials, lost lesson resources across personal flash drives, and chaotic manual document compilation during annual School-Based Management audits.",
    solution:
      "Developed a centralized Django web application that organizes curriculum materials, enforces peer/supervisor resource reviews, and maintains institutional memory.",
    architecture:
      "Server-rendered Django application with Django ORM querying a normalized PostgreSQL database, utilizing session-based authentication and role-based permissions.",
    architectureSteps: [
      "Client Browser",
      "Django URL Router & Middleware",
      "Django Views & Forms (RBAC Guards)",
      "Django ORM",
      "PostgreSQL Database & Media Storage",
    ],
    challengeSections: [
      {
        title: "Multi-Tier Resource Approval Integrity",
        body: "Engineered state-machine-style resource workflows ensuring resources cannot bypass required evaluation steps or disappear while referenced by active curriculum records.",
      },
    ],
    privacySecurity:
      "Enforces Django session security, CSRF protection, role-based view decorators, and protected media access for restricted administrative documents.",
    sourceDoc: "docs/dev-md/lrms-md.txt",
    featured: false,
  },

  // ==========================================
  // PERSONAL PRODUCTS
  // ==========================================
  {
    slug: "vaultify",
    number: "04",
    title: "Vaultify",
    shortTitle: "Vaultify",
    type: "personal",
    eyebrow: "PERSONAL PRODUCT — LOCAL-FIRST MOBILE SECURITY",
    tagline: "Privacy-first, offline-first password manager with AES-GCM-256 local encryption.",
    summary:
      "A privacy-first, local-first hybrid mobile password manager built with Ionic Vue, TypeScript, and Capacitor. Encrypts sensitive credentials on-device using authenticated AES-GCM-256 and PBKDF2 key derivation, supporting master-password, six-digit quick PIN, and native biometric unlock without requiring a cloud account.",
    role: "Creator & Mobile Developer",
    status: "Active Development",
    year: "2025–2026",
    coverImage: "/dev/vaultify-app.png",
    coverAlt: "Vaultify Mobile Password Manager Application Screen",
    coverFit: "cover",
    coverPosition: "object-center",
    heroMediaMode: "full-bleed",
    stack: [
      "Ionic Vue 8",
      "Vue 3",
      "TypeScript",
      "Capacitor 6",
      "AES-GCM",
      "PBKDF2",
      "Web Crypto API",
    ],
    stackGroups: [
      {
        label: "Mobile & UI",
        items: ["Ionic Vue 8", "Vue 3 Composition API", "TypeScript", "Vite", "Pinia", "Custom Design System"],
      },
      {
        label: "Native & Runtime",
        items: ["Capacitor 6", "Capacitor Preferences", "Capgo Native Biometric", "Android Gradle"],
      },
      {
        label: "Cryptography & Security",
        items: ["Web Crypto API (SubtleCrypto)", "AES-GCM-256", "PBKDF2 + SHA-256", "zxcvbn-ts"],
      },
      {
        label: "DevOps & CI/CD",
        items: ["GitHub Actions", "Automated Android Release Builds", "APK / AAB Publishing"],
      },
    ],
    highlights: [
      {
        title: "Local-First Zero-Knowledge Architecture",
        description:
          "Vault data is encrypted locally using 256-bit AES-GCM before writing to device storage; core credential functionality operates completely offline without remote accounts or server dependencies.",
      },
      {
        title: "Multi-Tier Unlock around a Single Vault Key",
        description:
          "Engineered a unified vault key architecture that permits unlocking via master password, wrapped six-digit PIN, or native platform biometrics (fingerprint/Face ID) without storing plaintext passwords.",
      },
      {
        title: "Encrypted Portability & Backups",
        description:
          "Developed portable encrypted backup export and restore functionality, requiring the master password for decryption while excluding raw biometric secrets from backup payloads.",
      },
      {
        title: "Lifecycle-Aware Memory Protection",
        description:
          "Implemented automatic vault locking on app backgrounding and inactivity timeouts, purging sensitive decrypted credentials from in-memory state.",
      },
    ],
    features: [
      "Local authenticated AES-GCM-256 credential encryption",
      "Master password derivation via PBKDF2 + SHA-256 with high iterations",
      "Six-digit quick PIN unlock with attempt-lockout protection",
      "Native platform biometric unlock (Fingerprint / Face ID)",
      "Cryptographically secure password generator with character filters",
      "Password strength analysis powered by zxcvbn-ts",
      "Encrypted JSON backup export and password-authenticated restore",
      "Category organization, favorites tagging, and instant search",
      "Configurable inactivity auto-lock and background purge",
      "Automated Android release builds via GitHub Actions",
    ],
    problem:
      "Cloud password managers introduce third-party breach risks, mandatory subscription models, and privacy trade-offs for users who prefer keeping sensitive credentials strictly on their personal hardware.",
    solution:
      "Created a standalone, zero-cloud mobile application that keeps encryption keys and credentials securely contained on-device.",
    architecture:
      "Ionic Vue mobile client executing SubtleCrypto Web Crypto APIs for encryption/decryption, persisting encrypted blobs via Capacitor Preferences, with native platform biometric hooks.",
    architectureSteps: [
      "Master Password / PIN / Biometrics",
      "PBKDF2 Key Derivation / Unwrapping",
      "SubtleCrypto AES-GCM Engine",
      "Encrypted Vault Blob",
      "Capacitor Local Preferences Storage",
    ],
    challengeSections: [
      {
        title: "Balancing Convenience with True Offline Security",
        body: "Designed an encrypted key-wrapping scheme that allows quick PIN and biometric convenience while ensuring the underlying 256-bit vault key remains cryptographically sealed at all times.",
      },
    ],
    privacySecurity:
      "Zero cloud databases, zero telemetry tracking, and zero plain credential transmission. Web Crypto API ensures hardware-backed cryptographic execution.",
    repositoryUrl: "https://github.com/jczamora-git/VaultManager",
    sourceDoc: "docs/dev-md/vaultify.md",
    featured: true,
  },
  {
    slug: "jeizi-ocr",
    number: "05",
    title: "Jeizi OCR Controller",
    shortTitle: "Jeizi OCR Controller",
    type: "personal",
    eyebrow: "PERSONAL PRODUCT — BROADCAST AUTOMATION & COMPUTER VISION",
    tagline: "Real-time esports OCR and broadcast-telemetry engine for live tournament overlays.",
    summary:
      "A high-performance .NET 8 Windows desktop application that converts live video broadcast streams into structured telemetry in real time. Features multi-source capture (OBS Virtual Camera, capture cards, desktop), OpenCV preprocessing filters, local Tesseract OCR, noise rejection stabilization, and atomic TXT/JSON/HTTP output.",
    role: "Creator & Systems Engineer",
    status: "v2.0 Production",
    year: "2024–2026",
    coverImage: "/dev/jeizi-ocr.png",
    coverAlt: "Jeizi OCR Controller Windows Desktop Interface",
    coverFit: "cover",
    stack: [
      "C# 12",
      ".NET 8",
      "Windows Forms",
      "Tesseract 5.2",
      "OpenCV (OpenCvSharp 4)",
      "DirectShow",
      "Inno Setup",
    ],
    stackGroups: [
      {
        label: "Runtime & Language",
        items: ["C# 12", ".NET 8", "Windows Forms", "Self-Contained win-x64 Build"],
      },
      {
        label: "Computer Vision & OCR",
        items: ["OpenCvSharp 4 (OpenCV)", "Tesseract OCR 5.2", "DirectShowLib", "Custom Thresholding Algorithms"],
      },
      {
        label: "Telemetry & Integration",
        items: ["Atomic TXT File Output", "Atomic JSON State (live_ocr.json)", "HTTP Controller Push", "OBS Integration"],
      },
      {
        label: "Packaging & QA",
        items: ["43 Automated Component Test Suites", "Inno Setup Installer", "GitHub Actions CI/CD"],
      },
    ],
    highlights: [
      {
        title: "Hierarchical Scene & Virtual Source View Architecture",
        description:
          "Designed a Profile → Scene → Source View → OCR Field hierarchy allowing multiple isolated regions to process off a single capture stream, eliminating duplicate frame grabs.",
      },
      {
        title: "Computer Vision Preprocessing Pipeline",
        description:
          "Integrated OpenCV grayscale, contrast adjustment, Otsu thresholding, fixed thresholding, chromakey extraction, and morphological operations to clean broadcast graphics before OCR.",
      },
      {
        title: "Noise Rejection & Consecutive-Match Stabilization",
        description:
          "Engineered recognition stabilization requiring consecutive matching frames and whitespace sanitization, preventing bad video frames from corrupting live broadcast overlays.",
      },
      {
        title: "Atomic Multi-Format Broadcast Dispatch",
        description:
          "Implemented atomic batched TXT, JSON (`live_ocr.json`), and HTTP controller push pipelines to prevent partial reads or file-lock collisions with OBS and browser overlays.",
      },
    ],
    features: [
      "Multi-source capture: displays, windows, webcams, capture cards, OBS Virtual Camera",
      "Scene-based execution: only the active tournament scene consumes OCR processing",
      "Interactive region editor with draggable handles directly over live previews",
      "Specialized recognition modes for numbers, timers, decimals, and general text",
      "Esports tournament templates (kills, towers, gold, game timers, player statistics)",
      "OpenCV image filters: Otsu thresholding, contrast, chromakey, dilation/erosion",
      "Atomic TXT file writing for direct OBS text source integration",
      "Consolidated `live_ocr.json` output for browser-based broadcast graphics",
      "Direct HTTP telemetry streaming to external tournament control servers",
      "Automated 43-suite regression test framework (`dotnet run -- --test`)",
    ],
    problem:
      "Esports broadcasts require live scoreboard data to drive stream overlays, but manual operator data-entry is error-prone and official game publisher APIs are frequently unavailable or restricted.",
    solution:
      "Engineered an automated desktop computer vision system that captures live video frames, extracts critical visual regions, stabilizes OCR results, and dispatches clean data to overlays in real time.",
    architecture:
      "DirectShow and desktop capture pipelines feeding shared frame buffers to OpenCvSharp image filters and Tesseract 5.2 OCR, stabilized via consecutive-match queues and written atomically to disk or network endpoints.",
    architectureSteps: [
      "DirectShow / OBS Virtual Camera",
      "Source View Cropping",
      "OpenCV Preprocessing & Thresholding",
      "Tesseract 5.2 OCR Engine",
      "Consecutive-Match Stabilization",
      "Atomic TXT / JSON / HTTP Dispatch",
    ],
    challengeSections: [
      {
        title: "Preventing Stream Jitter from Transient Video Artifacts",
        body: "Built a consecutive-frame confirmation algorithm that rejects one-off frame anomalies, maintaining last-known-good values until new readings achieve statistical confidence.",
      },
      {
        title: "High Performance with Multiple Scoreboard Fields",
        body: "Reused a single shared frame capture buffer across all active source views and restricted OCR processing strictly to the active production scene.",
      },
    ],
    privacySecurity: "Entirely local desktop execution with zero cloud telemetry requirements.",
    testing: "43 automated component test suites verifying coordinate mapping, sanitization, scheduler timing, and atomic IO.",
    repositoryUrl: "https://github.com/jczamora-git/jeizi_ocr",
    sourceDoc: "docs/dev-md/jeizi-ocr.md",
    featured: false,
  },
  {
    slug: "autosnap",
    number: "06",
    title: "AutoSnap",
    shortTitle: "AutoSnap",
    type: "personal",
    eyebrow: "PERSONAL PRODUCT — DESKTOP AUTOMATION & LOCAL AI",
    tagline: "Windows capture utility with interval screenshotting and offline Whisper speech-to-text.",
    summary:
      "A privacy-first Windows desktop productivity application combining timed multi-source screen/browser capture, FFmpeg non-real-time video frame extraction, WASAPI system-audio loopback recording, and fully local Whisper speech-to-text transcription with mixed Taglish language support.",
    role: "Creator & Desktop Developer",
    status: "v1.2 Active Development",
    year: "2024–2026",
    coverImage: "/dev/auto-snap.png",
    coverAlt: "AutoSnap Desktop Capture & Transcription Interface",
    coverFit: "cover",
    stack: [
      "C# 12",
      ".NET 8",
      "Windows Forms",
      "Whisper.net",
      "NAudio (WASAPI)",
      "FFmpeg",
      "Inno Setup",
    ],
    stackGroups: [
      {
        label: "Runtime & UI",
        items: ["C# 12", ".NET 8", "Windows Forms", "System Tray Integration", "Self-Contained win-x64 Build"],
      },
      {
        label: "Audio & Speech AI",
        items: ["Whisper.net", "Local GGML Models", "NAudio", "WASAPI Loopback Capture", "Taglish Language Mode"],
      },
      {
        label: "Video Processing",
        items: ["FFmpeg / FFprobe Automation", "Non-Real-Time Seeking", "Interval Frame Extraction"],
      },
      {
        label: "Packaging & CI",
        items: ["Inno Setup Installer", "Portable ZIP Releases", "GitHub Actions CI/CD"],
      },
    ],
    highlights: [
      {
        title: "Offline Speech AI with Whisper.net",
        description:
          "Runs speech-to-text transcription entirely on local hardware using Whisper.net, keeping sensitive meetings, lectures, and audio recordings completely private.",
      },
      {
        title: "WASAPI Loopback System Audio Capture",
        description:
          "Captures desktop and browser audio streams directly through Windows WASAPI loopback with NAudio without requiring virtual audio cables or microphone bleed.",
      },
      {
        title: "Fast Non-Real-Time FFmpeg Video Extraction",
        description:
          "Extracts high-resolution snapshot sequences directly from video files via FFmpeg seek operations without requiring real-time video playback.",
      },
      {
        title: "Taglish Language Support & Crash-Resistant Sessions",
        description:
          "Includes specialized recognition modes for mixed Filipino-English dialogue and enforces a 30-second transcript autosave interval to protect long recordings.",
      },
    ],
    features: [
      "Timed screenshot capture for windows, full displays, and browser tabs",
      "Native browser-tab capture using getDisplayMedia sharing permissions",
      "Background system-tray execution with minimal CPU footprint",
      "FFmpeg-powered interval snapshot and frame extraction from video files",
      "WASAPI desktop loopback audio recording with zero microphone noise",
      "Offline Whisper transcription supporting English, Tagalog, and Taglish",
      "Local Whisper Model Manager supporting Tiny, Base, Small, Medium, and Turbo",
      "Hardware-aware model recommendations matching system CPU and RAM specs",
      "Built-in transcript editor with TXT, SRT, and VTT subtitle export",
      "Periodic 30-second autosave transcript recovery for uninterrupted sessions",
    ],
    problem:
      "Documenting long technical meetings, online classes, and video presentations typically forces users to send proprietary audio and screen recordings to cloud transcription services with recurring costs and privacy risks.",
    solution:
      "Created a unified Windows utility that records screens, captures internal desktop audio, and processes speech-to-text locally on-device.",
    architecture:
      ".NET 8 desktop core orchestrating NAudio WASAPI stream recording, FFmpeg CLI subprocesses, and Whisper.net inference models with local disk storage.",
    architectureSteps: [
      "Screen / Window / WASAPI Audio Capture",
      "NAudio Buffer / FFmpeg Process",
      "Whisper.net Local AI Inference",
      "Transcript Recovery Engine (30s Autosave)",
      "Local Output (Images, TXT, SRT, VTT)",
    ],
    challengeSections: [
      {
        title: "Managing Large Whisper Model Execution on Consumer PCs",
        body: "Implemented a hardware-aware Whisper model recommendation engine that benchmarks available system memory and threads to prevent out-of-memory crashes.",
      },
    ],
    privacySecurity: "Strictly offline local media processing with zero cloud transmission.",
    repositoryUrl: "https://github.com/jczamora-git/AutoSnap",
    sourceDoc: "docs/dev-md/autosnap.md",
    featured: false,
  },
  {
    slug: "retrv",
    number: "07",
    title: "Retrv",
    shortTitle: "Retrv",
    type: "personal",
    eyebrow: "PERSONAL PRODUCT — COMMUNITY LOST & FOUND PLATFORM",
    tagline: "Community-powered Lost & Found mobile platform with realtime messaging and push alerts.",
    summary:
      "A hybrid mobile community application built with Ionic Vue, TypeScript, Capacitor, and Supabase. Transforms isolated lost-item posts into structured, collaborative recovery workflows with location tagging, public discussion threads, Supabase Realtime private chat, community merit awards, UploadThing media handling, and Firebase Cloud Messaging (FCM) push notifications.",
    role: "Creator & Full-Stack Mobile Developer",
    status: "Active Development",
    year: "2025–2026",
    coverImage: "/dev/retrv-app.png",
    coverAlt: "Retrv Lost and Found Community Mobile App Interface",
    coverFit: "cover",
    coverPosition: "object-center",
    heroMediaMode: "full-bleed",
    stack: [
      "Ionic Vue 9",
      "Vue 3.5",
      "TypeScript",
      "Capacitor 8",
      "Supabase",
      "PostgreSQL",
      "Firebase (FCM)",
    ],
    stackGroups: [
      {
        label: "Mobile & Frontend",
        items: ["Ionic Vue 9", "Vue 3.5", "TypeScript", "Capacitor 8", "Reka UI", "Tailwind CSS"],
      },
      {
        label: "Backend & Database",
        items: ["Supabase", "PostgreSQL", "RLS-Enabled Tables", "Supabase Realtime", "Supabase Auth"],
      },
      {
        label: "Push & Media",
        items: ["Firebase Cloud Messaging (FCM)", "Supabase Edge Functions", "UploadThing Media API"],
      },
      {
        label: "Quality & Testing",
        items: ["Vitest (Unit)", "Cypress (E2E)", "GitHub Actions"],
      },
    ],
    highlights: [
      {
        title: "Social Recovery Workflow Architecture",
        description:
          "Structured the entire lost-and-found lifecycle: Structured Report → Public Sightings Discussion → Supabase Realtime Private Coordination → Resolved Handoff → Community Merit Award.",
      },
      {
        title: "Realtime Private Chat & Notifications",
        description:
          "Integrated database-backed direct messaging using Supabase Realtime channels with unread counters and automated mobile push notifications via Firebase Cloud Messaging (FCM).",
      },
      {
        title: "Community Merit & Reputation Mechanics",
        description:
          "Designed a trust system where item owners reward successful recovery helpers with durable merit points and achievement badges displayed on member profiles.",
      },
      {
        title: "Structured Data Modeling & Categorization",
        description:
          "Modeled structured lost/found entries with category hierarchies, location landmarks, coordinate points, and resolution timestamps for precise filtering.",
      },
    ],
    features: [
      "Structured Lost and Found reporting with photo uploads and geolocation",
      "Public discussion threads and nested replies for community sighting tips",
      "Realtime private messaging powered by Supabase Realtime subscriptions",
      "Push notification pipeline with device tokens and Firebase Cloud Messaging",
      "Community merit system recognizing verified helpful members",
      "Member profiles surfacing lost/found history and achievement badges",
      "Multi-facet search and filtering across categories, status, and locations",
      "Image upload integration using UploadThing with client-side preview",
      "Granular user notification preference management",
      "RLS-enabled database tables and application authorization flows",
    ],
    problem:
      "Traditional lost-and-found efforts rely on scattered social media posts where updates get lost in comment feeds, private handoff details are hard to coordinate, and helpful community members receive no recognition.",
    solution:
      "Created a dedicated mobile platform that structures the recovery lifecycle into a transparent, collaborative community experience with live chat and push alerts.",
    architecture:
      "Ionic Vue hybrid mobile client interacting with Supabase PostgreSQL for relational data and realtime channels, utilizing UploadThing for media storage and Supabase Edge Functions for FCM push dispatch.",
    architectureSteps: [
      "Ionic Vue 9 Mobile UI",
      "Supabase Client (Auth, Data, Realtime)",
      "Supabase PostgreSQL (RLS-Enabled)",
      "UploadThing (Media)",
      "Supabase Edge Functions → Firebase (FCM)",
    ],
    challengeSections: [
      {
        title: "Coordinating Realtime State with Mobile Push Delivery",
        body: "Coupled live Supabase database subscriptions for in-app messaging with serverless Edge Functions that trigger FCM push notifications when recipients are offline.",
      },
    ],
    privacySecurity:
      "Implements Supabase Authentication, RLS-enabled tables, and application authorization flows to isolate private conversations between participating users.",
    repositoryUrl: "https://github.com/jczamora-git/retrv-app",
    sourceDoc: "docs/dev-md/retrv.md",
    featured: true,
  },
];

/**
 * Accessor methods
 */
export function getDevelopmentProjects(): DevelopmentProject[] {
  return developmentProjects;
}

export function getClientProjects(): DevelopmentProject[] {
  return developmentProjects.filter((p) => p.type === "client");
}

export function getPersonalProjects(): DevelopmentProject[] {
  return developmentProjects.filter((p) => p.type === "personal");
}

export function getFeaturedDevelopmentProjects(): DevelopmentProject[] {
  return developmentProjects.filter((p) => p.featured);
}

export function getDevelopmentProjectBySlug(slug: string): DevelopmentProject | undefined {
  return developmentProjects.find((p) => p.slug === slug);
}

export function getAllDevelopmentProjectSlugs(): string[] {
  return developmentProjects.map((p) => p.slug);
}
