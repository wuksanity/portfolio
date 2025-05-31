"use client"

import React, { useState } from "react"
import { Folder, FileText, ArrowLeft, ArrowRight, Home, X, Minus, Square, Search, Settings, Power } from "lucide-react"
import "./Software.css"

// Converted to plain JavaScript object structure
const portfolioData = {
  "Work Experience": [
    {
      name: "Senior Software Engineer - TechCorp",
      type: "file",
      content: `Position: Senior Software Engineer
Company: TechCorp Inc.
Duration: Jan 2022 - Present
Location: San Francisco, CA

Responsibilities:
• Led development of microservices architecture serving 1M+ users
• Mentored junior developers and conducted code reviews
• Implemented CI/CD pipelines reducing deployment time by 60%
• Collaborated with product teams to deliver features on schedule

Technologies: React, Node.js, AWS, Docker, Kubernetes`,
    },
    // ... (other work experience items)
  ],
  Projects: [
    {
      name: "Web Applications",
      type: "folder",
      children: [
        {
          name: "E-commerce Platform",
          type: "file",
          content: `Project: E-commerce Platform
Duration: 3 months
Status: Completed

Description:
A full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.

Features:
• User registration and authentication
• Product search and filtering
• Shopping cart and checkout process
• Payment integration with Stripe
• Admin dashboard for inventory management
• Responsive design for mobile and desktop

Technologies: Next.js, TypeScript, Prisma, PostgreSQL, Stripe API, Tailwind CSS

GitHub: github.com/username/ecommerce-platform
Live Demo: ecommerce-demo.vercel.app`,
        },
        // ... (other project items)
      ],
    },
    // ... (other project categories)
  ],
  Education: [
    {
      name: "B.S. Computer Science - University of Example",
      type: "file",
      content: `Degree: Bachelor of Science in Computer Science
Institution: University of Example
Graduation: May 2021
GPA: 3.85/4.0

Relevant Coursework:
• Data Structures & Algorithms
• Operating Systems
• Computer Networks
• Artificial Intelligence
• Software Engineering

Honors:
• Dean's List (all semesters)
• Undergraduate Research Award
`
    },
    {
      name: "Certifications",
      type: "file",
      content: `• AWS Certified Solutions Architect – Associate
• Google Associate Cloud Engineer
• Scrum Master Certified (SMC)`
    }
  ]
}

export default function WindowsPortfolio() {
  const [openFolder, setOpenFolder] = useState(null)
  const [currentPath, setCurrentPath] = useState([])
  const [currentItems, setCurrentItems] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [time, setTime] = useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const openFolderHandler = (folderName) => {
    console.log("Opening folder:", folderName);
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
    <div className="portfolio-container">
      {/* Desktop Background */}
      <div className="desktop-background" />

      {/* Desktop Icons */}
      <div className="desktop-icons-row">
        {folderNames.map((folderName, index) => (
          <div
            key={folderName}
            className="desktop-icon"
            onDoubleClick={() => openFolderHandler(folderName)}
            style={{
              marginLeft: index === 0 ? 0 : "4vw",
              marginRight: index === folderNames.length - 1 ? 0 : "0",
            }}
          >
            <div className="desktop-icon-hover">
              <Folder className="desktop-icon-image" />
            </div>
            <span className="desktop-icon-label">
              {folderName}
            </span>
          </div>
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
          <div className="taskbar-time">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="taskbar-time">{time.toLocaleDateString()}</div>
          <button
            className="taskbar-button"
            onClick={() => window.location.href = '/'}
          >
            <Power className="taskbar-icon" />
          </button>
        </div>
      </div>
    </div>
  )
}