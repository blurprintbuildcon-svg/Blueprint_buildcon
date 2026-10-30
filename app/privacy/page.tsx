import PrivacyPolicyPage from '../privacy-policy/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BluePrint Build-Con',
  description:
  'Privacy Policy describing collection, use, and protection of personal data by BluePrint Build-Con in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act).',
};

export default function PrivacyAliasPage() {
  return <PrivacyPolicyPage />;
}
