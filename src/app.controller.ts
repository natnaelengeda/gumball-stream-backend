import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getEpisodes(@Res() res: Response) {
    return this.appService.getListOfEpisodes(res);
  }

  @Get("episode/:id")
  @ApiParam({ name: 'id', type: String, description: 'id of the episode' })
  getEpisode(@Res() res: Response, @Param('id') id: string) {
    return this.appService.getEpisode(+id, res);
  }

  @Get("image/:name")
  @ApiParam({ name: 'name', type: String, description: 'Name of the episode image' })
  getEpisodeImage(@Res() res: Response, @Param('name') name: string) {
    return this.appService.getEpisodeImages(name, res);
  }

  @Get('episode/video/:id/:fileName')
  getEpisodeVideo(@Res() res: Response, @Req() req: Request, @Param("id") id: string, @Param('fileName') fileName: string) {
    return this.appService.getEpisodeVideo(req, res, id, fileName);
  }

}
