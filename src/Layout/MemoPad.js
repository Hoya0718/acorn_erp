import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";

const MemoPad = () => {
  const [showMemoPad, setShowMemoPad] = useState(false);
  const [notes, setNotes] = useState("");

  // 로컬 스토리지에서 메모를 불러오는 useEffect 훅
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // 메모 내용이 변경될 때마다 로컬 스토리지에 저장하는 함수
  const handleNoteChange = (event) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    localStorage.setItem("notes", newNotes);
  };

  const toggleMemoPad = () => {
    setShowMemoPad(!showMemoPad);
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
    opacity: "1",
    position: "absolute",
    top: "30px",
    right: "0",
    width: "220px",
    height: "210px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "white",
    padding: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    // zIndex: 1000
  },
  textArea: {
    fontSize: "13px",
    width: "100%",
    height: "100%",
    border: "none",
    resize: "none",
    outline: "none",
  },
};

export default MemoPad;