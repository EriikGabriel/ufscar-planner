import { getLayoutElements } from "@helpers/flow"
import ReactFlow, {
  Background,
  Edge,
  Node,
  ReactFlowProps,
  ReactFlowProvider,
  useStoreApi,
} from "reactflow"

interface DependenceTreeProps {
  nodes: Node[]
  edges: Edge[]
}

function Flow(props: ReactFlowProps) {
  const store = useStoreApi()
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production"
  ) {
    store.getState().onError = (code, message) => {
      if (code === "002") return
      console.warn(message)
    }
  }

  return (
    <ReactFlow {...props}>
      <Background />
    </ReactFlow>
  )
}

export function DependenceTree({ nodes, edges }: DependenceTreeProps) {
  const { nodes: layoutNodes, edges: layoutEdges } = getLayoutElements(
    nodes,
    edges
  )

  return (
    <ReactFlowProvider>
      <Flow
        nodes={layoutNodes}
        edges={layoutEdges}
        nodesConnectable={false}
        fitViewOptions={{ includeHiddenNodes: true, nodes: layoutNodes }}
        fitView
      />
    </ReactFlowProvider>
  )
}
