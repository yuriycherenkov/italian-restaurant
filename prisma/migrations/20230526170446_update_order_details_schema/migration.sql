/*
  Warnings:

  - The primary key for the `OrderDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("orderId", "menuItemId");
