
import { useState } from 'react';
import { 
  Accessibility, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  PanelLeft,
  Eye,
  Move,
  MousePointer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    highContrast,
    toggleHighContrast,
    reduceMotion,
    toggleReduceMotion,
    enhanceScreenReaderCompatibility,
    toggleScreenReaderCompatibility,
    focusIndicatorsEnhanced,
    toggleFocusIndicators,
  } = useAccessibility();

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed right-4 bottom-4 z-50 rounded-full h-12 w-12 shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open accessibility controls"
      >
        <Accessibility className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5" /> 
              Accessibility Controls
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close accessibility panel">
              <PanelLeft className="h-5 w-5" />
            </Button>
          </div>
          <CardDescription>
            Customize your experience with these accessibility settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Text Size</h3>
            <p className="text-xs text-muted-foreground">
              Current: <span className="font-medium capitalize">{fontSize}</span>
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={decreaseFontSize}
                disabled={fontSize === 'normal'}
                aria-label="Decrease text size"
              >
                <ZoomOut className="h-4 w-4 mr-1" /> Smaller
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={increaseFontSize}
                disabled={fontSize === 'x-large'}
                aria-label="Increase text size"
              >
                <ZoomIn className="h-4 w-4 mr-1" /> Larger
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFontSize}
                disabled={fontSize === 'normal'}
                aria-label="Reset text size"
              >
                <RotateCcw className="h-4 w-4 mr-1" /> Reset
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Display Options</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" /> High Contrast
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Increases contrast for better readability
                  </p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={toggleHighContrast}
                  aria-label="Toggle high contrast mode"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduce-motion" className="flex items-center gap-2">
                    <Move className="h-4 w-4" /> Reduce Motion
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Minimizes animations and transitions
                  </p>
                </div>
                <Switch
                  id="reduce-motion"
                  checked={reduceMotion}
                  onCheckedChange={toggleReduceMotion}
                  aria-label="Toggle reduced motion"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="screen-reader" className="flex items-center gap-2">
                    <Accessibility className="h-4 w-4" /> Screen Reader Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Enhances compatibility with screen readers
                  </p>
                </div>
                <Switch
                  id="screen-reader"
                  checked={enhanceScreenReaderCompatibility}
                  onCheckedChange={toggleScreenReaderCompatibility}
                  aria-label="Toggle screen reader enhancements"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="focus-indicators" className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4" /> Enhanced Focus Indicators
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Makes focus outlines more visible
                  </p>
                </div>
                <Switch
                  id="focus-indicators"
                  checked={focusIndicatorsEnhanced}
                  onCheckedChange={toggleFocusIndicators}
                  aria-label="Toggle enhanced focus indicators"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
