
import { Card } from "@/components/ui/card";
import { Salesperson } from "@/types/customer";

interface SalespersonCardProps {
  salesperson: Salesperson | null;
}

export const SalespersonCard = ({ salesperson }: SalespersonCardProps) => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Your Salesperson</h3>
      {salesperson ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
              {salesperson.name.charAt(0)}
            </div>
          </div>
          <p className="text-center font-medium text-lg">{salesperson.name}</p>
          <p className="text-center text-muted-foreground">{salesperson.email}</p>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No salesperson has been assigned yet.</p>
      )}
    </Card>
  );
};
