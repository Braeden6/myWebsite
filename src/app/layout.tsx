import './globals.css'

export const metadata = {
  title: 'Braeden\'s Consulting',
  description: 'This website is created by Braeden for learning and displaying recent projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
