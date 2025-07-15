'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Basic features to get started',
    features: [
      { text: 'Basic flashcards', included: true },
      { text: '30 min study timer', included: true },
      { text: '5 note collections', included: true },
      { text: 'No progress analytics', included: false },
      { text: 'No cloud sync', included: false },
    ],
    buttonText: 'Current Plan',
    buttonVariant: 'secondary',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$9.99',
    description: 'Full features for serious students',
    features: [
      { text: 'Unlimited flashcards', included: true },
      { text: 'Unlimited study timer', included: true },
      { text: 'Unlimited notes', included: true },
      { text: 'Detailed analytics', included: true },
      { text: 'Cloud sync', included: true },
    ],
    buttonText: 'Upgrade Now',
    buttonVariant: 'primary',
    popular: true,
  },
  {
    name: 'Student',
    price: '$4.99',
    description: 'Discounted premium for students',
    features: [
      { text: 'Unlimited flashcards', included: true },
      { text: 'Unlimited study timer', included: true },
      { text: 'Unlimited notes', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Cloud sync', included: true },
    ],
    buttonText: 'Verify Student Status',
    buttonVariant: 'secondary',
    popular: false,
  },
];

const faqs = [
    {
        question: "Can I switch plans later?",
        answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will take effect at the beginning of your next billing cycle."
    },
    {
        question: "Is there a free trial for the Premium plan?",
        answer: "Absolutely! We offer a 7-day free trial for our Premium plan. You can explore all the features before deciding if it's right for you."
    },
    {
        question: "How do I cancel my subscription?",
        answer: "You can easily cancel your subscription from your account settings page. The cancellation will be effective at the end of the current billing period, and you won't be charged again."
    },
    {
        question: "What happens to my data if I cancel?",
        answer: "If you cancel your subscription, your account will be downgraded to the Free plan. You will retain access to your data, but features exclusive to the paid plan will be disabled."
    }
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight">Choose Your StudyBuddy Plan</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Select the perfect plan to boost your productivity and achieve your academic goals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className={`bg-card border ${plan.popular ? 'border-primary shadow-lg' : 'border-border'} rounded-xl flex flex-col relative`}>
                {plan.popular && (
                  <div className="absolute top-0 right-4 -mt-3 bg-primary text-primary-foreground text-xs font-bold uppercase px-3 py-1 rounded-full">Popular</div>
                )}
                <CardHeader className="pt-8">
                  <h2 className="text-2xl font-semibold">{plan.name}</h2>
                  <p className="text-muted-foreground h-10">{plan.description}</p>
                  <div className="flex items-baseline pt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                        )}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full"
                    variant={plan.buttonVariant as any}
                    size="lg"
                    disabled={plan.buttonText === 'Current Plan'}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}
