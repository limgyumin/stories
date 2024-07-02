import { PLATFORMS } from "./contact.constants";

export const Contact = () => {
  return (
    <div className="flex items-center">
      {PLATFORMS.map((platform) => (
        <div
          key={platform.name}
          className="border-l border-muted-foreground px-2 first:border-none first:pl-0 last:pr-0"
        >
          <a className="text-lg text-muted-foreground" href={platform.url} target="_blank" title={platform.title}>
            {platform.icon}
          </a>
        </div>
      ))}
    </div>
  );
};
