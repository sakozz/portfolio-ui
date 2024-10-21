export type UserAvatarProps = {
  avatarUrl?: string;
  name: string;
  showName?: boolean;
};
export default function UserAvatar({ avatarUrl, name, showName }: UserAvatarProps) {
  const avatar = avatarUrl ? (
    <img src={avatarUrl} alt={name} />
  ) : (
    <div className={'text-bold uppercase text-xl'}>{name.at(0) + name.at(1)}</div>
  );

  return (
    <div className={'flex flex-col justify-center items-center gap-2  '}>
      <div
        className={
          'rounded-full w-12 h-12 overflow-clip flex justify-center items-center bg-light-130'
        }>
        {avatar}
      </div>
      {name && showName && <p>{name}</p>}
    </div>
  );
}
