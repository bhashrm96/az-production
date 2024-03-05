import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

export function useActiveLink(path, deep = true) {
  let pathname = usePathname();

  const pathSegments = pathname.split('/').filter(segment => segment !== ''); // Split and remove empty segments
  const numberOfLevels = pathSegments.length;

  if (numberOfLevels === 1) {
    pathname = usePathname();
  } else if (numberOfLevels === 2) {
    pathname = `/${pathSegments[1]}/`;
  } else if (numberOfLevels === 3) {
    pathname = `/${pathSegments[1]}/${pathSegments[2]}/`;
  } else if (numberOfLevels === 4) {
    pathname = `/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/`;
  } else {
    pathname = usePathname();
  }

  const checkPath = path.startsWith('#');

  const currentPath = path === '/' ? '/' : `${path}`;

  console.log(currentPath, pathname, pathname.includes(currentPath));

  const normalActive = !checkPath && pathname.includes(currentPath);

  const deepActive = !checkPath && pathname.includes(currentPath);

  return deep ? deepActive : normalActive;
}
