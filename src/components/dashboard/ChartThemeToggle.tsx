
import { Button } from "@/components/ui/button";
import { useChartContext } from "@/contexts/ChartContext";
import { Moon, Sun, Palette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const ChartThemeToggle = () => {
  const { theme, setTheme, colorScheme, setColorScheme } = useChartContext();

  const colorSchemes: { name: string, value: string }[] = [
    { name: "Primary", value: "primary" },
    { name: "Secondary", value: "secondary" },
    { name: "Success", value: "success" },
    { name: "Info", value: "info" },
    { name: "Warning", value: "warning" },
    { name: "Danger", value: "danger" },
  ];

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" title="Change color scheme">
            <Palette className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Color Scheme</h4>
            <div className="grid grid-cols-2 gap-2">
              {colorSchemes.map((scheme) => (
                <Button
                  key={scheme.value}
                  variant={colorScheme === scheme.value ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={() => setColorScheme(scheme.value as any)}
                >
                  {scheme.name}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
