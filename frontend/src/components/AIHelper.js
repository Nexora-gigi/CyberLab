import { useState } from "react";

function AIHelper() {
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);

  const handleMouseMove = (e) => {
    if (dragging) setPos({ x: e.clientX - 30, y: e.clientY - 30 });
  };

  return (
    <div
      className="ai-helper"
      style={{ left: pos.x, top: pos.y, position: "fixed" }}
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseMove={handleMouseMove}
      title="AI Assistant"
    >
      🤖
    </div>
  );
}

export default AIHelper;
