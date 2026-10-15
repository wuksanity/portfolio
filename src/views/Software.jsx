import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Folder, FileText, ArrowLeft, ArrowRight, Home, X, Minus, Square, Search, Settings, Power, ExternalLink } from "lucide-react"
import Photo from "../components/Photo"
import "./Software.css"

// Converted to plain JavaScript object structure
const portfolioData = {
  "Work Experience": [
    {
      name: "Freelance Full-Stack Engineer & Architect - StagewayPDX",
      type: "file",
      links: [{ label: "stagewaypdx.live", href: "https://www.stagewaypdx.live" }],
      content: `Position: Freelance Full-Stack Engineer & Architect
Client: StagewayPDX
Duration: April 2026 - Present

Skills: Client Collaboration, Product Design, System Architecture, Full Stack Development, Security Engineering, Test Automation, Privacy Compliance
Stack: Next.js 16 (App Router), React 19, TypeScript, Firebase Auth + Cloud Firestore, Firebase Admin SDK, Cloudflare R2, Vercel, Tailwind CSS, Radix UI, Leaflet, Recharts, Zod, Vitest

OVERVIEW
StagewayPDX is a two-sided marketplace that connects Portland musicians with the venues that book them: discovery, booking, messaging, and everything between the first message and the post-show review.

I was the sole engineer from the first commit. Working directly with the client, I turned their idea into a live product: gathering requirements, designing the experience, architecting the system, and building, testing, securing, deploying, and maintaining all of it myself. That came to 150+ commits and 100,000+ lines of TypeScript in under six months.

WHAT I BUILT
• Separate musician and venue experiences spanning 39 pages and 34 server API routes
• Gig posting with multi-artist lineups and time slots, artist applications, and a full booking lifecycle with calendar views
• Real-time messaging: direct and group conversations with image and audio attachments
• Map-based discovery of artists and gigs, with server-side geocoding and distance filtering
• Ratings and reviews, gig history, and analytics dashboards for both musicians and venues
• Tiered member verification, enforced both in the UI and in the database security rules
• An Emergency Roster for last-minute cancellations: artists declare on-call availability, venues send urgent fill requests, and the first artist to accept wins inside a database transaction, so a slot can never be double-booked
• A self-contained, nine-step guided demo of the emergency flow
• Branded transactional email for verification, password resets, booking confirmations, and alerts
• Responsive mobile layouts for every dashboard view

ARCHITECTURE & SECURITY
• Every account-scoped API route verifies the caller's Firebase ID token server-side, and abuse-prone endpoints sit behind a Firestore-backed rate limiter
• A 900-line Firestore security-rules layer; sensitive writes happen only on the server through the Admin SDK
• Direct-to-storage uploads through presigned URLs with server-generated object keys, and a Content Security Policy derived from the same configuration so the two can't drift apart
• Reworked parts of the client's written spec that would have been unsafe on this architecture. For example, a shared array any user could rewrite became a server-written subcollection

PERFORMANCE & COST
• Traced runaway database reads to a 30-second on-screen clock that kept re-triggering data syncs (an estimated 12,000 reads per hour for every open tab), then re-architected around shared real-time feeds, a persistent multi-tab cache, and a scheduled server-side maintenance job
• Wrote a custom ESLint rule that bans the pattern; on its first run it caught two more instances

PRIVACY & COMPLIANCE
• Versioned Terms, Privacy, and Cookie policies with per-user acceptance records and re-consent prompts whenever a policy changes
• A cookie-consent system that honors Global Privacy Control and gates analytics on consent
• Self-service account deletion with a 14-day grace period, an automated purge job, and retention of the booking and review history other members rely on
• Authored a technical brief for the client's legal counsel covering the data the platform collects, the vendors that process it, and every place the interface promised more than the code did, then closed those gaps before the policies went live

TESTING & OPERATIONS
• 1,900+ automated tests across three layers: unit tests, security-rules tests against the Firestore emulator, and Admin SDK integration tests
• A route test for every API endpoint, plus a check that fails the build when a database query ships without its index
• Deploy-safety scripts that confirm the live security rules, indexes, and storage CORS policy match the repository, and data migrations that dry-run by default
• Owned production support end to end, diagnosing and fixing issues across sign-up, email deliverability, file uploads, and authentication links
`
    },
    {
      name: "Freelance Full-Stack Engineer & Architect - Golden Goat",
      type: "file",
      links: [{ label: "goldengoat.tv", href: "https://goldengoat.tv" }],
      content: `Position: Freelance Full-Stack Engineer & Architect
Client: Golden Goat
Duration: October 2025 - September 2026

Skills: Client Collaboration, Product Design, System Architecture, Full Stack Development, Recommendation Systems, Test Automation, CI/CD
Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Firebase Auth + Cloud Firestore, Vimeo API, Google Ad Manager, Resend, Vercel, GitHub Actions, Vitest, Playwright

OVERVIEW
Golden Goat is an ethical film-distribution platform: a free, ad-supported streaming service for festival and independent cinema, where advertising revenue pays the filmmakers.

I was the sole engineer. I worked with the client from concept to launch: shaping the product, building its black-and-gold design system, architecting the platform, and implementing, testing, and deploying every part of it myself. Partway through, I migrated the entire application from Vite + React Router to the Next.js App Router.

WHAT I BUILT
• A Netflix-style viewing experience: multiple profiles per account, My List, likes, search, and Continue Watching with resume progress
• A layered content catalog: bundled seed data, a Firestore title library, and live metadata enrichment from the client's Vimeo account
• A credits parser that lets the client manage each film's director, cast, genre, rating, and runtime simply by writing them into the Vimeo description
• A scheduled sync (GitHub Actions calling a secured API route) that mirrors the Vimeo library into Firestore and reconciles removed films automatically
• A recommendation engine combining weighted genre, director, cast, and tag similarity with a per-profile taste model built from likes, saved titles, and watch history. It powers "Top Picks", "Because You Watched", and a personalized match score
• Advised the client on ad-supported (AVOD) licensing, then integrated Google Ad Manager display advertising behind an IAB TCF v2.2 consent bridge; no ad request is ever made without consent
• Branded transactional email via Resend for account verification, password resets, and legal notices
• Rights and privacy tooling: versioned Terms, Privacy, and Copyright policies with acceptance records, a copyright takedown and counter-notice workflow, one-click personal data export, and self-service account deletion

ENGINEERING QUALITY
• Nearly 600 automated tests across four layers: unit, component, Firestore security rules on the emulator, and Playwright end-to-end user journeys
• GitHub Actions CI on every pull request (typecheck, lint, all test layers, and a production build), plus a post-deploy smoke test
• The security-rules suite surfaced two real access-control bugs, both fixed and pinned by regression tests
• Production hardening: field-level validation in the security rules, a fail-closed rate limiter, a Content Security Policy, the Vimeo access token kept server-side, analytics gated on consent, error boundaries with error reporting, and structured data, sitemap, and robots for search engines
• Reduced Firestore reads and writes per session, and removed an unused UI kit along with the 32 dependencies it carried
`
    },
    {
      name: "Artificial Intelligence Engineer - DataAnnotation",
      type: "file",
      content: `Position: Artificial Intelligence Engineer
Company: DataAnnotation
Duration: October 2024 - January 2025

Skills Acquired: Natural Language Processing, Prompt Engineering, Software Documentation

• Analyzed and tested AI code models by prompting them with code-related queries, thoroughly documenting responses and identifying areas for improvement in model accuracy.
• Debugged and enhanced the models by correcting code-related responses, ensuring they adhered to best coding practices, and refining the overall output for consistency and correctness.
• Worked to improve the models' perceptions of responses by evaluating extracted fine-grained criteria, adjusting, adding, or removing criteria to refine model accuracy and reliability.
`
    },
    {
      name: "Machine Learning/Data Engineering Intern - Arch Capital Group",
      type: "file",
      content: `Position: Machine Learning/Data Engineering Intern
Company: Arch Capital Group
Duration: January 2024 - May 2024

Skills Acquired: Python Machine Learning, Microsoft Azure, Data Engineering, Agile Development

• Designed and developed a Python ML clustering pipeline that sorted dozens of insurance document types, each with dozens of state-specific variants, into per-type extraction groups; fields were then extracted with Azure OCR and LLMs (GPT-4, Lazarus) at a 99.5%+ confidence rating, enhancing document processing efficiency.
• Conducted rigorous data engineering, testing, and optimization of machine learning models on the Microsoft Azure platform, improving performance metrics.
• Collaborated with cross-functional agile teams to create, improve, and monitor ML solutions, ensuring consistency and alignment with project objectives.
`
    }
  ],
  Projects: [
    {
      name: "Web Applications",
      type: "folder",
      children: [
        {
          name: "Creator - A Useful Tool (In Development)",
          type: "file",
          links: [{ label: "A Useful Tool (live alpha)", href: "https://anactuallyusefulandperhapsfuntoolwithwhichtolearnalanguage.com" }],
          content: `Position: Creator & Full-Stack Engineer (personal project, sole developer)
Product: A Useful Tool (anactuallyusefulandperhapsfuntoolwithwhichtolearnalanguage.com)
Duration: June 2026 - Present
Status: IN ACTIVE DEVELOPMENT. An early alpha is live, and the game and its world are still growing.

Skills: Product Design, System Architecture, Full Stack Development, Natural Language Processing, Game Engine Development, Data and Asset Pipelines, Performance Engineering, Test Automation
Stack: Next.js 16 (App Router), React 19, TypeScript, Zustand, Supabase (Postgres, Auth, Row-Level Security), Azure Neural Text-to-Speech, Cloudflare R2, Upstash Redis, Sentry, Vercel, Tiled, sharp, Vitest

OVERVIEW
A language-learning game. You build flashcards for the language you're studying and review them on a scientifically tuned schedule, all from inside a pixel-art home you walk around, personalize, and decorate. The furniture is the interface: the bookshelf is where you make and organize cards, the desk is where you study, the wardrobe changes your outfit, and the storage cupboard opens decorating mode. On a computer the game runs inside a retro desktop sitting on a pixel desk; on a phone it becomes a dual-screen handheld with a joystick and A/B/X buttons.

I am designing, architecting, and building all of it myself: the language engines, the game engine and its authoring tools, the art pipelines, the backend, and the test suite. So far that is about 75,000 lines of TypeScript across 125 commits, with 16 API routes, 34 database migrations, and 1,500+ automated tests.

WHAT IT DOES
• Make a card the way a learner actually types: pinyin with or without tone marks, romaji or kana, plain Spanish or Vietnamese. The app returns the real writing system, a romanization, a translation, and natural-sounding speech
• Study Mandarin, Japanese, Spanish, Vietnamese, or English, with Korean and French on the roadmap. The interface runs in English or Vietnamese, and translations follow the interface language, so a Vietnamese speaker learning English gets Vietnamese meanings
• On-screen Japanese kana and Vietnamese keyboards, plus tone-mark buttons for pinyin, on both desktop and phone
• Reviews scheduled by my own implementation of FSRS-4.5, a modern spaced-repetition memory model, with daily new-card limits, study streaks, and an XP and leveling system
• Public decks that other players can browse and copy into their own account
• Twelve pixel characters to play as, with outfits to change into
• A home to decorate from a catalog of 5,459 furniture pieces in 25 categories, plus 72 floor and 54 wall designs, saved to the player's account
• A guided tour: a character named Samuel walks new players through the house in a scripted cutscene, then hands over control for interactive lessons where they make a deck and a card, do a real review, and decorate, with highlights and pointers on both desktop and phone

LANGUAGE ENGINE
• Mandarin: learners type pinyin and the engine works out the characters from the CC-CEDICT dictionary stored in Postgres. It proposes every plausible way to split unspaced pinyin into syllables, runs a dynamic-programming pass to pick the best-scoring grouping into dictionary words (a greedy longest-match approach had turned "kuài yìdiǎn" into the wrong word), then chooses among homophones with frequency data and context rules, such as reading a measure word after a number. Getting the characters right matters beyond the card: the speech engine reads characters, so wrong characters meant wrong audio and choppy sentence pacing
• Japanese: testing showed machine translation is only accurate when the text contains kanji, so the engine rebuilds kanji spelling before translating. Romaji becomes kana, kana is matched against JMdict (217,000 entries ranked by how common each word is), polite verb forms are de-conjugated, and unspaced kana is segmented with guardrails for particles and counters. If translation fails, it falls back to a word-by-word gloss
• Spanish, Vietnamese, and English each have their own validation and dictionary paths
• Every translation lands in a shared Postgres cache with versioned keys, and community-sourced machine translation is sanitized before it is cached

AUDIO
• Speech comes from Azure Neural Text-to-Speech, with voices chosen per language and regional variant
• Voice quality is tuned by measurement rather than by ear: analysis scripts read the raw audio to measure pace, pitch range, and pauses. Each Spanish voice is calibrated to about 5.7 syllables per second, and multilingual voices are pinned to the right language, confirmed with speech-recognition language detection
• Every clip is synthesized once and stored in Cloudflare R2 under a key derived from its content, so repeat plays cost nothing
• Cost controls keep the platform inside its free tier: a monthly character budget rationed fairly across accounts, daily caps, per-user rate limiting through Upstash Redis, and a circuit breaker that backs off when Azure throttles

GAME ENGINE
• A 2D engine built on React: layered map art, furniture and characters depth-sorted against each other (a plate on a table moves with the table, while the player can still walk in front of and behind both), and day/night lighting
• The world is drawn in the Tiled map editor and compiled by a custom build step into layered images, collision, rooms, spawn points, and interaction zones. The compiler either reproduces the map exactly or explains why with an error or warning, and every map is covered by tests
• A scripting engine runs both one-off cutscenes and looping character routines; walkers wait for people and step around furniture the player has moved. When it replaced the original hard-coded intro, the tour was verified frame-for-frame against a 1,068-frame recording
• An in-browser storyboard editor for staging cutscenes: record walking routes, set starting positions, and preview any step. The same validator checks scripts live in the editor and in CI, and saves are all-or-nothing and verified, so work is never half-saved
• Decorating uses a free-flying camera with drag, scroll-wheel, keyboard, and joystick controls. Essential furniture can be swapped for nicer pieces, but the game guarantees every job (desk, shelf, wardrobe) always has a home
• Art pipelines: a generator slices a licensed pixel-art pack into the furniture catalog, telling standing furniture from flat decor by the pack's shadow encoding, and cuts the floor and wall designs

PLATFORM & PERFORMANCE
• Next.js 16 on Vercel with Supabase Postgres behind row-level security. XP and levels are awarded server-side by database functions, so the client cannot grant itself progress
• Invite-only sign-up enforced in the database, cards and home layouts saved per account, and a nightly job that prunes old usage data
• One game, two front ends: the desktop shell and the handheld shell share every store and system
• Kept the game loop away from persistent storage: position, camera, and animation state live in a separate store, which took an open game from about 180 full saves per second to zero, and moving the player re-renders only the player
• Production hardening: Sentry error reporting, a storage layer that survives browsers blocking local storage, and CI that runs type checks, lint, the full test suite, and a production build on every push and pull request

STILL IN PROGRESS
• Leaving the house: the neighborhood map is already drawn and compiled, and scene transitions are next
• Residents who live their own routines around town, built on the scripting engine
• Story threads and characters, written in an in-repo story bible that is automatically checked against the game
• Korean and French dictionaries
`
        },
        {
          name: "Full Stack Engineer - adayinthelife.ink",
          type: "file",
          content: `Project: Personal
Company: adayinthelife.ink
Duration: August 2024 - December 2024

Skills Acquired: Full Stack Development, React, Firebase, Authentication/Security, Architecture

• Designed, developed, and architected a full-stack social media journal application using JavaScript React, integrating Firebase as the backend for database, authentication, and real-time functionality.
• Managed the complete development lifecycle, including architecture design, feature implementation, and debugging to ensure a robust and reliable application.
• Learned the importance of consistently adhering to good coding principles by making, breaking, and improving nonoptimal code.
`
        }
        // ... (other project items)
      ],
    },
    // ... (other project categories)
  ],
  Education: [
    {
      name: "B.S. Computer Science & Engineering - The Ohio State University",
      type: "file",
      content: `Degree: Bachelor of Science in Computer Science and Engineering, Minor in Mathematics
Institution: The Ohio State University
Graduation: May 2024

Relevant Coursework:
• Data Structures & Algorithms
• Operating Systems
• Computer Networks
• Artificial Intelligence
• Software Engineering
`
    }
  ]
}

// The taskbar clock. Its own component so the explorer doesn't re-render on every tick.
function TaskbarClock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    // The clock shows minutes, so wake up at each minute boundary rather than every second.
    let timer
    const tick = () => {
      const now = new Date()
      setTime(now)
      timer = setTimeout(tick, 60000 - (now.getSeconds() * 1000 + now.getMilliseconds()))
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="taskbar-time">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className="taskbar-time">{time.toLocaleDateString()}</div>
    </>
  )
}

export default function WindowsPortfolio() {
  const navigate = useNavigate()
  const [openFolder, setOpenFolder] = useState(null)
  const [currentPath, setCurrentPath] = useState([])
  const [currentItems, setCurrentItems] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  const openFolderHandler = (folderName) => {
    setOpenFolder(folderName)
    setCurrentPath([folderName])
    setCurrentItems(portfolioData[folderName] || [])
    setSelectedFile(null)
  }

  const navigateToItem = (item) => {
    if (item.type === "folder" && item.children) {
      setCurrentPath([...currentPath, item.name])
      setCurrentItems(item.children)
      setSelectedFile(null)
    } else if (item.type === "file") {
      setSelectedFile(item)
    }
  }

  const navigateBack = () => {
    if (currentPath.length > 1) {
      const newPath = currentPath.slice(0, -1)
      setCurrentPath(newPath)

      if (newPath.length === 1) {
        setCurrentItems(portfolioData[newPath[0]] || [])
      } else {
        // Navigate through nested folders
        let items = portfolioData[newPath[0]] || []
        for (let i = 1; i < newPath.length; i++) {
          const folder = items.find((item) => item.name === newPath[i] && item.type === "folder")
          if (folder && folder.children) {
            items = folder.children
          }
        }
        setCurrentItems(items)
      }
      setSelectedFile(null)
    }
  }

  const navigateHome = () => {
    if (currentPath.length > 1) {
      setCurrentPath([currentPath[0]])
      setCurrentItems(portfolioData[currentPath[0]] || [])
      setSelectedFile(null)
    }
  }

  const closeExplorer = () => {
    setOpenFolder(null)
    setCurrentPath([])
    setCurrentItems([])
    setSelectedFile(null)
  }

  const folderNames = Object.keys(portfolioData)

  return (
    <div className="software-portfolio-container">
      {/* Desktop Background */}
      <Photo name="bridge" alt="" sizes="100vw" priority className="desktop-background" />

      {/* Desktop Icons: buttons, so a click, tap or Enter opens them (double-click isn't available on phones) */}
      <div className="desktop-icons-row">
        {folderNames.map((folderName) => (
          <button
            type="button"
            key={folderName}
            className="desktop-icon"
            onClick={() => openFolderHandler(folderName)}
          >
            <span className="desktop-icon-hover">
              <Folder className="desktop-icon-image" />
            </span>
            <span className="desktop-icon-label">
              {folderName}
            </span>
          </button>
        ))}
      </div>

      {/* File Explorer Window */}
      {openFolder && (
        <div className="explorer-window">
          {/* Title Bar */}
          <div className="explorer-title-bar">
            <div className="title-bar-content">
              <Folder className="title-bar-icon" />
              <span>{currentPath.join(" > ")}</span>
            </div>
            <div className="window-controls">
              <button className="window-button" onClick={closeExplorer}>
                <Minus className="window-icon" />
              </button>
              <button className="window-button">
                <Square className="window-icon" />
              </button>
              <button className="window-button" onClick={closeExplorer}>
                <X className="window-icon" />
              </button>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="explorer-nav-bar">
            <button 
              className="nav-button" 
              onClick={navigateBack} 
              disabled={currentPath.length <= 1}
            >
              <ArrowLeft className="nav-icon" />
            </button>
            <button className="nav-button">
              <ArrowRight className="nav-icon" />
            </button>
            <button 
              className="nav-button" 
              onClick={navigateHome} 
              disabled={currentPath.length <= 1}
            >
              <Home className="nav-icon" />
            </button>
            <div className="path-display">{currentPath.join(" > ")}</div>
            <button className="nav-button">
              <Search className="nav-icon" />
            </button>
          </div>

          {/* Content Area */}
          <div className="explorer-content">
            {/* File List */}
            <div className="file-list-pane">
              <div className="file-list-content">
                {currentItems.map((item, index) => (
                  <div
                    key={index}
                    className="file-item"
                    onClick={() => navigateToItem(item)}
                  >
                    {item.type === "folder" ? (
                      <Folder className="folder-icon" />
                    ) : (
                      <FileText className="file-icon" />
                    )}
                    <span className="file-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* File Content */}
            <div className="file-content-pane">
              {selectedFile ? (
                <div className="file-content">
                  <div className="file-header">
                    <FileText className="file-icon" />
                    <h2 className="file-title">{selectedFile.name}</h2>
                  </div>
                  {selectedFile.links && (
                    <div className="file-links">
                      {selectedFile.links.map((link) => (
                        <a
                          key={link.href}
                          className="file-link"
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="file-link-icon" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                  <div className="content-card">
                    <pre className="content-pre">{selectedFile.content}</pre>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <div>
                    <Folder className="empty-state-icon" />
                    <p>Select a file to view its contents</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <button className="taskbar-button">
            <Settings className="taskbar-icon" />
          </button>
          <div className="taskbar-title">Walker Riley - Software Engineer Portfolio</div>
        </div>

        <div className="taskbar-right">
          <TaskbarClock />
          <button
            className="taskbar-button"
            onClick={() => navigate('/')}
            aria-label="Back to home page"
          >
            <Power className="taskbar-icon" />
          </button>
        </div>
      </div>
    </div>
  )
}