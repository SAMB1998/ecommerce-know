import { Client, Environment } from "square";

export const { paymentsApi }: any = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});
export const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
export const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
