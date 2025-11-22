import { Link } from "react-router-dom";

const MyCourses = () => {
  const myCourses = [
    { id: 1, title: "React for Beginners" },
    { id: 2, title: "Node.js Advanced" },
  ];

  return (
    <div className="p-6 md:ml-64">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myCourses.map((course) => (
          <div key={course.id} className="p-5 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{course.title}</h2>

            <div className="flex gap-4 mt-4">
              <Link
                to={`/instructor/edit-course/${course.id}`}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Edit
              </Link>

              <Link
                to={`/instructor/add-lesson/${course.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add Lesson
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
