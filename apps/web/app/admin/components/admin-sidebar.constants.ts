import {
  RiAddCircleLine,
  RiAdminLine,
  RiBarcodeLine,
  RiBuilding4Line,
  RiCoupon3Line,
  RiDashboard3Line,
  RiFileList3Line,
  RiFoldersLine,
  RiGridLine,
  RiHashtag,
  RiHistoryLine,
  RiMoneyDollarCircleLine,
  RiPriceTag3Line,
  RiQrCodeLine,
  RiRefund2Line,
  RiRulerLine,
  RiShieldCheckLine,
  RiShoppingBag3Line,
  RiShoppingCart2Line,
  RiStockLine,
  RiSubtractLine,
  RiSwapBoxLine,
} from "@remixicon/react";
import type { AdminNavSection } from "./admin-sidebar.types";

export const ADMIN_NAV_SECTIONS: readonly AdminNavSection[] = [
  {
    id: "sec-main",
    sectionTitle: "Main",
    items: [
      {
        id: "nav-dashboard",
        label: "Dashboard",
        href: "/admin",
        icon: RiDashboard3Line,
      },
      {
        id: "nav-super-admin",
        label: "Super Admin",
        href: "/admin/super-admin",
        icon: RiAdminLine,
      },
    ],
  },
  {
    id: "sec-inventory",
    sectionTitle: "Inventory",
    items: [
      {
        id: "nav-products",
        label: "Products",
        href: "/admin/products",
        icon: RiShoppingBag3Line,
      },
      {
        id: "nav-create-product",
        label: "Create Product",
        href: "/admin/create-product",
        icon: RiAddCircleLine,
      },
      {
        id: "nav-expired-products",
        label: "Expired Products",
        href: "/admin/expired-products",
        icon: RiHistoryLine,
      },
      {
        id: "nav-low-stocks",
        label: "Low Stocks",
        href: "/admin/low-stocks",
        icon: RiStockLine,
      },
      {
        id: "nav-category",
        label: "Category",
        href: "/admin/category",
        icon: RiFoldersLine,
      },
      {
        id: "nav-sub-category",
        label: "Sub Category",
        href: "/admin/sub-category",
        icon: RiGridLine,
      },
      {
        id: "nav-brands",
        label: "Brands",
        href: "/admin/brands",
        icon: RiBuilding4Line,
      },
      {
        id: "nav-units",
        label: "Units",
        href: "/admin/units",
        icon: RiRulerLine,
      },
      {
        id: "nav-variant-attributes",
        label: "Variant Attributes",
        href: "/admin/variant-attributes",
        icon: RiHashtag,
      },
      {
        id: "nav-warranties",
        label: "Warranties",
        href: "/admin/warranties",
        icon: RiShieldCheckLine,
      },
      {
        id: "nav-print-barcode",
        label: "Print Barcode",
        href: "/admin/print-barcode",
        icon: RiBarcodeLine,
      },
      {
        id: "nav-print-qr",
        label: "Print QR Code",
        href: "/admin/print-qr-code",
        icon: RiQrCodeLine,
      },
    ],
  },
  {
    id: "sec-stock",
    sectionTitle: "Stock",
    items: [
      {
        id: "nav-manage-stock",
        label: "Manage Stock",
        href: "/admin/manage-stock",
        icon: RiStockLine,
      },
      {
        id: "nav-stock-adjustment",
        label: "Stock Adjustment",
        href: "/admin/stock-adjustment",
        icon: RiSubtractLine,
      },
      {
        id: "nav-stock-transfer",
        label: "Stock Transfer",
        href: "/admin/stock-transfer",
        icon: RiSwapBoxLine,
      },
    ],
  },
  {
    id: "sec-sales",
    sectionTitle: "Sales",
    items: [
      {
        id: "nav-sales",
        label: "Sales",
        href: "/admin/sales",
        icon: RiShoppingCart2Line,
      },
      {
        id: "nav-invoices",
        label: "Invoices",
        href: "/admin/invoices",
        icon: RiFileList3Line,
      },
      {
        id: "nav-sales-return",
        label: "Sales Return",
        href: "/admin/sales-return",
        icon: RiRefund2Line,
      },
      {
        id: "nav-quotation",
        label: "Quotation",
        href: "/admin/quotation",
        icon: RiMoneyDollarCircleLine,
      },
      {
        id: "nav-pos",
        label: "POS",
        href: "/admin/pos",
        icon: RiPriceTag3Line,
      },
    ],
  },
  {
    id: "sec-promo",
    sectionTitle: "Promo",
    items: [
      {
        id: "nav-coupons",
        label: "Coupons",
        href: "/admin/coupons",
        icon: RiCoupon3Line,
      },
    ],
  },
] as const;
