import { readFile } from "node:fs/promises";
import path from "node:path";

const bannedTerms = ["inquilino", "inquilinos"];

const chapters = [
  {
    name: "Capitulo 1",
    path: "content/parte-i-fundamentos-tecnicos-base/capitulo-01-comunicacion-y-contratos.mdx",
    minLines: 140,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## REST y diseno de APIs",
      "## Versionado de APIs: criterio de arquitecto",
      "## Proxies y Load Balancing",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "tenant",
      "tenant_id",
      "REST",
      "JWT",
      "RBAC",
      "load balancer",
      "reverse proxy",
      "versionado",
    ],
  },
  {
    name: "Capitulo 2",
    path: "content/parte-i-fundamentos-tecnicos-base/capitulo-02-persistencia-y-cache.mdx",
    minLines: 140,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## PostgreSQL y Prisma (motores relacionales)",
      "## Caching y Redis",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "postgresql",
      "prisma",
      "redis",
      "cache-aside",
      "ttl",
      "explain",
      "n+1",
      "tenant",
      "tenant_id",
    ],
  },
  {
    name: "Capitulo 3",
    path: "content/parte-i-fundamentos-tecnicos-base/capitulo-03-identidad-y-seguridad.mdx",
    minLines: 140,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## JWT (JSON Web Tokens)",
      "## RBAC (Role-Based Access Control)",
      "## Controles de seguridad de nivel arquitectonico",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "jwt",
      "rbac",
      "tenant",
      "tenant_id",
      "jti",
      "refresh token",
      "access token",
      "minimo privilegio",
      "auditoria",
    ],
  },
  {
    name: "Capitulo 4",
    path: "content/parte-i-fundamentos-tecnicos-base/capitulo-04-infraestructura-e-ia.mdx",
    minLines: 140,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Docker y contenedores",
      "## LLMs, prompts y RAG",
      "## Riesgo central: aislamiento multi-tenant en IA",
      "## Adapters para proveedores de IA",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "docker",
      "llm",
      "prompt",
      "rag",
      "tenant",
      "tenant_id",
      "adapter",
      "retrieval",
    ],
  },
  {
    name: "Capitulo 5",
    path: "content/parte-i-fundamentos-tecnicos-base/capitulo-05-el-arte-del-desacoplamiento.mdx",
    minLines: 140,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Dependencias y modularidad",
      "## Adapters: prepararte para el cambio",
      "## Queues y workers (desacoplamiento temporal)",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "modularidad",
      "adapter",
      "queue",
      "worker",
      "bullmq",
      "tenant",
      "job_id",
      "idempotencia",
    ],
  },
  {
    name: "Capitulo 6",
    path: "content/parte-ii-arquitectura-base-y-diseno-de-codigo/capitulo-06-del-monolito-al-monolito-modular.mdx",
    minLines: 130,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Estructura de carpetas profesional",
      "## Bounded Contexts y fronteras de dominio",
      "## Reglas de dependencia (arquitectura viva)",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "nestjs",
      "bounded context",
      "modulo",
      "dominio",
      "tenant",
      "microservicios",
      "dependencia",
    ],
  },
  {
    name: "Capitulo 7",
    path: "content/parte-ii-arquitectura-base-y-diseno-de-codigo/capitulo-07-clean-architecture-y-arquitectura-hexagonal.mdx",
    minLines: 130,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Dominio: logica de negocio pura",
      "## Aplicacion: casos de uso y orquestacion",
      "## Infraestructura: NestJS como detalle",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "clean",
      "hexagonal",
      "dominio",
      "casos de uso",
      "puertos",
      "adaptadores",
      "nestjs",
    ],
  },
  {
    name: "Capitulo 8",
    path: "content/parte-ii-arquitectura-base-y-diseno-de-codigo/capitulo-08-el-patron-repository-en-nestjs.mdx",
    minLines: 130,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Repository: contratos de persistencia del dominio",
      "## Mappers: traducir sin contaminar",
      "## Implementacion en NestJS (enfoque pragmatico)",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "repository",
      "mapper",
      "prisma",
      "typeorm",
      "tenant_id",
      "dominio",
      "integracion",
    ],
  },
  {
    name: "Capitulo 9",
    path: "content/parte-ii-arquitectura-base-y-diseno-de-codigo/capitulo-09-estrategias-de-versionado-de-apis.mdx",
    minLines: 130,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Estrategias principales",
      "## Criterio de seleccion por contexto",
      "## Deprecacion y ciclo de vida",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "versionado",
      "path",
      "headers",
      "deprecacion",
      "backward",
      "tenant_id",
      "api",
    ],
  },
  {
    name: "Capitulo 10",
    path: "content/parte-iii-ingenieria-saas-y-multi-tenancy/capitulo-10-modelos-de-aislamiento-de-datos.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "database-per-tenant",
      "schema-per-tenant",
      "shared-tables",
      "rls",
      "tenant_id",
      "postgres",
      "control plane",
      "hibrid",
    ],
  },
  {
    name: "Capitulo 11",
    path: "content/parte-iii-ingenieria-saas-y-multi-tenancy/capitulo-11-identidad-y-contexto-del-tenant.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "tenant context",
      "tenant_id",
      "subdominio",
      "headers",
      "middleware",
      "guards",
    ],
  },
  {
    name: "Capitulo 12",
    path: "content/parte-iii-ingenieria-saas-y-multi-tenancy/capitulo-12-seguridad-y-auditoria-enterprise.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "audit",
      "tenant_id",
      "cifrado",
      "compliance",
      "trace_id",
      "retencion",
      "opentelemetry",
    ],
  },
  {
    name: "Capitulo 13",
    path: "content/parte-iv-sistemas-modernos-y-escalabilidad/capitulo-13-event-driven-architecture.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "eda",
      "event",
      "rabbitmq",
      "kafka",
      "idempot",
      "tenant_id",
    ],
  },
  {
    name: "Capitulo 14",
    path: "content/parte-iv-sistemas-modernos-y-escalabilidad/capitulo-14-colas-y-workers.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "bullmq",
      "retry",
      "dlq",
      "tenant_id",
      "worker",
      "job",
    ],
  },
  {
    name: "Capitulo 15",
    path: "content/parte-iv-sistemas-modernos-y-escalabilidad/capitulo-15-resiliencia-y-observabilidad.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "iac",
      "terraform",
      "cdk",
      "tenant lifecycle",
      "control plane",
      "slo",
    ],
  },
  {
    name: "Capitulo 16",
    path: "content/parte-v-arquitectura-orientada-a-ia/capitulo-16-multi-tenant-rag.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "rag",
      "tenant_id",
      "silo",
      "pool",
      "bridge",
      "leakage",
      "pre-filtering",
      "post-filtering",
    ],
  },
  {
    name: "Capitulo 17",
    path: "content/parte-v-arquitectura-orientada-a-ia/capitulo-17-orquestacion-de-agentes-de-ia.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "supervisor",
      "network",
      "custom",
      "agente",
      "tool",
      "tenant",
      "human-in-the-loop",
      "checkpoint",
    ],
  },
  {
    name: "Capitulo 18",
    path: "content/parte-v-arquitectura-orientada-a-ia/capitulo-18-frameworks-de-orquestacion.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "langgraph",
      "crewai",
      "autogen",
      "memoria",
      "lock-in",
      "framework",
    ],
  },
  {
    name: "Capitulo 19",
    path: "content/parte-vi-el-arquitecto-en-el-mundo-real/capitulo-19-antipatrones-de-arquitectura.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "jumble",
      "stovepipe",
      "swiss army knife",
      "deuda",
      "diagnost",
      "arquitect",
    ],
  },
  {
    name: "Capitulo 20",
    path: "content/parte-vi-el-arquitecto-en-el-mundo-real/capitulo-20-evolucion-y-mantenimiento.mdx",
    minLines: 120,
    requiredHeadings: [
      "## Contexto",
      "## Que aprendera el lector",
      "## Introduccion tecnica",
      "## Trade-offs y criterios de decision",
      "## Checklist de arquitectura para este capitulo",
      "## Estructura lista para expandir",
    ],
    requiredTerms: [
      "microservicios",
      "tenant",
      "onboarding",
      "offboarding",
      "mantenimiento",
      "rollback",
    ],
  },
];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

for (const chapter of chapters) {
  const source = await readFile(path.join(process.cwd(), chapter.path), "utf8");

  for (const heading of chapter.requiredHeadings) {
    if (!source.includes(heading)) {
      fail(`[${chapter.name}] Falta seccion requerida: ${heading}`);
    }
  }

  const lower = source.toLowerCase();

  for (const term of chapter.requiredTerms) {
    if (!lower.includes(term.toLowerCase())) {
      fail(`[${chapter.name}] Falta termino clave: ${term}`);
    }
  }

  for (const term of bannedTerms) {
    if (lower.includes(term)) {
      fail(`[${chapter.name}] Termino no permitido detectado: ${term}`);
    }
  }

  const lines = source.split("\n").length;
  if (lines < chapter.minLines) {
    fail(
      `[${chapter.name}] Capitulo con poca profundidad: ${lines} lineas (minimo esperado: ${chapter.minLines}).`,
    );
  }
}

if (!process.exitCode) {
  console.log(
    "OK: Capitulos 1 al 20 consistentes con guia editorial y cobertura tecnica.",
  );
}
