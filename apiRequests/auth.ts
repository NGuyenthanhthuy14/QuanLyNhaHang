import http from "@/lib/http";
import { LoginBodyType, LoginResType, LogoutBodyType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
	sLogin: (body: LoginBodyType) => http.post<LoginResType>("/auth/login",  body ), // gọi đến BE server trực tiếp, cách này có thể gặp lỗi CORS nếu BE server và FE server khác domain, port hoặc protocol.
	login: (body: LoginBodyType) => http.post<LoginResType>("/api/auth/login",  body, { // gọi đến route api của NextJS, sau đó NextJS sẽ gọi đến BE server. Cách này giúp tránh lỗi CORS.
		baseUrl: ''
	} ),

	sLogout: (body: LogoutBodyType & { accessToken: string }) => http.post("/auth/logout", {
		accessToken: body.accessToken
	}, {
		headers: {
			Authorziation: `Bearer ${body.accessToken}`,
		}
	}),
	logout: (body: LogoutBodyType) => http.post("/api/auth/logout", body, {
		headers: {
			'Content-Type': 'application/json'
		},
		baseUrl: ''
	}),
}

export default authApiRequest;