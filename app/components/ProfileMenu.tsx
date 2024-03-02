import { ProfileMenuButton } from "./ProfileMenuButton"

interface ProfileMenuProps {
  session: string | undefined
}

export function ProfileMenu({ session }: ProfileMenuProps) {
  return (
    <div className="border rounded-md flex flex-col gap-3 h-fit w-1/4 py-5">
      <ProfileMenuButton
        session={session}
        href="/user/profile"
        icon="MenuSquare"
      >
        Visão geral
      </ProfileMenuButton>
      <ProfileMenuButton
        session={session}
        href="/user/profile/personal"
        icon="User"
      >
        Dados pessoais
      </ProfileMenuButton>
      <ProfileMenuButton
        session={session}
        href="/user/profile/semester"
        icon="LibraryBig"
      >
        Semestre corrente
      </ProfileMenuButton>
    </div>
  )
}
