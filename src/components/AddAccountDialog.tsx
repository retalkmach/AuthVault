import { useState } from 'react';
import { X, Check, Link, AlertCircle } from 'lucide-react';
import * as OTPAuth from 'otpauth';
import { useAuthStore } from '../store';
import { AccountType } from '../types';

interface AddAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAccountDialog({ isOpen, onClose }: AddAccountDialogProps) {
  const addAccount = useAuthStore((state) => state.addAccount);
  const [formData, setFormData] = useState({
    issuer: '',
    accountName: '',
    secret: '',
  });
  const [importUrl, setImportUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImport = (url: string) => {
    setImportUrl(url);
    setError(null);
    
    if (!url) return;

    try {
      const parsed = OTPAuth.URI.parse(url);
      
      // Update form data with parsed values
      setFormData({
        issuer: parsed.issuer || '',
        accountName: parsed.label || '',
        secret: parsed.secret.base32,
      });
    } catch (err) {
      setError('Invalid otpauth URL');
      // Don't clear form data, maybe the user is just typing
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.secret || !formData.accountName) return;

    // Basic cleaning of secret (remove spaces)
    const cleanSecret = formData.secret.replace(/\s/g, '').toUpperCase();

    addAccount({
      issuer: formData.issuer || 'Unknown',
      accountName: formData.accountName,
      secret: cleanSecret,
      type: AccountType.TOTP,
    });
    
    // Reset all states
    setFormData({ issuer: '', accountName: '', secret: '' });
    setImportUrl('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">Add Account</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 pb-0 space-y-3">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link className="h-4 w-4 text-slate-500" />
                </div>
                <input
                    type="text"
                    placeholder="Paste otpauth:// URL to autofill"
                    className={`w-full bg-slate-950 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm`}
                    value={importUrl}
                    onChange={(e) => handleImport(e.target.value)}
                />
            </div>
             {error && (
                <div className="flex items-center gap-2 text-xs text-red-400">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                </div>
            )}
            
            <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-slate-500 font-medium">OR ENTER MANUALLY</span>
                <div className="flex-grow border-t border-slate-800"></div>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 pt-0 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Issuer (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. Google, GitHub" 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Account Name</label>
            <input 
              type="text" 
              placeholder="e.g. user@example.com" 
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Secret Key</label>
            <input 
              type="text" 
              placeholder="Base32 Secret (e.g. JBSW Y3DP...)" 
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono"
              value={formData.secret}
              onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <Check className="w-4 h-4" />
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
