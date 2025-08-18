import "@/public/styles/globals.css";

export function App({ children }: Readonly<{ children: React.ReactNode }>) {

  // Uncomment the following lines to use the component with state management
  // const [angka, setAngka] = useState<number>(0);
  // const incrementFunction = () => {
  //   setAngka(angka + 1)
  // }
  // const resetFunction = () => {
  //   setAngka(0)
  // }
  //

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-8">
      {children}
    </main>
  );
}

export default App;
