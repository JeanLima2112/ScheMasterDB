import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TemplateEntity } from './template.entity';

@Entity()
export class Node {
  @PrimaryColumn()
  id?: string;

  @ManyToOne(() => TemplateEntity, (template) => template.nodes, {
    onDelete: 'CASCADE',
  })
  template: TemplateEntity;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'json' })
  measured: {
    width: number;
    height: number;
  };

  @Column({ type: 'json' })
  position: {
    x: number;
    y: number;
  };
}
