"use client";
import { useEffect, useRef } from 'react';

const AIChatbox = () => {
  const scriptRef = useRef(null);

  useEffect(() => {
    const loadChatbox = async () => {
      try {
        const response = await fetch('http://localhost:8000/chatbox');
        const chatboxScript = await response.text();
        
        // Create a new script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        
        // Use a safer approach to set script content
        const scriptBlob = new Blob([chatboxScript], { type: 'text/javascript' });
        const scriptUrl = URL.createObjectURL(scriptBlob);
        script.src = scriptUrl;
        
        // Remove existing script if any
        if (scriptRef.current) {
          document.head.removeChild(scriptRef.current);
        }
        
        // Add new script
        document.head.appendChild(script);
        scriptRef.current = script;
        
        console.log('✅ HIAST AI Chatbox loaded successfully');
      } catch (error) {
        console.error('❌ Failed to load AI chatbox:', error);
      }
    };

    const timer = setTimeout(loadChatbox, 1000);
    
    return () => {
      clearTimeout(timer);
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

  return null;
};

export default AIChatbox;