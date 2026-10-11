import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/doctor",
  "/services",
  "/conditions",
  "/patient-guides",
  "/book",
  "/contact",

  // Conditions
  "/conditions/ear",
  "/conditions/nose-sinus",
  "/conditions/throat-voice",
  "/conditions/vertigo-balance",
  "/conditions/pediatric-ent",
  "/conditions/head-neck",

  // Services
  "/services/allergy-immunotherapy",
  "/services/endoscopy",
  "/services/vertigo-balance",
  "/services/minor-ent-procedures",
  "/services/head-neck",
  "/services/emergency-ent-care",

  // Patient guides
  "/patient-guides/ear",
  "/patient-guides/nose-sinus",
  "/patient-guides/vertigo",
  "/patient-guides/throat-voice",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority:
      route === "/"
        ? 1
        : route === "/doctor" ||
            route === "/book" ||
            route === "/services" ||
            route === "/conditions"
          ? 0.9
          : 0.7,
  }));
}