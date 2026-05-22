import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  MessageCircle, 
  Linkedin, 
  ArrowRight, 
  ShieldCheck, 
  Crown, 
  AlertTriangle, 
  Users, 
  Compass, 
  FileText,
  Lock,
  Unlock,
  Fingerprint,
  CheckCircle2,
  Building2,
  Sparkles,
  Check
} from 'lucide-react';

// Elegant micro-animation wrapper for dynamic cards
function ScrollReveal({ children, delay = 0, x = 0, y = 30 }: { children: React.ReactNode; delay?: number; x?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  // Succession Audit State
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1]);
  const [showResult, setShowResult] = useState(false);
  
  // Interactive Blueprint State
  const [activePillar, setActivePillar] = useState(0);
  const [showArchitectureModal, setShowArchitectureModal] = useState(false);
  const [isAnalyzingBiometrics, setIsAnalyzingBiometrics] = useState(false);
  const [biometricsAuthorized, setBiometricsAuthorized] = useState(false);

  // Estate Protection Calculator State
  const [enterpriseValue, setEnterpriseValue] = useState(25);
  const [transitionRisk, setTransitionRisk] = useState(40);

  React.useEffect(() => {
    const handleScroll = () => {
      const card0 = document.getElementById('pillar-card-0');
      const card1 = document.getElementById('pillar-card-1');
      const card2 = document.getElementById('pillar-card-2');
      if (!card0 || !card1 || !card2) return;

      const rect0 = card0.getBoundingClientRect();
      const rect1 = card1.getBoundingClientRect();
      const rect2 = card2.getBoundingClientRect();

      const threshold = window.innerHeight * 0.45;
      if (rect2.top <= threshold) {
        setActivePillar(2);
      } else if (rect1.top <= threshold) {
        setActivePillar(1);
      } else {
        setActivePillar(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const auditQuestions = [
    {
      title: "Leadership & Continuity",
      question: "Who takes over critical business decisions if you are suddenly incapacitated tomorrow?",
      options: [
        { label: "A fully prepared, designated successor with operational access.", score: 0 },
        { label: "My business partners or family members (though not fully trained).", score: 5 },
        { label: "No one. Every major decision and relationship stops with me.", score: 10 }
      ]
    },
    {
      title: "Succession Framework",
      question: "Is there a legally binding, fully funded, and executable succession plan in place?",
      options: [
        { label: "Yes, fully documented and backed by buy-sell agreements.", score: 0 },
        { label: "Partially, but it hasn't been updated recently or legally finalized.", score: 5 },
        { label: "No succession document exists; it's mostly in my head.", score: 10 }
      ]
    },
    {
      title: "Asset & Wealth Isolation",
      question: "Is your personal wealth and family inheritance fully protected from business liabilities?",
      options: [
        { label: "Yes, assets are cleanly isolated in trust structures / corporate wrappers.", score: 0 },
        { label: "Somewhat, but personal guarantees or mixed lines of credit exist.", score: 5 },
        { label: "No, my personal estate is highly exposed if the business defaults.", score: 10 }
      ]
    }
  ];

  const handleAnswerSelect = (optionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = auditQuestions[currentStep].options[optionIndex].score;
    setAnswers(updatedAnswers);

    if (currentStep < auditQuestions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 400);
    }
  };

  const resetAudit = () => {
    setAnswers([-1, -1, -1]);
    setCurrentStep(0);
    setShowResult(false);
  };

  // Calculate risk profile
  const totalScore = answers.reduce((acc, curr) => (curr !== -1 ? acc + curr : acc), 0);
  const getRiskProfile = (score: number) => {
    if (score >= 25) {
      return {
        level: "CRITICAL KEYMAN RISK",
        color: "text-rose-500 bg-rose-500/5",
        barColor: "bg-rose-500",
        desc: "Your enterprise is almost entirely dependent on your physical presence. An unexpected absence would result in immediate operational paralysis, risk of customer churn, and massive family inheritance exposure.",
        action: "Urgent structured succession planning is required to de-risk key workflows."
      };
    } else if (score >= 12) {
      return {
        level: "MODERATE / VULNERABLE",
        color: "text-amber-500 bg-amber-500/5",
        barColor: "bg-amber-500",
        desc: "You have basic structures in place, but lack deep legal frameworks or clear execution paths. Your family or partners would face heavy administrative friction trying to keep operations stable.",
        action: "Refining operational handovers and isolating family wealth should be prioritized."
      };
    } else {
      return {
        level: "STRONG / DE-RISKED",
        color: "text-emerald-500 bg-emerald-500/5",
        barColor: "bg-emerald-500",
        desc: "Your organization is positioned well with strong governance structures. However, regular audits of valuations and asset protection remain vital as market conditions change.",
        action: "Keep agreements current with periodic reviews."
      };
    }
  };

  const risk = getRiskProfile(totalScore);

  // Generate WhatsApp message with prefilled audit details
  const whatsappUrl = () => {
    const baseText = `Hello Maria, I just completed your succession risk audit on "The Empty Business Chair" landing page.\n\n` +
      `*My Succession Audit Results*:\n` +
      `• Risk Profile: ${risk.level}\n` +
      `• Q1 (Leadership): ${answers[0] === 10 ? 'Unprepared' : answers[0] === 5 ? 'Vulnerable' : 'Prepared'} (${answers[0]}/10 pts)\n` +
      `• Q2 (Plan): ${answers[1] === 10 ? 'None' : answers[1] === 5 ? 'Outdated' : 'Solid'} (${answers[1]}/10 pts)\n` +
      `• Q3 (Wealth): ${answers[2] === 10 ? 'Exposed' : answers[2] === 5 ? 'Linked' : 'Protected'} (${answers[2]}/10 pts)\n\n` +
      `I would like to explore how to turn my wealth into a structured, lasting family legacy. Let's connect.`;
    return `https://wa.me/60132934934?text=${encodeURIComponent(baseText)}`;
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-clip relative">
      
      {/* Decorative Grid Overlay & Ambient Glowing Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e2db_1px,transparent_1px),linear-gradient(to_bottom,#e5e2db_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[45%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.02)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[15%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.02)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />

      {/* Luxury Minimal Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#faf9f7]/85 border-b border-stone-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg tracking-[0.25em] text-stone-900 font-semibold uppercase">
              Jazz<span className="text-[#b45309] italic">&</span>J
            </span>
            <div className="h-4 w-px bg-stone-300" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 font-medium hidden sm:inline-block">
              Succession Advisory
            </span>
          </div>
          <a
            href="#risk-audit"
            className="text-xs font-semibold tracking-widest uppercase bg-stone-900 hover:bg-[#b45309] text-white hover:scale-[1.02] active:scale-95 transition-all duration-300 px-5 py-2.5 rounded-xl shadow-sm"
          >
            Audit Your Risk
          </a>
        </div>
      </header>

      {/* Centered Hero Section (Metaphorical Overhaul - Zero SVG Chair) */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-16 pb-28 z-10 text-center">
        <div className="max-w-4xl mx-auto w-full space-y-10">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b45309]/5 border border-[#b45309]/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#b45309] animate-pulse" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#b45309] uppercase">
              A Critical Reality Check for Owners
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-900 leading-[1.1] tracking-tight">
              The Empty<br />
              <span className="italic text-[#b45309] font-normal bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
                Business Chair
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 font-serif max-w-2xl mx-auto leading-relaxed pt-2">
              Will your business survive if the unexpected happens tomorrow?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
          >
            <a
              href="#first-question"
              className="group flex items-center justify-center gap-3 bg-stone-900 hover:bg-[#b45309] text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all duration-300 shadow-sm w-full sm:w-auto"
            >
              <span>Read The Uncomfortable Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#risk-audit"
              className="flex items-center justify-center bg-[#f5f3ef] hover:bg-[#e9e6df] text-stone-800 px-8 py-4 rounded-xl font-medium tracking-wide transition-colors w-full sm:w-auto border border-stone-200/50 shadow-sm"
            >
              Launch Risk Audit
            </a>
          </motion.div>
        </div>
      </section>

      {/* The 30 Days Shock Hook Section (Cleaned borders completely) */}
      <section id="first-question" className="relative py-32 bg-[#12100f] text-stone-200 border-y border-stone-900/50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.02)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          
          <ScrollReveal>
            <div className="text-center space-y-4">
              <h2 className="text-[#b45309] font-medium tracking-[0.25em] uppercase text-xs">
                A Sudden Inconvenient Question
              </h2>
              <p className="text-3xl md:text-5xl font-serif text-stone-100 max-w-2xl mx-auto leading-tight">
                If your chair is empty tomorrow… permanently… what happens in <span className="underline decoration-amber-500/40 decoration-2 underline-offset-8">the first 30 days?</span>
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline of Hard Shock (Pure borderless styling) */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                time: "Not a holiday.",
                detail: "There is no return flight. No weekly Zoom syncs. No text check-ins.",
                bg: "bg-[#1a1715]"
              },
              {
                time: "Not a short break.",
                detail: "Operations must continue without your real-time problem-solving capacity.",
                bg: "bg-[#1a1715]"
              },
              {
                time: "A Permanent Vacancy.",
                detail: "A sudden reality where you never walk through the office doors again.",
                bg: "bg-amber-950/20 text-amber-100"
              }
            ].map((item, index) => (
              <div key={index} className="h-full">
                <ScrollReveal delay={index * 0.15}>
                  <div className={`p-8 rounded-2xl ${item.bg} space-y-4 hover:scale-[1.01] transition-transform duration-300 h-full`}>
                    <div className="text-lg font-serif text-stone-100 font-medium">{item.time}</div>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          {/* Triple threat prompts (Pure borderless styling) */}
          <ScrollReveal>
            <div className="bg-[#1a1715] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />
              <p className="text-xl md:text-2xl font-serif text-stone-300 leading-relaxed max-w-3xl mx-auto">
                "When the emotional shock subsides, practical crisis kicks in. What happens to your <span className="text-amber-500">staff</span>? Your <span className="text-amber-500">clients</span>? Your critical <span className="text-amber-500">cash flow</span>?"
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Decades of Work & Uncomfortable Truth */}
      <section className="py-32 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Decades of Work */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <ScrollReveal y={0} x={-30}>
              <div className="space-y-6">
                <span className="text-[10px] tracking-[0.25em] font-semibold text-stone-500 uppercase block">The Sweat & Sacrifice</span>
                <h3 className="text-4xl md:text-5xl font-serif text-stone-950 leading-tight">
                  Most business owners spend decades building something truly meaningful.
                </h3>
                <div className="w-16 h-0.5 bg-[#b45309]" />
                <p className="text-stone-600 leading-relaxed text-base">
                  You invested your life force. You sacrificed family dinners, took massive financial leaps, and spent sleepless nights worrying about meeting payroll.
                </p>
                <p className="text-stone-850 font-serif italic text-lg border-l-2 border-[#b45309]/40 pl-4 py-1">
                  "You didn’t just build an office with chairs... You built an economic engine that only you truly understand how to steer."
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - The Uncomfortable Truth (Cleaned borders completely) */}
          <div className="lg:col-span-7 space-y-12">
            
            <ScrollReveal y={30} x={30}>
              <div className="bg-white p-8 md:p-12 rounded-3xl space-y-8 relative shadow-[0_15px_45px_rgba(0,0,0,0.02)] border border-stone-200/50">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
                
                <div className="space-y-3">
                  <span className="text-[#b45309] text-xs font-semibold tracking-widest uppercase">The Uncomfortable Truth</span>
                  <h4 className="text-2xl md:text-3xl font-serif text-stone-900">
                    Many businesses are still built around one person — you.
                  </h4>
                </div>

                <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                  You've created a central dependency. The ultimate decisions, the vital client relationships, the strategic direction, and client trust—all sit on one single chair.
                </p>

                {/* Triple pillar breakdown */}
                <div className="grid sm:grid-cols-3 gap-6 pt-4">
                  {[
                    { icon: Users, title: "The Relationships", desc: "Key clients stay because of you." },
                    { icon: Compass, title: "The Key Decisions", desc: "No purchase goes unchecked." },
                    { icon: Crown, title: "The Brand Trust", desc: "You are the face of your legacy." }
                  ].map((feat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-2 text-[#b45309]">
                        <feat.icon className="w-4 h-4" />
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-800">{feat.title}</h5>
                      </div>
                      <p className="text-stone-500 text-xs leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-xl bg-rose-50/70 border border-rose-100/50 text-rose-900 text-sm leading-relaxed flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <p>
                    When your chair sits empty unexpectedly, operations slow down instantly—or worse, everything you built starts systematically falling apart.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Keyman Risk Callout (Cleaned borders completely) */}
            <ScrollReveal>
              <div className="bg-[#fdfbf7] border-l-4 border-l-[#b45309] border-t border-r border-b border-stone-200/40 p-8 md:p-12 rounded-3xl space-y-6 relative overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.02)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#b45309]/10 flex items-center justify-center text-[#b45309] flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Strategic Definition</span>
                    <h4 className="text-xl font-serif text-stone-900">The Fallacy of "Keyman Risk"</h4>
                  </div>
                </div>

                <div className="space-y-4 text-stone-600 text-sm md:text-base leading-relaxed pl-14">
                  <p>
                    Yes, corporate Keyman insurance can inject fresh cash immediately into a dying framework. It is necessary.
                  </p>
                  <p className="text-stone-850 font-medium">
                    But cash alone cannot replace your specific strategic leadership, operational foresight, or decades of handshakes.
                  </p>
                  <div className="p-5 bg-[#b45309]/5 rounded-xl text-center text-[#b45309] font-serif text-base font-medium italic mt-2">
                    "Corporate insurance is merely a financial plaster. It is not an active succession plan."
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Succession Blueprint Dashboard Section (Premium Light UI Breakout) */}
      <section className="py-32 bg-[#faf9f7] text-[#1c1a17] px-6 relative z-10 font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e2db_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <ScrollReveal>
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b45309]">The Deliverable</span>
              <h2 className="text-4xl md:text-6xl font-serif text-[#1c1a17]">
                The Legacy Succession Blueprint
              </h2>
              <p className="text-stone-650 text-base max-w-2xl mx-auto leading-relaxed font-hanken">
                A definitive, strategic framework engineered for ultra-high-net-worth continuity. We align private interests with regulatory demands to ensure an uninterrupted transition of influence.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-12 gap-12 items-start pt-8">
            {/* SideNavBar (Sticky Sidebar Index) */}
            <aside className="lg:col-span-4 sticky top-28 h-fit hidden lg:block">
              <div className="flex flex-col space-y-8 w-full max-w-xs border-l border-stone-200 pl-6 py-2">
                <div className="space-y-1">
                  <h3 className="text-xl font-serif text-stone-900 font-bold">The Strategic Pillars</h3>
                  <p className="text-[10px] text-[#b45309] font-semibold uppercase tracking-widest font-hanken">Protocol & Continuity</p>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {[
                    { id: 0, title: "1. Operational Proxy & Signatories", href: "#pillar-card-0" },
                    { id: 1, title: "2. Asset Shielding & Trust Registry", href: "#pillar-card-1" },
                    { id: 2, title: "3. Tax Registry & Succession Vault", href: "#pillar-card-2" },
                  ].map((pillar) => (
                    <a
                      key={pillar.id}
                      href={pillar.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setActivePillar(pillar.id);
                        document.querySelector(pillar.href)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className={`text-sm font-semibold tracking-wide transition-all duration-300 border-l-2 pl-4 py-1.5 -ml-[25px] cursor-pointer ${
                        activePillar === pillar.id
                          ? 'border-[#b45309] text-[#b45309] font-bold opacity-100'
                          : 'border-transparent text-stone-500 hover:text-stone-900 hover:opacity-80 opacity-60'
                      }`}
                    >
                      {pillar.title}
                    </a>
                  ))}
                </nav>

                <div className="pt-8 border-t border-stone-200">
                  <p className="text-[10px] text-stone-400 font-mono tracking-wider uppercase mb-3">Est. 2026 // Global Suite</p>
                  <div className="relative rounded-xl overflow-hidden grayscale contrast-125 opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-500 group shadow-md border border-stone-200">
                    <img 
                      alt="Minimalist Executive Boardroom" 
                      className="w-full h-44 object-cover select-none group-hover:scale-105 transition-transform duration-700" 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-3 left-3 text-[9px] font-mono text-white tracking-widest uppercase">discreet advisory pathway</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Editorial Advisory Cards */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Card 1: Operational Proxy */}
              <section 
                id="pillar-card-0" 
                className={`bg-white rounded-3xl p-8 md:p-12 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-stone-100 flex flex-col justify-between min-h-[400px] relative scroll-mt-24 ${
                  activePillar === 0 ? 'ring-1 ring-[#b45309]/20 shadow-[0_20px_40px_rgba(180,83,9,0.03)]' : ''
                }`}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.02)_0%,transparent_70%)] pointer-events-none rounded-full" />
                
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[#b45309] text-xs font-semibold tracking-widest uppercase">Section 01</span>
                      <h3 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold">Operational Proxy & Decision Delegation</h3>
                    </div>
                    <div className="p-3 bg-[#b45309]/5 rounded-xl text-[#b45309]">
                      <Crown className="w-6 h-6" />
                    </div>
                  </div>

                  <p className="text-stone-600 text-base md:text-lg leading-relaxed font-hanken">
                    Immediate activation of pre-defined executive proxy powers. Our protocol ensures that operational decision-making inertia is eliminated within the first 24 hours of an unforeseen exit.
                  </p>

                  {/* Horizontal Timeline */}
                  <div className="relative pt-8 pb-4">
                    <div className="absolute top-[41px] left-0 w-full h-[1px] bg-stone-200" />
                    <div className="grid grid-cols-3 gap-6 relative">
                      {[
                        { day: "Day 1", title: "Signatory Trigger", desc: "Legal proxy activated; secondary signatory overrides on critical accounts." },
                        { day: "Day 7", title: "Cashflow Authority", desc: "Delegated payroll, key suppliers, and emergency buffer approvals operationalized." },
                        { day: "Day 30", title: "Governance Alignment", desc: "Permanent succession alignment ratified cleanly by the corporate board." }
                      ].map((step, idx) => (
                        <div key={idx} className="space-y-3 relative group">
                          <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#b45309] group-hover:bg-[#b45309] transition-colors duration-300 relative z-10 -mt-1.5 shadow-sm" />
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-[#b45309] uppercase tracking-widest font-mono block">{step.day}</span>
                            <h4 className="text-xs font-bold text-stone-850 font-serif leading-tight">{step.title}</h4>
                            <p className="text-[11px] text-stone-500 leading-relaxed font-hanken">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Card 2: Asset Protection Wrapper */}
              <section 
                id="pillar-card-1" 
                className={`bg-white rounded-3xl p-8 md:p-12 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-stone-100 scroll-mt-24 relative ${
                  activePillar === 1 ? 'ring-1 ring-[#b45309]/20 shadow-[0_20px_40px_rgba(180,83,9,0.03)]' : ''
                }`}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.01)_0%,transparent_70%)] pointer-events-none rounded-full" />
                
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <span className="text-[#b45309] text-xs font-semibold tracking-widest uppercase">Section 02</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold">Asset Protection Trust & Share Isolation</h3>
                  </div>
                  <div className="p-3 bg-emerald-500/5 rounded-xl text-emerald-700">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-6">
                    <p className="text-stone-600 text-base leading-relaxed font-hanken">
                      Insulation of core family equity through multi-layered trust architectures. We prioritize the clean separation of economic benefits from raw corporate control to completely eliminate personal liability exposure.
                    </p>
                    <button 
                      onClick={() => setShowArchitectureModal(true)}
                      className="group flex items-center justify-center gap-2.5 border border-stone-900 hover:bg-stone-900 hover:text-white text-stone-900 px-6 py-3 font-semibold uppercase tracking-wider text-xs rounded-xl transition-all duration-300 shadow-sm cursor-pointer active:scale-[0.98]"
                    >
                      <span>View Trust Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Data Blocks inside the card */}
                  <div className="md:col-span-5 space-y-3.5">
                    {[
                      { label: "Share Isolation", val: "SECURE", sub: "Discretionary Trust Mode", secure: true },
                      { label: "Liquidity Reserves", val: "$14.2M EXEMPT", sub: "Asset-Isolated Cache", secure: null },
                      { label: "Liability Shielding", val: "LIABILITIES EXCLUDED", sub: "Zero Creditor Recourse", secure: true }
                    ].map((stat, idx) => (
                      <div key={idx} className="p-4 bg-[#fbfaf8] border border-stone-200/40 rounded-xl space-y-1 hover:bg-[#f5f3ef]/50 transition-colors">
                        <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">{stat.label}</span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-850 tracking-wide font-serif">{stat.val}</span>
                          {stat.secure === true ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ) : stat.secure === false ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]" />
                          ) : (
                            <span className="text-[9px] font-bold text-[#b45309] font-mono uppercase tracking-wider">PREMIUM</span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-500 leading-none font-hanken block">{stat.sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Card 3: Tax Minimization Registry & Succession Vault */}
              <section 
                id="pillar-card-2" 
                className={`bg-white rounded-3xl p-8 md:p-12 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-stone-100 scroll-mt-24 relative ${
                  activePillar === 2 ? 'ring-1 ring-[#b45309]/20 shadow-[0_20px_40px_rgba(180,83,9,0.03)]' : ''
                }`}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.01)_0%,transparent_70%)] pointer-events-none rounded-full" />
                
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <span className="text-[#b45309] text-xs font-semibold tracking-widest uppercase">Section 03</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold">Tax Minimization Registry & Continuity Vault</h3>
                  </div>
                  <div className="p-3 bg-[#b45309]/5 rounded-xl text-[#b45309]">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-stretch">
                  <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                    <p className="text-stone-600 text-base leading-relaxed font-hanken">
                      A dynamic registry of tax-efficient transfer milestones. We utilize step-up basis strategies and generational skipping trusts to completely bypass stamp duties, freeze events, and probate friction.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { meta: "Registry Code", val: "AX-992-GCN" },
                        { meta: "Regulatory Code", val: "Airtight Trusts" },
                        { meta: "Exempt Status", val: "Verified Pre-Approved" },
                        { meta: "Capital Preserved", val: "98.2% Net Ratio" }
                      ].map((item, idx) => (
                        <div key={idx} className="border-b border-stone-200/50 pb-2.5">
                          <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">{item.meta}</span>
                          <span className="text-xs font-bold text-stone-850 font-serif block mt-0.5">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Biometrics scan block */}
                  <div className="md:col-span-5 bg-[#fbfaf8] border border-stone-200/50 rounded-2xl p-6 flex flex-col items-center justify-between text-center relative overflow-hidden min-h-[300px]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.02)_0%,transparent_70%)] pointer-events-none rounded-full" />
                    
                    <div className="space-y-2 relative z-10 w-full">
                      <h4 className="text-xs uppercase font-mono tracking-widest text-[#b45309] font-bold">Registry Access</h4>
                      <p className="text-[11px] text-stone-500 font-hanken leading-relaxed">
                        Dual key authentication required to release Succession Protocol documents.
                      </p>
                    </div>

                    {/* Fingerprint area */}
                    <div className="my-6 relative z-10 flex flex-col items-center justify-center">
                      <AnimatePresence mode="wait">
                        {biometricsAuthorized ? (
                          <motion.div
                            key="auth-success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center space-y-3"
                          >
                            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-650 shadow-sm shadow-emerald-105">
                              <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-bold text-emerald-700 font-mono tracking-widest uppercase">PROTOCOL UNLOCKED</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="auth-lock"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center space-y-3"
                          >
                            <button
                              onClick={() => {
                                if (isAnalyzingBiometrics || biometricsAuthorized) return;
                                setIsAnalyzingBiometrics(true);
                                setTimeout(() => {
                                  setIsAnalyzingBiometrics(false);
                                  setBiometricsAuthorized(true);
                                }, 1800);
                              }}
                              disabled={isAnalyzingBiometrics}
                              className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 relative ${
                                isAnalyzingBiometrics
                                  ? 'bg-[#b45309]/10 border-[#b45309]/30 text-[#b45309] scale-95 shadow-md shadow-[#b45309]/5'
                                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700 shadow-sm cursor-pointer hover:border-stone-400 active:scale-95'
                              }`}
                            >
                              <Fingerprint className={`w-8 h-8 ${isAnalyzingBiometrics ? 'animate-pulse' : ''}`} />
                            </button>
                            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-widest">
                              {isAnalyzingBiometrics ? "Verifying Signature..." : "Scan Biometric"}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="w-full relative z-10">
                      {biometricsAuthorized ? (
                        <div className="p-3 bg-emerald-50 border border-emerald-200/50 rounded-xl text-center space-y-1">
                          <span className="text-[9px] font-mono text-emerald-600 font-bold uppercase tracking-wider block">Security Release Seal</span>
                          <span className="text-[10px] font-bold text-emerald-800 font-serif leading-none block">CERTIFICATE NO: JJ-2026-EXEMPT</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            if (isAnalyzingBiometrics || biometricsAuthorized) return;
                            setIsAnalyzingBiometrics(true);
                            setTimeout(() => {
                              setIsAnalyzingBiometrics(false);
                              setBiometricsAuthorized(true);
                            }, 1800);
                          }}
                          disabled={isAnalyzingBiometrics}
                          className="w-full bg-stone-900 hover:bg-[#b45309] text-white py-2.5 text-xs font-semibold rounded-xl tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer active:scale-[0.98] disabled:bg-stone-400 disabled:cursor-not-allowed"
                        >
                          {isAnalyzingBiometrics ? "Matching..." : "Authorize Registry"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>

        </div>
      </section>

      {/* Succession Continuity & Estate Protection (Premium Light Breakout Part 2) */}
      <section className="py-32 bg-[#faf9f7] text-[#1c1a17] px-6 relative z-10 border-t border-stone-200/50 font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e2db_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Editorial Narrative & Architectural Model */}
            <div className="lg:col-span-6 space-y-12">
              <ScrollReveal y={30}>
                <div className="space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b45309]">The Philosophy</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                    The Silent Vacancy
                  </h2>
                  <div className="w-16 h-0.5 bg-[#b45309]/80" />
                  <p className="text-stone-600 text-base md:text-lg leading-relaxed font-hanken">
                    The true test of a leader is not found in their presence, but in the silence of their departure. Succession planning is the architectural discipline of ensuring that a seat left vacant is a catalyst for evolution, not an invitation for entropy.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal y={30} delay={0.15}>
                <div className="relative p-6 bg-white border border-stone-200/60 rounded-3xl space-y-6 group shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.02)_0%,transparent_70%)] pointer-events-none rounded-full" />
                  
                  <div className="flex items-center gap-3 text-stone-800">
                    <div className="p-2 bg-[#b45309]/5 rounded-lg text-[#b45309]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest font-mono">Figure 1.2: Continuity Flow Model</span>
                  </div>

                  <div className="aspect-video w-full overflow-hidden rounded-2xl bg-stone-50 border border-stone-100 relative">
                    <img 
                      alt="Detailed diagram showing the strategic flow of power transition" 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 select-none" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Y_mJ-vfxVVSe-G4fhmBWEI5ndOJgaSO-zaKewDHEfSuDXi_y5_HK6UerTTGBg1abWM_B1FpTwj75zHCSncIUXcZzxLSJOfj0oCsH2p0807vgWzS9YzBSoVeyLIpGf0aaifRj0o3VirESPeII0pQ_UI47a-evK_VDlL_54LDTjhhz0ORLy96vGMOVYpYTQNVV2gj7g5nD0aTnmxeRP8r1XX-1R3mEB33KXzFyGDULnFUe-uRAbujPw2p0Tx691WokrpZYVqU1HPtA"
                    />
                  </div>
                  
                  <div className="p-4 bg-[#fbfaf8] rounded-xl text-[#b45309] font-serif text-sm italic border-l-2 border-[#b45309]">
                    "Succession is not the end of an era; it is the curation of the next."
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Premium Interactive Calculator */}
            <div className="lg:col-span-6">
              <ScrollReveal y={30} delay={0.3}>
                <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-stone-200/60 shadow-[0_15px_40px_rgba(0,0,0,0.02)] space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.01)_0%,transparent_70%)] pointer-events-none rounded-full" />
                  
                  <div className="space-y-3">
                    <span className="text-[#b45309] text-xs font-semibold tracking-widest uppercase block">Interactive Simulator</span>
                    <h3 className="text-3xl font-serif text-stone-900 font-bold">Estate Protection Analysis</h3>
                    <p className="text-stone-500 text-xs leading-relaxed font-hanken">
                      Quantify the financial exposure of leadership dependence during a non-choreographed exit.
                    </p>
                  </div>

                  <div className="w-full h-px bg-stone-100 my-2" />

                  {/* Sliders Container */}
                  <div className="space-y-10 py-4">
                    {/* Enterprise Value Slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500 font-mono">Enterprise Valuation</label>
                        <span className="font-mono text-2xl font-bold text-stone-800">${enterpriseValue.toFixed(1)}M USD</span>
                      </div>
                      <div className="relative flex items-center">
                        <input 
                          type="range" 
                          min="5" 
                          max="250" 
                          step="5"
                          value={enterpriseValue}
                          onChange={(e) => setEnterpriseValue(Number(e.target.value))}
                          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900 focus:outline-none focus:ring-1 focus:ring-[#b45309]/30"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                        <span>$5M</span>
                        <span>$125M</span>
                        <span>$250M</span>
                      </div>
                    </div>

                    {/* Transition Risk Index Slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500 font-mono">Transition Risk Index</label>
                        <span className="font-mono text-2xl font-bold text-emerald-800">{transitionRisk}%</span>
                      </div>
                      <div className="relative flex items-center">
                        <input 
                          type="range" 
                          min="10" 
                          max="100" 
                          step="5"
                          value={transitionRisk}
                          onChange={(e) => setTransitionRisk(Number(e.target.value))}
                          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-800 focus:outline-none focus:ring-1 focus:ring-[#b45309]/30"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                        <span>10% (Choreographed)</span>
                        <span>50% (Vulnerable)</span>
                        <span>100% (High Exposure)</span>
                      </div>
                    </div>
                  </div>

                  {/* Exposure Results Card */}
                  <div className="p-8 bg-[#fbfaf8] border border-stone-200/50 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-mono">Estimated Financial Exposure at Exit</span>
                    <div className="p-1 bg-amber-100 rounded-xl">
                      <div className="bg-white px-10 py-5 border border-amber-600 rounded-lg shadow-sm">
                        <span className="font-serif text-4xl md:text-5xl font-bold text-stone-900">${(enterpriseValue * (transitionRisk / 100)).toFixed(2)}M</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-500 max-w-sm leading-relaxed font-hanken">
                      This reflects the potential equity dilution, loss of key client accounts, and emergency operational cash drag triggered by a sudden leadership vacuum.
                    </p>
                  </div>

                  {/* Bottom advisory tag */}
                  <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-[10px] text-stone-400 font-mono italic">Advisory Cap: 24 Family Offices Annually</span>
                    <a 
                      href="#risk-audit"
                      className="text-xs font-bold uppercase tracking-wider text-[#b45309] hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Acknowledge & Run Diagnostic</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* SUCCESSION AUDIT TOOL (Cleaned borders completely) */}
      <section id="risk-audit" className="py-32 bg-[#12100f] text-stone-200 border-y border-stone-900/50 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <ScrollReveal>
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b45309]">Interactive Diagnosis</span>
              <h2 className="text-3xl md:text-5xl font-serif text-stone-100">
                Audit Your Enterprise Continuity
              </h2>
              <p className="text-stone-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Take this 60-second structural diagnostic to assess the operational vulnerability of your business in the event of an unplanned absence.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-[#1a1715] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl min-h-[420px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
              
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8 flex-grow"
                  >
                    {/* Header step info */}
                    <div className="flex justify-between items-center pb-4 border-b border-stone-800">
                      <span className="text-xs font-semibold text-[#b45309] uppercase tracking-widest">
                        Pillar {currentStep + 1} of 3: {auditQuestions[currentStep].title}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        {Math.round(((currentStep) / 3) * 100)}% Complete
                      </span>
                    </div>

                    {/* Question text */}
                    <h3 className="text-xl md:text-2xl font-serif text-stone-150 leading-snug">
                      "{auditQuestions[currentStep].question}"
                    </h3>

                    {/* Options list (Cleaned borders) */}
                    <div className="space-y-4 pt-2">
                      {auditQuestions[currentStep].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelect(idx)}
                          className="w-full text-left p-5 rounded-xl bg-[#181514] hover:bg-[#b45309]/10 transition-all duration-300 group flex items-start justify-between gap-4 text-stone-300 text-sm md:text-base cursor-pointer"
                        >
                          <span className="group-hover:text-stone-100 transition-colors font-serif">{opt.label}</span>
                          <span className="w-5 h-5 rounded-full border border-stone-850 flex items-center justify-center group-hover:border-[#b45309] group-hover:bg-[#b45309]/10 flex-shrink-0 transition-all">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b45309] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  // AUDIT RESULT CARD (Cleaned borders)
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8 flex-grow flex flex-col justify-between"
                  >
                    <div className="text-center space-y-4">
                      <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500 mb-2">
                        <FileText className="w-8 h-8" />
                      </div>
                      <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Your Diagnostic Result</h3>
                      
                      {/* Risk Badge */}
                      <div className={`inline-block px-6 py-2 rounded-full text-lg md:text-xl font-serif tracking-wide font-semibold ${risk.color}`}>
                        {risk.level}
                      </div>

                      {/* Score gauge */}
                      <div className="max-w-xs mx-auto pt-4">
                        <div className="flex justify-between text-xs text-stone-500 mb-1 font-mono">
                          <span>Continuity Rating</span>
                          <span>{30 - totalScore} / 30 Preparedness Index</span>
                        </div>
                        <div className="w-full h-2 bg-[#181514] rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${risk.barColor} transition-all duration-1000`} 
                            style={{ width: `${((30 - totalScore) / 30) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-[#181514] space-y-4 text-center">
                      <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                        {risk.desc}
                      </p>
                      <p className="text-amber-500 text-sm font-semibold tracking-wide">
                        {risk.action}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-stone-800">
                      <button 
                        onClick={resetAudit}
                        className="text-stone-400 hover:text-stone-200 text-xs uppercase tracking-widest transition-colors font-semibold py-3 px-6 cursor-pointer"
                      >
                        Recalculate Score
                      </button>
                      <a 
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-[#b45309] hover:bg-amber-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-xl transition-all duration-300 shadow-lg w-full sm:w-auto"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Send Score to Succession Expert</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Steps footer dots */}
              {!showResult && (
                <div className="flex justify-center gap-2 pt-8 border-t border-stone-800 mt-8">
                  {auditQuestions.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentStep ? 'w-8 bg-[#b45309]' : 'w-2 bg-stone-800'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Bio / CTA Profile Section (Maria centered crop, zero white borders) */}
      <section className="py-32 px-6 relative z-10 bg-[#faf9f7]">
        <div className="max-w-5xl mx-auto">
          
          <ScrollReveal>
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.03)] border border-stone-200/40 relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
              
              <div className="grid lg:grid-cols-12 items-stretch h-full">
                
                {/* Profile Image Area - Shifted crop of Maria to center body perfectly */}
                <div className="lg:col-span-5 relative min-h-[450px] lg:min-h-full overflow-hidden bg-stone-50">
                  <img 
                    src="/maria-lee.png" 
                    alt="Maria Lee Portrait" 
                    className="absolute inset-0 w-full h-full object-cover object-[72%_center] scale-[1.01] hover:scale-105 transition-transform duration-700 select-none opacity-90"
                  />
                  
                  {/* Active Advisory Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200/50 flex items-center gap-3 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-semibold text-stone-850 tracking-wider uppercase">Active Advisory Service</span>
                  </div>
                </div>

                {/* Profile Details Area */}
                <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-center space-y-8">
                  
                  <div className="space-y-3">
                    <span className="text-[#b45309] text-xs font-semibold tracking-[0.25em] uppercase block">
                      Legacy Strategist & Consultant
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-stone-900 font-bold leading-tight">
                      Maria Lee
                    </h2>
                    <div className="flex items-center gap-3 text-stone-500 text-sm">
                      <span className="font-semibold text-stone-700">Business Succession Specialist</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                      <span>Jazz&J Consulting</span>
                    </div>
                  </div>

                  {/* Curated Tagline Callout */}
                  <div className="p-6 rounded-2xl bg-amber-50/50 border-l-4 border-[#b45309] space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold block">Commitment Statement</span>
                    <p className="text-stone-900 font-serif italic text-lg leading-relaxed">
                      👉 Turning Your Wealth into Structured, Lasting Family Legacy
                    </p>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed font-hanken">
                    Succession planning is not merely about writing a will or purchasing structured insurance. It is a critical exercise in governance, asset shielding, and operational preservation. I consult private business owners in Malaysia to structure airtight transition pathways that protect both wealth and bloodline inheritance.
                  </p>

                  {/* Highly polished action block */}
                  <div className="space-y-4 pt-4">
                    
                    {/* Primary QR / WhatsApp Link (Pure borderless styling) */}
                    <a 
                      href="https://wa.me/60132934934?text=Hello%20Maria%2C%20I'd%20like%20to%20consult%20on%20my%20business%20succession%20strategy." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all duration-300 text-stone-900 p-5 rounded-xl border border-[#25D366]/20 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 text-[#25D366]" />
                        <span className="font-semibold text-sm">Direct Succession Consultation</span>
                      </div>
                      <span className="text-xs text-stone-500 font-mono group-hover:text-stone-700 transition-colors">+6013-293 4934</span>
                    </a>

                    {/* Email and LinkedIn Grid (Clean borderless) */}
                    <div className="grid grid-cols-2 gap-4">
                      <a 
                        href="mailto:marialee08@live.com"
                        className="flex flex-col items-center justify-center p-5 rounded-xl bg-[#fbfaf8] hover:bg-stone-100 transition-colors gap-2 border border-stone-200/50 shadow-sm"
                      >
                        <Mail className="w-5 h-5 text-stone-500" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-stone-700">Email advisory</span>
                      </a>
                      <a 
                        href="https://linkedin.com/in/maria-lee" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-5 rounded-xl bg-[#fbfaf8] hover:bg-stone-100 transition-colors gap-2 border border-stone-200/50 shadow-sm"
                      >
                        <Linkedin className="w-5 h-5 text-blue-600 fill-blue-600/10" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-stone-700">LinkedIn Connect</span>
                      </a>
                    </div>

                  </div>
                  
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Dynamic SVG Succession Architecture Modal */}
      <AnimatePresence>
        {showArchitectureModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md"
            onClick={() => setShowArchitectureModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-8 md:p-10 shadow-2xl border border-stone-200/50 space-y-6 relative overflow-hidden text-stone-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.03)_0%,transparent_70%)] pointer-events-none rounded-full" />
              
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[#b45309] text-xs font-semibold tracking-widest uppercase font-mono">blueprint view</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">Succession Trust & Wealth Isolation</h3>
                </div>
                <button 
                  onClick={() => setShowArchitectureModal(false)}
                  className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-700 hover:border-stone-400 transition-colors cursor-pointer text-sm font-semibold"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 bg-[#fbfaf8] border border-stone-200/40 rounded-2xl relative overflow-hidden">
                <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block mb-4">Isolated Structural Schema</span>
                
                {/* SVG Flowchart Diagram */}
                <svg className="w-full h-auto min-h-[220px]" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="modal-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="600" height="240" fill="url(#modal-grid)" rx="10" />

                  {/* Node 1: Founder (Left) */}
                  <rect x="30" y="90" width="120" height="60" rx="8" fill="white" stroke="#1c1a17" strokeWidth="1.5" className="shadow-sm" />
                  <text x="90" y="120" textAnchor="middle" fill="#1c1a17" fontSize="11" fontWeight="bold" fontFamily="sans-serif">FOUNDER</text>
                  <text x="90" y="135" textAnchor="middle" fill="#78716c" fontSize="9" fontFamily="sans-serif">Economic Control Only</text>

                  {/* Flow Arrow 1 */}
                  <path d="M 150 120 L 210 120" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 3" />
                  <polygon points="210,120 203,116 203,124" fill="#b45309" />
                  <text x="180" y="110" textAnchor="middle" fill="#b45309" fontSize="8" fontWeight="bold" fontFamily="sans-serif">ISOLATION</text>

                  {/* Node 2: Discretionary Trust Wrapper (Center) */}
                  <rect x="210" y="55" width="180" height="130" rx="12" fill="white" stroke="#b45309" strokeWidth="2" className="shadow-md" />
                  <text x="300" y="85" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="bold" fontFamily="sans-serif">DISCRETIONARY TRUST</text>
                  <text x="300" y="105" textAnchor="middle" fill="#1c1a17" fontSize="10" fontWeight="bold" fontFamily="sans-serif">LEGACY SHIELD</text>
                  
                  {/* Internal boxes inside trust */}
                  <rect x="225" y="120" width="70" height="50" rx="6" fill="#f5f3ef" stroke="rgba(0,0,0,0.06)" />
                  <text x="260" y="140" textAnchor="middle" fill="#44403c" fontSize="8" fontWeight="bold">Trustee Board</text>
                  <text x="260" y="152" textAnchor="middle" fill="#78716c" fontSize="7">Governs Transfers</text>

                  <rect x="305" y="120" width="70" height="50" rx="6" fill="#f5f3ef" stroke="rgba(0,0,0,0.06)" />
                  <text x="340" y="140" textAnchor="middle" fill="#44403c" fontSize="8" fontWeight="bold">Beneficiaries</text>
                  <text x="340" y="152" textAnchor="middle" fill="#78716c" fontSize="7">Family Inheritance</text>

                  {/* Flow Arrow 2 */}
                  <path d="M 390 100 L 450 70" stroke="#1c1a17" strokeWidth="1.5" />
                  <polygon points="450,70 441,71 445,78" fill="#1c1a17" />
                  <text x="420" y="77" textAnchor="middle" fill="#44403c" fontSize="8" fontFamily="sans-serif">Shares</text>

                  {/* Flow Arrow 3 */}
                  <path d="M 390 140 L 450 170" stroke="#047857" strokeWidth="1.5" />
                  <polygon points="450,170 445,162 441,169" fill="#047857" />
                  <text x="420" y="167" textAnchor="middle" fill="#047857" fontSize="8" fontFamily="sans-serif">Protected Reserves</text>

                  {/* Node 3: Operating Enterprise */}
                  <rect x="450" y="40" width="120" height="60" rx="8" fill="white" stroke="#1c1a17" strokeWidth="1.5" />
                  <text x="510" y="70" textAnchor="middle" fill="#1c1a17" fontSize="11" fontWeight="bold" fontFamily="sans-serif">OPERATING CO.</text>
                  <text x="510" y="85" textAnchor="middle" fill="#78716c" fontSize="9" fontFamily="sans-serif">De-risked Signatories</text>

                  {/* Node 4: Safe Wealth Vault */}
                  <rect x="450" y="140" width="120" height="60" rx="8" fill="#ecfdf5" stroke="#047857" strokeWidth="1.5" />
                  <text x="510" y="170" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold" fontFamily="sans-serif">SAFE VAULT</text>
                  <text x="510" y="185" textAnchor="middle" fill="#065f46" fontSize="9" fontFamily="sans-serif">Creditor Protected</text>
                </svg>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">Structural Key takeaways</span>
                <ul className="text-xs text-stone-600 space-y-2 list-disc pl-4 font-hanken leading-relaxed">
                  <li><strong>Complete Separation:</strong> Company creditors can only pursue operating company assets; family real estate and trust reserves remain fully separated and out of reach.</li>
                  <li><strong>Probate Bypass:</strong> Because trust shares bypass administrative hold upon a trigger event, no probate frozen blocks occur, allowing operating signatories to run seamlessly.</li>
                  <li><strong>Tax Gains:</strong> Excluded holdings bypass inheritance tax brackets.</li>
                </ul>
              </div>


              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400 font-mono">Ref: SU-991-SHIELD</span>
                <button 
                  onClick={() => setShowArchitectureModal(false)}
                  className="bg-stone-900 hover:bg-[#b45309] text-white px-5 py-2 font-semibold uppercase tracking-wider text-[10px] rounded-lg transition-all duration-300 shadow-md cursor-pointer active:scale-95"
                >
                  Acknowledge Architecture
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Footer */}
      <footer className="border-t border-stone-200 bg-[#faf9f7] py-12 text-center text-stone-500 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif tracking-widest text-stone-500 uppercase">
            Jazz&J Consulting
          </span>
          <p>© {new Date().getFullYear()} Jazz&J Consulting. All rights reserved. Professional succession and estate advisory services.</p>
          <div className="flex gap-4 text-stone-500">
            <span className="hover:text-[#b45309] transition-colors cursor-pointer">Terms of Trust</span>
            <span>·</span>
            <span className="hover:text-[#b45309] transition-colors cursor-pointer">Estate Advisory Rules</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
