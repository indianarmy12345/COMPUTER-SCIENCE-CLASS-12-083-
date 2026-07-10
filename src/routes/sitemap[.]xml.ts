import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { courses } from "@/lib/courses";

const BASE_URL = "https://cslearners.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/learn", changefreq: "weekly", priority: "0.9" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/playground", changefreq: "monthly", priority: "0.8" },
          { path: "/xii/functions", changefreq: "monthly", priority: "0.9" },
          { path: "/xii/exceptions", changefreq: "monthly", priority: "0.9" },
          { path: "/xii/file-handling", changefreq: "monthly", priority: "0.9" },
          { path: "/xii/stacks", changefreq: "monthly", priority: "0.9" },
          { path: "/xii/dbms", changefreq: "monthly", priority: "0.9" },
          { path: "/xii/python-sql", changefreq: "monthly", priority: "0.9" },
          { path: "/xii/networks", changefreq: "monthly", priority: "0.9" },
          { path: "/xi/computer-systems", changefreq: "monthly", priority: "0.7" },
          { path: "/xi/python-basics", changefreq: "monthly", priority: "0.7" },
          { path: "/xi/society-ethics", changefreq: "monthly", priority: "0.7" },
          ...courses
            .filter((c) => c.status === "available")
            .flatMap((c) => [
              { path: `/learn/${c.slug}`, changefreq: "weekly" as const, priority: "0.8" },
              ...c.lessons.map((l) => ({
                path: `/learn/${c.slug}/${l.slug}`,
                changefreq: "monthly" as const,
                priority: "0.7",
              })),
            ]),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
