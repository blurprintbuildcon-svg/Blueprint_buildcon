import TermsAndConditionsPage from '../terms/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | BluePrint Build-Con',
  description:
  'Commercial terms, architectural blueprint scopes, milestone payments, structural warranties, and civil engineering contracts for BluePrint Build-Con.',
};

export default function TermsAliasPage() {
  return <TermsAndConditionsPage />;
}
