"use client"

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react"

interface ProjectionContextProviderProps {
  children: React.ReactNode
}

type ProjectionContextType = {
  projection: boolean
  setProjection: Dispatch<SetStateAction<boolean>>
}

const ProjectionContext = createContext({} as ProjectionContextType)

export function ProjectionContextProvider({
  children,
}: ProjectionContextProviderProps) {
  const [projection, setProjection] = useState(false)

  return (
    <ProjectionContext.Provider value={{ projection, setProjection }}>
      {children}
    </ProjectionContext.Provider>
  )
}

export const useProjectionContext = () => useContext(ProjectionContext)
