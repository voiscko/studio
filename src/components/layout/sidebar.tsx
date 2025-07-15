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
import { useState } from 'react';

export default function AppSidebar() {
  const [activeItem, setActiveItem] = useState('Pricing Plans');

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
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActiveItem('Home')} 
              isActive={activeItem === 'Home'}
              tooltip="Home"
            >
              <Home />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
                onClick={() => setActiveItem('About StudyBuddy')}
                isActive={activeItem === 'About StudyBuddy'}
                tooltip="About StudyBuddy"
            >
              <Info />
              <span>About StudyBuddy</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
                onClick={() => setActiveItem('Pricing Plans')}
                isActive={activeItem === 'Pricing Plans'}
                tooltip="Pricing Plans"
            >
              <Tag />
              <span>Pricing Plans</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
                onClick={() => setActiveItem('Legal/Impressum')}
                isActive={activeItem === 'Legal/Impressum'}
                tooltip="Legal/Impressum"
            >
              <Scale />
              <span>Legal/Impressum</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
