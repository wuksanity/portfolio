import React, { useState, useRef, useEffect } from 'react';
import './Photography.css';

function Photography() {
  // Sample photo data - replace with your actual photos

  const STATIC_BACKGROUND_IMAGE = 'src/assets/cam.jpg';

  const [stacks, setStacks] = useState({
    street: [
      { id: 1, src: 'src/assets/borgar.jpg', alt: 'Street scene 1' },
      { id: 2, src: 'src/assets/bridge.jpg', alt: 'Street scene 2' },
      { id: 3, src: 'src/assets/couch.jpg', alt: 'Street scene 3' },
    ],
    portrait: [
      { id: 6, src: 'src/assets/field.jpg', alt: 'Portrait 1' },
      { id: 7, src: 'src/assets/lamp.jpg', alt: 'Portrait 2' },
      { id: 8, src: 'src/assets/lotus.jpg', alt: 'Portrait 3' },
      { id: 9, src: 'src/assets/seattle.jpg', alt: 'Portrait 4' },
    ]
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const stackRefs = {
    street: useRef(null),
    portrait: useRef(null)
  };

  const handleMouseDown = (e, photo, stackType) => {
    const rect = e.target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Bring the photo to the front of its stack without changing the overall order
    setDraggedItem({ ...photo, stackType });
    e.target.style.cursor = 'grabbing';
    
    // Don't modify zIndex here - we'll handle it through CSS transforms
  };

  const handleMouseMove = (e) => {
    if (!draggedItem) return;
    
    const photoElement = document.querySelector(`[data-id="${draggedItem.id}"]`);
    if (photoElement) {
      photoElement.style.left = `${e.clientX - dragOffset.x}px`;
      photoElement.style.top = `${e.clientY - dragOffset.y}px`;
      photoElement.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg) scale(1.05)`;
    }
  };

  const handleMouseUp = (e) => {
    if (!draggedItem) return;

    // Check if dropped on another stack
    for (const stackType in stackRefs) {
      const stackRect = stackRefs[stackType].current?.getBoundingClientRect();
      if (stackRect && 
          e.clientX >= stackRect.left && 
          e.clientX <= stackRect.right && 
          e.clientY >= stackRect.top && 
          e.clientY <= stackRect.bottom &&
          stackType !== draggedItem.stackType) {
        
        // Move photo to new stack and maintain zIndex order
        setStacks(prev => {
          const newStacks = { ...prev };
          newStacks[draggedItem.stackType] = newStacks[draggedItem.stackType].filter(
            p => p.id !== draggedItem.id
          );
          
          // Add to new stack with appropriate zIndex
          const newZIndex = newStacks[stackType].length > 0 
            ? Math.max(...newStacks[stackType].map(p => p.zIndex)) + 1 
            : 1;
            
          newStacks[stackType] = [
            ...newStacks[stackType], 
            { ...draggedItem, zIndex: newZIndex }
          ];
          return newStacks;
        });
        break;
      }
    }

    const photoElement = document.querySelector(`[data-id="${draggedItem.id}"]`);
    if (photoElement) {
      photoElement.style.cursor = 'grab';
      photoElement.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg)`;
    }
    
    setDraggedItem(null);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedItem, dragOffset]);

  return (
    <div className="portfolio-container"
    style={{ 
      backgroundImage: `url(${STATIC_BACKGROUND_IMAGE})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <h1 className="title">My Photography</h1>
      
      <div className="stack-container">
        <div className="stack" ref={stackRefs.street}>
          <h2>Street Photography</h2>
          <div className="photos">
            {stacks.street.map((photo) => (
              <img
                key={photo.id}
                data-id={photo.id}
                src={photo.src}
                alt={photo.alt}
                className={`photo ${draggedItem?.id === photo.id ? 'dragging' : ''}`}
                style={{
                  transform: `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg)`,
                  left: '50%',
                  top: `${50 + (photo.zIndex - 1) * 2}%`,
                  zIndex: photo.zIndex
                }}
                onMouseDown={(e) => handleMouseDown(e, photo, 'street')}
              />
            ))}
          </div>
        </div>
        
        <div className="stack" ref={stackRefs.portrait}>
          <h2>Portrait Photography</h2>
          <div className="photos">
            {stacks.portrait.map((photo) => (
              <img
                key={photo.id}
                data-id={photo.id}
                src={photo.src}
                alt={photo.alt}
                className={`photo ${draggedItem?.id === photo.id ? 'dragging' : ''}`}
                style={{
                  transform: `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg)`,
                  left: '50%',
                  top: `${50 + (photo.zIndex - 1) * 2}%`,
                  zIndex: photo.zIndex
                }}
                onMouseDown={(e) => handleMouseDown(e, photo, 'portrait')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Photography;