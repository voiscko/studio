
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MastercardIcon } from '../icons/mastercard-icon';
import { VisaIcon } from '../icons/visa-icon';
import { useToast } from '@/hooks/use-toast';

interface RegistrationDialogProps {
    planName?: string;
    trigger: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

type CardType = 'visa' | 'mastercard' | null;

export default function RegistrationDialog({ planName, trigger, open, onOpenChange, onSuccess }: RegistrationDialogProps) {
  const [cardType, setCardType] = useState<CardType>(null);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    password: '',
    confirmPassword: ''
  });
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    for (const key in formData) {
      if (formData[key as keyof typeof formData].trim() === '') {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please fill out all required fields.",
        });
        return;
      }
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Passwords do not match.",
      });
      return;
    }

    // "Save" user data to local storage
    const user = {
      username: formData.username,
      password: formData.password
    };
    localStorage.setItem('studybuddy-user', JSON.stringify(user));

    toast({
        title: "Registration Successful!",
        description: "You can now log in with your new credentials.",
    });

    onSuccess();
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    const number = e.target.value;
    if (number.startsWith('4')) {
      setCardType('visa');
    } else if (number.startsWith('5')) {
      setCardType('mastercard');
    } else {
      setCardType(null);
    }
  }

  const RequiredAsterisk = () => <span className="text-primary">*</span>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{planName ? `Register for ${planName} Plan` : 'Create Your Account'}</DialogTitle>
          <DialogDescription>
            Complete the form below to create your account. This data will not be saved.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
              <div className="grid gap-1.5">
                <Label htmlFor="username">Username <RequiredAsterisk /></Label>
                <Input id="username" placeholder="your_username" value={formData.username} onChange={handleInputChange} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="password">Password <RequiredAsterisk /></Label>
                <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="confirmPassword">Confirm Password <RequiredAsterisk /></Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="firstName">First Name <RequiredAsterisk /></Label>
                  <Input id="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="lastName">Last Name <RequiredAsterisk /></Label>
                  <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email <RequiredAsterisk /></Label>
                <Input type="email" id="email" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="address">Address <RequiredAsterisk /></Label>
                <Input id="address" placeholder="123 Main St" value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-1.5 col-span-2">
                  <Label htmlFor="city">City <RequiredAsterisk /></Label>
                  <Input id="city" placeholder="Anytown" value={formData.city} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-1.5">
                  <Label htmlFor="zip">ZIP Code <RequiredAsterisk /></Label>
                  <Input id="zip" placeholder="12345" value={formData.zip} onChange={handleInputChange} />
                </div>
              </div>
               <div className="grid gap-1.5">
                  <Label htmlFor="cardNumber">Card Number <RequiredAsterisk /></Label>
                  <div className="relative">
                    <Input id="cardNumber" placeholder="•••• •••• •••• ••••" value={formData.cardNumber} onChange={handleCardNumberChange} />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        {cardType === 'visa' && <VisaIcon className="h-6 w-auto" />}
                        {cardType === 'mastercard' && <MastercardIcon className="h-6 w-auto" />}
                    </div>
                  </div>
                </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="expiry">Expiry Date <RequiredAsterisk /></Label>
                  <Input id="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="cvc">CVC <RequiredAsterisk /></Label>
                  <Input id="cvc" placeholder="123" value={formData.cvc} onChange={handleInputChange} />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">Complete Registration</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
