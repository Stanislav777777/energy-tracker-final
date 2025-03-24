"use client";

import { useState } from "react";

const habits = [
  "Сон до 00:30",
  "Вода 6+ стаканов",
  "Овсяный отвар",
  "Обливание",
  "Зарядка",
  "30 мин движения",
  "Время для себя",
  "1 радость/вдохновение",
];

export default function EnergyTracker() {
  const [data, setData] = useState(() => {
    const initial: Record<number, Record<string, boolean>> = {};
    for (let day = 1; day <= 30; day++) {
      initial[day] = {};
      habits.forEach((h) => (initial[day][h] = false));
    }
    return initial;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Трекер энергии</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data).map(([day, habitsMap]) => (
          <div key={day} className="border rounded-xl p-4 shadow">
            <h2 className="font-semibold mb-2">День {day}</h2>
            {habits.map((habit) => (
              <div key={habit} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={habitsMap[habit]}
                  onChange={() =>
                    setData((prev) => ({
                      ...prev,
                      [Number(day)]: {
                        ...prev[Number(day)],
                        [habit]: !prev[Number(day)][habit],
                      },
                    }))
                  }
                />
                <label>{habit}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
