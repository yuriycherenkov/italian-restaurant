-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;