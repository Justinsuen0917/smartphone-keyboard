import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KeyboardGallery } from "@/components/keyboard-gallery";
import { KeyboardPreview } from "@/components/keyboard-preview";
import { ColorPicker } from "@/components/color-picker";
import { sampleThemes, getTimeBasedTheme } from "@/lib/keyboard-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ColorTheme } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(sampleThemes[0].colors);
  const [timeTheme, setTimeTheme] = useState(getTimeBasedTheme());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTheme(getTimeBasedTheme());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const { data: customThemes = [] } = useQuery({
    queryKey: ["/api/themes"],
  });

  const createTheme = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/themes", {
        name: "Custom Theme",
        colors: currentTheme,
        isTimeTheme: "false",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/themes"] });
      toast({
        title: "Theme saved",
        description: "Your custom theme has been saved successfully.",
      });
    },
  });

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-4xl font-bold">Keyboard Theme Studio</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sample Themes</h2>
        <KeyboardGallery
          themes={sampleThemes}
          onThemeSelect={setCurrentTheme}
        />
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Time-based Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <KeyboardPreview theme={timeTheme} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Customizer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <KeyboardPreview theme={currentTheme} />

            <div className="space-y-4">
              <ColorPicker
                label="Background"
                color={currentTheme.background}
                onChange={(color) =>
                  setCurrentTheme((prev) => ({ ...prev, background: color }))
                }
              />
              <ColorPicker
                label="Text"
                color={currentTheme.text}
                onChange={(color) =>
                  setCurrentTheme((prev) => ({ ...prev, text: color }))
                }
              />
              <ColorPicker
                label="Keys"
                color={currentTheme.keys}
                onChange={(color) =>
                  setCurrentTheme((prev) => ({ ...prev, keys: color }))
                }
              />
              <ColorPicker
                label="Accent"
                color={currentTheme.accent}
                onChange={(color) =>
                  setCurrentTheme((prev) => ({ ...prev, accent: color }))
                }
              />
            </div>

            <Button
              className="w-full"
              onClick={() => createTheme.mutate()}
              disabled={createTheme.isPending}
            >
              Save Custom Theme
            </Button>
          </CardContent>
        </Card>
      </section>

      {customThemes.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Custom Themes</h2>
          <KeyboardGallery
            themes={customThemes}
            onThemeSelect={setCurrentTheme}
          />
        </section>
      )}
    </div>
  );
}
