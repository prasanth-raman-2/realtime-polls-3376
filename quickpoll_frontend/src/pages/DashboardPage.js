import React, { useEffect, useState } from "react";
import PollService from "../services/PollService";
import PollCard from "../components/PollCard";
import CreatePollModal from "../components/CreatePollModal";

// PUBLIC_INTERFACE
function DashboardPage({ user }) {
  /**
   * Main dashboard for poll creation, management, and listing.
   */
  const [polls, setPolls] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadPolls = async () => {
    setRefreshing(true);
    try {
      const data = await PollService.getPolls();
      setPolls(data);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPolls();
  }, []);

  const handlePollCreated = () => {
    setCreateModalOpen(false);
    loadPolls();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Your Polls</h2>
        <button className="btn" onClick={() => setCreateModalOpen(true)}>+ Create Poll</button>
      </div>
      <div className="dashboard-content">
        {refreshing && <div>Loading polls…</div>}
        {!refreshing && polls.length === 0 && <div>No polls found.</div>}
        {!refreshing && polls.length > 0 && (
          <div className="poll-list">
            {polls.map(poll => (
              <PollCard key={poll.id} poll={poll} user={user} onChanged={loadPolls} />
            ))}
          </div>
        )}
      </div>
      {createModalOpen && (
        <CreatePollModal onClose={() => setCreateModalOpen(false)} onCreated={handlePollCreated} />
      )}
    </div>
  );
}

export default DashboardPage;
