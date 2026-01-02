import { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { Layout } from '../components/Layout';
import { AccountCard } from '../components/AccountCard';
import { AddAccountDialog } from '../components/AddAccountDialog';
import { useAuthStore } from '../store';

export default function Home() {
  const { accounts } = useAuthStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAccounts = accounts.filter(account => {
    const query = searchQuery.toLowerCase();
    return (
      account.issuer?.toLowerCase().includes(query) || 
      account.accountName.toLowerCase().includes(query)
    );
  });

  return (
    <Layout 
      action={
        <button 
          onClick={() => setIsAddOpen(true)}
          className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Account</span>
        </button>
      }
    >
      {/* Search Bar */}
      {accounts.length > 0 && (
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search accounts..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAccounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
      
      {accounts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 dark:text-slate-400 mb-4">No accounts yet.</p>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium text-sm"
          >
            Add one to get started
          </button>
        </div>
      ) : filteredAccounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">No accounts match your search.</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline text-sm"
          >
            Clear search
          </button>
        </div>
      )}

      <AddAccountDialog 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
      />
    </Layout>
  );
}
