import { useState } from 'react';
import { Mail, Lock, User, Hash, BookOpen, AlertCircle, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginSchema, registerSchema, mockGoogleUsers } from '@hiram/shared';
import type { LoginInput, RegisterInput } from '@hiram/shared';
import { useAuthStore } from '../../store/useAuthStore';
import { LogoSymbol } from '../ui/Logo';
import { Modal } from '../ui/Modal';

const emailSchema = z.object({
  email: z.string()
    .email({ message: 'Invalid email address' })
    .refine(
      (email) => email.endsWith('@iskolar.pup.edu.ph') || email.endsWith('@pup.edu.ph'),
      { message: 'Must be a valid PUP student or faculty email (@iskolar.pup.edu.ph or @pup.edu.ph)' }
    ),
});

type EmailInput = z.infer<typeof emailSchema>;

export function AuthModal() {
  const {
    showAuthModal,
    setAuthModalOpen,
    login,
    register: submitRegister,
    googleAuth,
    isLoading,
    error: storeError,
    clearError
  } = useAuthStore();

  const [googleSimOpen, setGoogleSimOpen] = useState(false);
  const [step, setStep] = useState<'email' | 'login' | 'register'>('email');

  const checkEmail = useAuthStore((state) => state.checkEmail);

  // Email form instance
  const emailForm = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' }
  });

  // Login form instance
  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  // Register form instance
  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', name: '', studentId: '', course: '' }
  });

  if (!showAuthModal) return null;

  const handleEmailContinue = async (data: EmailInput) => {
    clearError();
    const exists = await checkEmail(data.email);

    if (exists === true) {
      loginForm.setValue('email', data.email);
      setStep('login');
    } else if (exists === false) {
      registerForm.setValue('email', data.email);
      setStep('register');
    }
  };

  const handleLoginSubmit = async (data: LoginInput) => {
    await login(data.email, data.password);
  };

  const handleRegisterSubmit = async (data: RegisterInput) => {
    await submitRegister({
      studentId: data.studentId,
      email: data.email,
      name: data.name,
      password: data.password,
      course: data.course
    });
  };

  const handleSimulateGoogleLogin = async (mockProfile: {
    name: string;
    email: string;
    studentId: string;
    avatarUrl?: string | null;
  }) => {
    await googleAuth(mockProfile);
    setGoogleSimOpen(false);
  };

  const handleBackToEmail = () => {
    setStep('email');
    loginForm.reset();
    registerForm.reset();
    clearError();
  };

  const handleCloseModal = () => {
    setAuthModalOpen(false);
    setStep('email');
    emailForm.reset();
    loginForm.reset();
    registerForm.reset();
    clearError();
  };

  const currentEmail = step === 'login' ? loginForm.getValues('email') : registerForm.getValues('email');

  const getInitials = (name: string) => {
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <Modal
      isOpen={showAuthModal}
      onClose={googleSimOpen ? () => setGoogleSimOpen(false) : handleCloseModal}
      size={googleSimOpen ? 'sm' : 'md'}
    >
      {googleSimOpen ? (
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.03-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <h3 className="font-bold text-neutral-800 text-lg">Sign in with Google</h3>
            <p className="text-neutral-500 text-xs mt-1">to continue to Hiram platform</p>
          </div>

          <div className="space-y-3">
            {mockGoogleUsers.map((mockUser) => (
              <button
                key={mockUser.email}
                onClick={() => handleSimulateGoogleLogin(mockUser)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:border-primary/20 hover:bg-primary/5 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-full border border-neutral-200 group-hover:border-primary/20 bg-primary/5 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                  {getInitials(mockUser.name)}
                </div>
                <div>
                  <div className="font-semibold text-neutral-800 text-sm group-hover:text-primary transition-colors">
                    {mockUser.name}
                  </div>
                  <div className="text-neutral-400 text-xs">{mockUser.email}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center text-[10px] text-neutral-400 mt-6">
            This is a simulated Google Auth consent flow for secure local campus verification testing.
          </div>
        </div>
      ) : (
        <>
          {/* Modal Header */}
          <div className="px-8 pt-8 pb-4 text-center relative">
            {step !== 'email' && (
              <button
                onClick={handleBackToEmail}
                className="absolute top-4 left-4 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full p-1.5 transition-all cursor-pointer z-20"
                title="Go back"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div className="flex justify-center mb-3">
              <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10">
                <LogoSymbol size="xl" className="text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight animate-in fade-in duration-200">
              {step === 'login' ? 'Welcome Back' : step === 'register' ? 'Join Hiram' : 'Welcome to Hiram'}
            </h2>
            <p className="text-neutral-500 text-sm mt-1 animate-in fade-in duration-200">
              {step === 'login' ? 'Enter password to sign in' : step === 'register' ? 'Complete student registration details' : 'PUP Student Item Sharing & Trading Hub'}
            </p>
          </div>

          {/* Errors display */}
          {storeError && (
            <div className="mx-8 mt-2 p-3.5 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in duration-200">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold">Authentication Error</span>
                <p className="mt-0.5">{storeError}</p>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="px-8 pb-8 pt-4">
            {step === 'email' && (
              <div className="space-y-6">
                {/* Google OAuth Button */}
                <button
                  onClick={() => setGoogleSimOpen(true)}
                  className="w-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-bold py-2.5 px-4 rounded-full flex justify-center items-center gap-2.5 text-sm transition-all shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.03-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-100"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-neutral-400 font-bold tracking-wider">Or continue with</span>
                  </div>
                </div>

                <form onSubmit={emailForm.handleSubmit(handleEmailContinue)} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
                        <Mail size={16} />
                      </span>
                      <input
                        type="text"
                        {...emailForm.register('email')}
                        placeholder="e.g. name@iskolar.pup.edu.ph"
                        className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
                      />
                    </div>
                    {emailForm.formState.errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                        <AlertCircle size={12} /> {emailForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-bold py-3 rounded-full shadow-sm hover:shadow-md transition-all hover:bg-primary/95 flex justify-center items-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? 'Verifying...' : 'Continue'}
                  </button>
                </form>
              </div>
            )}

            {step === 'login' && (
              <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4 animate-in fade-in duration-200">
                {/* Read-only Email display */}
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3 flex justify-between items-center">
                  <div className="text-sm font-medium text-neutral-600 truncate mr-2">{currentEmail}</div>
                  <button
                    type="button"
                    onClick={handleBackToEmail}
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
                      className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
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
            )}

            {step === 'register' && (
              <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className="space-y-4 animate-in fade-in duration-200">
                {/* Read-only Email display */}
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3 flex justify-between items-center">
                  <div className="text-sm font-medium text-neutral-600 truncate mr-2">{currentEmail}</div>
                  <button
                    type="button"
                    onClick={handleBackToEmail}
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
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
