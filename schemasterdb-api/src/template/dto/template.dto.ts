import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { EdgeDto } from './edge.dto';
import { NodeDto } from './node.dto';
import { ViewportDto } from './viewport.dto';

export class TemplateDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  viewport: ViewportDto;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  nodes: NodeDto[];

  @IsNotEmpty()
  edges: EdgeDto[];
}

export interface FindAllParameters {
  user_id: string;
}
