/*
  Warnings:

  - Added the required column `medico_responsavel_id` to the `paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."paciente" ADD COLUMN     "medico_responsavel_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."consulta" ADD CONSTRAINT "consulta_medico_responsavel_id_fkey" FOREIGN KEY ("medico_responsavel_id") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."paciente" ADD CONSTRAINT "paciente_medico_responsavel_id_fkey" FOREIGN KEY ("medico_responsavel_id") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
