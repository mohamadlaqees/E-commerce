import { memo } from "react";

export const Heading = memo(({ content }: { content: string }) => {
  return (
    <div
      className="mb-3"
      style={{
        fontSize: "40px",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        textShadow: "2px 2px #f7f7fa",
      }}
    >
      {content}
    </div>
  );
});
