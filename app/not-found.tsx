import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
        404
      </p>
      <h1 className="mt-2 font-heading text-5xl">Page not found</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        That route is not part of this demo.
      </p>
      <Button
        className="mt-8 rounded-full"
        nativeButton={false}
        render={<Link href="/" />}
      >
        Back home
      </Button>
    </div>
  );
}
