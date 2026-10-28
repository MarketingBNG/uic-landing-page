import type { Metadata, Viewport } from "next"
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
})

// Set NEXT_PUBLIC_GTM_ID to the real container ID before going live.
// While it is unset or still the placeholder, GTM is not loaded.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-XXXXXXX"
// Runs inline in <head> during parsing, as the original snippet did.
const GTM_SNIPPET = `window.dataLayer=window.dataLayer||[];(function(w,d,s,l,i){if(!i||i.indexOf('XXXX')>-1)return;w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});`

export const metadata: Metadata = {
  title: "US Expansion & Tax Advisory for Indian Founders | USAIndiaCFO",
  description:
    "Advisory on US business structure, LLC vs C-Corp, India–US tax and compliance, plus Virtual CFO services for Indian founders. Request a discovery call.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${dmSerif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }} />
      </head>
      <body className="m-0">
        {children}
      </body>
    </html>
  )
}
