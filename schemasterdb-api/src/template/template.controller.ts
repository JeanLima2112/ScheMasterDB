import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllParameters, TemplateDto } from './dto/template.dto';
import { TemplateService } from './template.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TemplateEntity } from './entities/template.entity';

@UseGuards(AuthGuard)
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async create(@Body() newTemplate: TemplateDto): Promise<TemplateEntity> {
    return await this.templateService.create(newTemplate);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<TemplateDto[]> {
    return await this.templateService.findAll(params);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<TemplateDto> {
    return await this.templateService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() template: TemplateDto) {
    return await this.templateService.update(id, template);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.templateService.remove(id);
  }
}
