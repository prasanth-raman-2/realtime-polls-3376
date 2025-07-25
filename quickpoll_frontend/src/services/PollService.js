const API = "/api";

const PollService = {
  // PUBLIC_INTERFACE
  async getPolls() {
    /** List all available polls for the user. */
    const res = await fetch(`${API}/polls`, { credentials: "include" });
    if (!res.ok) throw new Error("Could not fetch polls");
    return await res.json();
  },

  // PUBLIC_INTERFACE
  async createPoll(title, options) {
    /** Create a new poll (options: array of strings) */
    const res = await fetch(`${API}/polls`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, options })
    });
    if (!res.ok) throw new Error("Poll creation failed");
    return await res.json();
  },

  // PUBLIC_INTERFACE
  async deletePoll(pollId) {
    /** Delete poll by owner (by poll id) */
    await fetch(`${API}/polls/${pollId}`, { method: "DELETE", credentials: "include" });
  },

  // PUBLIC_INTERFACE
  async votePoll(pollId, optionId) {
    /** Vote on poll by option id */
    const res = await fetch(`${API}/polls/${pollId}/vote`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId })
    });
    if (!res.ok) throw new Error("Voting failed");
    return await res.json();
  },

  // PUBLIC_INTERFACE
  async getPollResults(pollId) {
    /** Get results (votes) for poll */
    const res = await fetch(`${API}/polls/${pollId}/results`, { credentials: "include" });
    if (!res.ok) throw new Error("Fetching results failed");
    return await res.json();
  }
};

export default PollService;
