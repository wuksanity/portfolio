"use client"

import React, { useState } from "react"
import { Folder, FileText, ArrowLeft, ArrowRight, Home, X, Minus, Square, Search, Settings, Power } from "lucide-react"
import "./Software.css"

// Converted to plain JavaScript object structure
const portfolioData = {
  "Work Experience": [
    {
      name: "Artificial Intelligence Engineer - DataAnnotationTech",
      type: "file",
      content: `Position: Artificial Intelligence Engineer
Company: DataAnnotationTech
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

• Designed and developed a Python ML clustering model leveraging Optical Character Recognition (OCR) to extract, read, and organize data from various insurance document types with over 99% accuracy, enhancing document processing efficiency.
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
      name: "B.S. Computer Science - The Ohio State University",
      type: "file",
      content: `Degree: Bachelor of Science in Computer Science, Minor in Mathematics
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
    <div className="software-portfolio-container">
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