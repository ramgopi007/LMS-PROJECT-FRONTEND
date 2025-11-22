import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white shadow-md p-6 rounded-lg">
        {user ? (
          <>
            <h2 className="text-xl font-semibold mb-2">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-gray-700 mb-2">Email: {user.email}</p>
            <p className="text-gray-700 mb-2">Role: {user.role}</p>
          </>
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
