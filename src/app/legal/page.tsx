
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-6 md:p-10 flex justify-center">
        <Card className="w-full max-w-4xl bg-card border border-border rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Impressum (Legal Notice)</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Information required by German law (§ 5 TMG).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <p className="text-muted-foreground">voiscko</p>
                <p className="text-muted-foreground">Contact via Telegram: <a href="https://t.me/voiscko" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@voiscko</a></p>
            </div>

            <div className="p-4 bg-secondary rounded-lg flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-lg">Important Disclaimer</h4>
                    <p className="text-muted-foreground mt-1">
                        This is a fictional legal notice for a student project. The information provided below is for demonstration purposes only and does not represent a real entity.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Data Privacy (Datenschutz)</h3>
              <p className="text-muted-foreground">
                This website is a student project and serves for demonstration purposes only. It is not a commercial service.
              </p>
              <p className="text-muted-foreground">
                Currently, this application is not connected to a database. No personal data is collected, stored, or processed on any server. If, in the future, functionality is added that requires data storage, it will be handled locally on your own device and will not be transmitted over the internet or saved on external servers. We are committed to protecting your privacy in accordance with the General Data Protection Regulation (DSGVO).
              </p>
            </div>
            
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Liability for Content</h3>
                <p className="text-muted-foreground">
                    As a service provider, we are responsible for our own content on these pages according to general laws. However, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
                </p>
            </div>

          </CardContent>
        </Card>
      </main>
    </div>
  );
}
