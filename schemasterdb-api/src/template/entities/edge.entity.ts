import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TemplateEntity } from './template.entity';

@Entity()
export class Edge {
  @PrimaryColumn()
  id?: string;

  @Column()
  source: string;

  @Column()
  target: string;

  @ManyToOne(() => TemplateEntity, (template) => template.edges, {
    onDelete: 'CASCADE',
  })
  template: TemplateEntity;
}
