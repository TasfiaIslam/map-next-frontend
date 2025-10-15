import MyDialog from '@/components/dialog';
import Navbar from '@/components/navbar';
import MapArea from '@/features/map';
import { getMaps } from '@/lib/getMapData';

export default async function Home() {
  const maps = await getMaps();
  console.log({ maps });
  return (
    <div className="">
      <main className="flex flex-col">
        <Navbar />
        <MapArea locations={maps} />
      </main>
    </div>
  );
}
