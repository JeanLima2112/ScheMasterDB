export class EdgeDto {
  id: string;
  data: EdgeDataDto;
  source: string;
  target: string;
}

export class EdgeDataDto {
  id: string;
  label: string;
}
