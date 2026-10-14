import { ArrowLeft } from 'lucide-react';
import './BackButton.css';

// The small grey "take me home" / "back" control on inner pages.
// tone="light" is for white pages, where the hover colour has to be dark.
export default function BackButton({ onClick, children, tone = 'dark', icon = true, className = '' }) {
  return (
    <button type="button" onClick={onClick} className={`back-button back-button--${tone} ${className}`}>
      {icon && <ArrowLeft className="back-icon" />}
      {children}
    </button>
  );
}
