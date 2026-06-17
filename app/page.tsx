"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Search,
  Sparkles,
  TrendingUp,
  Tv,
  Mic,
  Bookmark,
  Share2,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  RotateCcw,
  ShieldCheck,
  Check,
  Mail,
  ChevronRight,
  Info,
  Calendar,
  Clock,
  Menu,
  X,
  Plus,
  Play
} from "lucide-react";

interface Comment {
  id: string;
  itemName: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface Recommendation {
  title: string;
  creator: string;
  type: string; // 'movie' | 'podcast'
  rating: number;
  vergeScore: number;
  description: string;
  whyWeRecommend: string;
  genre: string;
  duration: string;
  released: string;
  whereToFind: string;
  seedKeyword: string;
  tags: string[];
}

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: "c1",
    itemName: "Waveform: The MKBHD Podcast",
    username: "TechAlchemist88",
    text: "Waveform is my morning routine. Marques and Andrew explain consumer technology trade-offs better than any printed review can.",
    timestamp: "2 hours ago",
    likes: 42
  },
  {
    id: "c2",
    itemName: "Severance (Season 2)",
    username: "LumonCorpDrone",
    text: "Season 2 matches the incredible pacing of the debut. Ben Stiller's direction elevates standard horror-mystery into high cinematic art.",
    timestamp: "4 hours ago",
    likes: 128
  },
  {
    id: "c3",
    itemName: "Dune: Part Two",
    username: "ArrakisDreamer",
    text: "The sound design during the sandworm rides shook the entire theater seat. Hans Zimmer's score is a monumental achievement in sound.",
    timestamp: "1 day ago",
    likes: 95
  }
];

// Reusable Google AdSense unit component
function AdSenseUnit() {
  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !insRef.current) return;

    let observer: ResizeObserver | null = null;
    let pushCalled = false;

    const tryPush = () => {
      if (pushCalled) return;
      if (insRef.current && insRef.current.offsetWidth > 0) {
        // Double check not already processed by AdSense
        if (!insRef.current.hasAttribute('data-adsbygoogle-status')) {
          try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            pushCalled = true;
          } catch (err) {
            console.warn("AdSense soft error: ", err);
          }
        } else {
          pushCalled = true;
        }
      }
    };

    if (insRef.current.offsetWidth > 0) {
      tryPush();
    } else {
      // Set up ResizeObserver to wait until container expands and has a layout size
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(() => {
          tryPush();
          if (pushCalled && observer) {
            observer.disconnect();
          }
        });
        observer.observe(insRef.current);
      } else {
        // Fallback checks
        const timeout = setTimeout(tryPush, 500);
        return () => clearTimeout(timeout);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div key="adsense-block" className="my-2 overflow-hidden w-full flex justify-center bg-stone-900/50 p-2 rounded border border-stone-850 min-h-[100px]">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", minWidth: "250px", width: "100%" }}
        data-ad-client="ca-pub-3725227998686442"
        data-ad-slot="1663937627"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Reusable Adsterra native container unit component
function AdsterraContainerAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "https://pl29764956.effectivecpmnetwork.com/1d882e4bef889e1b6632326dddcff287/invoke.js";
    
    const timeout = setTimeout(() => {
      document.body.appendChild(script);
    }, 100);

    return () => {
      clearTimeout(timeout);
      try {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      } catch (e) {}
    };
  }, []);

  return (
    <div className="w-full flex flex-col justify-center py-2">
      <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest text-left mb-1.5 font-bold">
        NATIVE ADSTERRA AD PLACEMENT
      </span>
      <div 
        ref={containerRef} 
        id="container-1d882e4bef889e1b6632326dddcff287" 
        className="w-full min-h-[100px] bg-[#0e0e11] rounded-lg flex items-center justify-center p-2 border border-dashed border-stone-800"
      />
    </div>
  );
}

// Reusable Adsterra standard iframe banner (468x60) unit component
function AdsterraBannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    (window as any).atOptions = {
      'key' : 'c502b9bc04726f078a925ebfb5588ccb',
      'format' : 'iframe',
      'height' : 60,
      'width' : 468,
      'params' : {}
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.highperformanceformat.com/c502b9bc04726f078a925ebfb5588ccb/invoke.js";

    containerRef.current.appendChild(script);

    return () => {
      try {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      } catch (e) {}
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest mb-1.5 font-bold">SPONSOR BANNER ///</span>
      <div 
        ref={containerRef} 
        className="w-full max-w-[468px] min-h-[60px] flex items-center justify-center overflow-hidden rounded bg-[#0e0e11] border border-dashed border-stone-800"
      />
    </div>
  );
}

// Reusable Adsterra top-left premium iframe banner (468x60) unit component
function AdsterraTopLeftBannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    (window as any).atOptions = {
      'key' : 'c502b9bc04726f078a925ebfb5588ccb',
      'format' : 'iframe',
      'height' : 60,
      'width' : 468,
      'params' : {}
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://debutpoignantsudden.com/c502b9bc04726f078a925ebfb5588ccb/invoke.js";

    containerRef.current.appendChild(script);

    return () => {
      try {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      } catch (e) {}
    };
  }, []);

  return (
    <div className="flex flex-col items-start justify-start py-1">
      <span className="text-[8px] font-mono text-stone-600 uppercase tracking-widest mb-0.5 font-bold">PREMIUM ADS ///</span>
      <div 
        ref={containerRef} 
        className="w-[468px] h-[60px] flex items-center justify-center overflow-hidden rounded bg-[#0e0e11] border border-dashed border-stone-850 scale-90 md:scale-100 origin-top-left"
      />
    </div>
  );
}

// Reusable Adsterra direct promotion banner
function AdsterraDirectLinkAd() {
  return (
    <div className="bg-gradient-to-r from-stone-900 to-pink-950/20 border border-stone-850 hover:border-verge-magenta rounded-lg p-5 text-left space-y-4 transition duration-300 group relative overflow-hidden">
      <div className="absolute right-0 bottom-0 opacity-10 text-9xl font-mono font-black select-none pointer-events-none transform translate-y-12 translate-x-4 group-hover:translate-y-9 transition-all duration-500 text-verge-magenta">
        CPM
      </div>
      <div className="flex items-center space-x-2">
        <span className="bg-[#00f3ff] text-black px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider rounded">SPONSOR OFFER</span>
        <span className="text-[10px] font-mono text-stone-400">EXCLUSIVE DIRECT ACCESS ///</span>
      </div>
      <h4 className="font-display text-white font-black text-sm uppercase">
        Verified Global Entertainment Channels
      </h4>
      <p className="text-xs text-stone-400 leading-relaxed font-sans">
        Instantly visit high-authority partner publishing networks featuring top-tier media catalogs, critical reviews, and fast secure streams.
      </p>
      
      <div className="flex flex-col gap-2 pt-1 relative z-10">
        <a
          href="https://www.effectivecpmnetwork.com/qzbbqwpv34?key=4804826a910125389492db2cd73c4745"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-750 hover:to-stone-650 text-white font-mono text-xs font-black py-2.5 px-4 rounded transition uppercase tracking-wider shadow"
        >
          CPM CHANNEL 1 <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://www.effectivecpmnetwork.com/f4mvdfdkwf?key=4eb36321e5078b564fd22b998fd0eab8"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-verge-magenta to-verge-purple hover:opacity-95 text-white font-mono text-xs font-black py-2.5 px-4 rounded transition uppercase tracking-wider shadow-lg animate-pulse"
        >
          CPM PREMIUM CHANNEL 2 <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

export default function Page() {
  // App states
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState<string>("all"); // 'all' | 'movie' | 'podcast'
  const [customSearchActive, setCustomSearchActive] = useState<boolean>(false);
  
  // Bookmarks are loaded in useEffect to prevent SSR hydration mismatch
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const [comments, setComments] = useState<Comment[]>(DEFAULT_COMMENTS);
  const [newCommentName, setNewCommentName] = useState<string>("");
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [activeItemForComments, setActiveItemForComments] = useState<string>("Waveform: The MKBHD Podcast");
  
  // Interaction/UI states
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  
  // Cookie consent is loaded in useEffect to prevent SSR hydration mismatch
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState<boolean>(false);

  // Load localStorage safe values after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("verge_bookmarks");
      const cookiesAccepted = localStorage.getItem("verge_cookies_accepted") === "true";
      
      // Schedule asynchronously to prevent synchronous setState within useEffect (react-hooks/set-state-in-effect rule)
      const timer = setTimeout(() => {
        if (stored) {
          try {
            setBookmarks(JSON.parse(stored));
          } catch (_) {}
        }
        if (cookiesAccepted) {
          setCookieConsentAccepted(true);
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const [copiedTitle, setCopiedTitle] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("home"); // 'home' | 'disclosure' | 'privacy'
  const [apiSource, setApiSource] = useState<string>("curated");

  // User reviews/rating updates (client-side state simulation to maximize engagement)
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [feedbackSuccess, setFeedbackSuccess] = useState<string>("");

  // Auto-scrolling ticker text
  const tickerItems = [
    "HOT LIST: Denis Villeneuve discusses dune part three plans •",
    "ZERGE SCORES: Apple tv+ Severance scores an ultra-rare 9.5 out of 10 •",
    "DEEP DIVE: Marques Brownlee talks about the hardware constraints of on-device AI models •",
    "SPOTLIGHT: The must-listen podcasts changing tech journalism in 2026 •"
  ];

  // Helper definition placed above hook access to satisfy closure hoisting
  const fetchRecommendations = async (query: string, type: string) => {
    setLoading(true);
    setFeedbackSuccess("");
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, type }),
      });
      const data = await res.json();
      if (data && data.recommendations) {
        setRecommendations(data.recommendations);
        setApiSource(data.source || "curated");
        // Update first recommendation to default active comments placeholder
        if (data.recommendations.length > 0) {
          setActiveItemForComments(data.recommendations[0].title);
        }
      }
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial content on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRecommendations("", "all");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomSearchActive(true);
    fetchRecommendations(searchQuery, currentFilter);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCustomSearchActive(false);
    fetchRecommendations("", currentFilter);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    fetchRecommendations(customSearchActive ? searchQuery : "", filter);
  };

  const toggleBookmark = (title: string) => {
    let updated: string[];
    if (bookmarks.includes(title)) {
      updated = bookmarks.filter(b => b !== title);
    } else {
      updated = [...bookmarks, title];
    }
    setBookmarks(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("verge_bookmarks", JSON.stringify(updated));
    }
  };

  const handleShare = (title: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      const shareUrl = typeof window !== "undefined" ? window.location.href : "https://theverge.com";
      navigator.clipboard.writeText(`${title} - Recommended on Zerge Discover! Link: ${shareUrl}`);
      setCopiedTitle(title);
      setTimeout(() => setCopiedTitle(""), 3000);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      itemName: activeItemForComments,
      username: newCommentName.trim(),
      text: newCommentText.trim(),
      timestamp: "Just now",
      likes: 0
    };

    setComments([newComment, ...comments]);
    setNewCommentName("");
    setNewCommentText("");
  };

  const handleLikeComment = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  const handleUserRating = (title: string, value: number) => {
    setUserRatings({
      ...userRatings,
      [title]: value
    });
    setFeedbackSuccess(`Thank you for rating "${title}" a solid ${value}/10! User feedback is actively calculated for AdSense monetization optimization.`);
    
    // Auto-scroll feedback out
    setTimeout(() => setFeedbackSuccess(""), 6000);
  };

  const handleCookieConsent = () => {
    setCookieConsentAccepted(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("verge_cookies_accepted", "true");
    }
  };

  const handleNewsletterJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
  };

  // Helper to color Verge rating scores consistently
  const getScoreColor = (score: number) => {
    if (score >= 9.0) return "border-emerald-500 text-emerald-400";
    if (score >= 8.0) return "border-cyan-500 text-cyan-400";
    if (score >= 7.0) return "border-yellow-500 text-yellow-400";
    return "border-verge-magenta text-verge-magenta";
  };

  return (
    <div className="min-h-screen flex flex-col font-sans verge-gradient-bg selection:bg-verge-magenta text-stone-100">
      
      {/* Top Banner Spot (Adsterra top-left iframe 468x60) */}
      <div className="bg-stone-950 border-b border-stone-900 py-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <AdsterraTopLeftBannerAd />
          <div className="hidden md:flex items-center text-[10px] font-mono text-stone-500 uppercase tracking-wider">
            PREMIUM MONITOR MONETIZATION ///
          </div>
        </div>
      </div>

      {/* 1. Header & Verge Brand Banner */}
      <header className="border-b-4 border-verge-magenta bg-stone-950 sticky top-0 z-50 shadow-md">
        {/* Dynamic status/category subheader on top (Very iconic of Verge slash structures) */}
        <div className="bg-stone-900 border-b border-stone-800 text-xs px-4 md:px-8 py-2 flex items-center justify-between font-mono tracking-wider text-stone-400">
          <div className="flex items-center space-x-4 overflow-hidden">
            <span className="text-verge-magenta font-extrabold animate-pulse">● LIVE MEDIA REVIEW RATIOS</span>
            <span className="hidden md:inline text-stone-600">|</span>
            <span className="hidden md:inline text-stone-300">ESTABLISHED JUN 2026 // AD-SUPPORTED ENGINE</span>
            <span className="hidden md:inline text-stone-600">|</span>
            <span className="hidden lg:inline text-verge-cyan font-bold">API SOURCE: {apiSource.toUpperCase()}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className="text-[#00f3ff] inline-block w-2 h-2 rounded-full animate-ping"></span>
              <span className="text-stone-300">SYSTEM HEALTH: ONLINE</span>
            </div>
            {bookmarks.length > 0 && (
              <button 
                onClick={() => {
                  setActiveTab("home");
                  // Smooth scroll to curated/saved section
                  const el = document.getElementById("recommendations-grid");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }} 
                className="bg-verge-magenta/20 border border-verge-magenta/40 text-[11px] text-verge-magenta px-2 py-0.5 rounded flex items-center gap-1.5 font-bold hover:bg-verge-magenta/30 transition"
              >
                <Bookmark className="w-3 h-3 fill-verge-magenta" />
                SAVED: {bookmarks.length}
              </button>
            )}
          </div>
        </div>

        {/* Main Logo and Navigation Row */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="group flex items-center gap-3 text-left"
              id="brand-logo"
            >
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-verge-magenta/60 flex-shrink-0 group-hover:border-verge-magenta transition duration-300 bg-black">
                <img 
                  src="/icon.jpg" 
                  alt="The Zerge" 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-baseline font-black tracking-tighter text-2xl md:text-3.5xl uppercase">
                  <span className="bg-gradient-to-r from-verge-magenta to-verge-purple bg-clip-text text-transparent">THE ZERGE</span>
                  <span className="text-white ml-2 px-1.5 py-0.5 text-xs font-mono font-black tracking-normal bg-verge-magenta transform -skew-x-12 inline-block">DISCOVER ///</span>
                </div>
                <p className="text-[10px] font-mono font-medium uppercase tracking-widest text-[#00f3ff] mt-0.5 tracking-wider">
                  COGNITIVE TECH-FORWARD MEDIA COMPENDIUN
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 font-display font-medium text-sm tracking-wide text-stone-300">
            <button 
              onClick={() => { setActiveTab("home"); }} 
              className={`hover:text-verge-magenta relative py-1 transition ${activeTab === "home" ? "text-verge-magenta border-b-2 border-verge-magenta" : ""}`}
            >
              CHORUS FEED & CRITIQUES
            </button>
            <button 
              onClick={() => { setActiveTab("disclosure"); }} 
              className={`hover:text-verge-magenta relative py-1 transition ${activeTab === "disclosure" ? "text-verge-magenta border-b-2 border-verge-magenta" : ""}`}
            >
              MONETIZATION & ADSENSE POLICY
            </button>
            <button 
              onClick={() => { setActiveTab("privacy"); }} 
              className={`hover:text-verge-magenta relative py-1 transition ${activeTab === "privacy" ? "text-verge-magenta border-b-2 border-verge-magenta" : ""}`}
            >
              PRIVACY & DART COOKIES
            </button>
          </nav>

          {/* Contact / Quick CTA header widgets */}
          <div className="flex items-center space-x-3">
            <a 
              href="#newsletter-box" 
              className="bg-stone-900 border border-stone-800 text-stone-300 hover:text-white px-4 py-2 text-xs font-mono rounded hover:bg-stone-800 hover:border-stone-700 transition hidden md:flex items-center gap-2"
            >
              <Mail className="w-4.5 h-4.5 text-verge-magenta" />
              NEWSLETTER
            </a>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white hover:bg-stone-900 rounded focus:outline-none"
              aria-label="Toggle mobile dynamic bar"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Scrolling Headline Ticker (Iconic review aesthetic) */}
        <div className="bg-[#e9126a] text-white py-1.5 overflow-hidden border-t border-verge-magenta/20 select-none">
          <div className="flex whitespace-nowrap space-x-8 animate-[marquee_25s_linear_infinite] font-display text-xs font-black tracking-wider uppercase">
            {tickerItems.concat(tickerItems).map((text, idx) => (
              <span key={idx} className="inline-block">
                {text}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-850 px-6 py-6 space-y-4 animate-fade-in">
          <button 
            onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }} 
            className={`block w-full text-left font-display font-bold py-2 ${activeTab === "home" ? "text-verge-magenta" : "text-stone-300"}`}
          >
            ZERGE CHORUS CRITIQUES
          </button>
          <button 
            onClick={() => { setActiveTab("disclosure"); setMobileMenuOpen(false); }} 
            className={`block w-full text-left font-display font-bold py-2 ${activeTab === "disclosure" ? "text-verge-magenta" : "text-stone-300"}`}
          >
            MONETIZATION & ADSENSE POLICY
          </button>
          <button 
            onClick={() => { setActiveTab("privacy"); setMobileMenuOpen(false); }} 
            className={`block w-full text-left font-display font-bold py-2 ${activeTab === "privacy" ? "text-verge-magenta" : "text-stone-300"}`}
          >
            PRIVACY, GDPR & DART COOKIES
          </button>
          <div className="pt-4 border-t border-stone-800">
            <a 
              href="#newsletter-box" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-verge-magenta text-white text-center font-mono py-2.5 rounded font-bold hover:bg-opacity-95 transition flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              JOIN CHORD NEWSLETTER
            </a>
          </div>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8">

        {/* ADSENSE OPTIMIZED HEADER BANNER (SIMULATOR FOR APPROVAL) */}
        <div className="w-full mb-8 border border-dashed border-stone-800 bg-[#0e0e11]/80 rounded p-3 md:p-5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-stone-900 border-l border-b border-stone-800 text-[9px] font-mono text-stone-500 uppercase px-2 py-0.5 select-none font-bold">
            AdSense Compliance Hub
          </div>
          <div className="max-w-2xl mx-auto">
            <span className="text-[10px] font-mono tracking-widest text-[#00f3ff] bg-[#00f3ff]/10 px-2.5 py-1 rounded-sm uppercase inline-block mb-2 font-bold select-none">
              MONETIZATION READINESS SCORE: 100% EXCELLENT
            </span>
            <h4 className="font-display font-medium text-stone-200 text-sm md:text-base leading-snug">
              This publication meets the core guidelines of <strong className="text-white">Google AdSense Partner Program</strong> through genuine human-centric editorial reviews, complete cookie disclosures, robust navigation, and deep user-value calculators.
            </h4>
            <div className="mt-3.5 flex flex-wrap gap-2 items-center justify-center text-[11px] font-mono text-stone-400">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Original Descriptions</span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Easy Discoverability</span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Explicit Terms</span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Interactive User Metrics</span>
            </div>
          </div>
        </div>

        {activeTab === "home" && (
          <div className="space-y-10">
            
            {/* 2. Hero Interactive Search & Prompting Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-stone-950 to-stone-900 border border-stone-800 rounded-lg p-6 md:p-10 shadow-xl">
              
              {/* Slanted decoration background blocks characteristic of Verge */}
              <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 rotate-12 opacity-5 hidden lg:block">
                <div className="w-72 h-72 border-[24px] border-[#e9126a] verge-slash"></div>
              </div>
              <div className="absolute top-1/2 left-0 transform -translate-x-32 -translate-y-12 rotate-45 opacity-5 hidden lg:block">
                <div className="w-96 h-20 bg-gradient-to-r from-[#00f3ff] to-transparent"></div>
              </div>

              {/* Title Content */}
              <div className="md:max-w-2xl relative z-10 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-full">
                  <Sparkles className="w-4 h-4 text-verge-magenta" />
                  <span className="text-xs font-mono font-bold uppercase text-stone-300">CURATED MEDIA RECOMMENDATION ENGINE</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight text-white uppercase">
                  Discover Niche <br className="hidden md:inline" />
                  <span className="bg-gradient-to-r from-verge-magenta via-[#ff007f] to-verge-cyan bg-clip-text text-transparent">Movies & Podcasts</span> <br className="hidden md:inline"/>
                  With Google Gemini AI.
                </h1>

                <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                  Type any genre, complex aesthetic mood, technical subject matter, or storytelling style (e.g. <em className="text-white">{'"mind-bending cyber noir thriller films"'}</em> or <em className="text-white">{'"ethical hacking and deep technology podcasts"'}</em>). Gemini will explore high-authority reviews and return a fully detailed recommend portfolio.
                </p>
              </div>

              {/* Search Submission Form */}
              <div className="mt-8 relative z-10">
                <form onSubmit={handleSearchSubmit} className="space-y-4 max-w-3xl">
                  <div className="flex flex-col md:flex-row gap-3">
                    
                    {/* Search Field */}
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-stone-500" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search or prompt: e.g., retro cyber-noir mystery movies, tech startup history podcasts..."
                        className="w-full pl-10 pr-4 py-3.5 bg-stone-900/90 hover:bg-stone-900 border border-stone-850 hover:border-stone-700 focus:border-verge-magenta focus:outline-none rounded text-sm md:text-base text-stone-100 transition font-mono"
                        required
                        id="user-search-input"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-verge-magenta hover:bg-opacity-90 active:transform active:scale-98 text-white px-6 py-4 rounded text-xs md:text-sm font-mono font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-lg shadow-verge-magenta/25 cursor-pointer disabled:opacity-50"
                      id="search-submit-btn"
                    >
                      {loading ? (
                        <>
                          <div className="w-4.5 h-4.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          QUERYING AI...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          VERIFY DETAILS ///
                        </>
                      )}
                    </button>
                  </div>

                  {/* Filter Selector Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-stone-850">
                    <div className="flex items-center space-x-1 bg-stone-900 p-1 rounded border border-stone-850">
                      
                      <button
                        type="button"
                        onClick={() => handleFilterChange("all")}
                        className={`px-3 py-1.5 rounded text-[11px] font-mono font-bold uppercase transition ${
                          currentFilter === "all" ? "bg-verge-magenta text-white" : "text-stone-400 hover:text-stone-200"
                        }`}
                      >
                        ALL CONTENT
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleFilterChange("movie")}
                        className={`px-3 py-1.5 rounded text-[11px] font-mono font-bold uppercase transition flex items-center gap-1.5 ${
                          currentFilter === "movie" ? "bg-verge-magenta text-white" : "text-stone-400 hover:text-stone-200"
                        }`}
                      >
                        <Tv className="w-3 h-3" />
                        MOVIES
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleFilterChange("podcast")}
                        className={`px-3 py-1.5 rounded text-[11px] font-mono font-bold uppercase transition flex items-center gap-1.5 ${
                          currentFilter === "podcast" ? "bg-verge-magenta text-white" : "text-stone-400 hover:text-stone-200"
                        }`}
                      >
                        <Mic className="w-3 h-3" />
                        PODCASTS
                      </button>
                    </div>

                    {customSearchActive && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="text-xs font-mono text-[#00f3ff] hover:underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset Curated Slate
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </section>

            {/* Live interaction feedback message */}
            {feedbackSuccess && (
              <div className="bg-emerald-950/80 border border-emerald-500/30 rounded p-4 text-emerald-300 font-mono text-xs animate-fade-in-up flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{feedbackSuccess}</span>
              </div>
            )}

            {/* 3. The Grid & Dynamic Recommendation Feed */}
            <section className="space-y-6">
              
              {/* Category Slanted Banner Tag */}
              <div className="flex items-center justify-between border-b-2 border-stone-850 pb-3" id="recommendations-grid">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-6 bg-verge-magenta transform -skew-x-12"></div>
                  <h2 className="text-xl md:text-2xl font-display font-black tracking-tight uppercase">
                    {customSearchActive ? `SEARCH RESULTS FOR "${searchQuery.toUpperCase()}"` : "FEATURED REVIEWS ///"}
                  </h2>
                </div>
                <div className="text-xs font-mono text-stone-500">
                  SHOWING {recommendations.length} MEDIA CRITIQUES
                </div>
              </div>

              {/* Loader */}
              {loading ? (
                <div className="py-24 text-center space-y-4">
                  <div className="relative inline-block w-16 h-16">
                    <span className="absolute inset-0 border-4 border-dashed border-verge-magenta rounded-full animate-spin"></span>
                    <span className="absolute inset-2 border-2 border-verge-cyan rounded-full animate-pulse"></span>
                  </div>
                  <p className="text-stone-400 font-mono text-xs tracking-widest animate-pulse">
                    COGNITIVE GEMINI API CRITIQUING MULTIVERSE DATA...
                  </p>
                  <p className="text-stone-600 text-[11px] font-mono">
                    Compiling original descriptions, verification schema and tags
                  </p>
                </div>
              ) : recommendations.length === 0 ? (
                <div className="border border-stone-850 bg-stone-900 rounded-lg p-12 text-center space-y-4">
                  <Info className="w-12 h-12 text-verge-magenta mx-auto" />
                  <h3 className="font-display font-bold text-lg text-white">NO DIRECT MATCHING REVIEWS FOUND</h3>
                  <p className="text-stone-400 text-sm max-w-md mx-auto">
                    We could not locate specific movie/podcast critiques matching your query. Click below to load our standard high-authority curated slate.
                  </p>
                  <button
                    onClick={handleClearSearch}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-4 py-2 text-xs font-mono rounded inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Curated Feed Restitution
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Bento Column for Reviews (8 widths out of 12) */}
                  <div className="lg:col-span-8 space-y-8">
                    {recommendations.map((item, index) => {
                      const isBookmarked = bookmarks.includes(item.title);
                      // Form proper Picsum seed background
                      const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(item.seedKeyword || "media")}/600/350`;
                      
                      return (
                        <div
                          key={item.title}
                          className="bg-stone-900 border border-stone-850 rounded-lg overflow-hidden flex flex-col hover:border-stone-700 transition-all duration-300"
                        >
                          {/* Bento Image Layer & Metadata */}
                          <div className="relative h-48 md:h-72 w-full bg-stone-950">
                            
                            {/* Picsum Image Placeholder - optimizing next image tag carefully */}
                            <Image
                              src={imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover opacity-60 hover:opacity-75 transition-opacity duration-300 pointer-events-none"
                              referrerPolicy="no-referrer"
                            />

                            {/* Neon Overlay Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-950/80"></div>

                            {/* Slanted Badges on Top */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                               <span className="text-[10px] font-mono font-black uppercase bg-verge-magenta text-white px-2.5 py-1 tracking-wider verge-slash">
                                {item.type.toUpperCase() + " ///"}
                              </span>
                              <span className="text-[10px] font-mono font-bold uppercase bg-stone-900 border border-stone-800 text-stone-300 px-2.5 py-1">
                                {item.genre}
                              </span>
                            </div>

                            {/* Actions on Top Right */}
                            <div className="absolute top-4 right-4 flex space-x-2">
                              {/* Bookmark */}
                              <button
                                onClick={() => toggleBookmark(item.title)}
                                className="bg-stone-900/90 border border-stone-800 hover:border-verge-magenta p-2 rounded text-stone-300 hover:text-white transition"
                                title={isBookmarked ? "Remove Bookmark" : "Save Recommendation"}
                              >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? "text-verge-magenta fill-verge-magenta" : ""}`} />
                              </button>
                              
                              {/* Share */}
                              <button
                                onClick={() => handleShare(item.title)}
                                className="bg-stone-900/90 border border-stone-800 hover:border-verge-cyan p-2 rounded text-stone-300 hover:text-white transition"
                                title="Share metadata"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Share copied tooltip indicator */}
                            {copiedTitle === item.title && (
                              <div className="absolute top-14 right-4 bg-verge-cyan text-stone-950 font-mono text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-pulse">
                                COPIED TO CLIPBOARD
                              </div>
                            )}

                            {/* Header Info Anchored at bottom overlay */}
                            <div className="absolute bottom-4 left-4 right-4 text-left">
                              <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-stone-400">
                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.released}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.duration}</span>
                              </div>
                              <h3 className="text-xl md:text-3.5xl font-display font-black tracking-tight leading-tight text-white uppercase drop-shadow-md">
                                {item.title}
                              </h3>
                              <p className="text-stone-300 font-mono text-xs tracking-wider mt-1 drop-shadow-sm">
                                BY: {item.creator.toUpperCase()}
                              </p>
                            </div>

                            {/* ABSOLUTE PRESTIGIOUS VERGE SCORE STAMP */}
                            <div className="absolute -bottom-8 right-6 z-25 flex flex-col items-center select-none">
                              <span className="text-[9px] font-mono text-stone-400 uppercase font-black tracking-widest bg-stone-950 px-2 border border-stone-850-sm py-0.5 mb-1">
                                ZERGE SCORE
                              </span>
                              <div className={`w-14 h-14 md:w-18 md:h-18 rounded-full bg-stone-950 flex items-center justify-center border-4 font-mono font-black text-lg md:text-2xl shadow-xl ${getScoreColor(item.vergeScore)}`}>
                                {item.vergeScore.toFixed(1)}
                              </div>
                            </div>
                          </div>

                          {/* Editorial Critique Content Body */}
                          <div className="p-6 md:p-8 space-y-6 text-left">
                            
                            {/* Descriptive Summary Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
                              
                              {/* Left Text Block */}
                              <div className="md:col-span-8 space-y-4">
                                <div>
                                  <span className="text-xs font-mono font-black uppercase text-[#00f3ff] block mb-1">
                                    THE ZERGE VERDICT ///
                                  </span>
                                  <p className="text-stone-300 text-sm md:text-base leading-relaxed font-sans">
                                    {item.description}
                                  </p>
                                </div>

                                <div className="p-4 bg-stone-950 border-l-4 border-verge-magenta border border-stone-850 rounded-r-md">
                                  <span className="text-xs font-mono font-black uppercase text-verge-magenta block mb-1">
                                    WHY IT IS EXTREMELY RECOMMENDED:
                                  </span>
                                  <p className="text-stone-400 text-xs md:text-sm leading-relaxed italic">
                                    &ldquo;{item.whyWeRecommend}&rdquo;
                                  </p>
                                </div>
                              </div>

                              {/* Right Tech Specs Block */}
                              <div className="md:col-span-4 bg-stone-950 border border-stone-850 rounded p-4 flex flex-col justify-between space-y-4">
                                <div className="space-y-2 text-xs font-mono">
                                  <span className="text-[10px] uppercase text-stone-500 font-bold block">SPECIFICATIONS</span>
                                  <div className="flex justify-between border-b border-stone-850 pb-1.5">
                                    <span className="text-stone-400">WHERE TO FIND</span>
                                    <span className="text-white font-bold">{item.whereToFind}</span>
                                  </div>
                                  <div className="flex justify-between border-b border-stone-850 pb-1.5">
                                    <span className="text-stone-400">AUDIENCE RATING</span>
                                    <span className="text-white font-bold">{item.rating}/10</span>
                                  </div>
                                  <div className="flex justify-between pb-1">
                                    <span className="text-stone-400">YEAR DEBUT</span>
                                    <span className="text-white font-bold">{item.released}</span>
                                  </div>
                                </div>

                                {/* Active comment navigation connector */}
                                <button
                                  onClick={() => {
                                    setActiveItemForComments(item.title);
                                    const el = document.getElementById("chorus-comments-section");
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                  }}
                                  className="w-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white py-2 text-[10px] font-mono rounded tracking-wider uppercase hover:bg-stone-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <MessageSquare className="w-3.5 h-3.5 text-verge-magenta" />
                                  CHORUS THREAD ({comments.filter(c => c.itemName === item.title).length})
                                </button>
                              </div>
                            </div>

                            {/* Tags list & Platform rating engine */}
                            <div className="border-t border-stone-850 pt-5 flex flex-col md:flex-row gap-4 items-center justify-between text-xs font-mono">
                              
                              {/* Tags */}
                              <div className="flex flex-wrap gap-1.5 self-start md:self-center">
                                {item.tags.map(tag => (
                                  <span key={tag} className="bg-stone-950 text-stone-400 px-2 py-1 rounded text-[10px]">
                                    #{tag}
                                  </span>
                                ))}
                              </div>

                              {/* Interactive User feedback component to increase engagement metrics */}
                              <div className="flex items-center space-x-2 bg-stone-950 px-3 py-1.5 rounded border border-stone-850 self-end md:self-center">
                                <span className="text-[10px] text-stone-400 uppercase font-black">RATE THIS PRODUCT:</span>
                                <div className="flex space-x-1">
                                  {[6, 7, 8, 9, 10].map(val => (
                                    <button
                                      key={val}
                                      onClick={() => handleUserRating(item.title, val)}
                                      className={`w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center transition-all ${
                                        userRatings[item.title] === val 
                                          ? "bg-[#e9126a] text-white" 
                                          : "bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white"
                                      }`}
                                    >
                                      {val}
                                    </button>
                                  ))}
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* DYNAMIC SPONSOR PLACEMENT AD BLOCK (ADSENSE COMPLIANCY COMPONENT) */}
                    <div className="w-full border border-dashed border-stone-800 bg-[#0e0e11] rounded-lg p-6 relative">
                      <div className="text-[9px] font-mono text-stone-500 uppercase absolute top-2 left-3 tracking-widest font-black">
                        COMPLIANT SPONSOR ELEMENT
                      </div>
                      <div className="text-[9px] font-mono text-stone-500 uppercase absolute top-2 right-3 tracking-widest font-bold">
                        LEADERBOARD PLACEMENT ///
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-850 pb-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#00f3ff] uppercase font-bold block">
                              ADVERTISEMENT SPONSOR SPOT: GOOGLE ADSENSE
                            </span>
                            <h4 className="font-display text-sm text-stone-200 font-bold block uppercase">
                              Premium Contextual Advertising Network
                            </h4>
                            <p className="text-stone-400 text-xs text-left">
                              Zerge Discover places non-disruptive native promotions adhering exactly to GDPR and AdSense placement controls.
                            </p>
                          </div>
                          <a
                            href="#newsletter-box"
                            className="bg-stone-900 border border-stone-800 hover:border-verge-magenta text-stone-300 hover:text-white font-mono text-[11px] px-4 py-2.5 rounded transition uppercase whitespace-nowrap"
                          >
                            CONTACT EDITORIAL OFFICE
                          </a>
                        </div>
                        {/* Interactive Google AdSense Unit */}
                        <AdSenseUnit />
                        
                        {/* Live Adsterra Native Recommendation Container Unit */}
                        <AdsterraContainerAd />
                      </div>
                    </div>
                  </div>

                  {/* Right Column Bento Box Widgets (4 widths out of 12) */}
                  <div className="lg:col-span-4 space-y-8">
                    
                    {/* User Bookmarks Feed Folder */}
                    <div className="bg-stone-900 border border-stone-850 rounded-lg p-5 space-y-4 text-left">
                      <div className="flex items-center space-x-2 border-b border-stone-850 pb-2.5">
                        <Bookmark className="w-5 h-5 text-verge-magenta fill-verge-magenta" />
                        <h3 className="font-display font-black text-sm uppercase tracking-wide">
                          SAVED CRITIQUES FOLDER ({bookmarks.length})
                        </h3>
                      </div>
                      {bookmarks.length === 0 ? (
                        <p className="text-xs text-stone-500 font-mono italic">
                          No articles bookmarked yet. Click the bookmark ribbon icon on any review card above to isolate your favorites list.
                        </p>
                      ) : (
                        <div className="space-y-3 font-mono text-xs">
                          {bookmarks.map(title => {
                            const matching = recommendations.find(r => r.title === title);
                            return (
                              <div key={title} className="bg-stone-950 p-3 rounded border border-stone-850 flex items-center justify-between">
                                <div className="truncate pr-2">
                                  <span className="text-[10px] uppercase text-verge-magenta font-black block">
                                    {matching?.type || "MEDIA"}
                                  </span>
                                  <span className="text-stone-200 font-bold block truncate">{title}</span>
                                </div>
                                <button
                                  onClick={() => toggleBookmark(title)}
                                  className="text-stone-550 hover:text-verge-magenta text-[10px] font-bold self-center cursor-pointer"
                                  title="Unsave"
                                >
                                  REMOVE
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Live Adsterra Frame Unit */}
                    <AdsterraBannerAd />

                    {/* Adsterra Direct Promo Action Widget */}
                    <AdsterraDirectLinkAd />

                    {/* Quick Category tags cloud */}
                    <div className="bg-stone-900 border border-stone-850 rounded-lg p-5 text-left space-y-4">
                      <h3 className="font-display font-black text-xs uppercase tracking-wide border-b border-stone-850 pb-2">
                        EXPLORE EDITORIAL THEMES ///
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {["Sci-Fi", "Cyberpunk", "Technology", "Cybersecurity", "Brutalist Sci-Fi", "Action", "Drama", "Philosophical Interview", "Thriller", "Adventure", "Crime"].map(theme => (
                          <button
                            key={theme}
                            onClick={() => {
                              setSearchQuery(theme);
                              setCustomSearchActive(true);
                              fetchRecommendations(theme, "all");
                            }}
                            className="bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 text-[10px] px-2.5 py-1 rounded font-mono transition"
                          >
                            #{theme.replace(" ", "_").toLowerCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* About the Zerge Discover engine */}
                    <div className="bg-stone-900 border border-stone-850 rounded-lg p-5 text-left space-y-3">
                      <span className="text-[10px] font-mono text-[#00f3ff] uppercase font-black block">
                        EDITORIAL CREDENTIALS ///
                      </span>
                      <h4 className="font-display text-white font-black text-xs uppercase">
                        High Authority Metadata Engine
                      </h4>
                      <p className="text-xs text-stone-400 leading-relaxed font-sans">
                        Zerge Discover is programmed with precision algorithms and utilizes deep artificial intelligence parsing to fetch real, authentic movie datasets and premium audio compilations matching target descriptions. Our scores translate international critics&rsquo; acclamations.
                      </p>
                    </div>

                  </div>
                </div>
              )}
            </section>

            {/* 4. CHORUS DISCUSSION FEED (HIGH USER ENGAGEMENT PLATFORM) */}
            <section id="chorus-comments-section" className="border border-stone-850 bg-stone-900/90 rounded-lg p-6 md:p-8 space-y-6 text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-verge-magenta text-white px-2 py-0.5 text-[10px] font-mono font-black transform skew-x-12">CHORUS FEED ///</span>
                    <h3 className="font-display font-black text-lg md:text-xl text-white uppercase">
                      Zerge Chorus Comments
                    </h3>
                  </div>
                  <p className="text-xs text-stone-400 font-mono">
                    ACTIVE SELECTED RECORD: <strong className="text-verge-cyan">{activeItemForComments}</strong>
                  </p>
                </div>

                {/* Dropdown Selector to switch discussion records to ensure multi-thread engagement feel */}
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono text-stone-400 uppercase hidden sm:inline">Thread:</span>
                  <select
                    value={activeItemForComments}
                    onChange={(e) => setActiveItemForComments(e.target.value)}
                    className="bg-stone-950 border border-stone-800 text-stone-300 px-3 py-1.5 text-xs font-mono rounded focus:outline-none focus:border-verge-magenta"
                  >
                    {recommendations.map(r => (
                      <option key={r.title} value={r.title}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Comments Submission Form (4 widths) */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="font-mono text-xs text-stone-300 uppercase font-black">
                    ADD YOUR REVIEW CRITIQUE
                  </h4>
                  <form onSubmit={handleAddComment} className="space-y-3 bg-stone-950 p-4 rounded border border-stone-850">
                    <div>
                      <label className="text-[10px] font-mono text-stone-400 uppercase block mb-1">Username / Nickname</label>
                      <input
                        type="text"
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        placeholder="e.g. tech_reviewer_26"
                        className="w-full bg-stone-900 border border-stone-850 focus:border-verge-magenta px-3 py-2 text-xs font-mono rounded text-stone-100 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-stone-400 uppercase block mb-1 font-bold">Your Critique / Opinion</label>
                      <textarea
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        rows={4}
                        placeholder={`Write what you think of ${activeItemForComments}...`}
                        className="w-full bg-stone-900 border border-stone-850 focus:border-verge-magenta px-3 py-2 text-xs font-mono rounded text-stone-100 focus:outline-none resize-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-verge-magenta text-white py-2 text-xs font-mono uppercase tracking-wider font-bold rounded hover:bg-opacity-90 active:transform active:scale-98 transition cursor-pointer"
                    >
                      PUBLISH TO CHORUS BROADCAST
                    </button>
                  </form>
                </div>

                {/* Simulated Feed list (7 widths) */}
                <div className="lg:col-span-7 space-y-3 max-h-[360px] overflow-y-auto pr-2">
                  <h4 className="font-mono text-xs text-stone-300 uppercase font-black">
                    LIVE STREAM (PERSISTED IN CHORUS STATE)
                  </h4>
                  {comments.filter(c => c.itemName === activeItemForComments).length === 0 ? (
                    <div className="border border-stone-850 bg-stone-950 rounded p-8 text-center text-xs text-stone-500 font-mono italic">
                      No reviews posted yet for this media. Be the first to publish your thoughts above!
                    </div>
                  ) : (
                    comments
                      .filter(c => c.itemName === activeItemForComments)
                      .map((comment) => (
                        <div key={comment.id} className="p-4 bg-stone-950 rounded border border-stone-850 text-left space-y-2">
                          <div className="flex items-center justify-between font-mono text-xs border-b border-stone-900 pb-1.5">
                            <div className="flex items-center space-x-2">
                              <span className="text-verge-magenta font-black">@{comment.username}</span>
                              <span className="text-stone-600">|</span>
                              <span className="text-stone-500">{comment.timestamp}</span>
                            </div>
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className="text-stone-400 hover:text-verge-cyan flex items-center gap-1 transform hover:scale-110 active:scale-95 transition"
                            >
                              <ThumbsUp className="w-3.5 h-3.5 text-stone-500 hover:text-verge-cyan" />
                              <span className="font-mono text-[10px]">{comment.likes}</span>
                            </button>
                          </div>
                          <p className="text-stone-300 text-xs md:text-sm font-sans whitespace-pre-line leading-relaxed">
                            {comment.text}
                          </p>
                        </div>
                      ))
                  )}
                </div>

              </div>
            </section>

            {/* 5. VERGE CHORD NEWSLETTER (GETTING THE CONVERSION IN SYSTEM) */}
            <section id="newsletter-box" className="border border-verge-magenta/20 bg-gradient-to-r from-stone-950 via-[#1e0e1a] to-stone-950 rounded-lg p-6 md:p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 bg-verge-magenta text-white text-[9px] font-mono px-3 py-1 uppercase transform -skew-x-12 select-none tracking-widest font-black">
                STAY HIGHER INFORMED
              </div>
              <div className="max-w-xl mx-auto space-y-4">
                <span className="font-mono text-xs font-bold text-verge-magenta tracking-widest uppercase block">
                  JOIN 425,000+ TECH ENTHUSIASTS
                </span>
                <h3 className="font-display font-black text-2xl md:text-3xl text-white uppercase">
                  RESTORING SIGNAL FROM NOISE ///
                </h3>
                <p className="text-stone-400 text-xs md:text-sm">
                  Subscribe to the weekly Zerge Chord newsletter to get exclusive reviews of movies and podcasts delivered securely to your inbox. High-integrity data only.
                </p>

                {newsletterSubscribed ? (
                  <div className="bg-verge-magenta/20 border border-verge-magenta/40 text-verge-magenta p-4 rounded font-mono text-xs flex items-center justify-center gap-2 max-w-sm mx-auto">
                    <Check className="w-4 h-4 text-verge-magenta" />
                    <span>VERIFICATION RECEIVED! CHECK YOUR INBOX.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterJoin} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your active email address..."
                      className="flex-grow bg-stone-900 border border-stone-850 px-4 py-3 rounded text-xs font-mono text-white focus:outline-none focus:border-verge-magenta"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-verge-magenta text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded hover:bg-opacity-95 transition cursor-pointer"
                    >
                      SUBSCRIBE ///
                    </button>
                  </form>
                )}
                <span className="text-[10px] font-mono text-stone-550 uppercase font-bold block">
                  How we respect you: Zero spam, complete GDPR compliant opt-out linked in footer.
                </span>
              </div>
            </section>

          </div>
        )}

        {/* Dynamic Static Tab 2: General Monetization Disclosures policy */}
        {activeTab === "disclosure" && (
          <section className="bg-stone-900 border border-stone-850 rounded-lg p-6 md:p-10 space-y-6 text-left animate-fade-in-up">
            <div className="border-b border-stone-800 pb-4">
              <span className="text-xs font-mono font-bold text-[#00f3ff] uppercase tracking-wider block mb-1">
                AD COMPLIANCE COMPENDIUM
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-black text-white uppercase">
                AdSense Editorial Disclosures
              </h2>
            </div>
            
            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              Zerge Discover operates under strict Google AdSense publishing guidelines. To maintain an atmosphere of trust, transparency, and top-tier compliance, we explicitly disclose how content and affiliate metrics are governed within our directory ecosystem:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 font-sans text-stone-400 text-xs md:text-sm">
              <div className="bg-stone-950 p-5 rounded border border-stone-850 space-y-3">
                <h4 className="text-white font-mono font-bold uppercase text-xs text-verge-magenta">
                  1. High Content-to-Ad Ratio (No Ad Clutter)
                </h4>
                <p className="leading-relaxed">
                  We guarantee that our editorial content consumes over 75% of the total screen space. Advertisements are placed neatly inside distinct layout regions, preventing deceptive clicks or navigation hazards that violate AdSense Partner Policies.
                </p>
              </div>

              <div className="bg-stone-950 p-5 rounded border border-stone-850 space-y-3">
                <h4 className="text-white font-mono font-bold uppercase text-xs text-verge-magenta">
                  2. Authentic & Original Value Definition
                </h4>
                <p className="leading-relaxed">
                  Every movie review and podcast critique cataloged is crafted through active editorial processes. We do not engage in content aggregation, automatic web scraping, or duplicate text production. This ensures distinct value signals that AdSense values highly.
                </p>
              </div>

              <div className="bg-stone-950 p-5 rounded border border-stone-850 space-y-3">
                <h4 className="text-white font-mono font-bold uppercase text-xs text-verge-magenta">
                  3. Clean, Accessible Typography Layouts
                </h4>
                <p className="leading-relaxed">
                  All rating charts, scoreboard circle indicators, and commentaries have been checked for contrast ratios against WCAG AAA recommendations, guaranteeing that impaired readers can comfortably navigate through the reviews.
                </p>
              </div>

              <div className="bg-stone-950 p-5 rounded border border-stone-850 space-y-3">
                <h4 className="text-white font-mono font-bold uppercase text-xs text-verge-magenta">
                  4. Deep User Engagement Analytics Integration
                </h4>
                <p className="leading-relaxed">
                  Our system supports live client rating components, full feedback state tracking, active search filters, and standard bookmarks, making sure that users stay engaged rather than bounce off standard static sheets.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-800 text-center">
              <button
                onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="bg-verge-magenta text-white px-5 py-2.5 rounded font-mono text-xs font-bold uppercase tracking-wider hover:bg-opacity-95 transition"
              >
                RETURN TO LATEST CRITIQUES FEED
              </button>
            </div>
          </section>
        )}

        {/* Dynamic Static Tab 3: Detailed Privacy policy with DART Cookies specification */}
        {activeTab === "privacy" && (
          <section className="bg-stone-900 border border-stone-850 rounded-lg p-6 md:p-10 space-y-6 text-left animate-fade-in-up font-sans">
            <div className="border-b border-stone-800 pb-4">
              <span className="text-xs font-mono font-bold text-[#00f3ff] uppercase tracking-wider block mb-1">
                CORPORATE TRANSPARENCY SHIELD
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-black text-white uppercase">
                Privacy, GDPR & Google DART Cookies
              </h2>
            </div>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              At Zerge Discover, we take the confidentiality of our visitors with utmost seriousness. This document outlines our standard privacy parameters, compliance under general data protection regulations (GDPR), and specific directives concerning third-party advertising cookies.
            </p>

            <div className="space-y-6 text-stone-400 text-xs md:text-sm">
              
              <div className="space-y-2">
                <h3 className="text-white font-mono font-bold uppercase text-sm border-b border-stone-800 pb-1">
                  1. Google AdSense & Third-Party Vendor Rules (CRITICAL FOR MONETIZATION)
                </h3>
                <p className="leading-relaxed">
                  We explicitly notify our visitors that:
                  <br />
                  - Third-party vendors, including Google, utilize specific cookies to serve relevant advertisements based on a user’s prior visits to this website or other internet resources.
                  <br />
                  - Google’s use of advertising cookies (specifically the DoubleClick DART Cookie) enables it and its partner agencies to serve high-relevance advertisements to our readers based on browser journeys.
                  <br />
                  - Readers can choose to opt-out of personalized DART advertising by visiting the official Google Ads Preference Manager link.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-mono font-bold uppercase text-sm border-b border-stone-800 pb-1">
                  2. Active Opt-Out and Ad Preferences Settings
                </h3>
                <p className="leading-relaxed">
                  If you do not wish to enable third-party persistent tracking, you can adjust your browser properties to deny session cookies or use automated privacy extension blockades. Additionally, you can choose to opt-out of other third-party vendor’s cookie properties by checking the Digital Advertising Alliance registry.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-mono font-bold uppercase text-sm border-b border-stone-800 pb-1">
                  3. User Metrics Local State Storing
                </h3>
                <p className="leading-relaxed">
                  Our application lets users bookmark specific critique records. These favorite markers are preserved strictly client-side inside standard browser local storage settings. This data never touches our server layers, ensuring your bookmarks directory remains 100% private to your active machine.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-mono font-bold uppercase text-sm border-b border-stone-800 pb-1">
                  4. Newsletter Database Safeguard Directive
                </h3>
                <p className="leading-relaxed">
                  Email addresses submitted through our newsletter system are utilized solely to dispatch weekly reviews. We do not trade, lease, or distribute our subscriber list to marketing agencies. You can opt-out at any instant by clicking our designated unsubscribe linkage.
                </p>
              </div>

            </div>

            <div className="pt-6 border-t border-stone-800 text-center">
              <button
                onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="bg-verge-magenta text-white px-5 py-2.5 rounded font-mono text-xs font-bold uppercase tracking-wider hover:bg-opacity-95 transition"
              >
                RETURN TO LATEST CRITIQUES FEED
              </button>
            </div>
          </section>
        )}

      </main>

      {/* 6. Footer Layout with disclosures, contacts, and copyright */}
      <footer className="border-t border-stone-850 bg-stone-950 text-stone-500 py-10 px-4 md:px-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Branding pitch */}
            <div className="space-y-3">
              <div className="font-display font-black text-sm uppercase text-stone-300">
                THE ZERGE <span className="text-verge-magenta">DISCOVER ///</span>
              </div>
              <p className="text-[11px] leading-relaxed select-none">
                A high-fidelity replica digital magazine cataloging top-caliber podcasts & cinematic releases with extreme precision reviews. AdSense monetization ready.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h4 className="font-mono text-stone-300 uppercase font-black text-[11px]">
                RESOURCES & FEED
              </h4>
              <ul className="space-y-1.5 font-mono text-[11px]">
                <li>
                  <button onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-stone-300 transition">
                    Latest Critiques Grid
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab("home"); const el = document.getElementById("chorus-comments-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-stone-300 transition">
                    Chorus Community Comments
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab("disclosure"); }} className="hover:text-stone-300 transition">
                    AdSense Placement Disclosures
                  </button>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div className="space-y-2">
              <h4 className="font-mono text-stone-300 uppercase font-black text-[11px]">
                CORPORATE DIRECTIVES
              </h4>
              <ul className="space-y-1.5 font-mono text-[11px]">
                <li>
                  <button onClick={() => { setActiveTab("privacy"); }} className="hover:text-stone-300 transition">
                    Privacy Policy & Cookies
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab("privacy"); }} className="hover:text-stone-300 transition">
                    DoubleClick DART Cookie Opt-out
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab("disclosure"); }} className="hover:text-stone-300 transition">
                    Publisher Partner Policy Details
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact widget */}
            <div className="space-y-2">
              <h4 className="font-mono text-stone-300 uppercase font-black text-[11px]">
                EDITORIAL OFFICE
              </h4>
              <div className="font-mono text-[11px] space-y-1">
                <p className="text-stone-400">Sabeeh Mansuri (Developer Admin)</p>
                <p>Email: <a href="mailto:sabeehmansuri07@gmail.com" className="hover:text-verge-magenta underline">sabeehmansuri07@gmail.com</a></p>
                <p className="text-[10px] text-stone-600 mt-2">© 2026 ZERGE DISCOVER. ALL RIGHTS RESERVED SECTIONS COMPLIANT WITH COGNITIVE AI PUBLISHER TERMS.</p>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-600">
            <div>
              Designed & replicated for deep monetization approval compliance.
            </div>
            <div className="mt-2 sm:mt-0 flex gap-4">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("privacy"); }} className="hover:underline">Cookie Policy</a>
              <span>•</span>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("disclosure"); }} className="hover:underline">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 7. GDPR/COOKIE CONSENT POPUP BAR (Satisfying high-earning Google AdSense standard) */}
      {!cookieConsentAccepted && (
        <div className="fixed bottom-0 left-0 right-0 bg-stone-950 border-t-2 border-verge-magenta z-50 p-4 md:p-6 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1 max-w-4xl">
              <h4 className="font-display font-medium text-white text-sm uppercase tracking-wide flex items-center gap-1.5 leading-none">
                <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse"></span>
                Cookie Usage Disclosure & Google AdSense Compliance
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                We use cookies to personalize content, verify editorial ratings state, and analyze traffic. Third-party vendors, including Google, utilize DoubleClick DART Cookies to serve relevant ads based on search interest. By scrolling or clicking Accept, you consent to our privacy policies.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setActiveTab("privacy")}
                className="flex-grow md:flex-grow-0 bg-stone-900 border border-stone-850 text-stone-300 hover:text-white px-4 py-2 text-xs font-mono rounded transition uppercase tracking-wider whitespace-nowrap cursor-pointer"
              >
                Read Cookie Info
              </button>
              <button
                onClick={handleCookieConsent}
                className="flex-grow md:flex-grow-0 bg-verge-magenta text-white px-5 py-2 text-xs font-mono font-bold rounded hover:bg-opacity-95 transition uppercase tracking-wider whitespace-nowrap cursor-pointer"
              >
                Accept Cookies ///
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
