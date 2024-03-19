import { ProfileMenuButton } from "./ProfileMenuButton"

interface ProfileMenuProps {
  session: string | undefined
}

export function ProfileMenu({ session }: ProfileMenuProps) {
  return (
    <div className="border w-1/4 h-fit py-5 rounded-md flex flex-col max-lg:flex-row max-md:flex-col max-lg:w-full max-lg:justify-center gap-3">
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
