import { useEffect, useState } from 'react';
import { Copy, Clock, Trash2 } from 'lucide-react';
import { Account } from '../types';
import { generateToken } from '../lib/totp';
import { useAuthStore } from '../store';
import { useTranslation } from 'react-i18next';

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  const removeAccount = useAuthStore((state) => state.removeAccount);
  const [tokenData, setTokenData] = useState(generateToken(account));
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTokenData(generateToken(account));
    }, 1000);
    return () => clearInterval(interval);
  }, [account]);

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenData.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent copy trigger
    if (confirm(t('account_card.delete_confirm', { name: account.accountName }))) {
      removeAccount(account.id);
    }
  };

  const progress = (tokenData.timeLeft / tokenData.period) * 100;
  const isExpiring = tokenData.timeLeft <= 5;

  return (
    <div 
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer overflow-hidden"
      onClick={handleCopy}
    >
      {/* Progress Bar Background */}
      <div 
        className={`absolute bottom-0 left-0 h-1 transition-all duration-1000 ease-linear ${isExpiring ? 'bg-red-500' : 'bg-indigo-500'}`} 
        style={{ width: `${progress}%` }}
      />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{account.issuer}</h3>
          <p className="text-slate-700 dark:text-slate-200 text-sm">{account.accountName}</p>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={handleDelete}
            className="text-slate-400 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100"
            title={t('account_card.delete')}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              {copied ? <span className="text-xs text-green-500 dark:text-green-400 font-medium">{t('account_card.copied')}</span> : <Copy className="w-4 h-4" />}
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="font-mono text-4xl font-bold tracking-wider text-slate-900 dark:text-white">
          {tokenData.token.slice(0, 3)} <span className="text-slate-300 dark:text-slate-500"> </span> {tokenData.token.slice(3)}
        </div>
        <div className={`flex items-center gap-1.5 text-xs font-medium ${isExpiring ? 'text-red-500 dark:text-red-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{tokenData.timeLeft}s</span>
        </div>
      </div>
    </div>
  );
}

