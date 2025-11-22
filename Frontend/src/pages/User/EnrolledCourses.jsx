const EnrolledCourses = () => {
  const enrolled = [
    { id: 1, title: "React Basics" },
    { id: 2, title: "Node.js API Course" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrolled.map((course) => (
          <div key={course.id} className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-semibold">{course.title}</h2>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Continue Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
