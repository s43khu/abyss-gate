'use client'
import Reveal from '@/components/Reveal'

export default function StoryBlock({ image, title, content, flip }) {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-6 px-6 md:px-12 py-20">
      <Reveal delay={0.2}>
        <div className={`md:w-1/2 ${flip ? 'order-last' : ''}`}>
          <img src={image} alt={title} className="w-full rounded-lg shadow-lg" />
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-serif font-bold mb-4">{title}</h2>
          <p className="text-gray-400">{content}</p>
        </div>
      </Reveal>
    </section>
  )
}
