import React, { useEffect, useState } from "react";
import PollService from "../services/PollService";

// PUBLIC_INTERFACE
function PollResult({ pollId }) {
  /** Visualize poll results (auto-refresh). */
  const [result, setResult] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchResult() {
      try {
        const data = await PollService.getPollResults(pollId);
        if (mounted) setResult(data);
      } catch {}
    }

    fetchResult();
    const interval = setInterval(fetchResult, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [pollId]);

  if (!result) return <span>Loading results...</span>;

  const maxVotes = Math.max(1, ...result.options.map(o => o.votes));

  return (
    <div className="poll-results">
      {result.options.map(opt => (
        <div key={opt.id} className="result-row">
          <span className="option-label">{opt.text}</span>
          <div className="bar-bg">
            <div
              className="bar"
              style={{
                width: `${(opt.votes / maxVotes) * 100}%`,
                background: "var(--text-secondary)"
              }}
            />
          </div>
          <span className="votes">{opt.votes}</span>
        </div>
      ))}
    </div>
  );
}

export default PollResult;
