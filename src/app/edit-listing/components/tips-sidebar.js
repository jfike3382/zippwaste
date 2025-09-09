import SideBar from "@/components/global-elements/side-bar";

const tipsList = [
  {
    section: "Main info",
    tip: "That information helps people quickly understand what your startup is about.",
  },
  {
    section: "Goals",
    tip: "Select your goals so the right people can find and contact you.",
  },
  {
    section: "Contact info",
    tip: "Introduce the best person to contact behind the startup.",
  },
  {
    section: "Submission",
    tip: "Final review and confirmation. Once submitted, your profile will be visible to investors on Raizer.",
  },
];

export default function TipsSidebar({ activeSection }) {
  const tipObj = tipsList.find((t) => t.section === activeSection);
  const tip = tipObj ? tipObj.tip : "";

  return (
    <SideBar position="right">
      <div className="flex flex-col gap-3 items-start">
        <div className="tag blue">Tip</div>
        <p dangerouslySetInnerHTML={{ __html: tip }} />
      </div>
    </SideBar>
  );
}
