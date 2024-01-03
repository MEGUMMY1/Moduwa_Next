-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "postId" INTEGER;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
