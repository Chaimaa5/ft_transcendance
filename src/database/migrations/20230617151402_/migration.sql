/*
  Warnings:

  - You are about to drop the column `TFA` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `TFASecret` on the `User` table. All the data in the column will be lost.
  - Added the required column `TwoFacSecret` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTwoFacEnabled` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "TFA",
DROP COLUMN "TFASecret",
ADD COLUMN     "TwoFacSecret" TEXT NOT NULL,
ADD COLUMN     "isTwoFacEnabled" BOOLEAN NOT NULL;
