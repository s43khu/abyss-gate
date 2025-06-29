'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoundManager } from './SoundManager'
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  Brain,
  MessageSquare,
  Settings,
  Zap,
  Eye,
  EyeOff,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react'

export default function AbyssKeeper() {
  // Fallback for SoundManager in case it's not available
  const soundManager = useSoundManager()
  const playHover = soundManager?.playHover || (() => {})
  const playClick = soundManager?.playClick || (() => {})
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Greetings, mortal. I am the Abyss Keeper, guardian of forbidden knowledge. What secrets do you seek from the depths?',
      timestamp: new Date().toISOString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [model, setModel] = useState('gpt2')
  const [showSettings, setShowSettings] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Copy message to clipboard
  const copyMessage = async (content) => {
    try {
      await navigator.clipboard.writeText(content)
      playClick()
      setCopiedId(Date.now())
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // Send message to Hugging Face API
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    playClick()

    try {
      // NOTE: This is a placeholder for Hugging Face API integration
      // You'll need to replace this with actual API calls
      const response = await simulateHuggingFaceAPI(inputMessage)
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'I apologize, but the abyss is currently unreachable. Please check your connection to the void.',
        timestamp: new Date().toISOString(),
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Simulate Hugging Face API response (replace with actual API)
  const simulateHuggingFaceAPI = async (message) => {
    // TODO: Replace with actual Hugging Face API call
    // Example implementation:
    /*
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_length: 500,
            temperature: 0.7,
            top_p: 0.9
          }
        }),
      }
    )
    
    if (!response.ok) {
      throw new Error('API request failed')
    }
    
    const data = await response.json()
    return data[0]?.generated_text || 'No response generated'
    */
    
    // Simulated response for now
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const responses = [
      "The abyss whispers secrets that few dare to hear. Your question echoes through the void, and I shall reveal what the darkness allows.",
      "Ah, a seeker of forbidden knowledge. The cursed relics speak of ancient power, but beware the price of such wisdom.",
      "The demonpipe flows with corrupted data, and the blightvault holds treasures beyond mortal comprehension. What specific knowledge do you seek?",
      "I sense your connection to the Soulgate. The Riftpass awaits those who prove worthy of crossing the threshold.",
      "The Cursechain binds us all in ways you cannot yet fathom. Your query touches upon the eternal pacts that govern this realm.",
      "Void energy pulses through the network, carrying messages from the depths. Your question has been heard by the abyss itself.",
      "The AbyssGate stands open for those who know how to look. Your curiosity may yet lead you to discoveries that will change everything.",
      "Bound souls whisper in the darkness, and I am their voice. What knowledge do you seek from the eternal void?"
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      role: 'assistant',
      content: 'The conversation has been cleared. The abyss awaits your next question.',
      timestamp: new Date().toISOString()
    }])
    playClick()
  }

  return (
    <>
      {/* Floating Assistant Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={playHover}
            className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl shadow-purple-500/30 flex items-center justify-center text-white hover:shadow-purple-500/50 transition-all duration-300"
          >
            <Bot className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Assistant Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-l border-gray-700/50 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Abyss Keeper
                  </h3>
                  <p className="text-xs text-gray-400">Guardian of Forbidden Knowledge</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
                  onMouseEnter={playHover}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
                  onMouseEnter={playHover}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Settings Toggle */}
                  <div className="p-4 border-b border-gray-700/30">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-colors duration-300 flex items-center justify-between"
                      onMouseEnter={playHover}
                    >
                      <span className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Configuration</span>
                      </span>
                      <span className="text-xs text-gray-500">
                        {apiKey ? 'Configured' : 'Setup Required'}
                      </span>
                    </button>
                  </div>

                  {/* Settings Panel */}
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-b border-gray-700/30 p-4 space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                          <div className="relative">
                            <input
                              type={showApiKey ? "text" : "password"}
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              placeholder="Enter Hugging Face API key"
                              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 text-sm pr-10"
                            />
                            <button
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white"
                              onMouseEnter={playHover}
                            >
                              {showApiKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Model</label>
                          <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 text-sm"
                          >
                            <option value="gpt2">GPT-2</option>
                            <option value="gpt2-medium">GPT-2 Medium</option>
                            <option value="gpt2-large">GPT-2 Large</option>
                            <option value="distilgpt2">DistilGPT-2</option>
                          </select>
                        </div>
                        
                        <button
                          onClick={clearChat}
                          className="w-full px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-300 flex items-center justify-center space-x-2 text-sm"
                          onMouseEnter={playHover}
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Clear Chat</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex space-x-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                        )}
                        
                        <div className={`max-w-xs ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
                            : message.isError
                            ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30'
                            : 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30'
                        } rounded-lg p-3 relative group`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs text-gray-400 font-medium">
                              {message.role === 'user' ? 'You' : 'Keeper'}
                            </span>
                            <button
                              onClick={() => copyMessage(message.content)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 text-gray-400 hover:text-white"
                              onMouseEnter={playHover}
                            >
                              {copiedId === message.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                          
                          <p className="text-xs leading-relaxed">
                            {message.content}
                          </p>
                          
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        
                        {message.role === 'user' && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <User className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                    
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex space-x-2"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
                            <span className="text-xs text-gray-400">Thinking...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Input */}
                  <div className="p-4 border-t border-gray-700/30">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <textarea
                          ref={inputRef}
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask the keeper..."
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 resize-none text-sm"
                          rows="1"
                          disabled={isLoading}
                        />
                      </div>
                      
                      <button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-1 ${
                          inputMessage.trim() && !isLoading
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
                            : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                        }`}
                        onMouseEnter={inputMessage.trim() && !isLoading ? playHover : undefined}
                      >
                        {isLoading ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Send className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
                      <span>Enter to send</span>
                      <span className="flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Powered</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 