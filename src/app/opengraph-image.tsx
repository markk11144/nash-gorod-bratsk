import { ImageResponse } from "next/og";

export const alt = "Наш Город — агентство недвижимости в Братске";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f7f8f3",
        color: "#20241f",
        padding: "72px 78px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div
          style={{
            width: 84,
            height: 84,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #61b400",
            borderRadius: 24,
            background: "#feed01",
            color: "#20241f",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          НГ
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 38, fontWeight: 700 }}>Наш Город</span>
          <span style={{ fontSize: 22, color: "#5d6659" }}>Агентство недвижимости · Братск</span>
        </div>
      </div>
      <div style={{ maxWidth: 930, display: "flex", fontSize: 70, fontWeight: 650, lineHeight: 1.03, letterSpacing: -3 }}>
        Понятное сопровождение сделки с недвижимостью
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #dfe4d9", paddingTop: 28, fontSize: 23, color: "#5d6659" }}>
        <span>ул. Мира, 27 · кабинет 205</span>
        <span style={{ color: "#3f790d", fontWeight: 700 }}>+7 902 765-36-00</span>
      </div>
    </div>,
    size,
  );
}
