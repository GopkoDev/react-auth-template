export type GenerateMfaResponse = {
  success: boolean;
  secret: string;
  qrCodeUrl: string;
};

export type VerifyMfaResponse = { success: boolean; message: string };

export type DisableTwoFactorResponse = {
  success: boolean;
  message: string;
};
