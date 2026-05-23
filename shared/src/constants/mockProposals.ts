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
  itemId?: string;
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
    itemId: '4',
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
    itemId: '3',
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
    itemId: '6',
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
  },
  {
    id: 'prop-4',
    lenderName: 'Leonardo DaVinci',
    itemName: 'Laptop Stand & External Keyboard',
    itemId: '7',
    offerType: 'borrow',
    status: 'pending',
    duration: '3 Weeks (Lending)',
    meetupLocation: 'PUP Library East Wing',
    meetupTime: 'Tomorrow, 1:00 PM',
    lastMessageText: 'Your keyboard looks perfect for my setup!',
    lastMessageTime: '2h ago',
    unread: true,
    messages: [
      { id: 'm10', sender: 'other', text: 'Hi! I saw your keyboard and stand listing. Can I borrow them for a few weeks?', timestamp: 'Today 11:30 AM' },
      { id: 'm11', sender: 'other', text: 'Your keyboard looks perfect for my setup!', timestamp: 'Today 1:45 PM' }
    ]
  },
  {
    id: 'prop-5',
    lenderName: 'Michelangelo Buonarroti',
    itemName: 'Design Thinking Toolkit & Resources',
    itemId: '8',
    offerType: 'trade',
    status: 'pending',
    offerItems: 'Adobe Creative Suite Guide + Digital Design Portfolio',
    meetupLocation: 'CCS Building Hallway',
    meetupTime: 'Saturday, 3:30 PM',
    lastMessageText: 'I have those Adobe guides you might need.',
    lastMessageTime: '5h ago',
    unread: true,
    messages: [
      { id: 'm12', sender: 'other', text: 'Hey! I really need your design toolkit for my thesis project.', timestamp: 'Today 8:15 AM' },
      { id: 'm13', sender: 'other', text: 'I have those Adobe guides you might need.', timestamp: 'Today 8:20 AM' }
    ]
  },
  {
    id: 'prop-6',
    lenderName: 'Ada Lovelace',
    itemName: 'Biology Textbook & Lab Manual Set',
    itemId: '9',
    offerType: 'borrow',
    status: 'accepted',
    duration: '2 Weeks (Lending)',
    meetupLocation: 'Science Building Ground Floor',
    meetupTime: 'Monday, 9:00 AM',
    lastMessageText: 'Great! See you on Monday morning.',
    lastMessageTime: '1 day ago',
    unread: false,
    messages: [
      { id: 'm14', sender: 'other', text: 'Would you be able to lend the biology set for midterms?', timestamp: 'Yesterday' },
      { id: 'm15', sender: 'me', text: 'Sure thing! It will really help with lab practicals.', timestamp: 'Yesterday' },
      { id: 'm16', sender: 'other', text: 'Great! See you on Monday morning.', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 'prop-7',
    lenderName: 'Vincent Van Gogh',
    itemName: 'Photography Lighting Kit',
    itemId: '10',
    offerType: 'trade',
    status: 'declined',
    offerItems: 'Tripod + Camera Backpack',
    meetupLocation: 'Main Campus Square',
    meetupTime: 'N/A',
    lastMessageText: 'Unfortunately I need to decline your offer.',
    lastMessageTime: '2 days ago',
    unread: false,
    messages: [
      { id: 'm17', sender: 'other', text: 'Would you trade your lighting kit for my tripod and camera bag?', timestamp: '2 days ago' },
      { id: 'm18', sender: 'me', text: 'Unfortunately I need to decline your offer.', timestamp: '2 days ago' }
    ]
  },
  {
    id: 'prop-8',
    lenderName: 'Raphael Sanzio',
    itemName: 'Engineering Drawing Set & Compass Collection',
    itemId: '11',
    offerType: 'borrow',
    status: 'accepted',
    duration: '1 Month (Lending)',
    meetupLocation: 'Engineering Building Gate',
    meetupTime: 'Wednesday, 2:00 PM',
    lastMessageText: 'Perfect timing! I start my technical drawing course next week.',
    lastMessageTime: '4h ago',
    unread: false,
    messages: [
      { id: 'm19', sender: 'other', text: 'Hi! Can I borrow the drawing set? I need it for my engineering course.', timestamp: 'Today 10:00 AM' },
      { id: 'm20', sender: 'me', text: 'Of course! Let\'s meet this Wednesday.', timestamp: 'Today 10:15 AM' },
      { id: 'm21', sender: 'other', text: 'Perfect timing! I start my technical drawing course next week.', timestamp: 'Today 10:20 AM' }
    ]
  },
  {
    id: 'prop-9',
    lenderName: 'Galileo Galilei',
    itemName: 'Portable Projector & Screen',
    itemId: '12',
    offerType: 'borrow',
    status: 'pending',
    duration: '2 Weeks (Lending)',
    meetupLocation: 'PUP Main Library',
    meetupTime: 'Friday, 4:00 PM',
    lastMessageText: 'We need it for our thesis presentation this month.',
    lastMessageTime: '30m ago',
    unread: true,
    messages: [
      { id: 'm22', sender: 'other', text: 'Can we borrow your projector? Our group needs it for presentations.', timestamp: 'Today 3:30 PM' },
      { id: 'm23', sender: 'other', text: 'We need it for our thesis presentation this month.', timestamp: 'Today 3:35 PM' }
    ]
  }
];
