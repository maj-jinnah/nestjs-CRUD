import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the first post content',
      authorName: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the second post content',
      authorName: 'Jane Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: 'Third Post',
      content: 'This is the third post content',
      authorName: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      title: 'Fourth Post',
      content: 'This is the fourth post content',
      authorName: 'Jane Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      title: 'Fifth Post',
      content: 'This is the fifth post content',
      authorName: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getAllPosts(): Post[] {
    return this.posts;
  }

  getASinglePost(id: number): Post | string {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  getASinglePostUsingQuery(username: string): Post | string {
    const post = this.posts.find((post) =>
      post.authorName.toLowerCase().includes(username.toLowerCase()),
    );
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
    // console.log('postData---', postData);
    // 1. Create the new post object
    const newPost: Post = {
      ...postData, // Spread the incoming data (title, content, authorName)
      id: this.posts.length + 1, // Generate a new ID (assuming your array is named `posts`)
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 2. Add the new post to your in-memory array
    this.posts.push(newPost); // Make sure you are pushing the `newPost`

    // 3. Return the newly created post
    return newPost;
  }

  deletePost(id: number): Post | string {
    console.log('id---', id);
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException('Post not found');
    }
    const deletedPost = this.posts.splice(postIndex, 1)[0];
    return deletedPost;
  }

  updatePost(id: number, postData: Partial<Post>): Post | string {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException('Post not found');
    }
    const updatedPost = {
      ...this.posts[postIndex],
      ...postData,
      updatedAt: new Date(),
    };
    this.posts[postIndex] = updatedPost;
    return updatedPost;
  }
}
