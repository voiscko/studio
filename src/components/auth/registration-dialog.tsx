
'use client';

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

interface RegistrationDialogProps {
    planName: string;
    triggerButtonText: string;
    triggerButtonVariant: "default" | "primary" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function RegistrationDialog({ planName, triggerButtonText, triggerButtonVariant }: RegistrationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
            className="w-full"
            variant={triggerButtonVariant}
            size="lg"
            >
            {triggerButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Register for {planName} Plan</DialogTitle>
          <DialogDescription>
            Complete the form below to create your account. This data will not be saved.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="email-reg">Email</Label>
            <Input type="email" id="email-reg" placeholder="email@example.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main St" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-1.5 col-span-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Anytown" />
            </div>
             <div className="grid gap-1.5">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" placeholder="12345" />
            </div>
          </div>
           <div className="grid gap-1.5">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="•••• •••• •••• ••••" />
            </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" />
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full">Complete Registration</Button>
      </DialogContent>
    </Dialog>
  );
}
