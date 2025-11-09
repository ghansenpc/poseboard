"use client";

import { useState } from "react";

type TimelineItem = {
  id: string;
  label: string;
  time: string;
  notes: string;
  included: boolean;
};

const initialItems: TimelineItem[] = [
  {
    id: "photographer-arrival",
    label: "Photographer arrival",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "bride-prep",
    label: "Bride / Partner 1 getting ready",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "groom-prep",
    label: "Groom / Partner 2 getting ready",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "first-look",
    label: "First look",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "wedding-party",
    label: "Wedding party portraits",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "family-formals",
    label: "Family formals",
    time: "",
    notes: "Plan for both sides + any special groupings.",
    included: true,
  },
  {
    id: "ceremony",
    label: "Ceremony",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "cocktail-hour",
    label: "Cocktail hour",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "reception-entrance",
    label: "Reception entrances & speeches",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "first-dances",
    label: "First dances",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "cake-cutting",
    label: "Cake cutting / dessert",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "exit",
    label: "Exit / final photos",
    time: "",
    notes: "",
    included: true,
  },
];

export default function TimelinePage() {
  const [items, setItems] = useState<TimelineItem[]>(initialItems);

  const handleChange = (
    id: string,
    field: "time" | "notes" | "label" | "included",
    value: string | boolean
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleAddCustom = () => {
    const newId = `custom-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        label: "Custom timeline item",
        time: "",
        notes: "",
        included: true,
      },
    ]);
  };

  const includedItems = items.filter((item) => item.included);
  const excludedItems = items.filter((item) => !item.included);

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
              PoseSuite · Timeline builder
            </div>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 300,
                fontSize: "2rem",
                marginBottom: "0.75rem",
              }}
            >
              Build your wedding day timeline.
            </h1>
            <p
              style={{
                maxWidth: "520px",
                fontSize: "0.98rem",
                color: "#555",
                margin: 0,
              }}
            >
              Start with the major beats of your day – then we&apos;ll connect
              this to your shot lists, so each block can reveal the photos to
              capture when you tap into it on your day-of plan.
            </p>
          </div>
          <a
            href="/day-of"
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
            View day-of mock →
          </a>
        </div>

        {/* Timeline form */}
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {includedItems.map((item) => (
            <div
              key={item.id}
              style={{
                borderRadius: "1rem",
                border: "1px solid #E2E2DD",
                padding: "0.85rem 0.9rem 1rem",
                backgroundColor: "#FCFCF9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "0.5rem",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={item.included}
                    onChange={(e) =>
                      handleChange(item.id, "included", e.target.checked)
                    }
                  />
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) =>
                      handleChange(item.id, "label", e.target.value)
                    }
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "0.98rem",
                      fontWeight: 600,
                      outline: "none",
                      minWidth: "220px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.85rem",
                  }}
                >
                  <span style={{ color: "#777" }}>Approx. time</span>
                  <input
                    type="time"
                    value={item.time}
                    onChange={(e) =>
                      handleChange(item.id, "time", e.target.value)
                    }
                    style={{
                      borderRadius: "999px",
                      border: "1px solid #D4D4CF",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>
              </div>
              <textarea
                placeholder="Notes about this block (locations, people involved, lighting notes, travel, etc.)"
                value={item.notes}
                onChange={(e) =>
                  handleChange(item.id, "notes", e.target.value)
                }
                rows={2}
                style={{
                  width: "100%",
                  borderRadius: "0.8rem",
                  border: "1px solid #E2E2DD",
                  padding: "0.5rem 0.7rem",
                  fontSize: "0.88rem",
                  resize: "vertical",
                  outline: "none",
                  backgroundColor: "#FFFFFF",
                }}
              />
            </div>
          ))}

          {/* Excluded / unneeded items */}
          {excludedItems.length > 0 && (
            <details
              style={{
                marginTop: "0.75rem",
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              <summary style={{ cursor: "pointer" }}>
                Items you&apos;ve turned off ({excludedItems.length})
              </summary>
              <div style={{ marginTop: "0.6rem", display: "grid", gap: "0.4rem" }}>
                {excludedItems.map((item) => (
                  <label
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={item.included}
                      onChange={(e) =>
                        handleChange(item.id, "included", e.target.checked)
                      }
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </details>
          )}
        </div>

        {/* Bottom controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={handleAddCustom}
            style={{
              borderRadius: "999px",
              border: "1px solid #C9A66B",
              backgroundColor: "#FFFDF8",
              padding: "0.7rem 1.6rem",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            + Add custom timeline block
          </button>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
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
              Continue to shot lists (future step)
            </button>
          </div>
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
        In a later version, this timeline will connect directly to your day-of
        plan, so tapping a block (like bride prep) reveals the matching shot
        list.
      </p>
    </main>
  );
}
