import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';
import { IsPositivePipe } from 'src/is-positive/is-positive.pipe';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe)
    limit: number = 10,
  ) {
    console.log('this', limit);
    return this.episodesService.findAll(sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const episode = this.episodesService.findOne(id);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }
    return episode;
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Post()
  create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    return this.episodesService.create(input);
  }
}
