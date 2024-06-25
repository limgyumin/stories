import { PLATFORMS } from "./contact.constants";

export const Contact = () => {
  return (
    <div className="flex items-center">
      {PLATFORMS.map((platform) => (
        <div key={platform.name} className="border-l border-gray-300 px-2 first:border-none first:pl-0 last:pr-0">
          <a className="text-lg text-gray-500" href={platform.url} target="_blank">
            {platform.icon}
          </a>
        </div>
      ))}
    </div>
  );
};
