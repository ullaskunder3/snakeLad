"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

interface SessionData {
  user: {
    username: string;
    email: string;
  };
}

export default function User(): ReactElement {
  const router = useRouter();
  const { data: session } = useSession<any>();

  if (!session) {
    router.push("/signin");
  }

  return (
    <div>
      <h1>Home</h1>
      {JSON.stringify(session)}
    </div>
  );
}
