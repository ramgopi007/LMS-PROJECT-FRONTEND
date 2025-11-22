const InstructorDashboard = () => {
  return (
    <div className="p-6 md:ml-64">
      <h1 className="text-3xl font-bold mb-5">Instructor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Courses</h2>
          <p className="mt-2 text-3xl font-bold">5</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Students</h2>
          <p className="mt-2 text-3xl font-bold">120</p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Lessons Created</h2>
          <p className="mt-2 text-3xl font-bold">30</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
