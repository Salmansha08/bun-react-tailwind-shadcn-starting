import { Button } from "@/components/ui/button";
import { useTheme } from "@/context";
import { Moon, Sun } from "lucide-react";

export const ButtonTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-center my-3">
      <Button
        variant="outline"
        onClick={toggleTheme}
        className="cursor-pointer flex items-center gap-2"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <>
            <Sun className="h-4 w-4" />
            Light Mode
          </>
        ) : (
          <>
            <Moon className="h-4 w-4" />
            Dark Mode
          </>
        )}
      </Button>
    </div>
  );
};

