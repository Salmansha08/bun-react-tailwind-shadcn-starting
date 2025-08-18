import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCounter } from "@/stores";
import { useShallow } from "zustand/react/shallow";

export const Counter = () => {
  const { count, increment, decrement, reset } = useCounter(
    useShallow((state) => ({
      count: state.count,
      increment: state.increment,
      decrement: state.decrement,
      reset: state.reset
    }))
  );

  return (
    <Card className="w-full h-full flex flex-col items-center justify-center dark:bg-emerald-900">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Counter App using Zustand</CardTitle>
        <CardDescription className="text-xl font-bold text-black dark:text-white">Counter: {count}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center gap-4">
        <Button variant="default" onClick={increment}>Increment</Button>
        <Button variant="secondary" onClick={decrement}>Decrement</Button>
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-center w-full">
        <Button variant="destructive" onClick={reset}>Reset</Button>
      </CardFooter>
    </Card>
  );
};

