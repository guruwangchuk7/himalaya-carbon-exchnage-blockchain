"use client";

import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Guru Wangchuk",
    role: "Full Stack Engineer & Blockchain Developer",
    expertise: "Database Architecture • Protocol Design",
    bgColor: "bg-brand/10",
    borderColor: "border-brand/30",
    textColor: "text-brand"
  },
  {
    name: "Tshetrim Dema",
    role: "Research & Documentation Writer",
    expertise: "Protocol Analysis • Technical Strategy",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    textColor: "text-success"
  },
  {
    name: "Deki Yangzom",
    role: "Financial & Data specialist",
    expertise: "Market Analysis • Yield Strategies",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400"
  }
];

export function Team() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-success/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-border-subtle mb-6 backdrop-blur-sm shadow-sm group hover:border-brand/30 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] font-bold text-muted-text uppercase tracking-[0.2em] group-hover:text-foreground transition-colors">
              Platform Origins
            </span>
          </div>
          <h2 className="section-h2 text-foreground mb-4">Meet the Team</h2>
          <p className="body-primary text-muted-text">
            The core architects and researchers driving the sovereign carbon market infrastructure forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`rounded-[32px] p-8 border ${member.borderColor} ${member.bgColor} backdrop-blur-md shadow-soft-float transition-transform hover:-translate-y-1 relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform origin-top-right" />
              
              <div className="mb-8 p-4">
                 <h3 className="text-xl font-bold text-foreground tracking-tight mb-2">
                   {member.name}
                 </h3>
                 <p className={`text-sm font-semibold uppercase tracking-wider ${member.textColor} mb-3`}>
                   {member.role}
                 </p>
                 <div className="h-px w-12 bg-border-subtle my-4" />
                 <p className="text-muted-text text-sm font-medium">
                   {member.expertise}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
