import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ViewportDto } from '../dto/viewport.dto';
import { Edge } from './edge.entity';
import { Node } from './node.entity';

@Entity({ name: 'template' })
export class TemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'json' })
  viewport: ViewportDto;

  @Column({ type: 'varchar' })
  user_id: string;

  @OneToMany(() => Node, (node) => node.template, { cascade: true })
  nodes: Node[];

  @OneToMany(() => Edge, (edge) => edge.template, { cascade: true })
  edges: Edge[];
}
