/*
  Warnings:

  - You are about to drop the column `medico_responsavel_id` on the `paciente` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."consulta" DROP CONSTRAINT "consulta_medico_responsavel_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."paciente" DROP CONSTRAINT "paciente_medico_responsavel_id_fkey";

-- AlterTable
ALTER TABLE "public"."paciente" DROP COLUMN "medico_responsavel_id";
