import { FeedsProfileView } from 'src/sections/feeds/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: User Profile',
};

export default function UserProfilePage({ params }) {
  const { id } = params;

  return <FeedsProfileView id={id} />;
}
