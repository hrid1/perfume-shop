import { categoriesService } from '@/services';
import { CategoriesSection } from '../_components/CategoriesSection';

export default async function CategoriesPage() {
  const categories = await categoriesService.getAll();

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10">
      <CategoriesSection categories={categories} />
    </div>
  );
}
