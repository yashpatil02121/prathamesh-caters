import jsPDF from "jspdf";
import type { SelectedMenuItem } from "../types/menu";

export function generateMenuPdf(
  selectedItems: SelectedMenuItem[],
) {
  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  let y = 22;

  /*
   * Colors
   *
   * Brand:   #5A1827
   * Accent:  #E28413
   */
  const brand = [90, 24, 39] as const;
  const accent = [226, 132, 19] as const;
  const muted = [110, 105, 100] as const;

  // ---------------------------------------
  // Header
  // ---------------------------------------

  pdf.setFillColor(...brand);
  pdf.rect(0, 0, pageWidth, 42, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);

  pdf.text(
    "PRATHAMESH DECORATORS & CATERS",
    margin,
    18,
  );

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(245, 230, 225);

  pdf.text(
    "Selected Menu",
    margin,
    28,
  );

  pdf.setTextColor(...accent);
  pdf.setFontSize(9);

  pdf.text(
    `${selectedItems.length} selected ${
      selectedItems.length === 1
        ? "item"
        : "items"
    }`,
    pageWidth - margin,
    28,
    {
      align: "right",
    },
  );

  y = 56;

  // ---------------------------------------
  // Group selected items
  // ---------------------------------------

  const grouped = new Map<
    string,
    string[]
  >();

  for (const selected of selectedItems) {
    const existing = grouped.get(
      selected.categoryTitle,
    );

    if (existing) {
      existing.push(selected.item);
    } else {
      grouped.set(selected.categoryTitle, [
        selected.item,
      ]);
    }
  }

  // ---------------------------------------
  // Categories
  // ---------------------------------------

  for (const [
    category,
    items,
  ] of grouped.entries()) {
    // Estimate category height.
    const estimatedHeight =
      14 + items.length * 8;

    if (
      y + estimatedHeight >
      pageHeight - 20
    ) {
      pdf.addPage();
      y = 20;
    }

    // Category title
    pdf.setTextColor(...accent);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);

    pdf.text(
      category.toUpperCase(),
      margin,
      y,
    );

    y += 6;

    // Category underline
    pdf.setDrawColor(...accent);
    pdf.setLineWidth(0.4);

    pdf.line(
      margin,
      y,
      margin + 35,
      y,
    );

    y += 6;

    // Items
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(...brand);

    for (const item of items) {
      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 20;
      }

      // Check circle
      pdf.setDrawColor(...accent);
      pdf.setLineWidth(0.5);
      pdf.circle(
        margin + 2,
        y - 1.2,
        1.3,
      );

      pdf.setTextColor(...brand);

      const lines = pdf.splitTextToSize(
        item,
        contentWidth - 10,
      );

      pdf.text(
        lines,
        margin + 8,
        y,
      );

      y += Math.max(
        7,
        lines.length * 5,
      );
    }

    y += 5;
  }

  // ---------------------------------------
  // Footer on every page
  // ---------------------------------------

  const totalPages =
    pdf.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    pdf.setPage(page);

    pdf.setDrawColor(230, 220, 215);
    pdf.setLineWidth(0.3);

    pdf.line(
      margin,
      pageHeight - 12,
      pageWidth - margin,
      pageHeight - 12,
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...muted);

    pdf.text(
      "Prathamesh Decorators & Caters",
      margin,
      pageHeight - 7,
    );

    pdf.text(
      `${page} / ${totalPages}`,
      pageWidth - margin,
      pageHeight - 7,
      {
        align: "right",
      },
    );
  }

  pdf.save(
    "prathamesh-selected-menu.pdf",
  );
}