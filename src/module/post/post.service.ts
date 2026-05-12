import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/createpost.dto';
import { PostRepository, User } from '../../DB';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {

  constructor(private readonly postRepo:PostRepository ) {}
async getPosts() {

  const Posts=await this.postRepo.findWithOptions({
    relations: ['author'],
    select: {
      author: { id: true, name: true, email: true },
    },
    order: { createdAt: 'DESC' },
  });
 
  return {message:"posts",Posts}
}
  async createPost(body: CreatePostDto , user:User) {
  const {content,title,}=body

  const post =await this.postRepo.create({
    content,
    title,
    authorId:user.id,
  })

 return { message: 'Post created successfully', post: post };  }

 async updatePost(id: number, body: UpdatePostDto, user: User) {
  if (!body || Object.keys(body).length === 0) {
  throw new BadRequestException('No data provided to update');
}
  const findPost = await this.postRepo.findOne({
    id,
    authorId: user.id,
  });

  if (!findPost) {
    throw new NotFoundException('Post not found or not yours');
  }

const updatepost=await this.postRepo.update(
  { id, authorId: user.id },
  {
    ...body
  }
);


const post = await this.postRepo.findOne({
  id,
});

  return {
    message: 'Post updated successfully',
    post: post,
  };
}
 async RemovePost(id: number, user: User) {
  
  const post=await this.postRepo.findOne({id,authorId:user.id})
  if(!post){
     throw new NotFoundException('Post not found or unauthorized');
  }

  const deletePost=await this.postRepo.delete({id})
    if (deletePost.affected === 0) {
    throw new BadRequestException('Failed to delete post');
  }

  return {
    message: 'Post Deleted successfully',
  };
}
}
