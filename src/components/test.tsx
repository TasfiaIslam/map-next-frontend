// components/BlogCard.tsx
import Image from 'next/image';

export default function BlogCard({ title, image }: { title: string; image: string }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 shadow-md">
      <Image src={image} alt={title} width={400} height={200} className="rounded-lg" />
      <h2 className="text-white mt-2">{title}</h2>
    </div>
  );
}
