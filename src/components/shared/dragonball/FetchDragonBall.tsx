import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { DragonballData, DragonballItems } from "@/interfaces";
import { api } from "@/lib";
import { useEffect, useState } from "react";

export const FetchDragonBall: React.FC = () => {
  const [dragonball, setDragonball] = useState<DragonballData | null>(null);

  const getDragonballData = async (): Promise<DragonballData | null> => {
    try {
      const res = await api.get<DragonballData>("/characters");
      const dragonballData = res.data;
      if (dragonballData) {
        setDragonball(dragonballData);
      }
    } catch (error) {
      console.error("Error fetching Dragon Ball data:", error);
    }
    return null;
  };

  useEffect(() => {
    getDragonballData();
  }, []);

  return (
    <Card className="p-4">
      <CardHeader className="text-lg font-semibold">
        <CardTitle>
          Dragon Ball Characters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {dragonball?.items?.length ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {dragonball.items.map((character: DragonballItems) => (
              <div key={character.id} className="grid grid-cols-2 bg-muted rounded-md p-6 items-center space-x-4 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={character.image}
                  alt={character.name}
                  className="h-32 object-cover"
                />
                <div className="text-left">
                  <p className="font-bold text-lg text-primary">{character.name}</p>
                  <p className="font-semibold text-sm text-primary">{character.gender}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 text-lg">No characters found.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Last Fetched: {new Date().toLocaleString()}
      </CardFooter>
    </Card>
  )
}
