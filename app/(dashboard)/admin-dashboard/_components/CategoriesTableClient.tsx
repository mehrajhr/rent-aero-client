"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FolderTree, Search, Calendar, Tag } from "lucide-react";
import CategoryModal from "./CategoryModal";

interface Props {
  initialCategories: any[];
}

export default function CategoriesTableClient({ initialCategories }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  // Client-side search filtering by name or slug
  const filteredCategories = initialCategories.filter((cat) => {
    const name = cat.name?.toLowerCase() || "";
    const slug = cat.slug?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    return name.includes(term) || slug.includes(term);
  });

  return (
    <div className="space-y-6">
      {/* Search Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border bg-card p-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by category name or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>
        <div className="text-xs text-muted-foreground font-medium">
          Total Categories: <strong className="text-foreground">{filteredCategories.length}</strong>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center space-y-3">
          <FolderTree className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg">No categories found</h3>
          <p className="text-xs text-muted-foreground">Try searching with a different keyword.</p>
        </div>
      ) : (
        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-4 font-bold">Category Name</th>
                  <th className="p-4 font-bold">Slug</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Created At</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCategories.map((category: any) => (
                  <tr key={category.id} className="hover:bg-muted/10 transition-colors">
                    {/* Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                          <FolderTree className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-foreground">{category.name}</span>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="p-4 font-mono text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-primary" /> {category.slug}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <Badge
                        className={
                          category.isActive
                            ? "bg-green-500/10 text-green-600 border-none font-bold"
                            : "bg-gray-500/10 text-gray-600 border-none font-bold"
                        }
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>

                    {/* Created Date */}
                    <td className="p-4 text-xs text-muted-foreground font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {new Date(category.createdAt).toLocaleDateString("en-US", {
                          dateStyle: "medium",
                        })}
                      </span>
                    </td>

                    {/* Actions (Edit / Toggle Active) */}
                    <td className="p-4 text-right">
                      <CategoryModal category={category} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}