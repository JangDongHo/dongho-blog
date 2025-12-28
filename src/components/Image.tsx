'use client'

interface ImageProps {
  src: string
  alt: string
  link?: string
}

export default function Image({ src, alt, link }: ImageProps) {
  const image = (
    <img
      src={src}
      alt={alt}
      className="w-full h-32 object-cover rounded-lg border border-border hover:border-primary transition-colors duration-200"
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.style.display = 'none'
      }}
    />
  )

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        {image}
      </a>
    )
  }

  return image
}

