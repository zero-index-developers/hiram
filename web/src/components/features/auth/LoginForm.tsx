import { Lock, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@hiram/shared';
import type { LoginInput } from '@hiram/shared';

interface LoginFormProps {
  email: string;
  isLoading: boolean;
  onSubmit: (data: LoginInput) => void;
  onChangeEmail: () => void;
}

export function LoginForm({ email, isLoading, onSubmit, onChangeEmail }: LoginFormProps) {
  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email, password: '' }
  });

  return (
    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4 animate-in fade-in duration-200">
      {/* Read-only Email display */}
      <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3 flex justify-between items-center">
        <div className="text-sm font-medium text-neutral-600 truncate mr-2">{email}</div>
        <button
          type="button"
          onClick={onChangeEmail}
          className="text-xs text-primary font-bold hover:underline cursor-pointer"
        >
          Change
        </button>
      </div>

      {/* Password input */}
      <div>
        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
          Enter Password
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
            <Lock size={16} />
          </span>
          <input
            type="password"
            {...loginForm.register('password')}
            placeholder="••••••••"
            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-neutral-900 focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
            autoFocus
          />
        </div>
        {loginForm.formState.errors.password && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-semibold">
            <AlertCircle size={12} /> {loginForm.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white font-bold py-3 rounded-full shadow-sm hover:shadow-md transition-all hover:bg-primary/95 flex justify-center items-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}
