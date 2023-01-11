import { prisma, Prisma, PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const orden = await prisma.orden.create({
      data: {
        nombre: req.body.nombre,
        total: req.body.total,
        pedido: req.body.pedido,
        fecha: req.body.fecha,
      },
    });
    res.json({ orden });
  }
}

// curl -X POST \
//       'https://api.mercadopago.com/instore/orders/qr/seller/collectors/{user_id}/pos/{external_pos_id}/qrs' \
//       -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
//       -H 'Content-Type: application/json' \
//       -d '{
//   "external_reference": 12345,
//   "title": "Product order",
//   "notification_url": "www.yourserver.com",
//   "total_amount": 100,
//   "items": [
//     {
//       "sku_number": "A123K9191938",
//       "category": "marketplace",
//       "title": "Point Mini",
//       "description": "This is the Point Mini",
//       "unit_price": 100,
//       "quantity": 1,
//       "unit_measure": "unit",
//       "total_amount": 100
//     }
//   ],
//   "taxes": [
//     {
//       "value": 19,
//       "type": "IVA"
//     }
//   ],
//   "sponsor": {
//     "id": 446566691
//   },
//   "cash_out": {}
// }'
