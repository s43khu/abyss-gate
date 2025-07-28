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
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react'

export default function AbyssKeeper() {
  const soundManager = useSoundManager()
  const playHover = soundManager?.playHover || (() => {})
  const playClick = soundManager?.playClick || (() => {})
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hey! trash. I am the Abyss Keeper, guardian of forbidden knowledge. What the f.. brings you here?',
      timestamp: new Date().toISOString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [nsfwEnabled, setNsfwEnabled] = useState(false);
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
      // NOTE: Prepare conversation history for context
      const conversationHistory = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory,
          nsfwEnabled
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.response,
          timestamp: data.timestamp
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.error || 'I apologize, but the abyss is currently unreachable. Please check your connection to the void.',
          timestamp: new Date().toISOString(),
          isError: true
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('AbyssKeeper API Error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'I apologize, but the abyss is currently unreachable. The void energy has disrupted our connection.',
        timestamp: new Date().toISOString(),
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
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
          <div className="fixed bottom-6 right-6 z-[9999] flex items-center space-x-3">
            {/* NOTE: Floating bot button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              onMouseEnter={playHover}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl shadow-purple-500/30 flex items-center justify-center text-white hover:shadow-purple-500/50 transition-all duration-300"
            >
              <Bot className="w-8 h-8" />
            </motion.button>
            {/* NOTE: Signature next to bot icon */}
            {/* <div className="bg-gradient-to-r from-gray-900/70 to-black/70 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-2 flex flex-col items-start">
              <span className="text-xs text-gray-400 mb-1">Made with cursed relics by</span>
              <span className="text-base font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Shekhu</span>
              <a
                href="https://github.com/s43khu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              >
                github.com/s43khu
              </a>
            </div> */}
          </div>
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
            className="fixed top-0 right-0 h-screen w-96 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-l border-gray-700/50 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-700/50">
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
                  onClick={clearChat}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
                  onMouseEnter={playHover}
                  title="Clear Chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              
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
              {!isMinimized ? (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="flex-1 flex flex-col min-h-0"
                >
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
                  <div className="flex-shrink-0 p-4 border-t border-gray-700/30">
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
              ) : (
                <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="flex-1 flex flex-col min-h-0 p-2"
              >
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  {!nsfwEnabled ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-red-400/80 bg-black/30 px-3 py-1 rounded-lg border border-red-400/30 mb-2 text-center"
                    >
                      Beware mortal! Unchaining the Keeper may bleed your eyes...
                    </motion.div>
                  ): 
                  <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-yellow-400/80 bg-black/30 px-3 py-1 rounded-lg border border-yellow-400/30 mb-2 text-center"
                >
                  Talk at your own risk.
                </motion.div>
                  }
                  <button
                    onClick={() => setNsfwEnabled(!nsfwEnabled)}
                    className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                      nsfwEnabled 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 border border-gray-600/30'
                    }`}
                    onMouseEnter={playHover}
                  >
                    {nsfwEnabled ? (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">Chain the Keeper</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4" />
                        <span className="text-sm">Unchain the Keeper</span>
                      </>
                    )}
                  </button>
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