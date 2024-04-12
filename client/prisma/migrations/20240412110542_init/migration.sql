-- CreateTable
CREATE TABLE "Meta" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "inward_number" INTEGER NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inward_date" TIMESTAMP(3),
    "ind_name" VARCHAR(255) NOT NULL,
    "dept_name" VARCHAR(255) NOT NULL,
    "party_name" VARCHAR(255) NOT NULL,
    "claimant_name" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255),
    "amount" INTEGER NOT NULL,
    "advanced_req" BOOLEAN,
    "alloted_to_id" VARCHAR(255),
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "meta_id" VARCHAR(255) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "remarks" VARCHAR(255),
    "employee_id" TEXT NOT NULL,
    "time_stamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meta" ADD CONSTRAINT "Meta_alloted_to_id_fkey" FOREIGN KEY ("alloted_to_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_meta_id_fkey" FOREIGN KEY ("meta_id") REFERENCES "Meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
