'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSoundManager } from './SoundManager'
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  Play, 
  Pause, 
  Square, 
  Settings,
  Zap,
  Database,
  Clock,
  BarChart3,
  Signal,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react'

export default function Demonpipe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { playHover, playClick } = useSoundManager()
  
  const [isConnected, setIsConnected] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamData, setStreamData] = useState([])
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [dataRate, setDataRate] = useState(0)
  const [totalData, setTotalData] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const [maxEntries, setMaxEntries] = useState(100)
  
  const streamRef = useRef(null)
  const dataIntervalRef = useRef(null)

  // Simulate connection
  const connectToPipe = () => {
    setIsConnected(true)
    setConnectionStatus('connecting')
    playClick()
    
    setTimeout(() => {
      setConnectionStatus('connected')
      playClick()
    }, 2000)
  }

  const disconnectFromPipe = () => {
    setIsConnected(false)
    setIsStreaming(false)
    setConnectionStatus('disconnected')
    setStreamData([])
    setDataRate(0)
    playClick()
    
    if (dataIntervalRef.current) {
      clearInterval(dataIntervalRef.current)
    }
  }

  const startStreaming = () => {
    if (!isConnected) return
    
    setIsStreaming(true)
    playClick()
    
    // Simulate real-time data streaming
    dataIntervalRef.current = setInterval(() => {
      const newData = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        type: getRandomDataType(),
        value: getRandomValue(),
        status: getRandomStatus(),
        source: getRandomSource()
      }
      
      setStreamData(prev => {
        const updated = [newData, ...prev.slice(0, maxEntries - 1)]
        return updated
      })
      
      setDataRate(prev => prev + Math.random() * 10)
      setTotalData(prev => prev + 1)
    }, 500)
  }

  const stopStreaming = () => {
    setIsStreaming(false)
    playClick()
    
    if (dataIntervalRef.current) {
      clearInterval(dataIntervalRef.current)
    }
  }

  const getRandomDataType = () => {
    const types = ['soul_data', 'energy_flux', 'void_pulse', 'curse_signal', 'abyss_echo']
    return types[Math.floor(Math.random() * types.length)]
  }

  const getRandomValue = () => {
    return (Math.random() * 1000).toFixed(2)
  }

  const getRandomStatus = () => {
    const statuses = ['active', 'warning', 'error', 'stable']
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  const getRandomSource = () => {
    const sources = ['soulgate_01', 'riftpass_02', 'cursechain_03', 'voidcore_04', 'abyssnode_05']
    return sources[Math.floor(Math.random() * sources.length)]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      case 'stable': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'error': return <XCircle className="w-4 h-4" />
      case 'stable': return <CheckCircle className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'soul_data': return 'from-purple-500 to-pink-500'
      case 'energy_flux': return 'from-cyan-500 to-blue-500'
      case 'void_pulse': return 'from-gray-500 to-black'
      case 'curse_signal': return 'from-red-500 to-orange-500'
      case 'abyss_echo': return 'from-green-500 to-teal-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (autoScroll && streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight
    }
  }, [streamData, autoScroll])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (dataIntervalRef.current) {
        clearInterval(dataIntervalRef.current)
      }
    }
  }, [])

  return (
    <div ref={ref} className="min-h-screen text-white py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Demonpipe
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Real-time data streaming from the depths of the abyss. 
            Connect to cursed networks and monitor forbidden signals.
          </p>
        </motion.div>

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Status */}
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <div>
                  <h3 className="text-lg font-bold text-white">Connection Status</h3>
                  <p className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                    {connectionStatus === 'connecting' ? 'Connecting to Demonpipe...' : 
                     connectionStatus === 'connected' ? 'Connected to Demonpipe' : 
                     'Disconnected from Demonpipe'}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {!isConnected ? (
                  <button
                    onClick={connectToPipe}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center space-x-2"
                    onMouseEnter={playHover}
                  >
                    <Wifi className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                ) : (
                  <button
                    onClick={disconnectFromPipe}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2"
                    onMouseEnter={playHover}
                  >
                    <WifiOff className="w-4 h-4" />
                    <span>Disconnect</span>
                  </button>
                )}

                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 bg-gray-800/50 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors duration-300"
                  onMouseEnter={playHover}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Panel */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Stream Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Auto Scroll</label>
                  <button
                    onClick={() => setAutoScroll(!autoScroll)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                      autoScroll ? 'bg-green-500/20 text-green-400' : 'bg-gray-800/50 text-gray-400'
                    }`}
                    onMouseEnter={playHover}
                  >
                    {autoScroll ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span>{autoScroll ? 'Enabled' : 'Disabled'}</span>
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Entries</label>
                  <input
                    type="number"
                    value={maxEntries}
                    onChange={(e) => setMaxEntries(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                    min="10"
                    max="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Data Rate</label>
                  <div className="text-2xl font-bold text-cyan-400">{dataRate.toFixed(1)} msgs/s</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Streaming Controls */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Stream Controls</h3>
                <p className="text-gray-400 text-sm">Control the data flow from the abyss</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {isStreaming ? (
                  <button
                    onClick={stopStreaming}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2"
                    onMouseEnter={playHover}
                  >
                    <Square className="w-4 h-4" />
                    <span>Stop Stream</span>
                  </button>
                ) : (
                  <button
                    onClick={startStreaming}
                    disabled={!isConnected}
                    className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                      isConnected 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600' 
                        : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                    }`}
                    onMouseEnter={isConnected ? playHover : undefined}
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Stream</span>
                  </button>
                )}
                
                <button
                  onClick={() => setStreamData([])}
                  className="px-4 py-2 bg-gray-800/50 text-white rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors duration-300 flex items-center space-x-2"
                  onMouseEnter={playHover}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Messages", value: totalData, icon: <Database className="w-6 h-6" /> },
            { label: "Data Rate", value: `${dataRate.toFixed(1)}/s`, icon: <BarChart3 className="w-6 h-6" /> },
            { label: "Active Streams", value: isStreaming ? 1 : 0, icon: <Signal className="w-6 h-6" /> },
            { label: "Connection", value: isConnected ? 'Online' : 'Offline', icon: <Wifi className="w-6 h-6" /> }
          ].map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
              <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Stream Data */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Live Stream Data
            </h3>
            <div className="flex items-center space-x-2">
              {isStreaming && (
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">LIVE</span>
                </div>
              )}
            </div>
          </div>
          
          <div 
            ref={streamRef}
            className="h-96 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          >
            {streamData.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No data streamed yet. Connect and start streaming to see live data.</p>
              </div>
            ) : (
              streamData.map((data) => (
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-800/30 border border-gray-700/30 rounded-lg p-4 hover:border-cyan-500/30 transition-colors duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTypeColor(data.type)}`}></div>
                        <span className="font-mono text-sm text-gray-300">{data.type}</span>
                        <span className={`flex items-center space-x-1 text-xs ${getStatusColor(data.status)}`}>
                          {getStatusIcon(data.status)}
                          <span>{data.status}</span>
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Value:</span>
                          <span className="ml-2 text-cyan-400 font-mono">{data.value}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Source:</span>
                          <span className="ml-2 text-purple-400 font-mono">{data.source}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Time:</span>
                          <span className="ml-2 text-gray-400 font-mono">
                            {new Date(data.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 