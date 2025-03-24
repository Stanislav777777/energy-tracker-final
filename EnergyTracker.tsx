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

  const toggle = (i: number, j: number) => {
    const updated = [...checks];
    updated[i][j] = !updated[i][j];
    setChecks(updated);
  };

  const reset = () => {
    setChecks(habits.map(() => Array(30).fill(false)));
  };

  const exportProgress = () => {
    const lines = checks.map((row, i) => {
      const done = row.filter(Boolean).length;
      return `День ${i + 1}: ${done}/${habits.length} выполнено`;
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "прогресс.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">⚡ Energy Tracker</h1>
      <div className="overflow-auto">
        <table className="border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2 text-left">Привычка / День</th>
              {Array.from({ length: 30 }, (_, i) => (
                <th key={i} className="border p-2 text-center">{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, i) => (
              <tr key={i}>
                <td className="border p-2">{habit}</td>
                {checks[i].map((val, j) => (
                  <td key={j} className="border p-2 text-center">
                    <Checkbox checked={val} onCheckedChange={() => toggle(i, j)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <Button onClick={reset} variant="outline">Сбросить трекер</Button>
        <Button onClick={exportProgress}>Экспорт прогресса</Button>
      </div>
    </div>
  );
}
