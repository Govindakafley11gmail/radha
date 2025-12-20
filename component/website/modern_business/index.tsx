'use client';

import { Button } from '@/components/ui/button';
import {
    Rocket,
    Shield,
    BarChart3,
    Users,
    Cloud,
    Settings,
    HeadphonesIcon,
} from 'lucide-react';
import * as React from 'react';
import { motion } from 'framer-motion';

interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
    highlight?: boolean;
}

const features: Feature[] = [
    {
        title: 'Lightning Fast Performance',
        description:
            'Experience blazing fast loading times and seamless user interactions that keep your team productive.',
        icon: <Rocket className="h-10 w-10 text-white" />,
        highlight: true,
    },
    {
        title: 'Enterprise Security',
        description:
            'Bank-level encryption and advanced security protocols to protect your sensitive business data.',
        icon: <Shield className="h-7 w-7 text-orange-500" />,
    },
    {
        title: 'Real-time Analytics',
        description:
            'Get instant insights with comprehensive dashboards and detailed reporting capabilities.',
        icon: <BarChart3 className="h-7 w-7 text-orange-500" />,
    },
    {
        title: 'Team Collaboration',
        description:
            'Foster seamless teamwork with integrated communication and project management tools.',
        icon: <Users className="h-7 w-7 text-orange-500" />,
    },
    {
        title: 'Cloud Integration',
        description:
            'Seamlessly sync your data across all devices with our robust cloud infrastructure.',
        icon: <Cloud className="h-7 w-7 text-orange-500" />,
    },
    {
        title: 'Easy Customization',
        description:
            'Tailor the platform to your unique business needs with flexible configuration options.',
        icon: <Settings className="h-7 w-7 text-orange-500" />,
    },
    {
        title: '24/7 Support',
        description:
            'Get expert assistance whenever you need it with our dedicated customer support team.',
        icon: <HeadphonesIcon className="h-7 w-7 text-orange-500" />,
    },
];

export default function FeaturesSection() {
    const highlightedFeature = features.find((f) => f.highlight);
    const smallFeatures = features.filter((f) => !f.highlight);

    // Framer Motion variants
    const fadeInUpScale = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    return (
        <section className="w-full bg-white">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
                    {/* Left column */}
                    <motion.div
                        className="space-y-12 lg:space-y-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {/* Title + Description */}
                        <motion.div variants={fadeInUpScale} className="max-w-lg">
                            <h2 className="text-xl font-bold tracking-tight sm:text-xl">
                                Powerful Features for Modern Business
                            </h2>
                            <p className="mt-6 text-sm text-muted-foreground">
                                Streamline your operations with our comprehensive suite of business
                                tools designed to boost productivity and drive growth.
                            </p>
                        </motion.div>

                        {/* Highlighted card */}
                        {highlightedFeature && (
                            <motion.div
                                variants={fadeInUpScale}
                                whileHover={{ y: -5, boxShadow: '0 20px 30px rgba(0,0,0,0.15)' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="rounded-3xl bg-muted/40 p-10 shadow-md cursor-pointer"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-orange-500">
                                        {highlightedFeature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold">{highlightedFeature.title}</h3>
                                        <p className="mt-3 text-muted-foreground text-sm">
                                            {highlightedFeature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* CTA Button */}
                        <motion.div variants={fadeInUpScale}>
                            <Button
                                size="sm"
                                className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-10 py-7 text-lg font-medium shadow-lg"
                            >
                                Get Started Today
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right column - 2x3 grid of small cards */}
                    <motion.div
                        className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {smallFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUpScale}
                                whileHover={{ y: -4, boxShadow: '0 15px 25px rgba(0,0,0,0.1)' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="rounded-3xl bg-white p-8 shadow-md cursor-pointer hover:bg-orange-50 transition-colors"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 mb-6">
                                    {feature.icon}
                                </div>
                                <h4 className="text-sm font-semibold mb-3">{feature.title}</h4>
                                <p className="text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
