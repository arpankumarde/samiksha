"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  Brain,
  BarChart3,
  Lock,
  Rocket,
  Quote,
} from "lucide-react";
import Image from "next/image";

const teams = [
  "https://nexgen-msit.netlify.app/images/team/priya.jpg",
  "https://nexgen-msit.netlify.app/images/team/arpan.png",
  "https://nexgen-msit.netlify.app/images/team/ujjwal.jpeg",
  "https://nexgen-msit.netlify.app/images/team/aditya.jpg",
];

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "Intelligent Analysis",
      description:
        "Advanced AI algorithms that understand your data patterns and provide actionable insights in real-time.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: BarChart3,
      title: "Smart Reporting",
      description:
        "Generate comprehensive reports automatically with beautiful visualizations and key metrics.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description:
        "Bank-grade security with end-to-end encryption to keep your business data safe and compliant.",
      color: "from-amber-600 to-orange-600",
    },
    {
      icon: Rocket,
      title: "Fast Integration",
      description:
        "Get up and running in minutes with our simple API and pre-built connectors for popular tools.",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const stats = [
    { number: "10k+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: TrendingUp },
    { number: "500+", label: "Companies", icon: Sparkles },
    { number: "24/7", label: "Support", icon: Shield },
  ];

  const testimonials = [
    {
      name: "Vikram Sinha",
      role: "Business Analyst",
      avatar: "/avatars/sarah.jpg",
      content:
        "Samiksha AI transformed how we analyze customer data. The insights are incredible and the interface is so intuitive.",
      rating: 5,
    },
    {
      name: "Rupal Shah",
      role: "VP Ops",
      avatar: "/avatars/michael.jpg",
      content:
        "The AI-powered analytics saved us hours of manual work. It's like having a data scientist on steroids.",
      rating: 5,
    },
    {
      name: "Meena Joseph",
      role: "Strategy Lead",
      avatar: "/avatars/emily.jpg",
      content:
        "Finally, an AI tool that actually understands our business needs. The ROI has been phenomenal.",
      rating: 5,
    },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "Rs. 2499",
      period: "per month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 team members",
        "Basic analytics",
        "Standard support",
        "5GB storage",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "Rs. 8999",
      period: "per month",
      description: "Best for growing businesses",
      features: [
        "Up to 25 team members",
        "Advanced analytics",
        "Priority support",
        "100GB storage",
        "Custom integrations",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations",
      features: [
        "Unlimited team members",
        "Enterprise analytics",
        "24/7 dedicated support",
        "Unlimited storage",
        "Custom development",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/30">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Now with Advanced AI
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Transform Your Business with{" "}
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Intelligent AI
                  </span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Samiksha AI empowers your team with cutting-edge artificial
                  intelligence to automate workflows, analyze data, and make
                  smarter decisions faster than ever before.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/auth">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amber-200 text-amber-700 hover:bg-amber-50"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {teams.map((i, key) => (
                    <div
                      key={key}
                      className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full border-2 border-white"
                    >
                      <Image
                        src={i}
                        alt={`team ${key}`}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">20+</span>{" "}
                  teams trust Samiksha AI
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/50 to-orange-200/50 rounded-3xl rotate-6"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-amber-100">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full w-24"></div>
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                      <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                    </div>
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-800">
                          AI Insights
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-amber-200 rounded w-full"></div>
                        <div className="h-2 bg-amber-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Modern Teams
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to harness the power of AI in your business
              workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Customers Say
              </span>
            </h2>
            <p className="text-xl text-slate-600">
              Join thousands of satisfied customers who trust Samiksha AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Quote className="w-8 h-8 text-amber-400 mb-4" />
                  <p className="text-slate-700 mb-4">{testimonial.content}</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Simple,{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-slate-600">
              Choose the perfect plan for your team's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`border-2 ${
                  tier.popular
                    ? "border-amber-400 shadow-xl scale-105"
                    : "border-slate-200"
                } relative`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-slate-900">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">
                      {tier.price}
                    </span>
                    <span className="text-slate-600 ml-2">{tier.period}</span>
                  </div>
                  <CardDescription className="mt-2">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-amber-600" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      tier.popular
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                    }`}
                    asChild
                  >
                    {tier.price === "Custom" ? (
                      <Link href="/contact">Contact Sales</Link>
                    ) : (
                      <Link href="/auth">Start Free Trial</Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using Samiksha AI to automate
            their workflows and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-slate-100"
              asChild
            >
              <Link href="/auth">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 hover:text-white hover:bg-white/30"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
