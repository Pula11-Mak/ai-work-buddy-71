import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="label-mono">{label}</span>
        {hint && <span className="text-xs text-fog">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export function ChoiceGroup({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              active
                ? "border-glow/60 bg-glow/15 text-foreground"
                : "border-line bg-panel-strong/50 text-mist hover:text-foreground"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 8,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  id?: string;
}) {
  return (
    <textarea
      id={id}
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-y rounded-xl border border-line bg-background/60 px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-fog focus:border-glow/60 focus:ring-2 focus:ring-glow/20 focus:outline-none"
    />
  );
}

export function PrimaryButton({
  children,
  onClick,
  loading,
  disabled,
  type = "submit",
}: {
  children: ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-glow px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-mist transition-colors hover:bg-panel-strong hover:text-foreground"
    >
      {children}
    </button>
  );
}

export function ToolPanel({
  title,
  tag,
  children,
}: {
  title: string;
  tag?: string;
  children: ReactNode;
}) {
  return (
    <section className="panel p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {tag && (
          <span className="label-mono rounded-full border border-line px-2.5 py-1">
            {tag}
          </span>
        )}
      </div>
      <div className="grid gap-5">{children}</div>
    </section>
  );
}
