import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

export const metadata: Metadata = {
  title: 'Terms & Conditions | BluePrint Build-Con Construction Services',
  description:
    'Commercial terms, architectural blueprint scopes, milestone payments, structural warranties, and civil engineering contracts for BluePrint Build-Con.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
