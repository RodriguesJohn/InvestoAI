import { useState } from "react";
import { OnboardingLayout } from "./OnboardingLayout";
import { CreateAccount } from "./CreateAccount";
import { ShareGoals } from "./ShareGoals";
import { InvestmentProfile } from "./InvestmentProfile";
import { StartJourney } from "./StartJourney";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, 3));

  const stepContent = () => {
    switch (currentStep) {
      case 0:
        return <CreateAccount onContinue={next} />;
      case 1:
        return <ShareGoals onContinue={next} />;
      case 2:
        return <InvestmentProfile onContinue={next} />;
      case 3:
        return <StartJourney onComplete={onComplete} />;
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout currentStep={currentStep}>
      {stepContent()}
    </OnboardingLayout>
  );
}
