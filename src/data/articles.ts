import { Article } from '../types/article';

export const CATEGORIES = [
  'All',
  'Crypto',
  'Payments',
  'Africa',
  'Stablecoins',
  'Sui',
  'Guides',
  'Product',
  'Company',
] as const;

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'why-stablecoins-are-becoming-more-than-a-crypto-story-in-africa',
    title: 'Why stablecoins are becoming more than a crypto story in Africa',
    subtitle: 'From cross-border settlements to everyday utility, digital dollars are quietly rewiring African commerce.',
    excerpt: 'Across Lagos, Nairobi, and Accra, stablecoins are no longer treated as speculative tokens. They are becoming the practical settlement rail for small merchants, cross-border traders, and remote workers.',
    category: 'Stablecoins',
    author: {
      name: 'Amara Okafor',
      role: 'Head of Research, Payfrica',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    },
    date: 'September 2026',
    readTime: '8 min read',
    image: '/src/assets/images/featured_stablecoin_africa_1790538237372.jpg',
    imageCaption: 'Merchants and digital businesses in West Africa are turning to stablecoin settlement for predictable liquidity.',
    featured: true,
    tags: ['Stablecoins', 'Fintech', 'Africa', 'Payments', 'USDC'],
    sections: [
      {
        heading: 'The Shift from Speculation to Utility',
        content: [
          'For years, the mainstream narrative around cryptocurrency in emerging markets revolved around price volatility, algorithmic arbitrage, and get-rich-quick trading cycles. But if you walk through the technology hubs of Yaba or commercial corridors in Alaba International Market, the reality on the ground in 2026 tells a fundamentally different story.',
          'Small businesses and digital service providers aren’t holding digital assets in hopes of a ten-fold speculative return. They are holding USDC and USDT to escape double-digit currency depreciation, settle invoices with Asian suppliers within seconds, and avoid the prohibitive fees of legacy wire systems that routinely hold payments hostage for days.'
        ],
        pullQuote: 'Stablecoins in Africa are not an ideological experiment. They are an engineering response to the broken plumbing of traditional cross-border banking.'
      },
      {
        heading: 'Friction at the Edges: The Off-Ramp Problem',
        content: [
          'Holding digital dollars in a self-custody wallet or mobile account is only half the battle. A business must still pay local suppliers in Naira, Cedis, or Shillings. Workers must pay rent and buy groceries with local legal tender.',
          'Historically, converting on-chain value to local bank deposits required navigating opaque peer-to-peer marketplaces fraught with counterparty risk, frozen bank accounts, and unpredictable exchange spreads. The real breakthrough of modern fintech infrastructure—such as Payfrica’s automated off-ramp on Sui—is making the transition between stablecoins and local commercial bank accounts instantaneous, transparent, and direct.'
        ],
        callout: {
          title: 'The Liquidity Reality',
          description: 'Over 68% of small cross-border African importers surveyed in Q2 2026 reported utilizing stablecoins for trade settlements, citing an average 4-day time saving compared to correspondent banking.'
        }
      },
      {
        heading: 'Building Invisible Rails',
        content: [
          'The ultimate destination for African digital payments is invisibility. A consumer paying for power or a freelance designer sending funds to their family should never have to ponder gas fees, RPC nodes, or block finality.',
          'As underlying high-throughput networks provide sub-second finality at fractional-cent transaction costs, the distinction between "crypto" and "fintech" dissolves. What remains is simply an order of magnitude faster and cheaper financial network tailored to the realities of a young, mobile-first continent.'
        ]
      }
    ]
  },
  {
    id: 'art-2',
    slug: 'sui-stablecoins-and-the-next-generation-of-african-payments',
    title: 'Sui, stablecoins and the next generation of African payments',
    subtitle: 'How object-centric blockchain architecture enables sub-second transaction finality for real-world retail payments.',
    excerpt: 'High gas fees and 15-minute wait times cannot power a grocery store checkout or an airtime top-up. Here is why high-throughput execution engines like Sui change the equation.',
    category: 'Sui',
    author: {
      name: 'Kofi Mensah',
      role: 'Core Protocols Lead, Team Sushi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    },
    date: 'September 2026',
    readTime: '6 min read',
    image: '/src/assets/images/sui_fast_payments_1790538249336.jpg',
    imageCaption: 'Parallel transaction execution allows everyday micro-payments to settle without network congestion.',
    editorsPick: true,
    tags: ['Sui', 'Infrastructure', 'Scalability', 'Move'],
    sections: [
      {
        heading: 'Why Transaction Finality Dictates Payment UX',
        content: [
          'In traditional blockchain design, all transactions compete for block space in a single sequential queue. During moments of network congestion, fees spike unpredictably and transactions stall. While an institutional fund can tolerate waiting 12 minutes for a confirmation, a merchant in Ikeja cannot ask a customer to wait at the register while a block confirms.',
          'Sui’s object-centric model changes this by allowing simple transactions—like point-to-point token transfers or payment voucher redemptions—to bypass consensus entirely through Byzantine Consistent Broadcast. Settlement drops below 400 milliseconds, matching or exceeding the speed of traditional card rails.'
        ],
        pullQuote: 'If a payment takes more than three seconds, the user assumes it failed. In retail commerce, latency is the ultimate churn vector.'
      },
      {
        heading: 'The Move Advantage for Financial Safety',
        content: [
          'Security failures on smart contract networks have historically drained billions from unsuspecting users. Sui’s Move programming language treats digital assets as distinct objects with strict ownership capabilities and access permissions.',
          'For an African payments infrastructure provider like Payfrica, this means escrow mechanisms, fiat-backed vouchers, and automated liquidity distributions are verified by the Move compiler before deployment, eliminating common smart contract vulnerabilities like reentrancy.'
        ]
      }
    ]
  },
  {
    id: 'art-3',
    slug: 'from-wallet-to-bank-account-understanding-the-off-ramp',
    title: 'From wallet to bank account: understanding the off-ramp',
    subtitle: 'The mechanics of turning digital currency into local bank credit in seconds without peer-to-peer hassle.',
    excerpt: 'Off-ramps are the bridge where decentralized ledgers meet regulated domestic payment networks. Here is an inside look at how instant fiat payouts work under the hood.',
    category: 'Payments',
    author: {
      name: 'Zainab Bello',
      role: 'Treasury & Liquidity Operations',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
    },
    date: 'August 2026',
    readTime: '5 min read',
    image: '/src/assets/images/offramp_fiat_bridge_1790538259476.jpg',
    imageCaption: 'Instant off-ramp infrastructure matches on-chain liquidations with direct domestic clearing house rails.',
    tags: ['Payments', 'Off-Ramp', 'Banking', 'NIP', 'Liquidity'],
    sections: [
      {
        heading: 'The Two-Sided Liquidity Equation',
        content: [
          'When an end-user triggers an off-ramp transaction—for instance, converting 50 USDC into Nigerian Naira—two distinct financial worlds must handshake in real time. On the blockchain side, the user signs a transfer locking the 50 USDC into an automated liquidity smart contract.',
          'Simultaneously, the platform’s treasury management engine detects the verified transaction hash, executes a spot pricing hedge against verified order books, and calls an authorized NIP (NIBSS Instant Payment) or mobile money API to dispatch the exact fiat equivalent into the recipient’s commercial bank account.'
        ],
        callout: {
          title: 'Direct Clearing vs. P2P',
          description: 'Traditional P2P relies on human counter-parties manually confirming receipt, causing 10-30 minute delays and bank dispute risks. Automated off-ramps route through programmatic liquidity pools in under 15 seconds.'
        }
      },
      {
        heading: 'Eliminating Bank Account Flagging',
        content: [
          'A recurring headache for crypto users across developing economies has been sudden bank account restrictions triggered by suspicious peer-to-peer narration notes. Because institutional off-ramp gateways route payouts through licensed payment partners and verified corporate treasury lines, transfers arrive as standard verified business settlements.'
        ]
      }
    ]
  },
  {
    id: 'art-4',
    slug: 'the-hidden-infrastructure-behind-instant-payments',
    title: 'The hidden infrastructure behind instant payments',
    subtitle: 'How automated liquidity routing and decentralized networks quietly replace correspondent banking rails.',
    excerpt: 'Sending money across African borders has historically been slower than flying an airplane between the two capitals. Inside the silent revolution fixing intra-African capital flows.',
    category: 'Payments',
    author: {
      name: 'Tunde Adeyemi',
      role: 'Chief Technology Officer, Payfrica',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    },
    date: 'August 2026',
    readTime: '7 min read',
    image: '/src/assets/images/crossborder_trade_africa_1790538270076.jpg',
    imageCaption: 'Digital rails circumvent the traditional multi-hop dollar clearing corridors in London and New York.',
    isAfricaBuilding: true,
    tags: ['Payments', 'Cross-Border', 'Infrastructure', 'Fintech'],
    sections: [
      {
        heading: 'The Absurdity of the Correspondent Route',
        content: [
          'Under the legacy banking architecture established in the late twentieth century, sending money from Nairobi to Lagos often required Kenyan Shillings to be converted to US Dollars in London or New York, routed through two intermediary correspondent banks, and finally reconverted to Nigerian Naira. Each hop incurred FX spreads, SWIFT telegraphic fees, and days of settlement latency.',
          'Modern Web3 payment rails collapse this topology completely. Value travels directly between local liquidity nodes using neutral stablecoins as a friction-free settlement standard.'
        ],
        pullQuote: 'Why should a payment between two African capitals take 72 hours and cross two European banking centers when the internet delivers data in milliseconds?'
      },
      {
        heading: 'Real-Time Clearing at Scale',
        content: [
          'By marrying high-speed blockchain state changes with local real-time gross settlement (RTGS) networks like PAPSS (Pan-African Payment and Settlement System) and local instant switches, cross-border commerce becomes as frictionless as domestic digital transfers.'
        ]
      }
    ]
  },
  {
    id: 'art-5',
    slug: 'why-blockchain-payments-dont-have-to-feel-like-blockchain',
    title: 'Why blockchain payments don’t have to feel like blockchain',
    subtitle: 'The best Web3 experiences are those where the user never realizes Web3 is happening under the hood.',
    excerpt: 'Seed phrases, hexadecimal addresses, and gas estimations are product design failures for mass consumer adoption. Here is how modern account abstraction and voucher links rewrite the rulebook.',
    category: 'Product',
    author: {
      name: 'Chioma Nwosu',
      role: 'Design Director, Payfrica',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
    },
    date: 'August 2026',
    readTime: '5 min read',
    image: '/src/assets/images/hero_editorial_abstract_1790538225740.jpg',
    imageCaption: 'Abstracted authentication and direct link vouchers eliminate technical friction for everyday transactions.',
    tags: ['UX', 'Product', 'Design', 'Web3', 'Adoption'],
    sections: [
      {
        heading: 'The 12-Word Burden',
        content: [
          'Asking a casual merchant or an everyday consumer to write twelve arbitrary words on a sheet of paper and keep it in a fireproof safe before they can accept ten dollars is fundamentally broken human-computer interaction.',
          'Consumer technologies succeed when they fit into established mental models: telephone numbers, one-time passwords, biometric face recognition, and shareable web links. When Payfrica designed the fiat voucher link concept, the goal was simple: anyone with a smartphone can receive money through a single URL, type in their account number, and receive funds in seconds.'
        ],
        pullQuote: 'You do not ask someone how TCP/IP packet fragmentation works before they send a WhatsApp message. Financial protocols must follow the same rule.'
      }
    ]
  },
  {
    id: 'art-6',
    slug: 'what-actually-happens-when-you-cash-out-usdc',
    title: 'What actually happens when you cash out USDC',
    subtitle: 'A technical and financial breakdown of automated order execution, price hedging, and clearing APIs.',
    excerpt: 'Step behind the screen to see the telemetry, API handshakes, and bank switches that turn a digital cryptographic signature into a bank deposit notification in under 10 seconds.',
    category: 'Crypto',
    author: {
      name: 'Tunde Adeyemi',
      role: 'Chief Technology Officer, Payfrica',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    },
    date: 'July 2026',
    readTime: '6 min read',
    image: '/src/assets/images/offramp_fiat_bridge_1790538259476.jpg',
    tags: ['Crypto', 'USDC', 'Engineering', 'Architecture'],
    sections: [
      {
        heading: 'The 4-Step Lifecyle of a Cash-Out',
        content: [
          '1. Transaction Broadcast: The user authorizes a transaction via their wallet or applet. On Sui, this object transition is signed and submitted to validator RPCs with negligible gas cost.',
          '2. Event Listening & Verification: Webhook daemons confirm the block finality in ~380ms. The contract emits an OnRampDeposit event capturing beneficiary bank details and settlement amount.',
          '3. FX Settlement & Risk Check: Platform balance reserves compute real-time slippage bounds and lock the quoted conversion rate.',
          '4. Bank Switch Dispatch: A secure payload reaches the domestic instant payment switch, and the beneficiary’s phone buzzes with a standard credit alert.'
        ]
      }
    ]
  },
  {
    id: 'art-7',
    slug: 'guide-what-is-a-stablecoin-and-how-does-it-work',
    title: 'Guide: What is a stablecoin and how does it work?',
    subtitle: 'A plain-language guide for beginners looking to understand digital dollars, peg stability, and reserves.',
    excerpt: 'Unlike Bitcoin or other fluctuating tokens, stablecoins are engineered to remain fixed to the value of a sovereign currency like the US Dollar. Here is how they maintain that 1:1 anchor.',
    category: 'Guides',
    author: {
      name: 'Amara Okafor',
      role: 'Head of Research, Payfrica',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    },
    date: 'July 2026',
    readTime: '4 min read',
    image: '/src/assets/images/featured_stablecoin_africa_1790538237372.jpg',
    isGuide: true,
    tags: ['Guides', 'Stablecoins', 'Beginners', 'Education'],
    sections: [
      {
        heading: 'The Basics: Digital Cash on Modern Rails',
        content: [
          'Imagine having one US dollar bill sitting in an audited bank vault in New York. For that exact physical dollar, a digital token is minted on a global ledger. That token can be transferred to anyone with an internet connection anywhere in the world in seconds.',
          'Whenever someone wants their dollar back, they redeem the token, and the bank releases the sovereign currency. That is the fundamental mechanism behind asset-backed stablecoins like USDC.'
        ],
        callout: {
          title: 'Key Takeaway',
          description: 'Stablecoins combine the stability of sovereign currencies with the speed, 24/7 availability, and borderless reach of modern blockchain networks.'
        }
      }
    ]
  },
  {
    id: 'art-8',
    slug: 'guide-how-crypto-to-naira-conversion-works',
    title: 'Guide: How crypto-to-naira conversion works without peer-to-peer risks',
    subtitle: 'The safer, automated alternative to trading crypto with strangers on WhatsApp groups or P2P boards.',
    excerpt: 'Avoid account freezes and transaction disputes. Learn how direct automated off-ramps protect your capital and deliver instant local bank transfers.',
    category: 'Guides',
    author: {
      name: 'Zainab Bello',
      role: 'Treasury & Liquidity Operations',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
    },
    date: 'July 2026',
    readTime: '5 min read',
    image: '/src/assets/images/sui_fast_payments_1790538249336.jpg',
    isGuide: true,
    tags: ['Guides', 'Naira', 'Off-Ramp', 'P2P', 'Security'],
    sections: [
      {
        heading: 'Why Traditional P2P Poses Risks',
        content: [
          'When exchanging crypto on peer-to-peer marketplaces, you are transacting with anonymous individuals whose source of fiat funds cannot be guaranteed. If a counter-party uses funds tied to a disputed account, your bank may freeze your entire balance as an investigative precaution.',
          'With Payfrica’s regulated institutional rails, payouts come directly from registered corporate accounts with transparent financial audit trails.'
        ]
      }
    ]
  },
  {
    id: 'art-9',
    slug: 'how-to-buy-airtime-and-pay-bills-with-digital-assets',
    title: 'How to buy airtime and pay utility bills with digital assets',
    subtitle: 'Turning on-chain stablecoins into mobile recharge, electricity tokens, and data bundles in seconds.',
    excerpt: 'Everyday utility is the true test of any financial network. Explore how Africans are spending USDC directly on daily essentials across MTN, Airtel, Glo, and national utility grids.',
    category: 'Guides',
    author: {
      name: 'Kofi Mensah',
      role: 'Core Protocols Lead, Team Sushi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    },
    date: 'June 2026',
    readTime: '4 min read',
    image: '/src/assets/images/offramp_fiat_bridge_1790538259476.jpg',
    isGuide: true,
    tags: ['Guides', 'Airtime', 'Utilities', 'Everyday-Life'],
    sections: [
      {
        heading: 'Closing the Loop on Everyday Utility',
        content: [
          'Historically, using crypto to recharge your phone required multiple tedious steps: transferring tokens to an exchange, selling to fiat, waiting for withdrawal to a bank, and then opening a banking app to purchase airtime.',
          'By integrating telco aggregator APIs directly into the Payfrica settlement engine, the entire sequence is compressed into a single one-click transaction.'
        ]
      }
    ]
  },
  {
    id: 'art-10',
    slug: 'africa-is-building-the-startups-rewiring-african-trade',
    title: 'Africa is building: the startups rewiring continental trade',
    subtitle: 'Spotlighting founders in Lagos, Kigali, and Nairobi creating alternatives to century-old banking cartels.',
    excerpt: 'From digital invoice discounting to automated FX corridors, a new wave of African engineers is building resilient financial primitives designed from day one for the continent.',
    category: 'Africa',
    author: {
      name: 'Amara Okafor',
      role: 'Head of Research, Payfrica',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    },
    date: 'June 2026',
    readTime: '7 min read',
    image: '/src/assets/images/crossborder_trade_africa_1790538270076.jpg',
    isAfricaBuilding: true,
    tags: ['Africa', 'Startups', 'Founders', 'Venture', 'Trade'],
    sections: [
      {
        heading: 'Building from First Principles',
        content: [
          'African fintechs have learned an invaluable lesson over the past decade: importing financial models designed for Silicon Valley or Frankfurt rarely works in environments with high currency fluctuation, fragmented regional borders, and cash-dominant retail supply chains.',
          'The founders winning today are those building hyper-localized interfaces with global capital backends.'
        ]
      }
    ]
  },
  {
    id: 'art-11',
    slug: 'inside-team-sushi-building-payfrica-on-sui',
    title: 'Inside Team Sushi: why we decided to build Payfrica on Sui',
    subtitle: 'The engineering rationale, developer velocity, and product conviction behind our technology stack.',
    excerpt: 'When evaluating execution layers for Payfrica’s high-frequency settlement engine, sub-second latency and deterministic state changes were non-negotiable. Here is why Move and Sui won our conviction.',
    category: 'Company',
    author: {
      name: 'Tunde Adeyemi',
      role: 'Chief Technology Officer, Payfrica',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    },
    date: 'May 2026',
    readTime: '6 min read',
    image: '/src/assets/images/hero_editorial_abstract_1790538225740.jpg',
    tags: ['Company', 'TeamSushi', 'Sui', 'Move', 'Engineering'],
    sections: [
      {
        heading: 'Architecture Decisions That Matter',
        content: [
          'When Team Sushi started prototyping Payfrica, we tested multiple smart contract environments. We immediately encountered familiar hurdles: high gas fees during congestion spikes, cumbersome nonce management for concurrent transactions, and complex security audits required to prevent re-entrancy bugs.',
          'Sui’s Move architecture eliminated these pain points at the language level. Objects are first-class primitives, transactions execute concurrently without locking unrelated state, and gas fees remain predictably below a single cent.'
        ]
      }
    ]
  },
  {
    id: 'art-12',
    slug: 'the-fiat-voucher-sending-money-as-a-web-link',
    title: 'The fiat voucher: sending money as easily as sharing a web link',
    subtitle: 'How Payfrica enables on-chain transfers that any recipient can claim into their bank account without a crypto wallet.',
    excerpt: 'Imagine sending digital dollars to someone who has never touched crypto in their life. With Payfrica fiat vouchers, the recipient simply clicks a link, inputs their bank details, and receives cash.',
    category: 'Product',
    author: {
      name: 'Chioma Nwosu',
      role: 'Design Director, Payfrica',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
    },
    date: 'May 2026',
    readTime: '5 min read',
    image: '/src/assets/images/offramp_fiat_bridge_1790538259476.jpg',
    tags: ['Product', 'Voucher', 'Innovation', 'Payments'],
    sections: [
      {
        heading: 'Radical Simplicity for Onboarding',
        content: [
          'The steepest drop-off in Web3 occurs during onboarding: downloading a mobile wallet extension, writing down 12 words, funding gas tokens, and learning about transaction nonces.',
          'A Payfrica fiat voucher reverses this entirely: the sender deposits stablecoins and generates a cryptographic claim link protected by an optional password or OTP. When the recipient opens the link, Payfrica’s smart contracts liquidate the value and immediately dispatch local currency to their designated account.'
        ]
      }
    ]
  },
  {
    id: 'art-13',
    slug: 'understanding-crypto-regulations-in-west-africa',
    title: 'Understanding crypto regulations in West Africa in 2026',
    subtitle: 'From sandboxes to licensing: how central banks are creating formal frameworks for digital asset businesses.',
    excerpt: 'A comprehensive review of regulatory guidelines from Nigeria’s SEC and CBN, Ghana’s sandbox initiatives, and the emerging compliance landscape for African digital asset operators.',
    category: 'Africa',
    author: {
      name: 'Amara Okafor',
      role: 'Head of Research, Payfrica',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    },
    date: 'April 2026',
    readTime: '8 min read',
    image: '/src/assets/images/featured_stablecoin_africa_1790538237372.jpg',
    tags: ['Africa', 'Regulation', 'Compliance', 'Policy'],
    sections: [
      {
        heading: 'The Shift toward Constructive Oversight',
        content: [
          'The era of outright crypto bans in West Africa has evolved into institutional engagement. Regulators have recognized that consumer demand for digital dollars and anti-inflation assets is resilient. The emphasis in 2026 is on stringent anti-money laundering (AML), automated travel rule compliance, and formal licensing pathways.'
        ]
      }
    ]
  },
  {
    id: 'art-14',
    slug: 'what-is-an-off-ramp-a-beginners-breakdown',
    title: 'What is an off-ramp? A beginner’s breakdown',
    subtitle: 'Everything you need to know about moving value from the blockchain back into your local bank.',
    excerpt: 'You have earned USDC or received crypto from an employer overseas. How do you actually turn that into groceries and rent money? Here is the complete beginner explanation.',
    category: 'Guides',
    author: {
      name: 'Zainab Bello',
      role: 'Treasury & Liquidity Operations',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
    },
    date: 'March 2026',
    readTime: '4 min read',
    image: '/src/assets/images/sui_fast_payments_1790538249336.jpg',
    isGuide: true,
    tags: ['Guides', 'Off-Ramp', 'Fintech101', 'Beginners'],
    sections: [
      {
        heading: 'Demystifying the Off-Ramp',
        content: [
          'In finance, an "on-ramp" is a doorway that allows you to take traditional legal tender (like Dollars, Naira, or Cedis) and buy digital assets. An "off-ramp" is the reverse doorway: it allows you to sell digital assets and deposit real cash directly into your bank or mobile money account.'
        ]
      }
    ]
  }
];
