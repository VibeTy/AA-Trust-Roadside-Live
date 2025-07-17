
import { Request, Response } from 'express';

interface GoogleReview {
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: number;
  comment: string;
  createTime: string;
  updateTime: string;
}

interface GoogleBusinessProfile {
  name: string;
  locationName: string;
  averageRating: number;
  totalReviewCount: number;
  reviews: GoogleReview[];
}

class GoogleReviewsService {
  private accessToken: string;
  private accountId: string;
  private locationId: string;

  constructor() {
    this.accessToken = process.env.GOOGLE_MY_BUSINESS_ACCESS_TOKEN || '';
    this.accountId = process.env.GOOGLE_MY_BUSINESS_ACCOUNT_ID || '';
    this.locationId = process.env.GOOGLE_MY_BUSINESS_LOCATION_ID || '';
  }

  async fetchReviews(): Promise<GoogleBusinessProfile | null> {
    try {
      // Fetch location details and reviews
      const locationResponse = await fetch(
        `https://mybusiness.googleapis.com/v4/accounts/${this.accountId}/locations/${this.locationId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!locationResponse.ok) {
        console.error('Failed to fetch location:', locationResponse.statusText);
        return null;
      }

      const locationData = await locationResponse.json();

      // Fetch reviews
      const reviewsResponse = await fetch(
        `https://mybusiness.googleapis.com/v4/accounts/${this.accountId}/locations/${this.locationId}/reviews`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!reviewsResponse.ok) {
        console.error('Failed to fetch reviews:', reviewsResponse.statusText);
        return null;
      }

      const reviewsData = await reviewsResponse.json();

      return {
        name: locationData.locationName || 'AA Trust Roadside',
        locationName: locationData.locationName || 'Palm Coast, FL',
        averageRating: locationData.averageRating || 4.8,
        totalReviewCount: locationData.totalReviewCount || 62,
        reviews: reviewsData.reviews || [],
      };

    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      return null;
    }
  }

  // Transform Google review to our testimonial format
  transformToTestimonial(review: GoogleReview) {
    return {
      rating: review.starRating,
      text: review.comment,
      author: review.reviewer.displayName,
      title: "", // Google reviews don't have job titles
      initial: review.reviewer.displayName.charAt(0).toUpperCase(),
      date: review.createTime,
      source: 'google'
    };
  }
}

export default GoogleReviewsService;
