export default function ClinicStructuredData() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": `${siteUrl}/#clinic`,
        name: "Dr. Mrudula ENT Care",
        url: `${siteUrl}/doctor`,
        image: `${siteUrl}/images/brand/mrudula-ent-care-logo.png`,
        telephone: "+919849835822",
        medicalSpecialty: "Otolaryngology",
        address: {
          "@type": "PostalAddress",
          streetAddress: "4th Floor, Westend, Road No. 36, Venkatagiri",
          addressLocality: "Jubilee Hills",
          addressRegion: "Telangana",
          postalCode: "500033",
          addressCountry: "IN",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "16:00",
            closes: "21:00",
          },
        ],
      },

      {
        "@type": "Physician",
        "@id": `${siteUrl}/#doctor`,
        name: "Dr. Mrudula Mukiri",
        medicalSpecialty: "Otolaryngology",
        worksFor: {
          "@id": `${siteUrl}/#clinic`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}