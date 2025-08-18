import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export const UseEffect = () => {

  // useEffect(() => {
  //   // kode yang dieksekusi setelah render
  //   return () => {
  //     // cleanup (opsional)
  //   };
  // }, []);

  useEffect(() => {
    console.log("Render ulang setiap kali state/props berubah");
  });

  useEffect(() => {
    console.log("Jalan hanya sekali saat mount");
  }, []);

  const [inputValue, setInputValue] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(prevState => prevState + 1);

  useEffect(() => {
    console.log("Effect dijalankan ketika count berubah");
  }, [count]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log(`Tick`);
  //   }, 5000);
  //   return () => clearInterval(timer); // cleanup saat unmount
  // }, []);

  return (
    <div>
      <h1>USE EFFECT</h1>
      <p>Nilai: {count}</p>
      <Button onClick={increment}>Tambah</Button>
      <p>Nama: {inputValue}</p>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Masukkan nama"
      />
    </div>
  );
};