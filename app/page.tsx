"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Globe, ShieldCheck, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
            >
              The All-in-One Platform for Modern Business
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto"
            >
              Seamlessly integrate E-commerce, CRM, and AI-driven insights. 
              Manage your sales, contacts, and campaigns from a single, stunning dashboard.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
               <Link href="/auth/signup">
                 <Button size="lg" className="rounded-full px-8">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
               </Link>
               <Link href="/about">
                <Button variant="ghost" size="lg" className="rounded-full">
                    Learn more
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Infographic / Dashboard Mockup Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 relative mx-auto max-w-5xl p-4 bg-muted/50 rounded-xl border shadow-2xl backdrop-blur-sm"
          >
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl -z-10" />
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* Feature Card 1 */}
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-card rounded-lg shadow-sm border space-y-4"
                >
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-xl">Advanced CRM</h3>
                    <p className="text-sm text-muted-foreground">Visualize pipelines with Kanban boards and track every interaction.</p>
                </motion.div>

                {/* Feature Card 2 */}
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-card rounded-lg shadow-sm border space-y-4"
                >
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-xl">AI Powered</h3>
                    <p className="text-sm text-muted-foreground">Routerway AI integration for automated insights and efficiency.</p>
                </motion.div>

                 {/* Feature Card 3 */}
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-card rounded-lg shadow-sm border space-y-4"
                >
                    <div className="h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                        <Globe className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h3 className="font-semibold text-xl">Global E-commerce</h3>
                    <p className="text-sm text-muted-foreground">Sell everywhere with multi-currency support and seamless Stripe checkout.</p>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
       <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                        Enterprise Grade
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
                        Secure, Scalable, and Ready for Growth
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Built on Next.js 14 and Supabase, ensuring top-tier performance and security for your business data.
                    </p>
                    <ul className="grid gap-4 mt-6">
                         {[
                            "Switchable Dark/Light Gradient Themes",
                            "Role-based Access Control",
                            "Real-time Analytics",
                            "Integrated Email Marketing"
                         ].map((item, i) => (
                             <li key={i} className="flex items-center gap-2 font-medium">
                                 <ShieldCheck className="h-5 w-5 text-green-500" />
                                 {item}
                             </li>
                         ))}
                    </ul>
                </div>
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl border bg-background">
                    {/* Placeholder for a nice image or generic dashboard view */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <p className="text-muted-foreground font-medium">Dashboard Preview</p>
                     </div>
                </div>
            </div>
        </div>
       </section>
    </div>
  )
}
