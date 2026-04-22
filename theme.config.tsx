import type { ReactNode } from "react";
import { DOCS_REPOSITORY_BASE, REPO_URL } from "./lib/site-config";

type ThemeConfig = {
  docsRepositoryBase: string;
  darkMode: boolean;
  navigation: boolean;
  editLink: ReactNode;
  feedback: {
    content: ReactNode;
    labels: string;
  };
  sidebar: {
    defaultMenuCollapseLevel: number;
    autoCollapse: boolean;
    defaultOpen: boolean;
    toggleButton: boolean;
  };
  toc: {
    title: ReactNode;
    backToTop: ReactNode;
    float: boolean;
  };
};

const themeConfig: ThemeConfig = {
  docsRepositoryBase: DOCS_REPOSITORY_BASE,
  darkMode: true,
  navigation: true,
  editLink: REPO_URL ? "Editar esta pagina" : null,
  feedback: {
    content: "Tenes una mejora o una duda? Danos feedback.",
    labels: "feedback,documentacion",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
    defaultOpen: true,
    toggleButton: true,
  },
  toc: {
    title: "En esta pagina",
    backToTop: "Volver arriba",
    float: true,
  },
};

export default themeConfig;
