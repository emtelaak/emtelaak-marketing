/**
 * Headless CMS API Client
 * 
 * Fetches content from the Emtelaak platform's Headless CMS API
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface DynamicPage {
  slug: string;
  title: string;
  titleAr?: string | null;
  contentJson: any;
  contentJsonAr?: any | null;
  metaDescription?: string | null;
  metaDescriptionAr?: string | null;
  publishedAt?: Date | null;
}

export interface PlatformContent {
  key: string;
  content: any;
  contentAr?: any | null;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  cached?: boolean;
}

/**
 * Fetch a dynamic page by slug
 */
export async function getPage(slug: string): Promise<DynamicPage | null> {
  try {
    const response = await fetch(`${API_URL}/api/v1/cms/pages/${slug}`, {
      next: {
        revalidate: 300, // ISR: Revalidate every 5 minutes
        tags: [`page:${slug}`],
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }

    const result: APIResponse<DynamicPage> = await response.json();
    
    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(`Error fetching page "${slug}":`, error);
    return null;
  }
}

/**
 * List all published pages
 */
export async function listPages(): Promise<DynamicPage[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/cms/pages`, {
      next: {
        revalidate: 600, // ISR: Revalidate every 10 minutes
        tags: ['pages:list'],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to list pages: ${response.statusText}`);
    }

    const result: APIResponse<DynamicPage[]> = await response.json();
    
    if (!result.success || !result.data) {
      return [];
    }

    return result.data;
  } catch (error) {
    console.error('Error listing pages:', error);
    return [];
  }
}

/**
 * Fetch platform content by key
 */
export async function getContent(key: string): Promise<PlatformContent | null> {
  try {
    const response = await fetch(`${API_URL}/api/v1/cms/content/${key}`, {
      next: {
        revalidate: 300, // ISR: Revalidate every 5 minutes
        tags: [`content:${key}`],
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch content: ${response.statusText}`);
    }

    const result: APIResponse<PlatformContent> = await response.json();
    
    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(`Error fetching content "${key}":`, error);
    return null;
  }
}

/**
 * List all content keys
 */
export async function listContentKeys(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/cms/content`, {
      next: {
        revalidate: 600, // ISR: Revalidate every 10 minutes
        tags: ['content:keys'],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to list content keys: ${response.statusText}`);
    }

    const result: APIResponse<string[]> = await response.json();
    
    if (!result.success || !result.data) {
      return [];
    }

    return result.data;
  } catch (error) {
    console.error('Error listing content keys:', error);
    return [];
  }
}

/**
 * Health check
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/v1/cms/health`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result.success && result.status === 'ok';
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}
