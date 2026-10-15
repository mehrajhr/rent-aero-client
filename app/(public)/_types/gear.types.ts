export interface IGearItem {
  id: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: number;
  stock: number;
  isAvailable: boolean;
  specifications: Record<string, string | number | boolean> | null;
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  provider: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    gearId: string;
    userId: string;
    orderId: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }>;
  averageRating: number;
  totalReviews: number;
}

export interface IGearFilterRequest {
  searchTerm?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface IGearResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: IGearItem[];
}