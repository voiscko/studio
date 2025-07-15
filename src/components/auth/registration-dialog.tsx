
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <Input id="username" placeholder="your_username" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="firstName">First Name <RequiredAsterisk /></Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="lastName">Last Name <RequiredAsterisk /></Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email-reg">Email <RequiredAsterisk /></Label>
                <Input type="email" id="email-reg" placeholder="email@example.com" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="address">Address <RequiredAsterisk /></Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-1.5 col-span-2">
                  <Label htmlFor="city">City <RequiredAsterisk /></Label>
                  <Input id="city" placeholder="Anytown" />
                </div>
                 <div className="grid gap-1.5">
                  <Label htmlFor="zip">ZIP Code <RequiredAsterisk /></Label>
                  <Input id="zip" placeholder="12345" />
                </div>
              </div>
               <div className="grid gap-1.5">
                  <Label htmlFor="card-number">Card Number <RequiredAsterisk /></Label>
                  <div className="relative">
                    <Input id="card-number" placeholder="•••• •••• •••• ••••" onChange={handleCardNumberChange} />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        {cardType === 'visa' && <VisaIcon className="h-6 w-auto" />}
                        {cardType === 'mastercard' && <MastercardIcon className="h-6 w-auto" />}
                    </div>
                  </div>
                </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="expiry">Expiry Date <RequiredAsterisk /></Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="cvc">CVC <RequiredAsterisk /></Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">Complete Registration</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

