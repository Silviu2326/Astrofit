export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  category: GroupCategory;
  coverImage: string;
  icon: string;
  privacy: 'public' | 'private' | 'secret';
  memberCount: number;
  postCount: number;
  createdAt: Date;
  createdBy: string;
  admins: string[];
  moderators: string[];
  rules: GroupRule[];
  tags: string[];
  isJoined: boolean;
  isAdmin: boolean;
  isModerator: boolean;
}

export interface GroupRule {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface GroupMember {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  postsCount: number;
  reputation: number;
}

export interface GroupPost {
  id: string;
  groupId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  isPinned: boolean;
  isLiked: boolean;
  createdAt: Date;
}

export type GroupCategory =
  | 'technology'
  | 'gaming'
  | 'art'
  | 'music'
  | 'sports'
  | 'education'
  | 'business'
  | 'lifestyle'
  | 'entertainment'
  | 'other';

export interface CreateGroupData {
  name: string;
  description: string;
  category: GroupCategory;
  privacy: 'public' | 'private' | 'secret';
  coverImage?: string;
  icon?: string;
  rules: Omit<GroupRule, 'id'>[];
  tags: string[];
}
