
'use client';
import { ChevronLeft, ChevronRight, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginDialog from '@/components/auth/login-dialog';
import RegistrationDialog from '@/components/auth/registration-dialog';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '../ui/avatar';


export default function Header() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [auth, setAuth] = useState<{username: string} | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('studybuddy-auth');
      setAuth(authData ? JSON.parse(authData) : null);
    }
    // Check on mount
    checkAuth();
    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    }
  }, []);

  const handleRegistrationSuccess = () => {
    setIsRegistrationOpen(false);
    const authData = localStorage.getItem('studybuddy-auth');
    setAuth(authData ? JSON.parse(authData) : null);
    router.push('/dashboard');
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    const authData = localStorage.getItem('studybuddy-auth');
    setAuth(authData ? JSON.parse(authData) : null);
    router.push('/dashboard');
  }

  const handleSignOut = () => {
    localStorage.removeItem('studybuddy-auth');
    localStorage.removeItem('studybuddy-user');
    setAuth(null);
    router.push('/');
  }

  return (
    <header className="flex items-center justify-between p-4 sm:px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mr-4">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-black/50 border-none text-white">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-black/50 border-none text-white">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        {auth ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{auth.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{auth.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Student Plan
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <RegistrationDialog
                open={isRegistrationOpen}
                onOpenChange={setIsRegistrationOpen}
                onSuccess={handleRegistrationSuccess}
                trigger={
                  <Button variant="secondary" className="rounded-full">
                    Sign Up
                  </Button>
                }
            />
            <LoginDialog
                open={isLoginOpen}
                onOpenChange={setIsLoginOpen}
                onSuccess={handleLoginSuccess}
            />
          </>
        )}
      </div>
    </header>
  );
}
