import "@/public/styles/globals.css";

export function App({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen w-full">
      {children}
    </main>
  );
}

export default App;
