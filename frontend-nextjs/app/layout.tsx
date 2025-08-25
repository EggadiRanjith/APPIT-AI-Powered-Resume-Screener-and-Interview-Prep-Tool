import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-jakarta'
});

export const metadata = {
  title: "ResumeAI - AI-Powered Resume Screening",
  description: "Advanced AI-powered resume screening and analysis",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
