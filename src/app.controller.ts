import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getEpisodes(@Res() res: Response) {
    return this.appService.getListOfEpisodes(res);
  }

  @Get("image/:name")
  @ApiParam({ name: 'name', type: String, description: 'Name of the episode image' })
  getEpisodeImage(@Res() res: Response, @Param('name') name: string) {
    return this.appService.getEpisodeImages(name, res);
  }
}
