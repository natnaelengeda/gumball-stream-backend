import { Injectable, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import * as fs from "fs";
import * as path from 'path';
import { episodes } from './data/episodes';

@Injectable()
export class AppService {

  getListOfEpisodes(@Res() res: Response) {
    res.status(200).json(episodes);
  }

  getEpisode(id: number, @Res() res: Response) {
    const episode = episodes.filter((item) => item.id == id);
    return res.status(200).json(episode[0]);
  }

  getEpisodeImages(name: string, @Res() res: Response) {
    const location = path.join(process.env.FILE_LOCATION!, "Images");
    const fullImage = path.join(location, name);
    return res.sendFile(fullImage); // ✅ sends the image file  }
  }

  getEpisodeVideo(@Req() req: Request, @Res() res: Response, id: string, fileName: string) {
    const location = path.join(process.env.FILE_LOCATION!, "Videos");
    const videoPath = path.join(location, `${id}.${fileName}.mp4`);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).send('Video not found');
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4', // adjust if using other formats
      });

      file.pipe(res);
    } else {
      // No range requested, send full video
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(videoPath).pipe(res);
    }
  }
}
