import { _mock } from 'src/_mock';

// TO GET THE MODERATOR FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedSettings } from 'src/hooks/use-mocked-settings';
// const { settings } = useMockedSettings();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { settings } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedSettings() {
  const settings = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jaydon Frankie',
    email: 'admin@azproductionguide.com',
    password: 'PnTW73!@E1',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  };

  return { settings };
}
