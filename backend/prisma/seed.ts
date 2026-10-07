import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seed...');

  // Seed Authors
  const authors = await Promise.all([
    prisma.author.upsert({
      where: { name: 'Tunde Alao' },
      update: {},
      create: {
        name: 'Tunde Alao',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        role: 'Co-Founder & CTO, Payfrica',
        bio: 'Tunde leads the engineering and product team at Payfrica. He is passionate about building scalable financial infrastructure, Web3 protocols, and high-performance APIs for African developers.',
        twitter: 'tunde_alao_dev',
        linkedin: 'tunde-alao',
      },
    }),
    prisma.author.upsert({
      where: { name: 'Chioma Nnadi' },
      update: {},
      create: {
        name: 'Chioma Nnadi',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'Head of Crypto & Web3 Policy',
        bio: 'Chioma has over 8 years of experience in digital asset compliance, central bank relations, and payment systems. She writes extensively about regulations and stablecoin utility in Africa.',
        twitter: 'chioma_crypto',
        linkedin: 'chioma-nnadi',
      },
    }),
    prisma.author.upsert({
      where: { name: 'Amina Yusuf' },
      update: {},
      create: {
        name: 'Amina Yusuf',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        role: 'Senior Product Manager, Card Solutions',
        bio: 'Amina oversees the Bridge Virtual and Physical Card APIs. She previously led product divisions at top tier Pan-African banks and fintech giants.',
        twitter: 'amina_product',
        linkedin: 'amina-yusuf',
      },
    }),
    prisma.author.upsert({
      where: { name: 'Efe Osa' },
      update: {},
      create: {
        name: 'Efe Osa',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        role: 'Staff Infrastructure Engineer',
        bio: 'Efe designs the core transactional pipelines and high-frequency settlement nodes at Bridge. He specializes in low-latency distributed systems and database replication.',
        twitter: 'efe_infra_code',
        linkedin: 'efe-osa',
      },
    }),
  ]);

  console.log('✓ Authors seeded');

  // Seed Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'product' },
      update: {},
      create: {
        name: 'Product Updates',
        slug: 'product',
        color: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        description: 'Read about the latest features, releases, and updates to the Bridge and Payfrica developer suites.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'engineering' },
      update: {},
      create: {
        name: 'Engineering',
        slug: 'engineering',
        color: 'bg-blue-50',
        textColor: 'text-blue-700',
        description: 'Technical deep-dives, systems architecture, security patterns, and optimizations from our core developer team.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'finance' },
      update: {},
      create: {
        name: 'Africa Finance',
        slug: 'finance',
        color: 'bg-amber-50',
        textColor: 'text-amber-700',
        description: 'Analyses, updates, and reviews of traditional banking systems, mobile money ecosystems, and cross-border financial trends in Africa.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'crypto' },
      update: {},
      create: {
        name: 'Crypto Insights',
        slug: 'crypto',
        color: 'bg-indigo-50',
        textColor: 'text-indigo-700',
        description: 'Demystifying stablecoins, blockchain remittances, gas optimizations, and decentralized liquidity pools for business operations.',
      },
    }),
  ]);

  console.log('✓ Categories seeded');

  // Seed Newsletter Subscribers
  await Promise.all([
    prisma.newsletterSubscriber.upsert({
      where: { email: 'ayobamioketona@gmail.com' },
      update: {},
      create: { email: 'ayobamioketona@gmail.com' },
    }),
    prisma.newsletterSubscriber.upsert({
      where: { email: 'tunde@payfrica.com' },
      update: {},
      create: { email: 'tunde@payfrica.com' },
    }),
    prisma.newsletterSubscriber.upsert({
      where: { email: 'investors@ycombinator.com' },
      update: {},
      create: { email: 'investors@ycombinator.com' },
    }),
  ]);

  console.log('✓ Newsletter subscribers seeded');

  // Seed Posts (using the first post from frontend data as example)
  const authorChioma = authors.find(a => a.name === 'Chioma Nnadi');
  const categoryCrypto = categories.find(c => c.slug === 'crypto');

  if (authorChioma && categoryCrypto) {
    await prisma.post.upsert({
      where: { slug: 'stablecoins-slashing-fees' },
      update: {},
      create: {
        id: 'stablecoins-slashing-fees',
        title: 'How Stablecoins are Slashing Cross-Border Remittance Fees by 80% in West Africa',
        slug: 'stablecoins-slashing-fees',
        excerpt: 'Traditional wire transfers and international remittance providers charge up to 9% in fees. Here is how Bridge leverages stablecoin liquidity pools to settle payments in seconds for under 1%.',
        content: `# How Stablecoins are Slashing Cross-Border Remittance Fees by 80% in West Africa

For decades, moving money across borders in Africa has been one of the most expensive and slowest financial operations globally. According to the World Bank, the average cost of sending $200 to Sub-Saharan Africa remains hovering at an astronomical **8.9%**, with some corridors spiking above **12%**. 

For African small businesses, remote workers, and cross-border traders, these fees are not just operational friction—they are growth-stifling barriers. 

At **Bridge by Payfrica**, we rebuilt cross-border remittance architecture from first principles. By replacing traditional intermediary corresponding banking corridors with stablecoins (USDC, USDT, EURC), we have unlocked a system that is **80% cheaper**, settles in seconds, and runs 24/7.

---

## The Root Cause of Expensive Remittances: The Correspondent Banking Problem

To understand why stablecoins are revolutionary, we must look at how traditional cross-border bank wires operate.

When an exporter in Lagos, Nigeria wants to pay a supplier in Accra, Ghana, the funds do not travel directly between the two countries. Instead:
1. The sender's local bank exchanges Nigerian Naira (NGN) for US Dollars (USD).
2. The USD is wired to a global correspondent bank, often based in New York or London.
3. The global correspondent bank clears the funds and routes them to a regional bank in Ghana.
4. The regional bank converts the USD to Ghanaian Cedis (GHS).
5. The Ghanaian supplier receives the GHS.

Each hop in this network incurs a **SWIFT fee**, an **FX spread fee**, and a **handling fee**. Furthermore, because banks operate on siloed, time-locked ledgers, this process takes anywhere from 3 to 7 business days, leaving capital trapped in transit.

| Transaction Attribute | Traditional Bank Wire (SWIFT) | Bridge Stablecoin Rail |
| :--- | :--- | :--- |
| **Average Cost** | 7.5% - 10.0% | **< 1.2%** |
| **Settlement Time** | 3 - 5 Business Days | **< 3 Seconds** |
| **Availability** | Mon-Fri, 9 AM - 4 PM | **24 / 7 / 365** |
| **Transparency** | Hidden fees, opaque status | **On-chain, fully verifiable** |

---

## Enter the Bridge Rail: Programmable Stablecoins

Bridge bypasses the correspondent banking hierarchy entirely. Instead of routing funds through Western financial hubs, we utilize native blockchain protocols to execute peer-to-peer liquidity matching. 

Here is exactly how a transaction flows on our network:

### 1. High-Performance Local Ingress (On-Ramp)
The sender deposits local fiat (e.g., NGN via bank transfer, GHS via Mobile Money, or KES via M-Pesa) into our fully localized collection accounts. Bridge converts this fiat immediately into institutional-grade stablecoins (primarily USDC or USDT) via our localized liquidity providers.

### 2. Low-Cost Protocol Layer (Settlement)
The stablecoins are routed across cost-efficient, high-throughput layer-2 protocols (such as Stellar, Solana, and Arbitrum). Settle times on these networks take under **3 seconds** and incur transaction (gas) fees of less than **$0.01**.

### 3. Immediate Local Egress (Off-Ramp)
On the receiving side, Bridge detects the on-chain arrival and immediately triggers an API-driven payout. The receiver receives local currency in their bank account or mobile wallet in Accra, Nairobi, or Abidjan.

\`\`\`javascript
// Example: Initiating a cross-border payout using the Bridge SDK
import { BridgeClient } from '@payfrica/bridge-sdk';

const bridge = new BridgeClient({ apiKey: process.env.BRIDGE_SECRET_KEY });

const payout = await bridge.payouts.create({
  sourceAmount: 150000, // Amount in NGN
  sourceCurrency: 'NGN',
  targetCurrency: 'GHS',
  paymentMethod: 'mobile_money',
  receiver: {
    name: 'Kofi Mensah',
    phone: '+233241234567',
    provider: 'MTN_DEBIT'
  }
});

console.log(\`Payout initiated! ID: \${payout.id}. Settling via Stellar...\`);
\`\`\`

---

## Why Stablecoins, Not Volatile Cryptocurrencies?

A common misconception is that crypto payments expose merchants to extreme price volatility. If a business invoices a client for $5,000, they cannot afford for that value to drop to $4,200 during the minutes it takes to complete the transfer.

Stablecoins solve this. Because assets like USDC and USDT are strictly pegged 1:1 to the US Dollar and backed by audited reserves, they behave precisely like digital dollars. 

For businesses using Bridge:
* **No Speculation**: The exchange rates are locked in at the millisecond of transaction initiation.
* **Accounting Clarity**: Bookkeeping matches standard fiat accounting practices, removing tax and regulatory headaches.
* **Hedge Against Inflation**: Many African companies choose to maintain their balances in stablecoins on Bridge to guard their capital reserves against rapid local fiat currency devaluations.

---

## Looking Ahead: The Interconnected African Market

The African Continental Free Trade Area (AfCFTA) aims to build a single market for goods and services across 54 nations. However, a free trade zone cannot truly function without a unified, low-cost payment layer. 

By utilizing stablecoin liquidity layers, Bridge is establishing a borderless financial standard. We are removing the borders from payments so African businesses can focus on what matters: delivering world-class value.

Are you ready to optimize your corporate cross-border payments? [Sign up for a Bridge Developer Account](https://bridge.payfrical.xyz) or get in touch with our product team to view our customized treasury solutions.`,
        coverImage: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80',
        categoryId: categoryCrypto.id,
        authorId: authorChioma.id,
        date: new Date('2026-07-02'),
        readTime: '6 min read',
        tags: ['stablecoins', 'remittance', 'finance', 'blockchain'],
        views: 1420,
        claps: 248,
        isFeatured: true,
        isPublished: true,
      },
    });

    console.log('✓ Posts seeded');
  }

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@payfrica.com' },
    update: {},
    create: {
      email: 'admin@payfrica.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✓ Admin user seeded (email: admin@payfrica.com, password: admin123)');

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
