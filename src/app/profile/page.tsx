'use client'
import { authClient } from "@/lib/auth-client";


interface SessionData {
    user: {
        name: string,
        email: string,
    }
}

const Profile = () => {
    const {data: session } = authClient.useSession();

  if (!session) return null;

    const onSignOut = async () => {
        await authClient.signOut();
    }
    const user: SessionData["user"] = session.user;

    const onNameUpdate = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries())
        const name = String(data.name);

        await authClient.updateUser({

        name
    })}
  return (
    <div>
      <h1 className="text-bold text-3xl">আমার প্রোফাইল</h1>
      <p className="text-1xl">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      <div className="card card-dash bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">{user.name}</h2>
          <p>{user.email}</p>
          <div className="card-actions justify-end">
            <button onClick={onSignOut} className="btn btn-outline btn-error">↩︎ সাইন আউট</button>
          </div>
        </div>
      </div>

      <div className="card card-dash bg-green-100 w-96">
        <div className="card-body">
          <h2 className="card-title text-2xt text-bold">নাম হালনাগাদ করুন</h2>
         <form onSubmit={onNameUpdate}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">সাইন ইন</legend>

          <label className="label">নাম</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="যেমন: রহিম উদ্দিন"
          />
          <button className="btn btn-success mt-4">নাম হালনাগাদ করুন</button>
        </fieldset>
      </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
