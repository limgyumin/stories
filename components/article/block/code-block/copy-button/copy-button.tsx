"use client";

import { IoMdCopy, IoMdCheckmark } from "react-icons/io";

import { useRollbackState } from "hooks/use-rollback-state";

type Props = {
  text: string;
};

export const CopyButton = ({ text }: Props) => {
  const [isCopied, setIsCopied] = useRollbackState<boolean>(false, 1.5 * 1000);

  const handleCopyClick = () => {
    copy(text);
    setIsCopied(true);
  };

  return (
    <button
      className="flex cursor-pointer items-center gap-[2px] rounded-md px-[2px] py-[2px] text-neutral-400 opacity-100 transition-all disabled:text-green-500 group-hover:opacity-100 md:px-[6px] md:opacity-0 md:hover:bg-neutral-800"
      disabled={isCopied}
      onClick={handleCopyClick}
    >
      {isCopied ? <IoMdCheckmark size={16} /> : <IoMdCopy size={16} />}

      <div className="hidden text-[11.5px] md:block">{isCopied ? "Copied" : "Copy"}</div>
    </button>
  );
};

const copy = (text: string) => {
  if (!window.navigator) {
    return;
  }

  window.navigator.clipboard.writeText(text);
};
