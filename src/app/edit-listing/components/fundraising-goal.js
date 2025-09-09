import Input from "@/components/uikit/input";
import Selector from "@/components/uikit/selector";
import GradientIcon from "@/components/uikit/gradient-icon";
import { ToggleSwitcher } from "@/components/uikit/toggle-switcher";

export default function FundraisingGoal({
  isToggled,
  stage,
  amount,
  alreadyRaisedAmount,
  details,
  onToggleChange,
  onInputChange,
  onSelectorChange,
}) {
  return (
    <>
      <div className="table-record">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-4 justify-between items-center w-full">
            <div className="flex flex-row gap-4 items-center">
              <GradientIcon
                src="/assets/3d-icons/fundraising.webp"
                alt="Fundraising"
                iconSize={36}
                containerSize={13}
                disabled={!isToggled}
              />
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="title-s">Fundraising</h3>
                <p className="text-sm text-brand-gray-800">
                  Raise money to grow faster
                </p>
              </div>
            </div>
            <ToggleSwitcher checked={isToggled} onChange={onToggleChange} />
          </div>
          {isToggled && (
            <div className="flex flex-col gap-8 py-4">
              <Selector
                name="fundraising_goal_stage"
                label="Stage"
                value={stage}
                onChange={(value) =>
                  onSelectorChange("fundraising_goal_stage", value)
                }
                options={["Pre-seed", "Seed", "Series A", "Series B"]}
                placeholder="Select your fundraising round"
                required
              />
              <div className="relative">
                <Input
                  type="number"
                  name="fundraising_goal_amount"
                  label="Raising amount"
                  value={amount}
                  onChange={onInputChange}
                  placeholder="How much money are you raising?"
                  required
                />
                <div className="absolute bg-white pl-2 right-3 mt-4.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-right">
                  USD
                </div>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  name="fundraising_goal_already_raised_amount"
                  label="Already raised/committed"
                  value={alreadyRaisedAmount}
                  onChange={onInputChange}
                  placeholder="How much is already raised or committed?"
                  optional
                />
                <div className="absolute bg-white pl-2 right-3 mt-4.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-right">
                  USD
                </div>
              </div>
              <Input
                name="fundraising_goal_details"
                label="Fundraising details"
                value={details}
                onChange={onInputChange}
                placeholder="Share any valuable fundraising details"
                optional
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
