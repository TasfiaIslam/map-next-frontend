import MyDialog from '@/components/dialog';
import MapArea from '@/features/map';
import { getMaps } from '@/lib/getMapData';

export default async function Home() {
  const maps = await getMaps();
  console.log({ maps });
  return (
    <div className="">
      <main className="flex flex-col">
        <MyDialog />
        <MapArea locations={maps} />
      </main>
    </div>
  );
}
