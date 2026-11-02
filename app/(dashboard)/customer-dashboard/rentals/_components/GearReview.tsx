"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  createRentalReview,
  updateRentalReview,
} from "../_action/reviewActions";

interface ReviewData {
  id: string;
  rating: number;
  comment?: string | null;
}

interface GearReviewProps {
  orderId: string;
  gearId: string;
  gearName: string;
  review: ReviewData | null;
}

export default function GearReview({
  orderId,
  gearId,
  gearName,
  review,
}: GearReviewProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(!review);
  const [rating, setRating] = useState(review?.rating ?? 0);
  const [comment, setComment] = useState(review?.comment ?? "");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rating < 1 || rating > 5) {
      toast.error("Choose a rating from 1 to 5 stars.");
      return;
    }

    startTransition(async () => {
      const input = { rating, comment: comment.trim() };
      const result = review
        ? await updateRentalReview(orderId, gearId, review.id, input)
        : await createRentalReview(orderId, gearId, input);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      setIsEditing(false);
      router.refresh();
    });
  };

  const cancelEdit = () => {
    setRating(review?.rating ?? 0);
    setComment(review?.comment ?? "");
    setIsEditing(false);
  };

  return (
    <section id={`review-${gearId}`} className="space-y-3 border-t pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h5 className="font-semibold">Your review</h5>
          <p className="text-sm text-muted-foreground">
            Share how {gearName} worked for you.
          </p>
        </div>
        {!isEditing && review && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit review
          </Button>
        )}
      </div>

      {!isEditing && review ? (
        <div className="rounded-xl bg-muted/40 p-4">
          <div
            className="flex items-center gap-1"
            role="img"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                className={`h-4 w-4 ${
                  index < review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/40"
                }`}
              />
            ))}
            <span className="ml-1 text-sm font-medium">{review.rating}/5</span>
          </div>
          {review.comment ? (
            <p className="mt-2 whitespace-pre-wrap text-sm">{review.comment}</p>
          ) : (
            <p className="mt-2 text-sm italic text-muted-foreground">
              No written comment.
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-muted/30 p-4">
          <fieldset disabled={isPending} className="space-y-2">
            <legend className="text-sm font-medium">Your rating</legend>
            <div className="flex items-center gap-1" role="group" aria-label="Choose a rating from 1 to 5 stars">
              {Array.from({ length: 5 }, (_, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={rating === value}
                    aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
                    onClick={() => setRating(value)}
                    className="rounded-md p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Star
                      aria-hidden="true"
                      className={`h-6 w-6 ${
                        value <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="space-y-2">
            <label htmlFor={`review-comment-${gearId}`} className="text-sm font-medium">
              Comment <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <Textarea
              id={`review-comment-${gearId}`}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="What did you think of this gear?"
              maxLength={1000}
              rows={3}
              disabled={isPending}
            />
            <p className="text-right text-xs text-muted-foreground">
              {comment.length}/1000
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : review ? "Save changes" : "Submit review"}
            </Button>
            {review && (
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
