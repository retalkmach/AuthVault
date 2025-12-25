import { Layout } from './components/Layout';
import { AccountCard } from './components/AccountCard';
import { useAuthStore } from './store';

function App() {
  const { accounts } = useAuthStore();

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
      
      {accounts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500">No accounts yet. Add one to get started.</p>
        </div>
      )}
    </Layout>
  );
}

export default App;
