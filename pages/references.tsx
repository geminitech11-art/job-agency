import { GetServerSidePropsContext } from 'next';

/**
 * References route removed — redirect to home.
 * Dynamic (getServerSideProps) only; never prerendered, so no /de/references build error.
 */
export default function ReferencesRedirect() {
  return null;
}

export async function getServerSideProps(_ctx: GetServerSidePropsContext) {
  return { redirect: { destination: '/', permanent: false } };
}
