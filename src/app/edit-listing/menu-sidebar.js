"use client";
import MenuItem from "@/components/uikit/menu-item";
import SideBar from "@/components/global-elements/side-bar";

export default function Menu({
  activeSection,
  onSectionChange,
  sectionsCompleted,
}) {
  const getSectionIcon = (sectionName, defaultIcon) => {
    return sectionsCompleted?.[sectionName] ? "✅" : defaultIcon;
  };

  const allRequiredSectionsCompleted =
    sectionsCompleted?.["Main info"] &&
    sectionsCompleted?.["Goals"] &&
    sectionsCompleted?.["Contact info"];

  return (
    <SideBar position="left">
      <div className="flex flex-col gap-2" key={activeSection}>
        <MenuItem
          icon={getSectionIcon("Main info", "👋")}
          label="Main info"
          active={activeSection === "Main info"}
          onClick={() => onSectionChange("Main info")}
        />
        <MenuItem
          icon={getSectionIcon("Goals", "🎯️")}
          label="Goals"
          active={activeSection === "Goals"}
          onClick={() => onSectionChange("Goals")}
        />
        <MenuItem
          icon={getSectionIcon("Contact info", "✉️")}
          label="Contact info"
          active={activeSection === "Contact info"}
          onClick={() => onSectionChange("Contact info")}
        />
        <MenuItem
          icon={getSectionIcon("Submission", "🔥")}
          label="Submission"
          active={activeSection === "Submission"}
          disabled={!allRequiredSectionsCompleted}
          onClick={() =>
            allRequiredSectionsCompleted && onSectionChange("Submission")
          }
        />
      </div>
    </SideBar>
  );
}
