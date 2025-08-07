import React from 'react';
import { useLanguage } from '@/contexts/language';
import { Button } from '@/components/ui/button';
import { Globe, User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const AdminHeader: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className={`text-xl font-semibold text-gray-800 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
          {language === 'ar' ? 'لوحة التحكم الإدارية' : 'Panneau d\'Administration'}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="flex items-center gap-2"
        >
          <Globe size={16} />
          <span className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
            {language === 'ar' ? 'FR' : 'العربية'}
          </span>
        </Button>

        {/* Admin User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <User size={16} />
              <span className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                {language === 'ar' ? 'المدير' : 'Admin'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings size={16} />
              <span className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                {language === 'ar' ? 'الإعدادات' : 'Paramètres'}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
              <LogOut size={16} />
              <span className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                {language === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;