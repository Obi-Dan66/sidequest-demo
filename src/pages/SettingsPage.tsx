import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/common/ThemeToggle';

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display text-2xl font-bold">Settings</h1>
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <h3 className="font-medium">Appearance</h3>
            <p className="text-sm text-muted-foreground">Pick a theme.</p>
          </div>
          <ThemeToggle />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
