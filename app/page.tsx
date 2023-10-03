import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "components/components/User";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      <h1>HEllo</h1>
      <pre>{JSON.stringify(session)}</pre>
      <div>
        client
        <User />
      </div>
    </div>
  );
}
