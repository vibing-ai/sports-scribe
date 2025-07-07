'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { 
  FiMenu, 
  FiX, 
  FiTwitter, 
  FiGithub, 
  FiLinkedin, 
  FiRss, 
  FiHome, 
  FiBookOpen, 
  FiInfo, 
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,
  FiClock,
  FiChevronRight
} from 'react-icons/fi'

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const isActive = (path: string) => pathname === path
  
  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/95 backdrop-blur-md shadow-md' 
            : 'bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center group">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-90 flex items-center">
                  <span className="mr-2">⚽</span>
                  Sports Scribe
                </span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <NavLink href="/" isActive={isActive('/')} icon={<FiHome className="w-4 h-4 mr-2" />}>
                  Home
                </NavLink>
                <NavLink href="/articles" isActive={isActive('/articles')} icon={<FiBookOpen className="w-4 h-4 mr-2" />}>
                  Articles
                </NavLink>
                <NavLink href="/about" isActive={isActive('/about')} icon={<FiInfo className="w-4 h-4 mr-2" />}>
                  About
                </NavLink>
              </nav>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/admin" className="group">
                <Button 
                  variant="ghost"
                  className="relative group-hover:bg-gray-100 dark:group-hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <FiUser className="w-4 h-4" />
                  <span>Admin</span>
                </Button>
              </Link>
              <Link href="/admin">
                <Button 
                  className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center"
                >
                  <span className="relative z-10 flex items-center">
                    <FiRss className="w-4 h-4 mr-2" />
                    <span>New Article</span>
                  </span>
                </Button>
              </Link>
            </div>
            <button 
              className="md:hidden p-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 ${
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="px-4 py-6 space-y-4">
            <MobileNavLink 
              href="/" 
              isActive={isActive('/')}
              icon={<FiHome className="w-5 h-5" />}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </MobileNavLink>
            <MobileNavLink 
              href="/articles" 
              isActive={isActive('/articles')}
              icon={<FiBookOpen className="w-5 h-5" />}
              onClick={() => setMobileMenuOpen(false)}
            >
              Articles
            </MobileNavLink>
            <MobileNavLink 
              href="/about" 
              isActive={isActive('/about')}
              icon={<FiInfo className="w-5 h-5" />}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </MobileNavLink>
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
              <Link 
                href="/admin" 
                className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiUser className="w-4 h-4 mr-2" />
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Add padding to account for fixed header */}
      <div className="h-20"></div>
    </>
  )
}

function NavLink({ 
  href, 
  children, 
  isActive, 
  icon 
}: { 
  href: string; 
  children: React.ReactNode;
  isActive: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Link 
      href={href}
      className={`relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20' 
          : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
      }`}
    >
      {icon && <span className="text-gray-500">{icon}</span>}
      <span>{children}</span>
    </Link>
  )
}

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  icon?: React.ReactNode;
  onClick: () => void;
}

function MobileNavLink({ 
  href, 
  children, 
  isActive,
  icon,
  onClick
}: MobileNavLinkProps) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
        isActive 
          ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600' 
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
      }`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-100 dark:border-gray-800/50 mt-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-1/2 left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Sports Scribe
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
              Intelligent sports journalism powered by AI. Delivering accurate, engaging, and up-to-date sports content.
            </p>
            <div className="flex space-x-4 mt-6">
              {['twitter', 'github', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="sr-only">{social}</span>
                  <span className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                    <SocialIcon name={social} />
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">Navigation</h4>
            <nav className="space-y-3">
              <FooterLink href="/" icon={<FiHome className="w-4 h-4" />}>Home</FooterLink>
              <FooterLink href="/articles" icon={<FiBookOpen className="w-4 h-4" />}>Articles</FooterLink>
              <FooterLink href="/about" icon={<FiInfo className="w-4 h-4" />}>About</FooterLink>
              <FooterLink href="/admin" icon={<FiUser className="w-4 h-4" />}>Admin</FooterLink>
            </nav>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">Company</h4>
            <nav className="space-y-3">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/press">Press</FooterLink>
            </nav>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">Legal</h4>
            <nav className="space-y-3">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
            </nav>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} Sports Scribe. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-4 md:mt-0">
              <FooterLink href="/sitemap">Sitemap</FooterLink>
              <FooterLink href="/accessibility">Accessibility</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ 
  href, 
  children, 
  icon 
}: { 
  href: string; 
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Link 
      href={href}
      className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2"
    >
      {icon && <span className="text-gray-500">{icon}</span>}
      <span>{children}</span>
    </Link>
  )
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    twitter: <FiTwitter className="w-5 h-5" />,
    github: <FiGithub className="w-5 h-5" />,
    linkedin: <FiLinkedin className="w-5 h-5" />,
    rss: <FiRss className="w-5 h-5" />
  }
  
  return icons[name] || <span>{name}</span>
}
