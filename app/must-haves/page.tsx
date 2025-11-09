"use client";

import { useState, useEffect } from "react";

type ShotTemplate = {
  id: string;
  buildLabel: (p1: string, p2: string) => string;
};

const prep1Shots: ShotTemplate[] = [
  {
    id: "prep1-room-details",
    buildLabel: (p1) => `${p1}'s getting ready room & atmosphere`,
  },
  {
    id: "prep1-outfit-details",
    buildLabel: (p1) => `${p1}'s dress / outfit, shoes, jewelry, and details`,
  },
  {
    id: "prep1-hair-makeup",
    buildLabel: (p1) => `Hair and makeup finishing touches for ${p1}`,
  },
  {
    id: "prep1-getting-dressed",
    buildLabel: (p1) => `${p1} getting into outfit with a helper (parent or friend)`,
  },
  {
    id: "prep1-with-party",
    buildLabel: (p1) => `${p1} with wedding party in the getting-ready room`,
  },
  {
    id: "prep1-with-parents",
    buildLabel: (p1) => `${p1} with parents in getting-ready space`,
  },
];

const prep2Shots: ShotTemplate[] = [
  {
    id: "prep2-room-details",
    buildLabel: (p1, p2) => `${p2}'s getting ready room & atmosphere`,
  },
  {
    id: "prep2-outfit-details",
    buildLabel: (p1, p2) =>
      `${p2}'s suit / outfit, shoes, watch, boutonniere, and details`,
  },
  {
    id: "prep2-getting-dressed",
    buildLabel: (p1, p2) =>
      `${p2} getting dressed with a parent or friend helping`,
  },
  {
    id: "prep2-with-party",
    buildLabel: (p1, p2) => `${p2} with wedding party before the ceremony`,
  },
];

const ceremonyShots: ShotTemplate[] = [
  {
    id: "ceremony-room",
    buildLabel: () => "Ceremony space before guests arrive",
  },
  {
    id: "ceremony-processional",
    buildLabel: () => "Processional and walking down the aisle",
  },
  {
    id: "ceremony-partner1-down-aisle",
    buildLabel: (p1) => `${p1} walking down the aisle`,
  },
  {
    id: "ceremony-partner2-reaction",
    buildLabel: (p1, p2) => `${p2}'s reaction during the walk down the aisle`,
  },
  {
    id: "ceremony-vows",
    buildLabel: () => "Exchange of vows",
  },
  {
    id: "ceremony-rings",
    buildLabel: () => "Exchange of rings",
  },
  {
    id: "ceremony-kiss",
    buildLabel: () => "First kiss",
  },
  {
    id: "ceremony-recessional",
    buildLabel: () => "Recessional down the aisle",
  },
];

const portraitsShots: ShotTemplate[] = [
  {
    id: "portraits-couple",
    buildLabel: (p1, p2) => `${p1} & ${p2} portraits together`,
  },
  {
    id: "portraits-individual",
    buildLabel: (p1, p2) => `Individual portraits of ${p1} and ${p2}`,
  },
  {
    id: "portraits-family-core",
    buildLabel: () => "Core family groupings from your family portrait list",
  },
  {
    id: "portraits-wedding-party",
    buildLabel: () => "Wedding party group portraits",
  },
  {
    id: "portraits-extra-locations",
    buildLabel: () => "Portraits at any additional planned locations",
  },
];

const receptionShots: ShotTemplate[] = [
  {
    id: "reception-room-details",
    buildLabel: () =>
      "Reception room and decor before guests enter (tables, florals, cake, stationery)",
  },
  {
    id: "reception-cocktail-hour",
    buildLabel: () => "Candid moments during cocktail hour",
  },
  {
    id: "reception-grand-entrance",
    buildLabel: () => "Grand entrance into reception",
  },
  {
    id: "reception-first-dances",
    buildLabel: () => "First dance and parent dances",
  },
  {
    id: "reception-toasts",
    buildLabel: () => "Toasts and reactions",
  },
  {
    id: "reception-cake-cutting",
    buildLabel: () => "Cake cutting",
  },
  {
    id: "reception-dance-floor",
    buildLabel: () => "Open dance floor moments",
  },
  {
    id: "reception-table-candids",
    buildLabel: () => "Candids of guests at tables",
  },
  {
    id: "reception-exit",
    buildLabel: () => "Planned exit (sparklers, bubbles, etc., if happening)",
  },
];

const allShotTemplates: ShotTemplate[] = [
  ...prep1Shots,
  ...prep2Shots,
  ...ceremonyShots,
  ...portraitsShots,
  ...receptionShots,
];

type TimelineStoredItem = {
  id: string;
  included: boolean;
};

export default function MustHavesPage() {
  const [partner1Name, setPartner1Name] = useState("Partner 1");
  const [partner2Name, setPartner2Name] = useState("Partner 2");

  const [timelineIncludedIds, setTimelineIncludedIds] = useState<string[] | null>(
    null
  );

  const [selectedShotIds, setSelectedShotIds] = useState<string[]>(() =>
    allShotTemplates.map((t) => t.id)
  );

  // Load basics + timeline + saved must-haves
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const basicsRaw = window.localStorage.getItem("posesuiteBasics");
      if (basicsRaw) {
        const basics = JSON.parse(basicsRaw);
        if (basics.partner1Name && typeof basics.partner1Name === "string") {
          setPartner1Name(basics.partner1Name);
        }
        if (basics.partner2Name && typeof basics.partner2Name === "string") {
          setPartner2Name(basics.partner2Name);
        }
      }

      const timelineRaw = window.localStorage.getItem("posesuiteTimeline");
      if (timelineRaw) {
        const t = JSON.parse(timelineRaw);
        const ids: string[] = Array.isArray(t.items)
          ? t.items
              .filter((i: TimelineStoredItem) => i.included)
              .map((i: TimelineStoredItem) => i.id)
          : [];
        setTimelineIncludedIds(ids);
      }

      const mustRaw = window.localStorage.getItem("posesuiteMustHaves");
      if (mustRaw) {
        const saved = JSON.parse(mustRaw);
        if (Array.isArray(saved.selectedShotIds)) {
          setSelectedShotIds(saved.selectedShotIds);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save must-have selections
  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload = {
      selectedShotIds,
    };
    window.localStorage.setItem("posesuiteMustHaves", JSON.stringify(payload));
  }, [selectedShotIds]);

  const toggleShot = (id: string) => {
    setSelectedShotIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // If no timeline yet, show all sections. If we have it, decide based on included IDs.
  const ids = timelineIncludedIds;

  const showPrep1 = !ids || ids.includes("partner1-prep");
  const showPrep2 = !ids || ids.includes("partner2-prep");
  const showCeremony =
    !ids ||
    ids.includes("ceremony") ||
    ids.includes("church-exit") ||
    ids.includes("church-portrait-session");
  const showPortraits =
    !ids ||
    ids.includes("family-portraits") ||
    ids.includes("couple-portraits") ||
    ids.includes("wedding-party-portraits") ||
    ids.includes("extended-family-photos") ||
    ids.includes("additional-location-portraits");
  const showReception =
    !ids ||
    ids.includes("cocktail-hour") ||
    ids.includes("grand-entrance") ||
    ids.includes("welcome-speech") ||
    ids.includes("welcome-blessing") ||
    ids.includes("cake-cutting") ||
    ids.includes("first-dance") ||
    ids.includes("mother-son-dance") ||
    ids.includes("father-daughter-dance") ||
    ids.includes("table-race") ||
    ids.includes("best-man-speech") ||
    ids.includes("maid-of-honor-speech") ||
    ids.includes("bouquet-toss") ||
    ids.includes("garter-toss") ||
    ids.includes("sparkler-exit");

  const renderSection = (
    title: string,
    description: string,
    templates: ShotTemplate[]
  ) => {
    return (
      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#666",
            marginBottom: "0.9rem",
          }}
        >
          {description}
        </p>

        <div style={{ display: "grid", gap: "0.6rem" }}>
          {templates.map((shot) => {
            const label = shot.buildLabel(
              partner1Name || "Partner 1",
              partner2Name || "Partner 2"
            );
            const included = selectedShotIds.includes(shot.id);
            return (
              <label
                key={shot.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.55rem 0.8rem",
                  borderRadius: "0.8rem",
                  border: "1px solid #E2E2DD",
                  backgroundColor: included ? "#FCFCF9" : "#F4F4F0",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  opacity: included ? 1 : 0.7,
                }}
              >
                <input
                  type="checkbox"
                  checked={included}
                  onChange={() => toggleShot(shot.id)}
                  style={{ accentColor: "#A3B18A" }}
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #F8F7F4, #ECF0E8)",
        color: "#2E2E2E",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        padding: "3rem 1.25rem 4rem",
      }}
    >
      <section
        style={{
          maxWidth: "1040px",
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "1.5rem",
          padding: "2.5rem 2rem 2.75rem",
          boxShadow: "0 20px 45px rgba(0,0,0,0.06)",
          border: "1px solid #E4E4E0",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "flex-start",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "0.35rem 0.85rem",
                borderRadius: "999px",
                border: "1px solid #C9A66B",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7A6A45",
                marginBottom: "1.25rem",
              }}
            >
              PoseSuite · Must-have standard shots
            </div>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 300,
                fontSize: "2rem",
                marginBottom: "0.75rem",
              }}
            >
              Must-have shots for your wedding day.
            </h1>
            <p
              style={{
                maxWidth: "640px",
                fontSize: "0.98rem",
                color: "#555",
                marginBottom: "0.6rem",
              }}
            >
              As an experienced wedding photographer, the classic moments are
              second nature. I&apos;m already watching for these throughout your
              day. Instead of building a long list of every single photo you
              want, use this page to{" "}
              <strong>uncheck anything that doesn&apos;t feel necessary</strong>{" "}
              for you.
            </p>
            <p
              style={{
                maxWidth: "640px",
                fontSize: "0.88rem",
                color: "#777",
                margin: 0,
              }}
            >
              Everything that stays checked will be treated as a must-have
              standard shot for your day.
            </p>
          </div>

          <a
            href="/family"
            style={{
              fontSize: "0.85rem",
              textDecoration: "none",
              color: "#555",
              padding: "0.4rem 0.9rem",
              borderRadius: "999px",
              border: "1px solid #D4D4CF",
              backgroundColor: "#FFFDF8",
              marginTop: "0.5rem",
            }}
          >
            Back to family list →
          </a>
        </div>

        {/* Sections */}
        {showPrep1 &&
          renderSection(
            `${partner1Name || "Partner 1"} getting ready`,
            "Standard options I typically capture while you’re getting ready. Uncheck anything you don’t need.",
            prep1Shots
          )}

        {showPrep2 &&
          renderSection(
            `${partner2Name || "Partner 2"} getting ready`,
            "Options for the other partner’s getting ready time.",
            prep2Shots
          )}

        {showCeremony &&
          renderSection(
            "Ceremony",
            "Core ceremony moments that most couples expect. If something here truly doesn’t matter to you, you can remove it.",
            ceremonyShots
          )}

        {showPortraits &&
          renderSection(
            "Portraits",
            "Key portrait groupings and moments based on the plan we’ve built together.",
            portraitsShots
          )}

        {showReception &&
          renderSection(
            "Reception",
            "Typical reception moments that photograph beautifully and help tell the full story of your celebration.",
            receptionShots
          )}

        {/* Bottom controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "2rem",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            style={{
              borderRadius: "999px",
              border: "1px solid #D4D4CF",
              backgroundColor: "#FFFFFF",
              padding: "0.7rem 1.8rem",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Save for later (coming soon)
          </button>
          <button
            type="button"
            style={{
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#A3B18A",
              color: "#1F2622",
              padding: "0.85rem 2.4rem",
              fontSize: "0.95rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            This looks good (for now)
          </button>
        </div>
      </section>

      <p
        style={{
          fontSize: "0.8rem",
          color: "#888",
          textAlign: "center",
          marginTop: "1rem",
        }}
      >
        Later, these selected must-have shots can feed directly into your
        day-of PoseSuite view so I can work through them without a giant
        Pinterest checklist.
      </p>
    </main>
  );
}
