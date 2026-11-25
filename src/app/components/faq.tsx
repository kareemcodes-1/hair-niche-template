"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { SplitText } from "../../../components/animations/SplitText";

const FAQ = () => {
  return (
    <section className="w-full px-5 md:px-8 py-16 md:py-24 lg:py-28 bg-white">
      <div className="flex flex-col items-center gap-4 md:gap-5 justify-center w-full">
        {/* Desktop heading */}
        <SplitText
          text="You got questions? We've got answers"
          tag="h2"
          className="hidden md:block text-[1.75rem] md:text-[2.5rem] lg:text-[3rem] text-center text-black overflow-hidden max-w-[400px] font-medium tracking-tight"
          duration={1}
          ease="power3.out"
          splitType="chars"
          threshold={0.1}
          rootMargin="-100px"
          stagger={0.025}
        />

        {/* Mobile heading */}
        <div className="block md:hidden leading-[1.15] text-center">
          <SplitText
            text="Your questions,"
            tag="h2"
            className="text-[1.75rem] text-black overflow-hidden w-full font-medium tracking-tight"
            duration={1}
            ease="power3.out"
            splitType="chars"
            threshold={0.1}
            rootMargin="-100px"
            stagger={0.025}
          />
          <SplitText
            text="answered."
            tag="h2"
            className="text-[1.75rem] text-black overflow-hidden w-full font-medium tracking-tight"
            duration={1}
            ease="power3.out"
            splitType="chars"
            threshold={0.1}
            rootMargin="-100px"
            stagger={0.025}
          />
        </div>
      </div>

      <div className="w-full mx-auto mt-10 sm:mt-12 md:mt-14 max-w-[720px]">
        <Accordion type="single" collapsible className="w-full space-y-3">

          {/* 1. Keep – very important */}
          <AccordionItem
            value="item-1"
            className="border border-black/10 rounded-2xl px-5 md:px-6 data-[state=open]:border-pink-500/40 data-[state=open]:bg-pink-50/30 transition-colors"
          >
            <AccordionTrigger className="text-left text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] text-black hover:text-pink-600 transition-colors font-medium py-5">
              Is the hair 100% virgin human hair?
            </AccordionTrigger>
            <AccordionContent className="text-black/70 text-[0.875rem] sm:text-[0.9rem] leading-relaxed pb-5">
              Yes. Every piece is made from 100% virgin human hair — no synthetic blends. This gives you a natural look, soft texture, and the ability to style with heat.
            </AccordionContent>
          </AccordionItem>

          {/* 2. Keep – important */}
          <AccordionItem
            value="item-2"
            className="border border-black/10 rounded-2xl px-5 md:px-6 data-[state=open]:border-pink-500/40 data-[state=open]:bg-pink-50/30 transition-colors"
          >
            <AccordionTrigger className="text-left text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] text-black hover:text-pink-600 transition-colors font-medium py-5">
              Do you ship worldwide?
            </AccordionTrigger>
            <AccordionContent className="text-black/70 text-[0.875rem] sm:text-[0.9rem] leading-relaxed pb-5">
              Yes. We ship internationally to most countries. Delivery times and shipping costs depend on your location. You’ll see exact options at checkout.
            </AccordionContent>
          </AccordionItem>

          {/* 3. Updated – more relevant */}
          <AccordionItem
            value="item-3"
            className="border border-black/10 rounded-2xl px-5 md:px-6 data-[state=open]:border-pink-500/40 data-[state=open]:bg-pink-50/30 transition-colors"
          >
            <AccordionTrigger className="text-left text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] text-black hover:text-pink-600 transition-colors font-medium py-5">
              Can I heat-style the hair?
            </AccordionTrigger>
            <AccordionContent className="text-black/70 text-[0.875rem] sm:text-[0.9rem] leading-relaxed pb-5">
              Absolutely. Because it’s 100% virgin human hair, you can safely use flat irons, curling wands, and blow dryers. Just use a heat protectant and avoid excessive heat.
            </AccordionContent>
          </AccordionItem>

          {/* 4. Updated – very common question */}
          <AccordionItem
            value="item-4"
            className="border border-black/10 rounded-2xl px-5 md:px-6 data-[state=open]:border-pink-500/40 data-[state=open]:bg-pink-50/30 transition-colors"
          >
            <AccordionTrigger className="text-left text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] text-black hover:text-pink-600 transition-colors font-medium py-5">
              How do I care for my wig or extensions?
            </AccordionTrigger>
            <AccordionContent className="text-black/70 text-[0.875rem] sm:text-[0.9rem] leading-relaxed pb-5">
              Wash gently with sulfate-free shampoo, condition regularly, and air dry whenever possible. Detangle with a wide-tooth comb starting from the ends. With proper care, your hair can last 12 months or longer.
            </AccordionContent>
          </AccordionItem>

          {/* 5. New – highly relevant */}
          <AccordionItem
            value="item-5"
            className="border border-black/10 rounded-2xl px-5 md:px-6 data-[state=open]:border-pink-500/40 data-[state=open]:bg-pink-50/30 transition-colors"
          >
            <AccordionTrigger className="text-left text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] text-black hover:text-pink-600 transition-colors font-medium py-5">
              Are the wigs beginner-friendly?
            </AccordionTrigger>
            <AccordionContent className="text-black/70 text-[0.875rem] sm:text-[0.9rem] leading-relaxed pb-5">
              Yes. Most of our wigs come pre-plucked and ready to wear. We also include simple installation guides so even first-time users can get a natural, secure fit.
            </AccordionContent>
          </AccordionItem>

          {/* 6. Keep / slightly improved */}
          <AccordionItem
            value="item-6"
            className="border border-black/10 rounded-2xl px-5 md:px-6 data-[state=open]:border-pink-500/40 data-[state=open]:bg-pink-50/30 transition-colors"
          >
            <AccordionTrigger className="text-left text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] text-black hover:text-pink-600 transition-colors font-medium py-5">
              Do you accept returns or exchanges?
            </AccordionTrigger>
            <AccordionContent className="text-black/70 text-[0.875rem] sm:text-[0.9rem] leading-relaxed pb-5">
              Yes. We accept returns on unused, unaltered items in their original condition within the return window. Please review our full returns policy for details.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;