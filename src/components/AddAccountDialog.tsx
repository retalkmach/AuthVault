import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { cn } from '../lib/utils';
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

  if (!isOpen) return null;

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
    
    setFormData({ issuer: '', accountName: '', secret: '' });
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

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
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
