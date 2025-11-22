const CreateCourse = () => {
  return (
    <div className="p-6 md:ml-64 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Create New Course</h1>

      <form className="bg-white shadow p-6 rounded">
        <input
          type="text"
          placeholder="Course Title"
          className="w-full border p-2 rounded mb-4"
        />

        <textarea
          placeholder="Course Description"
          className="w-full border p-2 rounded mb-4"
          rows="5"
        />

        <button className="px-6 py-2 bg-blue-600 text-white rounded">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
