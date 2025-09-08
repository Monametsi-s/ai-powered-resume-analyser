import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const generateUUID = () => crypto.randomUUID();

export function safeRedirect(to?: string | null, defaultPath = "/"): string {
  if (!to || typeof to !== "string") return defaultPath;

  // Reject double-slash (protocol-relative), absolute URLs, backslashes, newline injection
  if (to.startsWith("//") || to.startsWith("http:") || to.startsWith("https:")) return defaultPath;
  if (!to.startsWith("/")) return defaultPath;
  if (to.includes("\\") || to.includes("\n") || to.includes("\r")) return defaultPath;

  // Basic normalization: prevent paths that look like "/\u0000" etc
  try {
    const decoded = decodeURIComponent(to);
    if (decoded.includes("javascript:")) return defaultPath;
  } catch {
    return defaultPath;
  }

  // Good to go
  return to;
}

// New helpers: validate UUIDs and filesystem paths to prevent path injection
export function isValidUUID(id?: string | null): id is string {
  if (!id || typeof id !== "string") return false;
  // simple v4 UUID pattern (case-insensitive)
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export function isSafeFsPath(p?: string | null): p is string {
  if (!p || typeof p !== "string") return false;
  // Reject absolute paths, protocol/scheme, backslashes, and traversal segments
  if (p.startsWith("/") || p.startsWith("\\") ) return false;
  if (p.includes("..")) return false;
  if (p.includes("://")) return false;
  if (p.includes("\\") || p.includes("\n") || p.includes("\r")) return false;
  // Optionally ensure a known prefix used by your storage backend (adjust if needed)
  // e.g. return p.startsWith("uploads/") || p.startsWith("fs/");
  return true;
}

export function sanitizeFilename(name?: string | null, fallback = "file"): string {
  if (!name || typeof name !== "string") return fallback;
  // Strip path separators, control chars, limit length, allow safe chars
  const cleaned = name.replace(/[\x00-\x1F<>:"/\\|?*\u0000-\u001F]/g, "").trim();
  return cleaned.slice(0, 120) || fallback;
}

