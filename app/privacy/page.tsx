import PrivacyPolicyPage from '../privacy-policy/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BluePrint BuildCon',
  description:
  'Privacy Policy describing collection, use, and protection of personal data by BluePrint BuildCon in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act).',
};

export default function PrivacyAliasPage() {
  return <PrivacyPolicyPage />;
}
