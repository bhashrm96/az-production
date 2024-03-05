import { UserProfileView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: User Profile',
};

export default function UserProfilePage({ params }) {
  const { id } = params;

  return <UserProfileView id={id} />;
}
