import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { loadingSteps } from "@/lib/mockData";

interface LoadingSequenceProps {
  onComplete: () => void;
}

export function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= loadingSteps.length) {
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrentStep((s) => s + 1), loadingSteps[currentStep].duration);
    return () => clearTimeout(t);
  }, [currentStep, onComplete]);

  const progress = (currentStep / loadingSteps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
    >
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="inline-block"
          >
            <Loader2 className="h-10 w-10 text-primary" />
          </motion.div>
          <h2 className="text-lg font-semibold text-foreground">Computing Explanations</h2>
        </div>

        <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {loadingSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-sm"
              >
                {i < currentStep ? (
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                ) : i === currentStep ? (
                  <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-border shrink-0" />
                )}
                <span className={i <= currentStep ? "text-foreground" : "text-muted-foreground"}>
                  {step.label}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
