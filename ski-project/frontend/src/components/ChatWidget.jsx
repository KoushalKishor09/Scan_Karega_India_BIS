import { useState, useEffect, useRef } from "react";

export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "👋 Namaste! I am your Scan Karega India AI Health Assistant. Ask me about palm oils, ingredients, NOVA classification, or healthy alternatives!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  // Scroll to bottom of chat whenever messages or typing state changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping, chatOpen]);



  const handleSuggestionClick = (query) => {
    submitUserMessage(query);
  };

  const submitUserMessage = (text) => {
    if (!text.trim()) return;

    const newMsg = {
      sender: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "";
      const inputLower = text.toLowerCase();

      if (inputLower.includes("palm") || inputLower.includes("palmoil")) {
        aiResponseText = "⚠️ **Palm Oil Warning:** Palm oil is highly saturated and commonly found in ultra-processed products. Dietary guidelines recommend limiting it due to risk of increased LDL cholesterol and cardiovascular issues. Look out for *'clean oil alternatives'* like wood-pressed cold mustard or sesame oils.";
      } else if (inputLower.includes("nova") || inputLower.includes("ultra-processed")) {
        aiResponseText = "🔬 **NOVA Classification:**\n\n* **NOVA 1:** Raw/minimally processed (fruits, seeds, grains).\n* **NOVA 2:** Culinary ingredients (butter, salt, oils).\n* **NOVA 3:** Processed foods (canned vegetables, fresh bread).\n* **NOVA 4:** **Ultra-Processed Products** (chips, sodas, biscuits). They typically contain high additives and chemicals that you should avoid.";
      } else if (inputLower.includes("sugar") || inputLower.includes("sweet") || inputLower.includes("fructose")) {
        aiResponseText = "🍯 **About Sugars:** Packaged items hide sugar under names like High Fructose Corn Syrup or inverted sugar syrup. Try to keep added sugar below **25g per day**. Scan packaging and swap to alternatives sweetened with natural stevia extract or real fruit pulp!";
      } else if (inputLower.includes("drink") || inputLower.includes("mango") || inputLower.includes("beverage")) {
        aiResponseText = "🥤 **Healthy Mango Alternative:** Most mango drinks contain less than 10% fruit pulp and high added sugar (NOVA 4). A clean alternative like **i-Drink Mango** contains 100% natural fruit sugars, real mango pulp (85%+), vitamin C, and stevia sweetener!";
      } else if (inputLower.includes("chip") || inputLower.includes("snack") || inputLower.includes("potato")) {
        aiResponseText = "🥔 **Healthy Snack Alternative:** Deep-fried potato chips are high in sodium and palm oils. Swap them for **Baked Beetroot Chips**, roasted Makhana, or baked multigrain snacks. They are lower in trans fats and safer for daily snacks!";
      } else if (inputLower.includes("scan") || inputLower.includes("upload") || inputLower.includes("how")) {
        aiResponseText = "📸 **How to Scan:** Go to the 'Scan Food Label' tab, upload or take a clear photo of the 'Ingredients List' or 'Nutrition Facts' table on any food packet. Our advanced Gemini AI will analyze the text, extract additives, calculate a Health Score, and save the result!";
      } else {
        aiResponseText = "💡 **Tip for Healthy Choice:** Always scan your product before buying! Packaged foods contain secret additives, palm oils, and high sodium levels. Let me know if you have questions about specific ingredients like Maltodextrin, Sodium Benzoate, or MSG!";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiResponseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    submitUserMessage(chatInput);
    setChatInput("");
  };

  return (
    <div className={`ai-chat-widget ${chatOpen ? "chat-open" : ""}`}>
      {/* Mobile-only background backdrop overlay */}
      {chatOpen && (
        <div className="chat-backdrop" onClick={() => setChatOpen(false)} />
      )}

      {!chatOpen && (
        <button
          className="ai-chat-toggle-btn"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Toggle AI Health Assistant Chat"
        >
          {chatOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      )}

      {/* Chat Window Panel */}
      {chatOpen && (
        <div className="ai-chat-window glass-card animate-slide-up">
          {/* Chat Window Header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-header-avatar">🤖</div>
              <div style={{ textAlign: "left" }}>
                <h4 className="chat-header-title">SKI Health Bot</h4>
                <span className="chat-header-subtitle">● Online | AI Assistant</span>
              </div>
            </div>
            <button 
              className="chat-header-close-btn" 
              onClick={() => setChatOpen(false)}
              aria-label="Close Chat"
            >
              &times;
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="chat-body">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-message-wrapper ${msg.sender}`}>
                <div className="chat-message">
                  {msg.text}
                </div>
                <span className="chat-message-time">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="chat-typing-indicator">
                <span>🤖 Bot is thinking</span>
                <span className="dot-typing" style={{ display: "inline-flex", gap: "3px" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-text-secondary)", animation: "typing 1.4s infinite" }}></span>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-text-secondary)", animation: "typing 1.4s infinite 0.2s" }}></span>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-text-secondary)", animation: "typing 1.4s infinite 0.4s" }}></span>
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="chat-suggestion-container">
            <button
              className="chat-suggestion-chip"
              onClick={() => handleSuggestionClick("Is Palm Oil safe?")}
            >
              🌴 Palm Oil?
            </button>
            <button
              className="chat-suggestion-chip"
              onClick={() => handleSuggestionClick("What is NOVA Group 4?")}
            >
              🔬 NOVA-4?
            </button>
            <button
              className="chat-suggestion-chip"
              onClick={() => handleSuggestionClick("Recommend a healthy drink instead of high sugar.")}
            >
              🥤 Healthy Drink?
            </button>
          </div>

          {/* Chat Input Footer Form */}
          <form onSubmit={handleChatSubmit} className="chat-input-form">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about ingredients..."
              className="chat-input-field"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="chat-submit-btn"
              aria-label="Send Message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform: "rotate(45deg)", marginLeft: "-2px" }}>
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
