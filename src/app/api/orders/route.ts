import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSettings } from "@/lib/settings";
import { makeOrderNumber } from "@/lib/format";

const PAYMENT_METHODS = ["cod", "transfer"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customerName = typeof body?.customerName === "string" ? body.customerName.trim().slice(0, 150) : "";
    const customerPhone = typeof body?.customerPhone === "string" ? body.customerPhone.trim().slice(0, 40) : "";
    const customerEmail = typeof body?.customerEmail === "string" ? body.customerEmail.trim().slice(0, 150) : "";
    const city = typeof body?.city === "string" ? body.city.trim().slice(0, 80) : "";
    const address = typeof body?.address === "string" ? body.address.trim().slice(0, 500) : "";
    const notes = typeof body?.notes === "string" ? body.notes.trim().slice(0, 1000) : "";
    const paymentMethod = PAYMENT_METHODS.includes(body?.paymentMethod) ? body.paymentMethod : "cod";
    const items: { id: unknown; qty: unknown }[] = Array.isArray(body?.items) ? body.items : [];

    if (!customerName || !customerPhone || items.length === 0) {
      return NextResponse.json({ error: "Informations incomplètes" }, { status: 400 });
    }

    // Les prix sont recalculés côté serveur à partir de la base.
    let subtotal = 0;
    const lines: { productId: number; productName: string; productImage: string; quantity: number; unitPrice: number }[] = [];
    for (const it of items.slice(0, 100)) {
      const id = Number(it.id);
      const qty = Math.min(Math.max(Math.round(Number(it.qty)) || 0, 1), 99);
      if (!Number.isInteger(id) || qty < 1) continue;
      const [p] = await db.select().from(products).where(eq(products.id, id)).limit(1);
      if (!p) continue;
      const price = parseFloat(p.price as string);
      subtotal += price * qty;
      lines.push({
        productId: p.id,
        productName: p.name,
        productImage: p.image || "",
        quantity: qty,
        unitPrice: price,
      });
    }
    if (lines.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const { delivery: deliverySettings } = await getSettings();
    const delivery = subtotal >= deliverySettings.freeThreshold ? 0 : deliverySettings.fee;
    const total = subtotal + delivery;
    const orderNumber = makeOrderNumber();

    const [inserted] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        city: city || "Tripoli",
        address,
        notes,
        paymentMethod,
        subtotal: String(subtotal),
        delivery: String(delivery),
        total: String(total),
        status: "pending",
      })
      .returning();

    for (const l of lines) {
      await db.insert(orderItems).values({
        orderId: inserted.id,
        productId: l.productId,
        productName: l.productName,
        productImage: l.productImage,
        quantity: l.quantity,
        unitPrice: String(l.unitPrice),
      });
    }

    return NextResponse.json({ ok: true, orderNumber, total, delivery, subtotal });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const num = req.nextUrl.searchParams.get("number");
  if (!num) return NextResponse.json({ error: "missing" }, { status: 400 });
  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, num)).limit(1);
  if (!order) return NextResponse.json({ error: "not found" }, { status: 404 });
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  return NextResponse.json({ order, items });
}
