import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";

export const UseMemo: React.FC = () => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  // Example of using useMemo for a heavy computation
  // const a = 5;
  // const b = 10;

  // const memoizedValue = useMemo(() => {
  //   return heavyComputation(a, b);
  // }, [a, b]);

  // console.log("Memoized Value:", memoizedValue);

  useEffect(() => {
    fetch("https://dragonball-api.com/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.items.map((item: any) => item.name));
      });
  }, []);

  const filteredCharacters = useMemo(() => {
    return characters
      .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.localeCompare(b));
  }, [characters, search]);

  return (
    <Card className="p-4">
      <CardHeader className="text-lg font-semibold">
        <CardTitle>
          Dragon Ball Characters
        </CardTitle>
        <CardDescription>

          <Input
            type="text"
            placeholder="Find characters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full mt-3"
          />

        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">

        {filteredCharacters.length > 0 ? (
          <ul className="list-disc pl-5">
            {filteredCharacters.map((character) => (
              <li key={character} className="py-1">{character}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No characters found</p>
        )}

      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Last Fetched: {new Date().toLocaleString()}
      </CardFooter>
    </Card>
  )
}

// Uncomment the following function if you want to simulate a heavy computation
// function heavyComputation(a: number, b: number): number {
//   // Simulate a heavy computation by performing a large loop
//   let result = 0;
//   for (let i = 0; i < 1e7; i++) {
//     result += (a * b) % (i + 1);
//   }
//   return result;
// }
// function heavyComputation(a: any, b: any): any {
//   throw new Error("Function not implemented.");
// }

