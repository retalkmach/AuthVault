import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Layout } from './components/Layout';
import { AccountCard } from './components/AccountCard';
import { AddAccountDialog } from './components/AddAccountDialog';
import { useAuthStore } from './store';

function App() {
  const { accounts } = useAuthStore();
  const [isAddOpen, setIsAddOpen] = useState(false);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
      
      {accounts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 mb-4">No accounts yet.</p>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="text-indigo-400 hover:text-indigo-300 font-medium text-sm"
          >
            Add one to get started
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


export default App;
