import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site-config";

const routes = [
  "",
  "/introduccion",
  "/parte-i-fundamentos-tecnicos-base/capitulo-01-comunicacion-y-contratos",
  "/parte-i-fundamentos-tecnicos-base/capitulo-02-persistencia-y-cache",
  "/parte-i-fundamentos-tecnicos-base/capitulo-03-identidad-y-seguridad",
  "/parte-i-fundamentos-tecnicos-base/capitulo-04-infraestructura-e-ia",
  "/parte-i-fundamentos-tecnicos-base/capitulo-05-el-arte-del-desacoplamiento",
  "/parte-ii-arquitectura-base-y-diseno-de-codigo/capitulo-06-del-monolito-al-monolito-modular",
  "/parte-ii-arquitectura-base-y-diseno-de-codigo/capitulo-07-clean-architecture-y-arquitectura-hexagonal",
  "/parte-ii-arquitectura-base-y-diseno-de-codigo/capitulo-08-el-patron-repository-en-nestjs",
  "/parte-ii-arquitectura-base-y-diseno-de-codigo/capitulo-09-estrategias-de-versionado-de-apis",
  "/parte-iii-ingenieria-saas-y-multi-tenancy/capitulo-10-modelos-de-aislamiento-de-datos",
  "/parte-iii-ingenieria-saas-y-multi-tenancy/capitulo-11-identidad-y-contexto-del-tenant",
  "/parte-iii-ingenieria-saas-y-multi-tenancy/capitulo-12-seguridad-y-auditoria-enterprise",
  "/parte-iv-sistemas-modernos-y-escalabilidad/capitulo-13-event-driven-architecture",
  "/parte-iv-sistemas-modernos-y-escalabilidad/capitulo-14-colas-y-workers",
  "/parte-iv-sistemas-modernos-y-escalabilidad/capitulo-15-resiliencia-y-observabilidad",
  "/parte-v-arquitectura-orientada-a-ia/capitulo-16-multi-tenant-rag",
  "/parte-v-arquitectura-orientada-a-ia/capitulo-17-orquestacion-de-agentes-de-ia",
  "/parte-v-arquitectura-orientada-a-ia/capitulo-18-frameworks-de-orquestacion",
  "/parte-vi-el-arquitecto-en-el-mundo-real/capitulo-19-antipatrones-de-arquitectura",
  "/parte-vi-el-arquitecto-en-el-mundo-real/capitulo-20-evolucion-y-mantenimiento",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
