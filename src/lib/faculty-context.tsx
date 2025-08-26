import { createContext, useContext, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FACULTIES, FacultyDefinition, getFacultyBySlug } from "@/lib/faculties";

export type FacultyContextValue = {
  faculty: FacultyDefinition;
};

const defaultFaculty = FACULTIES[0];

const FacultyContext = createContext<FacultyContextValue>({ faculty: defaultFaculty });

export const useFaculty = () => useContext(FacultyContext);

export const FacultyProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const params = useParams();

  const faculty = useMemo(() => {
    const slugFromParams = (params as any)?.slug as string | undefined;
    if (slugFromParams) {
      const bySlug = getFacultyBySlug(slugFromParams);
      if (bySlug) return bySlug;
    }

    // infer from path prefix: /faculties/:slug
    const match = location.pathname.match(/^\/faculties\/([^\/]*)/);
    if (match && match[1]) {
      const byMatch = getFacultyBySlug(match[1]);
      if (byMatch) return byMatch;
    }

    // default to medicine (root site)
    return defaultFaculty;
  }, [location.pathname, params]);

  const value: FacultyContextValue = { faculty };
  return <FacultyContext.Provider value={value}>{children}</FacultyContext.Provider>;
};

