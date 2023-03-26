import Navbar from './nav'
import './globals.css'

export const metadata = {
  title: 'Reddit Clone',
  description:
    'This app is used to learn next.js, and implements some utilities of Reddit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
