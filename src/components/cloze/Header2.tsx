import { XMarkIcon } from "@heroicons/react/24/solid";

interface ClozeHeader2Props {
  progressValue: number;
  max: number;
}

export default function ClozeHeader2({ progressValue, max }: ClozeHeader2Props) {
  return (
    <div className="flex w-full items-center bg-white-300">
      <a href="/" className="mx-2">
        <XMarkIcon className="h-8 w-8" />
      </a>
      <progress
        className="progress-success progress ml-2 mr-4 w-full"
        value={progressValue}
        max={max}
      />
    </div>
  );
}
