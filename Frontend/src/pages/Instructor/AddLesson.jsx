import { useParams } from "react-router-dom";

const AddLesson = () => {
  const { courseId } = useParams();

  return (
    <div className="p-6 md:ml-64 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Add Lesson to Course #{courseId}</h1>

      <form className="bg-white shadow p-6 rounded">
        <input
          type="text"
          placeholder="Lesson Title"
          className="w-full border p-2 rounded mb-4"
        />

        <textarea
          placeholder="Lesson Description"
          rows="5"
          className="w-full border p-2 rounded mb-4"
        />

        <input
          type="file"
          className="w-full border p-2 rounded mb-4"
        />

        <button className="px-6 py-2 bg-blue-600 text-white rounded">
          Upload Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
