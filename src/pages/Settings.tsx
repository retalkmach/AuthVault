import { Layout } from '../components/Layout';
import { useThemeStore } from '../store/theme';
import { useAuthStore } from '../store';
import { save, open } from '@tauri-apps/plugin-dialog';
import { writeTextFile, readTextFile } from '@tauri-apps/plugin-fs';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Monitor, Download, Upload } from 'lucide-react';
import { Account } from '../types';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();
  const { accounts, addAccount } = useAuthStore();
  const { t, i18n } = useTranslation();

  const handleExport = async () => {
    try {
      const filePath = await save({
        filters: [{ name: 'JSON', extensions: ['json'] }],
        defaultPath: `auth-vault-backup-${Date.now()}.json`
      });
      if (!filePath) return;

      const dataToExport = JSON.stringify(accounts, null, 2);
      await writeTextFile(filePath, dataToExport);
      alert(t('settings.data.export.success'));
    } catch (error) {
      console.error('Export failed:', error);
      alert(t('settings.data.export.fail'));
    }
  };

  const handleImport = async () => {
    try {
      const filePath = await open({
        multiple: false,
        filters: [{ name: 'JSON', extensions: ['json'] }],
      });
      if (!filePath) return;

      const content = await readTextFile(filePath);
      const importedAccounts = JSON.parse(content) as Account[];

      if (!Array.isArray(importedAccounts)) {
        throw new Error('Invalid file format');
      }

      importedAccounts.forEach(account => {
        if(account.secret && account.accountName) {
             addAccount({
                issuer: account.issuer,
                accountName: account.accountName,
                secret: account.secret,
                type: account.type,
             });
        }
      });

      alert(t('settings.data.import.success'));
    } catch (error) {
      console.error('Import failed:', error);
      alert(t('settings.data.import.fail', { error: error instanceof Error ? error.message : 'Unknown error' }));
    }
  };

  const ThemeButton = ({ value, currentTheme, children, onClick }: any) => (
    <button
      onClick={onClick}
      className={`flex-1 p-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors ${
        currentTheme === value
          ? 'bg-indigo-600 text-white'
          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <Layout
      action={
        <button
          onClick={() => navigate('/')}
          className="p-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{t('app.back')}</span>
        </button>
      }
    >
      <div className="space-y-8">
        {/* Language Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-3">{t('settings.language.title')}</h2>
          <div className="flex gap-2 p-1 bg-slate-200 dark:bg-slate-900 rounded-xl">
             <button
              onClick={() => i18n.changeLanguage('en')}
              className={`flex-1 p-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors ${
                i18n.resolvedLanguage === 'en'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => i18n.changeLanguage('zh')}
              className={`flex-1 p-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors ${
                i18n.resolvedLanguage === 'zh'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              中文
            </button>
          </div>
        </div>

        {/* Theme Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-3">{t('settings.theme.title')}</h2>
          <div className="flex gap-2 p-1 bg-slate-200 dark:bg-slate-900 rounded-xl">
            <ThemeButton value="light" currentTheme={theme} onClick={() => setTheme('light')}>
              <Sun className="w-4 h-4" /> {t('settings.theme.light')}
            </ThemeButton>
            <ThemeButton value="dark" currentTheme={theme} onClick={() => setTheme('dark')}>
              <Moon className="w-4 h-4" /> {t('settings.theme.dark')}
            </ThemeButton>
            <ThemeButton value="system" currentTheme={theme} onClick={() => setTheme('system')}>
              <Monitor className="w-4 h-4" /> {t('settings.theme.system')}
            </ThemeButton>
          </div>
        </div>

        {/* Data Management */}
        <div>
          <h2 className="text-lg font-semibold mb-3">{t('settings.data.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={handleExport}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-4 hover:border-indigo-500/50 transition-colors shadow-sm"
            >
              <Download className="w-6 h-6 text-indigo-500"/>
              <div>
                <h3 className="font-semibold text-left">{t('settings.data.export.title')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-left">{t('settings.data.export.desc')}</p>
              </div>
            </button>
            <button 
              onClick={handleImport}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-4 hover:border-indigo-500/50 transition-colors shadow-sm"
            >
              <Upload className="w-6 h-6 text-indigo-500"/>
              <div>
                <h3 className="font-semibold text-left">{t('settings.data.import.title')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-left">{t('settings.data.import.desc')}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
