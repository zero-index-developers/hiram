export interface MockProposalMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
}

export interface MockProposal {
  id: string;
  lenderName: string;
  lenderAvatar?: string;
  itemName: string;
  itemImage?: string;
  offerType: 'trade' | 'rent' | 'borrow';
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  offerItems?: string;
  duration?: string;
  meetupLocation: string;
  meetupTime: string;
  messages: MockProposalMessage[];
  lastMessageText: string;
  lastMessageTime: string;
  unread: boolean;
}

export const mockProposalsData: MockProposal[] = [
  {
    id: 'prop-1',
    lenderName: 'Julius Cesar',
    itemName: 'Chemistry: Structure and Properties',
    offerType: 'borrow',
    status: 'pending',
    duration: '2 Weeks (Lending)',
    meetupLocation: 'PUP Main Campus - Dome Library',
    meetupTime: 'Monday, 10:00 AM',
    lastMessageText: 'Is the Chemistry Book still available for rent?',
    lastMessageTime: '10m ago',
    unread: true,
    messages: [
      { id: 'm1', sender: 'other', text: 'Hey there! I saw your listing for the Chemistry Book.', timestamp: '10:15 AM' },
      { id: 'm2', sender: 'other', text: 'Is the Chemistry Book still available for rent?', timestamp: '10:16 AM' }
    ]
  },
  {
    id: 'prop-2',
    lenderName: 'Marcus Aurelius',
    itemName: 'Drawing Board & T-Square 36"',
    offerType: 'trade',
    status: 'accepted',
    offerItems: 'Calculus Guide + Mechanics Notebook',
    meetupLocation: 'CEA Building Lobby',
    meetupTime: 'Friday, 2:00 PM',
    lastMessageText: 'Offered Calculus Guide in exchange for your board.',
    lastMessageTime: '2h ago',
    unread: false,
    messages: [
      { id: 'm3', sender: 'other', text: 'Hey, I really need that Drawing Board for my midterm plate.', timestamp: 'Yesterday' },
      { id: 'm4', sender: 'me', text: 'Sure! What are you offering for the exchange?', timestamp: 'Yesterday' },
      { id: 'm5', sender: 'other', text: 'Offered Calculus Guide in exchange for your board.', timestamp: 'Yesterday' },
      { id: 'm6', sender: 'me', text: 'That works for me. Let us meet up at the CEA lobby on Friday!', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 'prop-3',
    lenderName: 'Cleopatra Philopator',
    itemName: 'Scientific Calculator Casio fx-991ES Plus',
    offerType: 'rent',
    status: 'completed',
    duration: '1 Month - PHP 150',
    meetupLocation: 'PUP Lagoon Benches',
    meetupTime: 'May 15, 11:30 AM',
    lastMessageText: 'Returned the calculator. Thanks a lot!',
    lastMessageTime: '3 days ago',
    unread: false,
    messages: [
      { id: 'm7', sender: 'other', text: 'Hi! Can I rent the Casio calculator for a month? I have engineering exams.', timestamp: 'May 14' },
      { id: 'm8', sender: 'me', text: 'Absolutely. We can meet by the lagoon benches.', timestamp: 'May 14' },
      { id: 'm9', sender: 'other', text: 'Returned the calculator. Thanks a lot!', timestamp: 'May 15' }
    ]
  }
];
