import { EventsProfileView } from 'src/sections/events/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: User Profile',
};

export default function UserProfilePage({ params }) {
  const { id } = params;

  return <EventsProfileView id={id} />;
}
