CREATE TABLE "articles" (
	"articleId" serial NOT NULL,
	"heroImg" TEXT NOT NULL,
	"header" TEXT NOT NULL,
	"subHeader" TEXT NOT NULL,
	"content" TEXT NOT NULL,
	"date" DATE NOT NULL,
	"views" INT NULL,
	CONSTRAINT "articles_pk" PRIMARY KEY ("articleId")
) WITH (
  OIDS=FALSE
);