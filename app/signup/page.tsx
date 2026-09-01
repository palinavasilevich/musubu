import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignupForm />
      </div>
    </div>
  );
}
