"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-md border border-border">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-none"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus />
      </Button>
      <span className="w-8 text-center text-sm tabular-nums">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-none"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus />
      </Button>
    </div>
  );
}
