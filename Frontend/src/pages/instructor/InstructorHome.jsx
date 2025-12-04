import { useEffect, useState } from "react";
import axios from "axios";

const InstructorHome = () => {
  const [instructor, setInstructor] = useState(null);

  const fetchInstructor = async () => {
    try {
      const res = await axios.get("http://localhost:5000/lms/instructor/me", {
        withCredentials: true,
      });

      setInstructor(res.data);
    } catch (error) {
      console.error("Error fetching instructor profile:", error);
    }
  };

  useEffect(() => {
    fetchInstructor();
  }, []);

  if (!instructor) return <p>Loading instructor data...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {instructor.name} 👋
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl">
        {/* Profile Image */}
        <img
          src={instructor.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />

        {/* Bio */}
        <h2 className="text-xl font-semibold mb-2">Bio</h2>
        <p className="text-gray-700 mb-4">{instructor.bio || "No bio added."}</p>

        {/* Skills */}
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {instructor.skills.length > 0 ? (
            instructor.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p>No skills added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorHome;
