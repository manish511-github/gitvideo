import { MainNav } from '@/components/main-nav';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import '@/styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
