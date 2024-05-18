/*
  Warnings:

  - You are about to drop the column `createdById` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedById` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_modifiedById_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "createdById",
DROP COLUMN "modifiedById";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;
