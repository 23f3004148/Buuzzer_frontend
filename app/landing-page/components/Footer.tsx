'use client';

import { useState, useEffect } from 'react';
import SpaLink, { spaNavigate } from '../../../components/common/SpaLink';
import Icon from '@/components/ui/AppIcon';
import { fetchSiteInfo } from '@/services/backendApi';
import { SiteInfo } from '@/types';

const Footer = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear());
    fetchSiteInfo()
      .then((info) => setSiteInfo(info))
      .catch(() => setSiteInfo(null));
  }, []);

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'FAQ', href: '#faq' }
    ],
    company: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Responsible Use', href: '/responsible-ai-use' },
      { label: 'Security', href: '/security' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: 'CameraIcon', href: siteInfo?.instagramUrl || 'https://instagram.com' },
    { name: 'LinkedIn', icon: 'BuildingOfficeIcon', href: siteInfo?.linkedinUrl || 'https://linkedin.com' },
    { name: 'YouTube', icon: 'PlayCircleIcon', href: siteInfo?.youtubeUrl || 'https://youtube.com' }
  ];

  return (
    <footer
      className="text-white"
      style={{
        background: 'linear-gradient(135deg, #1f3b63 0%, #173252 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-1">
              <div className="flex h-20 w-auto items-center">
                <img src="/footer_logo.svg" alt="Buuzzer" className="h-20 w-auto object-contain" />
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-sm">
              Real-time AI assistance for live interviews. Privacy-first, user-controlled, and designed for professional preparation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent transition-colors duration-250 flex items-center justify-center"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} />
                </a>
              ))}
              {siteInfo?.whatsappNumber && (
                <a
                  href={`https://wa.me/${siteInfo.whatsappNumber.replace(/\\D/g, '')}`}
                  className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1ebe57] transition-colors duration-250 flex items-center justify-center text-white text-lg font-bold"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noreferrer"
                >
                  WA
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-250"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-250"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal & Security</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <SpaLink
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-250"
                  >
                    {link.label}
                  </SpaLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary-foreground/70 text-sm">
              {isHydrated ? (
                <>© {currentYear} Buuzzer Copilot. All rights reserved.</>
              ) : (
                <>© 2026 Buuzzer Copilot. All rights reserved.</>
              )}
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="ShieldCheckIcon" size={16} variant="solid" />
                <span className="text-primary-foreground/70">Privacy-First</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="LockClosedIcon" size={16} variant="solid" />
                <span className="text-primary-foreground/70">No Data Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="HandRaisedIcon" size={16} />
                <span className="text-primary-foreground/70">User Controlled</span>
              </div>
              <SpaLink
                href="/admin/login"
                className="rounded-md px-2 py-1 text-primary-foreground/50 transition hover:text-accent hover:bg-primary-foreground/10"
              >
                Admin
              </SpaLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
