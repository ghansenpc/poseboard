"use client";

import { useState } from "react";

type Task = {
  id: string;
  label: string;
};

const initialTasks: Task[] = [
  { id: "bride-prep", label: "Bride / Partner 1 getting ready" },
  { id: "groom-prep", label: "Groom / Partner 2 getting ready" },
  { id: "first-look", label: "First look" },
  { id: "wedding-party", label: "Wedding party portraits" },
  { id: "ceremony", label: "Ceremony" },
  { id: "family-formals", label: "Family formals" },
  { id: "sunset-portraits", label: "Sunset / golden hour portraits" },
  { id: "reception-details", label: "Reception detail photos" },
  { id: "reception-entrance", label: "Reception entrances & speeches" },
  { id: "first-dances", label: "First dances" },
  { id: "cake-cutting", label: "Cake cutting / dessert" },
  { id: "exit", label: "Exit / final photos" },
];

export default function DayOfPage() {
  // In the future this will come from your real project.
  const coupleNames = "Alex & Jordan"; // placeholder
  const weddingDate = "September 14, 2025"; // placeholder
  const ceremonyLocation = "St. Maria Cathedral, Chicago"; // placeholder
  const receptionLocation = "The Ivy Room, Chicago"; // placeholder
  const emergencyContact = { name: "Maid of Honor – Emily", phone: "(312) 555-1234" };
  const plannerContact = { name: "Harper Lane Events – Harper", phone: "(312) 555-5678" };

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setCompletedTasks((prev) => [task, ...prev]);
  };

  const handleRestore = (id: string) => {
    const task = completedTasks.find((t) => t.id === id);
    if (!task) return;
    setCompletedTasks((prev) => prev.filter((t) => t.id !== id));
    setTasks((prev) => [task, ...prev]);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #F8F7F4, #ECF0E8)",
        color: "#2E2E2E",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        padding: "2rem 1rem 3rem",
      }}
    >
      <section
        style={{
          maxWidth: "1040px",
          margin: "0 auto",
          display: "grid",
          gap: "1.5rem",
        }}
      >
        {/* Top header bar */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                border: "1px solid #C9A66B",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#7A6A45",
                marginBottom: "0.4rem",
              }}
            >
              PoseSuite Day-Of Plan
            </div>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 300,
                fontSize: "1.6rem",
                margin: 0,
              }}
            >
              {coupleNames}
            </h1>
            <p style={{ margin: "0.2rem 0 0.4rem", fontSize: "0.9rem", color: "#666" }}>
              {weddingDate}
            </p>
          </div>
          <a
            href="/"
            style={{
              fontSize: "0.85rem",
              textDecoration: "none",
              color: "#555",
              padding: "0.4rem 0.9rem",
              borderRadius: "999px",
              border: "1px solid #D4D4CF",
              backgroundColor: "#FFFFFF",
            }}
          >
            ← Back to overview
          </a>
        </header>

        {/* Locations & contacts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
            gap: "1.25rem",
            alignItems: "flex-start",
          }}
        >
          {/* Locations */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "1.2rem",
              padding: "1.25rem 1.2rem",
              border: "1px solid #E4E4E0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              fontSize: "0.9rem",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                margin: "0 0 0.5rem",
              }}
            >
              Locations
            </h2>
            <div style={{ marginBottom: "0.4rem" }}>
              <div style={{ fontWeight: 500 }}>Ceremony</div>
              <div style={{ color: "#555" }}>{ceremonyLocation}</div>
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>Reception</div>
              <div style={{ color: "#555" }}>{receptionLocation}</div>
            </div>
          </div>

          {/* Contacts */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "1.2rem",
              padding: "1.25rem 1.2rem",
              border: "1px solid #E4E4E0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              fontSize: "0.9rem",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                margin: "0 0 0.5rem",
              }}
            >
              Key contacts
            </h2>
            <div style={{ marginBottom: "0.35rem" }}>
              <div style={{ fontWeight: 500 }}>Emergency contact</div>
              <div style={{ color: "#555" }}>
                {emergencyContact.name} · {emergencyContact.phone}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>Planner</div>
              <div style={{ color: "#555" }}>
                {plannerContact.name} · {plannerContact.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline checklist */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "1.2rem",
            padding: "1.4rem 1.25rem 1.6rem",
            border: "1px solid #E4E4E0",
            boxShadow: "0 14px 35px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              alignItems: "center",
              marginBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Day-of checklist
            </h2>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                fontSize: "0.85rem",
              }}
            >
              <span style={{ color: "#666" }}>View:</span>
              <button
                type="button"
                onClick={() => setShowCompleted(false)}
                style={{
                  padding: "0.3rem 0.8rem",
                  borderRadius: "999px",
                  border: showCompleted ? "1px solid #D4D4CF" : "1px solid #A3B18A",
                  backgroundColor: showCompleted ? "#FFFFFF" : "#EBF0E7",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Upcoming only
              </button>
              <button
                type="button"
                onClick={() => setShowCompleted(true)}
                style={{
                  padding: "0.3rem 0.8rem",
                  borderRadius: "999px",
                  border: showCompleted ? "1px solid #A3B18A" : "1px solid #D4D4CF",
                  backgroundColor: showCompleted ? "#EBF0E7" : "#FFFFFF",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Upcoming tasks */}
          {!showCompleted && (
            <div style={{ display: "grid", gap: "0.6rem" }}>
              {tasks.length === 0 ? (
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#777",
                    fontStyle: "italic",
                    marginTop: "0.5rem",
                  }}
                >
                  Everything on your list is checked off. Beautiful job. ✨
                </p>
              ) : (
                tasks.map((task) => (
                  <label
                    key={task.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.45rem 0.65rem",
                      borderRadius: "0.7rem",
                      border: "1px solid #E2E2DD",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      onChange={() => handleComplete(task.id)}
                      style={{ width: 16, height: 16 }}
                    />
                    <span>{task.label}</span>
                  </label>
                ))
              )}
            </div>
          )}

          {/* Completed tasks view */}
          {showCompleted && (
            <div style={{ display: "grid", gap: "0.6rem" }}>
              {completedTasks.length === 0 ? (
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#777",
                    fontStyle: "italic",
                    marginTop: "0.5rem",
                  }}
                >
                  No items completed yet. As you finish each part of the day,
                  they&apos;ll appear here.
                </p>
              ) : (
                completedTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      padding: "0.45rem 0.65rem",
                      borderRadius: "0.7rem",
                      border: "1px solid #E2E2DD",
                      backgroundColor: "#F4F4EF",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#777",
                      }}
                    >
                      {task.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRestore(task.id)}
                      style={{
                        borderRadius: "999px",
                        border: "none",
                        padding: "0.25rem 0.8rem",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      Restore
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        {/* Little note */}
        <p
          style={{
            fontSize: "0.8rem",
            color: "#888",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          In the future, this page will auto-populate from your PoseSuite project.
          For now, this is a working mock to help you design the flow.
        </p>
      </section>
    </main>
  );
}
