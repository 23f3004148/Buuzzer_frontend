import React from 'react';
import { AppState } from '../types';

interface FooterProps {
  onNavigate: (state: AppState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      className="w-full"
      style={{
        background: 'linear-gradient(135deg, #1f3b63 0%, #173252 100%)'
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-start px-5 py-8">
        <img src="/footer_logo.svg" alt="Buuzzer" className="h-12 w-auto" />
      </div>
    </footer>
  );
};

export default Footer;
