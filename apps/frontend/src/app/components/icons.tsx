type IconProps = {
  className?: string;
};

const defaultClass = "h-4 w-4 text-current";

export function SearchIcon({ className = "h-4 w-4 text-slate-400" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35M16.65 10.83a5.83 5.83 0 1 1-11.66 0 5.83 5.83 0 0 1 11.66 0Z"
      />
    </svg>
  );
}

export function RefreshIcon({ className = "h-4 w-4 text-slate-500" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 12a7 7 0 0 0-12.12-4.95L5 9M5 12a7 7 0 0 0 12.12 4.95L19 15"
      />
    </svg>
  );
}

export function ClockIcon({ className = "h-4 w-4 text-slate-400" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

export function MetricIcon({ className = "h-4 w-4 text-slate-400" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 21v-7m8 7V10m8 11V3"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className = defaultClass }: IconProps = {}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14m-6-6 6 6-6 6"
      />
    </svg>
  );
}

export function UserIcon({ className = defaultClass }: IconProps = {}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.5 21a6.5 6.5 0 1 1 13 0m-6.5-7a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
      />
    </svg>
  );
}

export function UsersIcon({ className = "h-4 w-4 text-slate-400" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 20a4 4 0 0 1 8 0m1-11a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM4 17a4 4 0 1 1 6-3.46"
      />
    </svg>
  );
}
