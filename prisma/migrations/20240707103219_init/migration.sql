BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Jwt] (
    [id] INT NOT NULL IDENTITY(1,1),
    [accessToken] NVARCHAR(1000) NOT NULL,
    [refreshToken] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [Jwt_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Jwt_accessToken_key] UNIQUE NONCLUSTERED ([accessToken]),
    CONSTRAINT [Jwt_refreshToken_key] UNIQUE NONCLUSTERED ([refreshToken])
);

-- AddForeignKey
ALTER TABLE [dbo].[Jwt] ADD CONSTRAINT [Jwt_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
