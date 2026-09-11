"use client";

import { FormEvent, useState } from "react";

export default function AdminCredentialsForm() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/credentials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginId, password }),
    });
    const result = await response.json().catch(() => ({}));
    setMessage(response.ok ? "Admin credentials updated." : result.error || "Unable to update credentials.");
    if (response.ok) {
      setLoginId("");
      setPassword("");
    }
    setSaving(false);
  }

  return (
    <section>
      <h1>Admin settings</h1>
      <p>Update the username and password used for admin login.</p>
      <form onSubmit={submit} className="mt-6 flex max-w-md flex-col gap-4">
        <label>
          Username
          <input value={loginId} onChange={(event) => setLoginId(event.target.value)} minLength={3} required />
        </label>
        <label>
          New password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} required />
        </label>
        <button type="submit" disabled={saving}>{saving ? "Saving..." : "Update credentials"}</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </section>
  );
}