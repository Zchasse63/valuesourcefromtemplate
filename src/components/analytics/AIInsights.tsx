
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Sparkles, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type InsightType = 'trend' | 'opportunity' | 'risk' | 'anomaly';

interface Insight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  value?: string;
  change?: number;
}

const mockInsights: Insight[] = [
  {
    id: 'insight-1',
    type: 'trend',
    title: 'Revenue Growth Acceleration',
    description: 'Revenue growth is accelerating by 12% month-over-month, outpacing previous quarter.',
    change: 12
  },
  {
    id: 'insight-2',
    type: 'opportunity',
    title: 'Customer Retention Opportunity',
    description: 'Implementing a 5% discount for recurring orders could increase retention by 15%.',
    value: '+15% retention',
  },
  {
    id: 'insight-3',
    type: 'risk',
    title: 'Inventory Stockout Risk',
    description: 'Premium Pine Pallets inventory will deplete within 2 weeks at current sales rate.',
    value: '14 days remaining',
  },
  {
    id: 'insight-4',
    type: 'anomaly',
    title: 'Unusual Expense Pattern',
    description: 'Transportation costs are 23% higher than seasonal average for this quarter.',
    change: -23
  },
];

export const AIInsights = () => {
  const { toast } = useToast();
  const [insights, setInsights] = useState<Insight[]>(mockInsights.slice(0, 2));
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Generate more insights
  const generateMoreInsights = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would call an AI service
      const newInsights = mockInsights.filter(
        insight => !insights.some(i => i.id === insight.id)
      );
      
      if (newInsights.length > 0) {
        setInsights(prev => [...prev, ...newInsights]);
        toast.success({
          title: "New insights generated",
          description: `${newInsights.length} new insights are now available`,
        });
      } else {
        toast({
          title: "No more insights available",
          description: "All possible insights have been generated",
        });
      }
    } catch (error) {
      toast.error({
        title: "Failed to generate insights",
        description: "Please try again later",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const getIconForType = (type: InsightType) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="h-8 w-8 text-blue-500" />;
      case 'opportunity':
        return <Lightbulb className="h-8 w-8 text-green-500" />;
      case 'risk':
        return <TrendingDown className="h-8 w-8 text-red-500" />;
      case 'anomaly':
        return <Sparkles className="h-8 w-8 text-purple-500" />;
    }
  };
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI-Powered Insights
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={generateMoreInsights}
          disabled={isGenerating || insights.length >= mockInsights.length}
          className="flex items-center gap-1"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Generate Insights</span>
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="flex gap-4 p-3 rounded-lg hover:bg-muted/20 transition-colors">
              <div className="shrink-0">
                {getIconForType(insight.type)}
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                {(insight.value || insight.change !== undefined) && (
                  <div className="mt-2">
                    {insight.value && (
                      <span className="text-sm font-medium">{insight.value}</span>
                    )}
                    {insight.change !== undefined && (
                      <span className={`text-sm font-medium ml-2 ${insight.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {insight.change > 0 ? '+' : ''}{insight.change}%
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {insights.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No insights available. Generate some insights to get started.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
