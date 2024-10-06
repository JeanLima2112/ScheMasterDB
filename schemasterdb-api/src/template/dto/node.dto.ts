export class NodeDto {
  id: string;
  dragging: boolean;
  selected: boolean;
  type: string;
  data: NodeDataDto;
  position: {
    x: number;
    y: number;
  };
}

export class NodeDataDto {
  id: string;
  name: string;
}
