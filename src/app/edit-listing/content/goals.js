import Input from "@/components/uikit/input";
import NavigationButtons from "../components/navigation-buttons";
import Goals, { GOALS } from "@/app/edit-listing/components/goals";
import FundraisingGoal from "@/app/edit-listing/components/fundraising-goal";
import {
  useGetDataToSave,
  useInputChangeHandler,
  useSelectorChangeHandler,
} from "../components/form-handlers";

export default function Section({ onSectionChange, data, onFormDataChange }) {
  const goals = data?.goals || [];
  const fundraising_goal = {
    stage: "",
    amount: 0,
    already_raised_amount: 0,
    details: "",
    ...data?.fundraising_goal,
  };

  const handleInputChange = useInputChangeHandler(
    "fundraising_goal",
    fundraising_goal,
    onFormDataChange
  );
  const handleSelectorChange = useSelectorChangeHandler(
    "fundraising_goal",
    fundraising_goal,
    onFormDataChange
  );

  const handleGoalsChange = (updatedGoals) => {
    // Find which goal was toggled
    GOALS.forEach((goal) => {
      const isCurrentlySelected = goals.includes(goal.title);
      const isNewlySelected = updatedGoals[goal.id];

      if (isCurrentlySelected !== isNewlySelected) {
        // Use the same pattern as filter-multi-select
        const newGoals = isNewlySelected
          ? [...goals, goal.title]
          : goals.filter((item) => item !== goal.title);

        onFormDataChange({
          goals: newGoals,
        });
      }
    });
  };

  const getDataToSave = useGetDataToSave(
    null,
    ["goals"],
    { goals, fundraising_goal },
    {
      sectionFillKey: "section_2_fill",
      sectionStep: 2,
      customTransform: (data) => {
        const actualData = data.data || data;
        const goalsArray = actualData.goals || [];
        const selectedGoals = [...goalsArray];

        // Extract fundraising info as separate object only if fundraising is selected
        const fundraising_goal_data = selectedGoals.includes("Fundraising")
          ? {
              stage: actualData.fundraising_goal?.stage || "",
              amount: actualData.fundraising_goal?.amount || 0,
              already_raised_amount:
                actualData.fundraising_goal?.already_raised_amount || 0,
              details: actualData.fundraising_goal?.details || "",
            }
          : null;

        return {
          goals: selectedGoals,
          fundraising_goal: fundraising_goal_data,
        };
      },
      customValidation: () => {
        const hasSelectedGoal = goals.length > 0;

        if (!hasSelectedGoal) {
          return false;
        }

        // If fundraising is selected, validate required fields
        if (goals.includes("Fundraising")) {
          const hasStage =
            fundraising_goal.stage && fundraising_goal.stage.trim() !== "";
          const hasAmount =
            fundraising_goal.amount && Number(fundraising_goal.amount) > 0;

          if (!hasStage || !hasAmount) {
            return false;
          }
        }

        return true;
      },
    }
  );

  return (
    <>
      <div className="flex flex-col gap-4 items-start">
        <h1 className="title-l">Goals</h1>
        <p className="paragraph-l">What are you looking for?</p>
      </div>
      <div className="flex flex-col">
        <FundraisingGoal
          isToggled={goals.includes("Fundraising")}
          stage={fundraising_goal?.stage}
          amount={fundraising_goal?.amount}
          alreadyRaisedAmount={fundraising_goal?.already_raised_amount}
          details={fundraising_goal?.details}
          onToggleChange={() => {
            const currentGoals = [...goals];
            const fundraisingIndex = currentGoals.indexOf("Fundraising");

            if (fundraisingIndex > -1) {
              currentGoals.splice(fundraisingIndex, 1);
              onFormDataChange({
                goals: currentGoals,
              });
            } else {
              currentGoals.push("Fundraising");
              onFormDataChange({
                goals: currentGoals,
              });
            }
          }}
          onInputChange={handleInputChange}
          onSelectorChange={handleSelectorChange}
        />

        <Goals
          selectedGoals={{
            customers: goals.includes("Customers"),
            partnerships: goals.includes("Partnerships"),
            mentorship: goals.includes("Mentorship"),
            cofounders: goals.includes("Co-founder(s)"),
            selling: goals.includes("Selling/exit"),
          }}
          onGoalsChange={handleGoalsChange}
        />
      </div>
      <NavigationButtons
        nextSection="Contact info"
        getDataToSave={getDataToSave}
        step={2}
        onSectionChange={onSectionChange}
      />
    </>
  );
}
