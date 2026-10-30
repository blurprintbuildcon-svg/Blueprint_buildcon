import TermsAndConditionsPage from '../terms/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | BluePrint BuildCon',
  description:
  'Commercial terms, architectural blueprint scopes, milestone payments, structural warranties, and civil engineering contracts for BluePrint BuildCon.',
};

export default function TermsAliasPage() {
  return <TermsAndConditionsPage />;
}
