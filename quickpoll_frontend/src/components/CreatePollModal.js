import React, { useState } from "react";
import PollService from "../services/PollService";

// PUBLIC_INTERFACE
function CreatePollModal({ onClose, onCreated }) {
  /** Modal for creating a new poll. */
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [err, setErr] = useState(null);

  const handleOptionChange = (idx, text) => {
    setOptions(options.map((opt, i) => (i === idx ? text : opt)));
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };
  const handleRemoveOption = idx => {
    setOptions(options.filter((_, i) => i !== idx));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErr(null);
    try {
      await PollService.createPoll(title, options.filter(o => o.trim() !== ""));
      onCreated && onCreated();
      onClose();
    } catch (error) {
      setErr(error.message || "Create poll failed.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create Poll</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Poll title"
            required
            autoFocus
          />
          <div className="poll-options">
            {options.map((opt, idx) => (
              <div key={idx} className="option-input-row">
                <input
                  value={opt}
                  onChange={e => handleOptionChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                  required
                />
                {options.length > 2 && (
                  <button type="button" className="btn btn-danger" onClick={() => handleRemoveOption(idx)}>
                    -
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn" onClick={handleAddOption}>+ Add Option</button>
          </div>
          {err && <div className="modal-error">{err}</div>}
          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-large">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePollModal;
