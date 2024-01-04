/*
  Warnings:

  - You are about to drop the column `ageRestriction` on the `ChatRoom` table. All the data in the column will be lost.
  - You are about to drop the `_ChatRoomToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `capacity` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPrivate` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxAge` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minAge` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ChatRoomToUser" DROP CONSTRAINT "_ChatRoomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatRoomToUser" DROP CONSTRAINT "_ChatRoomToUser_B_fkey";

-- AlterTable
ALTER TABLE "ChatRoom" DROP COLUMN "ageRestriction",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "info" TEXT,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL,
ADD COLUMN     "maxAge" INTEGER NOT NULL,
ADD COLUMN     "minAge" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ChatRoomToUser";

-- CreateTable
CREATE TABLE "_ChatRoomParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatRoomParticipants_AB_unique" ON "_ChatRoomParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatRoomParticipants_B_index" ON "_ChatRoomParticipants"("B");

-- AddForeignKey
ALTER TABLE "_ChatRoomParticipants" ADD CONSTRAINT "_ChatRoomParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomParticipants" ADD CONSTRAINT "_ChatRoomParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
