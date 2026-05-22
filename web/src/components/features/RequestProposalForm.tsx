import { useState } from 'react';
import { MapPin, Calendar, AlertCircle } from 'lucide-react';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Item } from '@hiram/shared';
import { useAuthStore } from '../../store/useAuthStore';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

const createProposalSchema = (preferredTransaction: string) => {
  return z.object({
    duration: z.string().default('7'),
    tradeOffer: z.string().optional(),
    notes: z.string().min(10, { message: 'Message to owner must be at least 10 characters.' }),
    meetupLoc: z.string().min(5, { message: 'Meetup location must be at least 5 characters.' }),
    meetupTime: z.string().optional(),
  }).refine((data) => {
    if (preferredTransaction === 'TRADE' && (!data.tradeOffer || data.tradeOffer.trim().length === 0)) {
      return false;
    }
    return true;
  }, {
    message: 'Trade offer description is required when requesting a trade exchange.',
    path: ['tradeOffer']
  });
};

type ProposalInput = z.infer<ReturnType<typeof createProposalSchema>>;

interface RequestProposalFormProps {
  item: Item;
  onSubmitSuccess: (data: {
    duration: string;
    tradeOffer: string;
    meetupLoc: string;
    meetupTime: string;
  }) => void;
}

export function RequestProposalForm({ item, onSubmitSuccess }: RequestProposalFormProps) {
  const { isAuthenticated, setAuthModalOpen } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const schema = createProposalSchema(item.preferredTransaction || '');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ProposalInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      duration: '7',
      tradeOffer: '',
      notes: '',
      meetupLoc: 'PUP Main Campus (CEA Building)',
      meetupTime: ''
    }
  });

  const { field: durationField } = useController({
    name: 'duration',
    control
  });

  const onSubmit = (data: ProposalInput) => {
    if (!isAuthenticated) {
      setAuthModalOpen(true, 'login');
      return;
    }

    setLoading(true);
    // Simulate API request submission
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess({
        duration: data.duration || '7',
        tradeOffer: data.tradeOffer || '',
        meetupLoc: data.meetupLoc,
        meetupTime: data.meetupTime || ''
      });
    }, 1200);
  };

  return (
    <div className="w-full bg-white border border-primary/10 rounded-3xl p-8 shadow-sm lg:sticky lg:top-24 text-left">
      <h3 className="text-lg font-black text-neutral-800 mb-6 flex items-center gap-2">
        Submit Request Proposal
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {item.preferredTransaction === 'HIRAM' && (
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Lending Duration
            </label>
            <Select
              {...durationField}
              placeholder="Select Duration"
              options={[
                { value: '3', label: '3 Days (Short-term)' },
                { value: '7', label: '7 Days (1 Week)' },
                { value: '14', label: '14 Days (2 Weeks)' },
                { value: '30', label: '30 Days (Long-term)' },
              ]}
            />
          </div>
        )}

        {item.preferredTransaction === 'TRADE' && (
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Items to Trade / Exchange
            </label>
            <textarea
              {...register('tradeOffer')}
              placeholder="Describe what academic items or tools you are offering in exchange..."
              rows={3}
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400 resize-none"
            />
            {errors.tradeOffer && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                <AlertCircle size={12} /> {errors.tradeOffer.message}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            Purpose / Message to Lender
          </label>
          <textarea
            {...register('notes')}
            placeholder="Explain why you need this item or any special requests..."
            rows={4}
            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400 resize-none"
          />
          {errors.notes && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
              <AlertCircle size={12} /> {errors.notes.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            Proposed Meetup Point
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
              <MapPin size={16} />
            </span>
            <input
              type="text"
              {...register('meetupLoc')}
              placeholder="e.g. PUP Main Library, CEA Lobby"
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
            />
          </div>
          {errors.meetupLoc && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
              <AlertCircle size={12} /> {errors.meetupLoc.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            Proposed Date & Time (Optional)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
              <Calendar size={16} />
            </span>
            <input
              type="text"
              {...register('meetupTime')}
              placeholder="e.g. Friday, 2:00 PM"
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-neutral-400"
            />
          </div>
          {errors.meetupTime && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
              <AlertCircle size={12} /> {errors.meetupTime.message}
            </p>
          )}
        </div>

        <Button variant="primary" fullWidth loading={loading}>
          Submit Request
        </Button>
      </form>
    </div>
  );
}
