"use client"

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface MetricDisplayProps {
  value: number;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export function MetricDisplay({ value, label, suffix, icon }: MetricDisplayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      const increment = (end - start) / totalFrames;

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="flex items-start">
        {icon && (
          <div className="mr-2 text-theme">
            {icon}
          </div>
        )}
        <div>
          <motion.div 
            className="flex items-baseline"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="text-3xl md:text-4xl font-bold text-theme">
              {displayValue}
            </span>
            {suffix && (
              <span className="text-xl text-theme ml-1">{suffix}</span>
            )}
          </motion.div>
          <motion.p
            className="text-sm text-soft-cream/80 mt-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {label}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

