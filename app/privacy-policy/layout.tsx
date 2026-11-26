import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';

export const metadata: Metadata = {
  title: 'Privacy Policy | BluePrint Build-Con',
  description:
    'Privacy Policy describing the collection, use, and protection of customer information at BluePrint Build-Con under the Digital Personal Data Protection Act.',
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
