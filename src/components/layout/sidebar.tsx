
'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, Info, Scale, Tag, Pencil } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About StudyBuddy', href: '/about', icon: Info },
    { name: 'Pricing Plans', href: '/pricing', icon: Tag },
    { name: 'Legal Notice', href: '/legal', icon: Scale },
]

export default function AppSidebar() {
  const pathname = usePathname();

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
                <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton 
                        isActive={pathname === item.href}
                        tooltip={item.name}
                        as="a"
                    >
                        <item.icon />
                        <span>{item.name}</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
