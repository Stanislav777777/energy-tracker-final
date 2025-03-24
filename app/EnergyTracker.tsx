'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const habits = [
  "Сон до 00:30",
  "Вода 6+ стаканов",
  "Овсяный отвар",
  "Обливание",
  "Зарядка",
  "30 мин движения",
  "Время для себя",
];

export default function EnergyTracker() {
  const [checks, setChecks] = useState(
    habits.map(() => Array(30).fill(false))
  );

  const toggle = (habitIndex: number, dayIndex: number) => {
    const updated = [...checks];
    updated[habitIndex][dayIndex] = !updated[habitIndex][dayIndex];
    setChecks(updated);
  };

  const reset = () => {
    setChecks(habits.map(() => Array(30).fill(false)));
  };

  const exportProgress = () => {
    const lines = checks.map((habitChecks, i) => {
      const completed = habitChecks.filter(Boolean).length;
      return `${habits[i]}: ${completed}/30`;
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "progress.txt";
    a.click();
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">🟢 30 дней отслеживания</h1>
      <div className="space-y-4">
        {habits.map((habit, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="font-semibold mb-2">{habit}</div>
              <div className="grid grid-cols-10 gap-1">
                {checks[i].map((v, j) => (
                  <Checkbox
                    key={j}
                    checked={v}
                    onCheckedChange={() => toggle(i, j)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-4">
        <Button onClick={reset} variant="outline">
          ♻️ Сбросить трекер
        </Button>
        <Button onClick={exportProgress}>
          📤 Экспорт прогресса
        </Button>
      </div>
    </div>
  );
}