# AbyssGate - Modern Web Showcase

A stunning, interactive web showcase built with Next.js, featuring advanced animations, sound effects, and modern design principles.

## ✨ Features

### 🎨 Visual Effects

- **3D Background Animation** - Vanta.js birds flock effect
- **Matrix-Style Letter Glitch** - Animated falling letters with glitch effects
- **Custom Cursor** - Dual-layer cursor with smooth following animation
- **Click Spark Effects** - Particle effects triggered by user interactions
- **Smooth Scrolling** - GSAP ScrollSmoother for buttery-smooth scrolling
- **Horizontal Story Sections** - Pin scrolling with smooth transitions

### 🎵 Sound System

- **Interactive Sound Effects** - Hover, click, scroll, and glitch sounds
- **Web Audio API Integration** - Programmatically generated sounds
- **Volume Control** - Adjustable volume with mute functionality
- **Sound Manager** - Centralized sound management system

### 📱 Modern UI/UX

- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Loading Screen** - Animated loading with progress tracking
- **Navigation Bar** - Smooth scrolling navigation with active states
- **Interactive Elements** - Hover effects, animations, and micro-interactions
- **Accessibility** - Keyboard navigation and screen reader support

### 🚀 Performance

- **Optimized Animations** - Hardware-accelerated CSS transforms
- **Lazy Loading** - Components load as needed
- **Smooth 60fps** - Optimized for consistent frame rates
- **Mobile Optimized** - Touch-friendly interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.2 with React 19
- **Styling**: Tailwind CSS v4
- **Animations**:
  - GSAP (GreenSock) for scroll animations
  - Framer Motion for component animations
  - Three.js and Vanta.js for 3D effects
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Geist Mono

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd abyss-gate
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout with fonts and metadata
│   ├── page.js            # Main page with scroll animations
│   └── globals.css        # Global styles and Tailwind config
├── components/            # Reusable UI components
│   ├── Navbar.jsx         # Navigation with smooth scrolling
│   ├── CustomCursor.jsx   # Custom mouse cursor
│   ├── LoadingScreen.jsx  # Animated loading screen
│   ├── SoundManager.jsx   # Sound effects management
│   ├── ScrollIndicator.jsx # Enhanced scroll indicator
│   ├── Reveal.jsx         # Scroll-triggered reveal animations
│   └── ScrollWrapper.jsx  # Scroll wrapper utilities
├── sections/              # Page sections
│   ├── Hero.jsx          # Landing section with glitch text
│   ├── StoryBlock.jsx    # Enhanced story content blocks
│   ├── About.jsx         # About section with features
│   └── Contact.jsx       # Contact form and info
└── animations/           # Animation components
    ├── ClickSpark.jsx    # Click particle effects
    ├── LetterGlitch.jsx  # Matrix-style letter animations
    └── VantaBirdsBackground.jsx # 3D background effect
```

## 🎯 Key Components

### Hero Section

- Glitch text effects with random character substitutions
- Animated paragraph with hidden message reveal
- Call-to-action buttons with hover effects
- Floating animated elements

### Story Blocks

- Horizontal scrolling with smooth transitions
- Enhanced images with hover effects and badges
- Interactive buttons with sound feedback
- Progress indicators

### About Section

- Feature grid with icons and descriptions
- Statistics with animated counters
- Hover effects and smooth animations

### Contact Section

- Interactive contact form
- Social media links
- Availability status indicator
- Sound feedback on interactions

## 🎵 Sound System

The project includes a comprehensive sound system using Web Audio API:

- **Hover Sounds** - Subtle frequency changes on hover
- **Click Sounds** - Short, crisp click feedback
- **Scroll Sounds** - Ambient scroll audio
- **Glitch Sounds** - Matrix-style glitch effects
- **Volume Control** - Adjustable volume with mute option

## 🎨 Customization

### Colors

The project uses a cyberpunk-inspired color palette:

- Primary: Cyan (#00ffff)
- Secondary: Purple (#ff00ff)
- Accent: Pink (#ff1493)
- Background: Black (#000000)

### Animations

All animations are customizable through:

- Framer Motion variants
- GSAP tweens
- CSS custom properties

### Sound Effects

Sound effects can be customized by:

- Modifying frequency values in SoundManager
- Adding new audio contexts
- Implementing custom sound files

## 📱 Responsive Design

The project is fully responsive with:

- Mobile-first approach
- Touch-friendly interactions
- Adaptive layouts
- Optimized performance on all devices

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

The project is optimized for Vercel deployment:

1. Connect your repository to Vercel
2. Deploy automatically on push
3. Enjoy optimized performance

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- ESLint configuration included
- Prettier formatting
- TypeScript-ready structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Vanta.js** for 3D background effects
- **GSAP** for smooth animations
- **Framer Motion** for React animations
- **Tailwind CSS** for styling
- **Lucide** for beautiful icons

---

**AbyssGate** - Where innovation meets imagination. 🚀
