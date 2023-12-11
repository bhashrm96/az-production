import { GigsProfileView } from 'src/sections/gigs/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: User Profile',
};

export default function UserProfilePage({ params }) {
  const { id } = params;

  return <GigsProfileView id={id} />;
}
