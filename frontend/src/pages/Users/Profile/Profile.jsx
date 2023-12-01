import { useEffect, useState } from 'react'
import { getMyProfile } from '../../../services/user';
import ProfileCard from './ProfileCard/ProfileCard';

function Profile() {

  const [profile, setProfile] = useState();

  useEffect(() => {
    getMyUserProfile();
  }, []);

  async function getMyUserProfile() {
    // API request which will retrieve the user profile:
    const data = await getMyProfile();
    setProfile(data);
  }

  return (
    profile && <ProfileCard myProfile={profile} />
  )
}

export default Profile