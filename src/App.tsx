import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  Wrench, 
  Car, 
  Camera, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  ArrowRight,
  Zap,
  Award,
  Users
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';

// --- Types & Schemas ---

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  vehicle: z.string().min(2, "Vehicle info required"),
  message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-brand-dark/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
            <Zap className="text-white fill-current" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">
            Smart<span className="text-brand-blue">Auto</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#services" className="hover:text-brand-blue transition-colors">Services</a>
          <a href="#why-us" className="hover:text-brand-blue transition-colors">Why Us</a>
          <a href="#process" className="hover:text-brand-blue transition-colors">Process</a>
          <a href="#estimate" className="btn-primary py-2 px-6 text-xs">Get Estimate</a>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Services</a>
            <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Why Us</a>
            <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Process</a>
            <a href="#estimate" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary">Get Free Estimate</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Auto Shop"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-blue/20 text-brand-blue px-4 py-1 rounded-full text-sm font-bold mb-6 border border-brand-blue/30">
            <MapPin size={14} /> San Diego's #1 Rated Auto Shop
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tighter uppercase italic">
            San Diego’s Trusted <br />
            <span className="text-brand-blue">Auto Repair & Collision</span> Experts
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-lg">
            Fast, affordable, and done right the first time. From minor dents to major collision repair, we get you back on the road safely.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#estimate" className="btn-primary flex items-center justify-center gap-2">
              Get Free Estimate <ArrowRight size={20} />
            </a>
            <a href="tel:6195550123" className="btn-secondary flex items-center justify-center gap-2">
              <Phone size={20} /> Call Now (619) 555-0123
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <ShieldCheck className="text-brand-blue" />, label: "All Insurance Accepted" },
              { icon: <Award className="text-brand-blue" />, label: "Lifetime Warranty" },
              { icon: <Car className="text-brand-blue" />, label: "All Makes & Models" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                {item.icon}
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=1000" 
              alt="Car Detailing"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Stats */}
          <div className="absolute -bottom-6 -left-6 glass-card p-6 flex items-center gap-4 z-20">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-black">15,000+</div>
              <div className="text-xs text-gray-400 uppercase font-bold tracking-widest">Cars Repaired</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const testimonials = [
    {
      name: "Michael R.",
      text: "Fast service and fair pricing. They handled my insurance claim perfectly after a fender bender. Highly recommend!",
      rating: 5
    },
    {
      name: "Sarah L.",
      text: "The detailing work is incredible. My car looks brand new. The staff is professional and very transparent about costs.",
      rating: 5
    },
    {
      name: "David K.",
      text: "Best body shop in San Diego. Quality work and they finished ahead of schedule. Truly impressed with the results.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-brand-gray/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">
              Trusted by <span className="text-brand-blue">Thousands</span> in San Diego
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <span className="text-xl font-bold">Rated 4.8+ by San Diego customers</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  className="w-12 h-12 rounded-full border-4 border-brand-dark"
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Join our happy <br /> community
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-8"
            >
              <div className="flex text-yellow-500 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 italic mb-6">"{t.text}"</p>
              <div className="font-bold uppercase tracking-widest text-brand-blue">— {t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Collision Repair",
      desc: "Expert structural and body repair to factory standards after an accident.",
      icon: <ShieldCheck size={32} />,
      img: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Auto Body Work",
      desc: "Precision body work for all makes and models, from minor dings to major panels.",
      icon: <Wrench size={32} />,
      img: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Dent Removal",
      desc: "Paintless dent repair and traditional methods to restore your car's smooth finish.",
      icon: <Zap size={32} />,
      img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Paint Services",
      desc: "Computerized color matching and premium finishes for a flawless look.",
      icon: <Award size={32} />,
      img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Auto Detailing",
      desc: "Deep cleaning and protection to make your vehicle look and feel brand new.",
      icon: <Star size={32} />,
      img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Vinyl Wraps",
      desc: "Customization and protection with high-quality vinyl wraps and finishes.",
      icon: <Car size={32} />,
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
            Our <span className="text-brand-blue">Premium</span> Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We provide a full range of automotive services to keep your vehicle performing and looking its absolute best.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-brand-gray/50"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={s.img} 
                  alt={s.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="w-14 h-14 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight">{s.title}</h3>
                <p className="text-gray-400 mb-6">{s.desc}</p>
                <a href="#estimate" className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      title: "Fast Turnaround Times",
      desc: "We know you need your car back. Our streamlined process ensures minimal downtime.",
      icon: <Clock className="text-brand-blue" />
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden fees. You get a detailed estimate before any work begins.",
      icon: <Zap className="text-brand-blue" />
    },
    {
      title: "Insurance Claim Assistance",
      desc: "We work directly with all major insurance companies to handle the paperwork for you.",
      icon: <ShieldCheck className="text-brand-blue" />
    },
    {
      title: "Experienced Technicians",
      desc: "Our team is ASE certified with decades of combined experience in high-end repairs.",
      icon: <Users className="text-brand-blue" />
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-brand-blue/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <Zap className="w-full h-full text-brand-blue" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8">
            Why San Diego <br />
            <span className="text-brand-blue">Chooses Us</span>
          </h2>
          <div className="space-y-8">
            {features.map((f, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 glass-card flex items-center justify-center">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{f.title}</h3>
                  <p className="text-gray-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-square lg:aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000" 
              alt="Mechanic at work"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-6 -right-6 glass-card p-8 z-10 max-w-xs">
            <div className="text-brand-blue font-black text-4xl mb-2">100%</div>
            <div className="text-sm font-bold uppercase tracking-widest">Satisfaction Guarantee on all repairs</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      title: "Get a Free Estimate",
      desc: "Upload a photo or bring your car in for a fast, accurate quote.",
      icon: "01"
    },
    {
      title: "We Repair Your Vehicle",
      desc: "Our experts use premium parts and precision tools to restore your car.",
      icon: "02"
    },
    {
      title: "Drive Away Like New",
      desc: "Pick up your vehicle and enjoy our lifetime warranty on all work.",
      icon: "03"
    }
  ];

  return (
    <section id="process" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
            Our <span className="text-brand-blue">Simple</span> Process
          </h2>
          <p className="text-gray-400">Restoring your vehicle shouldn't be a headache. We make it easy.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-brand-blue/20 -z-10" />
          
          {steps.map((s, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 bg-brand-dark border-4 border-brand-blue rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-black italic group-hover:bg-brand-blue transition-colors">
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LeadCapture = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema)
  });

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3.1-pro-preview",
          contents: {
            parts: [
              { text: "You are an expert auto collision estimator. Analyze this car damage and provide a brief, professional summary of what might be needed for repair. Be helpful but remind the user this is an AI estimate and a physical inspection is required." },
              { inlineData: { data: base64Data, mimeType: file.type } }
            ]
          }
        });
        
        setAnalysisResult(response.text || "Could not analyze image.");
        setIsAnalyzing(false);
      };
    } catch (error) {
      console.error("AI Analysis failed:", error);
      setAnalysisResult("Analysis failed. Please try again or just submit the form.");
      setIsAnalyzing(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      analyzeImage(file);
    }
  };

  const onSubmit = (data: LeadFormValues) => {
    console.log("Form submitted:", data, analysisResult);
    setIsSubmitted(true);
  };

  return (
    <section id="estimate" className="py-24 bg-brand-gray/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="glass-card overflow-hidden grid md:grid-cols-2">
          <div className="p-8 md:p-12 bg-brand-blue/10">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-6">
              Get Your <span className="text-brand-blue">Free</span> Estimate
            </h2>
            <p className="text-gray-300 mb-8">
              Fill out the form below and our team will get back to you within 24 hours. Upload a photo for an instant AI-powered initial assessment!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-blue/20 rounded-lg flex items-center justify-center text-brand-blue">
                  <Clock size={20} />
                </div>
                <span className="font-bold uppercase tracking-widest text-sm">Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-blue/20 rounded-lg flex items-center justify-center text-brand-blue">
                  <ShieldCheck size={20} />
                </div>
                <span className="font-bold uppercase tracking-widest text-sm">100% Private & Secure</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 border-l border-white/10">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Request Received!</h3>
                <p className="text-gray-400">Thank you for reaching out. A specialist will contact you shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-brand-blue font-bold uppercase tracking-widest text-sm"
                >
                  Send Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      {...register("name")}
                      placeholder="Full Name"
                      className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 focus:border-brand-blue outline-none transition-colors"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input 
                      {...register("phone")}
                      placeholder="Phone Number"
                      className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 focus:border-brand-blue outline-none transition-colors"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                
                <input 
                  {...register("email")}
                  placeholder="Email Address"
                  className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 focus:border-brand-blue outline-none transition-colors"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

                <input 
                  {...register("vehicle")}
                  placeholder="Vehicle Make & Model (e.g. 2022 Tesla Model 3)"
                  className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 focus:border-brand-blue outline-none transition-colors"
                />
                {errors.vehicle && <p className="text-red-500 text-xs mt-1">{errors.vehicle.message}</p>}

                <textarea 
                  {...register("message")}
                  placeholder="Tell us about the damage or service needed..."
                  rows={3}
                  className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 focus:border-brand-blue outline-none transition-colors"
                />

                {/* AI Image Upload */}
                <div className="mt-6">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Optional: Upload Photo for AI Damage Assessment
                  </label>
                  <div className="relative border-2 border-dashed border-white/10 rounded-xl p-4 text-center hover:border-brand-blue transition-colors cursor-pointer group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={onFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {previewUrl ? (
                      <div className="flex items-center gap-4">
                        <img src={previewUrl} className="w-16 h-16 object-cover rounded-lg" alt="Preview" />
                        <div className="text-left">
                          <p className="text-sm font-bold">Photo Attached</p>
                          <p className="text-xs text-gray-500">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Camera className="text-gray-500 group-hover:text-brand-blue transition-colors" />
                        <span className="text-sm text-gray-400">Click or drag photo here</span>
                      </div>
                    )}
                  </div>
                </div>

                {isAnalyzing && (
                  <div className="flex items-center gap-3 text-brand-blue text-sm font-bold animate-pulse">
                    <Zap size={16} /> AI is analyzing damage...
                  </div>
                )}

                {analysisResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-lg text-xs text-gray-300"
                  >
                    <div className="font-bold text-brand-blue uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Zap size={12} /> AI Preliminary Assessment:
                    </div>
                    {analysisResult}
                  </motion.div>
                )}

                <button type="submit" className="btn-primary w-full mt-4">
                  Submit Quote Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const LocationContact = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8">
            Visit Our <span className="text-brand-blue">San Diego</span> Facility
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-1">Address</h3>
                <p className="text-gray-400">1234 Auto Drive, San Diego, CA 92101</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-1">Phone</h3>
                <p className="text-gray-400">(619) 555-0123</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-1">Business Hours</h3>
                <p className="text-gray-400">Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-400">Sat: 9:00 AM - 2:00 PM</p>
                <p className="text-gray-400">Sun: Closed</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <a href="https://goo.gl/maps" target="_blank" rel="noopener noreferrer" className="btn-primary py-3">
              Get Directions
            </a>
            <a href="tel:6195550123" className="btn-secondary py-3">
              Call Now
            </a>
          </div>
        </div>

        <div className="h-[400px] lg:h-auto rounded-3xl overflow-hidden border border-white/10 grayscale contrast-125 opacity-80">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107321.439535314!2d-117.2346901!3d32.8245525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9545658332d31%3A0x2132cf0c799a5d56!2sSan%20Diego%2C%20CA!5e0!3m2!1sen!2sus!4v1711929600000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-24 bg-brand-blue relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
          Ready to Get Your Car <br /> Looking Brand New?
        </h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Don't wait. Join thousands of satisfied San Diego drivers who trust Smart Auto Services for all their automotive needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="#estimate" className="bg-white text-brand-blue hover:bg-gray-100 font-black py-5 px-10 rounded-xl transition-all transform active:scale-95 uppercase tracking-widest shadow-xl">
            Get Free Estimate
          </a>
          <a href="tel:6195550123" className="bg-brand-dark text-white hover:bg-black font-black py-5 px-10 rounded-xl transition-all transform active:scale-95 uppercase tracking-widest border border-white/10 shadow-xl flex items-center justify-center gap-2">
            <Phone size={20} /> Call Now
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
            <Zap className="text-white fill-current" size={18} />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase italic">
            Smart<span className="text-brand-blue">Auto</span>
          </span>
        </div>
        
        <div className="text-sm text-gray-500 font-medium uppercase tracking-widest">
          © 2026 Smart Auto Services San Diego. All Rights Reserved.
        </div>

        <div className="flex gap-6 text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

const StickyCall = () => {
  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
      <a 
        href="tel:6195550123" 
        className="btn-primary w-full flex items-center justify-center gap-3 shadow-2xl py-5"
      >
        <Phone size={24} /> Call Now for Estimate
      </a>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-blue selection:text-white">
      <Navbar />
      <Hero />
      <SocialProof />
      <Services />
      <WhyChooseUs />
      <Process />
      <LeadCapture />
      <LocationContact />
      <FinalCTA />
      <Footer />
      <StickyCall />
    </div>
  );
}
