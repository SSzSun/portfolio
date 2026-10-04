import { AdminProvider } from "@/components/admin/AdminProvider";
import { LoginDialog } from "@/components/admin/LoginDialog";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { VisitProvider } from "@/components/layout/VisitProvider";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { getExperiences, getProjects, getVisitCount } from "@/lib/data";
import { getIsAdmin } from "@/lib/supabase/server";

// Content comes from Supabase per request (admin sees hidden rows).
export const dynamic = "force-dynamic";

export default async function Home() {
  const [isAdmin, experiences, projects, visits] = await Promise.all([
    getIsAdmin(),
    getExperiences(),
    getProjects(),
    getVisitCount(),
  ]);

  return (
    <AdminProvider isAdmin={isAdmin}>
      <VisitProvider initial={visits}>
        <Navbar />
        <main id="main">
          <Hero />
          <Experience items={experiences} />
          <Projects items={projects} />
        </main>
        <Footer />
        <LoginDialog />
      </VisitProvider>
    </AdminProvider>
  );
}
