import { ImageResponse } from "next/og";

export const alt =
  "Kalkulačka ceny hostingu – porovnání AWS, Hetzneru a českého hostingu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 64,
          color: "#fff0ff",
          background:
            "linear-gradient(145deg, #9e0eb8 0%, #4a0752 38%, #250327 68%, #a82f71 100%)",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 58,
            border: "2px solid rgba(255, 240, 255, 0.35)",
            borderRadius: 24,
            background: "rgba(35, 2, 38, 0.78)",
          }}
        >
          <div style={{ display: "flex", color: "#ed72c6", fontSize: 25 }}>
            KalkulackaHostingu.cz
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 62, fontWeight: 700 }}>
              Kalkulačka ceny hostingu
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                color: "#d8bed8",
                fontSize: 28,
              }}
            >
              AWS / Hetzner / MasterDC / Forpsi
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 23, color: "#d8bed8" }}>
            Server · databáze · přenos dat · skryté náklady
          </div>
        </div>
      </div>
    ),
    size,
  );
}