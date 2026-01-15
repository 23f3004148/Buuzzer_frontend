import React from 'react';
import { AppState } from '@/types';
import { Linkedin, Twitter, Youtube, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (state: AppState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', state: AppState.FEATURES },
      { label: 'How It Works', state: AppState.HOW_IT_WORKS },
      { label: 'Pricing', state: AppState.PRICING },
      { label: 'Blog', state: AppState.BLOG },
    ],
    company: [
      { label: 'About Us', state: AppState.CONTACT },
      { label: 'Contact', state: AppState.CONTACT },
    ],
    legal: [
      { label: 'Privacy Policy', state: AppState.PRIVACY },
      { label: 'Terms of Service', state: AppState.TERMS },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-section py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <img
                  src="/buzzer-full-logo.svg"
                  alt="BUUZZER icon"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <span className="text-xl font-bold">
                BUUZZER<span className="text-primary">.io</span>
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
              Your AI-powered interview copilot. Real-time guidance, structured prompts, 
              and mentor sessions to help you ace every interview.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-primary-foreground/70 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.state)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.state)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.state)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} BUUZZER.io. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-primary-foreground/40">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span>Proudly helping candidates worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
