CREATE TABLE "programs" (
	"programId" serial NOT NULL,
	"heroImg" TEXT NOT NULL,
	"header" TEXT NOT NULL,
	"subHeader" TEXT NOT NULL,
	"content" TEXT NOT NULL,
	"duration" INT NOT NULL,
	"cost" INT NULL,
	CONSTRAINT "programs_pk" PRIMARY KEY ("programId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "books" (
	"bookId" serial NOT NULL,
	"date" DATE NOT NULL,
	"hour" TEXT NOT NULL,
	"currentlyReservated" INT,
	"limit" INT NOT NULL,
	"programId" INT NULL,
	CONSTRAINT "books_pk" PRIMARY KEY ("bookId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "reservations" (
	"reservationId" serial NOT NULL,
	"bookId" INT NOT NULL,
	"fullName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"phone" TEXT,
	"howManyChildren" INT NULL,
	"nameOfChildren" TEXT NOT NULL,
	CONSTRAINT "reservations_pk" PRIMARY KEY ("reservationId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "books" ADD CONSTRAINT "books_fk0" FOREIGN KEY ("programId") REFERENCES "programs"("programId");
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_fk0" FOREIGN KEY ("bookId") REFERENCES "books"("bookId");
