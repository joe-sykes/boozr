// utils.js
import { BadgeCheck } from "lucide-react";

export const getRatingColor = (percentage) => {
  const percent = parseFloat(percentage);
  if (isNaN(percent)) return '#999';

  const r = percent < 50 ? 255 : Math.floor(255 - (percent * 2.55));
  const g = percent > 50 ? 255 : Math.floor(percent * 2.55);
  return `rgb(${r}, ${g}, 0)`; // red → green
};

export const VerifiedRating = ({ rating }) => {
  if (!rating) return null;

  const color = getRatingColor(rating);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", marginLeft: "0.5rem", gap: "0.25rem" }}>
      <BadgeCheck size={16} color="green" />
      <span style={{
        fontWeight: "bold",
        color,
        borderRadius: "4px",
        padding: "0.1rem 0.4rem",
        background: "#f0f0f0",
        fontSize: "0.85rem"
      }}>
        {rating}
      </span>
    </span>
  );
};
