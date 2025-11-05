import { Mail } from "lucide-react";
import type { UserProfile } from "../../entity/user";

interface UserCardProps {
  userProfile: UserProfile;
}
const UserCard: React.FC<UserCardProps> = ({ userProfile }) => {
  const getInitials = () => {
    return userProfile?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6">
        {/* Avatar with Initials */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {getInitials()}
          </div>
        </div>

        {/* User Details */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">{userProfile?.name}</h2>

          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <p className="text-sm">{userProfile?.email}</p>
          </div>
        </div>
      </div>
  );
};
export default UserCard;
