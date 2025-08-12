import { cookies } from "next/headers";

import HomepageLayout from "@/components/layout/HomepageLayout";
import { CourseClient } from "./CourseClient";

// Server-side language detection
function getLanguageFromCookies() {
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang");
  return langCookie?.value || "en";
}

const CoursesPage = ({ params }) => {
  const lang = getLanguageFromCookies();
  return (
    <HomepageLayout currentPage="programs" lang={lang}>
      <CourseClient lang={lang} id={params.course_id} />
    </HomepageLayout>
  );
};

export default CoursesPage;
