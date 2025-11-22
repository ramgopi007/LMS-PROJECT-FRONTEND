import { useParams } from "react-router-dom";

const LessonPlayer = () => {
  const { lessonId } = useParams();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Lesson #{lessonId}</h1>

      <div className="bg-black rounded-lg overflow-hidden shadow-lg">
        <video controls className="w-full h-64 md:h-96">
          <source src="sample-video.mp4" type="video/mp4" />
        </video>
      </div>

      <p className="mt-4 text-gray-600">
        This is the lesson description and additional resources.
      </p>
    </div>
  );
};

export default LessonPlayer;
