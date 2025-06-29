'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSoundManager } from './SoundManager'
import { 
  Upload, 
  File, 
  Folder, 
  Trash2, 
  Download, 
  Eye, 
  Lock, 
  Unlock,
  Search,
  Filter,
  Grid,
  List,
  Shield,
  Database,
  Zap
} from 'lucide-react'

export default function Blightvault() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { playHover, playClick } = useSoundManager()
  const fileInputRef = useRef(null)
  
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: "Cursed_Relic_001.glb",
      type: "3D Model",
      size: "2.4 MB",
      status: "corrupted",
      uploadDate: "2024-01-15",
      description: "Ancient artifact with dark energy signatures"
    },
    {
      id: 2,
      name: "Bound_Soul_Texture.png",
      type: "Texture",
      size: "1.8 MB",
      status: "rare",
      uploadDate: "2024-01-14",
      description: "Spectral texture with ethereal properties"
    },
    {
      id: 3,
      name: "Eternal_Pact_Contract.json",
      type: "Smart Contract",
      size: "0.5 MB",
      status: "locked",
      uploadDate: "2024-01-13",
      description: "Binding contract with the abyss"
    },
    {
      id: 4,
      name: "Void_Energy_Shader.frag",
      type: "Shader",
      size: "0.3 MB",
      status: "corrupted",
      uploadDate: "2024-01-12",
      description: "Fragment shader for void energy effects"
    }
  ])
  
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setIsUploading(true)
    
    // Simulate upload process
    setTimeout(() => {
      const newAssets = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: getFileType(file.name),
        size: formatFileSize(file.size),
        status: getRandomStatus(),
        uploadDate: new Date().toISOString().split('T')[0],
        description: `Uploaded ${file.name} to the vault`
      }))
      
      setAssets([...newAssets, ...assets])
      setIsUploading(false)
      playClick()
    }, 2000)
  }

  const getFileType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase()
    const types = {
      'glb': '3D Model',
      'gltf': '3D Model',
      'png': 'Texture',
      'jpg': 'Texture',
      'jpeg': 'Texture',
      'json': 'Smart Contract',
      'frag': 'Shader',
      'vert': 'Shader',
      'mp3': 'Audio',
      'wav': 'Audio'
    }
    return types[ext] || 'Unknown'
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getRandomStatus = () => {
    const statuses = ['corrupted', 'rare', 'locked']
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'corrupted': return 'from-red-500 to-orange-500'
      case 'rare': return 'from-purple-500 to-pink-500'
      case 'locked': return 'from-gray-500 to-blue-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'corrupted': return <Zap className="w-4 h-4" />
      case 'rare': return <Shield className="w-4 h-4" />
      case 'locked': return <Lock className="w-4 h-4" />
      default: return <File className="w-4 h-4" />
    }
  }

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || asset.status === filterStatus
    return matchesSearch && matchesFilter
  })

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
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Blightvault
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Vault of corrupted and rare assets from the depths of the abyss. 
            Store your cursed relics and forbidden knowledge safely.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Upload to the Vault
              </h3>
              <p className="text-gray-400 mb-6">
                Drag and drop your cursed assets or click to browse
              </p>
              
              <div 
                className="border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-cyan-500/50 transition-colors duration-300 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={playHover}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                    <p className="text-cyan-400">Uploading to the vault...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <Upload className="w-12 h-12 text-gray-400" />
                    <p className="text-gray-400">Click to upload or drag files here</p>
                    <p className="text-sm text-gray-500">Supports: GLB, PNG, JSON, Shaders, Audio</p>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                accept=".glb,.gltf,.png,.jpg,.jpeg,.json,.frag,.vert,.mp3,.wav"
              />
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search the vault..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Filters and View */}
          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            >
              <option value="all">All Status</option>
              <option value="corrupted">Corrupted</option>
              <option value="rare">Rare</option>
              <option value="locked">Locked</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-gray-800/50 border border-gray-700/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                onMouseEnter={playHover}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                onMouseEnter={playHover}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Assets Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}
        >
          {filteredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              onMouseEnter={playHover}
              className={`bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 ${viewMode === 'list' ? 'flex items-center space-x-4' : ''}`}
            >
              {/* Asset Icon */}
              <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getStatusColor(asset.status)} flex items-center justify-center`}>
                  {getStatusIcon(asset.status)}
                </div>
              </div>

              {/* Asset Info */}
              <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white truncate">{asset.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(asset.status)} bg-clip-text text-transparent`}>
                    {asset.status}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-2">{asset.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{asset.type}</span>
                  <span>{asset.size}</span>
                </div>
                
                <div className="text-xs text-gray-500 mt-1">
                  Uploaded: {asset.uploadDate}
                </div>
              </div>

              {/* Actions */}
              <div className={`flex space-x-2 ${viewMode === 'list' ? 'flex-shrink-0' : 'mt-4'}`}>
                <button
                  onClick={playClick}
                  className="p-2 bg-gray-800/50 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors duration-300"
                  onMouseEnter={playHover}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={playClick}
                  className="p-2 bg-gray-800/50 rounded-lg hover:bg-green-500/20 hover:text-green-400 transition-colors duration-300"
                  onMouseEnter={playHover}
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={playClick}
                  className="p-2 bg-gray-800/50 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors duration-300"
                  onMouseEnter={playHover}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Assets", value: assets.length, icon: <Database className="w-6 h-6" /> },
            { label: "Corrupted", value: assets.filter(a => a.status === 'corrupted').length, icon: <Zap className="w-6 h-6" /> },
            { label: "Rare Items", value: assets.filter(a => a.status === 'rare').length, icon: <Shield className="w-6 h-6" /> },
            { label: "Locked", value: assets.filter(a => a.status === 'locked').length, icon: <Lock className="w-6 h-6" /> }
          ].map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
              <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 