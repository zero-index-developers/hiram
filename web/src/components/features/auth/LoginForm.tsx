import { Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@hiram/shared';
import type { LoginInput } from '@hiram/shared';
import { FormField } from '../../ui/FormField';
import { Button } from '../../ui/Button';

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
      <FormField
        label="Enter Password"
        icon={Lock}
        error={loginForm.formState.errors.password?.message}
      >
        <input
          type="password"
          {...loginForm.register('password')}
          placeholder="••••••••"
          className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-neutral-900 focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
          autoFocus
        />
      </FormField>

      {/* Submit button */}
      <Button variant="primary" fullWidth loading={isLoading}>
        Sign In
      </Button>
    </form>
  );
}
