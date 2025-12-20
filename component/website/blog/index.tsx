'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// TypeScript Interfaces
export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  featured?: boolean;
  image: string;
  author: Author;
  date: string;
}

export interface SidebarPost {
  id: number;
  title: string;
  category: string;
  image: string;
  author: string;
  date: string;
}

export interface BlogPostsProps {
  title?: string;
  subtitle?: string;
  mainPosts: BlogPost[];
  sidebarPosts: SidebarPost[];
  categoryColors?: Record<string, string>;
  onPostClick?: (postId: number) => void;
  onReadMore?: (postId: number) => void;
  postsPerPage?: number;
}

const defaultCategoryColors: Record<string, string> = {
  TECHNOLOGY: 'bg-orange-500',
  INNOVATION: 'bg-orange-500',
  BUSINESS: 'bg-orange-500',
  MARKETING: 'bg-orange-500',
  DESIGN: 'bg-orange-500',
  TECH: 'bg-orange-500',
  DEFAULT: 'bg-gray-500',
};

export default function BlogPosts({
  title = 'RECENT BLOG POSTS',
  subtitle = 'Nulla facilisi tellus duis consectetur sit adipisci logs nain quidem sint consectetur velit',
  mainPosts,
  sidebarPosts,
  categoryColors = defaultCategoryColors,
  onPostClick,
  onReadMore,
  postsPerPage = 1,
}: BlogPostsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(mainPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = mainPosts.slice(startIndex, endIndex);

  const getCategoryColor = (category: string): string => {
    const upperCategory = category.toUpperCase();
    return categoryColors[upperCategory] || defaultCategoryColors.DEFAULT;
  };

  const handlePostClick = (postId: number) => {
    if (onPostClick) {
      onPostClick(postId);
    }
  };

  const handleReadMore = (postId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onReadMore) {
      onReadMore(postId);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-gray-600 max-w-3xl">{subtitle}</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Render current page posts */}
            {currentPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                onClick={() => handlePostClick(post.id)}
              >
                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  {post.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-white">Featured</Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-6 md:p-8">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant="default"
                      className={`${getCategoryColor(post.category)} text-white border-none font-semibold px-4 py-1.5`}
                    >
                      {post.category}
                    </Badge>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author Info & Read More */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-orange-100">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {post.author.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{post.author.name}</p>
                        <p className="text-sm text-gray-500">{post.author.role}</p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleReadMore(post.id, e)}
                      className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center gap-1 transition-colors"
                    >
                      Read More
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* No posts message */}
            {mainPosts.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <p className="text-lg">No blog posts available at the moment.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 py-8 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1}–{Math.min(endIndex, mainPosts.length)} of {mainPosts.length} posts
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goPrev}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => goToPage(page)}
                        className={
                          currentPage === page
                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                            : ''
                        }
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <aside className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Posts</h3>
            {sidebarPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
                onClick={() => handlePostClick(post.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-5">
                  <Badge
                    variant="default"
                    className={`${getCategoryColor(post.category)} text-white border-none font-medium text-xs px-3 py-1 mb-3`}
                  >
                    {post.category}
                  </Badge>

                  <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-orange-600 transition-colors">
                    {post.title}
                  </h4>

                  <div className="flex items-center text-xs text-gray-500">
                    <span className="font-medium">By {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {sidebarPosts.length === 0 && (
              <p className="text-center text-gray-500 py-8">No popular posts available</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}