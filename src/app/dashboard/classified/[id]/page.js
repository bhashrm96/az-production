import { ClassifiedProfileView } from 'src/sections/classified/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: User Profile',
};

export default function UserProfilePage({ params }) {
  const { id } = params;

  return <ClassifiedProfileView id={id} />;
}
