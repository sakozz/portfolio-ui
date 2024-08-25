import ProfileOverview from './profile-overview.tsx';

export default function Overview() {
  return (
    <div>
      {/*   <button className="btn btn-primary btn-rounded">Primary</button>
      <button className="btn btn-primary btn-rounded" disabled>
        Primary
      </button>
      <button className="btn btn-secondary btn-rounded">Secondary</button>
      <button className="btn btn-secondary btn-rounded" disabled>
        Secondary
      </button>

      <button className="btn btn-primary-outline btn-rounded">Primary Outlined</button>
      <button className="btn btn-primary-outline btn-rounded" disabled>
        Primary outlined
      </button>*/}
      <h2 className={'text-2xl font-bold mb-4'}>Profile</h2>
      <ProfileOverview></ProfileOverview>
    </div>
  );
}
