import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

export const accountApiRequests = {
	me: () => http.get<AccountResType>("/accounts/me")
}