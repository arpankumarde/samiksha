"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Home, DollarSign, Mail } from "lucide-react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Pricing", href: "/pricing", icon: DollarSign },
  { name: "Contact", href: "/contact", icon: Mail },
];

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Define protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Check if user is on a protected route without authentication
      if (!currentUser && protectedRoutes.includes(pathname)) {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [pathname, router, protectedRoutes]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleProtectedNavigation = (href: string) => {
    if (!user && protectedRoutes.includes(href)) {
      router.push("/auth");
      return;
    }
    router.push(href);
  };

  return (
    <nav className="z-50 w-full border-b border-orange-200 bg-gradient-to-r backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lgshadow-sm">
              <Image alt="Logo" src="/brand/logo.png" width={80} height={80} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              Samiksha AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                asChild
                variant="ghost"
                key={item.name}
                className="text-orange-700 hover:text-orange-800 hover:bg-orange-100/50 transition-all duration-200"
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-orange-200" />
            ) : user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 hover:border-orange-400 transition-all duration-200"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleSignOut}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-sm transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                asChild
                className="bg-gradient-to-r from-amber-600 to-orange-600  hover:from-orange-600 hover:to-amber-600 text-white shadow-sm transition-all duration-200 font-medium"
              >
                <Link href="/auth">Login</Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-orange-700 hover:text-orange-800 hover:bg-orange-100/50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-orange-200">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigationItems.map((item) => (
                <Button
                  asChild
                  variant="ghost"
                  key={item.name}
                  className="w-full justify-start text-base font-medium text-orange-700 hover:text-orange-800 hover:bg-orange-100/50 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href={item.href}>
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              ))}
              {user && (
                <>
                  <div className="my-3 border-t border-orange-200"></div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base font-medium text-orange-700 hover:text-orange-800 hover:bg-orange-100/50 transition-all duration-200"
                    onClick={() => {
                      handleProtectedNavigation("/dashboard");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Log out
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
