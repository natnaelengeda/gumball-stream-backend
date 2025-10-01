import {
  Controller, Get, Post, Body, Patch, Param, Delete
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@ApiTags("comments")
@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post(":id")
  @ApiOperation({ summary: "Create a new comment for a specific entity (e.g. episode)" })
  @ApiParam({ name: "id", description: "ID of the parent entity (episode, blog, etc.)" })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: "Comment created successfully", type: Comment })
  create(
    @Param("id") id: string,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.commentService.create(id, createCommentDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get all comments for a specific entity (e.g. episode)" })
  @ApiParam({ name: "id", description: "ID of the parent entity (episode, blog, etc.)" })
  @ApiResponse({ status: 200, description: "Return all comments", type: [Comment] })
  findAll(@Param("id") id: string) {
    return this.commentService.findAll(id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a comment by ID" })
  @ApiParam({ name: "id", type: Number, description: "Comment ID" })
  @ApiResponse({ status: 200, description: "Comment deleted successfully" })
  @ApiResponse({ status: 404, description: "Comment not found" })
  remove(@Param("id") id: string) {
    return this.commentService.remove(+id);
  }
}