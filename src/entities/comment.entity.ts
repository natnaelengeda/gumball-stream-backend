import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty()
  id: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false, description: "Optional username of commenter" })
  userName?: string;

  @Column()
  @ApiProperty({ description: "The actual comment text" })
  comment: string;

  @Column()
  @ApiProperty({ description: "ID of the parent entity (e.g. episode, blog, etc.)" })
  parentId: string;

  @CreateDateColumn()
  @ApiProperty({ description: "Timestamp when comment was created" })
  createdAt: Date;
}