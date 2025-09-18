import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MoodWidget() {
  const data = useMemo(() => {
    const key = "moods";
    const stored = JSON.parse(localStorage.getItem(key) || "null");
    const fallback = Array.from({ length: 7 }).map((_, i) => ({ day: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i], mood: Math.round(3 + Math.sin(i) * 2) }));
    return stored || fallback;
  }, []);

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="mood" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
