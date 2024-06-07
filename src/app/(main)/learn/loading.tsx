import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader size={48} className=" text-muted-foreground animate-spin" />
    </div>
  );
}
