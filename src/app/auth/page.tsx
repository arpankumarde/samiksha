"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const googleProvider = new GoogleAuthProvider();

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const saveUserToFirestore = async (
    user: User,
    isNewUser: boolean = false
  ) => {
    try {
      const userRef = doc(db, "users", user.uid);

      // Check if user document already exists
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists() || isNewUser) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || null,
          photoURL: user.photoURL || null,
          emailVerified: user.emailVerified,
          createdAt: isNewUser ? serverTimestamp() : user.metadata.creationTime,
          lastLoginAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(userRef, userData, { merge: true });
        console.log("User data saved to Firestore:", userData);
        return userData;
      } else {
        // Update last login time for existing users
        const updateData = {
          lastLoginAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(userRef, updateData, { merge: true });
        console.log("User login time updated in Firestore");
        return userDoc.data();
      }
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
      toast.error("Failed to save user data");
      throw error;
    }
  };

  const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("=== SIGN IN SUCCESS ===");
      console.log("User object:", user);
      console.log("User UID:", user.uid);
      console.log("User email:", user.email);
      console.log("User display name:", user.displayName);
      console.log("Email verified:", user.emailVerified);
      console.log("Creation time:", user.metadata.creationTime);
      console.log("Last sign in time:", user.metadata.lastSignInTime);

      // Save/update user data in Firestore
      await saveUserToFirestore(user, false);

      toast.success("Successfully signed in!");

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Sign in error:", error);
      toast.error("Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailPasswordSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("=== SIGN UP SUCCESS ===");
      console.log("New user object:", user);
      console.log("User UID:", user.uid);
      console.log("User email:", user.email);
      console.log("User display name:", user.displayName);
      console.log("Email verified:", user.emailVerified);
      console.log("Creation time:", user.metadata.creationTime);
      console.log("Last sign in time:", user.metadata.lastSignInTime);
      console.log("Provider data:", user.providerData);

      // Save new user data in Firestore
      await saveUserToFirestore(user, true);

      toast.success("Account created successfully!");

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Sign up error:", error);
      toast.error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      console.log("=== GOOGLE SIGN IN SUCCESS ===");
      console.log("User object:", user);
      console.log("User UID:", user.uid);
      console.log("User email:", user.email);
      console.log("User display name:", user.displayName);
      console.log("User photo URL:", user.photoURL);
      console.log("Email verified:", user.emailVerified);
      console.log("Creation time:", user.metadata.creationTime);
      console.log("Last sign in time:", user.metadata.lastSignInTime);
      console.log("Provider data:", user.providerData);

      // Check if this is a new user by comparing creation time and last sign in time
      const creationTime = new Date(user.metadata.creationTime!).getTime();
      const lastSignInTime = new Date(user.metadata.lastSignInTime!).getTime();
      const isNewUser = Math.abs(creationTime - lastSignInTime) < 1000; // Within 1 second
      console.log("Is new user:", isNewUser);

      // Save user data in Firestore
      await saveUserToFirestore(user, isNewUser);

      toast.success(
        isNewUser
          ? "Account created with Google!"
          : "Successfully signed in with Google!"
      );

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Google sign in error:", error);
      toast.error("Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main card container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl shadow-lg mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            {isSignUp ? "Join Us Today" : "Welcome Back"}
          </h1>
          <p className="text-orange-700/70 text-sm">
            {isSignUp
              ? "Create your account to get started"
              : "Sign in to continue your journey"}
          </p>
        </div>

        {/* Main card */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            {/* Toggle buttons */}
            <div className="flex bg-orange-50/50 rounded-2xl p-1 mb-8">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                  !isSignUp
                    ? "bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg"
                    : "text-orange-600 hover:bg-orange-100/50"
                }`}
                disabled={isLoading}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isSignUp
                    ? "bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg"
                    : "text-orange-600 hover:bg-orange-100/50"
                }`}
                disabled={isLoading}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={
                isSignUp ? handleEmailPasswordSignUp : handleEmailPasswordSignIn
              }
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    required
                    disabled={isLoading}
                    className="h-12 bg-orange-50/50 border-orange-200 rounded-xl focus:border-orange-400 focus:ring-orange-400/20 placeholder:text-orange-400 text-orange-900"
                  />
                </div>

                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 bg-orange-50/50 border-orange-200 rounded-xl focus:border-orange-400 focus:ring-orange-400/20 placeholder:text-orange-400 text-orange-900"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-orange-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-orange-600 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google button */}
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-orange-50 border-orange-200 rounded-xl text-orange-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  <span>Continue with Google</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-orange-600/70">
          <p>
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
