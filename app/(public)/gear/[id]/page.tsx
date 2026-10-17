import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { Star, User, Tag, CheckCircle2, XCircle, MessageSquare } from "lucide-react";
import RentNowSection from "./_components/RentNowSection";
import { fetchSingleGearItem } from "../../_action/gearActions";
import { IGearItem } from "../../_types/gear.types";
import { jwtUtils } from "@/utils/jwt"; // Adjust according to your jwt utility path
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

interface DetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function GearDetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const response = await fetchSingleGearItem(id);
  const gear: IGearItem | null = response?.data || response;

  if (!gear) {
    notFound();
  }

  // Check authentication status from cookies in server component
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let isLoggedIn = false;

  if (accessToken) {
    const decoded = jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string);
    isLoggedIn = Boolean(decoded?.success);
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Info, Specs & Reviews (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="rounded-2xl border bg-card p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge className="gap-1"><Tag className="h-3 w-3" /> {gear.category?.name}</Badge>
                <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-md">
                  {gear.brand}
                </span>
              </div>

              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
                gear.isAvailable ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
              }`}>
                {gear.isAvailable ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                {gear.isAvailable ? "Ready to Rent" : "Currently Rented"}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{gear.name}</h1>
              
              <div className="flex items-center gap-2 text-sm text-amber-500 font-semibold">
                <Star className="h-4 w-4 fill-current" />
                <span>{gear.averageRating > 0 ? gear.averageRating : "No ratings yet"}</span>
                <span className="text-muted-foreground font-normal">({gear.totalReviews} customer reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-base border-t pt-4">
              {gear.description}
            </p>

            <div className="rounded-xl border p-4 flex items-center gap-4 bg-muted/30">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Equipment Provided By</p>
                <p className="font-bold text-sm">{gear.provider?.name} ({gear.provider?.email})</p>
              </div>
            </div>
          </div>

          {gear.specifications && Object.keys(gear.specifications).length > 0 && (
            <div className="rounded-2xl border bg-card p-8 space-y-4 shadow-sm">
              <h3 className="font-bold text-xl tracking-tight">Technical Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(gear.specifications).map(([key, value]) => (
                  <div key={key} className="rounded-lg bg-muted/50 p-4 border flex justify-between items-center text-sm">
                    <span className="text-muted-foreground capitalize font-medium">{key}</span>
                    <span className="font-bold text-foreground">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews Section */}
          <div className="rounded-2xl border bg-card p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-bold text-xl tracking-tight flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" /> Customer Reviews ({gear.totalReviews})
              </h3>
            </div>

            {gear.reviews && gear.reviews.length > 0 ? (
              <div className="space-y-4">
                {gear.reviews.map((review: { id: Key | null | undefined; user: { name: string; }; createdAt: string | number | Date; rating: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; comment: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                  <div key={review.id} className="rounded-xl border bg-muted/20 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {review.user?.name ? review.user.name.substring(0, 2).toUpperCase() : "U"}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{review.user?.name || "Anonymous User"}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-full text-xs font-bold">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{review.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No reviews yet for this equipment. Be the first one to rent and review!
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Rent Section (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <RentNowSection 
              pricePerDay={gear.pricePerDay} 
              gearId={gear.id} 
              maxStock={gear.stock} 
              isLoggedIn={isLoggedIn} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}