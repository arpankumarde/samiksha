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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isSignUp ? "Sign Up" : "Login"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Create a new account" : "Sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={
              isSignUp ? handleEmailPasswordSignUp : handleEmailPasswordSignIn
            }
            className="grid gap-4"
          >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
              disabled={isLoading}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Loading..."
                : isSignUp
                ? "Sign Up with Email"
                : "Sign In with Email"}
            </Button>
          </form>

          <div className="mt-4">
            <Button
              variant="ghost"
              className="w-full text-sm"
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={isLoading}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Continue with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
