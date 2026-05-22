import { useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import type { LoginInput, RegisterInput } from '@hiram/shared';
import { useAuthStore } from '../../store/useAuthStore';
import { LogoSymbol } from '../ui/Logo';
import { Modal } from '../ui/Modal';
import { EmailStepForm } from './auth/EmailStepForm';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';
import { GoogleSignInPanel } from './auth/GoogleSignInPanel';

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
  const [currentEmail, setCurrentEmail] = useState('');

  const checkEmail = useAuthStore((state) => state.checkEmail);

  if (!showAuthModal) return null;

  const handleEmailContinue = async (email: string) => {
    clearError();
    setCurrentEmail(email);
    const exists = await checkEmail(email);

    if (exists === true) {
      setStep('login');
    } else if (exists === false) {
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
    setCurrentEmail('');
    clearError();
  };

  const handleCloseModal = () => {
    setAuthModalOpen(false);
    setStep('email');
    setCurrentEmail('');
    clearError();
  };

  return (
    <Modal
      isOpen={showAuthModal}
      onClose={googleSimOpen ? () => setGoogleSimOpen(false) : handleCloseModal}
      size={googleSimOpen ? 'sm' : 'md'}
    >
      {googleSimOpen ? (
        <GoogleSignInPanel onSelectUser={handleSimulateGoogleLogin} />
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
              <EmailStepForm
                isLoading={isLoading}
                onContinue={handleEmailContinue}
                onGoogleClick={() => setGoogleSimOpen(true)}
              />
            )}

            {step === 'login' && (
              <LoginForm
                email={currentEmail}
                isLoading={isLoading}
                onSubmit={handleLoginSubmit}
                onChangeEmail={handleBackToEmail}
              />
            )}

            {step === 'register' && (
              <RegisterForm
                email={currentEmail}
                isLoading={isLoading}
                onSubmit={handleRegisterSubmit}
                onChangeEmail={handleBackToEmail}
              />
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
