import './globals.css'

export const metadata = {
  title: "Christie's Toronto Coffee Spots",
  description: "My favourite coffee spots in Toronto — matcha, croissants, cozy corners and everything in between.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
