"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Home,
  DollarSign,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Pricing", href: "/pricing", icon: DollarSign },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const socialLinks = [
    { name: "Twitter", href: "https://x.com/arpankumarde", icon: Twitter },
    { name: "GitHub", href: "https://github.com/arpankumarde", icon: Github },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/arpankumarde",
      icon: Linkedin,
    },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribing(true);

    try {
      // Check if email already exists
      const newslettersRef = collection(db, "newsletters");
      const q = query(
        newslettersRef,
        where("email", "==", email.trim().toLowerCase())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error("This email is already subscribed to our newsletter.");
        setIsSubscribing(false);
        return;
      }

      // Add new subscriber
      await addDoc(newslettersRef, {
        email: email.trim().toLowerCase(),
        subscribedAt: new Date(),
        status: "active",
        source: "footer_subscription",
      });

      toast.success("Thank you for subscribing to our newsletter!");

      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="w-full border-t border-orange-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg shadow-sm">
                <Image
                  alt="Logo"
                  src="/brand/logo.png"
                  width={80}
                  height={80}
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
                Samiksha AI
              </span>
            </Link>
            <p className="text-sm text-gray-800 max-w-xs">
              Empowering businesses with intelligent AI solutions. Transform
              your workflow with our cutting-edge technology.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-100/50 transition-all duration-200"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-800 hover:text-orange-800 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-800">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                  className="w-full border-orange-300 focus:border-orange-500 focus:ring-orange-500/20 bg-white/50"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubscribing}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-sm transition-all duration-200 font-medium"
              >
                {isSubscribing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between space-y-4 border-t border-orange-950 py-6 md:flex-row md:space-y-0">
          <p className="text-sm">
            © {currentYear} Samiksha AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <span>
              Made with <span className="text-red-500 animate-pulse">❤️</span>{" "}
              by{" "}
              <Link
                href="https://github.com/arpankumarde"
                target="_blank"
                className="text-orange-700 hover:text-orange-800 font-medium transition-colors duration-200"
              >
                Arpan
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
