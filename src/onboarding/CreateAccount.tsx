interface CreateAccountProps {
  onContinue: () => void;
}

export function CreateAccount({ onContinue }: CreateAccountProps) {
  return (
    <div className="flex flex-col gap-6 w-full self-stretch">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Create your account
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Enter your details to get started with personalized investment recommendations.
        </p>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-5 w-full">
        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-[var(--text-primary)] mb-1.5 block">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-page)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold text-[var(--text-primary)] mb-1.5 block">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-page)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-semibold text-[var(--text-primary)] mb-1.5 block">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-page)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
          />
        </div>
      </div>

      {/* Continue */}
      <button
        onClick={onContinue}
        className="w-full py-3.5 rounded-full text-white font-semibold text-base hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "var(--accent-blue)" }}
      >
        Continue
      </button>

      {/* Login link */}
      <p className="text-sm text-[var(--text-secondary)] text-center">
        Already have an account?{" "}
        <button className="font-semibold text-[var(--text-primary)] underline underline-offset-2">
          Log in
        </button>
      </p>
    </div>
  );
}
