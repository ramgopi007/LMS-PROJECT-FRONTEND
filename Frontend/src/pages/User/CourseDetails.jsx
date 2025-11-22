import { useParams, useNavigate } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Course Details</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold">Course Title #{id}</h2>
        <p className="text-gray-600 mt-3">
          This is a detailed explanation of the course. Learn everything step by step.
        </p>

        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/my-courses")}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
