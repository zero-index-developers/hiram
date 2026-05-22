import { User, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@hiram/shared';
import type { RegisterInput } from '@hiram/shared';
import { FormField } from '../../ui/FormField';
import { Button } from '../../ui/Button';

interface RegisterFormProps {
  email: string;
  isLoading: boolean;
  onSubmit: (data: RegisterInput) => void;
  onChangeEmail: () => void;
}

export function RegisterForm({ email, isLoading, onSubmit, onChangeEmail }: RegisterFormProps) {
  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email, password: '', name: '' }
  });

  return (
    <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-4 animate-in fade-in duration-200">
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

      {/* Full name input */}
      <FormField
        label="Full Name"
        icon={User}
        error={registerForm.formState.errors.name?.message}
      >
        <input
          type="text"
          {...registerForm.register('name')}
          placeholder="Juan Dela Cruz"
          className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-neutral-900 focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
          autoFocus
        />
      </FormField>

      {/* Password input */}
      <FormField
        label="Password"
        icon={Lock}
        error={registerForm.formState.errors.password?.message}
      >
        <input
          type="password"
          {...registerForm.register('password')}
          placeholder="••••••••"
          className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-neutral-900 focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
        />
      </FormField>

      {/* Submit button */}
      <Button variant="primary" fullWidth loading={isLoading}>
        Create Account
      </Button>
    </form>
  );
}
