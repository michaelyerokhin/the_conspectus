import { getCurrentUser } from "@/lib/auth";
import KnowledgeGraphClient from "./KnowledgeGraphClient";

/**
 * Server Component: Fetches user data and passes it to the client component
 */
export default async function KnowledgeGraphPage() {
  const currentUser = await getCurrentUser();

  return <KnowledgeGraphClient currentUser={currentUser} />;
}
