import { useState, useCallback } from 'react';

interface SocialPost {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram';
  content: string;
  scheduledDate: string | null;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
}

interface UseSocialMedia {
  posts: SocialPost[];
  loading: boolean;
  error: string | null;
  publishPost: (platform: SocialPost['platform'], content: string) => Promise<void>;
  schedulePost: (platform: SocialPost['platform'], content: string, scheduledDate: string) => Promise<void>;
  fetchPosts: () => Promise<void>;
}

const mockSocialPosts: SocialPost[] = [
  { id: 's1', platform: 'facebook', content: 'Hello from Facebook!', scheduledDate: null, status: 'published' },
  { id: 's2', platform: 'twitter', content: 'Tweet tweet! #marketing', scheduledDate: '2025-10-01T10:00:00Z', status: 'scheduled' },
];

export const useSocialMedia = (): UseSocialMedia => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      setPosts(mockSocialPosts);
    } catch (err) {
      setError('Failed to fetch social media posts.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const publishPost = useCallback(async (platform: SocialPost['platform'], content: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const newPost: SocialPost = { id: `s${Date.now()}`, platform, content, scheduledDate: null, status: 'published' };
      setPosts(prev => [...prev, newPost]);
    } catch (err) {
      setError('Failed to publish post.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const schedulePost = useCallback(async (platform: SocialPost['platform'], content: string, scheduledDate: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newPost: SocialPost = { id: `s${Date.now()}`, platform, content, scheduledDate, status: 'scheduled' };
      setPosts(prev => [...prev, newPost]);
    } catch (err) {
      setError('Failed to schedule post.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { posts, loading, error, publishPost, schedulePost, fetchPosts };
};
