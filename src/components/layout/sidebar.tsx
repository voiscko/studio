
'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, Info, Scale, Tag, Pencil, LayoutDashboard, Book, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const publicMenuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About StudyBuddy', href: '/about', icon: Info },
    { name: 'Pricing Plans', href: '/pricing', icon: Tag },
    { name: 'Legal Notice', href: '/legal', icon: Scale },
];

const privateMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Math', href: '/subjects/math', icon: Book },
    { name: 'German', href: '/subjects/german', icon: Book },
    { name: 'AI Tutor', href: '/ai-tutor', icon: BrainCircuit },
]

export default function AppSidebar() {
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setAuth(!!localStorage.getItem('studybuddy-auth'));
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const menuItems = auth ? privateMenuItems : publicMenuItems;

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-border/20 bg-card">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <Pencil className="h-6 w-6" />
            <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">StudyBuddy</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
             <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')}
                    tooltip={item.name}
                >
                    <Link href={item.href}>
                        <item.icon />
                        <span>{item.name}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
