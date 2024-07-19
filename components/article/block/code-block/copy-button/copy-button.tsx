"use client";

import { IoMdCopy } from "react-icons/io";

type Props = {
  text: string;
};

export const CopyButton = ({ text }: Props) => {
  const handleCopyClick = () => copy(text);

  return (
    <button
      className="flex cursor-pointer items-center gap-[2px] rounded-md px-[2px] py-[2px] text-neutral-400 opacity-100 transition-all group-hover:opacity-100 md:px-[6px] md:opacity-0 md:hover:bg-neutral-800"
      onClick={handleCopyClick}
    >
      <IoMdCopy size={16} />
      <div className="hidden text-[11.5px] md:block">Copy</div>
    </button>
  );
};

const copy = (text: string) => {
  if (!window.navigator) {
    return;
  }

  window.navigator.clipboard.writeText(text);
};
