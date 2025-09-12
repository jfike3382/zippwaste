import Button from "@/components/uikit/button";
import { useActionRouter } from "@/utils/use-action-router";

export default function HowToContact({ data }) {
  const { handleAction } = useActionRouter();

  const socialLinks = [
    { key: "website", label: "Website", url: data?.website },
    {
      key: "email",
      label: "Email",
      url: data?.email && `mailto:${data.email}`,
    },
    { key: "linkedin", label: "Linkedin", url: data?.linkedin },
    { key: "twitter", label: "X", url: data?.twitter },
    { key: "facebook", label: "Facebook", url: data?.facebook },
    { key: "crunchbase", label: "Crunchbase", url: data?.crunchbase },
  ];

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {socialLinks
        .filter((link) => link.url)
        .map(({ key, label, url }) => (
          <Button
            key={key}
            variant="secondary"
            size="m"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleAction(() => {}, e)}
          >
            {label}
          </Button>
        ))}
    </div>
  );
}
