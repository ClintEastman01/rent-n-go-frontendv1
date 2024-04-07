import { useAuth } from '@clerk/clerk-expo';
export default async function getUserToken() {
  console.log('Print from function');
  const { getToken } = useAuth();
  const fetchedToken = await getToken({ template: 'oneWeek' });
  console.log(fetchedToken);
  return fetchedToken;
}
