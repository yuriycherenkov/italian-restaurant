-- AlterTable
CREATE SEQUENCE token_id_seq;
ALTER TABLE "Token" ALTER COLUMN "id" SET DEFAULT nextval('token_id_seq'),
ALTER COLUMN "description" DROP NOT NULL;
ALTER SEQUENCE token_id_seq OWNED BY "Token"."id";
