import { CommunityProfileView } from 'src/sections/community/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: User Profile',
};

export default function UserProfilePage({ params }) {
  const { id } = params;

  return <CommunityProfileView id={id} />;
}
