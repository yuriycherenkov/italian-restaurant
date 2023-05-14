/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Dish` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `version` on the `RestaurantMenu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_categoryId_fkey";

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RestaurantMenu" DROP COLUMN "version",
ADD COLUMN     "version" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
