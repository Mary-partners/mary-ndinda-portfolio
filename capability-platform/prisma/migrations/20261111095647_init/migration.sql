-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isPlatformAdmin" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Organisation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Membership_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Programme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fundingPartner" TEXT,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "objectives" TEXT,
    "sectorCoverage" TEXT,
    "geography" TEXT,
    "targetEnterprises" INTEGER,
    "budget" REAL,
    "reportingCadence" TEXT,
    "frameworkVersion" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Programme_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "programmeId" TEXT,
    "legalName" TEXT NOT NULL,
    "tradingName" TEXT,
    "country" TEXT NOT NULL,
    "region" TEXT,
    "sector" TEXT NOT NULL,
    "subsector" TEXT,
    "yearEstablished" INTEGER,
    "businessModel" TEXT,
    "stage" TEXT,
    "ownership" TEXT,
    "employees" INTEGER,
    "founderName" TEXT,
    "advisorId" TEXT,
    "primaryContact" TEXT,
    "scenarioTag" TEXT,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Company_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Company_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Company_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FounderProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "ambition" TEXT,
    "threeYearVision" TEXT,
    "objectiveType" TEXT,
    "topPriorities" TEXT,
    "growthLimiter" TEXT,
    "founderDecisions" TEXT,
    "independentRoles" TEXT,
    "neededCapabilities" TEXT,
    "pastChanges" TEXT,
    "changeOutcomes" TEXT,
    CONSTRAINT "FounderProfile_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Framework" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Framework_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dimension" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "frameworkId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "weight" REAL NOT NULL DEFAULT 1,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Dimension_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "Framework" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dimensionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "helpText" TEXT,
    "weight" REAL NOT NULL DEFAULT 1,
    "order" INTEGER NOT NULL,
    "appliesTo" TEXT,
    CONSTRAINT "Question_dimensionId_fkey" FOREIGN KEY ("dimensionId") REFERENCES "Dimension" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "frameworkId" TEXT NOT NULL,
    "frameworkVersion" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'baseline',
    "assessorRole" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "isBaseline" BOOLEAN NOT NULL DEFAULT false,
    "overallScore" REAL,
    "completeness" REAL,
    "evidenceCoverage" REAL,
    "createdById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finalizedAt" DATETIME,
    "label" TEXT,
    CONSTRAINT "Assessment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Assessment_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "Framework" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assessment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assessmentId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "score" INTEGER,
    "applicable" BOOLEAN NOT NULL DEFAULT true,
    "evidenceStatus" TEXT NOT NULL DEFAULT 'none',
    "confidence" TEXT,
    "rationale" TEXT,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Response_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DimensionScore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assessmentId" TEXT NOT NULL,
    "dimensionId" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "applicableCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "DimensionScore_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DimensionScore_dimensionId_fkey" FOREIGN KEY ("dimensionId") REFERENCES "Dimension" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ConstraintFlag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "note" TEXT,
    CONSTRAINT "ConstraintFlag_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImprovementPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "dimensionKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "weakness" TEXT,
    "rootCause" TEXT,
    "intervention" TEXT,
    "baselineScore" REAL,
    "targetScore" REAL,
    "ownerName" TEXT,
    "advisorName" TEXT,
    "startDate" DATETIME,
    "dueDate" DATETIME,
    "costEstimate" REAL,
    "priority" INTEGER NOT NULL DEFAULT 2,
    "status" TEXT NOT NULL DEFAULT 'Not started',
    "successCriteria" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ImprovementPlan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "planId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Not started',
    "dueDate" DATETIME,
    "order" INTEGER NOT NULL DEFAULT 0,
    "verifiedAt" DATETIME,
    CONSTRAINT "Milestone_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ImprovementPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "planId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ownerName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Not started',
    "dueDate" DATETIME,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Task_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ImprovementPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "planId" TEXT,
    "milestoneId" TEXT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "submittedBy" TEXT,
    "period" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Submitted',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Evidence_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Evidence_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ImprovementPlan" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Evidence_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EvidenceReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "evidenceId" TEXT NOT NULL,
    "reviewerId" TEXT,
    "decision" TEXT NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EvidenceReview_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "Evidence" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EvidenceReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdvisorySession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "advisorId" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationMins" INTEGER,
    "participants" TEXT,
    "priorityProblem" TEXT,
    "observations" TEXT,
    "decisions" TEXT,
    "actions" TEXT,
    "nextReviewDate" DATETIME,
    CONSTRAINT "AdvisorySession_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AdvisorySession_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KpiDefinition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "higherIsBetter" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "CompanyKpi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "kpiKey" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "actual" REAL,
    "target" REAL,
    "baseline" REAL,
    "dataStatus" TEXT NOT NULL DEFAULT 'actual',
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CompanyKpi_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CompanyKpi_kpiKey_fkey" FOREIGN KEY ("kpiKey") REFERENCES "KpiDefinition" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "orgId" TEXT,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "action" TEXT NOT NULL,
    "detail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Membership_orgId_idx" ON "Membership"("orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_orgId_role_key" ON "Membership"("userId", "orgId", "role");

-- CreateIndex
CREATE INDEX "Programme_orgId_idx" ON "Programme"("orgId");

-- CreateIndex
CREATE INDEX "Company_orgId_idx" ON "Company"("orgId");

-- CreateIndex
CREATE INDEX "Company_programmeId_idx" ON "Company"("programmeId");

-- CreateIndex
CREATE UNIQUE INDEX "FounderProfile_companyId_key" ON "FounderProfile"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Framework_name_version_key" ON "Framework"("name", "version");

-- CreateIndex
CREATE INDEX "Dimension_frameworkId_idx" ON "Dimension"("frameworkId");

-- CreateIndex
CREATE INDEX "Question_dimensionId_idx" ON "Question"("dimensionId");

-- CreateIndex
CREATE INDEX "Assessment_companyId_idx" ON "Assessment"("companyId");

-- CreateIndex
CREATE INDEX "Response_assessmentId_idx" ON "Response"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Response_assessmentId_questionId_key" ON "Response"("assessmentId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "DimensionScore_assessmentId_dimensionId_key" ON "DimensionScore"("assessmentId", "dimensionId");

-- CreateIndex
CREATE INDEX "ConstraintFlag_companyId_idx" ON "ConstraintFlag"("companyId");

-- CreateIndex
CREATE INDEX "ImprovementPlan_companyId_idx" ON "ImprovementPlan"("companyId");

-- CreateIndex
CREATE INDEX "Milestone_planId_idx" ON "Milestone"("planId");

-- CreateIndex
CREATE INDEX "Task_planId_idx" ON "Task"("planId");

-- CreateIndex
CREATE INDEX "Evidence_companyId_idx" ON "Evidence"("companyId");

-- CreateIndex
CREATE INDEX "EvidenceReview_evidenceId_idx" ON "EvidenceReview"("evidenceId");

-- CreateIndex
CREATE INDEX "AdvisorySession_companyId_idx" ON "AdvisorySession"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "KpiDefinition_key_key" ON "KpiDefinition"("key");

-- CreateIndex
CREATE INDEX "CompanyKpi_companyId_idx" ON "CompanyKpi"("companyId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");
