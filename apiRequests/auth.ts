import http from "@/lib/http";
import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
	sLogin: (body: LoginBodyType) => http.post<LoginResType>("/auth/login",  body ), // gọi đến BE server trực tiếp, cách này có thể gặp lỗi CORS nếu BE server và FE server khác domain, port hoặc protocol.
	login: (body: LoginBodyType) => http.post<LoginResType>("/api/auth/login",  body, { // gọi đến route api của NextJS, sau đó NextJS sẽ gọi đến BE server. Cách này giúp tránh lỗi CORS.
		baseUrl: ''
	} ),
}

export default authApiRequest;