
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";

const MemoPad = () => {
  const [showMemoPad, setShowMemoPad] = useState(false);
  const [notes, setNotes] = useState("");

  const toggleMemoPad = () => {
    setShowMemoPad(!showMemoPad);
  };

  const handleNoteChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <div style={{ position: "absolute", right: "30px" }}>
      <FontAwesomeIcon
        icon={faStickyNote}
        onClick={toggleMemoPad}
        style={{ cursor: "pointer", fontSize: "24px" }}
      />
      {showMemoPad && (
        <div style={styles.memoPad}>
          <textarea
            value={notes}
            onChange={handleNoteChange}
            style={styles.textArea}
            placeholder="메모 입력..."
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  memoPad: {
    position: "absolute",
    top: "30px",
    right: "0",
    width: "220px",
    height: "220px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "white",
    padding: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  textArea: {
    width: "100%",
    height: "100%",
    border: "none",
    resize: "none",
    outline: "none",
  },
};

export default MemoPad;