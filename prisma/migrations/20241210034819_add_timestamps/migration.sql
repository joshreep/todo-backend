/*
  Warnings:

  - Made the column `updatedAt` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `updatedAt` DATETIME(3) NOT NULL;
