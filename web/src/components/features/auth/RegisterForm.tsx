import { User, Hash, Lock, BookOpen, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@hiram/shared';
import type { RegisterInput } from '@hiram/shared';

interface RegisterFormProps {
  email: string;
  isLoading: boolean;
  onSubmit: (data: RegisterInput) => void;
  onChangeEmail: () => void;
}

export function RegisterForm({ email, isLoading, onSubmit, onChangeEmail }: RegisterFormProps) {
  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email, password: '', name: '', studentId: '', course: '' }
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
      <div>
        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
            <User size={16} />
          </span>
          <input
            type="text"
            {...registerForm.register('name')}
            placeholder="Juan Dela Cruz"
            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
            autoFocus
          />
        </div>
        {registerForm.formState.errors.name && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-semibold">
            <AlertCircle size={12} /> {registerForm.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Student ID input */}
      <div>
        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
          Student ID Number
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
            <Hash size={16} />
          </span>
          <input
            type="text"
            {...registerForm.register('studentId')}
            placeholder="2021-12345-MN-0"
            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
          />
        </div>
        {registerForm.formState.errors.studentId && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-semibold">
            <AlertCircle size={12} /> {registerForm.formState.errors.studentId.message}
          </p>
        )}
      </div>

      {/* Password input */}
      <div>
        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
          Password
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
            <Lock size={16} />
          </span>
          <input
            type="password"
            {...registerForm.register('password')}
            placeholder="••••••••"
            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
          />
        </div>
        {registerForm.formState.errors.password && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-semibold">
            <AlertCircle size={12} /> {registerForm.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Course input */}
      <div>
        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
          Course / Program (Optional)
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
            <BookOpen size={16} />
          </span>
          <select
            {...registerForm.register('course')}
            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer"
          >
            <option value="">Select Course</option>
            <option value="BSIT">BS Information Technology</option>
            <option value="BSCS">BS Computer Science</option>
            <option value="BSCPE">BS Computer Engineering</option>
            <option value="BSEE">BS Electrical Engineering</option>
            <option value="BSME">BS Mechanical Engineering</option>
            <option value="BSA">BS Accountancy</option>
            <option value="BSBA">BS Business Administration</option>
          </select>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white font-bold py-3 rounded-full shadow-sm hover:shadow-md transition-all hover:bg-primary/95 flex justify-center items-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}
