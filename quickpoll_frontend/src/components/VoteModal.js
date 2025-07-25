import React, { useState } from "react";
import PollService from "../services/PollService";

// PUBLIC_INTERFACE
function VoteModal({ poll, onClose, onVote }) {
  /** Modal for voting on a poll. */
  const [selected, setSelected] = useState(null);
  const [err, setErr] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setErr(null);
    try {
      await PollService.votePoll(poll.id, selected);
      onVote && onVote();
      onClose();
    } catch (error) {
      setErr(error.message || "Vote failed.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Vote: {poll.title}</h3>
        <form onSubmit={handleSubmit}>
          <ul className="vote-options">
            {poll.options.map(opt => (
              <li key={opt.id}>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={opt.id}
                    checked={selected === opt.id}
                    onChange={() => setSelected(opt.id)}
                  />
                  {opt.text}
                </label>
              </li>
            ))}
          </ul>
          {err && <div className="modal-error">{err}</div>}
          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-large" disabled={selected === null}>
              Vote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VoteModal;
