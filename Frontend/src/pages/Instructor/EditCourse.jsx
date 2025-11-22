import { useParams } from "react-router-dom";

const EditCourse = () => {
  const { id } = useParams();

  return (
    <div className="p-6 md:ml-64 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Edit Course #{id}</h1>

      <form className="bg-white shadow p-6 rounded">
        <input
          type="text"
          placeholder="Updated title"
          className="w-full border p-2 rounded mb-4"
        />

        <textarea
          placeholder="Updated description"
          rows="5"
          className="w-full border p-2 rounded mb-4"
        />

        <button className="px-6 py-2 bg-green-600 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
