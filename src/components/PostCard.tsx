import { useState } from 'react';

type PostCardProps = {
  title: string;
  content: string;
  date: string;
};

export function PostCard({ title, content, date }: PostCardProps) {
  const [likes, setLikes] = useState(0);

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500 text-sm">{date}</p>
      <p className="mt-2 text-gray-700">{content}</p>
      <button 
        onClick={() => setLikes(likes + 1)}
        className="mt-4 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
      >
        👍 {likes}
      </button>
    </div>
  );
}