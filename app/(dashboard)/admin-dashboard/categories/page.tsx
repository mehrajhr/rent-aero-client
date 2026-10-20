import { fetchCategories } from "../_action/categoryActions";
import CategoriesTableClient from "../_components/CategoriesTableClient";
import CategoryModal from "../_components/CategoryModal";

export default async function AdminCategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Manage Categories</h1>
          <p className="text-muted-foreground text-sm">
            Create, update, and manage equipment categories across the platform.
          </p>
        </div>
        {/* Create Button Modal */}
        <CategoryModal />
      </div>

      {/* Client Component with Search and Table */}
      <CategoriesTableClient initialCategories={categories} />
    </div>
  );
}