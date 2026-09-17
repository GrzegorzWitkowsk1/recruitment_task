import DesktopProductsTable from "./components/ProductsTable/desktop";
import MobileProductsTable from "./components/ProductsTable/Mobile";

export default function MainView() {
  return (
    <div className="flex justify-center">
        <DesktopProductsTable />
        <MobileProductsTable />
    </div>
  );
}