import GradientIcon from "@/components/uikit/gradient-icon";
import { ToggleSwitcher } from "@/components/uikit/toggle-switcher";
import { useState, useEffect } from "react";

export const GOALS = [
  {
    id: "customers",
    title: "Customers",
    description: "Get more customers & increase your revenue",
    icon: "/assets/3d-icons/customers.webp",
  },
  {
    id: "partnerships",
    title: "Partnerships",
    description: "Team up with other businesses & investors",
    icon: "/assets/3d-icons/partnerships.webp",
  },
  {
    id: "mentorship",
    title: "Mentorship",
    description: "Learn from experienced people",
    icon: "/assets/3d-icons/mentorship.webp",
  },
  {
    id: "cofounders",
    title: "Co-founder(s)",
    description: "Find your founding partner",
    icon: "/assets/3d-icons/cofounders.webp",
  },
  {
    id: "selling",
    title: "Selling/exit",
    description: "Ready to sell or get acquired",
    icon: "/assets/3d-icons/selling.webp",
  },
];

export default function Goals({ selectedGoals = {}, onGoalsChange }) {
  const [localSelectedGoals, setLocalSelectedGoals] = useState(selectedGoals);

  useEffect(() => {
    setLocalSelectedGoals(selectedGoals);
  }, [selectedGoals]);

  const toggleGoal = (goalId) => {
    const updatedGoals = { ...localSelectedGoals };
    updatedGoals[goalId] = !updatedGoals[goalId];

    setLocalSelectedGoals(updatedGoals);
    onGoalsChange && onGoalsChange(updatedGoals);
  };

  const isGoalSelected = (goalId) => {
    return localSelectedGoals[goalId] || false;
  };

  return (
    <div className="flex flex-col">
      {GOALS.map((goal) => (
        <div key={goal.id} className="table-record">
          <GradientIcon
            src={goal.icon}
            alt={goal.title}
            iconSize={36}
            containerSize={13}
            disabled={!isGoalSelected(goal.id)}
          />
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="title-s">{goal.title}</h3>
            <p className="text-sm text-neutral-800">{goal.description}</p>
          </div>
          <ToggleSwitcher
            checked={isGoalSelected(goal.id)}
            onChange={() => toggleGoal(goal.id)}
          />
        </div>
      ))}
    </div>
  );
}
