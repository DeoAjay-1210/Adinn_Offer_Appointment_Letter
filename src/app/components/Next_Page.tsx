import Link from "next/link";

export default function MainPage() {
  return (
    <div style={{ padding: 30 }}>
      <Link
        href="/adinn-appointment-letter"
        style={{
          display: "inline-block",
          padding: "12px 22px",
          background: "#c0392b",
          color: "#fff",
          borderRadius: 6,
          fontWeight: 700,
          textDecoration: "none",
          float:'right'
        }}
      >
        Create Appointment Letter
      </Link>
    </div>
  );
}