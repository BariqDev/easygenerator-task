import { Toaster } from "sonner";
import AuthForms from "./modules/auth/authForm";
import { useCallback, useState } from "react";
import type { UserProfile } from "./entity/user";
import UserCard from "./modules/user/userCard";
import useGetCategoryDetails from "./modules/user/hooks/api/useGetProfile";

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>();

  // method will be called when user sign in or up
  const onUserAuthenticated = useCallback((userProfile: UserProfile) => {
    if (userProfile?.access_token) {
      localStorage.setItem("access_token", userProfile?.access_token);
    }
    setUserProfile(userProfile);
  }, []);

  const { data: fetchedProfile, isFetching } = useGetCategoryDetails();

  const activeProfile = fetchedProfile || userProfile;

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
        {isFetching ? (
          <div>Fetching ...</div>
        ) : (
          <>
            {!activeProfile ? (
              <AuthForms onUserAuthenticated={onUserAuthenticated} />
            ) : (
              <UserCard userProfile={activeProfile} />
            )}
            <Toaster />
          </>
        )}
      </div>
    </>
  );
}

export default App;
