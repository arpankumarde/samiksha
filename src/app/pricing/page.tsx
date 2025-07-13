"use client";

import React from "react";
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
  CheckCircle,
  X,
  ArrowRight,
  Zap,
  Users,
  BarChart3,
  Shield,
  Database,
  Cpu,
  Globe,
  Star,
  HelpCircle,
  Mail,
} from "lucide-react";
import Link from "next/link";

type Feature = {
  name: string;
  included: boolean;
};

type PricingTier = {
  name: string;
  subtitle: string;
  price: number | null;
  description: string;
  popular: boolean;
  features: Feature[];
  cta: string;
  highlight: string;
};

const PricingPage = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      subtitle: "Perfect for small teams",
      price: 2499,
      description: "Get started with essential AI features",
      popular: false,
      features: [
        { name: "Up to 5 team members", included: true },
        { name: "Basic AI analytics", included: true },
        { name: "Standard support", included: true },
        { name: "5GB storage", included: true },
        { name: "Basic integrations", included: true },
        { name: "Email support", included: true },
        { name: "Advanced analytics", included: false },
        { name: "Custom integrations", included: false },
        { name: "Priority support", included: false },
        { name: "API access", included: false },
      ],
      cta: "Start Free Trial",
      highlight: "Most affordable",
    },
    {
      name: "Professional",
      subtitle: "Best for growing businesses",
      price: 8999,
      description: "Advanced features for scaling teams",
      popular: true,
      features: [
        { name: "Up to 25 team members", included: true },
        { name: "Advanced AI analytics", included: true },
        { name: "Priority support", included: true },
        { name: "100GB storage", included: true },
        { name: "Custom integrations", included: true },
        { name: "API access", included: true },
        { name: "Advanced reporting", included: true },
        { name: "Team collaboration", included: true },
        { name: "Custom workflows", included: true },
        { name: "SSO integration", included: false },
      ],
      cta: "Start Free Trial",
      highlight: "Best value",
    },
    {
      name: "Enterprise",
      subtitle: "For large organizations",
      price: null,
      description: "Unlimited power with enterprise-grade security",
      popular: false,
      features: [
        { name: "Unlimited team members", included: true },
        { name: "Enterprise AI analytics", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "Unlimited storage", included: true },
        { name: "Custom development", included: true },
        { name: "Full API access", included: true },
        { name: "Advanced security", included: true },
        { name: "SSO integration", included: true },
        { name: "On-premise deployment", included: true },
        { name: "Custom SLA", included: true },
      ],
      cta: "Contact Sales",
      highlight: "Full control",
    },
  ];

  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Analytics",
      description:
        "Advanced machine learning algorithms analyze your data patterns",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Real-time collaboration tools for distributed teams",
    },
    {
      icon: BarChart3,
      title: "Smart Reporting",
      description: "Automated report generation with beautiful visualizations",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption",
    },
    {
      icon: Database,
      title: "Cloud Storage",
      description: "Secure cloud storage with automatic backups",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access your data from anywhere in the world",
    },
  ];

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer:
        "All paid plans include a 14-day free trial with full access to all features. No credit card required.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No, there are no setup fees or hidden costs. You only pay for your chosen plan.",
    },
    {
      question: "How does the team member limit work?",
      answer:
        "Team members are users who can access and collaborate on your projects. You can add or remove members anytime.",
    },
    {
      question: "What happens if I exceed my storage limit?",
      answer:
        "We'll notify you when you approach your limit. You can upgrade your plan or purchase additional storage.",
    },
  ];

  const getPrice = (tier: PricingTier) => {
    if (!tier.price) return "Custom";
    return `Rs. ${tier.price}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 border-orange-200 mb-6">
              <Zap className="w-3 h-3 mr-1" />
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
              Choose the Perfect Plan for{" "}
              <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Your Team
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Start with a 14-day free trial. No credit card required. Cancel
              anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`border-2 relative ${
                  tier.popular
                    ? "border-orange-400 shadow-xl scale-105 bg-gradient-to-b from-orange-50/50 to-yellow-50/50"
                    : "border-orange-200 hover:border-orange-300 transition-colors"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl text-gray-900">
                      {tier.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {tier.subtitle}
                    </CardDescription>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {getPrice(tier)}
                      </span>
                      {tier.price && (
                        <span className="text-gray-600 ml-2">per month</span>
                      )}
                    </div>
                  </div>

                  <CardDescription className="mt-4 text-gray-600">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        {feature.included ? (
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      tier.popular
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg"
                        : "bg-orange-100 hover:bg-orange-200 text-orange-800 border border-orange-200"
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-center mt-4">
                    <span className="text-xs text-gray-500">
                      {tier.highlight}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Everything You Need in{" "}
              <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                One Platform
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Powerful features designed to transform your business workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-gray-200 hover:border-gray-300 transition-colors bg-white/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-gray-700">
              Everything you need to know about our pricing and features
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <HelpCircle className="w-5 h-5 text-orange-600" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our team is here to help you choose the perfect plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-700 hover:bg-orange-50"
              asChild
            >
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
