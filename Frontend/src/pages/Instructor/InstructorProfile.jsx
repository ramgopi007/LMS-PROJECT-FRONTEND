import { useSelector } from "react-redux";

const InstructorProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6 md:ml-64 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Instructor Profile</h1>

      <div className="bg-white shadow-md p-6 rounded-lg">
        {user ? (
          <>
            <p className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </p>

            <p className="text-gray-700 mt-2">Email: {user.email}</p>
            <p className="text-gray-700 mt-2">Role: {user.role}</p>
          </>
        ) : (
          <p>No user data.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorProfile;
