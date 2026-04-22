const DEFAULT_SITE_URL = "https://el-arquitecto-moderno.vercel.app";

function ensureHttps(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) {
    return DEFAULT_SITE_URL;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/$/, "");
  }

  return `https://${trimmed.replace(/\/$/, "")}`;
}

function normalizeOptionalUrl(url: string | undefined): string | null {
  if (!url || !url.trim()) {
    return null;
  }

  return ensureHttps(url);
}

export const SITE_URL = ensureHttps(process.env.NEXT_PUBLIC_SITE_URL ?? "");

export const REPO_URL = normalizeOptionalUrl(process.env.NEXT_PUBLIC_REPO_URL);

export const DOCS_REPOSITORY_BASE = REPO_URL
  ? `${REPO_URL}/tree/main`
  : SITE_URL;
