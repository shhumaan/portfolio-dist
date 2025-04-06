interface QuoteCalloutProps {
  quote: string
  author?: string
}

export function QuoteCallout({ quote, author }: QuoteCalloutProps) {
  return (
    <blockquote className="border-l-4 border-green-500 pl-6 py-4 bg-card/50 rounded-r-lg">
      <p className="text-lg italic font-accent mb-2">{quote}</p>
      {author && <footer className="text-sm text-muted-foreground">— {author}</footer>}
    </blockquote>
  )
}

