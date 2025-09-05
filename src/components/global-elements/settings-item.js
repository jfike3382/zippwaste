import Button from "@/uikit/button";

export default function SettingsItem({ title, subtitle, buttonText, onClick }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-brand-gray-800">{subtitle}</p>
      </div>
      <Button variant="secondary" size="s" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
}
