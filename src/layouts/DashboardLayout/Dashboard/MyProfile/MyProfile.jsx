import React, { useEffect } from "react";
import useAuth from "../../../../Hooks/useAuth";

const MyProfile = () => {
    useEffect(() => {
    document.title = "Style Decor | My Profile";
  }, []);
  const { user } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);

  if (!user) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-10 sm:mt-15">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h2>

      <div className="bg-white rounded-xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <img
              src={user.photoURL || "https://i.ibb.co.com/5Y0X5gY/user.png"}
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#ff6a4a]"
            />
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                {user.displayName || "User"}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="btn btn-outline btn-xs sm:btn-sm mt-2 sm:mt-0"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Full Name
            </label>
            <input
              disabled={!isEditing}
              defaultValue={user.displayName || ""}
              className="input outline-0 input-bordered w-full text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Email
            </label>
            <input
              disabled
              defaultValue={user.email || ""}
              className="input outline-0 input-bordered w-full text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Phone
            </label>
            <input
              disabled={!isEditing}
              placeholder="Add phone number"
              className="input outline-0 input-bordered w-full text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Address
            </label>
            <input
              disabled={!isEditing}
              placeholder="Add address"
              className="input outline-0 input-bordered w-full text-sm sm:text-base"
            />
          </div>
        </div>

        {isEditing && (
          <button className="btn bg-[#ff6a4a] text-white w-full mt-6">
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
