import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <Button asChild>
        <Link href={"/auth"}>Login</Link>
      </Button>
    </div>
  );
};

export default Page;
