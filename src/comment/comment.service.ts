import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "src/entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) { }


  async create(parentId: string, createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      parentId,
    });
    return await this.commentRepository.save(comment);
  }

  async findAll(parentId: string): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { parentId },
      order: { createdAt: "DESC" },
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}