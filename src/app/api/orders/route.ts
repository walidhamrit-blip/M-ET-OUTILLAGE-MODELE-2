import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, customerEmail, city, address, notes, paymentMethod, items } = body;

    if (!customerName || !customerPhone || !items?.length) {
      return NextResponse.json({ error: "Informations incomplètes" }, { status: 400 });
    }

    // Recompute prices from DB
    let subtotal = 0;
    const lines: { productId: number; productName: string; productImage: string; quantity: number; unitPrice: number }[] = [];
    for (const it of items) {
      const p = await db.select().from(products).where(eq(products.id, it.id)).limit(1);
      if (!p[0]) continue;
      const price = parseFloat(p[0].price as string);
      subtotal += price * it.qty;
      lines.push({
        productId: p[0].id,
        productName: p[0].name,
        productImage: p[0].image || "",
        quantity: it.qty,
        unitPrice: price,
      });
    }

    const delivery = subtotal >= 500 ? 0 : 25;
    const total = subtotal + delivery;
    const orderNumber = `MTK-${Date.now().toString().slice(-8)}`;

    const inserted = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        city: city || "Tripoli",
        address,
        notes,
        paymentMethod: paymentMethod || "cod",
        subtotal: String(subtotal),
        delivery: String(delivery),
        total: String(total),
        status: "pending",
      })
      .returning();

    const orderId = inserted[0].id;
    for (const l of lines) {
      await db.insert(orderItems).values({
        orderId,
        productId: l.productId,
        productName: l.productName,
        productImage: l.productImage,
        quantity: l.quantity,
        unitPrice: String(l.unitPrice),
      });
    }

    return NextResponse.json({ ok: true, orderNumber, total });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const num = req.nextUrl.searchParams.get("number");
  if (!num) return NextResponse.json({ error: "missing" }, { status: 400 });
  const rows = await db.select().from(orders).where(eq(orders.orderNumber, num)).limit(1);
  if (!rows[0]) return NextResponse.json({ error: "not found" }, { status: 404 });
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, rows[0].id));
  return NextResponse.json({ order: rows[0], items });
}
