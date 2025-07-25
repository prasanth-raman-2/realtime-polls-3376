import React, { useState } from "react";
import PollService from "../services/PollService";
import VoteModal from "./VoteModal";
import PollResult from "./PollResult";

// PUBLIC_INTERFACE
function PollCard({ poll, user, onChanged }) {
  /** Card view for a poll; allows voting, result view, delete for owner. */
  const [voteModal, setVoteModal] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);

  const isOwner = user && poll.ownerId === user.id;

  const handleDelete = async () => {
    if (window.confirm("Delete this poll?")) {
      await PollService.deletePoll(poll.id);
      onChanged && onChanged();
    }
  };

  return (
    <div className="poll-card">
      <div className="poll-header">
        <h3>{poll.title}</h3>
        <span className="poll-meta">By {poll.ownerName || "unknown"}</span>
      </div>
      <div className="poll-body">
        <ul className="poll-options">
          {poll.options.map(opt => (
            <li key={opt.id}>
              <span>{opt.text}</span>
            </li>
          ))}
        </ul>
        <div className="poll-actions">
          {!isOwner && (
            <button className="btn" onClick={() => setVoteModal(true)}>
              Vote
            </button>
          )}
          <button className="btn" onClick={() => setResultsOpen(!resultsOpen)}>
            {resultsOpen ? "Hide Results" : "View Results"}
          </button>
          {isOwner && (
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
      {voteModal && <VoteModal poll={poll} onClose={() => setVoteModal(false)} onVote={onChanged} />}
      {resultsOpen && <PollResult pollId={poll.id} />}
    </div>
  );
}

export default PollCard;
