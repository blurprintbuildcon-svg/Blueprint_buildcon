import ReferPage, { metadata as referMetadata } from '../refer/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...referMetadata,
  alternates: {
    canonical: '/refer',
  },
};

export default ReferPage;
