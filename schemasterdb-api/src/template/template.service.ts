import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { FindAllParameters, TemplateDto } from './dto/template.dto';
import { Edge } from './entities/edge.entity';
import { Node } from './entities/node.entity';
import { TemplateEntity } from './entities/template.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    @InjectRepository(Edge)
    private readonly edgeRepository: Repository<Edge>,
  ) {}
  async create(newTemplate: TemplateDto) {
    const templateToSave: TemplateEntity = {
      user_id: newTemplate.user_id,
      nodes: [],
      edges: [],
      viewport: newTemplate.viewport,
      title: newTemplate.title,
    };
    const createdTemplate = await this.templateRepository.save(templateToSave);
    return createdTemplate;
  }

  async findAll(params: FindAllParameters): Promise<TemplateDto[]> {
    const searchParams: FindOptionsWhere<TemplateEntity> = {};

    if (params.user_id) {
      searchParams.user_id = Like(`%${params.user_id}%`);
    }

    const templatesfound = await this.templateRepository.find({
      where: searchParams,
    });
    return templatesfound.map((templateEntity) =>
      this.mapEntityToDto(templateEntity),
    );
  }

  async findOne(id: string): Promise<TemplateDto> {
    const foundTemplate = await this.templateRepository.findOne({
      where: { id },
    });

    if (!foundTemplate) {
      throw new HttpException(
        `task with Id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.mapEntityToDto(foundTemplate);
  }

  async update(id: string, templateDto: TemplateDto) {
    await this.remove(id);
    const templateToSave: TemplateEntity = {
      id,
      user_id: templateDto.user_id,
      nodes: [],
      edges: [],
      viewport: templateDto.viewport,
      title: templateDto.title,
    };

    const nodes: Node[] = [];
    for (const nodeDto of templateDto.nodes) {
      const node = await this.nodeRepository.save({
        ...nodeDto,
      });
      nodes.push(node);
    }
    templateToSave.nodes = nodes;

    const edges: Edge[] = [];
    for (const edgeDto of templateDto.edges) {
      const edge = await this.edgeRepository.save({
        ...edgeDto,
      });
      edges.push(edge);
    }
    templateToSave.edges = edges;

    const updatedTemplate = await this.templateRepository.save(templateToSave);
    return updatedTemplate;
  }

  async remove(id: string) {
    const template = await this.templateRepository.findOne({
      where: { id },
      relations: ['nodes', 'nodes.data', 'edges', 'edges.data'],
    });

    if (!template) {
      throw new HttpException(
        `Entity with Id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await Promise.all([this.templateRepository.remove(template)]);
  }
  private mapEntityToDto(templateEntity: TemplateEntity): any {
    return {
      id: templateEntity.id,
      title: templateEntity.title,
      viewport: templateEntity.viewport,
      nodes: templateEntity.nodes,
      edges: templateEntity.edges,
    };
  }
}
