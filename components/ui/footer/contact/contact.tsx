import { PLATFORMS } from "./contact.constants";

export const Contact = () => {
  return (
    <div className="flex items-center">
      {PLATFORMS.map((platform) => (
        <div
          key={platform.name}
          className="border-muted-foreground border-l px-2 first:border-none first:pl-0 last:pr-0"
        >
          <a className="text-muted-foreground text-lg" href={platform.url} target="_blank">
            {platform.icon}
          </a>
        </div>
      ))}
    </div>
  );
};
